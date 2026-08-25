from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.shapes import MSO_SHAPE_TYPE
import os, urllib.request

# Download some PNG icons for use
icons = {
    "report": "https://cdn.jsdelivr.net/npm/lucide-static@0.330.0/icons/file-text.svg",
    "voice": "https://cdn.jsdelivr.net/npm/lucide-static@0.330.0/icons/mic.svg",
    "twin": "https://cdn.jsdelivr.net/npm/lucide-static@0.330.0/icons/user.svg",
    "ai": "https://cdn.jsdelivr.net/npm/lucide-static@0.330.0/icons/cpu.svg",
    "doctor": "https://cdn.jsdelivr.net/npm/lucide-static@0.330.0/icons/stethoscope.svg",
    "medicine": "https://cdn.jsdelivr.net/npm/lucide-static@0.330.0/icons/pill.svg",
    "emergency": "https://cdn.jsdelivr.net/npm/lucide-static@0.330.0/icons/alert-circle.svg",
    "analytics": "https://cdn.jsdelivr.net/npm/lucide-static@0.330.0/icons/bar-chart.svg"
}

os.makedirs("icons", exist_ok=True)
for name, url in icons.items():
    if not os.path.exists(f"icons/{name}.svg"):
        try:
            urllib.request.urlretrieve(url, f"icons/{name}.svg")
        except:
            pass

# Layout Constants for 16:9 (13.333 x 7.5)
SLIDE_WIDTH = 13.333
SLIDE_HEIGHT = 7.5
MARGIN_X = 0.65
MARGIN_Y = 0.65
CONTENT_WIDTH = SLIDE_WIDTH - (2 * MARGIN_X)
CONTENT_TOP = 1.6
FOOTER_TOP = 7.05

# Theme Colors
NAVY = RGBColor(10, 25, 47)
WHITE = RGBColor(255, 255, 255)
TEAL = RGBColor(0, 137, 123)
LIGHT_TEAL = RGBColor(224, 242, 241)
DARK_GRAY = RGBColor(50, 50, 50)
LIGHT_GRAY = RGBColor(245, 245, 245)
RED = RGBColor(211, 47, 47)
LIGHT_RED = RGBColor(255, 235, 238)
GREEN = RGBColor(46, 125, 50)
BORDER_COLOR = RGBColor(220, 220, 220)

def clear_slide(slide):
    for shape in list(slide.shapes):
        slide.shapes._spTree.remove(shape._element)

def add_header(slide, title_text):
    # Standard Title
    txBox = slide.shapes.add_textbox(Inches(MARGIN_X), Inches(MARGIN_Y), Inches(CONTENT_WIDTH), Inches(0.6))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.text = title_text
    p.font.name = "Arial"
    p.font.size = Pt(32)
    p.font.color.rgb = NAVY
    p.font.bold = True
    p.alignment = PP_ALIGN.LEFT
    
    # Accent Line under title
    accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(MARGIN_X), Inches(MARGIN_Y + 0.65), Inches(CONTENT_WIDTH), Inches(0.04))
    accent.fill.solid()
    accent.fill.fore_color.rgb = TEAL
    accent.line.fill.background()

def add_footer(slide, slide_num):
    # Left: AFTER HOURS
    tb_left = slide.shapes.add_textbox(Inches(MARGIN_X), Inches(FOOTER_TOP), Inches(3), Inches(0.4))
    p = tb_left.text_frame.paragraphs[0]
    p.text = "AFTER HOURS"
    p.font.name = "Arial"
    p.font.size = Pt(12)
    p.font.color.rgb = DARK_GRAY
    p.font.bold = True
    p.alignment = PP_ALIGN.LEFT
    
    # Center: SIH 2026
    tb_center = slide.shapes.add_textbox(Inches(SLIDE_WIDTH/2 - 1.5), Inches(FOOTER_TOP), Inches(3), Inches(0.4))
    p = tb_center.text_frame.paragraphs[0]
    p.text = "SIH 2026"
    p.font.name = "Arial"
    p.font.size = Pt(12)
    p.font.color.rgb = DARK_GRAY
    p.alignment = PP_ALIGN.CENTER
    
    # Right: Slide Number
    tb_right = slide.shapes.add_textbox(Inches(SLIDE_WIDTH - MARGIN_X - 1), Inches(FOOTER_TOP), Inches(1), Inches(0.4))
    p = tb_right.text_frame.paragraphs[0]
    p.text = f"{slide_num} / 6"
    p.font.name = "Arial"
    p.font.size = Pt(12)
    p.font.color.rgb = DARK_GRAY
    p.alignment = PP_ALIGN.RIGHT

