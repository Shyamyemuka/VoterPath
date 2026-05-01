# VoterPath — Product Requirements Document

## 1. Overview

**Product Name:** VoterPath  
**Tagline:** Your AI-powered guide to the Indian election process  
**Event:** Hack2Skill PromptWars Virtual Hackathon (Google Collaboration)  
**Challenge:** Election Process Education  
**Developer:** Solo Hackathon Submission  
**Target Completion:** Single day (few hours)

---

## 2. Problem Statement

India has ~970 million registered voters, with hundreds of millions being first-time or infrequent voters. The Election Commission of India (ECI) process — from voter registration to understanding EVMs to reading results — is deeply complex, jargon-heavy, and inaccessible in regional languages. No polished, conversational AI tool exists to guide ordinary citizens through this process.

**Key pain points:**
- First-time voters don't know how to register (Form 6, NVSP portal, Voter Helpline App)
- Booth location and EVM usage are confusing for rural/semi-urban voters
- Information exists on ECI website but is dense and non-conversational
- Language barrier: most voters are more comfortable in Telugu, Hindi, Tamil, etc.

---

## 3. Solution

VoterPath is a single-page web application that combines:
1. **An AI chatbot powered by Google Gemini 1.5 Flash** with a carefully engineered system prompt acting as a friendly, patient election guide ("Saarthi")
2. **An interactive visual timeline** of the complete Indian election process
3. **Multilingual support** (English, Hindi, Telugu, Tamil, Bengali) via UI language switching
4. **Google Maps Embed** for polling booth discovery
5. **Firebase Hosting** for instant live deployment

---

## 4. Target Users

- First-time voters (18–25 age group)
- Rural/semi-urban voters unfamiliar with digital processes
- Students and educators needing election process clarity
- NRIs wanting to understand Indian elections

---

## 5. Core Features

### F1 — Gemini AI Chatbot (PRIMARY)
- Persistent chat interface on right panel
- System-prompted as "VoterPath Assistant" — patient, jargon-free, step-by-step
- Understands questions in English and Hindi (Gemini native)
- Proactively guides users with follow-up questions
- Covers: voter registration, EPIC card, EVM usage, NOTA, booth finding, election schedule, candidate information process, results understanding
- Handles off-topic gracefully by redirecting to election topics

### F2 — Interactive Election Timeline
- Visual horizontal/vertical stepper showing the full election cycle:
  1. Announcement & Model Code of Conduct
  2. Voter Registration (Form 6 / NVSP)
  3. Nomination of Candidates
  4. Campaign Period
  5. Voter ID / EPIC Card Collection
  6. Voting Day (EVM usage, VVPAT)
  7. Counting & Results
- Each step is clickable → expands with detail + sends context to chatbot

### F3 — Language Switcher
- Header toggle: English | हिंदी | తెలుగు | தமிழ் | বাংলা
- UI labels, timeline content, and placeholder text switch language
- Chatbot system prompt is updated with the selected language instruction

### F4 — Polling Booth Finder
- Simple section with Google Maps Embed
- Text input for pincode/area → opens Google Maps search for "polling booth near [location]"
- Static embed showing ECI voter portal link for official booth lookup

### F5 — Quick Info Cards
- "Did You Know?" cards covering election facts
- Voter rights card
- Important helpline numbers (1950 — Voter Helpline)
- Links to official ECI resources

---

## 6. Non-Features (Out of Scope)
- Real-time election results scraping
- Actual candidate database
- User authentication / accounts
- Backend server (fully client-side)
- Mobile app

---

## 7. Success Metrics (Hackathon)
- Live deployed URL on Firebase Hosting
- Chatbot answers at least 20 common voter questions correctly
- Multilingual UI working for minimum 3 languages
- Page loads in < 3 seconds
- Visually impressive for demo/judging

---

## 8. Google Products Used
| Product | Usage |
|---------|-------|
| Google Gemini 1.5 Flash | Core AI chatbot engine |
| Firebase Hosting | Live deployment |
| Google Maps Embed API | Polling booth finder |
| Google Fonts | Typography (Noto Sans for multilingual) |
| Google Translate API (optional) | Dynamic translation fallback |

---

## 9. Constraints
- Must be completable in ~4 hours
- No paid API usage beyond free tiers
- Gemini API key via environment variable (`.env`)
- Firebase free Spark plan
- No backend/server required
