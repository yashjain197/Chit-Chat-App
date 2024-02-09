from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .serializer import SignUpSerializer, UserSerializer

def get_auth_for_user(user):
    tokens = RefreshToken.for_user(user)
    return {
        'user':UserSerializer(user).data,
        'tokens': {
            'access': str(tokens.access_token),
            'refresh': str(tokens),
        }
    }


class SigninView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username, password)
        if not username or not password:    
            return Response(status=400)
        
        user = authenticate(username=username, password=password)

        if not user:
            output = {
                "success": False,
                "status":401,
                "message": "Either username or password is wrong. Please try again"
            }
            return Response(output, status=status.HTTP_200_OK)
        
        user_data = get_auth_for_user(user)

        output = {
                "success": True,
                "status":200,
                "user" : user_data['user']
            }
        return Response(output, status=status.HTTP_200_OK)

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        new_user = SignUpSerializer(data = request.data)
        new_user.is_valid(raise_exception=True)
        user = new_user.save()

        user_data = get_auth_for_user(user)

        return Response(user_data)

class CheckUsernameAvailability(APIView):
    
    def get(self, request):
        username = request.GET.get("username")
        is_username_available = False
        print(username)
        try:
            User.objects.get(username = str(username))
            is_username_available: False

        except User.DoesNotExist:
            is_username_available = True

        except Exception as e:
             output = {
                "success" : False,
                "status": 400,
                "message" : "something went wrong"
                }
             return Response(output, status=status.HTTP_400_BAD_REQUEST)
    
            
        output = {
            "success" : True,
            "status": 200,
            "is_username_available" : is_username_available
        }
        return Response(output, status=status.HTTP_200_OK)