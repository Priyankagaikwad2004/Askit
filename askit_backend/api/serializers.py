from rest_framework import serializers
from .models import UserData
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }



class CustomLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = UserData.objects.get(email=email)
        except UserData.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        if not check_password(password, user.password):
            raise serializers.ValidationError("Invalid email or password")

        refresh = RefreshToken()
        refresh['email'] = user.email
        refresh['id'] = user.id

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }