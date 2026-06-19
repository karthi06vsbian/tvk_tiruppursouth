from PIL import Image
import os

def make_transparent(img_path):
    if not os.path.exists(img_path):
        print(f"File {img_path} does not exist!")
        return
        
    img = Image.open(img_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if the pixel is near white (R, G, B > 240)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0)) # Fully transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(img_path, "PNG")
    print(f"Processed {img_path} successfully!")

# Process both source public icons
make_transparent("frontend/public/assets/icons/petition_box_icon.png")
make_transparent("frontend/public/assets/icons/membership_icon.png")

# Also process built dist icons to ensure HMR/preview is updated immediately
make_transparent("frontend/dist/assets/icons/petition_box_icon.png")
make_transparent("frontend/dist/assets/icons/membership_icon.png")
