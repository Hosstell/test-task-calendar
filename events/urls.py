from django.contrib.auth.decorators import login_required
from django.urls import path

from . import views
from .views import EventViewSet, EventActions, CreatingEvent

urlpatterns = [
    path('get-list/', EventViewSet.as_view({'get': 'list'})),
    path('get-one/<int:pk>/', EventViewSet.as_view({'get': 'retrieve'})),
    path('get-some/', EventViewSet.as_view({'get': 'some_items'})),
    path('<int:pk>/', EventActions.as_view()),
    path('create-event/', CreatingEvent.as_view()),
]
