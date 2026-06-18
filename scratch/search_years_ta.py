from bs4 import BeautifulSoup

html_path = "/Users/apple/Desktop/tvk vijay/tvkvijay_en_copy/tvkvijay.com/ta-IN/index.html"

with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, "html.parser")

found_script = None
for script in soup.find_all("script"):
    if script.string and ("விக்கிரவாண்டி" in script.string or "இளைய தளபதி" in script.string):
        found_script = script.string
        break

if found_script:
    unescaped = found_script.replace('\\"', '"').replace('\\\\"', '\\"')
    print("Search in Tamil script:")
    for y in ["2008", "2011"]:
        pos = unescaped.find(y)
        if pos != -1:
            print(f"Found '{y}' in unescaped script at pos {pos}")
            print(unescaped[max(0, pos-100):min(len(unescaped), pos+500)])
        else:
            print(f"'{y}' NOT found in unescaped Tamil script.")
else:
    print("Script not found.")
