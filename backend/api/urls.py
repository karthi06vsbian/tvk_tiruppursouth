from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.news_list_api, name='news_list_api'),
    path('events/', views.events_list_api, name='events_list_api'),
    path('join/', views.join_submit_api, name='join_submit_api'),
    path('petitions/', views.petition_list_api, name='petition_list_api'),
    path('petitions/submit/', views.petition_submit_api, name='petition_submit_api'),
]
