# VoterPath — App Flow Document

## Page Structure (Single Page Application)

```
┌─────────────────────────────────────────────────────────────────┐
│                          HEADER                                  │
│  🗳️ VoterPath    [EN] [हि] [తె] [த] [বা]      India Flag Accent │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐  ┌──────────────────────────────┐
│                              │  │                              │
│    LEFT PANEL (60%)          │  │   RIGHT PANEL (40%)          │
│                              │  │                              │
│  ┌────────────────────────┐  │  │  ┌────────────────────────┐  │
│  │   HERO SECTION         │  │  │  │   GEMINI CHATBOT       │  │
│  │  "Your Election Guide" │  │  │  │                        │  │
│  │  Subtitle + CTA        │  │  │  │  [Chat messages area]  │  │
│  └────────────────────────┘  │  │  │                        │  │
│                              │  │  │  Welcome message       │  │
│  ┌────────────────────────┐  │  │  │  + suggested prompts   │  │
│  │   ELECTION TIMELINE    │  │  │  │                        │  │
│  │   (Interactive Steps)  │  │  │  │  ─────────────────     │  │
│  │                        │  │  │  │  [Input] [Send]        │  │
│  │  Step 1 → Step 2 → ... │  │  │  └────────────────────────┘  │
│  │  (click to expand)     │  │  │                              │
│  └────────────────────────┘  │  │  ┌────────────────────────┐  │
│                              │  │  │  QUICK INFO CARDS      │  │
│  ┌────────────────────────┐  │  │  │  • Voter Helpline 1950 │  │
│  │  POLLING BOOTH FINDER  │  │  │  │  • Your Rights         │  │
│  │  [Maps Embed]          │  │  │  │  • Did You Know?       │  │
│  │  [Search input]        │  │  │  └────────────────────────┘  │
│  └────────────────────────┘  │  │                              │
│                              │  │                              │
└──────────────────────────────┘  └──────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          FOOTER                                  │
│         Made with ❤️ for Indian Democracy | Powered by Gemini   │
└─────────────────────────────────────────────────────────────────┘
```

---

## User Flows

### Flow 1: New User — Chatbot Interaction
```
User lands on page
    → Sees hero section + chatbot panel
    → Chatbot shows welcome message:
       "Namaste! I'm your VoterPath assistant. Are you a first-time voter?
        Ask me anything about the Indian election process!"
    → Sees 3 suggested starter prompts (chips):
       [How do I register to vote?] [What is an EVM?] [Find my polling booth]
    → User clicks chip OR types question
    → Gemini processes with election-context system prompt
    → Response appears with step-by-step formatting
    → Follow-up suggestions appear below response
    → Conversation continues
```

### Flow 2: Timeline Exploration
```
User scrolls to Election Timeline section
    → Sees 7 steps displayed horizontally (desktop) / vertically (mobile)
    → Each step shows: icon + title + short description
    → User clicks Step 2 "Voter Registration"
    → Step expands with:
       - Detailed explanation
       - Required documents
       - Official links (NVSP portal)
       - "Ask Assistant about this" button
    → Clicking button sends pre-filled message to chatbot:
       "Tell me more about voter registration (Form 6 / NVSP)"
    → Chat panel scrolls into focus
```

### Flow 3: Language Switch
```
User clicks [हि] (Hindi) in header
    → UI language switches: all labels, timeline content, placeholders → Hindi
    → Chatbot system prompt updated: "Respond in Hindi language"
    → New messages from Gemini come in Hindi
    → Previous messages remain as-is
    → Language preference stored in localStorage
```

### Flow 4: Polling Booth Finder
```
User scrolls to "Find Your Polling Booth" section
    → Sees Google Maps embed (default: India center)
    → Input field: "Enter your area or pincode"
    → User types: "Rajampet, Andhra Pradesh"
    → Button click → opens Google Maps in new tab:
       maps.google.com/search?q=polling+booth+Rajampet+Andhra+Pradesh
    → Also shows ECI official link:
       voters.eci.gov.in for official booth lookup
```

---

## Component Tree

```
App
├── Header
│   ├── Logo
│   └── LanguageSwitcher
├── MainLayout (flex row)
│   ├── LeftPanel
│   │   ├── HeroSection
│   │   ├── ElectionTimeline
│   │   │   └── TimelineStep (×7, expandable)
│   │   └── BoothFinder
│   │       ├── MapsEmbed
│   │       └── SearchInput
│   └── RightPanel
│       ├── ChatInterface
│       │   ├── MessageList
│       │   │   └── ChatMessage (user/assistant)
│       │   ├── SuggestedPrompts
│       │   └── ChatInput
│       └── QuickInfoCards
├── Footer
└── contexts/
    ├── LanguageContext (selected language, translations)
    └── ChatContext (messages, loading state)
```

---

## State Management

```javascript
// Language Context
{
  language: 'en' | 'hi' | 'te' | 'ta' | 'bn',
  t: (key) => string  // translation function
}

// Chat State (local component state)
{
  messages: [
    { role: 'user' | 'assistant', content: string, timestamp: Date }
  ],
  isLoading: boolean,
  error: string | null
}

// Timeline State (local)
{
  expandedStep: number | null
}
```

---

## Gemini API Call Flow

```
User sends message
    → Append to messages array
    → Set isLoading = true
    → Build API payload:
       {
         model: "gemini-1.5-flash",
         systemInstruction: SYSTEM_PROMPT (with language injected),
         contents: [...conversationHistory],
         generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
       }
    → POST to Gemini API
    → Stream or await response
    → Append assistant message to messages
    → Set isLoading = false
    → Scroll chat to bottom
```

---

## Responsive Behavior

- **Desktop (>768px):** Side-by-side layout (60/40 split)
- **Mobile (<768px):** Single column; Timeline → Chatbot → Booth Finder stacked
- **Chat panel:** Fixed height with internal scroll on desktop; full-width card on mobile
