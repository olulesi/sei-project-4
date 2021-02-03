from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .models import Column
from .serializers.common import ColumnSerializer

class ColumnListView(APIView):

    # ! permission_classes = (IsAuthenticated, )

    def post(self, request):
        column_to_create = ColumnSerializer(data=request.data)
        if column_to_create.is_valid():
            column_to_create.save()
            return Response(column_to_create.data, status=status.HTTP_201_CREATED)
        return Response(column_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ColumnDetailView(APIView):

    # ! permission_classes = (IsAuthenticated, )

    def get_column(self, pk):
        try:
            return Column.objects.get(pk=pk)
        except:
            raise NotFound(detail='Column Not Found')

    def put(self, request, pk):
        column_to_edit = self.get_column(pk)
        edited_column = ColumnSerializer(column_to_edit, data=request.data)
        if edited_column.is_valid():
            edited_column.save()
            return Response(edited_column.data, status=status.HTTP_202_ACCEPTED)
        return Response(edited_column.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        column_to_delete = self.get_column(pk)
        column_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
