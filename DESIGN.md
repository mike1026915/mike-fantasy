---
name: Mike Fang
description: A calm, moss-green field notebook for an engineering leader's resume, proof points and writing.
colors:
  moss-ledger: '#6a6e4f'
  sage-rule: '#7d9a64'
  field-ink: '#404449'
  deep-tide: '#093e47'
  page-paper: '#eeeeee'
  card-white: '#ffffff'
  mist-grey: '#dce0e2'
  ledger-ink: '#2b2f33'
  moss-link: '#4a4d37'
  tape-brown: '#615400'
typography:
  display:
    fontFamily: "'Sora Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: '4rem'
    fontWeight: 700
    lineHeight: 'normal'
    letterSpacing: 'normal'
  headline:
    fontFamily: "'Sora Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: '3rem'
    fontWeight: 500
    lineHeight: 'normal'
  title:
    fontFamily: "'Sora Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: '2.34rem'
    fontWeight: 300
    lineHeight: 'normal'
  base:
    fontFamily: "'Sora Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: '2rem'
    fontWeight: 400
    lineHeight: 'normal'
  stat:
    fontFamily: "'Sora Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 'clamp(4rem, 6vw, 5.6rem)'
    fontWeight: 700
    lineHeight: 1.1
  small:
    fontFamily: "'Open Sans Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: '1.5rem'
    fontWeight: 400
    lineHeight: 'normal'
  lead:
    fontFamily: "'Open Sans Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: '2.4rem'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: '0.05rem'
  body:
    fontFamily: "'Open Sans Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: '1.751rem'
    fontWeight: 500
    lineHeight: 'normal'
    letterSpacing: '0.05rem'
  label:
    fontFamily: "'Sora Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: '1.3rem'
    fontWeight: 500
    letterSpacing: '0.1rem'
rounded:
  none: '0'
  sm: '0.3rem'
  button: '5px'
  pill: '15px'
spacing:
  xs: '0.5rem'
  sm: '1rem'
  md: '1.5rem'
  lg: '2rem'
  xl: '3rem'
components:
  tag:
    backgroundColor: '{colors.moss-ledger}'
    textColor: '{colors.page-paper}'
    typography: '{typography.label}'
    rounded: '{rounded.pill}'
    padding: '0.75rem'
  button-outline:
    backgroundColor: 'transparent'
    textColor: '{colors.moss-ledger}'
    rounded: '{rounded.sm}'
    padding: '0.4rem 1rem'
  button-outline-hover:
    backgroundColor: '{colors.moss-ledger}'
    textColor: '{colors.card-white}'
  work-card:
    backgroundColor: '{colors.card-white}'
    textColor: '{colors.field-ink}'
    rounded: '{rounded.none}'
    padding: '2rem'
---

# Design System: Mike Fang

## Overview

**Creative North Star: "The Field Notebook"**

A comfortable notebook carried through mountains, forest, coast and fields: moss-green cover on the left, a pale paper page on the right, thick green rules marking each entry. The site is where Mike's working life is written down plainly, with the numbers and the places kept honest and in order.

The tone is practical, gentle and organised. Pages are quiet: flat surfaces, one family of natural greens, ruled lines instead of boxes and shadows. Information is stacked and labelled like notebook entries, so a stranger scanning for ten seconds can find a result, a domain and a way to get in touch. Warmth comes from the portrait, the rhythm of green rules and the human voice of the copy, never from decoration.

**Key Characteristics:**

- A fixed moss-green sidebar (the cover) beside a pale-grey page (the paper).
- Flat and shadowless; structure comes from thick green rules, left borders and tonal blocks.
- A single natural green family used for rules, accents and identity.
- Sora for headings and labels, Open Sans for reading text.
- Numbers and domain labels are the visual focal points, not ornaments.

## Colors

A restrained, earthy palette: two greens carry identity, a cool charcoal carries text, and pale greys form the page.

### Primary

