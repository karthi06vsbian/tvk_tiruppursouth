import os
import re

base_dir = "/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/_next/static/chunks"
years = ["2008", "2011", "2017", "2020", "2021", "2025"]

print("Searching for years in JS chunks:")
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".js"):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    for year in years:
                        # Find occurrences that look like years (e.g., in a sentence or json prop, not a random hash)
                        matches = [content[max(0, m.start()-100):min(len(content), m.end()+150)] for m in re.finditer(re.escape(year), content)]
                        # Filter matches to make sure they are not part of an hex/guid hash
                        filtered_matches = []
                        for m in matches:
                            # If it's part of a guid (like aaaa-2008-bbbb), skip it
                            if re.search(r'[a-f0-9]{4}-' + year + r'-[a-f0-9]{4}', m):
                                continue
                            filtered_matches.append(m)
                        
                        if filtered_matches:
                            print(f"\nFile: {os.path.relpath(path, base_dir)}")
                            print(f"Year {year} found ({len(filtered_matches)} occurrences):")
                            for idx, m in enumerate(filtered_matches[:2]):
                                print(f"  Match {idx+1}: {repr(m)}")
            except Exception as e:
                pass
