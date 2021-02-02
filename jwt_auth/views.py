from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers.common import UserSerializer, NestedUserSerializer
from .serializers.populated import PopulatedUserSerializer

User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration Successful'}, status=status.HTTP_201_CREATED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')
        expiry_time = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(expiry_time.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        return Response({'token': token, 'message': f"Welcome Back {user_to_login.full_name}"})

class ProfileView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        current_user = User.objects.get(pk=request.user.id)
        serialized_current_user = PopulatedUserSerializer(current_user)
        return Response(serialized_current_user.data, status=status.HTTP_200_OK)

    def put(self, request):
        current_user = User.objects.get(pk=request.user.id)
        edited_current_user = UserSerializer(current_user, data=request.data)
        if edited_current_user.is_valid():
            edited_current_user.save()
            return Response(edited_current_user.data, status=status.HTTP_202_ACCEPTED)
        return Response(edited_current_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request):
        current_user = User.objects.get(pk=request.user.id)
        current_user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserView(APIView):

    # ! permission_classes = (IsAuthenticated, )

    def get(self, request, email):
        try:
            user = User.objects.get(email=email)
        except:
            raise NotFound(detail='User Not Found')
        serialized_user = NestedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)
