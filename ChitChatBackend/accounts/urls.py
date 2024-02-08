from django.urls import path
from .views import SigninView, SignupView, CheckUsernameAvailability


urlpatterns = [
    path('signin/', SigninView.as_view()),
    path('signup/',  SignupView.as_view()),
    path('username-availability/', CheckUsernameAvailability.as_view()),
]
