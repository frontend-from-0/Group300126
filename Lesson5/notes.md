# Colors
* Standard colors (e.g. blue, red, yellow). Full list can be found here: https://www.w3schools.com/tags/ref_colornames.asp

* HEX & HEXA (#RRGGBB & #RRGGBBAA) - #000 #000000 both are black color (mostly used in frontend development)


* RGB - rgb(0, 230, 0)
* RGBA - rgba(0,0,0,0.4) the last number is for opacity (transparency)

* HSL & HSLA (HUE - SATURATION - LIGHTNESS)

! We do not mix different color types in the same project, only rgba is an exception and can be combined with other types when opacity is needed.


# Priority in CSS

When multiple CSS rules target the same element, the browser has to decide which one to apply. This is determined by CSS specificity (priority).

1. General Rule: More Specific Wins
   Some rules are stronger (more specific) than others. For example:

* Inline styles (style="") have the highest priority
* ID selectors (#id) are strong
* Class selectors (.class), attributes (\[type="text"]), and pseudo-classes (\:hover) are medium
* Element selectors (like h1, p) and pseudo-elements (::before) are weak
* The universal selector (\*) has the lowest priority

2. Specificity as Points
   You can imagine specificity as a point system:

* Inline styles = 1000 points
* ID selector = 100 points
* Class/attribute/pseudo-class = 10 points
* Element selector/pseudo-element = 1 point

Example:
p { color: black; }         → 1 point
.text { color: blue; }      → 10 points
\#main { color: red; }       → 100 points
→ The text will be red, because #main has the highest specificity.

3. Inline Style Always Wins
   If you write directly in HTML like this:

<p style="color: green" class="text" id="main">Hello</p>  
Then "color: green" from the inline style wins, even over #main or .text.

4. Combined Selectors
   If you combine selectors, their points add up:
   \#header .title { color: purple; }
   → 100 (ID) + 10 (class) = 110 points
   That beats .title (10 points) or h1 (1 point).

5. !important Overrides Specificity
   Using !important will make a rule stronger than all others (except another !important with higher specificity).

Example:
.text { color: blue !important; }
→ This will override even an ID selector without !important.

6. Order in the CSS File
   If two rules have the same specificity, the one that appears later in the CSS file will be used.


# CSS Units

## Absolute Units

These units are fixed and do not change based on screen size or user settings.

* `px` – Pixels (the only one from the list that is used for Web)
* `cm` – Centimeters
* `mm` – Millimeters
* `in` – Inches
* `pt` – Points (1 pt = 1/72 inch)
* `pc` – Picas (1 pc = 12 pt)

Use absolute units when you need precise physical measurements, like for print layouts.

## Relative Units

These units scale based on other values, such as font size or viewport dimensions.

### Font-relative units

* `em` – Relative to the font-size of the parent
* `rem` – Relative to the font-size of the root element (`html`)
* `%` – Relative to the size of the parent element

We don't really use units below:
* `ex` – Relative to the x-height of the font (typically the height of "x")
* `ch` – Relative to the width of the "0" character in the current font

### Viewport-relative units
* `%` – Relative to the size of the parent element
* `vw` – 1% of the viewport’s width
* `vh` – 1% of the viewport’s height
* `vmin` – 1% of the smaller dimension (width or height)
* `vmax` – 1% of the larger dimension (width or height)

Relative units are best for responsive design and accessibility.


# Fonts

* Google fonts: https://fonts.google.com/

* Font weights

* Truncate long text with elipsis: https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/

