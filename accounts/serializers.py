from rest_framework import serializers
from customuser.models import User, user_type
from django.contrib.auth import authenticate


# User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email')


class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_type
        fields = ('user', 'is_teach', 'is_student')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'password', 'email', 'is_teacher')
        extra_kwargs = {'password' : {'write_only': True}}


    def create(self, validated_data, **kwargs):
        user = User.objects.create_user(validated_data['email'], validated_data['name'], validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if (user and user.is_active):
            return user
        raise serializers.ValidationError("Incorrect Credentials")