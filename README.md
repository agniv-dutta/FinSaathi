# FinSaathi: AI Claims Assistant

Claims done right. Upload your policy, ask anything, get instant answers. Built for the Paytm Build for India Hackathon.

## Features
- Parse insurance PDFs instantly
- AI-powered claim eligibility checks
- Sub-2-minute response times
- Automatic escalation for complex cases
- Built for India's 50M+ policyholders

## Quick Start

```bash
git clone https://github.com/yourusername/finsaathi
cd finsaathi
npm install
echo "REACT_APP_GROQ_API_KEY=your_key_here" > .env.local
npm start
```

Visit `http://localhost:3000`, click **"Try Demo Policy"**, and ask a claim question.

Get a free Groq API key at https://console.groq.com/keys

## Tech Stack
- React + Tailwind CSS (frontend)
- Groq API (LLM backbone - `mixtral-8x7b-32768`)
- Zero backend dependencies

## Demo
1. Click "Try Demo Policy"
2. Ask "I had knee surgery. What's my coverage?"
3. Get instant eligibility + next steps

## Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── components/
│   │   └── ClaimBot.jsx
│   ├── lib/
│   │   └── groqClient.js      # Groq API integration
│   └── data/
│       └── samplePolicies.js  # Mock policy data
├── .env.local                 # REACT_APP_GROQ_API_KEY
├── tailwind.config.js
└── package.json
```

Built for Paytm Build for India Hackathon 2024.