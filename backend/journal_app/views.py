from django.shortcuts import render
from .models import Entry
from django.views.decorators.csrf import csrf_exempt
from .forms import EntryForm
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, EntrySerializer
from django.http import JsonResponse
import json 

# user-related views:
@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# entry-related views:
def entry_list(request):
    entries = Entry.objects.all()
    print(entries)
    serialized_entries = EntrySerializer(entries).all_entries
    return JsonResponse(data=serialized_entries, status=200)


def entry_detail(request, entry_id):
    entry = Entry.objects.get(id=entry_id)
    serialized_entry = EntrySerializer(entry).entry_detail
    return JsonResponse(data=serialized_entry, status=200)

@csrf_exempt
def new_entry(request):
    if request.method == "POST":
        data = json.load(request)
        print(data)
        # import pdb; pdb.set_trace()
        form = EntryForm(data)
        if form.is_valid():
            entry = form.save(commit=True)
            serialized_entry = EntrySerializer(entry).entry_detail
            return JsonResponse(data=serialized_entry, status=200)

@csrf_exempt
def edit_entry(request, entry_id):
    entry = Entry.objects.get(id=entry_id)
    if request.method == "POST":
        data = json.load(request)
        form = EntryForm(data, instance=entry)
        if form.is_valid():
            entry = form.save(commit=True)
            serialized_entry = EntrySerializer(entry).entry_detail
            return JsonResponse(data=serialized_entry, status=200)

@csrf_exempt
def delete_entry(request, entry_id):
    if request.method == "POST":
        entry = Entry.objects.get(id=entry_id)
        entry.delete()
    return JsonResponse(data={'status': 'Successfully deleted entry.'}, status=200)


# urlpatterns = [
#     path('', views.home, name='home'),
#     path('new', views.new_entry, name='new_entry'),
#     path('archive', views.entries_list, name='entries_list'),
#     path('<int:entry_id>', views.entry_detail, name='entry_detail'),
#     path('<int:entry_id>/edit', views.edit_entry, name='edit_entry'),
#     path('<int:entry_id>/delete', views.delete_entry, name='delete_entry'),
# ]