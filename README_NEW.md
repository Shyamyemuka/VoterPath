# 🗳️ VoterPath — Your AI Guide to Indian Elections

> An AI-powered web application that helps Indian citizens understand the election process, register to vote, and exercise their democratic rights — in their own language.

**Built for:** Hack2Skill PromptWars × Google Hackathon  
**Challenge:** Election Process Education  
**Stack:** Next.js 14 + React 18 + Tailwind CSS + Google Gemini 1.5 Flash + Firebase Hosting  
**Status:** ✅ Complete & Ready to Deploy

---

## ✨ Features

### 🤖 AI Election Assistant (Powered by Google Gemini)

Ask anything about the Indian election process in plain language. The VoterPath Assistant is carefully prompt-engineered to:

- Guide first-time voters through registration step-by-step
- Explain EVMs, VVPAT, and NOTA in simple terms
- Answer questions about voter rights and the Model Code of Conduct
- Respond in your preferred language (EN, HI, TE, TA, BN)

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

| Technology              | Purpose            |
| ----------------------- | ------------------ |
| Next.js 14              | Frontend framework |
| React 18                | UI library         |
| Tailwind CSS 3          | Styling            |
| Google Gemini 1.5 Flash | AI chatbot engine  |
| Firebase Hosting        | Deployment         |
| TypeScript              | Type safety        |
| Google Fonts (Inter)    | Typography         |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))
- Firebase CLI (optional, for deployment)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd voterpath

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your NEXT_PUBLIC_GEMINI_API_KEY
```

### Development

```bash
# Start development server (opens on http://localhost:3000)
npm run dev
```

### Production Build

```bash
# Build the project for production
npm run build

# Output files will be in the 'out' directory
```

---

## 🔧 Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

**To get your Gemini API Key:**

1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy and paste into `.env.local`

---

## 🚢 Deployment to Firebase

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Log in to Firebase
firebase login

# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy

# Your app will be live! 🎉
```

---

## 📁 Project Structure

```
voterpath/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ElectionTimeline.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── BoothFinder.tsx
│   │   ├── QuickInfoCards.tsx
│   │   └── Footer.tsx
│   ├── contexts/
│   │   └── LanguageContext.tsx
│   ├── lib/
│   │   ├── gemini.ts
│   │   └── translations.ts
│   └── data/
│       └── timeline.ts
├── package.json
├── next.config.js
├── tailwind.config.ts
├── firebase.json
└── .env.local
```

---

## 🎨 Design

- **Dark Theme:** Premium, modern design (#050505 background)
- **India Colors:** Saffron (#FF9933), Green (#138808), White
- **Responsive:** Mobile-first, fully responsive design
- **Animations:** Smooth scroll reveals, floating elements, smooth transitions

---

## 📞 Support

For issues or questions, please check:

1. The `.env.local` file is properly configured
2. Your Gemini API key is valid and has quota
3. Node.js version is 18+

---

**Built by Shyam for Indian Democracy** 🇮🇳
