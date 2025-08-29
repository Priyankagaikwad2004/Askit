from django.db import models
from django.contrib.postgres.fields import ArrayField

class Place(models.Model):
    name = models.CharField(max_length=255)
    location = models.TextField()
    banner = models.URLField()
    description = models.TextField()
    history = models.TextField()
    architecture = models.TextField()
    fun_facts = ArrayField(models.TextField(), blank=True, default=list)
    visitor_tips = ArrayField(models.TextField(), blank=True, default=list)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'place'
