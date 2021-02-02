from drf_writable_nested.serializers import WritableNestedModelSerializer

from jwt_auth.serializers.common import NestedUserSerializer
from comments.serializers.populated import PopulatedCommentSerializer, WritablePopulatedCommentSerializer
from tasks.serializers.common import TaskSerializer
from ..serializers.common import TicketSerializer
from ..models import Ticket

class PopulatedTicketSerializer(TicketSerializer):

    creator = NestedUserSerializer()
    holders = NestedUserSerializer(many=True)
    comments = PopulatedCommentSerializer(many=True)
    tasks = TaskSerializer(many=True)

class WritablePopulatedTicketSerializer(WritableNestedModelSerializer):

    holders = NestedUserSerializer(many=True)
    comments = WritablePopulatedCommentSerializer(many=True)
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Ticket
        fields = ('name', 'description', 'priority', 'deadline', 'column', 'position', 'holders', 'comments', 'tasks', )