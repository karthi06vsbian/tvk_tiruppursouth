import re

js_path = "/Users/apple/Desktop/tvktiru/scratch/timeline_unescaped.js"

with open(js_path, "r", encoding="utf-8") as f:
    unescaped = f.read()

# Unicode regex for Tamil characters
tamil_pattern = re.compile(r'[\u0b80-\u0bff]+')
matches = tamil_pattern.findall(unescaped)

print(f"Found {len(matches)} Tamil words in unescaped script.")
if len(matches) > 0:
    print("Example Tamil text found in script:")
    print(" ".join(matches[:20]))
else:
    print("No Tamil characters found in this script file.")
