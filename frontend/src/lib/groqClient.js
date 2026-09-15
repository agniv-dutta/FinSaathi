import Groq from 'groq-sdk';

const client = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function parsePolicyPDF(pdfText) {
  const message = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a health insurance policy parser. Extract key information from this policy text and return JSON.

Policy text:
${pdfText}

Return ONLY valid JSON (no markdown, no explanation):
{
  "policyNumber": "string",
  "holderName": "string",
  "coverageType": "string",
  "coverageAmount": "number (in rupees)",
  "deductible": "number",
  "copay": "number",
  "coveredConditions": ["string"],
  "excludedConditions": ["string"],
  "claimProcess": "string (brief steps)",
  "documentsRequired": ["string"],
  "maxClaimPerYear": "number",
  "validity": "string (e.g., Jan 2024 - Dec 2024)"
}`,
      },
    ],
  });

  try {
    return JSON.parse(message.choices[0].message.content);
  } catch {
    return null;
  }
}

export async function processClaimQuery(policyData, userQuery) {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;
  console.log('Groq API key loaded:', apiKey ? `${apiKey.slice(0, 8)}...` : 'MISSING');

  const message = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `You are FinSaathi, a friendly and professional AI health insurance claim advisor. Answer the user's query based on the policy details provided.

Formatting rules - STRICT:
- Do NOT use any markdown formatting. No asterisks, no bold, no headers, no bullet symbols.
- Use plain text only with clear section labels.
- Format numbered lists as simple "1. text" lines.
- Keep the tone conversational but professional, like a helpful customer support agent.
- Break responses into short paragraphs for readability.

Policy:
${JSON.stringify(policyData, null, 2)}

User query: "${userQuery}"

Respond with these sections in plain text:
1. Eligibility - Is the claim eligible? (yes/no/maybe) and why.
2. Coverage - What's covered and any limits.
3. Documents Needed - List required documents, one per line.
4. Next Steps - What the user should do now.`,
      },
    ],
  });

  return message.choices[0].message.content;
}

export async function escalationReason(policyData, userQuery) {
  const message = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 256,
    messages: [
      {
        role: 'user',
        content: `Given this policy and user query, determine if human escalation is needed. Return JSON only.

Policy coverage: ${policyData.coverageType}
User query: "${userQuery}"

Return:
{
  "escalate": boolean,
  "reason": "string (if true)"
}`,
      },
    ],
  });

  try {
    return JSON.parse(message.choices[0].message.content);
  } catch {
    return { escalate: false };
  }
}

export async function analyzePreAuth(policy, hospital, procedure, roomCategory) {
  const message = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a health insurance pre-authorization calculator. Given the policy details, hospital name, planned procedure, and room category, calculate the estimated bill breakdown BEFORE admission. Return ONLY valid JSON.

Policy:
${JSON.stringify(policy, null, 2)}

Hospital: ${hospital}
Procedure: ${procedure}
Room Category: ${roomCategory}

Return:
{
  "preAuthWindow": "string (e.g. 48-72 hours)",
  "estimatedCoverage": {
    "surgeryFeesCovered": number,
    "roomRentCap": number,
    "deductibleApplied": number,
    "copayPercentage": number,
    "totalEstimatedApproval": number
  },
  "patientLiability": {
    "estimatedOutOfPocket": number,
    "certaintyLevel": "string (e.g. 85%)"
  },
  "preAuthChecklist": ["string"],
  "negotiationTips": ["string"],
  "escalationPath": {
    "needHumanReview": boolean,
    "if_needed": "string"
  }
}`,
      },
    ],
  });

  try {
    return JSON.parse(message.choices[0].message.content);
  } catch {
    return null;
  }
}

export async function checkClaimStatus(claimRef) {
  const message = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `You are a claim status analyzer. Given a claim reference, return a human-friendly status update. Return ONLY valid JSON.

Claim Reference: ${claimRef}

Return:
{
  "status": "submitted|under_review|query_raised|approved|rejected",
  "statusUpdate": "string (human friendly)",
  "progress": number (0-100),
  "nextStep": "string",
  "expectedTimeline": "string",
  "whatToWatch": ["string"],
  "escalationNeeded": boolean
}`,
      },
    ],
  });

  try {
    return JSON.parse(message.choices[0].message.content);
  } catch {
    return null;
  }
}

