from jwt_auth.serializers.common import NestedUserSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from tasks.serializers.common import TaskSerializer
from ..serializers.common import TicketSerializer

class PopulatedTicketSerializer(TicketSerializer):

    creator = NestedUserSerializer()
    holders = NestedUserSerializer(many=True)
    comments = PopulatedCommentSerializer(many=True)
    tasks = TaskSerializer(many=True)
