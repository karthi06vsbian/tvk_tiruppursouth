import os

base_dir = "/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone"
years = ["1992", "2001", "2008", "2011", "2017", "2020", "2021", "2024", "2025"]

print("Scanning all HTML files for each year:")
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                found = []
                for y in years:
                    if y in content:
                        found.append(y)
                if found:
                    print(f"  File: {os.path.relpath(path, base_dir)} contains years: {found}")
            except Exception as e:
                pass
