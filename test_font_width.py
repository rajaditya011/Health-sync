from PIL import ImageFont
import os

font_path = "/Library/Fonts/Arial.ttf"
if not os.path.exists(font_path):
    font_path = "/System/Library/Fonts/Supplemental/Arial.ttf"

if os.path.exists(font_path):
    font = ImageFont.truetype(font_path, 32)
    text = "HEALTHSYNC AI — FROM COMPLEX DATA TO ACTIONABLE CARE"
    # get text size
    try:
        bbox = font.getbbox(text)
        width_pixels = bbox[2] - bbox[0]
    except AttributeError:
        width_pixels, _ = font.getsize(text)
        
    # 32pt font -> roughly 96 DPI screen
    # width in inches = width_pixels / DPI
    # But wait, PowerPoint measures Pt as 1/72 of an inch.
    # So if font size is 32 points, ImageFont.truetype(..., 32) renders it where 1 pixel = 1 point?
    # No, ImageFont usually assumes 72 DPI if size is given in points.
    width_inches = width_pixels / 72.0
    print(f"Estimated width: {width_inches} inches")
else:
    print("Arial not found")
