# Generated by Django 3.0.6 on 2020-05-11 23:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0001_initial'),
        ('curricular_subject', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='curricular_subject',
            name='course',
            field=models.ManyToManyField(to='courses.Course'),
        ),
    ]