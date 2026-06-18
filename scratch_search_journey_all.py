import os

base_dir = "/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone"

print("Searching for 'journey' in all files recursively:")
for root, dirs, files in os.walk(base_dir):
    for file in files:
        path = os.path.join(root, file)
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                if "journey" in content.lower():
                    print(f"  Found in: {os.path.relpath(path, base_dir)}")
        except Exception as e:
            pass
