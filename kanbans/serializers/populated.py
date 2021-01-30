from jwt_auth.serializers.common import NestedUserSerializer
from jwt_auth.serializers.common import UserSerializer
from columns.serializers.populated import PopulatedColumnSerializer
from ..serializers.common import KanbanSerializer
# from ..serializers.common import UpdateKanbanSerializer

from columns.models import Column
from tickets.models import Ticket

class PopulatedKanbanSerializer(KanbanSerializer):

    owner = NestedUserSerializer()
    members = NestedUserSerializer(many=True)
    columns = PopulatedColumnSerializer(many=True)

# class PopulatedUpdateKanbanSerializer(UpdateKanbanSerializer):

#     columns = PopulatedColumnSerializer(many=True)

#     def update(self, kanban, data):
#         columns_data = data.pop('columns')

#         kanban.name = data.get('name', kanban.name)

#         if columns_data:
#             columns = [Column.objects.get_or_create(**column_data) for column_data in columns_data]
#             kanban.set(columns)

#         return kanban
