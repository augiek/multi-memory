# Generated by Django 3.1.4 on 2020-12-18 04:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal_app', '0002_auto_20201217_1811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='voice_body',
            field=models.FileField(blank=True, null=True, upload_to='./audio_files/'),
        ),
    ]
