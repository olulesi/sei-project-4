from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=50, unique=True)
    role = models.CharField(max_length=30, blank=True)
    avatar = models.CharField(max_length=300, blank=True)
