from rest_framework import serializers
from .models import curricular_subject


class CurricularSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = curricular_subject
        fields = '__all__'
