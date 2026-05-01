# 🚀 VoterPath Deployment Guide

## Quick Start - Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local file
cp .env.example .env.local

# 3. Add your Gemini API key to .env.local
# NEXT_PUBLIC_GEMINI_API_KEY=your_key_here

# 4. Start dev server
npm run dev

# Visit http://localhost:3000
```

---

## Production Deployment - Firebase Hosting

### Step 1: Get Your Gemini API Key

1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

### Step 2: Prepare Environment

```bash
# Update .env.local with your Gemini API key
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_key_here" >> .env.local
```

### Step 3: Build for Production

```bash
# Build the project (creates 'out' directory with static export)
npm run build

# Output will be in the 'out' directory, ready for Firebase
```

### Step 4: Deploy to Firebase

```bash
# Install Firebase CLI (one-time)
npm install -g firebase-tools

# Log in to Firebase
firebase login

# Deploy
firebase deploy

# Your app will be live! Example URL: https://voterpath-demo.firebaseapp.com
```

---

## Alternative: Deploy to Vercel

```bash
# 1. Push your code to GitHub
git push origin main

# 2. Go to vercel.com and connect your GitHub repo
# 3. Add environment variable: NEXT_PUBLIC_GEMINI_API_KEY
# 4. Vercel automatically deploys on push

# That's it! Your app is live.
```

---

## Alternative: Deploy to Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build the project
npm run build

# 3. Deploy
netlify deploy --prod --dir=out

# Follow the prompts and your app is live!
```

---

## Troubleshooting

### Issue: "API key not found" in production

**Solution:**

- Ensure `NEXT_PUBLIC_GEMINI_API_KEY` is added to Firebase environment variables
- In Firebase Console → Project Settings → Environment Variables
- Or add via `firebase env:set` command

### Issue: Chat not working after deployment

**Solution:**

- Verify API key is in the correct format
- Check Firebase deployment logs: `firebase functions:log`
- Ensure Gemini API quota is not exceeded (free tier: 15 RPM)

### Issue: Build fails with TypeScript errors

**Solution:**

```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

---

## Performance Optimization

The app is optimized for speed:

- ✅ Static site export (no server needed)
- ✅ Images from CDN (Framer)
- ✅ CSS minified (Tailwind)
- ✅ JavaScript optimized (Next.js)
- ✅ Typical First Load JS: ~88 KB

---

## Monitoring & Analytics

After deployment, monitor your app:

```bash
# View Firebase deployment logs
firebase functions:log

# Check project status
firebase projects:describe

# View hosting analytics
firebase hosting:channel:list
```

---

## Cost Estimation

**Monthly costs (estimates):**

| Service          | Free Tier                | Cost                       |
| ---------------- | ------------------------ | -------------------------- |
| Firebase Hosting | ✅ 1 GB/month            | $0                         |
| Gemini API       | ✅ 15 RPM, 1M tokens/day | $0 (then $0.075/1M tokens) |
| Bandwidth        | ✅ 1 GB                  | $0.15 per GB after         |

**Expected:** $0/month for small usage, ~$5-20/month for high usage

---

## Updating the App

```bash
# Make changes to code
git add .
git commit -m "Update feature"

# Build and deploy
npm run build
firebase deploy

# Changes are live in seconds!
```

---

## Rollback to Previous Version

```bash
# View deployment history
firebase hosting:channel:list

# Rollback to previous deployment
firebase hosting:rollback
```

---

## Custom Domain (Optional)

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the instructions to add your domain
4. Update DNS records as instructed

---

## Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Firebase Docs:** https://firebase.google.com/docs/hosting
- **Gemini API:** https://ai.google.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

**Your VoterPath app is now live! 🚀🇮🇳**
