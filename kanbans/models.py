from django.db import models

class Kanban(models.Model):
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'kanbans_owner_of',
        on_delete=models.CASCADE
    )
    members = models.ManyToManyField(
        'jwt_auth.User',
        related_name='kanbans_member_of'
    )

    def __str__(self):
        return f"{self.name} by {self.owner.full_name}"
