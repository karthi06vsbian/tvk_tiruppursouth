import urllib.request
import urllib.parse
import ssl

context = ssl._create_unverified_context()

urls = [
    "https://tvkassets.minsky.studio/media/1990.png",
    "https://tvkassets.minsky.studio/media/WhatsApp Image 2025-02-24 at 8.12.48 AM.jpg",
    "https://tvkassets.minsky.studio/media/40042856520_7e0f7261d9_o.jpg",
    "https://tvkassets.minsky.studio/media/Actor_Vijay_Protest_Nagapattinam_stills_02.jpg",
    "https://tvkassets.minsky.studio/media/with anitha family.jpg",
    "https://tvkassets.minsky.studio/media/with-anitha-family.jpg",
    "https://tvkassets.minsky.studio/media/kerala_flood.png",
    "https://tvkassets.minsky.studio/media/VMI.webp",
    "https://tvkassets.minsky.studio/media/vijay_hoisting_tvk_flag.webp",
    "https://tvkassets.minsky.studio/media/விக்கிரவாண்டி_மாநாடு_resized1.jpg",
    "https://tvkassets.minsky.studio/media/parandur_stills.webp"
]

print("Verifying image URLs:")
for url in urls:
    parsed = urllib.parse.urlparse(url)
    encoded_path = urllib.parse.quote(parsed.path)
    encoded_url = urllib.parse.urlunparse((parsed.scheme, parsed.netloc, encoded_path, parsed.params, parsed.query, parsed.fragment))
    
    try:
        req = urllib.request.Request(
            encoded_url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req, timeout=5, context=context) as response:
            status = response.getcode()
            print(f"  {status} OK - {url}")
    except Exception as e:
        print(f"  FAILED - {url} -> {e}")
