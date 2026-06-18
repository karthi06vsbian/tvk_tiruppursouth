with open("/Users/apple/Desktop/tvk vijay/tvkvijay_en_copy/tvkvijay.com/ta-IN/index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

keywords = ["இலங்கை", "ஈழ", "செப்பாக்கம்", "நாகப்பட்டினம்", "மீனவர்"]

for kw in keywords:
    idx = html_content.find(kw)
    if idx != -1:
        print(f"Found keyword '{kw}' at character {idx}")
        print(html_content[max(0, idx-100):min(len(html_content), idx+500)])
    else:
        print(f"Keyword '{kw}' NOT found in Tamil HTML.")
