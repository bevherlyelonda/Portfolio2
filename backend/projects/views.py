from rest_framework import viewsets

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from django.conf import settings
from django.core.mail import EmailMessage

from .models import (
    Project,
    About,
    Skill,
    Experience,
    Education,
    Language,
    ContactMessage,
)

from .serializers import (
    ProjectSerializer,
    AboutSerializer,
    SkillSerializer,
    ExperienceSerializer,
    EducationSerializer,
    LanguageSerializer,
    ContactMessageSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = "slug"


class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]

        return [IsAdminUser()]

    def perform_create(self, serializer):
        contact_message = serializer.save()

        # ==========================================
        # EMAIL POUR TOI
        # ==========================================

        notification_email = EmailMessage(
            subject=f"Nouveau message : {contact_message.subject}",
            body=(
                f"Nom : {contact_message.name}\n"
                f"Email : {contact_message.email}\n\n"
                f"Message :\n"
                f"{contact_message.message}"
            ),
            from_email=settings.MAILERS["default"]["OPTIONS"]["username"],
            to=[settings.CONTACT_EMAIL],
            reply_to=[contact_message.email],
        )

        notification_email.send(fail_silently=False)

        # ==========================================
        # RÉPONSE AUTOMATIQUE
        # ==========================================

        auto_reply = EmailMessage(
            subject="Merci pour votre message",
            body=(
                f"Bonjour M./Mme {contact_message.name},\n\n"

                "Merci d'avoir pris le temps de me contacter. "
                "J'ai bien reçu votre message et je reviendrai "
                "vers vous dès que possible.\n\n"

                "Cordialement,\n\n"

                "Bevherly Juvhel ELONDA\n"
                "Administrateur de bases de données Oracle\n"
                "Développeur\n"
                "Data Scientist & Ingénieur IA en devenir"
            ),
            from_email=settings.MAILERS["default"]["OPTIONS"]["username"],
            to=[contact_message.email],
        )

        auto_reply.send(fail_silently=False)