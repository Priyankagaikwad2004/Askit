# views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Place
from .serializers import PlaceSerializer
from django.db.models import Q
from rest_framework import generics

@api_view(['GET'])
def smart_place_search(request):
    query = request.GET.get('q', '')
    if not query:
        return Response({"error": "Search query 'q' is required"}, status=400)

    query = query.strip()

    # Search across all relevant fields
    results = Place.objects.filter(
        Q(name__icontains=query) |
        Q(location__icontains=query) |
        Q(description__icontains=query) |
        Q(history__icontains=query) |
        Q(architecture__icontains=query) |
        Q(fun_facts__icontains=query) |
        Q(visitor_tips__icontains=query)
    )

    if results.exists():
        serializer = PlaceSerializer(results, many=True)
        return Response(serializer.data)
    else:
        return Response({"message": f"No places found for '{query}'"}, status=404)

# views.py
from rest_framework import generics
from .models import Place
from .serializers import PlaceSerializer

class PlaceCreateView(generics.CreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
