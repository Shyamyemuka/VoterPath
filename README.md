# 🗳️ VoterPath — Your AI Guide to Indian Elections

> An AI-powered web application that helps Indian citizens understand the election process, register to vote, and exercise their democratic rights — in their own language.

**Built for:** Hack2Skill PromptWars × Google Hackathon  
**Challenge:** Election Process Education  
**Live Demo:** [Firebase Hosting URL]

---

## ✨ Features

### 🤖 AI Election Assistant (Powered by Google Gemini)

Ask anything about the Indian election process in plain language. The VoterPath Assistant is carefully prompt-engineered to:

- Guide first-time voters through registration step-by-step
- Explain EVMs, VVPAT, and NOTA in simple terms
- Answer questions about voter rights and the Model Code of Conduct
- Respond in your preferred language

### 📅 Interactive Election Timeline

A visual, step-by-step walkthrough of the complete Indian election cycle — from announcement to results. Click any step to expand detailed information and dive deeper with the AI assistant.

### 🌐 Multilingual Support

The app and AI assistant support 5 Indian languages:

- English
- हिंदी (Hindi)
- తెలుగు (Telugu)
- தமிழ் (Tamil)
- বাংলা (Bengali)

### 🗺️ Polling Booth Finder

Find your nearest polling booth using Google Maps integration, or access the official ECI portal for authoritative booth information.

### 📋 Quick Info Cards

- Voter Helpline: **1950** (toll-free)
- Know your voting rights
- Indian election facts

---

## 🛠️ Tech Stack

| Technology               | Purpose                 |
| ------------------------ | ----------------------- |
| React 18 + Next 18       | Frontend framework      |
| React                    | Frontend framework      |
| Tailwind CSS             | Styling                 |
| Google Gemini 1.5 Flash  | AI chatbot engine       |
| Firebase Hosting         | Deployment              |
| Google Maps              | Booth finder            |
| Google Fonts (Noto Sans) | Multilingual typography |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))
- Firebase CLI (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/Shyamyemuka/voterpath.git
cd voterpath

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your VITE_GEMINI_API_KEY

# Start development server
npm run dev
```

### Deployment

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase login
firebase init hosting  # select dist as public dir, SPA: yes
firebase deploy
```

---

## 📁 Project Structure

```
voterpath/
├── src/
│   ├── components/        # UI components
│   ├── contexts/          # React contexts (Language)
│   ├── lib/               # Gemini client, translations
│   ├── data/              # Election timeline data
│   └── App.jsx            # Main layout
├── firebase.json          # Firebase hosting config
└── .env.example           # Environment variable template
```

---

## 🎯 The Real-World Problem

India has ~970 million registered voters, yet a significant portion — especially first-time voters and those in rural areas — struggle with basic questions:

- _"How do I register to vote?"_
- _"Where is my polling booth?"_
- _"How does an EVM work?"_
- _"What is NOTA?"_

The ECI website has this information, but it's dense, non-conversational, and effectively inaccessible to users who aren't comfortable reading government prose. VoterPath bridges this gap with a conversational, multilingual AI interface that meets voters where they are.

---

## 🗺️ Official Resources

- **Election Commission of India:** [eci.gov.in](https://eci.gov.in)
- **Voter Registration / NVSP:** [voters.eci.gov.in](https://voters.eci.gov.in)
- **Candidate Affidavits:** [affidavit.eci.gov.in](https://affidavit.eci.gov.in)
- **Voter Helpline:** 1950 (toll-free, multilingual)

---

## ⚖️ Disclaimer

VoterPath is an educational tool. It is non-partisan and does not promote any political party or candidate. All election process information is based on official ECI guidelines. For authoritative information, always refer to [eci.gov.in](https://eci.gov.in).

---

_Made by Shyam for Indian Democracy | Powered by Google Gemini | Hosted on Firebase_
