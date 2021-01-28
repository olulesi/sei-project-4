from django.urls import path
from .views import ColumnListView, ColumnDetailView

urlpatterns = [
    path('', ColumnListView.as_view()),
    path('<int:pk>/', ColumnDetailView.as_view())
]
