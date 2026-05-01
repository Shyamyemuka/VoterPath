# VoterPath — Claude Code Project Context

## What This Project Is
VoterPath is a React + Vite web app submitted to the Hack2Skill PromptWars × Google Hackathon for the "Election Process Education" challenge.

## Primary Goal
Ship a working, deployed, visually impressive app TODAY. Speed and quality both matter.

## The Most Important Thing
The **Gemini system prompt** in `src/lib/gemini.js` is the core of this hackathon — the judges are evaluating prompt engineering quality. Make it detailed, thoughtful, and effective.

## Key Decisions Already Made
- **No backend** — fully client-side, Gemini API key in Vite env vars
- **No auth** — open access, no login
- **No routing** — single page app
- **Tailwind only** — no other CSS frameworks
- **India color theme** — saffron (#FF9933) + green (#138808) + navy (#000080)
- **Noto Sans font** — needed for Telugu, Hindi, Tamil script rendering
- **Firebase free tier** — Spark plan, no billing required

## Files You Should Read First
1. `CLAUDE.md` — primary build instructions
2. `TECH_STACK.md` — exact packages and versions
3. `APP_FLOW.md` — component tree and user flows

## Google Products Being Used (Judging Criteria)
1. Google Gemini 1.5 Flash (AI engine)
2. Firebase Hosting (deployment)
3. Google Maps (booth finder)
4. Google Fonts — Noto Sans (multilingual typography)

## Do Not
- Add a backend/API server
- Use any paid APIs
- Add authentication
- Use React Router (single page, no routes needed)
- Use any CSS framework other than Tailwind
- Hardcode API keys in source files

## Definition of Done
App is done when `firebase deploy` produces a live URL and the chatbot correctly answers election process questions.
