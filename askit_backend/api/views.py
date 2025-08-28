from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserDataSerializer
from rest_framework import status
from .models import UserData
from .serializers import CustomLoginSerializer

class RegisterView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # check if email exists
        if UserData.objects.filter(email=email).exists():
            return Response(
                {"detail": "This email is already registered."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = UserDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "User registered successfully!"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = CustomLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)