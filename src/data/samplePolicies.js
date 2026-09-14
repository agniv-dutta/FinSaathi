export const samplePolicies = [
  {
    id: 'HLTH001',
    insurer: 'HDFC Health Insurance',
    tpa: 'In-House Claims',
    fileName: 'HDFC_HealthInsurance_2024.pdf',
    policyNumber: 'HDFC/0125/2024',
    holderName: 'Raj Kumar',
    coverageType: 'Comprehensive Health',
    coverageAmount: 500000,
    deductible: 10000,
    copay: 0.2,
    coveredConditions: [
      'Hospitalization',
      'Surgery',
      'Maternity',
      'Cancer treatment',
      'Dental (emergency only)',
      'Physiotherapy',
    ],
    excludedConditions: [
      'Pre-existing diseases (first 2 years)',
      'Cosmetic surgery',
      'Mental health treatment',
      'Ayurveda/Homeopathy',
    ],
    claimProcess:
      '1) Inform insurer within 48h of admission 2) Submit bills within 30 days 3) AI reviews eligibility 4) Approval in 2-3 days',
    documentsRequired: [
      'Hospital discharge summary',
      'Itemized bills',
      "Doctor's prescription",
      'Insurance claim form',
      'ID proof',
    ],
    maxClaimPerYear: 1000000,
    validity: 'Jan 2024 - Dec 2024',
    coveredWithZeroCopay: [
      {
        title: 'Hospitalization',
        detail: 'In-patient hospitalization covered at 100% after Rs.10,000 deductible is met.',
        clause: 'COVERAGE CLAUSE - HOSPITALIZATION',
        tag: 'After Deductible',
      },
      {
        title: 'Surgery',
        detail: 'All medically necessary surgeries covered at 100% of approved charges.',
        clause: 'COVERAGE CLAUSE - SURGERY',
        tag: 'Fully Covered',
      },
      {
        title: 'Cancer Treatment',
        detail: 'Chemotherapy, radiation, and surgical oncology covered up to sum insured.',
        clause: 'COVERAGE CLAUSE - ONCOLOGY',
        tag: 'Up to SI',
      },
      {
        title: 'Physiotherapy',
        detail: 'Post-hospitalization physiotherapy sessions covered for up to 30 days.',
        clause: 'COVERAGE CLAUSE - REHABILITATION',
        tag: '30-Day Window',
      },
    ],
    conditionsSpecialLimits: [
      {
        title: 'Maternity',
        detail: 'Maternity benefits available from year 2 of the policy. Normal delivery and C-section covered up to specified limits.',
        clause: 'COVERAGE CLAUSE - MATERNITY',
        tag: 'Year 2 Onward',
      },
      {
        title: 'Dental (Emergency Only)',
        detail: 'Dental treatment covered only for emergency procedures resulting from accident. Max Rs.5,000/year.',
        clause: 'COVERAGE CLAUSE - DENTAL',
        tag: 'Emergency Only',
      },
    ],
    strictExclusions: [
      {
        title: 'Pre-Existing Diseases (First 2 Years)',
        detail: 'Claims related to pre-existing conditions are subject to 25% rejection during the first 2 years of the policy.',
        clause: 'EXCLUSION CLAUSE - PED',
        tag: '25% Rejection Risk',
      },
      {
        title: 'Cosmetic Surgery',
        detail: 'Any cosmetic or aesthetic procedure is excluded from coverage.',
        clause: 'EXCLUSION CLAUSE - COSMETIC',
        tag: 'Not Covered',
      },
      {
        title: 'Mental Health Treatment',
        detail: 'Treatment for mental health conditions is excluded.',
        clause: 'EXCLUSION CLAUSE - MENTAL HEALTH',
        tag: 'Not Covered',
      },
      {
        title: 'Ayurveda / Homeopathy',
        detail: 'Alternative medicine treatments are excluded from coverage.',
        clause: 'EXCLUSION CLAUSE - ALTERNATIVE MEDICINE',
        tag: 'Not Covered',
      },
    ],
    rawText: `HDFC Health Insurance Policy No. HDFC/0125/2024
Policyholder: Raj Kumar
Coverage Type: Comprehensive Family Health
Sum Insured: Rs. 5,00,000

COVERAGE DETAILS:
- Hospitalization: 100% after Rs.10,000 deductible
- Surgery: Covered 100%
- Maternity: Covered from year 2
- Dental Emergency: Covered (max Rs.5,000/year)
- Pre-existing diseases: 25% claim rejection for first 2 years

CLAIM PROCESS:
1. Inform within 48 hours of admission
2. Cashless facility at network hospitals
3. Submit documents within 30 days
4. Claim decision within 5-7 working days

DOCUMENTS REQUIRED:
- Hospital discharge papers
- Itemized hospital bills
- Doctor's medical report
- Insurance claim form
- ID & residence proof

EXCLUSIONS:
- Treatment outside India
- Cosmetic procedures
- Mental health conditions
- Alternative medicine (Ayurveda, Homeopathy)
- High-risk sports

Validity: 01-Jan-2024 to 31-Dec-2024`,
  },
];

