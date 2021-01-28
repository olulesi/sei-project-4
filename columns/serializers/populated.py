from tickets.serializers.populated import PopulatedTicketSerializer
from ..serializers.common import ColumnSerializer

class PopulatedColumnSerializer(ColumnSerializer):

    tickets = PopulatedTicketSerializer(many=True)
