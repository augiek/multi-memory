from django import forms
from .models import Entry
# from .models import Entry, Group, GroupMember

# class UserForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = ('first_name', 'last_name','username', 'birthdate','email')

class EntryForm(forms.ModelForm):
    class Meta:
        model = Entry
        fields = ('id', 'entry_title', 'written_body', 'voice_body', 'voice_text', 'text_tags', 'location_tags', 'file_upload', 'privacy')

# class GroupForm(forms.ModelForm):
#     class Meta:
#         model = Group
#         fields = ('id', 'group_name')

# class MemberForm(forms.ModelForm):
#     class Meta:
#         model = GroupMember
#         fields = ('id', 'first_name', 'last_name', 'maiden_name', 'relationship_to_you')

        # 'created_date', 'updated_date', 


# class User(models.Model):
#     first_name = models.CharField(max_length=255, blank=True, null=True)
#     last_name = models.CharField(max_length=255, blank=True, null=True)
#     username = models.CharField(max_length=255, blank=True, null=True)
#     birthdate = models.CharField(max_length=255, blank=True, null=True)
#     email = models.CharField(max_length=255, blank=True, null=True)

#     def __str__(self):
#         return self.username