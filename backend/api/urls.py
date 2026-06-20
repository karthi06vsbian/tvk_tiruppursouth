from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.news_list_api, name='news_list_api'),
    path('events/', views.events_list_api, name='events_list_api'),
    path('join/', views.join_submit_api, name='join_submit_api'),
    path('petitions/', views.petition_list_api, name='petition_list_api'),
    path('petitions/submit/', views.petition_submit_api, name='petition_submit_api'),
    path('members/', views.membership_list_api, name='membership_list_api'),
    path('members/<int:member_id>/', views.membership_detail_api, name='membership_detail_api'),
    path('members/<int:member_id>/update/', views.membership_update_api, name='membership_update_api'),
    path('members/<int:member_id>/pdf/', views.membership_print_view, name='membership_print_view'),
    path('members/<int:member_id>/share/', views.membership_share_view, name='membership_share_view'),
    path('petitions/track/', views.petition_track_api, name='petition_track_api'),
    path('petitions/<int:petition_id>/update/', views.petition_update_api, name='petition_update_api'),
    path('petitions/<int:petition_id>/pdf/', views.petition_print_view, name='petition_print_view'),
    path('petitions/<int:petition_id>/share/', views.petition_share_view, name='petition_share_view'),
    path('contacts/', views.contact_list_api, name='contact_list_api'),
    path('contact/submit/', views.contact_submit_api, name='contact_submit_api'),
    # News management CRUD
    path('news/create/', views.news_create_api, name='news_create_api'),
    path('news/<int:news_id>/update/', views.news_update_api, name='news_update_api'),
    path('news/<int:news_id>/delete/', views.news_delete_api, name='news_delete_api'),
    # Event (Gallery) management CRUD
    path('events/create/', views.event_create_api, name='event_create_api'),
    path('events/<int:event_id>/update/', views.event_update_api, name='event_update_api'),
    path('events/<int:event_id>/delete/', views.event_delete_api, name='event_delete_api'),
]
