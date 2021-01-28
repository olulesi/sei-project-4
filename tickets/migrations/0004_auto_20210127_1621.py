# Generated by Django 3.1.5 on 2021-01-27 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0003_auto_20210127_1610'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='priority',
            field=models.PositiveIntegerField(blank=True, choices=[(0, '---------'), (1, '1 - High'), (2, '2 - Medium'), (3, '3 - Low')]),
        ),
    ]
