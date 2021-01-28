from django.urls import path
from .views import KanbanListView, KanbanDetailView

urlpatterns = [
    path('', KanbanListView.as_view()),
    path('<int:pk>/', KanbanDetailView.as_view())
]
