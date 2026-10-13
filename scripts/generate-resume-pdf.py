#!/usr/bin/env python3
"""Generate the downloadable resume PDF from src/data/profile.json.

    pip install reportlab pypdf
    python3 scripts/generate-resume-pdf.py

The output is committed to public/, so the Netlify build does not need Python.

Privacy choices:
- Only information that is already public on the site goes into the PDF.
  The email is left out unless RESUME_PUBLIC_EMAIL is set.
- Every page carries a footer with the site and the update month, so an old
  copy is easy to recognise.
- All document metadata (author, creator, producer, dates, XMP) is removed.
"""
import json
import os
import re
import sys
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape

from pypdf import PdfReader, PdfWriter
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (HRFlowable, KeepTogether, ListFlowable,
                                ListItem, Paragraph, SimpleDocTemplate,
                                Spacer)

ROOT = Path(__file__).resolve().parent.parent
PROFILE = ROOT / 'src' / 'data' / 'profile.json'
OUTPUT = ROOT / 'public' / 'Mike-Fang-Resume.pdf'

SITE = 'https://www.mike-fang.com'
FOOTER_SITE = 'mike-fang.com'
PUBLIC_EMAIL = os.environ.get('RESUME_PUBLIC_EMAIL', '').strip()

LATIN_FONTS = {
    'Resume': 'LiberationSans-Regular.ttf',
    'Resume-Bold': 'LiberationSans-Bold.ttf',
    'Resume-Italic': 'LiberationSans-Italic.ttf',
    'Resume-BoldItalic': 'LiberationSans-BoldItalic.ttf',
}
LATIN_DIRS = [
    '/usr/share/fonts/truetype/liberation',
    '/usr/share/fonts/liberation',
    '/Library/Fonts',
]
CJK_FONT = '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'

ACCENT = colors.HexColor('#2f6f4f')
MUTED = colors.HexColor('#555555')


def find_font(filename):
    for directory in LATIN_DIRS:
        path = Path(directory) / filename
        if path.exists():
            return str(path)
    sys.exit(f'Font not found: {filename}. Install Liberation Sans.')


def register_fonts():
    for name, filename in LATIN_FONTS.items():
        pdfmetrics.registerFont(TTFont(name, find_font(filename)))
    pdfmetrics.registerFontFamily(
        'Resume', normal='Resume', bold='Resume-Bold',
        italic='Resume-Italic', boldItalic='Resume-BoldItalic')
    if not Path(CJK_FONT).exists():
        sys.exit(f'CJK font not found: {CJK_FONT}')
    pdfmetrics.registerFont(TTFont('ResumeCJK', CJK_FONT, subfontIndex=0))


def style(name, **kwargs):
    base = dict(fontName='Resume', fontSize=9.2, leading=12.4,
                alignment=TA_LEFT, textColor=colors.black)
    base.update(kwargs)
    return ParagraphStyle(name, **base)


STYLES = {
    'name': style('name', fontName='Resume-Bold', fontSize=22, leading=26),
    'title': style('title', fontSize=11.5, leading=15, textColor=ACCENT),
    'contact': style('contact', fontSize=9, textColor=MUTED),
    'section': style('section', fontName='Resume-Bold', fontSize=11.5,
                     leading=14, textColor=ACCENT, spaceBefore=10,
                     spaceAfter=2),
    'body': style('body'),
    'role': style('role', fontName='Resume-Bold', fontSize=10.5, leading=14,
                  spaceBefore=6),
    'meta': style('meta', fontSize=9, textColor=MUTED),
    'italic': style('italic', fontName='Resume-Italic', textColor=MUTED,
                    spaceBefore=1),
    'subhead': style('subhead', fontName='Resume-Bold', spaceBefore=4),
    'bullet': style('bullet', leading=11.8),
    'skill': style('skill', leading=11.8, spaceBefore=1),
}


def rich(text):
    """Escape XML and turn **bold** into <b>bold</b>."""
    return re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', escape(text))


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(rich(i), STYLES['bullet']), leftIndent=12)
         for i in items],
        bulletType='bullet', start='•', leftIndent=12, bulletFontSize=8)


