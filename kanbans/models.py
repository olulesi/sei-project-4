from django.db import models

class Kanban(models.Model):
    BACKGROUNDS = (
        (0, 'Default Background'),
        (1, 'Background 1'),
        (2, 'Background 2'),
        (3, 'Background 3'),
        (4, 'Background 4'),
    )
    name = models.CharField(max_length=30)
    background = models.PositiveIntegerField(choices=BACKGROUNDS, default=BACKGROUNDS[0][0])
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'kanbans_owner_of',
        on_delete=models.CASCADE
    )
    members = models.ManyToManyField(
        'jwt_auth.User',
        related_name='kanbans_member_of',
        blank=True
    )

    def __str__(self):
        owner_name = self.owner.full_name if self.owner.full_name else self.owner.username
        return f"{self.name} by {owner_name}"