- **Moss Ledger** (#6a6e4f): The notebook cover. Sidebar background, tag fills, outline buttons, large stat figures, card top borders and card links.
- **Sage Rule** (#7d9a64): The ruled-line green. Header underlines, the thick bar under every section title, proof-point left borders, and highlight marks.

### Neutral

- **Field Ink** (#404449): Default text on the page. A cool charcoal, softer than black.
- **Ledger Ink** (#2b2f33): Denser text for long resume bullets where reading comfort matters.
- **Page Paper** (#eeeeee): The page background and tag text color.
- **Card White** (#ffffff): Raised content cards and the text color inside the green sidebar.
- **Mist Grey** (#dce0e2): The sidebar's menu-toggle outline.
- **Moss Link** (#4a4d37): Body links, Moss Ledger darkened 30% toward black so it holds contrast on Page Paper. Hover state is Deep Tide.
- **Deep Tide** (#093e47): Link hover and the keyboard focus ring. A dark sea-teal used sparingly.
- **Tape Brown** (#615400): Underline color of links inside the green sidebar, like tape on a notebook spine.

### Named Rules

**The Green Family Rule.** Only the two greens express identity. Do not introduce a third accent hue; the unused `--red` (#96244e) in the stylesheet is not part of the system.

**The Rule Line Rule.** Section structure is drawn with Sage Rule lines (underlines, left borders, top borders), not with boxes, fills or shadows.

## Typography

**Display Font:** Sora Variable (with system sans fallback)
**Body Font:** Open Sans Variable (with system sans fallback)
**Label/Quote Font:** Sora for labels; Montserrat Variable italic 300 for the sidebar quote only

**Character:** Sora gives headings a rounded, modern geometric clarity; Open Sans keeps long reading text friendly and neutral. Together they read as approachable engineering rather than corporate or editorial.

### Hierarchy

- **Stat** (700, clamp(4rem, 6vw, 5.6rem), line-height 1.1, Moss Link color): The quantified result that leads each proof point.
- **Base** (2rem on `body`): Not used for reading text. It is the em base the default heading sizes multiply (h1 = 2em = 4rem, h2 = 1.5em = 3rem), so changing it rescales every heading.
- **Display** (700, 4rem / 40px, uppercase): Page identity: the name on Home and Resume. Chinese name is set in the same line with `lang="zh-Hant"`.
- **Headline** (500, 3rem / 30px): Section titles, always sitting on a 1rem Sage Rule bar.
- **Title** (300 default, 500 in cards, 2.34rem): Card titles and job headings.
- **Lead** (400, 2.4rem, line-height 1.5, max 80rem): The one-line positioning statement under the name.
- **Body** (500, 1.751rem, 0.05rem tracking): Paragraphs and list items. Long resume bullets use weight 400, line-height 1.6 to 1.7.
- **Small** (400, 1.5rem): Links, role lines, dates, context lines under a stat.
- **Label** (500, 1.3rem, 0.1rem tracking, uppercase): Domain tags such as HR TECH, SAAS, ADTECH.

### Named Rules

**The Root-10 Rule.** The root is 62.5% so 1rem equals 10px by default while still following the browser font setting. Always specify sizes in rem.

**The Quiet Quote Rule.** The sidebar intro is the only place Montserrat italic appears; do not spread it.

## Layout

A two-column shell: a fixed sidebar of `clamp(24rem, 30vh, 50rem)` plus 5% / 1% padding, and a content column that fills the rest with 3% padding. Content is left-aligned and flows in a single reading column; proof points sit in a row of three, selected work in a two-column grid with 2rem gaps.

Spacing rhythm is built from 0.5, 1, 1.5, 2 and 3rem. Tight groups use 0.5 to 1rem; separate sections use 2 to 3rem.

The single breakpoint is 960px. Below it the sidebar collapses to a 50px rail with a toggle, the content margin becomes 50px, proof points stack, and the grid becomes one column.

## Elevation & Depth

Flat by default. There are no box-shadows anywhere. Depth is conveyed by tone (white cards on Page Paper, Moss Ledger sidebar against Page Paper) and by thick rules. The sidebar is `position: fixed` with z-index 1 but remains visually flat.

### Named Rules

**The Flat-On-Paper Rule.** Surfaces never lift. Hover feedback is a color change, a small horizontal nudge or an opacity change, never a shadow.

## Shapes

Mostly square and ruled. Cards and sections have no rounding; separation is by 0.2rem to 1rem straight lines. Rounding appears only on small interactive objects: pill tags (15px), the sidebar toggle (5px) and the outline button (0.3rem). The portrait is a square crop whose photo is rotated 25 degrees inside it, a single playful, hand-placed gesture.

## Components

### Buttons

- **Shape:** Slightly softened corners (0.3rem).
- **Compact outline (Download PDF on the resume header):** Transparent fill, 0.15rem Moss Ledger border, Moss Ledger text, 1.4rem text, 0.6rem 1.2rem padding, no underline.
- **Hover:** Fills with Moss Ledger, text turns white.
- **Focus:** 0.3rem Deep Tide outline with 0.2rem offset (white inside the sidebar).

### Tags

- **Style:** Moss Ledger pill (15px radius), Page Paper text, Sora 1.5rem, 0.8rem 1rem padding, 0.5rem margin; wrapped in a flex-wrap list.
- **Use:** Skills, signature skills, hobbies and blog tags. Static, not interactive.

### Cards / Containers

- **Work card:** Card White background, 2rem padding, 0.4rem Moss Ledger top border, no radius, no shadow. Content order: uppercase domain label, name, italic role line, summary, "Read more" link.
- **Work card:** the first card spans both columns with a 0.8rem top rule and a 3rem title; the other three stay in two columns. Each links to its role anchor on /resume/.
- **Proof point:** No box. A 0.4rem Sage Rule left border with 1.5rem padding; a Stat-size Moss Link figure leads, followed by the sentence, the uppercase domain and a 1.5rem context line. Three wrap into one column when narrower than about 24rem each.

### Navigation

- **Sidebar:** Moss Ledger background, white text. Portrait, name (3rem bold), italic quote, vertical menu in Sora 600 at 1.5rem, then icon-only contact links in white.
- **States:** Hover nudges a link 0.8rem to the right; the current page is marked by a thicker 0.2rem underline.
- **Mobile:** Collapses to a 50px rail with a toggle that expands the panel.

### Section title

- A 3rem Headline with a 1rem Sage Rule bar below it. Used on Home and every Resume section.

### Contact line

- A flex-wrap row of links (LinkedIn, email, full resume) closing the page, separated from the content above by a 0.2rem Sage Rule top border.

## Do's and Don'ts

### Do:

- **Do** build hierarchy with Sage Rule lines and tonal blocks (Card White on Page Paper).
- **Do** keep one green family: Moss Ledger for identity and fills, Sage Rule for lines.
- **Do** use rem units against the 62.5% root, and keep reading text at or above 1.75rem.
- **Do** lead with the number or outcome when presenting a result, followed by its domain label.
- **Do** keep a visible focus ring (Deep Tide, or white in the sidebar) on every interactive element.
- **Do** mark Chinese text with `lang="zh-Hant"`.

### Don't:

- **Don't** add box-shadows, glows or lifted cards.
- **Don't** introduce a third accent hue or gradients.
- **Don't** put Sage Rule (#7d9a64) behind white text or as small text on Page Paper; it is a line color, not a text color.
- **Don't** use Montserrat italic outside the sidebar quote.
- **Don't** round cards or sections; only small controls and tags are rounded.
- **Don't** add decorative imagery or icons that do not carry information.
