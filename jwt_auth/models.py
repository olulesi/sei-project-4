from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    full_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    role = models.CharField(max_length=30, blank=True)
    avatar = models.CharField(max_length=300, blank=True)

    def __str__(self):
        name = self.full_name if self.full_name else self.username
        return f"{name} - {self.email}"