export const sampleQueries = [
  "I had knee surgery last month. What's my coverage?",
  'Can I claim for dental work?',
  'Is maternity covered under my policy?',
  'I went to a non-network hospital. Will I get reimbursed?',
  'How long does a claim take?',
];

export const sampleClaimItems = [
  {
    category: 'Room Rent & Nursing',
    description: 'General ward (2 days allocation)',
    amount: 8000,
    certainty: 'COVERED',
    rule: 'Policy covers hospitalization at 100% after Rs.10,000 deductible is satisfied.',
  },
  {
    category: 'Surgeon & OT Charges',
    description: 'Surgical procedure fees',
    amount: 45000,
    certainty: 'COVERED',
    rule: 'Surgery is covered at 100% of approved charges under the policy.',
  },
  {
    category: 'Anesthesia & Diagnostics',
    description: 'Pre-op tests and anesthesia',
    amount: 12000,
    certainty: 'COVERED',
    rule: 'Integral to surgical clearance. Diagnostic tests are part of hospitalization.',
  },
  {
    category: 'Post-Discharge Medicines',
    description: '15-day medication course',
    amount: 3500,
    certainty: 'CONDITIONAL',
    rule: 'Post-discharge medicines may need separate claim under 30-day post-hospitalization window.',
  },
  {
    category: 'Administrative Charges',
    description: 'Hospital registration and documentation',
    amount: 1500,
    certainty: 'DEDUCTED',
    rule: 'Standard administrative fees are non-admissible under most TPA guidelines.',
  },
];

export const sampleDocuments = [
  {
    id: 'DOC.01',
    title: 'Hospital Discharge Summary',
    detail: 'Discharge summary from the treating hospital showing admission and discharge dates, diagnosis, and treatment provided.',
    status: 'VERIFIED & ATTACHED',
    type: 'form',
  },
  {
    id: 'DOC.02',
    title: 'Itemized Hospital Bills',
    detail: 'Detailed itemized bill from the hospital with breakdown of all charges including room, surgeon, medicines, and diagnostics.',
    status: 'VERIFIED & ATTACHED',
    type: 'scan',
  },
  {
    id: 'DOC.03',
    title: "Doctor's Prescription & Medical Report",
    detail: "Treating doctor's prescription and medical report detailing the diagnosis, treatment plan, and medication prescribed.",
    status: 'VERIFIED & ATTACHED',
    type: 'note',
  },
  {
    id: 'DOC.04',
    title: 'Insurance Claim Form',
    detail: 'Completed and signed insurance claim form as required by HDFC Health Insurance.',
    status: 'VERIFIED & ATTACHED',
    type: 'form',
  },
  {
    id: 'DOC.05',
    title: 'ID & Residence Proof',
    detail: 'Government-issued ID proof (Aadhaar/PAN) and address verification documents.',
    status: 'ACTION REQUIRED',
    type: 'action',
  },
];
