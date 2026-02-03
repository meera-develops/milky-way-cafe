# Claude Chat 1 — Milky Way Cafe Website Build

## Summary
Built a 4-page static website (HTML, CSS, JS) for **Milky Way Cafe**, a locally-owned cafe near UCF in Orlando, FL.

---

## Pages Created
1. **Home** (`index.html`) — Hero section with background image, highlights section with coffee beans background, upcoming events
2. **Our Story** (`our-story.html`) — Cafe backstory, values pills, image gallery
3. **Menu** (`menu.html`) — Menu image + structured text menu (Drinks, Food, Add-Ons)
4. **Contact** (`contact.html`) — Map image, contact form, sidebar with Yelp prompt

## Shared Files
- `styles.css` — All styling
- `script.js` — Mobile nav toggle, active link highlighting, form validation

---

## Changes Made (in order)

### 1. Initial Build
- Created all 4 HTML pages, `styles.css`, and `script.js`
- Color scheme: dark maroon, warm gold, purple accents, cream background
- Responsive navbar with hamburger menu on mobile
- Consistent footer across all pages (address, phone, email, socials)

### 2. Hero Background Image Update
- Changed hero background from `assets/homepage.png` to `assets/hero-img.png`

### 3. Navbar Color Change
- Set navbar background to `#551B14`
- Updated nav brand text, nav links, and hamburger icon to white for contrast

### 4. Font Update
- Added Google Fonts import: **Comfortaa** (headers) and **Montserrat** (body)
- Applied `font-family: 'Comfortaa', cursive` to all `h1`–`h6`
- Applied `font-family: 'Montserrat', sans-serif` to `body`

### 5. Highlights Section Added
- New section between hero and events on the home page
- Uses `assets/coffee-beans.png` as background with dark maroon overlay
- Three cards: Specialty Drinks, Fresh Pastries, Sustainability

### 6. Swapped Emojis for Font Awesome Icons
- Added Font Awesome 6.5.1 CDN to `index.html`
- `fa-mug-hot` for Specialty Drinks
- `fa-cookie-bite` for Fresh Pastries
- `fa-leaf` for Sustainability
- Icons colored in gold (later changed to purple via user edit)

### 7. Navbar Brand Text Colors
- Applied colored text to nav brand across all 4 pages:
  - "Milky" → gold (`var(--gold)`)
  - "Way" → white (inherited)
  - "Cafe" → purple (`var(--purple)`)
- Used `logo-text`, `milky-text`, `cafe-text` classes
- Fixed specificity issue: `.nav-brand .milky-text` and `.nav-brand .cafe-text` to override `.nav-brand span`

---

## CSS Variables (current)
```css
:root {
  --maroon: #3D1C11;
  --dark-brown: #4A2520;
  --gold: #EEC671;
  --light-gold: #D4A843;
  --purple: #8C63A2;
  --cream: #FFF8F0;
  --white: #FFFFFF;
  --text-light: #F5F0EB;
  --overlay: rgba(35, 15, 10, 0.75);
}
```

## Assets Used
- `milkyway-logo.png` — Navbar logo + favicon
- `hero-img.png` — Home page hero background
- `coffee-beans.png` — Highlights section background
- `homepage.png` — Our Story gallery image
- `our-story.png` — Our Story intro image
- `milkyway-menu.png` — Menu page image
- `milkyway-location.png` — Contact page map
- `socialmedia.png` — Our Story gallery image
