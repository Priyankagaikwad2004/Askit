from rest_framework import serializers
from .models import Place

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = [
            'id', 'name', 'location', 'banner', 'description',
            'history', 'architecture', 'fun_facts', 'visitor_tips'
        ]
