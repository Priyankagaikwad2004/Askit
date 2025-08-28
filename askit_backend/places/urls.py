# urls.py
from django.urls import path
from .views import PlaceCreateView, smart_place_search

urlpatterns = [
    path('place/', smart_place_search),
    path('add-place/', PlaceCreateView.as_view(), name='add-place'),
]
