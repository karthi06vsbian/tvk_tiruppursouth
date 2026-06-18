import re
import html

def extract_timeline_info(path):
    print(f"\n--- Extracting from {path} ---")
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Let's find sections related to our-journey
        journey_match = re.search(r'<section id="our-journey".*?</section>', content, re.DOTALL)
        if not journey_match:
            print("our-journey section not found")
            return
        
        section_html = journey_match.group(0)
        
        # Let's extract year tab indicators (e.g. Year 1992, Year 2001, etc.)
        # e.g., aria-label="Year 1992" ... <p class="...">1992</p>
        tabs = re.findall(r'aria-label="Year (\d+)".*?<p[^>]*>(\d+)</p>', section_html)
        print("Tabs found:", tabs)

        # Let's also look for text elements in the section to find titles and descriptions.
        # Since it's a dynamic switcher, let's look for how the different slides are represented.
        # Next.js might render them all in some list, or there might be multiple divs with class and style.
        # Let's search for all <h2>...</h2> and <p>...</p> inside the section_html
        # Let's clean up tag attributes to make it easier to search
        clean_html = re.sub(r'\s+', ' ', section_html)
        
        # Let's print some chunks that contain years
        for year in ["1992", "2001", "2008", "2011", "2017", "2020", "2021", "2024", "2025"]:
            # Let's find matches around this year
            matches = re.findall(r'([^<>\u200b]{10,200}' + year + r'[^<>\u200b]{10,500})', clean_html)
            print(f"\nYear {year} matches:")
            for m in set(matches[:3]):
                print("  -", html.unescape(m.strip()))
            
            # Let's also search for images that might have this year or represent it
            img_matches = re.findall(r'src="[^"]*?' + year + r'[^"]*?"', clean_html)
            if img_matches:
                print(f"  Images for {year}: {img_matches}")
                
    except Exception as e:
        print("Error:", e)

extract_timeline_info("/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/index.html")
extract_timeline_info("/Users/apple/Desktop/tvk tirupur south /tvvvkk vijay/tvkvijay-clone/ta-IN/index.html")
