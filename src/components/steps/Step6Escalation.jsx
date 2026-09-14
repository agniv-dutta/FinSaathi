import React from 'react';
import {
  ShieldCheck,
} from 'lucide-react';

export default function Step6Escalation({ policy }) {
  return (
    <div>
      <div className="mb-2">
        <p className="text-xs text-gray-500 tracking-wider">HUMAN REVIEW</p>
        <p className="text-xs text-gray-600">When AI analysis isn't enough</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          When you need a human touch.
        </h2>
        <p className="text-gray-600 mt-1">
          For complex claims, disputed deductions, or questions the AI can't fully answer. Connect with a human reviewer for personalized assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500">WHEN TO ESCALATE</p>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              Consider human review when:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">Claim is denied and you believe it should be covered</p>
                  <p className="text-xs text-gray-600">A human reviewer can re-examine the policy terms and your specific situation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">The AI response seems incomplete or unclear</p>
                  <p className="text-xs text-gray-600">Human reviewers can provide more detailed explanations and context.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">You need help with the claim submission process</p>
                  <p className="text-xs text-gray-600">Get guidance on documents, timelines, and next steps.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">Disagreement with insurer's claim decision</p>
                  <p className="text-xs text-gray-600">Understand your options for dispute resolution.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 tracking-wider">ESCALATION PROCESS</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">Contact Your Insurance Provider</p>
                  <p className="text-xs text-gray-600">Call the number on your policy card or visit their website. Explain your concern and reference your policy number.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">File a Grievance</p>
                  <p className="text-xs text-gray-600">If unresolved, file a formal grievance with the insurer's grievance officer. They must respond within 15 days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">Insurance Ombudsman</p>
                  <p className="text-xs text-gray-600">If still unresolved, you can approach the Insurance Ombudsman for binding dispute resolution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">YOUR POLICY INFO</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Policyholder:</span>
                <span className="font-semibold text-gray-900">{policy?.holderName || 'Raj Kumar'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Policy Number:</span>
                <span className="font-semibold text-gray-900">{policy?.policyNumber || 'HDFC/0125/2024'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Insurer:</span>
                <span className="font-semibold text-gray-900">{policy?.insurer || 'HDFC Health Insurance'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sum Insured:</span>
                <span className="font-semibold text-gray-900">Rs.{policy?.coverageAmount?.toLocaleString('en-IN') || '5,00,000'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">RESOURCES</p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-900">Insurance Ombudsman</p>
                <p className="text-xs text-gray-500">For dispute resolution between insurers and policyholders</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-900">IRDAI Helpline</p>
                <p className="text-xs text-gray-500">Insurance Regulatory and Development Authority of India</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-900">Consumer Forum</p>
                <p className="text-xs text-gray-500">For consumer protection related to insurance services</p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl border border-teal-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-teal-700" />
              <p className="text-xs font-bold text-teal-800">PROTOTYPE NOTE</p>
            </div>
            <p className="text-xs text-teal-700">
              This escalation guide is for demonstration purposes. In production, FinSaathi would connect you directly with your insurer's support channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
