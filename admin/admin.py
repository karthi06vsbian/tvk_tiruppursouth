from django.contrib import admin
from django.utils.html import format_html
from api.models import JoinRequest, Petition
from django.contrib.auth.models import Group, User

# Remove Authentication and Authorization options (Groups & Users) from Django Admin
try:
    admin.site.unregister(Group)
except admin.sites.NotRegistered:
    pass

try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass


@admin.register(JoinRequest)
class JoinRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'area', 'status', 'submitted_at', 'download_pdf_link', 'share_whatsapp_link')
    search_fields = ('name', 'phone', 'area', 'email')
    list_filter = ('status', 'submitted_at', 'gender')
    readonly_fields = ('submitted_at', 'photo_preview')
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'phone', 'email', 'dob', 'gender')
        }),
        ('Contact Details', {
            'fields': ('address', 'area', 'occupation')
        }),
        ('Membership Details', {
            'fields': ('interests',)
        }),
        ('Profile Photo', {
            'fields': ('photo_preview', 'photo_name'),
        }),
        ('Admin Section', {
            'fields': ('status', 'admin_notes', 'submitted_at'),
            'classes': ('wide',)
        }),
    )

    def download_pdf_link(self, obj):
        return format_html('<a class="button" href="/api/members/{}/pdf/" target="_blank" style="background-color: #5a0c12; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 0.85rem;">PDF</a>', obj.id)
    download_pdf_link.short_description = 'PDF'

    def share_whatsapp_link(self, obj):
        return format_html('<a class="button" href="/api/members/{}/share/" target="_blank" style="background-color: #25D366; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 0.85rem; border-color: #25D366;">Share</a>', obj.id)
    share_whatsapp_link.short_description = 'Share'

    def photo_preview(self, obj):
        if obj.photo_data:
            return format_html('<img src="{}" style="max-width: 150px; max-height: 150px; border-radius: 50%; border: 2px solid #ffd84a; object-fit: cover;" />', obj.photo_data)
        return "No photo uploaded"
    photo_preview.short_description = "Photo Preview"

    def has_add_permission(self, request):
        return False

@admin.register(Petition)
class PetitionAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'area', 'problem_type', 'status', 'is_read', 'submitted_at', 'download_pdf_link', 'share_whatsapp_link')
    search_fields = ('name', 'phone', 'subject', 'summary', 'email', 'area', 'problem_type', 'address')
    list_filter = ('area', 'problem_type', 'status')
    list_editable = ('status', 'is_read')
    readonly_fields = ('submitted_at', 'photo_preview', 'google_map_link')
    
    fieldsets = (
        ('Petitioner Information', {
            'fields': ('name', 'phone', 'email', 'area', 'address', 'google_map_location', 'google_map_link')
        }),
        ('Petition Details', {
            'fields': ('problem_type', 'subject', 'summary')
        }),
        ('Petition Photo', {
            'fields': ('photo_preview', 'photo_name'),
        }),
        ('Admin', {
            'fields': ('status', 'is_read', 'submitted_at')
        }),
    )

    def download_pdf_link(self, obj):
        return format_html('<a class="button" href="/api/petitions/{}/pdf/" target="_blank" style="background-color: #5a0c12; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 0.85rem;">PDF</a>', obj.id)
    download_pdf_link.short_description = 'PDF'

    def share_whatsapp_link(self, obj):
        return format_html('<a class="button" href="/api/petitions/{}/share/" target="_blank" style="background-color: #25D366; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 0.85rem; border-color: #25D366;">Share</a>', obj.id)
    share_whatsapp_link.short_description = 'Share'

    def google_map_link(self, obj):
        if obj.google_map_location:
            return format_html('<a href="{}" target="_blank" style="background-color: #25D366; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 0.85rem;">📍 Open in Google Maps</a>', obj.google_map_location)
        return "No location provided"
    google_map_link.short_description = "Google Map Link"

    def photo_preview(self, obj):
        if obj.photo_data:
            if obj.photo_data.startswith('data:application/pdf'):
                return format_html('<a href="{}" download="{}" style="background-color: #5a0c12; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; text-decoration: none; display: inline-block;">📄 Download PDF Attachment</a>', obj.photo_data, obj.photo_name or "attachment.pdf")
            else:
                return format_html('<img src="{}" style="max-width: 350px; max-height: 350px; border-radius: 8px; border: 1px solid rgba(90, 12, 18, 0.15);" />', obj.photo_data)
        return "No file uploaded"
    photo_preview.short_description = "Attached File Preview"

    def has_add_permission(self, request):
        return False
