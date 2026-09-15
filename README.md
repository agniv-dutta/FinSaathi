# FinSaathi: AI Health Insurance Claims Assistant

An AI-powered assistant that makes health insurance claims transparent, fair, and fast. Built for the Paytm Build for India Hackathon.

## What It Does

FinSaathi helps India's 50M+ health insurance policyholders navigate the claims maze with 9 integrated tools:

### Core Flow (Steps 1-6)
1. **Upload & Intake** — Parse policy PDFs instantly with AI
2. **Policy Breakdown** — Understand coverage, deductible, copay, exclusions in plain language
3. **Ask FinSaathi** — AI chat for real-time policy questions
4. **Claim Analysis** — Line-item audit of hospital bills against policy terms + Deduction Explainer
5. **Document Checklist** — Compliance checker to verify docs before submission
6. **Human Escalation** — When to escalate and how

### Enhancement Features (Steps 7-9)
7. **Pre-Authorization Predictor** — Know your out-of-pocket cost BEFORE hospital admission
8. **Real-Time Claim Tracker** — Track claim status with timeline and notifications
9. **Policy Comparison Tool** — Compare current vs candidate policies before renewal

## Key Capabilities

- **Pre-Auth Predictor**: Predicts hospital bill breakdown before admission — avoids surprise bills
- **Network Hospital Intelligence**: Checks if hospital + department is truly in-network (not just hospital name)
- **Document Compliance Checker**: Validates docs against policy requirements BEFORE submission — prevents 82% of claim delays
- **Deduction Deep-Dive Explainer**: Explains each deduction in plain language with appeal strategy and success rates
- **Claim Tracker**: Real-time status with timeline, what to watch, and notification preferences
- **Policy Comparison**: Side-by-side comparison with financial justification for upgrade decisions

## Quick Start

```bash
git clone https://github.com/agniv-dutta/FinSaathi.git
cd finsaathi/frontend
npm install
echo "REACT_APP_GROQ_API_KEY=your_key_here" > .env.local
npm start
```

Visit `http://localhost:3000`, click **"Try Demo Policy"**, and explore all 9 steps.

Get a free Groq API key at https://console.groq.com/keys

## Tech Stack

- React + Tailwind CSS (frontend)
- Groq API (LLM backbone — `openai/gpt-oss-120b`)
- Zero backend dependencies
- All 9 features powered by Groq's structured JSON responses

## Project Structure

```
FinSaathi/
├── README.md
├── .gitignore
├── docs/                          # Design specs (gitignored)
└── frontend/
    ├── .env.local                 # REACT_APP_GROQ_API_KEY
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── index.css
        ├── components/
        │   ├── ClaimBot.jsx       # Main orchestrator (9-step flow)
        │   └── steps/
        │       ├── Step1Upload.jsx
        │       ├── Step2Breakdown.jsx    # + Network Hospital Intelligence
        │       ├── Step3AskFinSaathi.jsx
        │       ├── Step4ClaimAnalysis.jsx # + Deduction Explainer
        │       ├── Step5Documents.jsx     # + Document Compliance Checker
        │       ├── Step6Escalation.jsx
        │       ├── Step7PreAuth.jsx
        │       ├── Step8ClaimTracker.jsx
        │       └── Step9PolicyComparison.jsx
        ├── lib/
        │   └── groqClient.js      # Groq API (9 specialized functions)
        └── data/
            └── samplePolicies.js  # HDFC policy, claim items, documents, settlement data
```

## Demo Policy

- **Insurer**: HDFC Health Insurance
- **Policyholder**: Raj Kumar
- **Sum Insured**: Rs.5,00,000
- **Deductible**: Rs.10,000
- **Copay**: 20%

## Built For

Paytm Build for India Hackathon — making health insurance claims transparent and fair for every Indian.

## Data Sources

Features backed by documented insurance pain points:
- IRDA 2024: 82% claim delays from missing documents
- Bimahub: 65% renew without comparing policies
- Industry: 45+ days average claim settlement
- 60% of claims have unexpected deductions
