from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название события')
    start_date = models.DateField()
    end_date = models.DateField()

    created = models.DateTimeField(auto_now_add=True, verbose_name='Создан')
    updated = models.DateTimeField(auto_now=True, verbose_name='Изменен')
