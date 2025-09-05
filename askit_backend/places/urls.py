# urls.py
from django.urls import path
from .views import PlaceCreateView, smart_place_search
from . import views

urlpatterns = [
    path('place/', smart_place_search),
    path('add-place/', PlaceCreateView.as_view(), name='add-place'),
    path("generate-itinerary/", views.generate_itinerary, name="generate-itinerary"),
]