def add_card(slide, left, top, width, height, title, body, bg_color=LIGHT_GRAY, title_color=NAVY, align=PP_ALIGN.LEFT, icon=None):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    card.line.color.rgb = BORDER_COLOR
    
    # Optional Icon
    icon_offset = 0
    if icon and os.path.exists(f"icons/{icon}.svg"):
        try:
            slide.shapes.add_picture(f"icons/{icon}.svg", Inches(left + 0.15), Inches(top + 0.15), Inches(0.3), Inches(0.3))
            icon_offset = 0.4
        except:
            pass

    tf = card.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.TOP
    tf.margin_top = Inches(0.15)
    tf.margin_left = Inches(0.15 + icon_offset)
    tf.margin_right = Inches(0.15)
    
    if title:
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = title_color
        p.alignment = align
    
    for idx, line in enumerate(body):
        p2 = tf.add_paragraph() if title or idx > 0 else tf.paragraphs[0]
        p2.text = line
        p2.font.name = "Arial"
        p2.font.size = Pt(13)
        p2.font.color.rgb = DARK_GRAY
        p2.alignment = align
        if line.startswith("• "):
            p2.level = 1

def add_arrow(slide, left, top, width, height, direction="right"):
    shape_type = MSO_SHAPE.RIGHT_ARROW if direction == "right" else MSO_SHAPE.DOWN_ARROW
    arrow = slide.shapes.add_shape(shape_type, Inches(left), Inches(top), Inches(width), Inches(height))
    arrow.fill.solid()
    arrow.fill.fore_color.rgb = RGBColor(180, 180, 180)
    arrow.line.fill.background()

