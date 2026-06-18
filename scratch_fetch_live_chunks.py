import urllib.request
import ssl
from bs4 import BeautifulSoup
import re

# Disable SSL certificate verification
ctx = ssl._create_unverified_context()

url = "https://tvkvijay.com/en"
headers = {"User-Agent": "Mozilla/5.0"}

try:
    print("Fetching live index page...")
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx) as response:
        html = response.read().decode('utf-8')
    
    soup = BeautifulSoup(html, "html.parser")
    scripts = soup.find_all("script", src=True)
    print(f"Found {len(scripts)} scripts on live site.")
    
    search_terms = ["Mersal", "Naalaiya", "Vikravandi", "Iyakkam", "Chandrasekhar"]
    
    for s in scripts:
        src = s['src']
        if not src.startswith("http"):
            src = "https://tvkvijay.com" + src
        
        print(f"Fetching script: {src} ...")
        try:
            req_script = urllib.request.Request(src, headers=headers)
            with urllib.request.urlopen(req_script, context=ctx) as js_resp:
                js_content = js_resp.read().decode('utf-8', errors='ignore')
            
            found = [term for term in search_terms if term.lower() in js_content.lower()]
            if found:
                print(f"  --> FOUND KEYWORDS {found} in script {src}!")
                # Let's save a snippet around the match
                for term in found:
                    for m in re.finditer(re.escape(term), js_content, re.IGNORECASE):
                        start = max(0, m.start() - 300)
                        end = min(len(js_content), m.end() + 500)
                        print(f"  --- Snippet for {term} ---")
                        print(js_content[start:end])
                        print("-" * 40)
        except Exception as e:
            print(f"  Error fetching script {src}: {e}")
            
except Exception as e:
    print("Error:", e)
