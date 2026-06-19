from PIL import Image
from collections import Counter

def find_gray_colors(img_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")
    width, height = img.size
    
    grays = []
    for x in range(width):
        for y in range(height):
            r, g, b, a = img.getpixel((x, y))
            if a > 0: # not transparent
                # check if it is near-gray
                if abs(r - g) < 5 and abs(g - b) < 5 and abs(r - b) < 5:
                    if r > 180 and r < 250:
                        grays.append((r, g, b))
                        
    counter = Counter(grays)
    print(f"--- Top 20 neutral gray colors in {img_path} ---")
    for color, count in counter.most_common(20):
        print(f"Color {color}: {count} times")

find_gray_colors("frontend/public/assets/icons/petition_box_icon.png")
find_gray_colors("frontend/public/assets/icons/membership_icon.png")
