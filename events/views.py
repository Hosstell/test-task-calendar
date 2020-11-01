from django.shortcuts import render, get_object_or_404
from rest_framework import generics, viewsets, filters, views
from rest_framework.response import Response

from events.models import Event
from events.serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    class Meta:
        model = Event

    def list(self, request, *args, **kwargs):
        # response = super().list(request, args, kwargs)
        events = Event.objects.all()
        events_data = EventSerializer(events, many=True).data
        return Response(events_data)

    def some_items(self, request, *args, **kwargs):
        ids = request.query_params['ids']
        ids = ids.split(',')
        events = Event.objects.filter(id__in=ids)
        events_data = EventSerializer(events, many=True).data
        return Response(events_data)


    def retrieve(self, request, *args, **kwargs):
        event_id = kwargs['pk']
        event = get_object_or_404(Event, id=event_id)
        event_data = self.get_serializer(event).data
        print(request)
        return Response(event_data)


class EventActions(views.APIView):
    def put(self, request, pk):
        event = get_object_or_404(Event, id=pk)

        name = request.POST['name']
        start_date = request.POST['startDate']
        end_date = request.POST['endDate']

        event.name = name
        event.start_date = start_date
        event.end_date = end_date
        event.save()

        return Response({'status': True})

    def delete(self, request, pk):
        event = get_object_or_404(Event, id=pk)
        event.delete()
        return Response({'status': True})


class CreatingEvent(views.APIView):
    def post(self, request):
        name = request.POST['name']
        start_date = request.POST['startDate']
        end_date = request.POST['endDate']

        Event.objects.create(
            name=name,
            start_date=start_date,
            end_date=end_date
        )

        return Response({'status': True})
