# Aamogh Tech Solutions — Website

A React + Vite frontend with a contact API that sends email via Gmail SMTP.
When a visitor submits the **Contact Us** form, an email is sent from
`support@aamoghtech.org` to `support@aamoghtech.org` in this exact format:

```
Name: {Given name}
Email: {Given Email}
Message: {Given message}
```

The contact API exists in **two equivalent forms** so the same repo works
both locally and on Vercel:

- **Production (Vercel):** a serverless function at
  [`api/contact.js`](./api/contact.js). Vercel auto-mounts files in `/api/`
  as serverless endpoints, so the frontend can post to `/api/contact` on the
  same origin — no CORS, no separate host.
- **Local dev:** a small Express server in
  [`server/`](./server) that exposes the same `POST /api/contact` endpoint
  on `http://localhost:3001`. Vite proxies `/api/*` to it during `npm run
  dev`.

---

## Project layout

```
aamoghtechsolutions/
├── api/
│   └── contact.js        # Vercel serverless function (production)
├── src/                  # React app (Vite)
├── vite.config.js        # Vite config — dev proxy for /api → :3001
├── server/               # Local Express API (dev only)
│   ├── src/index.js
│   ├── package.json
│   ├── .env              # Backend env (Gmail creds, CORS origin, etc.)
│   └── .env.example
├── package.json
└── README.md
```

---

## Prerequisites

- Node.js 18+ and npm
- A Gmail account with an **App Password** (16 characters, no spaces).
  See: <https://support.google.com/accounts/answer/185833>. 2-Step
  Verification must be enabled on that Google account.

---

## Local development

### 1. Install dependencies

From `aamoghtechsolutions/`:

```powershell
npm install
npm --prefix server install
```

### 2. Configure the local backend

```powershell
Copy-Item server\.env.example server\.env
```

Edit `server/.env`:

```env
PORT=3001
CLIENT_ORIGIN=http://localhost:5173

# Gmail SMTP (use a Google App Password, NOT your normal password)
GMAIL_USER=support@aamoghtech.org
GMAIL_APP_PASSWORD=your_16_char_app_password

# Where contact form emails are delivered (defaults to GMAIL_USER)
CONTACT_TO=support@aamoghtech.org
```

> You do **not** need a frontend `.env` for local dev — Vite proxies
> `/api/*` to the Express server automatically.

### 3. Run two terminals

**Terminal 1 — backend (Express):**

```powershell
npm --prefix server run dev
# → Contact API listening on http://localhost:3001
```

**Terminal 2 — frontend (Vite):**

```powershell
npm run dev
# → ➜ Local: http://localhost:5173/
```

Open <http://localhost:5173/>, submit the Contact form, and check the
`support@aamoghtech.org` inbox.

### Quick health check

```powershell
Invoke-WebRequest http://localhost:3001/health -UseBasicParsing | Select-Object -ExpandProperty Content
# expected: {"ok":true}
```

---

## Deploying to Vercel (production)

The repo is set up so Vercel needs **zero config** — the Vite app is built
and served statically, and `api/contact.js` runs as a serverless function
on the same domain.

### 1. Vercel project settings

In the Vercel dashboard, for this project:

- **Root Directory:** `aamoghtechsolutions` (if your repo root contains
  other folders). If the entire repo *is* this project, leave it as the
  repo root.
- **Framework Preset:** Vite (auto-detected).
- **Build Command:** `npm run build` (default).
- **Output Directory:** `dist` (default).
- **Install Command:** `npm install` (default).

You do **not** need to deploy the `server/` folder — it's only used for
local development.

### 2. Set environment variables on Vercel

Go to **Project → Settings → Environment Variables** and add the following
for the **Production** environment (and Preview, if you want previews to
send real email):

| Name                  | Example value                  | Notes                                    |
| --------------------- | ------------------------------ | ---------------------------------------- |
| `GMAIL_USER`          | `support@aamoghtech.org`       | Gmail address that owns the App Password |
| `GMAIL_APP_PASSWORD`  | `abcd efgh ijkl mnop`          | 16-char App Password, spaces optional    |
| `CONTACT_TO`          | `support@aamoghtech.org`       | Recipient of contact emails              |

> ⚠️ **Never** put these values in `.env` files that are committed to git.
> Set them only in the Vercel dashboard (and locally in `server/.env`,
> which is git-ignored — see below).

### 3. Redeploy

After saving the env vars, trigger a new deployment (Vercel → Deployments →
"Redeploy" on the latest commit, or push a new commit). Env vars are baked
into the serverless function environment at deploy time.

### 4. Verify in production

On the deployed site, open DevTools → **Network**, submit the Contact form,
and confirm the request to `/api/contact` returns `200 {"ok":true}`.

You can also hit the function directly from PowerShell:

```powershell
$body = '{"name":"Test","email":"test@example.com","message":"hello from prod"}'
Invoke-WebRequest -Uri "https://YOUR-DOMAIN.vercel.app/api/contact" `
  -Method POST -Body $body -ContentType "application/json" -UseBasicParsing |
  Select-Object -ExpandProperty Content
# expected: {"ok":true}
```

---

## Security: keep secrets out of git

`.env` files contain your Gmail App Password. They are git-ignored in this
repo (see `.gitignore`):

```
.env
.env.*
!.env.example
server/.env
!server/.env.example
```

If you already committed a real password, **rotate/revoke it immediately**
in the Google Account → Security → App passwords page and set a fresh one
on Vercel.

---

## Troubleshooting

### "Something went wrong. You can email us directly at support@aamoghtech.org."

Open DevTools → **Network** and click the `/api/contact` request to see
what actually happened.

- **404 on Vercel:** `api/contact.js` wasn't deployed. Make sure the file
  exists at `aamoghtechsolutions/api/contact.js`, the Vercel **Root
  Directory** setting points at `aamoghtechsolutions/`, and redeploy.
- **500 `Server email is not configured`:** `GMAIL_USER` /
  `GMAIL_APP_PASSWORD` are not set on Vercel. Add them in Project →
  Settings → Environment Variables and redeploy.
- **500 `Failed to send email` with Gmail auth error in logs:** the App
  Password is wrong, expired, or 2-Step Verification isn't enabled on the
  Google account.
- **Locally, 404 on `/api/contact`:** the Express server isn't running, or
  Vite was started before `vite.config.js` existed. Restart both terminals.
- **Locally, CORS errors:** `CLIENT_ORIGIN` in `server/.env` must match the
  exact URL Vite is serving (default `http://localhost:5173`). If Vite
  falls back to `5174`, free port 5173 and restart Vite, or update
  `CLIENT_ORIGIN` and restart the backend.

### Freeing stuck ports locally

```powershell
Get-NetTCPConnection -LocalPort 5173 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
Get-NetTCPConnection -LocalPort 3001 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

---

## Production build (static only)

```powershell
npm run build       # outputs the static frontend to dist/
npm run preview     # serves the built frontend locally
```

`npm run preview` serves *only* the static frontend — the contact form
will fail against it unless you're also running the Express server and
Vite-style proxying, so for a true end-to-end production test, use the
Vercel Preview deployment instead.
