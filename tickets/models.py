from django.db import models

class Ticket(models.Model):
    PRIORITYS = (
        (0, '---------'),
        (1, '1 - High'),
        (2, '2 - Medium'),
        (3, '3 - Low'),
    )

    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300, blank=True)
    priority = models.PositiveIntegerField(choices=PRIORITYS, default=PRIORITYS[0])
    deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    position = models.PositiveIntegerField()
    column = models.ForeignKey(
        'columns.Column',
        related_name='tickets',
        on_delete=models.CASCADE
    )
    creator = models.ForeignKey(
        'jwt_auth.User',
        related_name='created_tickets',
        on_delete=models.SET_NULL,
        null=True
    )
    holders = models.ManyToManyField(
        'jwt_auth.User',
        related_name='held_tickets',
        blank=True
    )

    def __str__(self):
        return f"{self.column.kanban.name} - {self.column.name} - {self.name}"
