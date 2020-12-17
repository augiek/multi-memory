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
]

