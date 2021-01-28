from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .models import Task
from .serializers.common import TaskSerializer

class TaskListView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):
        task_to_create = TaskSerializer(data=request.data)
        if task_to_create.is_valid():
            task_to_create.save()
            return Response(task_to_create.data, status=status.HTTP_201_CREATED)
        return Response(task_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class TaskDetailView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_task(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except:
            raise NotFound(detail='Task Not Found')

    def put(self, request, pk):
        task_to_edit = self.get_task(pk)
        edited_task = TaskSerializer(task_to_edit, data=request.data)
        if edited_task.is_valid():
            edited_task.save()
            return Response(edited_task.data, status=status.HTTP_202_ACCEPTED)
        return Response(edited_task.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        task_to_delete = self.get_task(pk)
        task_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
