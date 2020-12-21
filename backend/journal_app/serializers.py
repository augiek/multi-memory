from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from builtins import object


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'id', 'username', 'password')


class EntrySerializer(object):
    def __init__(self, body):
        self.body = body

    @property
    def all_entries(self):
        output = {'entries': []}

        for entry in self.body:
            entry_details = {
                'id': entry.id,
                'entry_title': entry.entry_title,
                'written_body': entry.written_body,
                # 'voice_body': entry.voice_body,
                'voice_text': entry.voice_text,
                'location_tags': entry.location_tags,
                'text_tags': entry.text_tags,
                # 'file_upload': entry.file_upload.read(),
                'created_date': entry.created_date,
                # edited_date: 
                'privacy': entry.privacy,
            }
            output['entries'].append(entry_details)

        return output

    @property
    def entry_detail(self):
        return {
            'id': self.body.id,
            'entry_title': self.body.entry_title,
            'written_body': self.body.written_body,
            # 'voice_body': self.body.voice_body,
            'voice_text': self.body.voice_text,
            'location_tags': self.body.location_tags,
            'text_tags': self.body.text_tags,
            # 'file_upload': self.body.file_upload,
            # created_date: 
            # edited_date: 
            'privacy': self.body.privacy,
        }

class GroupSerializer(object):
    def __init__(self, body):
        self.body = body

    @property
    def all_groups(self):
        output = {'groups': []}

        for group in self.body:
            group_details = {
                'id': group.id,
                'group_name': group.group_name,
            }
            output['groups'].append(group_details)

        return output

    @property
    def group_detail(self):
        return {
            'id': self.body.id,
            'group_name': self.body.group_name,
        }

class MemberSerializer(object):
    def __init__(self, body):
        self.body = body

    @property
    def all_members(self):
        output = {'members': []}

        for member in self.body:
            member_details = {
                'id': member.id,
                'first_name': member.first_name,
                'last_name': member.last_name,
                'maiden_name': member.maiden_name,
                'relationship_to_you': member.relationship_to_you,
                'group': member.group,
            }
            output['members'].append(member_details)

        return output

    @property
    def member_detail(self):
        return {
            'id': self.body.id,
            'first_name': self.body.first_name,
            'last_name': self.body.last_name,
            'maiden_name': self.body.maiden_name,
            'relationship_to_you': self.body.relationship_to_you,
            'group': self.body.group,
        }