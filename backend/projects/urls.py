from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ProjectViewSet,
    AboutViewSet,
    SkillViewSet,
    ExperienceViewSet,
    EducationViewSet,
    LanguageViewSet,
    ContactMessageViewSet,
)


router = DefaultRouter()

router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'about', AboutViewSet, basename='about')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'experiences', ExperienceViewSet, basename='experience')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'languages', LanguageViewSet, basename='language')
router.register(r'contact', ContactMessageViewSet, basename='contact')


urlpatterns = [
    path('', include(router.urls)),
]
