from django.urls import path
from .views import SigninView, SignupView


urlpatterns = [
    path('signin/', SigninView.as_view()),
    path('signup/',  SignupView.as_view())
]
