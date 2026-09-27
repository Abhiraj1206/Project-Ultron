# ULTRON // SYSTEM OVERRIDE

A cinematic, Marvel-inspired event website for the **GeeksForGeeks Student Chapter at Bennett University**, built with plain HTML, CSS and vanilla JavaScript — no frameworks, no build tools.

> This is a student event concept **inspired by** the Marvel/Ultron aesthetic. It is not an official Marvel product.

---

## 1. Folder structure

```
ultron-event/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── ultron-hero-placeholder.svg
    └── ultron-secondary-placeholder.svg
```

Everything is self-contained — no npm install, no server required.

---

## 2. Run it locally in VS Code

1. Open the `ultron-event` folder in VS Code (`File → Open Folder…`).
2. Install the free **Live Server** extension (by Ritwick Dey) from the VS Code Extensions tab, if you don't have it already.
3. Right-click `index.html` in the file explorer and choose **"Open with Live Server"**.
4. Your browser opens automatically at something like `http://127.0.0.1:5500`. The page will hot-reload whenever you save a file.

If you don't want to install anything, you can also just double-click `index.html` to open it directly in a browser — everything will still work, but Live Server is recommended for a smoother editing experience.

---

## 3. How to add / replace the Ultron image

The Ultron artwork is used as a single **fixed full-page background** (`assets/ultron-bg.png`) rather than a separate image per section — it sits behind every section at low opacity and does not move when the page is scrolled, which keeps the whole site feeling like one continuous system rather than a stack of separate images.

To use a different image:

1. Add your image file to the `assets/` folder, e.g. `assets/ultron-bg.png` (overwrite the existing one, or use a new file name).
2. Open `style.css` and find the `.bg-ultron` rule near the top (under `/* GLOBAL */` → background layers):
   ```css
   .bg-ultron {
     background-image:
       radial-gradient(ellipse at 50% 40%, rgba(8,8,10,0.35) 0%, rgba(8,8,10,0.85) 72%, var(--void) 100%),
       url("assets/ultron-bg.png");
     opacity: 0.32;
     mix-blend-mode: screen;
   }
   ```
3. Update the `url(...)` if you renamed the file.
4. Adjust `opacity` (0 = invisible, 1 = fully visible) and `mix-blend-mode` to taste:
   - A **dark image on a black/transparent background** (glowing linework, like the current asset) looks best with `mix-blend-mode: screen` — it hides the black and only shows the bright lines.
   - A **normal photo/illustration** usually looks better with `mix-blend-mode: normal` (or removing that line entirely) and a lower `opacity` (around `0.12`–`0.2`) so text stays readable on top.
