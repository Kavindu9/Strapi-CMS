## Why I chose this stack

**Next.js**
- **Server Components fetch content on the server.** The browser receives finished HTML (good for SEO), and only the animated parts ship JavaScript.
- **Built-in caching** means Strapi isn't hit on every visit, without me writing a caching layer.
- **Server Actions** let the "Notify me" form save e-mails through the server, so the Strapi API token never reaches the browser.

**GSAP + ScrollTrigger**
- The original site relies on pinning, scrubbing, overlapping sections. ScrollTrigger is the most mature tool for that, and `@gsap/react` (`useGSAP`) handles cleanup in React.
- `gsap.matchMedia()` gives each breakpoint its own animations and respects `prefers-reduced-motion`.


## Running it locally

**Requirements:** Node.js 20 or 22 (LTS) and npm.

The repository has two apps:

```
/Strapi-CMS   → Strapi 5 (content + admin panel)
/Nota-frontend   → Next.js 16 (the website)
```

### 1. Start the CMS

```bash
cd Strapi-CMS
npm install
npm run develop
```

1. Open http://localhost:1337/admin and create the first admin user.
2. Load the sample content (texts, images and videos):
   ```bash
   npx strapi import -f ./data/nota-content.tar.gz
   ```
3. Check the permissions under **Settings → Users & Permissions → Public**: every content type needs **find** ticked, except **Subscriber**, which gets nothing.
4. Create an API token under **Settings → API Tokens** with type **Custom** and only **Subscriber → create** ticked. Copy it.


### 2. Start the website

```bash
cd Nota-frontend
npm install
```

Create `web/.env.local`:

```env
STRAPI_URL=http://127.0.0.1:1337
STRAPI_API_TOKEN=paste-your-token-here
```

> Use `127.0.0.1` rather than `localhost`. On Windows, Node may resolve `localhost` to IPv6 (`::1`) while Strapi listens on IPv4, and every request fails with `fetch failed`.

```bash
npm run dev
```

Open http://localhost:3000.

**Production build:** `npm run build && npm start` (in `/web`).


## Content model

The homepage is made of **11 Single Types** (one per area of the page) and **1 Collection Type**, built from **8 reusable Components**.

### Single Types (in page order)

| Single Type | Endpoint | Main fields |
|---|---|---|
| Main Nav | `/api/main-n-av` | logoText, logo, links and *Footer Link*, brandMark, order label / product / price / url |
| Notify Popup | `/api/notify-popup` | heading, text, emailPlaceholder, buttonLabel, closeLabel, successMessage, duplicateMessage |
| Hero Section | `/api/hero-section` | title, heroVideo (scroll-scrubbed), posterImage |
| Specs Section | `/api/specs-section` | eyebrow, title, penImage, groups → *Spec Group* |
| Manifesto Section | `/api/manifesto-section` | statement, audienceLabel, audienceText |
| Audience Section | `/api/audience-section` | personas → *Persona*, showcaseVideo (scroll-scrubbed) |
| Smart Paper Section | `/api/smart-paper-section` | eyebrow, title, slides → *Slide* |
| Inside Box Section | `/api/inside-box-section` | eyebrow, title, boxImage, setTitle, setText, description |
| Details Section | `/api/details-section` | featureTiles → *Feature Tile*, galleryTiles → *Gallery Tile* |
| Colors Section | `/api/colors-section` | slides *Color Slide* |
| Footer | `/api/footer` | about, links → *Footer Link*, year, copyright, madeBy, credit |

### Collection Type

| Collection Type | Endpoint | Fields | Access |
|---|---|---|---|
| Subscriber | `/api/subscribers` | email (Email, required, **unique**) | No public access. Only the server can create entries, using a scoped API token. |



## Key trade-offs

**1. One Single Type per section instead of a Dynamic Zone page builder.**
The sections are choreographed together:
- Specs slides in under the fading hero.
- A stepped black curtain hands over to the Manifesto.
- Smart Paper slides over the frozen Audience section.
- Inside Box rises over Smart Paper.
This relies on negative margins and on each section knowing which one comes before it. A Dynamic Zone would let editors reorder sections and silently break the animations, so the order is fixed in code on purpose.

**2. Full effects on desktop only.**
Pinning and overlapping sections run at ≥ 900px with motion allowed. Phones, and users who prefer reduced motion, get a simpler stacked layout. Videos still scrub on phones, and the nav still hides (instantly instead of sliding). This keeps mobile fast and accessible, at the cost of maintaining two layouts.

**3. Pinned sections and anchor links.**
GSAP wraps pinned sections in a spacer, so the browser's own `#anchor` jump lands in the wrong place. I wrote a small shared helper (`scrollToSection`) that scrolls to the start of the spacer. A section can also declare how far into its animation to land (`data-scroll-offset`). 

**4. E-mail capture through a Server Action and a scoped token.**
The browser never talks to Strapi's write API. The Public role can't read or create subscribers, and the token can only create them. Duplicates are prevented by Strapi's `unique` rule and shown to the user as a friendly message.


## What I'd improve with more time

**Robustness**
- **Resilient data fetching:** today, if one section is unpublished, the whole page errors. Each fetcher should return `null` so the page skips that section 
instead of crashing.
**Performance**
- **Media on a CDN**  instead of Strapi's local `uploads` folder. Serve WebM/AV1 versions of the scrubbed videos with an MP4 fallback.

**Deployment**
- **CI/CD:** the website on Vercel and the CMS on Strapi Cloud or Railway with PostgreSQL. Build and lint checks on every pull request.


## AI Tools
- **Anthropic** Extract images to build animation
- **Claud** To get support to identify the infastructure and fine tuning
