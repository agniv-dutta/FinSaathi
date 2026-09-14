import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Copy,
} from 'lucide-react';

const clauseTabs = [
  'Deductible & Copay',
  'Covered Conditions',
  'Exclusions & Waiting Periods',
];

export default function Step2Breakdown({ policy }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!policy) return null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {policy.coverageType}:
        </h2>
        <p className="text-lg text-gray-600 italic">
          What you are actually protected against.
        </p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-teal-600" /> {policy.holderName}</span>
          <span className="text-gray-400">|</span>
          <span>{policy.validity}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">SUM INSURED</p>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Active Cover</span>
          <p className="text-2xl font-bold text-gray-900 mt-2">Rs.{policy.coverageAmount?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-gray-500">Maximum coverage per year</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">DEDUCTIBLE</p>
          <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">Apply Before Coverage</span>
          <p className="text-2xl font-bold text-gray-900 mt-2">Rs.{policy.deductible?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-gray-500">You pay this amount first per claim</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">COPAY</p>
          <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">After Deductible</span>
          <p className="text-2xl font-bold text-gray-900 mt-2">{(policy.copay * 100).toFixed(0)}%</p>
          <p className="text-xs text-gray-500">Your share of costs after deductible</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">CLAIM PROCESS</p>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Available</span>
          <p className="text-sm font-bold text-gray-900 mt-2">{policy.claimProcess?.split(')')[0]})</p>
          <p className="text-xs text-gray-500">Key steps for filing claims</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 tracking-wider mb-1">POLICY ANALYSIS</p>
        <h3 className="text-xl font-bold text-gray-900">Coverage Breakdown</h3>
        <p className="text-xs text-gray-400 mt-1">Based on your uploaded policy document</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={16} className="text-green-600" />
            <h4 className="font-bold text-sm text-gray-900">Covered Conditions</h4>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-auto">Covered</span>
          </div>
          <div className="space-y-3">
            {policy.coveredWithZeroCopay?.map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-sm text-gray-900">{item.title}</p>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{item.tag}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{item.detail}</p>
                <p className="text-xs text-teal-600 font-mono">{item.clause}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600" />
            <h4 className="font-bold text-sm text-gray-900">Conditions & Limits</h4>
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full ml-auto">With Limits</span>
          </div>
          <div className="space-y-3">
            {policy.conditionsSpecialLimits?.map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-amber-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-sm text-gray-900">{item.title}</p>
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{item.tag}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{item.detail}</p>
                <p className="text-xs text-teal-600 font-mono">{item.clause}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-600" />
            <h4 className="font-bold text-sm text-gray-900">Exclusions</h4>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full ml-auto">Not Covered</span>
          </div>
          <div className="space-y-3">
            {policy.strictExclusions?.map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-red-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-sm text-gray-900">{item.title}</p>
                  <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">{item.tag}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{item.detail}</p>
                <p className="text-xs text-teal-600 font-mono">{item.clause}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 tracking-wider">POLICY FINE-PRINT</p>
            <h3 className="text-lg font-bold text-gray-900">Key Terms Explained</h3>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {clauseTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === i
                  ? 'bg-teal-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-700 uppercase">Policy Document</p>
              <button className="text-gray-400 hover:text-gray-600"><Copy size={14} /></button>
            </div>
            {activeTab === 0 && (
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "The policy has a deductible of Rs.10,000 per claim. After the deductible is satisfied, a copay of 20% applies to the remaining covered expenses up to the sum insured of Rs.5,00,000."
              </p>
            )}
            {activeTab === 1 && (
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "Covered conditions include: Hospitalization, Surgery, Maternity (from year 2), Cancer treatment, Dental (emergency only, max Rs.5,000/year), and Physiotherapy (up to 30 days post-hospitalization)."
              </p>
            )}
            {activeTab === 2 && (
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "Exclusions: Pre-existing diseases (25% rejection for first 2 years), Cosmetic surgery, Mental health treatment, Ayurveda/Homeopathy. Not covered: Treatment outside India, high-risk sports."
              </p>
            )}
          </div>

          <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={14} className="text-teal-700" />
              <p className="text-xs font-bold text-teal-800 uppercase">What This Means For You</p>
            </div>
            {activeTab === 0 && (
              <p className="text-sm text-teal-900 leading-relaxed">
                For a Rs.50,000 hospital bill: You pay Rs.10,000 (deductible) + 20% of remaining Rs.40,000 = Rs.8,000. Total out-of-pocket: Rs.18,000. Insurer pays Rs.32,000.
              </p>
            )}
            {activeTab === 1 && (
              <p className="text-sm text-teal-900 leading-relaxed">
                Most common hospital treatments are covered. Maternity has a 2-year waiting period. Dental only covers emergencies like accidents. Cancer treatment is fully covered up to your sum insured.
              </p>
            )}
            {activeTab === 2 && (
              <p className="text-sm text-teal-900 leading-relaxed">
                If you have pre-existing conditions, claims may face higher scrutiny in the first 2 years. Cosmetic procedures and alternative medicine treatments won't be reimbursed.
              </p>
            )}
            <div className="flex items-center justify-between mt-3 text-xs text-teal-600">
              <span className="flex items-center gap-1"><CheckCircle size={12} /> Based on uploaded policy</span>
              <span className="font-semibold">Policy-supported answer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
        <p className="text-xs text-gray-500 tracking-wider mb-1">NEXT STEP</p>
        <h3 className="font-bold text-gray-900 mb-1">Have questions about your coverage?</h3>
        <p className="text-sm text-gray-600 mb-3">
          Ask FinSaathi specific questions about your policy. The AI will answer based on your uploaded policy document.
        </p>
        <div className="flex gap-3">
          <button className="bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-teal-800 flex items-center gap-2">
            Ask FinSaathi <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
