from django.contrib import admin
from .models import Project, ProjectImage, About, Skill, Experience, Education, Language, ContactMessage


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "important", "created_at")
    list_filter = ("category", "important")
    search_fields = ("title", "description", "category")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ("name", "project")
    list_filter = ("project",)
    search_fields = ("name",)


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("name", "professional_title", "email", "location")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category")
    list_filter = ("category",)
    search_fields = ("name",)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        "position",
        "organization",
        "start_date",
        "end_date",
    )

    search_fields = (
        "position",
        "organization",
        "description",
    )

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = (
        "type",
        "degree",
        "institution",
        "field_of_study",
        "start_date",
        "end_date",
    )

    list_filter = ("type", "institution")

    search_fields = (
        "degree",
        "institution",
        "field_of_study",
        "description",
    )

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ("name", "level")
    list_filter = ("level",)
    search_fields = ("name",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "subject",
        "created_at",
    )

    list_filter = ("created_at",)

    search_fields = (
        "name",
        "email",
        "subject",
        "message",
    )

    readonly_fields = ("created_at",)

