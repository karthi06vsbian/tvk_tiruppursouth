from PIL import Image
import os
import math

def remove_checkerboard(img_path):
    if not os.path.exists(img_path):
        print(f"File {img_path} does not exist!")
        return
        
    img = Image.open(img_path)
    img = img.convert("RGBA")
    width, height = img.size
    cx, cy = width // 2, height // 2
    
    datas = img.getdata()
    newData = []
    
    for i, item in enumerate(datas):
        r, g, b, a = item
        x = i % width
        y = i // width
        
        # Calculate distance from center
        dist = math.sqrt((x - cx)**2 + (y - cy)**2)
        
        # Check if the color is neutral gray/white
        is_neutral = abs(r - g) <= 5 and abs(g - b) <= 5 and abs(r - b) <= 5
        
        # Check if it should be transparent
        should_be_transparent = False
        if is_neutral:
            # Outside the circle: remove all white/gray background
            if dist > 410:
                if r > 180:
                    should_be_transparent = True
            # Inside the circle: remove only gray checkerboard squares (keep white paper)
            else:
                if 190 <= r <= 242:
                    should_be_transparent = True
                    
        if should_be_transparent:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(img_path, "PNG")
    print(f"Removed checkerboard background from {img_path}!")

# Process public icons
remove_checkerboard("frontend/public/assets/icons/petition_box_icon.png")
remove_checkerboard("frontend/public/assets/icons/membership_icon.png")

# Process dist icons
remove_checkerboard("frontend/dist/assets/icons/petition_box_icon.png")
remove_checkerboard("frontend/dist/assets/icons/membership_icon.png")
