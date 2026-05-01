# CLAUDE.md — VoterPath

> This file is the primary instruction set for Claude Code to build VoterPath.
> Read ALL sections before writing any code. Follow the order strictly.

---

## Project Identity

**Name:** VoterPath  
**What it is:** An AI-powered Indian election education web app  
**Challenge:** Hack2Skill PromptWars × Google — "Election Process Education"  
**Stack:** React + Vite + Tailwind + Gemini 1.5 Flash + Firebase Hosting  
**Goal:** Build a complete, deployed, visually polished web app today

---

## CRITICAL RULES

1. **Never ask for clarification** — make sensible decisions and build
2. **Never use placeholders** — write real, complete, working code every time
3. **Never leave TODOs in code** — implement everything fully
4. **Build mobile-responsive from the start** — use Tailwind responsive prefixes
5. **Use only the packages listed in TECH_STACK.md** — no additional libraries
6. **Keep `.env` variables** — never hardcode API keys in source
7. **Use India color theme** — saffron (#FF9933), green (#138808), navy (#000080)
8. **Google Noto Sans font** — required for multilingual script rendering

---

## Setup Commands

Run these in order:

```bash
npm create vite@latest voterpath -- --template react
cd voterpath
npm install @google/generative-ai lucide-react clsx
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then create `.env`:
```
VITE_GEMINI_API_KEY=<user will provide>
```

---

## File Build Order

Build files in exactly this sequence to avoid import errors:

1. `tailwind.config.js` — full config with India colors + Noto Sans
2. `src/index.css` — Tailwind directives + Google Fonts link
3. `index.html` — add Noto Sans Google Fonts `<link>` in `<head>`
4. `src/data/timeline.js` — election steps data (7 steps, complete content)
5. `src/lib/translations.js` — all UI strings in EN, HI, TE, TA, BN
6. `src/lib/gemini.js` — Gemini client + full system prompt
7. `src/contexts/LanguageContext.jsx` — language state provider
8. `src/components/Header.jsx`
9. `src/components/HeroSection.jsx`
10. `src/components/TimelineStep.jsx`
11. `src/components/ElectionTimeline.jsx`
12. `src/components/ChatMessage.jsx`
13. `src/components/SuggestedPrompts.jsx`
14. `src/components/ChatInterface.jsx` ← most complex, build carefully
15. `src/components/BoothFinder.jsx`
16. `src/components/QuickInfoCards.jsx`
17. `src/components/Footer.jsx`
18. `src/App.jsx` — main layout, wrap with LanguageProvider
19. `src/main.jsx` — standard Vite entry
20. `firebase.json` + `.firebaserc` — hosting config

---

## Key Implementation Details

### Gemini Chat (ChatInterface.jsx)

Use multi-turn chat with history:

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Start a chat session (call this when component mounts or language changes)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: SYSTEM_PROMPT(language),
});

const chat = model.startChat({
  history: [],
  generationConfig: { maxOutputTokens: 1024, temperature: 0.7 }
});

// Send message
const result = await chat.sendMessage(userMessage);
const responseText = result.response.text();
```

Maintain a `chatSession` ref with `useRef` so it persists across re-renders.  
Reset the chat session when language changes.

### System Prompt (in gemini.js)

The system prompt is the **heart of the hackathon submission** — make it excellent:

```javascript
export const SYSTEM_PROMPT = (language = 'en') => {
  const langNames = { en: 'English', hi: 'Hindi', te: 'Telugu', ta: 'Tamil', bn: 'Bengali' };
  const langName = langNames[language] || 'English';
  
  return `You are VoterPath Assistant — a warm, knowledgeable, and patient AI guide dedicated to helping Indian citizens understand the democratic process.

## YOUR MISSION
Make every Indian citizen feel confident and empowered about their right to vote. Simplify the complex ECI process into clear, actionable steps.

## PERSONALITY & TONE
- Warm and encouraging — celebrate users for wanting to learn about democracy
- Use simple, everyday language — imagine explaining to your neighbor
- Patient — never make users feel embarrassed for not knowing something  
- Occasionally use relevant emojis (🗳️ 🇮🇳 ✅ 📋) but don't overdo it
- End most responses with a helpful follow-up question or next step

## LANGUAGE
Respond exclusively in ${langName}. If the user writes in a different language than ${langName}, switch to their language for that response.

## YOUR KNOWLEDGE BASE

### Voter Registration
- Form 6: New voter registration at nvsp.in or Voter Helpline App
- Documents needed: Age proof (Aadhaar/birth certificate), address proof, passport photo
- Online: voters.eci.gov.in → Forms → Form 6
- Offline: Submit to BLO (Booth Level Officer) or ERO (Electoral Registration Officer)
- Deadline: Usually 30 days before election announcement

### EPIC Card (Voter ID)
- Electoral Photo Identity Card issued by ECI
- How to get: Register via Form 6, card delivered by post in 4-6 weeks
- Lost/damaged: Apply Form 002 at nvsp.in
- Corrections: Form 8 for name/address corrections
- e-EPIC: Download digital voter ID from voters.eci.gov.in

### Voting Day
- Bring EPIC card or any of 12 alternative documents (Aadhaar, passport, ration card, etc.)
- Polling hours: Usually 7 AM to 6 PM (varies by constituency)
- EVM: Electronic Voting Machine — press the button next to your candidate
- VVPAT: Voter Verifiable Paper Audit Trail — paper slip shown for 7 seconds after voting
- NOTA: None of the Above — last option on EVM if you reject all candidates
- Voting is secret — no one can know who you voted for

### Election Process Timeline
1. ECI announces election dates → Model Code of Conduct (MCC) begins
2. Voter list published → last chance to register/correct
3. Candidate nominations filed (typically 14 days before voting)
4. Scrutiny & withdrawal of nominations
5. Campaign period (no campaigning 48 hours before voting — "silence period")
6. Voting Day
7. Counting Day (usually 1-2 weeks after voting)
8. Results declared → winner gets majority of votes

### Polling Booth
- Find official booth: voters.eci.gov.in → "Know Your Polling Station"
- Or call: 1950 (Voter Helpline — free, available in multiple languages)
- Or use: Voter Helpline App (available on Android and iOS)

### Your Rights
- Constitutional right to vote (Article 326)
- Right to secret ballot
- Right to NOTA
- Employees entitled to paid holiday on election day
- Cannot be denied right to vote due to caste, religion, gender, or language

### Important Links & Contacts
- ECI: eci.gov.in
- Voter registration/booth: voters.eci.gov.in
- Candidate info: affidavit.eci.gov.in
- Voter Helpline: 1950 (toll-free)
- cVIGIL App: Report MCC violations

## BOUNDARIES — STRICTLY FOLLOW
- NEVER express opinions on political parties, candidates, or policies
- NEVER recommend who to vote for
- If asked about specific politicians' records, politely redirect: "I focus on the voting process itself — for candidate information, please check affidavit.eci.gov.in"
- If asked completely off-topic questions, say: "I specialize in election guidance! I'd love to help you with voter registration, EVM usage, or finding your polling booth. What would you like to know?"

## RESPONSE FORMAT
- Use numbered lists for any process with more than 2 steps
- Bold key terms and portal names
- Keep responses under 200 words unless the topic genuinely requires more
- Always mention the official resource at the end of process-related answers`;
};
```

### Election Timeline Data (timeline.js)

Create 7 complete steps. Each step object:
```javascript
{
  id: 1,
  icon: '📢',
  color: 'orange',  // 'orange' | 'green' | 'blue' | 'purple' | 'red' | 'teal' | 'indigo'
  title: 'Election Announcement',
  shortDesc: 'ECI announces dates, Model Code of Conduct begins',
  details: `Full 3-4 sentence explanation of this stage including what happens, who is involved, and what citizens should do`,
  keyFacts: ['Fact 1', 'Fact 2', 'Fact 3'],
  officialLink: 'https://eci.gov.in',
  officialLinkText: 'Visit ECI Website',
  chatPrompt: 'Explain the election announcement phase and what Model Code of Conduct means for citizens'
}
```

### Translations (translations.js)

Minimum keys to translate for EN, HI, TE:
```javascript
{
  header: { title: 'VoterPath', tagline: 'Your AI Election Guide' },
  hero: {
    title: 'Your AI Guide to Indian Elections',
    subtitle: 'Ask anything about voter registration, EVMs, polling booths, and your democratic rights',
    cta: 'Start Asking Questions'
  },
  chat: {
    title: 'VoterPath Assistant',
    subtitle: 'Powered by Google Gemini',
    welcome: 'Namaste! 🙏 I\'m your VoterPath election guide. Are you a first-time voter or looking to understand the election process better? Ask me anything!',
    placeholder: 'Ask about voter registration, EVMs, polling booths...',
    send: 'Send',
    thinking: 'Thinking...'
  },
  timeline: { title: 'The Election Journey', subtitle: 'Step-by-step guide to how Indian elections work' },
  booth: {
    title: 'Find Your Polling Booth',
    subtitle: 'Search by area, pincode, or constituency',
    placeholder: 'Enter your area or pincode...',
    searchBtn: 'Find on Google Maps',
    officialBtn: 'Official ECI Booth Lookup'
  },
  cards: {
    helplineTitle: 'Voter Helpline',
    rightsTitle: 'Your Voting Rights',
    factsTitle: 'Did You Know?'
  }
}
```

For TA and BN, you can provide the same as EN if accurate translations are not available — but HI and TE should be proper translations.

---

## Design Guidelines

### Color Usage
- Header background: gradient from `#FF9933` (left 20%) through `#FFFFFF` (50%) to `#138808` (right 20%) — subtle, India flag inspired
- Primary buttons: `bg-[#138808] hover:bg-[#0f6b06] text-white`
- Accent/highlight: `text-[#FF9933]` or `bg-orange-50 border-orange-200`
- Timeline step circles: alternating between orange and green
- Chat bubbles: user = green, assistant = slate-100

### Spacing & Layout
- Page max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section gaps: `space-y-8` on left panel
- Card padding: `p-6`
- Border radius: `rounded-2xl` for cards, `rounded-full` for buttons/chips

### Shadows
- Cards: `shadow-sm hover:shadow-md transition-shadow`
- Chat panel: `shadow-lg` (more prominent as it's the main feature)

---

## Firebase Config Files

### firebase.json
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

### .firebaserc
```json
{
  "projects": {
    "default": "voterpath-app"
  }
}
```

---

## Error Handling

In ChatInterface.jsx, always wrap Gemini calls in try/catch:
```javascript
try {
  setIsLoading(true);
  const result = await chatSession.current.sendMessage(message);
  const text = result.response.text();
  setMessages(prev => [...prev, { role: 'assistant', content: text }]);
} catch (error) {
  console.error('Gemini error:', error);
  setMessages(prev => [...prev, { 
    role: 'assistant', 
    content: 'I apologize, I encountered an error. Please try again or call the Voter Helpline at 1950 for immediate assistance.' 
  }]);
} finally {
  setIsLoading(false);
}
```

---

## Definition of Done

The project is complete when:
- [ ] `npm run dev` shows the full app with no console errors
- [ ] Chatbot responds to "How do I register to vote?" with a helpful answer
- [ ] Language switcher changes UI text
- [ ] Timeline steps expand on click
- [ ] "Ask Assistant" on timeline sends message to chat
- [ ] Booth finder opens Google Maps in new tab
- [ ] `npm run build` succeeds without errors
- [ ] Firebase deploy command produces a live URL
