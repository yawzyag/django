from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class Test(models.Model):
    title = models.CharField(max_length=100)
    note = models.IntegerField(validators=[MinValueValidator(0),
                                       MaxValueValidator(5)])
    detail = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
