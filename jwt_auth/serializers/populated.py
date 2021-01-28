from kanbans.serializers.common import KanbanSerializer
from ..serializers.common import UserSerializer

class PopulatedUserSerializer(UserSerializer):

    kanbans_owner_of = KanbanSerializer(many=True)
    kanbans_member_of = KanbanSerializer(many=True)
