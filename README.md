# IRONCORE FITNESS website

Pure HTML, CSS and JavaScript. No build step.

## Run
Open `index.html` in a browser (internet needed for photos and Google Fonts), or host the folder on any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Files
- `index.html` : all page sections
- `css/style.css` : design tokens at the top (`:root`) control colours and fonts
- `js/main.js` : nav, pricing toggle, schedule, form validation. Edit `WHATSAPP_NUMBER` at the top
- `images/` : drop your own photos here

## Customise
1. **WhatsApp / phone / address**: search `919876543210`, `98765 43210`, and `12 Fitness Avenue` and replace.
2. **Photos**: images load from Unsplash. For production, download or shoot your own and change each `src` to `images/yourfile.jpg`. The hero image is the first `<img>` in `index.html`.
3. **Map**: paste your Google Maps embed `<iframe>` inside `<div class="map">`.
4. **Prices, trainers, schedule, testimonials**: sample content. Prices live in `data-m / data-q / data-a` attributes; the schedule is in `js/main.js`.
5. **Enquiry form**: validates in the browser and offers a WhatsApp send. To receive submissions by email, connect it to Formspree, Web3Forms or your backend (see the TODO in `js/main.js`).
