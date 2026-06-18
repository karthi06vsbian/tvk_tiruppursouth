from bs4 import BeautifulSoup

path = "/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/index.html"
with open(path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

section = soup.find(id="our-journey")
if section:
    print("--- Section our-journey in index.html ---")
    # print all text inside it
    print("All paragraphs:")
    for p in section.find_all("p"):
        print("  -", p.get_text(strip=True))
    
    # print all h2, h3, h4
    print("Headings:")
    for h in section.find_all(["h1", "h2", "h3", "h4", "h5"]):
        print("  -", h.get_text(strip=True))
else:
    print("our-journey section not found")
