#!/usr/bin/env bash
set -o errexit  

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate --noinput

# (Optional) Load initial data if you have fixtures
python manage.py loaddata places/fixtures/data.json || true
