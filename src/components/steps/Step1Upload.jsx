import React from 'react';
import {
  Upload,
  FileText,
  ShieldCheck,
  CheckCircle,
  Clock,
  Database,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

const samplePolicyCards = [
  {
    num: '01',
    name: 'HDFC Health Insurance (Demo)',
    detail: 'Comprehensive Health, Rs.5,00,000 sum insured',
  },
];

const supportedInsurers = [
  'Care Health', 'HDFC ERGO', 'Star Health',
  'Niva Bupa', 'ICICI Lombard', 'Tata AIG',
  'Aditya Birla', 'Bajaj Allianz', 'New India Assur.',
];

export default function Step1Upload({ policy, onPolicyLoad, loading }) {
  const [dragOver, setDragOver] = React.useState(false);

  if (policy) {
    return (
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Upload your health insurance policy schedule or e-card.
          </h2>
          <p className="text-gray-600 mt-1">
            FinSaathi parses 40+ page policy wordings in seconds, extracting room rent sub-limits, disease waiting periods, copay nuances, and cashless hospital guidelines without retaining raw identity records.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={18} className="text-teal-700" />
                <h3 className="font-bold text-gray-900">Digital Intake Ledger</h3>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
                      <FileText size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-teal-600 font-medium">{policy.insurer}</p>
                      <p className="font-bold text-gray-900 text-sm">
                        {policy.coverageType} - Policy #{policy.policyNumber}
                      </p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Active Intake
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Loaded from sample policy data
                </p>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>CLAUSE & LIMIT INGESTION MATRIX</span>
                    <span className="text-teal-600 font-semibold">Policy data loaded</span>
                  </div>
                  <div className="w-full bg-teal-100 rounded-full h-1.5">
                    <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-gray-900">Policyholder Details</p>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">Verified</span>
                    </div>
                    <p className="text-xs text-gray-600">{policy.holderName} - Policyholder</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Database size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">Coverage Amount</p>
                    <p className="text-xs text-gray-600">
                      Sum Insured: Rs.{policy.coverageAmount?.toLocaleString('en-IN')}, Deductible: Rs.{policy.deductible?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-1">Rs.{policy.coverageAmount?.toLocaleString('en-IN')} Total</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-gray-900">Covered Conditions</p>
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">{policy.coveredConditions?.length} conditions parsed</span>
                    </div>
                    <p className="text-xs text-gray-600">{policy.coveredConditions?.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-gray-900">Exclusions & Waiting Periods</p>
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded font-medium">Tracked</span>
                    </div>
                    <p className="text-xs text-gray-600">{policy.excludedConditions?.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-teal-700 transition-colors border border-gray-300 rounded-lg px-3 py-2">
                  <FileText size={14} />
                  Inspect OCR Raw Text
                </button>
                <button className="text-sm text-gray-600 hover:text-teal-700 transition-colors border border-gray-300 rounded-lg px-3 py-2">
                  Re-upload
                </button>
                <button
                  onClick={() => {}}
                  className="ml-auto bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-800 flex items-center gap-2 text-sm transition-colors"
                >
                  Proceed to Policy Overview <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-1">Policy Insight</h3>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Why reading the policy wording matters.
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Insurance brochures highlight benefits, but the actual policy wording contains important details about deductibles, waiting periods, and exclusions that affect your claims.
              </p>
              <div className="bg-gray-50 border-l-4 border-teal-600 p-3 rounded-r">
                <p className="text-xs font-bold text-gray-900 mb-1">KNOW YOUR DEDUCTIBLE</p>
                <p className="text-xs text-gray-600">
                  This policy has a Rs.10,000 deductible. You pay the first Rs.10,000 of each claim before coverage kicks in. Understanding this helps you plan financially.
                </p>
              </div>
              <p className="text-xs text-teal-700 font-semibold mt-2 flex items-center gap-1">
                <ShieldCheck size={12} />
                FinSaathi extracts key terms from your policy
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Fast Sandbox</h3>
                <span className="text-gray-400">Test with Sample Policies</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Load the demo sample policy to see how FinSaathi extracts and organizes policy information:
              </p>
              <div className="space-y-2">
                {samplePolicyCards.map((card, i) => (
                  <button
                    key={i}
                    onClick={() => onPolicyLoad(i)}
                    className="w-full text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 bg-teal-100 text-teal-700 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {card.num}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{card.name}</p>
                        <p className="text-xs text-gray-500">{card.detail}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-sm">Supported Insurers & TPAs</h3>
                <span className="text-xs text-gray-500">32 Recognized</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {supportedInsurers.map((name, i) => (
                  <div key={i} className="text-center p-2 bg-gray-50 rounded text-xs font-medium text-gray-700 border border-gray-100">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Upload your health insurance policy schedule or e-card.
        </h2>
        <p className="text-gray-600 mt-1">
          FinSaathi parses 40+ page policy wordings in seconds, extracting room rent sub-limits, disease waiting periods, copay nuances, and cashless hospital guidelines without retaining raw identity records.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={18} className="text-teal-700" />
              <h3 className="font-bold text-gray-900">Digital Intake Ledger</h3>
              <span className="text-xs text-gray-400 ml-auto">PDF or scanned image</span>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragOver ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); onPolicyLoad(0); }}
            >
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={24} className="text-teal-600" />
              </div>
              <p className="font-bold text-gray-900 mb-1">Drag & drop policy schedule here</p>
              <p className="text-sm text-gray-500 mb-4">
                Support for multi-page annual schedules, renewal notices,<br />and member e-cards (up to 25MB)
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => onPolicyLoad(0)}
                  disabled={loading}
                  className="bg-teal-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-800 disabled:bg-gray-400 flex items-center gap-2 text-sm transition-colors"
                >
                  <FileText size={16} />
                  Select Document
                </button>
                <button className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-50 flex items-center gap-2 text-sm transition-colors">
                  <ExternalLink size={16} />
                  Load Sample Policy
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
              <span>Demo mode: sample policy data used for illustration</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">PROTOTYPE</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-1">Policy Insight</h3>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Why reading the policy wording matters.
            </p>
            <p className="text-sm text-gray-600 mb-3">
              Insurance brochures highlight benefits, but the actual policy wording contains important details about deductibles, waiting periods, and exclusions that affect your claims.
            </p>
            <div className="bg-gray-50 border-l-4 border-teal-600 p-3 rounded-r">
              <p className="text-xs font-bold text-gray-900 mb-1">KNOW YOUR DEDUCTIBLE</p>
              <p className="text-xs text-gray-600">
                This policy has a Rs.10,000 deductible. You pay the first Rs.10,000 of each claim before coverage kicks in. Understanding this helps you plan financially.
              </p>
            </div>
            <p className="text-xs text-teal-700 font-semibold mt-2 flex items-center gap-1">
              <ShieldCheck size={12} />
              FinSaathi extracts key terms from your policy
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Fast Sandbox</h3>
              <span className="text-gray-400 text-xs">Test with Sample Policies</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Don't have your PDF handy right now? Load a representative IRDAI-registered wording to see how our extraction engine isolates sub-limits:
            </p>
            <div className="space-y-2">
              {samplePolicyCards.map((card, i) => (
                <button
                  key={i}
                  onClick={() => onPolicyLoad(i)}
                  disabled={loading}
                  className="w-full text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-teal-100 text-teal-700 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {card.num}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{card.name}</p>
                      <p className="text-xs text-gray-500">{card.detail}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-sm">Sample Insurers</h3>
              <span className="text-xs text-gray-500">Demo data</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {supportedInsurers.map((name, i) => (
                <div key={i} className="text-center p-2 bg-gray-50 rounded text-xs font-medium text-gray-700 border border-gray-100">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
