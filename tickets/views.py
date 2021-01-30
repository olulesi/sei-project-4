from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .models import Ticket
from .serializers.common import TicketSerializer
from .serializers.populated import PopulatedTicketSerializer

class TicketListView(APIView):

    # ! permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['creator'] = request.user.id
        ticket_to_create = TicketSerializer(data=request.data)
        if ticket_to_create.is_valid():
            ticket_to_create.save()
            return Response(ticket_to_create.data, status=status.HTTP_201_CREATED)
        return Response(ticket_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class TicketDetailView(APIView):

    # ! permission_classes = (IsAuthenticated, )

    def get_ticket(self, pk):
        try:
            return Ticket.objects.get(pk=pk)
        except:
            raise NotFound(detail='Ticket Not Found')

    def get(self, _request, pk):
        ticket = self.get_ticket(pk)
        serialized_ticket = PopulatedTicketSerializer(ticket)
        return Response(serialized_ticket.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        ticket_to_edit = self.get_ticket(pk)
        edited_ticket = TicketSerializer(ticket_to_edit, data=request.data)
        if edited_ticket.is_valid():
            edited_ticket.save()
            return Response(edited_ticket.data, status=status.HTTP_202_ACCEPTED)
        return Response(edited_ticket.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        ticket_to_delete = self.get_ticket(pk)
        ticket_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
