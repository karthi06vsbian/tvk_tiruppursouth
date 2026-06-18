from django.contrib import admin
from api.models import News, Event, JoinRequest, Petition

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'tag_en', 'created_at')
    search_fields = ('title_en', 'title_ta', 'text_en', 'text_ta')
    list_filter = ('tag_en', 'created_at')
    fieldsets = (
        ('English Content', {
            'fields': ('title_en', 'tag_en', 'text_en')
        }),
        ('Tamil Content', {
            'fields': ('title_ta', 'tag_ta', 'text_ta')
        }),
        ('Media Settings', {
            'fields': ('img',)
        }),
    )

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('caption_en', 'col_span', 'row_span', 'created_at')
    search_fields = ('caption_en', 'caption_ta')
    list_filter = ('created_at',)
    fieldsets = (
        ('Content', {
            'fields': ('caption_en', 'caption_ta', 'src')
        }),
        ('Grid Layout', {
            'fields': ('col_span', 'row_span')
        }),
    )

@admin.register(JoinRequest)
class JoinRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'area', 'status', 'submitted_at')
    search_fields = ('name', 'phone', 'area', 'email')
    list_filter = ('status', 'submitted_at', 'gender')
    readonly_fields = ('submitted_at', 'photo_data')
    
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
            'fields': ('photo_data', 'photo_name'),
            'classes': ('collapse',)
        }),
        ('Admin Section', {
            'fields': ('status', 'admin_notes', 'submitted_at'),
            'classes': ('wide',)
        }),
    )

    def has_add_permission(self, request):
        return False

@admin.register(Petition)
class PetitionAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'subject', 'is_read', 'submitted_at')
    search_fields = ('name', 'phone', 'subject', 'summary')
    list_filter = ('is_read', 'submitted_at')
    list_editable = ('is_read',)
    readonly_fields = ('submitted_at',)
    
    fieldsets = (
        ('Petitioner Information', {
            'fields': ('name', 'phone')
        }),
        ('Petition Details', {
            'fields': ('subject', 'summary')
        }),
        ('Admin', {
            'fields': ('is_read', 'submitted_at')
        }),
    )

    def has_add_permission(self, request):
        return False
