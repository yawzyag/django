from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from curricular_subject.models import curricular_subject
from customuser.models import User

# Create your models here.


class Test(models.Model):
    title = models.CharField(max_length=100)
    note = models.IntegerField(blank=True, null=True,validators=[MinValueValidator(0),
                                       MaxValueValidator(5)])
    detail = models.CharField(max_length=500, blank=True)
    curricular_subject = models.ForeignKey(curricular_subject, on_delete=models.CASCADE)
    tested = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
