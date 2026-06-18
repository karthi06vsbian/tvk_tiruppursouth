from bs4 import BeautifulSoup
import re

path = "/Users/apple/.gemini/antigravity/brain/71168069-c86a-4c4e-95da-d67fd6b406d9/.system_generated/steps/491/content.md"
with open(path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Since the file has "Title: Cached Content" at the top, let's skip the markdown metadata and find the HTML start
html_start = html_content.find("<!DOCTYPE html>")
if html_start != -1:
    html_content = html_content[html_start:]

soup = BeautifulSoup(html_content, "html.parser")

# Find the our-journey section
section = soup.find(id="our-journey")
if section:
    print("--- our-journey section found in live page ---")
    
    # Let's find all the dynamic slides or tabs or texts
    # Next.js often hides other tabs' content inside hidden divs, or inside a JSON/script state.
    # Let's search for any paragraph text inside the section
    paragraphs = [p.get_text(strip=True) for p in section.find_all("p")]
    print("All paragraphs:")
    for idx, p in enumerate(paragraphs):
        print(f"  {idx}: {p[:150]}...")
        
    headings = [h.get_text(strip=True) for h in section.find_all(["h1", "h2", "h3", "h4", "h5"])]
    print("\nAll headings:")
    for idx, h in enumerate(headings):
        print(f"  {idx}: {h}")
        
    # If the text for other years is not directly in the HTML, let's check for any next data script
    # Or check if we can find them in the JSON state (e.g. next/data, or __NEXT_DATA__, or script tags)
    script_tags = soup.find_all("script")
    print(f"\nNumber of script tags: {len(script_tags)}")
    for i, script in enumerate(script_tags):
        script_text = script.get_text()
        if "1992" in script_text and "2001" in script_text:
            print(f"  Script {i} contains '1992' and '2001'! Length: {len(script_text)}")
            # print first 500 chars of this script
            print(script_text[:500])
            
            # Let's search for "Ilaya Thalapathy" in this script and extract the neighboring text
            pos = script_text.find("Ilaya Thalapathy")
            if pos != -1:
                print("  Found 'Ilaya Thalapathy' in script at position", pos)
                print("  Snippet:", script_text[pos:pos+1000])
else:
    print("our-journey section not found on live page")
