# VoterPath — Tech Stack Document

## Stack Overview

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend Framework | React 18 + Vite | Fast dev, modern, AI-friendly codegen |
| Styling | Tailwind CSS v3 | Rapid UI, responsive, no CSS files |
| AI Engine | Google Gemini 1.5 Flash | Free tier, fast, multilingual, Google product |
| Deployment | Firebase Hosting | Google product, instant deploy, free SSL |
| Maps | Google Maps Embed API | No API key needed for embed iframes |
| Fonts | Google Fonts (Noto Sans) | Multilingual script support |
| State | React Context + useState | No Redux needed for this scope |
| HTTP | @google/generative-ai SDK | Official Gemini JS SDK |
| Icons | Lucide React | Lightweight, clean icons |

---

## Dependencies

### package.json
```json
{
  "name": "voterpath",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@google/generative-ai": "^0.21.0",
    "lucide-react": "^0.383.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.1",
    "vite": "^5.2.0"
  }
}
```

---

## Environment Variables

```env
# .env (root of project)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key_here  # optional, embed works without it
```

**Getting Gemini API Key:**
1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy and paste into `.env`
4. Free tier: 15 RPM, 1M tokens/day — more than sufficient for hackathon

---

## Project Structure

```
voterpath/
├── public/
│   └── vite.svg
├── src/
│   ├── main.jsx                 # App entry point
│   ├── App.jsx                  # Root component, layout
│   ├── index.css                # Tailwind directives
│   │
│   ├── components/
│   │   ├── Header.jsx           # Logo + LanguageSwitcher
│   │   ├── HeroSection.jsx      # Title, subtitle, CTA stats
│   │   ├── ElectionTimeline.jsx # 7-step interactive timeline
│   │   ├── TimelineStep.jsx     # Individual expandable step
│   │   ├── ChatInterface.jsx    # Full chat UI container
│   │   ├── ChatMessage.jsx      # Single message bubble
│   │   ├── SuggestedPrompts.jsx # Clickable starter chips
│   │   ├── BoothFinder.jsx      # Maps embed + search
│   │   ├── QuickInfoCards.jsx   # Helpline, rights, facts
│   │   └── Footer.jsx
│   │
│   ├── contexts/
│   │   └── LanguageContext.jsx  # Language state + translations
│   │
│   ├── lib/
│   │   ├── gemini.js            # Gemini API client + system prompt
│   │   └── translations.js      # All UI string translations
│   │
│   └── data/
│       └── timeline.js          # Election timeline step data
│
├── .env                         # API keys (gitignored)
├── .env.example                 # Template for keys
├── .gitignore
├── firebase.json                # Firebase hosting config
├── .firebaserc                  # Firebase project config
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## Firebase Hosting Setup

```json
// firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Deploy Commands:**
```bash
npm run build
firebase login
firebase init hosting  # select existing project or create new
firebase deploy
```

---

## Gemini Configuration

```javascript
// src/lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getElectionAssistant = (language = 'en') => {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: buildSystemPrompt(language),
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 1024,
    }
  });
};
```

---

## Google Maps Embed

No API key required for basic embed:
```html
<iframe
  src="https://www.google.com/maps/embed/v1/search?q=polling+booth+near+{location}&key=YOUR_KEY"
  width="100%"
  height="300"
  style="border:0;"
  allowfullscreen
  loading="lazy"
/>
```

For the booth finder, use direct Maps URL redirect (zero API cost):
```javascript
const openBoothFinder = (location) => {
  window.open(`https://maps.google.com/maps?q=polling+booth+near+${encodeURIComponent(location)}`, '_blank');
};
```

---

## Tailwind Config

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        india: {
          orange: '#FF9933',
          white: '#FFFFFF',
          green: '#138808',
          navy: '#000080',
        }
      },
      fontFamily: {
        sans: ['Noto Sans', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: []
}
```

---

## Design System

**Color Palette:**
- Primary: `#138808` (India Green) — CTAs, active states
- Accent: `#FF9933` (India Orange) — highlights, timeline icons
- Navy: `#000080` — header, text emphasis
- Background: `#F8FAFC` — page background
- Chat Bot Bubble: `#EFF6FF` (light blue)
- Chat User Bubble: `#138808` (green) with white text

**Typography:**
- Font: Noto Sans (supports Devanagari, Telugu, Tamil, Bengali scripts)
- Headings: 700 weight
- Body: 400 weight
- Chat: 14px

**Border Radius:** `rounded-2xl` for cards, `rounded-full` for chips
