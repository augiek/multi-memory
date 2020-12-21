from django.urls import path
from . import views
from .views import current_user, UserList

urlpatterns = [
    path('current_user/', current_user, name='current_user'),
    path('users/', UserList.as_view()),
    # path('', views.home, name='home'),
    path('new/', views.new_entry, name='new_entry'),
    path('archive/', views.entry_list, name='entry_list'),
    path('<int:entry_id>/', views.entry_detail, name='entry_detail'),
    path('<int:entry_id>/edit/', views.edit_entry, name='edit_entry'),
    path('<int:entry_id>/delete/', views.delete_entry, name='delete_entry'),

    path('groups/new/', views.new_group, name='new_group'),
    path('groups/', views.group_list, name='group_list'),
    path('groups/<int:group_id>/', views.group_detail, name='group_detail'),
    path('groups/<int:group_id>/edit/', views.edit_group, name='edit_group'),
    path('groups/<int:group_id>/delete/', views.delete_group, name='delete_group'),

    path('groups/<int:group_id>/new/', views.new_member, name='new_member'),
    path('groups/<int:group_id>/<int:member_id>/', views.member_detail, name='member_detail'),
    path('groups/<int:group_id>/<int:member_id>/edit/', views.edit_member, name='edit_member'),
    path('groups/<int:group_id>/<int:member_id>/delete/', views.delete_member, name='delete_member'),
]

