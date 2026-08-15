from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    category = models.CharField(max_length=100)
    important = models.BooleanField(default=False)

    objectives = models.TextField(blank=True)
    technologies = models.TextField(blank=True)
    work_done = models.TextField(blank=True)
    architecture = models.TextField(blank=True)
    results = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-important", "-created_at"]

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="images"
    )
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="projects/")

    def __str__(self):
        return f"{self.project.title} - {self.name}"



class About(models.Model):
    # Identité professionnelle
    name = models.CharField(max_length=200)
    professional_title = models.CharField(max_length=200)
    profile_photo = models.ImageField(
        upload_to="about/",
        blank=True,
        null=True
    )

    # Présentation
    short_description = models.TextField()
    biography = models.TextField()


    # Informations générales
    location = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)

    # Liens professionnels
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)

    # CV
    cv = models.FileField(
        upload_to="documents/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("database", "Bases de données"),
        ("data_ai", "Data Science & Intelligence Artificielle"),
        ("development", "Développment"),
        ("systems", "Systèmes & outils"),
        ("fundamentals", "Fondamentaux informatiques"),
    ]

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES
    )

    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["category", "id"]

    def __str__(self):
        return self.name


class Experience(models.Model):
    position = models.CharField(max_length=200)
    organization = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.position


class Education(models.Model):

    TYPE_CHOICES = [
        ("degree", "Diplôme"),
        ("certificate", "Certificat"),
    ]

    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default="degree"
    )

    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)

    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.degree} - {self.institution}"



class Language(models.Model):

    LEVEL_CHOICES = [
        ("native", "Natif"),
        ("fluent", "Courant"),
        ("operational", "Opérationnel"),
        ("intermediate", "Intermédiaire"),
        ("basic", "Notions"),
    ]

    name = models.CharField(max_length=100)
    level = models.CharField(
        max_length=20,
        choices=LEVEL_CHOICES
    )

    def __str__(self):
        return f"{self.name} - {self.get_level_display()}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.subject}"