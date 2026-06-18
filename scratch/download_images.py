import urllib.request
import urllib.parse
import ssl
import os

context = ssl._create_unverified_context()

images_to_download = [
    {
        "url": "https://tvkassets.minsky.studio/media/1990.png",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/1990.png"
    },
    {
        "url": "https://tvkassets.minsky.studio/media/WhatsApp Image 2025-02-24 at 8.12.48 AM.jpg",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/2001_welfare.jpg"
    },
    {
        "url": "https://tvkassets.minsky.studio/media/40042856520_7e0f7261d9_o.jpg",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/2008_eelam.jpg"
    },
    {
        "url": "https://tvkassets.minsky.studio/media/Actor_Vijay_Protest_Nagapattinam_stills_02.jpg",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/2011_fishermen.jpg"
    },
    {
        "url": "https://tvkassets.minsky.studio/media/with anitha family.jpg",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/2017_anitha.jpg"
    },
    {
        "url": "https://tvkassets.minsky.studio/media/kerala_flood.png",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/2020_kerala_flood.png"
    },
    {
        "url": "https://tvkassets.minsky.studio/media/VMI.webp",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/2021_local_body.webp"
    },
    {
        "url": "https://tvkassets.minsky.studio/media/vijay_hoisting_tvk_flag.webp",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/2024_tvk_launch.webp"
    },
    {
        "url": "https://tvkassets.minsky.studio/media/விக்கிரவாண்டி_மாநாடு_resized1.jpg",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/2024_state_conference.jpg"
    },
    {
        "url": "https://tvkassets.minsky.studio/media/parandur_stills.webp",
        "local": "/Users/apple/Desktop/tvktiru/frontend/public/assets/timeline/2025_parandur.webp"
    }
]

print("Starting image downloads:")
for item in images_to_download:
    url = item["url"]
    local_path = item["local"]
    
    # URL encode path
    parsed = urllib.parse.urlparse(url)
    encoded_path = urllib.parse.quote(parsed.path)
    encoded_url = urllib.parse.urlunparse((parsed.scheme, parsed.netloc, encoded_path, parsed.params, parsed.query, parsed.fragment))
    
    try:
        print(f"Downloading {url}...")
        req = urllib.request.Request(
            encoded_url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req, timeout=15, context=context) as response:
            with open(local_path, "wb") as f:
                f.write(response.read())
        print(f"  Saved to: {os.path.basename(local_path)}")
    except Exception as e:
        print(f"  FAILED to download {url} -> {e}")
