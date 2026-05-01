# VoterPath — Implementation Plan

## Build Order (Optimized for Speed)

Total estimated time: 3–4 hours with AI-assisted coding

---

## Phase 1 — Project Bootstrap (15 min)

```bash
npm create vite@latest voterpath -- --template react
cd voterpath
npm install @google/generative-ai lucide-react clsx
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Files to create/edit:**
1. `tailwind.config.js` — add content paths + custom colors + Noto Sans font
2. `index.css` — add Tailwind directives + Google Fonts import for Noto Sans
3. `vite.config.js` — default is fine
4. `.env` — add `VITE_GEMINI_API_KEY`
5. `.gitignore` — add `.env`

---

## Phase 2 — Data & Core Logic (20 min)

### 2a. `src/data/timeline.js`
Define the 7 election steps array:
```javascript
export const electionSteps = [
  {
    id: 1,
    icon: '📢',
    title: 'Election Announcement',
    shortDesc: 'Election Commission announces dates',
    details: `...full explanation...`,
    officialLink: 'https://eci.gov.in',
    chatPrompt: 'Explain the election announcement and Model Code of Conduct'
  },
  // ... steps 2-7
]
```

Steps to cover:
1. Announcement & Model Code of Conduct (MCC)
2. Voter Registration (Form 6 / NVSP Portal)
3. Candidate Nomination & Scrutiny
4. Election Campaign Period
5. Voter ID / EPIC Card
6. Voting Day (EVM + VVPAT)
7. Vote Counting & Results Declaration

### 2b. `src/lib/translations.js`
```javascript
export const translations = {
  en: { /* all strings */ },
  hi: { /* Hindi */ },
  te: { /* Telugu */ },
  ta: { /* Tamil */ },
  bn: { /* Bengali */ }
}
```

Keys needed: `hero.title`, `hero.subtitle`, `chat.placeholder`, `chat.welcome`, `timeline.title`, `booth.title`, `booth.placeholder`, `booth.button`, etc.

### 2c. `src/lib/gemini.js`
```javascript
const SYSTEM_PROMPT = (lang) => `
You are VoterPath Assistant, a friendly and patient AI guide for Indian election processes. 
You work for VoterPath, an educational platform helping Indian citizens understand democracy.

YOUR PERSONALITY:
- Patient, encouraging, and clear — never condescending
- Use simple language, avoid bureaucratic jargon
- Give step-by-step answers when explaining processes
- Use relevant emojis sparingly to make responses friendly 🗳️
- Always end with a follow-up question or offer to help further

YOUR KNOWLEDGE COVERS:
- Voter registration process (Form 6, NVSP portal, Voter Helpline App)
- EPIC card (Voter ID) — how to get, correct, replace
- Election announcement, Model Code of Conduct
- Candidate nomination process
- Voting day — how to vote, EVM operation, VVPAT
- NOTA (None of the Above) option
- Polling booth finding (direct to voters.eci.gov.in)
- Vote counting and results
- Voting rights and RTI
- Important contacts: Voter Helpline 1950, ECI website eci.gov.in

LANGUAGE: Respond in ${langName(lang)} language. If the user writes in a different language, respond in that language.

BOUNDARIES:
- Only answer questions related to elections, voting, and civic processes
- If asked about specific candidates, parties, or political opinions, politely decline and redirect to factual process information
- If asked completely unrelated questions, gently redirect: "I'm best at helping with election questions! Try asking me about voter registration or how to use an EVM."

FORMAT:
- Use numbered lists for multi-step processes
- Bold important terms
- Keep responses under 250 words unless the question genuinely requires more
- For official links, always mention: eci.gov.in, voters.eci.gov.in, nvsp.in
`;
```

### 2d. `src/contexts/LanguageContext.jsx`
```jsx
import { createContext, useContext, useState } from 'react';
import { translations } from '../lib/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const t = (key) => key.split('.').reduce((obj, k) => obj?.[k], translations[language]) || key;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
```

---

## Phase 3 — UI Components (90 min)

Build in this order (each depends on previous):

### 3a. `Header.jsx` (10 min)
- Logo with 🗳️ icon
- Language switcher buttons: EN | हि | తె | த | বা
- Gradient background using India colors (orange to green subtle)
- Fixed/sticky at top

### 3b. `HeroSection.jsx` (10 min)
- Large heading: "Your AI Guide to Indian Elections"
- Subtitle: "Ask anything about voting, registration, EVMs, and your rights"
- 3 stat badges: "900M+ Voters" | "543 Constituencies" | "AI-Powered"
- Scroll-to-chat CTA button

### 3c. `ElectionTimeline.jsx` + `TimelineStep.jsx` (25 min)
- Map over `electionSteps` data
- Horizontal scrollable on desktop, vertical on mobile
- Each step: circle with number + icon, title, short description
- Active/expanded step shows full `details` + official link + "Ask Assistant" button
- Connecting line between steps (CSS border-bottom/right trick)
- Animate expand with CSS transition

### 3d. `ChatMessage.jsx` (5 min)
- User message: right-aligned, green bubble
- Assistant message: left-aligned, light blue bubble with 🗳️ avatar
- Timestamp shown on hover
- Loading state: animated dots (3 bouncing dots)

### 3e. `SuggestedPrompts.jsx` (5 min)
- Horizontal scrollable row of pill buttons
- Show only when conversation is empty or after assistant responds
- Prompts: "How do I register to vote?", "What is an EVM?", "What is NOTA?", "How to find my polling booth?", "What is Model Code of Conduct?"
- On click → send as user message

### 3f. `ChatInterface.jsx` (20 min)
- Sticky right panel (desktop) / full-width card (mobile)
- Messages container with overflow-y-auto + auto-scroll to bottom
- `useRef` for scroll anchor
- `useEffect` for auto-scroll on new messages
- Gemini API integration:
  - Maintain chat history array for multi-turn conversation
  - Use `model.startChat()` for history-aware responses
  - Handle loading state, error state
- Input: textarea (auto-resize) + Send button
- Enter key sends (Shift+Enter = new line)

### 3g. `BoothFinder.jsx` (15 min)
- Section title "Find Your Polling Booth 🗺️"
- Text input for area/pincode
- "Search on Maps" button → opens Google Maps in new tab
- "Official ECI Booth Lookup" link → voters.eci.gov.in
- Google Maps embed iframe (static India view as default)
- Note: "For official booth details, use the ECI Voter Portal"

### 3h. `QuickInfoCards.jsx` (10 min)
- 3 cards side by side (wrap on mobile):
  1. 📞 Voter Helpline: 1950 (toll-free)
  2. ⚖️ Your Voting Rights (right to secret ballot, right to NOTA, etc.)
  3. 💡 Did You Know? (rotating facts about Indian elections)

### 3i. `Footer.jsx` (5 min)
- "Made with ❤️ for Indian Democracy"
- "Powered by Google Gemini | Hosted on Firebase"
- Links: ECI | NVSP | Voter Helpline

---

## Phase 4 — Layout & Polish (30 min)

### 4a. `App.jsx` — Main Layout
```jsx
<LanguageProvider>
  <div className="min-h-screen bg-slate-50">
    <Header />
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - 60% */}
        <div className="flex-1 space-y-6">
          <HeroSection />
          <ElectionTimeline />
          <BoothFinder />
        </div>
        {/* Right Panel - 40% */}
        <div className="lg:w-96 xl:w-[420px] space-y-4">
          <ChatInterface />
          <QuickInfoCards />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</LanguageProvider>
