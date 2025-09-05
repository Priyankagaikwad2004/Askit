import google.generativeai as genai
from django.conf import settings
import json
import re

genai.configure(api_key=settings.GEMINI_API_KEY)

def get_itinerary(city, days, budget, interests):
    prompt = f"""
    Plan a {days}-day trip to {city} under a budget of ₹{budget}.
    Focus on {interests}. 

    ⚠️ IMPORTANT: Respond ONLY in valid JSON format with this structure:
    {{
      "city": "{city}",
      "days": {days},
      "budget": {budget},
      "itinerary": [
        {{
          "day": 1,
          "morning": {{"places": [], "food": "", "cost": ""}},
          "afternoon": {{"places": [], "food": "", "cost": ""}},
          "evening": {{"places": [], "food": "", "cost": ""}}
        }}
      ],
      "tips": [],
      "budget_breakdown": {{
        "food": "",
        "entry_fees": "",
        "transport": ""
      }}
    }}
    """

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    # Clean response (remove markdown fences like ```json)
    text = response.text.strip()
    text = re.sub(r"^```json\s*|\s*```$", "", text, flags=re.DOTALL)

    # Parse JSON safely
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        # fallback: return raw text if parsing fails
        data = {"error": "Invalid JSON from Gemini", "raw_response": text}

    return data

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ai_utils import get_itinerary

@api_view(['POST'])
def generate_itinerary(request):
    city = request.data.get("city")
    days = request.data.get("days")
    budget = request.data.get("budget")
    interests = request.data.get("interests")

    itinerary = get_itinerary(city, days, budget, interests)
    return Response({"itinerary": itinerary})
