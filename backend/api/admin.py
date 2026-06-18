from django.contrib import admin
from .models import Petition

# Note: News, Event, and JoinRequest are registered in the separate /admin/admin.py app.
# Only register Petition here to avoid AlreadyRegistered errors.

@admin.register(Petition)
class PetitionAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'subject', 'submitted_at', 'is_read')
    list_filter = ('is_read', 'submitted_at')
    search_fields = ('name', 'phone', 'subject', 'summary')
    list_editable = ('is_read',)
    readonly_fields = ('submitted_at',)
