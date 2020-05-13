from .models import Course
from rest_framework import viewsets, permissions
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    permissions_class = [
        permissions.AllowAny
    ]
    serializer_class = CourseSerializer
