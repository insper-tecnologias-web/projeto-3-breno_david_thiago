from django.urls import path

from . import views

urlpatterns = [
    path('api/watchlist/<str:uuid>/', views.api_crypto, name = 'api_crypto'),
    path('api/watchlist/', views.api_watchlist, name = 'api_watchlist'),
    path('api/token/', views.api_get_token),
    path('api/users/', views.api_user),
    path('api/user/info/', views.api_user_info),
    path('api/posts/', views.api_post_all),
    path('api/posts/user/', views.api_post_user),
    path('api/comments/<int:id>/', views.api_comments),
    path('profile/delete/<int:id>/', views.api_delete_post),
    path('api/post/<int:id>/', views.api_post_id)
]