def create_presentation():
    prs = Presentation()
    # Set to 16:9
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    
    blank_layout = prs.slide_layouts[6]
    
    # ----------------------------------------------------
    # SLIDE 1: TITLE PAGE
    # ----------------------------------------------------
    s1 = prs.slides.add_slide(blank_layout)
    clear_slide(s1)
    
    # Top Banner
    tb1 = s1.shapes.add_textbox(Inches(MARGIN_X), Inches(1.0), Inches(CONTENT_WIDTH), Inches(0.5))
    p1 = tb1.text_frame.paragraphs[0]
    p1.text = "SMART INDIA HACKATHON 2026"
    p1.font.name = "Arial"
    p1.font.size = Pt(18)
    p1.font.color.rgb = TEAL
    p1.font.bold = True
    p1.alignment = PP_ALIGN.CENTER
    
    # Main Title
    tb2 = s1.shapes.add_textbox(Inches(MARGIN_X), Inches(1.6), Inches(CONTENT_WIDTH), Inches(1.0))
    p2 = tb2.text_frame.paragraphs[0]
    p2.text = "HEALTHSYNC AI"
    p2.font.name = "Arial"
    p2.font.size = Pt(64)
    p2.font.color.rgb = NAVY
    p2.font.bold = True
    p2.alignment = PP_ALIGN.CENTER
    
    # Subtitle
    tb3 = s1.shapes.add_textbox(Inches(MARGIN_X), Inches(2.7), Inches(CONTENT_WIDTH), Inches(0.5))
    p3 = tb3.text_frame.paragraphs[0]
    p3.text = "AI-Powered Patient Case-Taking & Intelligent Healthcare Assistance"
    p3.font.name = "Arial"
    p3.font.size = Pt(20)
    p3.font.color.rgb = DARK_GRAY
    p3.alignment = PP_ALIGN.CENTER
    
    # Two Columns for details
    col_width = (CONTENT_WIDTH - 0.5) / 2
    add_card(s1, MARGIN_X, 3.8, col_width, 2.5, "PROJECT DETAILS", [
        "Problem Statement ID: SIH26047", 
        "Patient Case-Taking Software", 
        "Theme: HEALTH TECH", 
        "Category: Software"
    ], LIGHT_GRAY, NAVY)
    
    add_card(s1, MARGIN_X + col_width + 0.5, 3.8, col_width, 2.5, "TEAM: AFTER HOURS (SIH2026-184)", [
        "Team Leader: Harsha Kolli (ENG25AM0171)", 
        "Members:",
        "• Sushanth Hegde (ENG25AD0070)",
        "• Ashish P (ENG25AM0143)",
        "• Harsh Kubade (ENG25AM0148)",
        "• Aditya Raj (ENG25AD0083)",
        "• Priyanshu Chauhan (ENG25CS0663)"
    ], LIGHT_TEAL, TEAL)
    
    tb4 = s1.shapes.add_textbox(Inches(MARGIN_X), Inches(6.6), Inches(CONTENT_WIDTH), Inches(0.4))
    p4 = tb4.text_frame.paragraphs[0]
    p4.text = "School of Engineering, Dayananda Sagar University, Bengaluru - 562112"
    p4.font.name = "Arial"
    p4.font.size = Pt(14)
    p4.font.color.rgb = DARK_GRAY
    p4.alignment = PP_ALIGN.CENTER

    add_footer(s1, 1)

    # ----------------------------------------------------
    # SLIDE 2: IDEA TITLE
    # ----------------------------------------------------
    s2 = prs.slides.add_slide(blank_layout)
    clear_slide(s2)
    add_header(s2, "HEALTHSYNC AI — FROM COMPLEX DATA TO ACTIONABLE CARE")
    
    col_w = (CONTENT_WIDTH - 0.6) / 3
    col1_x = MARGIN_X
    col2_x = MARGIN_X + col_w + 0.3
    col3_x = MARGIN_X + (col_w * 2) + 0.6
    
    # Col 1: Problem
    tb_c1 = s2.shapes.add_textbox(Inches(col1_x), Inches(CONTENT_TOP), Inches(col_w), Inches(0.4))
    p = tb_c1.text_frame.paragraphs[0]
    p.text = "THE PROBLEM"
    p.font.bold = True
    p.font.size = Pt(16)
    p.font.color.rgb = RED
    
    card_h = 1.1
    gap = 0.15
    add_card(s2, col1_x, CONTENT_TOP + 0.5, col_w, card_h, "01 COMPLEX REPORTS", ["Patients struggle to understand medical reports."], LIGHT_RED, RED)
    add_card(s2, col1_x, CONTENT_TOP + 0.5 + card_h + gap, col_w, card_h, "02 RIGHT SPECIALIST", ["Patients may not know which specialist is appropriate."], LIGHT_RED, RED)
    add_card(s2, col1_x, CONTENT_TOP + 0.5 + 2*(card_h + gap), col_w, card_h, "03 MEDICATION ADHERENCE", ["Patients forget or fail to follow medication routines."], LIGHT_RED, RED)
    add_card(s2, col1_x, CONTENT_TOP + 0.5 + 3*(card_h + gap), col_w, card_h, "04 ACCESSIBILITY", ["Language and digital barriers make healthcare interaction harder."], LIGHT_RED, RED)

    # Col 2: Solution
    tb_c2 = s2.shapes.add_textbox(Inches(col2_x), Inches(CONTENT_TOP), Inches(col_w), Inches(0.4))
    p = tb_c2.text_frame.paragraphs[0]
    p.text = "HEALTHSYNC AI"
    p.font.bold = True
    p.font.size = Pt(16)
    p.font.color.rgb = NAVY
    p.alignment = PP_ALIGN.CENTER
    
    add_card(s2, col2_x + 0.4, CONTENT_TOP + 0.8, col_w - 0.8, 0.8, "Patient", [], WHITE, DARK_GRAY, PP_ALIGN.CENTER)
    add_arrow(s2, col2_x + (col_w/2) - 0.1, CONTENT_TOP + 1.7, 0.2, 0.3, "down")
    add_card(s2, col2_x, CONTENT_TOP + 2.1, col_w, 1.8, "HealthSync AI", ["Report Intelligence", "3D Digital Twin", "Voice AI", "Specialist Matching", "Recovery Tracking"], LIGHT_TEAL, TEAL, PP_ALIGN.CENTER)
    add_arrow(s2, col2_x + (col_w/2) - 0.1, CONTENT_TOP + 4.0, 0.2, 0.3, "down")
    add_card(s2, col2_x + 0.4, CONTENT_TOP + 4.4, col_w - 0.8, 0.8, "Doctor", [], WHITE, DARK_GRAY, PP_ALIGN.CENTER)
    
    # Col 3: Innovation
    tb_c3 = s2.shapes.add_textbox(Inches(col3_x), Inches(CONTENT_TOP), Inches(col_w), Inches(0.4))
    p = tb_c3.text_frame.paragraphs[0]
    p.text = "WHY DIFFERENT?"
    p.font.bold = True
    p.font.size = Pt(16)
    p.font.color.rgb = GREEN
    p.alignment = PP_ALIGN.RIGHT
    
    add_card(s2, col3_x, CONTENT_TOP + 0.5, col_w, 1.3, "3D DIGITAL TWIN", ["Visual symptom & pain localization"], LIGHT_TEAL, NAVY)
    add_card(s2, col3_x, CONTENT_TOP + 0.5 + 1.3 + gap, col_w, 1.3, "VOICE-FIRST HEALTHCARE", ["English/Hindi hands-free interaction"], LIGHT_TEAL, NAVY)
    add_card(s2, col3_x, CONTENT_TOP + 0.5 + 2*(1.3 + gap), col_w, 1.3, "AFFORDABLE CARE", ["Jan Aushadhi generic alternatives"], LIGHT_TEAL, NAVY)
    
    # Bottom statement
    tb_bot = s2.shapes.add_textbox(Inches(col2_x), Inches(CONTENT_TOP + 5.4), Inches(col_w), Inches(0.5))
    p_bot = tb_bot.text_frame.paragraphs[0]
    p_bot.text = "AI assists. Doctor decides."
    p_bot.font.size = Pt(18)
    p_bot.font.color.rgb = NAVY
    p_bot.font.bold = True
    p_bot.alignment = PP_ALIGN.CENTER

    add_footer(s2, 2)

    # ----------------------------------------------------
    # SLIDE 3: TECHNICAL APPROACH
    # ----------------------------------------------------
    s3 = prs.slides.add_slide(blank_layout)
    clear_slide(s3)
    add_header(s3, "TECHNICAL ARCHITECTURE")
    
    card_w = CONTENT_WIDTH
    card_h = 0.95
    gap_y = 0.25
    
    add_card(s3, MARGIN_X, CONTENT_TOP, card_w, card_h, "1. PATIENT INPUT", ["Report Upload    |    Voice Interaction    |    3D Digital Twin"], LIGHT_GRAY, NAVY, PP_ALIGN.CENTER, "twin")
    add_arrow(s3, SLIDE_WIDTH/2 - 0.15, CONTENT_TOP + card_h, 0.3, gap_y, "down")
    
    add_card(s3, MARGIN_X, CONTENT_TOP + card_h + gap_y, card_w, 1.1, "2. AI PROCESSING", ["SambaNova Vision AI → OCR / medical report extraction", "Groq LLaMA → NLP / contextual analysis / specialist matching / recovery intelligence"], LIGHT_TEAL, TEAL, PP_ALIGN.CENTER, "ai")
    add_arrow(s3, SLIDE_WIDTH/2 - 0.15, CONTENT_TOP + card_h + gap_y + 1.1, 0.3, gap_y, "down")
    
    add_card(s3, MARGIN_X, CONTENT_TOP + 2*(card_h + gap_y) + 0.15, card_w, card_h, "3. CLINICAL LAYER", ["Doctor Dashboard → Review AI suggestions → Validate → Prescribe"], LIGHT_GRAY, NAVY, PP_ALIGN.CENTER, "doctor")
    add_arrow(s3, SLIDE_WIDTH/2 - 0.15, CONTENT_TOP + 2*(card_h + gap_y) + 0.15 + card_h, 0.3, gap_y, "down")
    
    add_card(s3, MARGIN_X, CONTENT_TOP + 3*(card_h + gap_y) + 0.15, card_w, card_h, "4. PATIENT OUTPUT", ["Medication reminders    |    Diet guidance    |    Recovery tracking    |    Health-risk insights    |    Emergency SOS"], LIGHT_GRAY, GREEN, PP_ALIGN.CENTER, "analytics")
    
    # Tech stack
    ts = s3.shapes.add_textbox(Inches(MARGIN_X), Inches(CONTENT_TOP + 3*(card_h + gap_y) + 0.15 + card_h + 0.3), Inches(CONTENT_WIDTH), Inches(0.4))
    pts = ts.text_frame.paragraphs[0]
    pts.text = "TECH STACK: Next.js 14 • React • Three.js • Framer Motion • Tailwind CSS • Groq API • LLaMA • SambaNova Vision • Web Speech API"
    pts.font.size = Pt(12)
    pts.font.color.rgb = WHITE
    pts.font.bold = True
    pts.alignment = PP_ALIGN.CENTER
    # Add background to tech stack strip
    ts_bg = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(MARGIN_X), Inches(CONTENT_TOP + 3*(card_h + gap_y) + 0.15 + card_h + 0.3), Inches(CONTENT_WIDTH), Inches(0.4))
    ts_bg.fill.solid()
    ts_bg.fill.fore_color.rgb = NAVY
    ts_bg.line.color.rgb = NAVY
    s3.shapes._spTree.remove(ts._element)
    s3.shapes._spTree.append(ts._element)

    add_footer(s3, 3)

    # ----------------------------------------------------
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # ----------------------------------------------------
    s4 = prs.slides.add_slide(blank_layout)
    clear_slide(s4)
    add_header(s4, "FEASIBILITY, RISKS & MITIGATION")
    
    col_w = (CONTENT_WIDTH - 0.6) / 3
    col1_x = MARGIN_X
    col2_x = MARGIN_X + col_w + 0.3
    col3_x = MARGIN_X + (col_w * 2) + 0.6
    
    add_card(s4, col1_x, CONTENT_TOP, col_w, 4.4, "WHY FEASIBLE", [
        "MODULAR ARCHITECTURE", "Cloud-based modular components allow independent development and scaling.", "",
        "FAST AI INFERENCE", "Groq and SambaNova APIs support responsive AI interactions.", "",
        "ACCESSIBLE DEVICES", "Web-based architecture can support low-end devices."
    ], LIGHT_TEAL, TEAL)
    
    add_card(s4, col2_x, CONTENT_TOP, col_w, 4.4, "RISKS", [
        "REPORT QUALITY", "Low-quality / handwritten reports can reduce OCR accuracy.", "",
        "AI HALLUCINATION", "Incorrect AI output could create safety risks.", "",
        "MEDICAL PRIVACY", "Patient data requires strong privacy and consent controls."
    ], LIGHT_RED, RED)
    
    add_card(s4, col3_x, CONTENT_TOP, col_w, 4.4, "MITIGATION", [
        "HUMAN-IN-THE-LOOP", "Doctor validates AI suggestions.", "",
        "ZERO DIAGNOSIS POLICY", "AI assists; it does not independently diagnose.", "",
        "PRIVACY + CONSENT", "Use privacy-first architecture, explicit consent and appropriate DPDP/ABHA compliance considerations."
    ], LIGHT_GRAY, GREEN)
    
    # Bottom statement
    tb_bot = s4.shapes.add_textbox(Inches(MARGIN_X), Inches(CONTENT_TOP + 4.6), Inches(CONTENT_WIDTH), Inches(0.5))
    p_bot = tb_bot.text_frame.paragraphs[0]
    p_bot.text = "AI + DOCTOR > AI ALONE"
    p_bot.font.size = Pt(22)
    p_bot.font.color.rgb = NAVY
    p_bot.font.bold = True
    p_bot.alignment = PP_ALIGN.CENTER
    
    add_footer(s4, 4)

    # ----------------------------------------------------
    # SLIDE 5: END-TO-END IMPLEMENTATION WORKFLOW
    # ----------------------------------------------------
    s5 = prs.slides.add_slide(blank_layout)
    clear_slide(s5)
    add_header(s5, "END-TO-END IMPLEMENTATION WORKFLOW")
    
    step_w = (CONTENT_WIDTH - 1.2) / 5
    step_y = CONTENT_TOP + 0.8
    step_h = 2.4
    
    # Stages 1 to 5
    xs = [MARGIN_X + (step_w + 0.3) * i for i in range(5)]
    
    add_card(s5, xs[0], step_y, step_w, step_h, "1 INPUT", ["Report", "Voice", "3D Twin"], LIGHT_GRAY, NAVY, PP_ALIGN.CENTER, "report")
    add_arrow(s5, xs[0] + step_w + 0.05, step_y + step_h/2 - 0.1, 0.2, 0.2, "right")
    
    add_card(s5, xs[1], step_y, step_w, step_h, "2 UNDERSTANDING", ["SambaNova Vision", "OCR + Extraction", "", "Groq LLaMA", "Context + Analysis"], LIGHT_TEAL, TEAL, PP_ALIGN.CENTER, "ai")
    add_arrow(s5, xs[1] + step_w + 0.05, step_y + step_h/2 - 0.1, 0.2, 0.2, "right")
    
    add_card(s5, xs[2], step_y, step_w, step_h, "3 CLINICAL AI", ["Risk Insights", "Specialist Matching", "Recovery Planning"], LIGHT_GRAY, NAVY, PP_ALIGN.CENTER, "analytics")
    add_arrow(s5, xs[2] + step_w + 0.05, step_y + step_h/2 - 0.1, 0.2, 0.2, "right")
    
    add_card(s5, xs[3], step_y, step_w, step_h, "4 VALIDATION", ["Doctor Dashboard", "", "Review", "Validate", "Prescribe"], LIGHT_GRAY, NAVY, PP_ALIGN.CENTER, "doctor")
    add_arrow(s5, xs[3] + step_w + 0.05, step_y + step_h/2 - 0.1, 0.2, 0.2, "right")
    
    add_card(s5, xs[4], step_y, step_w, step_h, "5 PERSONALIZED CARE", ["Medication", "Diet", "Recovery"], LIGHT_TEAL, GREEN, PP_ALIGN.CENTER, "medicine")
    
    # Emergency Branch
    add_arrow(s5, xs[2] + step_w/2 - 0.1, step_y + step_h + 0.1, 0.2, 0.3, "down")
    add_card(s5, xs[2] - 0.5, step_y + step_h + 0.5, step_w + 1.0, 1.2, "EMERGENCY SOS", ["Emergency detected → Ambulance Support + Family Notification"], LIGHT_RED, RED, PP_ALIGN.CENTER, "emergency")
    
    # Uniqueness Badges
    add_card(s5, xs[0] - 0.2, step_y - 0.7, step_w + 0.4, 0.5, "", ["★ 3D DIGITAL TWIN"], WHITE, NAVY, PP_ALIGN.CENTER)
    add_arrow(s5, xs[0] + step_w/2 - 0.05, step_y - 0.2, 0.1, 0.15, "down")
    
    add_card(s5, xs[3] - 0.2, step_y - 0.7, step_w + 0.4, 0.5, "", ["★ DOCTOR-CONTROLLED AI"], WHITE, NAVY, PP_ALIGN.CENTER)
    add_arrow(s5, xs[3] + step_w/2 - 0.05, step_y - 0.2, 0.1, 0.15, "down")
    
    add_card(s5, xs[4] - 0.2, step_y - 0.7, step_w + 0.4, 0.5, "", ["★ DYNAMIC RECOVERY"], WHITE, NAVY, PP_ALIGN.CENTER)
    add_arrow(s5, xs[4] + step_w/2 - 0.05, step_y - 0.2, 0.1, 0.15, "down")

    add_footer(s5, 5)

    # ----------------------------------------------------
    # SLIDE 6: IMPACT, SCALABILITY & COMPLIANCE
    # ----------------------------------------------------
    s6 = prs.slides.add_slide(blank_layout)
    clear_slide(s6)
    add_header(s6, "IMPACT, SCALABILITY & COMPLIANCE")
    
    half_w = (CONTENT_WIDTH - 0.4) / 2
    add_card(s6, MARGIN_X, CONTENT_TOP, half_w, 2.0, "SOCIAL IMPACT", [
        "• Better medication adherence.",
        "• Reduced healthcare anxiety.",
        "• More accessible healthcare interaction.",
        "• Support for elderly and chronic patients."
    ], LIGHT_GRAY, TEAL)
    
    add_card(s6, MARGIN_X + half_w + 0.4, CONTENT_TOP, half_w, 2.0, "ECONOMIC IMPACT", [
        "• Affordable generic alternatives.",
        "• Potential reduction in avoidable hospital readmissions.",
        "• Lower friction in healthcare navigation."
    ], LIGHT_GRAY, GREEN)
    
    # Scalability Progression
    tb_scale = s6.shapes.add_textbox(Inches(MARGIN_X), Inches(CONTENT_TOP + 2.2), Inches(CONTENT_WIDTH), Inches(0.4))
    p = tb_scale.text_frame.paragraphs[0]
    p.text = "FUTURE SCALABILITY"
    p.font.bold = True
    p.font.size = Pt(16)
    p.font.color.rgb = NAVY
    
    scale_y = CONTENT_TOP + 2.7
    scale_w = (CONTENT_WIDTH - 1.6) / 5
    scale_h = 0.8
    scale_xs = [MARGIN_X + (scale_w + 0.4) * i for i in range(5)]
    
    scale_steps = ["HealthSync AI", "Wearables", "Real-time Vitals", "Daily Health Score", "Preventive Healthcare"]
    for i, step in enumerate(scale_steps):
        add_card(s6, scale_xs[i], scale_y, scale_w, scale_h, step, [], LIGHT_TEAL, TEAL, PP_ALIGN.CENTER)
        if i < 4:
            add_arrow(s6, scale_xs[i] + scale_w + 0.1, scale_y + scale_h/2 - 0.1, 0.2, 0.2, "right")
            
    # Bottom compliance strip
    tb_comp = s6.shapes.add_textbox(Inches(MARGIN_X), Inches(scale_y + scale_h + 0.6), Inches(CONTENT_WIDTH), Inches(0.4))
    pc = tb_comp.text_frame.paragraphs[0]
    pc.text = "RESEARCH / COMPLIANCE BASIS: MoHFW telemedicine guidance  |  Jan Aushadhi data  |  LLaMA / Vision-AI research  |  ABHA documentation"
    pc.font.size = Pt(11)
    pc.font.color.rgb = DARK_GRAY
    pc.alignment = PP_ALIGN.CENTER
    # Strip background
    comp_bg = s6.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(MARGIN_X), Inches(scale_y + scale_h + 0.6), Inches(CONTENT_WIDTH), Inches(0.4))
    comp_bg.fill.solid()
    comp_bg.fill.fore_color.rgb = LIGHT_GRAY
    comp_bg.line.fill.background()
    s6.shapes._spTree.remove(tb_comp._element)
    s6.shapes._spTree.append(tb_comp._element)
    
    add_footer(s6, 6)
    
    # Remove all old slides from template
    xml_slides = prs.slides._sldIdLst  
    slides = list(xml_slides)
    # The original template had 8 slides. I added 6 new ones. So remove the first len(slides)-6 slides.
    old_count = len(slides) - 6
    for i in range(old_count):
        xml_slides.remove(slides[0])

    prs.save("HealthSync_SIH2026_Perfect_Layout.pptx")
    print("Created HealthSync_SIH2026_Perfect_Layout.pptx")

create_presentation()
