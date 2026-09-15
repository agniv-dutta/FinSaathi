import React, { useState } from 'react';
import { ShieldCheck, ChevronRight, ChevronLeft, Loader } from 'lucide-react';
import Step1Upload from './steps/Step1Upload';
import Step2Breakdown from './steps/Step2Breakdown';
import Step3AskFinSaathi from './steps/Step3AskFinSaathi';
import Step4ClaimAnalysis from './steps/Step4ClaimAnalysis';
import Step5Documents from './steps/Step5Documents';
import Step6Escalation from './steps/Step6Escalation';
import Step7PreAuth from './steps/Step7PreAuth';
import Step8ClaimTracker from './steps/Step8ClaimTracker';
import Step9PolicyComparison from './steps/Step9PolicyComparison';
import { samplePolicies } from '../data/samplePolicies';

const steps = [
  { num: 1, label: 'Upload & Intake' },
  { num: 2, label: 'Policy Breakdown' },
  { num: 3, label: 'Ask FinSaathi' },
  { num: 4, label: 'Claim Analysis' },
  { num: 5, label: 'Document Checklist & Dossier' },
  { num: 6, label: 'Human Escalation Desk' },
  { num: 7, label: 'Pre-Auth Predictor' },
  { num: 8, label: 'Claim Tracker' },
  { num: 9, label: 'Policy Comparison' },
];

export default function ClaimBot() {
  const [currentStep, setCurrentStep] = useState(1);
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handlePolicyLoad = async (index) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const p = samplePolicies[0];
      setPolicy(p);
      setCurrentStep(2);
    } catch (err) {
      setError('Failed to load policy. Try again.');
    }
    setLoading(false);
  };

  const handleQuerySubmit = async (userQuery) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const { escalationReason, processClaimQuery } = await import('../lib/groqClient');

      const escalation = await escalationReason(policy, userQuery);

      if (escalation.escalate) {
        setResponse({
          type: 'escalation',
          query: userQuery,
          message: `Human review needed: ${escalation.reason}`,
          escalation: true,
        });
      } else {
        const answer = await processClaimQuery(policy, userQuery);
        setResponse({ type: 'answer', query: userQuery, message: answer, escalation: false });
      }
    } catch (err) {
      setError('Failed to process query. Check your Groq API key in .env.local.');
    }

    setLoading(false);
  };

  const canGoNext = currentStep < 9;
  const canGoPrev = currentStep > 1;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Upload policy={policy} onPolicyLoad={handlePolicyLoad} loading={loading} />;
      case 2:
        return <Step2Breakdown policy={policy} />;
      case 3:
        return (
          <Step3AskFinSaathi
            policy={policy}
            onQuerySubmit={handleQuerySubmit}
            response={response}
            loading={loading}
            error={error}
          />
        );
      case 4:
        return <Step4ClaimAnalysis policy={policy} />;
      case 5:
        return <Step5Documents policy={policy} />;
      case 6:
        return <Step6Escalation policy={policy} />;
      case 7:
        return <Step7PreAuth policy={policy} />;
      case 8:
        return <Step8ClaimTracker policy={policy} />;
      case 9:
        return <Step9PolicyComparison policy={policy} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-700 rounded-lg p-1.5 flex items-center justify-center">
              <ShieldCheck className="text-white" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-gray-900">FinSaathi</h1>
                <span className="text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded font-bold tracking-wider">EDITORIAL ADVOCATE</span>
              </div>
              <p className="text-[11px] text-gray-500 italic">Your policy, finally understandable.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {policy && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{policy.insurer}</span>
                <span className="text-gray-300">|</span>
                <span>Policy #{policy.policyNumber}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                RK
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{policy?.holderName || 'Raj Kumar'} (Policyholder)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto">
            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => {
                  if (step.num <= currentStep || (step.num <= 2 && policy)) {
                    setCurrentStep(step.num);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  currentStep === step.num
                    ? 'border-teal-700 text-teal-700'
                    : currentStep > step.num
                    ? 'border-transparent text-teal-600 hover:text-teal-700'
                    : 'border-transparent text-gray-400 cursor-not-allowed'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === step.num
                      ? 'bg-teal-700 text-white'
                      : currentStep > step.num
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {currentStep > step.num ? '\u2713' : step.num}
                </span>
                {step.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step Label */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded font-bold">
            STEP {String(currentStep).padStart(2, '0')} OF 09
          </span>
          <span className="text-gray-300">|</span>
          <span className="tracking-wider">
            {currentStep === 1 && 'POLICY INTAKE & VERIFICATION'}
            {currentStep === 2 && 'POLICY DIGEST & CLAUSE CODEX'}
            {currentStep === 3 && 'ACTIVE POLICY INTELLIGENCE ENGINE'}
            {currentStep === 4 && 'CLAIM ELIGIBILITY & DEDUCTION AUDIT'}
            {currentStep === 5 && 'CLAIM DOSSIER & COMPLIANCE CHECKLIST'}
            {currentStep === 6 && 'HUMAN FINANCIAL & LEGAL ESCALATION DESK'}
            {currentStep === 7 && 'PRE-AUTHORIZATION COST PREDICTOR'}
            {currentStep === 8 && 'REAL-TIME CLAIM STATUS TRACKER'}
            {currentStep === 9 && 'POLICY COMPARISON & RENEWAL INTEL'}
          </span>
          <span className="text-gray-300">|</span>
          <span>Policy-grounded analysis</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 pb-8">
        {loading && currentStep === 1 && (
          <div className="flex items-center justify-center py-20">
            <Loader className="animate-spin text-teal-600" size={32} />
            <span className="ml-3 text-gray-600">Parsing policy document...</span>
          </div>
        )}
        {renderStep()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-gray-500">
          <p>
            <strong>FinSaathi</strong> - AI Health Insurance Claims Assistant
          </p>
          <p>Prototype v1.0</p>
          <p>&copy; 2024 FinSaathi</p>
        </div>
      </footer>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => canGoPrev && setCurrentStep(currentStep - 1)}
            disabled={!canGoPrev}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-teal-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
            {currentStep > 1 ? steps[currentStep - 2]?.label : ''}
          </button>

          <div className="flex items-center gap-1">
            {steps.map((s) => (
              <span
                key={s.num}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentStep === s.num ? 'bg-teal-600' : s.num < currentStep ? 'bg-teal-300' : 'bg-gray-200'
                }`}
              ></span>
            ))}
          </div>

          <button
            onClick={() => canGoNext && setCurrentStep(currentStep + 1)}
            disabled={!canGoNext}
            className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {currentStep < 9 ? steps[currentStep]?.label : 'Complete'}
            {currentStep < 9 && <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
