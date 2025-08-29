from rest_framework import serializers
from .models import Place

class PlaceSerializer(serializers.ModelSerializer):
    fun_facts = serializers.ListField(
        child=serializers.CharField(), allow_empty=True
    )
    visitor_tips = serializers.ListField(
        child=serializers.CharField(), allow_empty=True
    )

    class Meta:
        model = Place
        fields = [
            'id', 'name', 'location', 'banner', 'description',
            'history', 'architecture', 'fun_facts', 'visitor_tips'
        ]
