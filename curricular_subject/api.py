from .models import curricular_subject
from rest_framework import viewsets, permissions
from .serializers import CurricularSubjectSerializer


class CurricularSubjectViewSet(viewsets.ModelViewSet):
    queryset = curricular_subject.objects.all()
    permissions_class = [
        permissions.AllowAny
    ]
    serializer_class = CurricularSubjectSerializer
