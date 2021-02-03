# Generated by Django 3.1.5 on 2021-02-02 16:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Kanban',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('background', models.PositiveIntegerField(choices=[(0, 'Default Background'), (1, 'Background 1'), (2, 'Background 2'), (3, 'Background 3'), (4, 'Background 4')], default=0)),
                ('members', models.ManyToManyField(blank=True, related_name='kanbans_member_of', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='kanbans_owner_of', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
