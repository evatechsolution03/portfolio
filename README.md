# Evatech Solutions

Agency website for Evatech Solutions — software, websites and custom digital products. Static HTML, CSS and JavaScript. Ready for GitHub Pages.

## Replace placeholders before going live

Search the project for `[ADD` to find every contact and policy placeholder:

- Email, WhatsApp, Instagram, LinkedIn, website and Calendly in `index.html`
- `CONTACT_EMAIL` and `WHATSAPP_NUMBER` at the top of `script.js`
- Maintenance policy in the FAQ
- `og:url` in `index.html`

Do not invent client names, testimonials, statistics or public demo URLs.

## Project screenshots

The site uses these files with relative paths so they work on GitHub Pages:

```text
assets/quizsphere/quizsphere-dashboard.png
assets/quizsphere/quizsphere-lobby.png
assets/quizsphere/quizsphere-question.png
assets/quizsphere/quizsphere-leaderboard.png
assets/quizsphere/quizsphere-phone.jpeg
assets/aurenix/aurenix-dashboard.jpg
assets/aurenix/aurenix-members.jpg
assets/aurenix/aurenix-classes.jpg
assets/aurenix/aurenix-attendance.jpg
```

## Demo videos

The Aurenix case study embeds its YouTube demo (`https://youtu.be/Shx2b9kP1Kc`) in section 08 using the `.video-embed` wrapper.

QuizSphere links out to its Instagram Reel (`https://www.instagram.com/reel/DdgDbtxNNLG/`) from a `.demo-card` in section 08 and from the homepage project card. The Reel is not embedded, so nothing is loaded from Instagram until the visitor clicks.

## Publish on GitHub Pages

1. Upload the repository files as they are.
2. GitHub **Settings → Pages → Deploy from a branch → / (root)**.
3. Keep `.nojekyll` in the repo so GitHub Pages does not process the site with Jekyll.

The enquiry form opens a mail draft. It does not store submissions.