def link(url, text):
    return f'<a href="{escape(url)}" color="#2f6f4f">{escape(text)}</a>'


def section(title):
    return [
        Paragraph(escape(title.upper()), STYLES['section']),
        HRFlowable(width='100%', thickness=0.6, color=ACCENT, spaceAfter=3),
    ]


def header(profile):
    contacts = profile['contacts']
    parts = [escape(contacts['location']['text']),
             link(SITE, FOOTER_SITE),
             link(contacts['linkedin']['link'], 'linkedin.com/in/mike1026915')]
    if PUBLIC_EMAIL:
        parts.append(link(f'mailto:{PUBLIC_EMAIL}', PUBLIC_EMAIL))
    name = (f'<font name="ResumeCJK">{escape(profile["chineseName"])}</font>'
            f' {escape(profile["name"])}')
    return [
        Paragraph(name, STYLES['name']),
        Paragraph(escape(profile['title']), STYLES['title']),
        Spacer(1, 2),
        Paragraph('  ·  '.join(parts), STYLES['contact']),
    ]


def experience(profile):
    story = section('Experience')
    for job in profile['experience']:
        head = [Paragraph(
            f'{escape(job["role"])} — {escape(job["company"])}',
            STYLES['role'])]
        where = (f'{escape(job["location"])}  ·  {job["start"]} – '
                 f'{job["end"]}')
        head.append(Paragraph(where, STYLES['meta']))
        if job.get('description'):
            head.append(Paragraph(rich(job['description']), STYLES['italic']))
        story.append(KeepTogether(head))
        if job.get('sections'):
            for part in job['sections']:
                story.append(KeepTogether([
                    Paragraph(rich(part['title']), STYLES['subhead']),
                    bullets(part['events'])]))
        elif job.get('events'):
            story.append(bullets(job['events']))
    return story


def education(profile):
    story = section('Education')
    for edu in profile['education']:
        lines = [
            Paragraph(f'{escape(edu["degree"])} — {escape(edu["school"])}',
                      STYLES['role']),
            Paragraph(f'{escape(edu["location"])}  ·  {edu["start"]} – '
                      f'{edu["end"]}  ·  GPA {edu["GPA"]}', STYLES['meta']),
        ]
        if edu.get('thesis'):
            lines.append(Paragraph(f'Thesis: {escape(edu["thesis"])}',
                                   STYLES['italic']))
        story.append(KeepTogether(lines))
    return story


def skills(profile):
    story = section('Skills')
    for group in profile['skills']:
        story.append(Paragraph(
            f'<b>{escape(group["title"])}:</b> '
            f'{escape(", ".join(group["items"]))}', STYLES['skill']))
    return story


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Resume', 8)
    canvas.setFillColor(MUTED)
    stamp = date.today().strftime('%b %Y')
    canvas.drawString(
        doc.leftMargin, 10 * mm,
        f'{FOOTER_SITE}  ·  Updated {stamp}  ·  Latest version online')
    canvas.drawRightString(A4[0] - doc.rightMargin, 10 * mm,
                           f'Page {doc.page}')
    canvas.restoreState()


def strip_metadata(path):
    """Rewrite the PDF with no document info, XMP, or creation dates."""
    writer = PdfWriter(clone_from=PdfReader(str(path)))
    writer.metadata = None
    root = writer._root_object
    if '/Metadata' in root:
        del root['/Metadata']
    # pypdf adds an /Info dictionary with /Producer; drop it from the trailer.
    writer._info = None
    with open(path, 'wb') as out:
        writer.write(out)


def main():
    register_fonts()
    profile = json.loads(PROFILE.read_text(encoding='utf-8'))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=14 * mm, bottomMargin=18 * mm)
    story = (header(profile)
             + section('Summary')
             + [Paragraph(rich(profile['summary']), STYLES['body'])]
             + experience(profile) + education(profile) + skills(profile))
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    strip_metadata(OUTPUT)
    print(f'Wrote {OUTPUT.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
