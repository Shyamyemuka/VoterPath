# Skill: Gemini API Integration for VoterPath

## Purpose
How to correctly initialize, configure, and use the Google Gemini 1.5 Flash API with multi-turn conversation history in a React/Vite app.

---

## Installation
```bash
npm install @google/generative-ai
```

## Environment Setup
```env
# .env
VITE_GEMINI_API_KEY=your_api_key_here
```

## Basic Client Setup (src/lib/gemini.js)

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const createElectionChat = (language = 'en') => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT(language),
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 1024,
    },
  });

  return model.startChat({ history: [] });
};
```

## Multi-Turn Chat in React Component

```javascript
import { useRef, useEffect } from 'react';
import { createElectionChat } from '../lib/gemini';

// In component:
const chatSession = useRef(null);

// Initialize on mount and language change
useEffect(() => {
  chatSession.current = createElectionChat(language);
}, [language]);

// Send message
const sendMessage = async (userText) => {
  try {
    setIsLoading(true);
    const result = await chatSession.current.sendMessage(userText);
    const responseText = result.response.text();
    // append to messages
  } catch (err) {
    // handle error
  } finally {
    setIsLoading(false);
  }
};
```

## Rate Limits (Free Tier)
- 15 requests per minute (RPM)
- 1 million tokens per day
- Sufficient for hackathon demo

## Error Codes
| Code | Meaning | Fix |
|------|---------|-----|
| 429 | Rate limit hit | Wait 60s, reduce maxOutputTokens |
| 400 | Bad request | Check systemInstruction format |
| 403 | Invalid API key | Verify VITE_GEMINI_API_KEY |
