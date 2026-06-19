from PIL import Image

def inspect_colors(img_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")
    width, height = img.size
    print(f"--- Inspecting {img_path} ({width}x{height}) ---")
    
    # Let's check some pixels at the corners
    corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1), (5, 5), (10, 10)]
    for x, y in corners:
        print(f"Pixel ({x}, {y}): {img.getpixel((x, y))}")

inspect_colors("frontend/public/assets/icons/petition_box_icon.png")
inspect_colors("frontend/public/assets/icons/membership_icon.png")
