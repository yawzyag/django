from django.db import models
from courses.models import Course
from customuser.models import User

# Create your models here.

class curricular_subject(models.Model):
    title = models.CharField(max_length=100)
    course = models.ManyToManyField(Course)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)