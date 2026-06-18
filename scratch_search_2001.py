import os
import re

base_dir = "/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone"

print("Searching for '2001' in all files recursively:")
for root, dirs, files in os.walk(base_dir):
    for file in files:
        path = os.path.join(root, file)
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                if "2001" in content:
                    # Find surrounding text in a 100 character window
                    matches = [content[max(0, m.start()-100):min(len(content), m.end()+150)] for m in re.finditer("2001", content)]
                    print(f"\nFile: {os.path.relpath(path, base_dir)}")
                    print(f"Number of occurrences: {len(matches)}")
                    for i, match in enumerate(matches[:3]):
                        print(f"Match {i+1}: {repr(match)}")
        except Exception as e:
            pass
