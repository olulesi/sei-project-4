from django.db import models

class Task(models.Model):
    text = models.CharField(max_length=50)
    complete = models.BooleanField(default=False)
    ticket = models.ForeignKey(
        'tickets.Ticket',
        related_name='tasks',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.ticket.name} - {self.text}..."
