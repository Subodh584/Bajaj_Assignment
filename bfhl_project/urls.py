from django.urls import path, include
from bfhl import views as bfhl_views

urlpatterns = [
    path('bfhl', bfhl_views.bfhl_endpoint, name='bfhl'),
    path('health', bfhl_views.health, name='health'),
    path('', bfhl_views.frontend, name='frontend'),
]
