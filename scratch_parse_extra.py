from bs4 import BeautifulSoup

def parse_page(path, label):
    print(f"\n--- {label} Page Content ---")
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

parse_page("/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/en/resolutions/index.html", "English Resolutions")
parse_page("/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/resolutions/index.html", "Tamil Resolutions")
parse_page("/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/en/leadership/index.html", "English Leadership")
parse_page("/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/leadership/index.html", "Tamil Leadership")
