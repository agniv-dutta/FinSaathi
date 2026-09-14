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