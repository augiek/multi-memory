from django import forms
from .models import Entry

# class UserForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = ('first_name', 'last_name','username', 'birthdate','email')

class EntryForm(forms.ModelForm):
    class Meta:
        model = Entry
        fields = ('written_body', 'voice_body_temp','text_tags', 'location_tags', 'entry_title', 'privacy')



# class User(models.Model):
#     first_name = models.CharField(max_length=255, blank=True, null=True)
#     last_name = models.CharField(max_length=255, blank=True, null=True)
#     username = models.CharField(max_length=255, blank=True, null=True)
#     birthdate = models.CharField(max_length=255, blank=True, null=True)
#     email = models.CharField(max_length=255, blank=True, null=True)

#     def __str__(self):
#         return self.username