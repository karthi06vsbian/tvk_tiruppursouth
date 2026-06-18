from bs4 import BeautifulSoup

def parse_action(path, label):
    print(f"\n--- {label} Action Plan Page Content ---")
    try:
        with open(path, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
        
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

parse_action("/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/en/action-plan/index.html", "English")
parse_action("/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/action-plan/index.html", "Tamil")
