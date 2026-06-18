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

            name = data.get('name')
            phone = data.get('phone')
            area = data.get('area')

            if not name or not phone or not area:
                return JsonResponse({'status': 'error', 'message': 'Missing required fields'}, status=400)

            join_req = JoinRequest.objects.create(name=name, phone=phone, area=area)
            return JsonResponse({'status': 'success', 'message': 'Registration successful', 'id': join_req.id})
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
            'submitted_at': p.submitted_at.isoformat(),
            'is_read': p.is_read,
        })
    return JsonResponse(data, safe=False)
