from django.db import models

class Comment(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    ticket = models.ForeignKey(
        'tickets.Ticket',
        related_name='comments',
        on_delete=models.CASCADE
    )
    commentor = models.ForeignKey(
        'jwt_auth.User',
        related_name='posted_comments',
        on_delete=models.SET_NULL,
        null=True
    )

    def __str__(self):
        time_and_date = self.created_at.strftime('%H:%M:%S %d/%m/%Y')
        return f"{self.ticket.name} - {self.commentor.full_name} at {time_and_date}"
