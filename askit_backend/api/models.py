from django.db import models
from django.contrib.auth.hashers import make_password

class UserData(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    class Meta:
        db_table = 'user_data'
