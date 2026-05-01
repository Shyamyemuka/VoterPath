# Skill: Firebase Hosting Deployment

## Purpose
Deploy the VoterPath Vite/React app to Firebase Hosting for a live URL.

---

## One-Time Setup

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Google account
firebase login

# Initialize in project root (after npm run build exists)
firebase init hosting
```

During `firebase init hosting`:
- "Which project?" → Create new or select existing
- "What is your public directory?" → `dist`
- "Configure as SPA?" → `Yes`
- "Set up automatic builds with GitHub?" → `No`
- "Overwrite dist/index.html?" → `No`

---

## firebase.json (complete)
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|jsx|ts|tsx|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

## Deploy Command (Every Time)

```bash
npm run build && firebase deploy
```

Output will include:
```
✔  Deploy complete!
Hosting URL: https://voterpath-app.web.app
```

---

## Environment Variables Warning
⚠️ `VITE_*` env vars are bundled into the client JS at build time.
This is acceptable for a hackathon demo.
Never commit `.env` to git.

## Firebaserc
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```
