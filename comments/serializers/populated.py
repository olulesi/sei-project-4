from drf_writable_nested.serializers import WritableNestedModelSerializer

from jwt_auth.serializers.common import NestedUserSerializer
from ..serializers.common import CommentSerializer
from comments.models import Comment

class PopulatedCommentSerializer(CommentSerializer):

    commentor = NestedUserSerializer()

class WritablePopulatedCommentSerializer(WritableNestedModelSerializer):

    commentor = NestedUserSerializer()

    class Meta:
        model = Comment
        fields = ('text', 'commentor')
