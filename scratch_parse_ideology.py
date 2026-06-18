from bs4 import BeautifulSoup

path = "/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/en/ideology/index.html"
try:
    with open(path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    
    print("--- English Ideology Page Content ---")
    main = soup.find("main")
    if main:
        for tag in main.find_all(["h1", "h2", "h3", "h4", "p"]):
            text = tag.get_text(strip=True)
            if len(text) > 20:
                print(f"[{tag.name}]: {text}")
    else:
        print("Main tag not found")
except Exception as e:
    print("Error:", e)
