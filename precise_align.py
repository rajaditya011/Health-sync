from pptx import Presentation
from pptx.util import Inches

prs = Presentation("HealthSync_SIH2026_Perfect_Layout.pptx")

for i in range(1, len(prs.slides)):
    slide = prs.slides[i]
    
    title_box = None
    underline = None
    
    # Find Title TextBox (TextBox 1) and Underline (Rectangle 2)
    for shape in slide.shapes:
        if shape.has_text_frame and shape.text.startswith("HEALTHSYNC AI"):
            title_box = shape
        elif shape.has_text_frame and shape.text == "THE PROBLEM":
            # Just in case we didn't find it by text, usually it's the first textbox
            pass
            
    # Actually let's just use indices since we know the structure
    # from the previous inspection: [0] is Title, [1] is Rectangle
    title_box = slide.shapes[0]
    underline = slide.shapes[1]
    
    # 1. Remove internal margins from the Title TextBox so the text visually starts EXACTLY at x
    title_box.text_frame.margin_left = Inches(0)
    title_box.text_frame.margin_right = Inches(0)
    title_box.text_frame.margin_top = Inches(0)
    title_box.text_frame.margin_bottom = Inches(0)
    
    # 2. Make underline horizontally match the title box EXACTLY
    underline.left = title_box.left
    underline.width = title_box.width
    
    # 3. Fix the vertical gap to be very tight but clean
    # The title box is height 0.6. Let's make underline top = title box bottom + 0.05
    underline.top = title_box.top + title_box.height + Inches(0.02)
    
prs.save("HealthSync_SIH2026_Perfect_Layout.pptx")
print("Precise alignment applied.")
