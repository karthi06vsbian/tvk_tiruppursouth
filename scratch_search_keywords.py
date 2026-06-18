import os
import re

base_dir = "/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone"

keywords = ["Iyakkam", "Makkal", "Association", "welfare", "supporters", "resolution", "conference"]

print("Searching for keywords in JS files:")
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".js"):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    found = [kw for kw in keywords if kw.lower() in content.lower()]
                    if found:
                        print(f"\nFile: {os.path.relpath(path, base_dir)}")
                        print(f"Keywords found: {found}")
                        # Print occurrences
                        for kw in found:
                            matches = [content[max(0, m.start()-100):min(len(content), m.end()+150)] for m in re.finditer(re.escape(kw), content, re.IGNORECASE)]
                            print(f"  - '{kw}' matches (first 2):")
                            for m in matches[:2]:
                                print(f"    {repr(m)}")
            except Exception as e:
                pass
