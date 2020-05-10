from .models import User
from rest_framework import viewsets, permissions
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_class = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
