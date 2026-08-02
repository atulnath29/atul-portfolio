# Atul Nath — Portfolio Website

A production-ready personal portfolio website for **Atul Nath**, Full Stack Developer.

**Live site**: [https://atulnath29.github.io/atul-portfolio](https://atulnath29.github.io/atul-portfolio)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 + Custom CSS |
| Animations | Framer Motion |
| CMS | Sanity.io (headless) |
| Deployment | GitHub Pages + GitHub Actions |

---

## Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/atulnath29/atul-portfolio.git
cd atul-portfolio
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
# Copy the example env file
copy .env.example .env.local

# Edit .env.local and replace YOUR_PROJECT_ID with your Sanity project ID
# You can find it at: https://sanity.io/manage
VITE_SANITY_PROJECT_ID=your-actual-project-id
VITE_SANITY_DATASET=production
```

### 4. Start the Dev Server

```bash
npm run dev
```

The site will be running at **http://localhost:5173**

> **Note**: Without a Sanity project ID configured, the site displays fallback seed data for projects and achievements. Everything still works visually.

---

## Running Sanity Studio Locally

Sanity Studio is the admin dashboard for managing your content.

### 1. First-time Setup (create a Sanity project)

```bash
cd studio
npm create sanity@latest .
```

Follow the prompts: log in with GitHub, create a new project, use `production` as dataset name.
Copy the generated project ID to both `.env.local` (root) and `studio/sanity.config.js`.

### 2. Install Studio Dependencies

```bash
cd studio
npm install
```

### 3. Start the Studio

```bash
cd studio
npm run dev
```

The studio will open at **http://localhost:3333**

---

## Content Management

All dynamic content is managed through **Sanity Studio**. Here is what you can manage:

| Content Type | What it controls |
|-------------|-----------------|
| **Projects** | Portfolio projects (title, description, tech stack, links, image, display order) |
| **Achievements** | Hackathons, workshops, competitions |
| **Certificates** | Certifications from any platform |
| **Badges** | Platform badges (LeetCode, HackerRank, Google Skills, Microsoft) |

### How to Add/Edit Content

1. Open Sanity Studio at `http://localhost:3333`
2. Select the content type from the left sidebar
3. Click "+" to add or click an existing item to edit
4. Save — changes reflect live on the deployed site automatically

### Seeding Initial Data

To populate the database with the initial seed data (4 achievements + 5 projects):

```bash
set SANITY_PROJECT_ID=your-project-id
set SANITY_TOKEN=your-write-token
node studio/seed.js
```

Get your write token from sanity.io/manage → API → Tokens.

---

## Deploying to GitHub Pages

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/atulnath29/atul-portfolio.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages

In your GitHub repo: **Settings** → **Pages** → Source: **GitHub Actions**

### Step 3 — Add Sanity Secret

In repo **Settings** → **Secrets and variables** → **Actions** → Add new secret:
- Name: `VITE_SANITY_PROJECT_ID`
- Value: your Sanity project ID

### Step 4 — Auto-Deploy

Every push to `main` automatically builds and deploys via `.github/workflows/deploy.yml`.

For manual deploy: `npm run deploy`

---

## CORS Setup for Sanity

After creating your Sanity project, add these origins:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project → **API** → **CORS Origins**
3. Add `http://localhost:5173` and `https://atulnath29.github.io`

---

## Project Structure

```
atul-portfolio/
├── src/
│   ├── components/       # All React components
│   ├── hooks/            # useSanity.js, useDarkMode.js
│   ├── lib/              # sanityClient.js
│   ├── App.jsx
│   └── index.css         # Design system
├── studio/               # Sanity Studio
│   ├── schemaTypes/      # project.js, achievement.js, certificate.js, badge.js
│   ├── sanity.config.js
│   └── seed.js
├── public/images/        # Profile photo
├── .github/workflows/    # GitHub Actions CI/CD
├── vite.config.js
└── package.json
```

---

MIT License — fork and customize freely.
