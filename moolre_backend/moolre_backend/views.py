import os
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json


@csrf_exempt
@require_POST
def sms_proxy(request):
    try:
        body = json.loads(request.body)

        headers = {
            'Content-Type': 'application/json',
            'X-API-VASKEY': os.getenv('X-API-VASKEY'),  
        }

        response = requests.post(
            'https://api.moolre.com/open/sms/send',
            headers=headers,
            json=body
        )

        return JsonResponse(response.json(), status=response.status_code, safe=False)

    except Exception as e:
        print("Proxy Error:", e)
        return JsonResponse({'error': 'Proxy failed', 'details': str(e)}, status=500)


@csrf_exempt
@require_POST
def validate_proxy(request):
    try:
        body = json.loads(request.body)

        headers = {
            'Content-Type': 'application/json',
            'X-API-USER': os.getenv('USER'),
            'X-API-KEY': os.getenv('API_KEYS'),  
        }

        response = requests.post(
            'https://api.moolre.com/open/transact/validate',
            headers=headers,
            json=body
        )

        return JsonResponse(response.json(), status=response.status_code, safe=False)

    except Exception as e:
        print("Proxy Error:", e)
        return JsonResponse({'error': 'Proxy failed', 'details': str(e)}, status=500)



@csrf_exempt
@require_POST
def transaction_proxy(request):
    try:
        body = json.loads(request.body)

        headers = {
            'Content-Type': 'application/json',
            'X-API-USER': os.getenv('USER'),
            'X-API-KEY': os.getenv('API_KEYS'),   
        }

        response = requests.post(
            'https://api.moolre.com/open/transact/transfer',
            headers=headers,
            json=body
        )

        return JsonResponse(response.json(), status=response.status_code, safe=False)

    except Exception as e:
        print("Proxy Error:", e)
        return JsonResponse({'error': 'Proxy failed', 'details': str(e)}, status=500)

