from rest_framework import serializers
from ..models import Kanban

class KanbanSerializer(serializers.ModelSerializer):

    class Meta:
        model = Kanban
        fields = '__all__'
