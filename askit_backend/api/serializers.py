from rest_framework import serializers
from .models import UserData
from django.contrib.auth.hashers import check_password, make_password
from rest_framework_simplejwt.tokens import RefreshToken


# 🔹 For Registration
class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Automatically hash the password when creating a new user
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


# 🔹 For Login
class CustomLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = UserData.objects.get(email=email)
        except UserData.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        if not check_password(password, user.password):
            raise serializers.ValidationError("Invalid email or password")

        # ✅ Generate proper tokens tied to the user
        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "email": user.email,
            }
        }
