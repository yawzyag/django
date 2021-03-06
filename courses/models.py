from django.db import models
from customuser.models import User

# Create your models here.

class Course(models.Model):
    title = models.CharField(max_length=100)
    students = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)