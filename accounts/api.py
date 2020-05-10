from rest_framework import generics, permissions
from rest_framework.response import Response
from customuser.models import user_type

from knox.models import AuthToken
from .serializers import RegisterSerializer, UserSerializer, UserTypeSerializer, LoginSerializer


class RegistrationApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        print(request.data.get('is_teacher'))

        if (request.data.get('is_teacher')):
            usert = user_type(user=user, is_teach=True)
        else:
            usert = user_type(user=user, is_student=True)
        if(usert):
            usert.save()
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            "user_type": UserTypeSerializer(usert, context=self.get_serializer_context()).data,
        })


class LoginApi(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        user_t = user_type.objects.get(user=user.id)
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            "user_type": UserTypeSerializer(user_t, context=self.get_serializer_context()).data,
        })

class UserApi(generics.RetrieveAPIView):
    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserTypeApi(generics.RetrieveAPIView):
    permissions_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserTypeSerializer

    def get_object(self):
        return user_type.objects.get(user=self.request.user)


        