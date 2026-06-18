from django.contrib import admin
from api.models import News, Event, JoinRequest

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
    list_display = ('name', 'phone', 'area', 'submitted_at')
    search_fields = ('name', 'phone', 'area')
    list_filter = ('submitted_at',)
    # Make volunteer request submissions read-only in the admin to prevent modifications
    readonly_fields = ('name', 'phone', 'area', 'submitted_at')

    def has_add_permission(self, request):
        return False
