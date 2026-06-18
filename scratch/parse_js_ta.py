import re
import json
from bs4 import BeautifulSoup

html_path = "/Users/apple/Desktop/tvk vijay/tvkvijay_en_copy/tvkvijay.com/ta-IN/index.html"

with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, "html.parser")

# Let's search for script tags containing timeline data in Tamil.
# Specifically, looking for "விக்கிரவாண்டி" or "இளைய தளபதி" inside the scripts.
found_script = None
for script in soup.find_all("script"):
    if script.string and ("விக்கிரவாண்டி" in script.string or "இளைய தளபதி" in script.string):
        found_script = script.string
        print(f"Found Tamil script block, length: {len(found_script)}")
        break

if found_script:
    unescaped = found_script.replace('\\"', '"').replace('\\\\"', '\\"')
    pos_1992 = unescaped.find('"year":1992')
    if pos_1992 == -1:
        pos_1992 = unescaped.find('"year": 1992')
        
    print(f"Unescaped pos of 'year':1992: {pos_1992}")
    if pos_1992 != -1:
        start_bracket = unescaped.rfind('[', 0, pos_1992)
        if start_bracket != -1:
            bracket_count = 0
            end_bracket = -1
            for idx in range(start_bracket, len(unescaped)):
                char = unescaped[idx]
                if char == '[':
                    bracket_count += 1
                elif char == ']':
                    bracket_count -= 1
                    if bracket_count == 0:
                        end_bracket = idx
                        break
            if end_bracket != -1:
                array_str = unescaped[start_bracket:end_bracket+1]
                try:
                    data = json.loads(array_str)
                    print("\nSuccessfully parsed JSON array from Tamil content!")
                    print(f"Number of milestones: {len(data)}")
                    
                    with open("/Users/apple/Desktop/tvktiru/scratch/timeline_extracted_ta.json", "w", encoding="utf-8") as out:
                        json.dump(data, out, indent=2)
                        
                    for i, item in enumerate(data):
                        print(f"\n--- Item {i+1} ---")
                        print(f"Year: {item.get('year')}")
                        print(f"Title: {item.get('title')}")
                        print(f"Image: {item.get('image', {}).get('url') if isinstance(item.get('image'), dict) else item.get('image')}")
                        print(f"Description: {item.get('description')}")
                except Exception as e:
                    print("Failed parsing parsed JSON:", e)
else:
    print("No script tag with Tamil timeline text found.")
