# Generated by Django 3.1.5 on 2021-01-29 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='position',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
    ]