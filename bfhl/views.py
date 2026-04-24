import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.shortcuts import render

from .processor import process


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def bfhl_endpoint(request):
    """POST /bfhl — main API endpoint."""
    if request.method == "OPTIONS":
        # Pre-flight handled by corsheaders middleware, but be safe
        return JsonResponse({}, status=200)

    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return JsonResponse(
            {"error": "Invalid JSON body"},
            status=400,
        )

    data = body.get("data")
    if data is None or not isinstance(data, list):
        return JsonResponse(
            {"error": "'data' must be a JSON array"},
            status=400,
        )

    # Ensure all items are strings
    if not all(isinstance(item, str) for item in data):
        return JsonResponse(
            {"error": "All items in 'data' must be strings"},
            status=400,
        )

    result = process(data)
    return JsonResponse(result, status=200)


def health(request):
    """GET /health — used by UptimeRobot to keep the server alive."""
    return JsonResponse({"status": "ok"})


def frontend(request):
    """Serve the single-page frontend."""
    return render(request, "index.html")
