from django.shortcuts import render
from .models import Entry
# from .models import Entry, Group, GroupMember
from django.views.decorators.csrf import csrf_exempt
from .forms import EntryForm
# from .forms import EntryForm, GroupForm, MemberForm
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, EntrySerializer, GroupSerializer, MemberSerializer
from django.http import JsonResponse
import json 
import base64
from django.db.models import FileField
import io
from django.core.files import File


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
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def entry_list(request):
    entries = Entry.objects.filter(user=request.user)
    print(entries)
    serialized_entries = EntrySerializer(entries).all_entries
    return JsonResponse(data=serialized_entries, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def entry_detail(request, entry_id):
    entry = Entry.objects.get(id=entry_id, user=request.user)
    print(entry.voice_body)
    serialized_entry = EntrySerializer(entry).entry_detail
    if entry.voice_body:
        media_path = 'http://localhost:8000' + entry.voice_body.url 
        # serialized_entry.update({'voice_url': media_path})
        serialized_entry.update({'voice_body': media_path})
        print(serialized_entry)
    return JsonResponse(data=serialized_entry, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def new_entry(request):
    if request.method == "POST":
        data = json.load(request)
        print(request.user)
        # data['user_id'] = request.user.pk
        print(request.user)
        form = EntryForm(data)
        form.instance.user = request.user

        if data['voice_body']:
            decoded_audio = base64.b64decode(data['voice_body'])
            file = File(io.BytesIO(decoded_audio))
            form.instance.voice_body.save('voice_entry.mp3', file)
        
        if form.is_valid():
            entry = form.save(commit=True)
            serialized_entry = EntrySerializer(entry).entry_detail
            return JsonResponse(data=serialized_entry, status=200)

@csrf_exempt
def edit_entry(request, entry_id):
    entry = Entry.objects.get(id=entry_id)
    if request.method == "PUT":
        data = json.load(request)
        form = EntryForm(data, instance=entry)
        if form.instance.user == request.user:
            if form.is_valid():
                entry = form.save(commit=True)
                serialized_entry = EntrySerializer(entry).entry_detail
                return JsonResponse(data=serialized_entry, status=200)
    #         return("There was a problem with your form submission.")
    #     return("This user does not have permission to edit this entry")
    # return("There was an error with this submission: that method type is not allowed")

@csrf_exempt
def delete_entry(request, entry_id):
    if request.method == "DELETE":
        entry = Entry.objects.get(id=entry_id)
        entry.delete()
    return JsonResponse(data={'status': 'Successfully deleted entry.'}, status=200)

# group-related views:
def get_group(group_id):
    return Group.objects.get(id=group_id)

def group_list(request):
    groups = Group.objects.all()
    print(groups)
    serialized_entries = GroupSerializer(entries).all_entries
    return JsonResponse(data=serialized_entries, status=200)


def group_detail(request, group_id):
    group = Group.objects.get(id=group_id)
    serialized_group = GroupSerializer(group).group_detail

    media_path = 'http://localhost:8000' + Group.voice_body.url # need to test this with an group that does not have a voice recording
    serialized_group.update({'voice_url': media_path})
    print(serialized_group)
    return JsonResponse(data=serialized_group, status=200)

@csrf_exempt
def new_group(request):
    if request.method == "POST":
        data = json.load(request)
        form = GroupForm(data)
        if form.is_valid():
            group = form.save(commit=True)
            serialized_group = GroupSerializer(group).group_detail
            return JsonResponse(data=serialized_group, status=200)

@csrf_exempt
def edit_group(request, group_id):
    group = get_group(group_id)
    if request.method == "PUT":
        data = json.load(request)
        form = GroupForm(data, instance=group)
        if form.is_valid():
            group = form.save(commit=True)
            serialized_group = GroupSerializer(group).group_detail
            return JsonResponse(data=serialized_group, status=200)

@csrf_exempt
def delete_group(request, group_id):
    if request.method == "POST":
        group = get_group(group_id)
        group.delete()
    return JsonResponse(data={'status': 'Successfully deleted group.'}, status=200)

# member-related views: 
def get_member(member_id):
    return GroupMember.objects.get(id=member_id)

def member_list(request):
    members = GroupMember.objects.all()
    print(members)
    serialized_members = MemberSerializer(members).all_members
    return JsonResponse(data=serialized_members, status=200)


def member_detail(request, group_id, member_id):
    member = GroupMember.objects.get(id=member_id)
    serialized_member = MemberSerializer(member).member_detail
    print(serialized_member)
    return JsonResponse(data=serialized_member, status=200)

@csrf_exempt
def new_member(request, group_id):
    group = get_group(group_id)
    if request.method == "POST": 
        data = json.load(request)
        form = MemberForm(data)
        if form.is_valid():
            member = form.save(commit=True)
            member.group = group
            serialized_member = MemberSerializer(member).member_detail
            return JsonResponse(data=serialized_member, status=200)

@csrf_exempt
def edit_member(request, group_id, member_id):
    group = get_group(group_id)
    member = get_member(member_id)
    if request.method == "PUT":
        data = json.load(request)
        form = MemberForm(data, instance=member)
        if form.is_valid():
            member = form.save(commit=True)
            member.group = group
            serialized_member = MemberSerializer(member).member_detail
            return JsonResponse(data=serialized_member, status=200)

@csrf_exempt
def delete_member(request, group_id, member_id):
    if request.method == "POST":
        member = get_member(member_id)
        member.delete()
    return JsonResponse(data={'status': 'Successfully deleted group.'}, status=200)