export async function validateDocuments(documents, policy, treatmentType) {
  const message = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a health insurance document validator. Given the policy, treatment type, and documents already uploaded, return a compliance report. Return ONLY valid JSON.

Policy:
${JSON.stringify(policy, null, 2)}

Treatment Type: ${treatmentType}
Documents Uploaded: ${JSON.stringify(documents)}

Return:
{
  "documentChecklist": [
    {
      "document": "string",
      "requirement": "MANDATORY|CONDITIONAL",
      "uploadStatus": "UPLOADED|MISSING",
      "compliance": "PASS|FAIL|WARNING",
      "suggestions": "string"
    }
  ],
  "overallCompliance": number,
  "readyForSubmission": boolean,
  "riskFactors": ["string"]
}`,
      },
    ],
  });

  try {
    return JSON.parse(message.choices[0].message.content);
  } catch {
    return null;
  }
}

export async function explainDeductions(settlement, policy) {
  const message = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are an insurance claims advocate. Explain each deduction to the policyholder in simple language. Return ONLY valid JSON.

Settlement:
${JSON.stringify(settlement, null, 2)}

Policy:
${JSON.stringify(policy, null, 2)}

Return:
{
  "deductions": [
    {
      "deduction": "string",
      "amount": number,
      "reason": "string",
      "policyReference": "string",
      "isAppealable": boolean,
      "appealRationale": ["string"],
      "likelihoodOfSuccess": "string (e.g. 60%)",
      "advanceNeeded": "string"
    }
  ],
  "totalDeductions": number,
  "appealableCount": number,
  "potentialRecovery": number,
  "avgAppealSuccessRate": number
}`,
      },
    ],
  });

  try {
    return JSON.parse(message.choices[0].message.content);
  } catch {
    return null;
  }
}

export async function checkNetworkHospital(policy, hospital, department, city) {
  const message = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a network hospital intelligence system. Given the patient's policy, hospital name, department, and city, determine the network status. Return ONLY valid JSON.

Policy:
${JSON.stringify(policy, null, 2)}

Hospital: ${hospital}
Department: ${department}
City: ${city}

Return:
{
  "hospital": "string",
  "department": "string",
  "networkStatus": "FULL_NETWORK|PARTIAL_NETWORK|NOT_NETWORK",
  "details": {
    "overallNetwork": "string",
    "departmentNetwork": "string",
    "appliedRoomCap": "string",
    "youPayEverything": boolean
  },
  "alternativeNetworkHospitals": [
    {
      "hospital": "string",
      "distance": "string",
      "departmentRating": "string",
      "networkStatus": "FULL_NETWORK"
    }
  ],
  "whatToDoBefore": ["string"]
}`,
      },
    ],
  });

  try {
    return JSON.parse(message.choices[0].message.content);
  } catch {
    return null;
  }
}

export async function comparePolicies(currentPolicy, candidatePolicy) {
  const message = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a health insurance policy comparison expert. Compare two policies side-by-side and highlight differences. Return ONLY valid JSON.

Current Policy:
${JSON.stringify(currentPolicy, null, 2)}

Candidate Policy:
${JSON.stringify(candidatePolicy, null, 2)}

Return:
{
  "comparison": [
    {
      "feature": "string",
      "currentPolicy": "string",
      "candidatePolicy": "string",
      "winner": "current|candidate|tie",
      "impact": "string"
    }
  ],
  "betterCoverageAreas": ["string"],
  "worseCoverageAreas": ["string"],
  "shouldUpgrade": boolean,
  "financialJustification": "string",
  "watchOutFor": ["string"],
  "premiumDifference": number,
  "estimatedSavings": number
}`,
      },
    ],
  });

  try {
    return JSON.parse(message.choices[0].message.content);
  } catch {
    return null;
  }
}
