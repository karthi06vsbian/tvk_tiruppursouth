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
    name = models.CharField(max_length=255, verbose_name="Full Name")
    phone = models.CharField(max_length=50, verbose_name="Phone Number")
    area = models.CharField(max_length=255, verbose_name="Area / Ward")
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Volunteer Request"
        verbose_name_plural = "Volunteer Requests"
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} - {self.phone} ({self.submitted_at.strftime('%Y-%m-%d')})"


class Petition(models.Model):
    name = models.CharField(max_length=255, verbose_name="Petitioner Name")
    phone = models.CharField(max_length=50, verbose_name="Phone Number")
    subject = models.CharField(max_length=500, verbose_name="Subject")
    summary = models.TextField(verbose_name="Summary")
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False, verbose_name="Read by Admin")

    class Meta:
        verbose_name = "Petition"
        verbose_name_plural = "Petitions"
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} - {self.subject} ({self.submitted_at.strftime('%Y-%m-%d')})"
