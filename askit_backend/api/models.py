from django.db import models
from django.contrib.auth.hashers import make_password

class UserData(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def save(self, *args, **kwargs):
        if not self.pk:  # Only hash password on create
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'user_data'  # 👈 This tells Django to use your existing table

