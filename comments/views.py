from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .models import Comment
from .serializers.common import CommentSerializer

class CommentListView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['commenter'] = request.user.id
        comment_to_create = CommentSerializer(data=request.data)
        if comment_to_create.is_valid():
            comment_to_create.save()
            return Response(comment_to_create.data, status=status.HTTP_201_CREATED)
        return Response(comment_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except:
            raise NotFound(detail='Comment Not Found')

    def put(self, request, pk):
        comment_to_edit = self.get_comment(pk)
        edited_comment = CommentSerializer(comment_to_edit, data=request.data)
        if edited_comment.is_valid():
            edited_comment.save()
            return Response(edited_comment.data, status=status.HTTP_202_ACCEPTED)
        return Response(edited_comment.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        comment_to_delete = self.get_comment(pk)
        comment_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