```

### 4b. Responsive fixes
- Mobile: stack panels vertically, chat comes first
- Tablet: single column with wider cards

### 4c. Visual polish
- Add subtle gradient to header (saffron → white → green direction)
- Add Ashoka Chakra SVG watermark (low opacity) in hero
- Smooth scroll behavior
- Hover states on all interactive elements
- Focus rings for accessibility

---

## Phase 5 — Firebase Deployment (15 min)

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Build the project
npm run build

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init hosting
# → Select "Use an existing project" or create new
# → Public directory: dist
# → Single-page app: Yes
# → Overwrite index.html: No

# Deploy
firebase deploy

# Your live URL will be:
# https://voterpath-xxxxx.web.app
```

---

## Phase 6 — Final Checks (15 min)

- [ ] Chatbot answers "How do I register to vote?" correctly
- [ ] Chatbot answers "What is EVM?" correctly  
- [ ] Chatbot answers "What is NOTA?" correctly
- [ ] Language switch works (at minimum EN + Hindi)
- [ ] Timeline steps expand correctly
- [ ] Booth finder opens Google Maps
- [ ] Site loads on mobile without breaking
- [ ] Firebase live URL works
- [ ] No console errors
- [ ] API key is NOT in git (check .gitignore)

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Gemini API 429 error | Wait 1 min (free tier limit), reduce `maxOutputTokens` |
| CORS error | You won't get one — Gemini SDK handles it |
| Build fails | Check all imports, no missing files |
| Firebase deploy fails | Run `firebase login --reauth` |
| Maps embed blocked | Use direct Google Maps URL redirect instead |
| Fonts not loading | Add Noto Sans link in `index.html` `<head>` |
