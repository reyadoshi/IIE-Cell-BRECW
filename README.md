# IIE Cell Students Club — BRECW

A responsive static website for the Innovation, Incubation and Entrepreneurship Cell Students Club. No personal names, accounts, data collection or backend.

## Publish on GitHub Pages

1. Create a GitHub repository and upload **the contents of this folder** to its root. Keep `index.html`, `styles.css`, `roles.js`, `app.js`, `motion.js`, `motion.css`, `.nojekyll` and `assets/` together.
2. Open repository **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose **main**, **/ (root)** and save.
5. Open the Pages URL GitHub provides after deployment finishes.

All internal files use relative paths, so this also works under a project URL such as username.github.io/repository-name/.

## Edit content

- `roles.js`: all 18 positions, categories, descriptions and responsibilities.
- `index.html`: college header, club purpose, reporting structure, innovation pathway, suggested activity plan and proposed charter.
- `styles.css`: responsive styling, reduced-motion support and print layout.
- `app.js`: role filtering/search, mobile navigation and print support.

The governance framework and monthly activity plan are proposals rather than claims of formally adopted college policy. No real events, office-bearers or application process are invented. Confirm institutional approval before representing this as the college's official club website.

## Branding sources

- BRECW emblem: https://slv-edu.in/HomeAssets/img/logo/brecw_logo.png
- NAAC A badge: image embedded in page 1 of the official college report at https://slv-edu.in/AcademicSectionFiles/6_1_Events_Website_15032025031917AM.pdf

The NAAC source is low resolution; replace `assets/naac-a.png` with a higher-resolution approved copy when available. Both assets are bundled locally. Google Fonts is optional: system fonts take over when it is unavailable. No other network requests are needed for the site to function.

## Preview locally

Serve this directory with any static web server, or open index.html directly in a browser. No build or installation is required.

## Motion experience

- Skippable welcome entrance: “Welcome to IIE Cell · BRECW”.
- Interactive particle constellation and floating hero cards.
- Scroll reveals, progressive text highlights and section underline effects.
- Continuous idea ticker, reading progress bar and active navigation.
- Pointer spotlight on role cards and monthly activities.
- Motion toggle, system reduced-motion support and mobile particle limits.

Effects use native browser APIs. No animation packages or build process are required. Decorative effects pause when the browser tab is hidden; particle animation stops when the hero leaves the viewport.

Repository supplied for deployment: https://github.com/reyadoshi/IIE-Cell-BRECW

Replace the repository files with this folder’s contents, including the two new motion files. The repository could not be accessed during preparation; no remote changes were made.
