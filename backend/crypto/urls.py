from django.urls import path

from . import views

urlpatterns = [
    path('api/watchlist/<str:uuid>/', views.api_crypto, name = 'api_crypto'),
    path('api/watchlist/', views.api_watchlist, name = 'api_watchlist'),
  
]