from django.db import models

class News(models.Model):
    title_en = models.CharField(max_length=255, verbose_name="Title (English)")
    title_ta = models.CharField(max_length=255, verbose_name="Title (Tamil)")
    text_en = models.TextField(verbose_name="Text (English)")
    text_ta = models.TextField(verbose_name="Text (Tamil)")
    tag_en = models.CharField(max_length=100, verbose_name="Tag (English)", default="Organisation")
    tag_ta = models.CharField(max_length=100, verbose_name="Tag (Tamil)", default="அமைப்பு")
    img = models.CharField(max_length=500, verbose_name="Image Path or URL", default="/assets/branding/flag.png")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "News Update"
        verbose_name_plural = "News Updates"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title_en} ({self.created_at.strftime('%Y-%m-%d')})"


class Event(models.Model):
    src = models.CharField(max_length=500, verbose_name="Event Image Path or URL")
    caption_en = models.CharField(max_length=255, verbose_name="Caption (English)")
    caption_ta = models.CharField(max_length=255, verbose_name="Caption (Tamil)")
    col_span = models.IntegerField(default=2, verbose_name="Layout Column Span")
    row_span = models.IntegerField(default=1, verbose_name="Layout Row Span")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Event Photo"
        verbose_name_plural = "Event Photos"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.caption_en} ({self.col_span}x{self.row_span})"


class JoinRequest(models.Model):
    INTEREST_CHOICES = [
        ('social_dev', 'Social Development'),
        ('community', 'Community Service'),
        ('digital', 'Digital & Technology'),
        ('political', 'Political Training'),
        ('events', 'Event Management'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    name = models.CharField(max_length=255, verbose_name="Full Name")
    phone = models.CharField(max_length=50, verbose_name="Phone Number")
    email = models.EmailField(verbose_name="Email Address", blank=True, null=True)
    dob = models.DateField(verbose_name="Date of Birth", blank=True, null=True)
    gender = models.CharField(max_length=20, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], blank=True)
    address = models.TextField(verbose_name="Residential Address", blank=True)
    area = models.CharField(max_length=255, verbose_name="Area / Ward")
    occupation = models.CharField(max_length=255, verbose_name="Occupation / Profession", blank=True)
    interests = models.CharField(max_length=500, verbose_name="Areas of Interest", blank=True)
    photo_data = models.TextField(verbose_name="Profile Photo (Base64)", blank=True, null=True)
    photo_name = models.CharField(max_length=255, verbose_name="Photo Filename", blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="Application Status")
    admin_notes = models.TextField(verbose_name="Admin Notes", blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Membership Application"
        verbose_name_plural = "Membership Applications"
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} - {self.phone} ({self.submitted_at.strftime('%Y-%m-%d')})"


class Petition(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Rejected', 'Rejected'),
        ('Solved', 'Solved'),
    ]

    name = models.CharField(max_length=255, verbose_name="Petitioner Name")
    phone = models.CharField(max_length=50, verbose_name="Phone Number")
    email = models.EmailField(verbose_name="Email Address", blank=True, null=True)
    area = models.CharField(max_length=255, verbose_name="Area / Ward", blank=True)
    subject = models.CharField(max_length=500, verbose_name="Subject")
    summary = models.TextField(verbose_name="Summary")
    photo_data = models.TextField(verbose_name="Petition Photo (Base64)", blank=True, null=True)
    photo_name = models.CharField(max_length=255, verbose_name="Photo Filename", blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending', verbose_name="Petition Status")
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False, verbose_name="Read by Admin")

    class Meta:
        verbose_name = "Petition"
        verbose_name_plural = "Petitions"
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} - {self.subject} ({self.submitted_at.strftime('%Y-%m-%d')})"
