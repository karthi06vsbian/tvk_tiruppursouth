from PIL import Image
from collections import Counter

def list_corner_colors(img_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")
    width, height = img.size
    print(f"--- Unique colors in top-left 100x100 of {img_path} ---")
    
    colors = []
    for x in range(100):
        for y in range(100):
            colors.append(img.getpixel((x, y)))
            
    counter = Counter(colors)
    for color, count in counter.most_common(10):
        print(f"Color {color}: {count} times")

list_corner_colors("frontend/public/assets/icons/petition_box_icon.png")
list_corner_colors("frontend/public/assets/icons/membership_icon.png")
