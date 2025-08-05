# urls.py
from django.urls import path
from .views import smart_place_search

urlpatterns = [
    path('place/', smart_place_search),
]
