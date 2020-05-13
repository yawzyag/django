from django.db import models
from courses.models import Course

# Create your models here.

class CurricularSubject(models.Model):
    title = models.CharField(max_length=100)
    #course = models.ManyToManyField(Course)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)