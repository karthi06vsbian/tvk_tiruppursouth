from bs4 import BeautifulSoup
import re

content_path = "/Users/apple/.gemini/antigravity/brain/ce745bc7-e8fa-4c10-96fb-0ec2e15e9cdf/.system_generated/steps/912/content.md"

with open(content_path, "r", encoding="utf-8") as f:
    text = f.read()

html_start = text.find("<!DOCTYPE html>")
if html_start == -1:
    html_start = text.find("<html")
html_content = text[html_start:] if html_start != -1 else text

soup = BeautifulSoup(html_content, "html.parser")
timeline_section = soup.find("section", {"id": "timeline-section"})

if timeline_section:
    print("Timeline Section HTML elements:")
    # Let's find all divs that might contain the slider content.
    # Usually NextJS puts data in attributes or states, but since it's pre-rendered/server-side rendered (SSR),
    # the HTML should contain the content for all slides or at least the active/pre-rendered one,
    # or maybe it's in a hidden div or list. Let's find all images, headings and paragraphs inside the section.
    
    print("\n--- All Images ---")
    for img in timeline_section.find_all("img"):
        print(f"Alt: {img.get('alt')}, Src: {img.get('src')}, SrcSet: {img.get('srcset')[:100] if img.get('srcset') else None}")
        
    print("\n--- All Headings (h2, h3, h4, h5) ---")
    for h in timeline_section.find_all(["h2", "h3", "h4", "h5"]):
        print(f"{h.name}: {h.get_text(strip=True)}")
        
    print("\n--- All Paragraphs (p) ---")
    for p in timeline_section.find_all("p"):
        print(f"p: {p.get_text(strip=True)}")
        
    # Let's check for any JSON-like strings or other script blocks in the entire document that might contain the timeline data
    print("\n--- Searching for page data in script tags ---")
    for script in soup.find_all("script"):
        if script.string and ("Ilaya Thalapathy" in script.string or "Welfare Association" in script.string or "1992" in script.string):
            print(f"Found script containing keyword, length: {len(script.string)}")
            # Write script content to a file to examine
            with open("/Users/apple/Desktop/tvktiru/scratch/timeline_script.js", "w", encoding="utf-8") as sf:
                sf.write(script.string)
            print("Saved script content to scratch/timeline_script.js")
            break
            
else:
    print("Timeline section not found.")