5. `background-position` controls which part of the image is framed (currently `center 20%`, i.e. weighted toward the top so a character's head/torso stays visible). Adjust the percentages if your image is cropped awkwardly.

**Where to find usable imagery:** if you're not supplying your own artwork, search stock/fan-art sites for royalty-free "AI robot" / "metallic android" imagery rather than official Marvel stills, especially for anything you submit or publish publicly.

---

## 4. How to test the registration modal

1. Scroll to the bottom "WILL YOU ENTER THE SYSTEM?" section, or click **REGISTER** in the nav.
2. Click **REGISTER NOW**.
3. Try submitting with empty fields — you'll see a validation error.
4. Fill in Name, Email, College, and Phone (Team Name is optional) and submit.
5. You should see the **ACCESS GRANTED / REGISTRATION INITIALIZED** success screen.
6. Press `Esc` or click the ✕ to close the modal at any time.

**Note:** this form has no real backend yet — it only validates and shows a success message in the browser. Open `script.js` and look for the comment `===== CONNECT A REAL BACKEND HERE =====` inside `handleRegistrationSubmit()` for exactly where to add a real `fetch()` call (e.g. to Formspree, Getform, or your own API).

---

## 5. Editing event details

Open `script.js` and edit the object at the very top:

```js
// ===== EDIT EVENT DETAILS HERE =====
const EVENT_DATA = {
  name: "ULTRON // SYSTEM OVERRIDE",
  date: "24 OCTOBER 2026",
  venue: "BENNETT UNIVERSITY",
  time: "10:00 AM — 5:00 PM"
};
```

These values are automatically written into the "Event Introduction" section when the page loads. You can also edit the description paragraph directly inside `index.html` under the `<!-- ===== EDIT EVENT DESCRIPTION HERE ===== -->` comment.

---

## 6. Editing the Transmissions (social) section

The **TRANSMISSIONS** section (between the Ultron core section and Registration) shows two columns of real event photos — **LINKEDIN** on the left, **INSTAGRAM** on the right. Every photo is a link:

- The 4 LinkedIn photos all open **https://www.linkedin.com/company/gfg-bu/** (the chapter's LinkedIn page) in a new tab.
- The 3 Instagram photos all open **https://www.instagram.com/geeksforgeeks_bu/** (the chapter's Instagram profile) in a new tab.

The photo files live in `assets/social/` (`linkedin-1.jpg`…`linkedin-4.jpg`, `instagram-1.jpg`…`instagram-3.jpg`).

**To swap a photo:** replace the matching file in `assets/social/` with a new image of the same name (or add a new file and update the `src` in `index.html`).

**To point a tile at a specific post instead of the main profile:** in `index.html`, find its `<a class="social-photo" href="...">` inside `.social-columns` and change the `href` to that post's URL.

**To add/remove tiles:** copy, edit, or delete a whole `<a class="social-photo">…</a>` block inside the relevant `.social-image-grid` — LinkedIn's grid and Instagram's grid are independent, so the two columns don't need to match in count.

## 7. Create a GitHub repository and upload the project

1. Go to [github.com](https://github.com) and click **New repository**. Name it e.g. `ultron-system-override`. Leave it public, don't add a README (you already have one).
2. On your computer, open a terminal inside the `ultron-event` folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ULTRON // SYSTEM OVERRIDE"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ultron-system-override.git
   git push -u origin main
   ```
3. Refresh your GitHub page — your files should now be there.

*(If you don't have Git installed, download it from [git-scm.com](https://git-scm.com), or simply drag-and-drop your files into the empty GitHub repo page in the browser instead.)*

---

## 8. Deploy it on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/log in with your GitHub account.
2. Click **Add New → Project**.
3. Select your `ultron-system-override` repository and click **Import**.
4. Since this is a plain static site, leave the settings as default (no build command needed — Framework Preset: "Other").
5. Click **Deploy**. After a few seconds you'll get a live URL like `https://ultron-system-override.vercel.app`.
6. Any time you push new changes to GitHub, Vercel redeploys automatically.

---

## 9. Concept explanation (for your submission writeup)

> **ULTRON // SYSTEM OVERRIDE** reimagines a college event landing page as a hijacked AI control system. Visitors "boot into" a compromised network, are greeted by Ultron declaring control, and then gradually uncover the real event details as the interface stabilizes. The visual language — cold metallic silver, dark charcoal backgrounds and a restrained red accent — mirrors Ultron's own aesthetic without using official Marvel assets. 2.5D depth is created entirely with CSS (perspective grids, parallax layers, glow, and scroll reveals) rather than a 3D engine, keeping the experience fast and lightweight while still feeling cinematic. Every section — from the full-screen "control panel" navigation to the HUD-style Ultron core display — reinforces the idea that you're operating inside the machine, right up until you choose to register and "enter the system" yourself.

---

## 10. Resources / libraries / assets used

- **Fonts:** [Google Fonts](https://fonts.google.com) — Orbitron (headings/system text) and Space Grotesk (body text). Loaded via `<link>` tags, no download needed.
- **Images:** `assets/ultron-bg.png` — used as a fixed, low-opacity full-page background (see section 3 above for how to swap it).
- **No JavaScript libraries** — all animation, parallax, particles, and modal logic is hand-written vanilla JS in `script.js`.
- **No CSS frameworks** — all styling is hand-written in `style.css`.
- **Recommended VS Code extension:** [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for local development.

---

## 11. Accessibility & performance notes

- Respects `prefers-reduced-motion` (skips boot animation and parallax for users who request reduced motion).
- All interactive elements are keyboard-reachable with visible focus states.
- `Esc` closes both the full-screen menu and the registration modal.
- Particle count is reduced on small screens; custom cursor and HUD side-labels are hidden on touch/mobile for a clean, honest mobile layout.
- No external JS libraries and no autoplay audio — the whole page is light and loads fast.
