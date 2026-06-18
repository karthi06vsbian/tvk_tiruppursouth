import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import News, Event, JoinRequest, Petition

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

            if not name or not phone or not subject or not summary:
                return JsonResponse({'status': 'error', 'message': 'All fields are required'}, status=400)

            petition = Petition.objects.create(name=name, phone=phone, subject=subject, summary=summary)
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
            petitions_qs = Petition.objects.filter(phone=member.phone)
            petitions_data = []
            for p in petitions_qs:
                petitions_data.append({
                    'id': p.id,
                    'name': p.name,
                    'phone': p.phone,
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
            petitions = Petition.objects.filter(phone=phone)
            data = []
            for p in petitions:
                data.append({
                    'id': p.id,
                    'name': p.name,
                    'phone': p.phone,
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
