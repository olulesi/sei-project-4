# Generated by Django 3.1.5 on 2021-01-27 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_auto_20210127_1250'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='full_name',
            field=models.CharField(max_length=50),
        ),
    ]
