from jwt_auth.serializers.common import NestedUserSerializer
from columns.serializers.populated import PopulatedColumnSerializer
from ..serializers.common import KanbanSerializer

class PopulatedKanbanSerializer(KanbanSerializer):

    owner = NestedUserSerializer()
    members = NestedUserSerializer(many=True)
    columns = PopulatedColumnSerializer(many=True)
