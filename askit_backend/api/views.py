from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserDataSerializer
from rest_framework import status
from .models import UserData
from .serializers import CustomLoginSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = UserDataSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            # Check if email already exists
            if UserData.objects.filter(email=email).exists():
                return Response(
                    {"detail": "This email is already registered."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            serializer.save()
            return Response({"detail": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    def post(self, request):
        serializer = CustomLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']  # make sure your serializer returns user
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                }
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
