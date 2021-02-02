from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .models import Kanban
from .serializers.common import KanbanSerializer
from .serializers.populated import PopulatedKanbanSerializer

class KanbanListView(APIView):

    # ! permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        kanban_to_create = KanbanSerializer(data=request.data)
        if kanban_to_create.is_valid():
            kanban_to_create.save()
            return Response(kanban_to_create.data, status=status.HTTP_201_CREATED)
        return Response(kanban_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class KanbanDetailView(APIView):

    # ! permission_classes = (IsAuthenticated, )
    
    def get_kanban(self, pk):
        try:
            return Kanban.objects.get(pk=pk)
        except:
            raise NotFound(detail='Kanban Not Found')

    def get(self, _request, pk):
        kanban = self.get_kanban(pk)
        serialized_kanban = PopulatedKanbanSerializer(kanban)
        return Response(serialized_kanban.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        kanban_to_edit = self.get_kanban(pk)
        edited_kanban = KanbanSerializer(kanban_to_edit, data=request.data)
        if edited_kanban.is_valid():
            edited_kanban.save()
            return Response(edited_kanban.data, status=status.HTTP_202_ACCEPTED)
        return Response(edited_kanban.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        kanban_to_delete = self.get_kanban(pk)
        kanban_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
