from django.db import models

class Column(models.Model):
    name = models.CharField(max_length=30)
    position = models.PositiveIntegerField()
    kanban = models.ForeignKey(
        'kanbans.Kanban',
        related_name='columns',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.name} - Column {self.position} on {self.kanban.name}"
