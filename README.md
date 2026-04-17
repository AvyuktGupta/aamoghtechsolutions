# Aamogh Tech Solutions — Website

A React + Vite frontend with a small Node/Express backend that powers the
**Contact Us** form. When a visitor submits the form, the backend sends an
email from `support@aamoghtech.org` to `support@aamoghtech.org` via Gmail SMTP
in this exact format:

```
Name: {Given name}
Email: {Given Email}
Message: {Given message}
```

---

## Project layout

```
aamoghtechsolutions/
├── src/                  # React app (Vite)
├── vite.config.js        # Vite config — includes a dev proxy for /api → :3001
├── .env                  # Frontend env (optional; proxy handles local dev)
├── server/               # Contact API (Express + Nodemailer)
│   ├── src/index.js
│   ├── package.json
│   ├── .env              # Backend env (Gmail creds, CORS origin, etc.)
│   └── .env.example
└── README.md
```

The frontend calls `POST /api/contact`. In dev, Vite proxies that to the
backend on `http://localhost:3001` so you don't need to worry about CORS.

---

## Prerequisites

- Node.js 18+ and npm
- A Gmail account with an **App Password** (used by the backend to send mail).
  See: <https://support.google.com/accounts/answer/185833>

---

## One-time setup

Open a terminal in the project root: `aamoghtechsolutions/`.

### 1. Install frontend dependencies

```powershell
npm install
```

### 2. Install backend dependencies

```powershell
npm --prefix server install
```

### 3. Configure the backend `.env`

Copy the example and fill in the Gmail credentials:

```powershell
Copy-Item server\.env.example server\.env
```

Then edit `server/.env` so it looks like this:

```env
PORT=3001
CLIENT_ORIGIN=http://localhost:5173

# Gmail SMTP (use a Google App Password, NOT your normal password)
GMAIL_USER=support@aamoghtech.org
GMAIL_APP_PASSWORD=your_16_char_app_password

# Where contact form emails are delivered (defaults to GMAIL_USER)
CONTACT_TO=support@aamoghtech.org
```

Notes:
- `GMAIL_APP_PASSWORD` must be a 16-character Google App Password with no
  spaces. A regular Gmail password will not work.
- `CLIENT_ORIGIN` must match the URL of the running Vite dev server
  (default `http://localhost:5173`). If Vite reports a different port, either
  update this value or free up port 5173 and restart Vite.

### 4. (Optional) Frontend `.env`

For local development you don't need one — the Vite dev proxy forwards
`/api/*` to the backend. The file `.env.example` is provided for reference:

```env
# Only needed if you want the frontend to call the backend on a different
# host (e.g. a deployed API). Leave unset for local dev.
VITE_CONTACT_API_BASE=http://localhost:3001
```

---

## Running the app (every time)

You need **two** processes running at the same time: the backend and the
frontend. Open **two** terminals in `aamoghtechsolutions/`.

### Terminal 1 — start the backend (contact API)

```powershell
npm --prefix server run dev
```

You should see:

```
Contact API listening on http://localhost:3001
```

Quick health check (in any terminal):

```powershell
Invoke-WebRequest http://localhost:3001/health -UseBasicParsing | Select-Object -ExpandProperty Content
# expected: {"ok":true}
```

### Terminal 2 — start the frontend (Vite)

```powershell
npm run dev
```

You should see:

```
VITE vX.Y.Z  ready in ... ms
➜  Local:   http://localhost:5173/
```

Open <http://localhost:5173/> in your browser and submit the Contact Us form.
On success you'll see a confirmation message and `support@aamoghtech.org`
will receive an email in the format shown at the top of this README.

---

## Stopping the servers

In each terminal press `Ctrl + C`. If a port is still held by a stale process:

```powershell
# Find the PID listening on port 5173 (or 3001) and kill it
Get-NetTCPConnection -LocalPort 5173 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
Get-NetTCPConnection -LocalPort 3001 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

---

## Troubleshooting

**"Something went wrong. You can email us directly at support@aamoghtech.org."**

Work through these in order:

1. **Is the backend running?**
   Visit <http://localhost:3001/health>. It must return `{"ok":true}`.
   If not, start it: `npm --prefix server run dev`.

2. **Is Vite on port 5173?**
   Check the Vite terminal output. If it fell back to `5174`, either free
   port 5173 and restart Vite, or update `CLIENT_ORIGIN` in `server/.env` to
   match and restart the backend.

3. **Did you edit `vite.config.js` or `.env` while Vite was running?**
   Stop Vite (`Ctrl + C`) and run `npm run dev` again. Vite only reads these
   files at startup.

4. **Gmail authentication errors in the backend terminal** (e.g.
   `Invalid login`, `Username and Password not accepted`):
   - `GMAIL_APP_PASSWORD` must be a 16-character **App Password** (no
     spaces), not your normal Gmail password.
   - 2-Step Verification must be enabled on the Google account.
   - `GMAIL_USER` must match the account that owns the App Password.

5. **CORS errors in the browser console:**
   Make sure `CLIENT_ORIGIN` in `server/.env` matches the exact URL shown by
   Vite (including the port), then restart the backend.

---

## Production build

```powershell
npm run build       # outputs the static frontend to dist/
npm run preview     # serves the built frontend locally for a final check
```

In production the backend still needs to run somewhere reachable, and the
frontend needs to know its URL. Set `VITE_CONTACT_API_BASE` in the frontend
`.env` to the public backend URL **before** running `npm run build`.
