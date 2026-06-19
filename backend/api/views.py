import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import News, Event, JoinRequest, Petition, ContactMessage

def clean_phone_number(phone_str):
    if not phone_str:
        return ""
    digits = "".join([c for c in phone_str if c.isdigit()])
    return digits[-10:] if len(digits) >= 10 else digits


def news_list_api(request):
    lang = request.GET.get('lang', 'en')
    news_items = News.objects.all()
    data = []
    for item in news_items:
        data.append({
            'img': item.img,
            'tag': item.tag_ta if lang == 'ta' else item.tag_en,
            'title': item.title_ta if lang == 'ta' else item.title_en,
            'text': item.text_ta if lang == 'ta' else item.text_en,
            'created_at': item.created_at.isoformat()
        })
    return JsonResponse(data, safe=False)

def events_list_api(request):
    lang = request.GET.get('lang', 'en')
    event_items = Event.objects.all()
    data = []
    for item in event_items:
        data.append({
            'src': item.src,
            'caption': item.caption_ta if lang == 'ta' else item.caption_en,
            'span': {
                'col': item.col_span,
                'row': item.row_span
            }
        })
    return JsonResponse(data, safe=False)

@csrf_exempt
def join_submit_api(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST

            # Basic fields
            name = data.get('name')
            phone = data.get('phone')
            area = data.get('area')

            # Enhanced fields
            email = data.get('email', '')
            dob = data.get('dob', '')
            gender = data.get('gender', '')
            address = data.get('address', '')
            occupation = data.get('occupation', '')
            interests = data.get('interests', '')  # Can be JSON string or comma-separated
            photo_data = data.get('photo_data', '')
            photo_name = data.get('photo_name', '')

            if not name or not phone or not area:
                return JsonResponse({'status': 'error', 'message': 'Missing required fields: name, phone, area'}, status=400)

            # Convert interests list to string if needed
            if isinstance(interests, list):
                interests = ', '.join(interests)

            join_req = JoinRequest.objects.create(
                name=name,
                phone=phone,
                email=email,
                dob=dob,
                gender=gender,
                address=address,
                area=area,
                occupation=occupation,
                interests=interests,
                photo_data=photo_data,
                photo_name=photo_name,
                status='pending'
            )
            
            return JsonResponse({
                'status': 'success',
                'message': 'Membership application submitted successfully',
                'id': join_req.id,
                'name': join_req.name,
                'area': join_req.area
            })
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
            
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def petition_submit_api(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST

            name = data.get('name')
            phone = data.get('phone')
            subject = data.get('subject')
            summary = data.get('summary')
            
            # Expanded fields
            email = data.get('email', '')
            area = data.get('area', '')
            problem_type = data.get('problem_type', 'Others')
            photo_data = data.get('photo_data', '')
            photo_name = data.get('photo_name', '')

            if not name or not phone or not subject or not summary:
                return JsonResponse({'status': 'error', 'message': 'All fields are required'}, status=400)

            cleaned_phone = clean_phone_number(phone)
            petition = Petition.objects.create(
                name=name,
                phone=cleaned_phone,
                email=email,
                area=area,
                problem_type=problem_type,
                subject=subject,
                summary=summary,
                photo_data=photo_data,
                photo_name=photo_name
            )
            return JsonResponse({'status': 'success', 'message': 'Petition submitted successfully', 'id': petition.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)

def petition_list_api(request):
    petitions = Petition.objects.all()
    data = []
    for p in petitions:
        data.append({
            'id': p.id,
            'name': p.name,
            'phone': p.phone,
            'email': p.email,
            'area': p.area,
            'problem_type': p.problem_type,
            'photo_data': p.photo_data,
            'photo_name': p.photo_name,
            'subject': p.subject,
            'summary': p.summary,
            'status': p.status,
            'submitted_at': p.submitted_at.isoformat(),
            'is_read': p.is_read,
        })
    return JsonResponse(data, safe=False)

# New API: Get all membership applications (admin)
@csrf_exempt
def membership_list_api(request):
    if request.method == 'GET':
        try:
            members = JoinRequest.objects.all()
            data = []
            for member in members:
                data.append({
                    'id': member.id,
                    'name': member.name,
                    'phone': member.phone,
                    'email': member.email,
                    'dob': member.dob.isoformat() if member.dob else '',
                    'gender': member.gender,
                    'address': member.address,
                    'area': member.area,
                    'occupation': member.occupation,
                    'interests': member.interests,
                    'photo_name': member.photo_name,
                    'status': member.status,
                    'admin_notes': member.admin_notes,
                    'submitted_at': member.submitted_at.isoformat()
                })
            return JsonResponse({'status': 'success', 'data': data})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Only GET method is allowed'}, status=405)

# New API: Get single membership details (admin)
@csrf_exempt
def membership_detail_api(request, member_id):
    if request.method == 'GET':
        try:
            member = JoinRequest.objects.get(id=member_id)
            cleaned_phone = clean_phone_number(member.phone)
            petitions_qs = Petition.objects.filter(phone=cleaned_phone)
            petitions_data = []
            for p in petitions_qs:
                petitions_data.append({
                    'id': p.id,
                    'name': p.name,
                    'phone': p.phone,
                    'email': p.email,
                    'area': p.area,
                    'problem_type': p.problem_type,
                    'photo_data': p.photo_data,
                    'photo_name': p.photo_name,
                    'subject': p.subject,
                    'summary': p.summary,
                    'status': p.status,
                    'is_read': p.is_read,
                    'submitted_at': p.submitted_at.isoformat()
                })
            data = {
                'id': member.id,
                'name': member.name,
                'phone': member.phone,
                'email': member.email,
                'dob': member.dob.isoformat() if member.dob else '',
                'gender': member.gender,
                'address': member.address,
                'area': member.area,
                'occupation': member.occupation,
                'interests': member.interests,
                'photo_data': member.photo_data,
                'photo_name': member.photo_name,
                'status': member.status,
                'admin_notes': member.admin_notes,
                'submitted_at': member.submitted_at.isoformat(),
                'petitions': petitions_data
            }
            return JsonResponse({'status': 'success', 'data': data})
        except JoinRequest.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Member not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Only GET method is allowed'}, status=405)

# New API: Update membership status and notes (admin)
@csrf_exempt
def membership_update_api(request, member_id):
    if request.method == 'PUT':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST

            member = JoinRequest.objects.get(id=member_id)
            
            if 'status' in data:
                member.status = data.get('status')
            if 'admin_notes' in data:
                member.admin_notes = data.get('admin_notes')
            
            member.save()
            
            return JsonResponse({
                'status': 'success',
                'message': 'Membership application updated successfully',
                'data': {
                    'id': member.id,
                    'name': member.name,
                    'status': member.status,
                    'admin_notes': member.admin_notes
                }
            })
        except JoinRequest.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Member not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Only PUT method is allowed'}, status=405)

# New API: Track petitions by phone number
@csrf_exempt
def petition_track_api(request):
    if request.method == 'GET':
        phone = request.GET.get('phone')
        if not phone:
            return JsonResponse({'status': 'error', 'message': 'Phone number parameter is required'}, status=400)
        
        try:
            cleaned_phone = clean_phone_number(phone)
            petitions = Petition.objects.filter(phone=cleaned_phone)
            data = []
            for p in petitions:
                data.append({
                    'id': p.id,
                    'name': p.name,
                    'phone': p.phone,
                    'email': p.email,
                    'area': p.area,
                    'problem_type': p.problem_type,
                    'photo_data': p.photo_data,
                    'photo_name': p.photo_name,
                    'subject': p.subject,
                    'summary': p.summary,
                    'status': p.status,
                    'is_read': p.is_read,
                    'submitted_at': p.submitted_at.isoformat()
                })
            return JsonResponse({'status': 'success', 'data': data})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
            
    return JsonResponse({'status': 'error', 'message': 'Only GET method is allowed'}, status=405)

# New API: Update petition status and read flag (admin)
@csrf_exempt
def petition_update_api(request, petition_id):
    if request.method == 'PUT':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST

            petition = Petition.objects.get(id=petition_id)
            
            if 'status' in data:
                petition.status = data.get('status')
            if 'is_read' in data:
                val = data.get('is_read')
                if isinstance(val, str):
                    petition.is_read = val.lower() == 'true'
                else:
                    petition.is_read = bool(val)
            
            petition.save()
            
            return JsonResponse({
                'status': 'success',
                'message': 'Petition updated successfully',
                'data': {
                    'id': petition.id,
                    'status': petition.status,
                    'is_read': petition.is_read
                }
            })
        except Petition.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Petition not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
            
    return JsonResponse({'status': 'error', 'message': 'Only PUT method is allowed'}, status=405)


@csrf_exempt
def contact_submit_api(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST

            email = data.get('email')
            phone = data.get('phone')
            topic = data.get('topic')
            message = data.get('message', '')

            if not email or not phone or not topic:
                return JsonResponse({'status': 'error', 'message': 'Email, phone, and topic are required'}, status=400)

            cleaned_phone = clean_phone_number(phone)
            msg = ContactMessage.objects.create(
                email=email,
                phone=cleaned_phone,
                topic=topic,
                message=message
            )
            return JsonResponse({'status': 'success', 'message': 'Message sent successfully', 'id': msg.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


def petition_print_view(request, petition_id):
    from django.shortcuts import get_object_or_404
    from django.utils.html import escape
    from django.http import HttpResponse
    
    p = get_object_or_404(Petition, id=petition_id)
    
    photo_html = ""
    if p.photo_data and not p.photo_data.startswith('data:application/pdf'):
        photo_html = f"""
        <div class="content-section" style="page-break-before: always; margin-top: 30px;">
          <h3>Attached Evidence / இணைக்கப்பட்ட ஆவணம்</h3>
          <div style="text-align: center; border: 1px solid rgba(90, 12, 18, 0.12); padding: 15px; border-radius: 8px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <img src="{p.photo_data}" style="max-width: 100%; max-height: 480px; border-radius: 6px; border: 1.5px solid rgba(90, 12, 18, 0.15);" />
          </div>
        </div>
        """
        
    submitted_date_str = p.submitted_at.strftime('%Y-%m-%d') if p.submitted_at else 'N/A'
    
    html = f"""<!DOCTYPE html>
    <html>
      <head>
        <title>TVK Petition #{p.id} - {escape(p.name)}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&family=Instrument+Sans:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>
          body {{
            font-family: 'Instrument Sans', 'Noto Sans Tamil', sans-serif;
            color: #360507;
            background: #fffcf5;
            padding: 40px;
            margin: 0;
          }}
          .header {{
            text-align: center;
            border-bottom: 3.5px solid #ffd84a;
            padding-bottom: 20px;
            margin-bottom: 35px;
          }}
          .header h1 {{
            color: #5a0c12;
            margin: 0 0 5px 0;
            font-family: 'Teko', sans-serif;
            font-size: 38px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }}
          .header h2 {{
            color: #746464;
            margin: 0;
            font-size: 15px;
            font-weight: 600;
          }}
          .petition-title {{
            color: #5a0c12;
            margin-top: 0;
            font-family: 'Teko', sans-serif;
            font-size: 26px;
            border-bottom: 2px solid #5a0c12;
            padding-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }}
          .petition-meta {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 30px;
            background: rgba(255, 255, 255, 0.7);
            border: 1.5px solid rgba(90, 12, 18, 0.1);
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(90, 12, 18, 0.02);
          }}
          .meta-item {{
            font-size: 14px;
            line-height: 1.6;
          }}
          .meta-label {{
            font-weight: 700;
            color: #5a0c12;
          }}
          .content-section {{
            margin-bottom: 30px;
          }}
          .content-section h3 {{
            color: #5a0c12;
            font-family: 'Teko', sans-serif;
            font-size: 20px;
            font-weight: 600;
            border-bottom: 1.5px solid rgba(90, 12, 18, 0.15);
            padding-bottom: 6px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }}
          .content-text {{
            font-size: 14.5px;
            line-height: 1.65;
            white-space: pre-wrap;
            background: #fff;
            padding: 20px;
            border: 1.5px solid rgba(90, 12, 18, 0.08);
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(90, 12, 18, 0.01);
            color: #360507;
          }}
          .status-badge {{
            display: inline-block;
            padding: 6px 16px;
            font-weight: 700;
            font-size: 12px;
            border-radius: 20px;
            text-transform: uppercase;
            background: rgba(90, 12, 18, 0.05);
            border: 1.5px solid rgba(90, 12, 18, 0.1);
            color: #5a0c12;
          }}
          .status-solved {{
            background: #f0fdf4;
            border-color: #bbf7d0;
            color: #166534;
          }}
          .status-rejected {{
            background: #fef2f2;
            border-color: #fecaca;
            color: #991b1b;
          }}
          .status-inprogress {{
            background: #eff6ff;
            border-color: #bfdbfe;
            color: #1e40af;
          }}
          .footer {{
            margin-top: 60px;
            border-top: 1.5px solid rgba(90, 12, 18, 0.1);
            padding-top: 20px;
            text-align: center;
            font-size: 12.5px;
            color: #746464;
            line-height: 1.5;
          }}
          @media print {{
            .no-print {{ display: none; }}
            body {{ padding: 20px; background: #fffcf5; }}
          }}
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print();" style="background: #5a0c12; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
          <button onclick="window.close();" style="background: #e2e8f0; color: #333; border: none; padding: 8px 16px; border-radius: 6px; margin-left: 10px; cursor: pointer;">Close Window</button>
        </div>
        
        <div class="header">
          <h1>TAMILAGA VETTRI KAZHAGAM</h1>
          <h2>Tiruppur South District Committee | திருப்பூர் தெற்கு மாவட்ட அமைப்பு</h2>
          <div style="display: flex; justify-content: center; gap: 8px; margin-top: 15px;" class="pdf-leaders">
            <img src="/static/assets/branding/thalaivar-cutout.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/kamarajar-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/ambedkar-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/periyar-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/velu-nachiyar-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/anjalai-ammal-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
          </div>
        </div>
        
        <h2 class="petition-title">
          GRIEVANCE PETITION / மக்கள் மனு - #{p.id}
        </h2>
        
        <div class="petition-meta">
          <div class="meta-item"><span class="meta-label">Petitioner Name / பெயர்:</span> {escape(p.name)}</div>
          <div class="meta-item"><span class="meta-label">Submitted On / சமர்ப்பிக்கப்பட்ட தேதி:</span> {submitted_date_str}</div>
          <div class="meta-item"><span class="meta-label">Phone / தொலைபேசி:</span> {escape(p.phone)}</div>
          <div class="meta-item"><span class="meta-label">Area / பகுதி:</span> {escape(p.area or 'N/A')}</div>
          <div class="meta-item"><span class="meta-label">Email / மின்னஞ்சல்:</span> {escape(p.email or 'N/A')}</div>
          <div class="meta-item"><span class="meta-label">Problem Type / பிரச்சனை வகை:</span> {escape(p.problem_type)}</div>
        </div>
        
        <div class="content-section">
          <h3>Subject / தலைப்பு</h3>
          <div class="content-text" style="font-weight: bold;">{escape(p.subject)}</div>
        </div>
        
        <div class="content-section">
          <h3>Summary of Grievance / மனுவின் சுருக்கம்</h3>
          <div class="content-text">{escape(p.summary)}</div>
        </div>
        
        <div class="content-section">
          <h3>Current Status / தற்போதைய நிலை</h3>
          <div style="margin-top: 8px;">
            <span class="status-badge {'status-solved' if p.status == 'Solved' else 'status-rejected' if p.status == 'Rejected' else 'status-inprogress' if p.status == 'In Progress' else ''}">
              {escape(p.status or 'Pending')}
            </span>
          </div>
        </div>

        {photo_html}
        
        <div class="footer">
          Tamilaga Vettri Kazhagam - Tiruppur South District Office. Generated electronically.<br>
          சிறந்த தமிழ்நாட்டிற்கான மக்கள் சக்தி - தமிழக வெற்றிக் கழகம்
        </div>
        
        <script>
          window.onload = function() {{
            window.print();
          }};
        </script>
      </body>
    </html>
    """
    return HttpResponse(html)


def petition_share_view(request, petition_id):
    from django.shortcuts import get_object_or_404, redirect
    from django.urls import reverse
    import urllib.parse
    
    p = get_object_or_404(Petition, id=petition_id)
    pdf_link = request.build_absolute_uri(reverse('petition_print_view', args=[p.id]))
    
    text = f"TVK Tiruppur South - Grievance Petition #{p.id}\n" \
           f"-----------------------------------\n" \
           f"Petitioner: {p.name}\n" \
           f"Subject: {p.subject}\n" \
           f"Status: {p.status or 'Pending'}\n\n" \
           f"View / Download PDF version:\n{pdf_link}"
           
    encoded_text = urllib.parse.quote(text)
    return redirect(f"https://api.whatsapp.com/send?text={encoded_text}")


def membership_print_view(request, member_id):
    from django.shortcuts import get_object_or_404
    from django.utils.html import escape
    from django.http import HttpResponse
    
    m = get_object_or_404(JoinRequest, id=member_id)
    
    photo_html = ""
    if m.photo_data:
        photo_html = f"""
        <div style="text-align: center; margin-bottom: 25px;">
          <img src="{m.photo_data}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 50%; border: 3px solid #ffd84a; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
        </div>
        """
    else:
        photo_html = """
        <div style="text-align: center; margin-bottom: 25px;">
          <div style="width: 150px; height: 150px; border-radius: 50%; border: 3px dashed #cbd5e0; display: inline-flex; align-items: center; justify-content: center; background: #f1f5f9; color: #94a3b8; font-weight: bold; font-size: 14px;">No Photo</div>
        </div>
        """
        
    submitted_date_str = m.submitted_at.strftime('%Y-%m-%d') if m.submitted_at else 'N/A'
    dob_str = m.dob.strftime('%Y-%m-%d') if m.dob else 'N/A'
    
    html = f"""<!DOCTYPE html>
    <html>
      <head>
        <title>TVK Membership Card #{m.id} - {escape(m.name)}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&family=Instrument+Sans:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>
          body {{
            font-family: 'Instrument Sans', 'Noto Sans Tamil', sans-serif;
            color: #360507;
            background: #fffcf5;
            padding: 40px;
            margin: 0;
          }}
          .header {{
            text-align: center;
            border-bottom: 3.5px solid #ffd84a;
            padding-bottom: 20px;
            margin-bottom: 35px;
          }}
          .header h1 {{
            color: #5a0c12;
            margin: 0 0 5px 0;
            font-family: 'Teko', sans-serif;
            font-size: 38px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }}
          .header h2 {{
            color: #746464;
            margin: 0;
            font-size: 15px;
            font-weight: 600;
          }}
          .petition-title {{
            color: #5a0c12;
            margin-top: 0;
            font-family: 'Teko', sans-serif;
            font-size: 26px;
            border-bottom: 2px solid #5a0c12;
            padding-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-align: center;
          }}
          .petition-meta {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 30px;
            background: rgba(255, 255, 255, 0.7);
            border: 1.5px solid rgba(90, 12, 18, 0.1);
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(90, 12, 18, 0.02);
          }}
          .meta-item {{
            font-size: 14px;
            line-height: 1.6;
          }}
          .meta-label {{
            font-weight: 700;
            color: #5a0c12;
          }}
          .content-section {{
            margin-bottom: 30px;
          }}
          .content-section h3 {{
            color: #5a0c12;
            font-family: 'Teko', sans-serif;
            font-size: 20px;
            font-weight: 600;
            border-bottom: 1.5px solid rgba(90, 12, 18, 0.15);
            padding-bottom: 6px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }}
          .content-text {{
            font-size: 14.5px;
            line-height: 1.65;
            white-space: pre-wrap;
            background: #fff;
            padding: 20px;
            border: 1.5px solid rgba(90, 12, 18, 0.08);
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(90, 12, 18, 0.01);
            color: #360507;
          }}
          .status-badge {{
            display: inline-block;
            padding: 6px 16px;
            font-weight: 700;
            font-size: 12px;
            border-radius: 20px;
            text-transform: uppercase;
            background: rgba(90, 12, 18, 0.05);
            border: 1.5px solid rgba(90, 12, 18, 0.1);
            color: #5a0c12;
          }}
          .status-approved {{
            background: #f0fdf4;
            border-color: #bbf7d0;
            color: #166534;
          }}
          .status-rejected {{
            background: #fef2f2;
            border-color: #fecaca;
            color: #991b1b;
          }}
          .status-pending {{
            background: #eff6ff;
            border-color: #bfdbfe;
            color: #1e40af;
          }}
          .footer {{
            margin-top: 60px;
            border-top: 1.5px solid rgba(90, 12, 18, 0.1);
            padding-top: 20px;
            text-align: center;
            font-size: 12.5px;
            color: #746464;
            line-height: 1.5;
          }}
          @media print {{
            .no-print {{ display: none; }}
            body {{ padding: 20px; background: #fffcf5; }}
          }}
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print();" style="background: #5a0c12; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
          <button onclick="window.close();" style="background: #e2e8f0; color: #333; border: none; padding: 8px 16px; border-radius: 6px; margin-left: 10px; cursor: pointer;">Close Window</button>
        </div>
        
        <div class="header">
          <h1>TAMILAGA VETTRI KAZHAGAM</h1>
          <h2>Tiruppur South District Committee | திருப்பூர் தெற்கு மாவட்ட அமைப்பு</h2>
          <div style="display: flex; justify-content: center; gap: 8px; margin-top: 15px;" class="pdf-leaders">
            <img src="/static/assets/branding/thalaivar-cutout.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/kamarajar-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/ambedkar-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/periyar-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/velu-nachiyar-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
            <img src="/static/assets/leaders/anjalai-ammal-thumbnail.png" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />
          </div>
        </div>
        
        <h2 class="petition-title">
          MEMBERSHIP APPLICATION / உறுப்பினர் சேர்க்கை படிவம் - #{m.id}
        </h2>
        
        {photo_html}
        
        <div class="petition-meta">
          <div class="meta-item"><span class="meta-label">Full Name / பெயர்:</span> {escape(m.name)}</div>
          <div class="meta-item"><span class="meta-label">Submitted On / சமர்ப்பிக்கப்பட்ட தேதி:</span> {submitted_date_str}</div>
          <div class="meta-item"><span class="meta-label">Phone / தொலைபேசி:</span> {escape(m.phone)}</div>
          <div class="meta-item"><span class="meta-label">Area / பகுதி:</span> {escape(m.area)}</div>
          <div class="meta-item"><span class="meta-label">Email / மின்னஞ்சல்:</span> {escape(m.email or 'N/A')}</div>
          <div class="meta-item"><span class="meta-label">Date of Birth / பிறந்த தேதி:</span> {dob_str}</div>
          <div class="meta-item"><span class="meta-label">Gender / பாலினம்:</span> {escape(m.gender or 'N/A')}</div>
          <div class="meta-item"><span class="meta-label">Occupation / தொழில்:</span> {escape(m.occupation or 'N/A')}</div>
        </div>
        
        <div class="content-section">
          <h3>Residential Address / வீட்டு முகவரி</h3>
          <div class="content-text">{escape(m.address or 'N/A')}</div>
        </div>
        
        <div class="content-section">
          <h3>Interests / ஆர்வங்கள்</h3>
          <div class="content-text" style="text-transform: capitalize;">{escape(m.interests or 'None')}</div>
        </div>
        
        <div class="content-section">
          <h3>Application Status & Notes / விண்ணப்ப நிலை மற்றும் குறிப்புகள்</h3>
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 10px;">
            <div>
              <span class="status-badge {'status-approved' if m.status == 'approved' else 'status-rejected' if m.status == 'rejected' else 'status-pending'}">
                {escape(m.status or 'pending')}
              </span>
            </div>
            {f'<div class="content-text" style="font-style: italic;">{escape(m.admin_notes)}</div>' if m.admin_notes else ''}
          </div>
        </div>
        
        <div class="footer">
          Tamilaga Vettri Kazhagam - Tiruppur South District Office. Generated electronically.<br>
          சிறந்த தமிழ்நாட்டிற்கான மக்கள் சக்தி - தமிழக வெற்றிக் கழகம்
        </div>
        
        <script>
          window.onload = function() {{
            window.print();
          }};
        </script>
      </body>
    </html>
    """
    return HttpResponse(html)


def membership_share_view(request, member_id):
    from django.shortcuts import get_object_or_404, redirect
    from django.urls import reverse
    import urllib.parse
    
    m = get_object_or_404(JoinRequest, id=member_id)
    pdf_link = request.build_absolute_uri(reverse('membership_print_view', args=[m.id]))
    
    text = f"TVK Tiruppur South - Membership Application #{m.id}\n" \
           f"-----------------------------------\n" \
           f"Applicant: {m.name}\n" \
           f"Phone: {m.phone}\n" \
           f"Area: {m.area}\n" \
           f"Status: {m.status or 'pending'}\n\n" \
           f"View / Download PDF version:\n{pdf_link}"
           
    encoded_text = urllib.parse.quote(text)
    return redirect(f"https://api.whatsapp.com/send?text={encoded_text}")


@csrf_exempt
def news_create_api(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST
            
            title_en = data.get('title_en')
            title_ta = data.get('title_ta')
            text_en = data.get('text_en')
            text_ta = data.get('text_ta')
            tag_en = data.get('tag_en', 'Organisation')
            tag_ta = data.get('tag_ta', 'அமைப்பு')
            img = data.get('img', '/assets/branding/flag.png')
            
            if not title_en or not title_ta or not text_en or not text_ta:
                return JsonResponse({'status': 'error', 'message': 'All titles and texts are required'}, status=400)
                
            item = News.objects.create(
                title_en=title_en,
                title_ta=title_ta,
                text_en=text_en,
                text_ta=text_ta,
                tag_en=tag_en,
                tag_ta=tag_ta,
                img=img
            )
            return JsonResponse({'status': 'success', 'message': 'News created successfully', 'id': item.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def news_update_api(request, news_id):
    if request.method in ['PUT', 'POST']:
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST
                
            item = News.objects.get(id=news_id)
            if 'title_en' in data: item.title_en = data.get('title_en')
            if 'title_ta' in data: item.title_ta = data.get('title_ta')
            if 'text_en' in data: item.text_en = data.get('text_en')
            if 'text_ta' in data: item.text_ta = data.get('text_ta')
            if 'tag_en' in data: item.tag_en = data.get('tag_en')
            if 'tag_ta' in data: item.tag_ta = data.get('tag_ta')
            if 'img' in data: item.img = data.get('img')
            
            item.save()
            return JsonResponse({'status': 'success', 'message': 'News updated successfully'})
        except News.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'News not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only PUT/POST method is allowed'}, status=405)


@csrf_exempt
def news_delete_api(request, news_id):
    if request.method in ['DELETE', 'POST']:
        try:
            item = News.objects.get(id=news_id)
            item.delete()
            return JsonResponse({'status': 'success', 'message': 'News deleted successfully'})
        except News.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'News not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only DELETE/POST method is allowed'}, status=405)


@csrf_exempt
def event_create_api(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST
            
            src = data.get('src')
            caption_en = data.get('caption_en')
            caption_ta = data.get('caption_ta')
            col_span = int(data.get('col_span', 2))
            row_span = int(data.get('row_span', 1))
            
            if not src or not caption_en or not caption_ta:
                return JsonResponse({'status': 'error', 'message': 'Source image and captions are required'}, status=400)
                
            item = Event.objects.create(
                src=src,
                caption_en=caption_en,
                caption_ta=caption_ta,
                col_span=col_span,
                row_span=row_span
            )
            return JsonResponse({'status': 'success', 'message': 'Event created successfully', 'id': item.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def event_update_api(request, event_id):
    if request.method in ['PUT', 'POST']:
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST
                
            item = Event.objects.get(id=event_id)
            if 'src' in data: item.src = data.get('src')
            if 'caption_en' in data: item.caption_en = data.get('caption_en')
            if 'caption_ta' in data: item.caption_ta = data.get('caption_ta')
            if 'col_span' in data: item.col_span = int(data.get('col_span'))
            if 'row_span' in data: item.row_span = int(data.get('row_span'))
            
            item.save()
            return JsonResponse({'status': 'success', 'message': 'Event updated successfully'})
        except Event.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Event not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only PUT/POST method is allowed'}, status=405)


@csrf_exempt
def event_delete_api(request, event_id):
    if request.method in ['DELETE', 'POST']:
        try:
            item = Event.objects.get(id=event_id)
            item.delete()
            return JsonResponse({'status': 'success', 'message': 'Event deleted successfully'})
        except Event.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Event not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only DELETE/POST method is allowed'}, status=405)

