import React from 'react';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Upload,
  ShieldCheck,
  ExternalLink,
  Copy,
} from 'lucide-react';
import { sampleDocuments } from '../../data/samplePolicies';

const statusColors = {
  'VERIFIED & ATTACHED': 'bg-green-100 text-green-700',
  'ACTION REQUIRED': 'bg-amber-100 text-amber-700',
};

const statusIcons = {
  form: <FileText size={16} className="text-blue-600" />,
  scan: <FileText size={16} className="text-purple-600" />,
  note: <FileText size={16} className="text-teal-600" />,
  tariff: <FileText size={16} className="text-blue-600" />,
  action: <AlertTriangle size={16} className="text-amber-600" />,
};

export default function Step5Documents({ policy }) {
  const verifiedCount = sampleDocuments.filter((d) => d.status === 'VERIFIED & ATTACHED').length;
  const totalCount = sampleDocuments.length;
  const readinessPercent = Math.round((verifiedCount / totalCount) * 100);

  return (
    <div>
      <div className="mb-2">
        <p className="text-xs text-gray-500 tracking-wider">DOCUMENT CHECKLIST</p>
        <p className="text-sm text-gray-600">Based on your policy's claim process requirements</p>
        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Policy: {policy?.insurer || 'HDFC Health Insurance'}</span>
          <span>Policy #{policy?.policyNumber || 'HDFC/0125/2024'}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Document Checklist for Claim Submission
        </h2>
        <p className="text-gray-600 mt-1">
          Based on your policy's required documents. Having all documents ready speeds up the claim process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p className="font-semibold text-sm text-gray-900">Dossier Readiness Score</p>
              </div>
              <span className="text-sm font-bold text-gray-900">{readinessPercent}% Completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${readinessPercent}%` }}></div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{verifiedCount} of {totalCount} Required Archival Records Digitally Verified</span>
              <span className="flex items-center gap-1 text-amber-600"><Clock size={10} /> 1 Pending Action</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500 tracking-wider">INSPECTION DOSSIER BREAKDOWN</p>
                <p className="text-xs text-gray-400">INDEXED BY CLAUSE RULE 14.1</p>
              </div>
            </div>

            <div className="space-y-3">
              {sampleDocuments.map((doc, i) => (
                <div key={i} className={`rounded-lg border p-4 ${
                  doc.status === 'ACTION REQUIRED' ? 'border-amber-200 bg-amber-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{statusIcons[doc.type]}</div>
                      <div>
                        <p className="text-xs text-gray-500 font-mono">{doc.id}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${statusColors[doc.status]}`}>
                          {doc.status}
                        </span>
                        <p className="font-bold text-sm text-gray-900 mt-1">{doc.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{doc.detail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {doc.status === 'VERIFIED & ATTACHED' ? (
                        <button className="text-xs text-gray-500 hover:text-teal-700 flex items-center gap-1 border border-gray-200 rounded px-2 py-1">
                          <ExternalLink size={10} /> View{doc.type === 'form' ? ' PDF' : doc.type === 'scan' ? ' Scan' : doc.type === 'note' ? ' Note' : ' Tariff'}
                        </button>
                      ) : (
                        <button className="bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 hover:bg-amber-700">
                          <Upload size={12} /> Pending Upload
                        </button>
                      )}
                      {doc.status === 'VERIFIED & ATTACHED' && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </div>
                  </div>
                  {doc.status === 'ACTION REQUIRED' && (
                    <div className="mt-3">
                      <button className="bg-teal-700 text-white text-xs px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-teal-800">
                        <Upload size={14} /> Upload Cancelled Cheque
                      </button>
                      <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG accepted (Max 5MB)</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500 tracking-wider">POLICY TERM TRANSLATION</p>
                <p className="text-xs text-gray-400">Understanding the fine print in plain language</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-700 uppercase">Policy Wording</p>
                  <button className="text-gray-400 hover:text-gray-600"><Copy size={14} /></button>
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "The insured must inform the company within 48 hours of admission. Cashless facility is available at network hospitals. Claims must be submitted within 30 days of discharge."
                </p>
                <p className="text-xs text-gray-500 mt-2">{policy?.insurer || 'HDFC Health Insurance'} Policy Wordings</p>
              </div>

              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={14} className="text-teal-700" />
                  <p className="text-xs font-bold text-teal-800 uppercase">What This Means</p>
                </div>
                <p className="text-sm text-teal-900 leading-relaxed">
                  You have 2 days to notify your insurer after hospitalization. For cashless treatment, go to a network hospital. Otherwise, pay first and submit papers within a month for reimbursement.
                </p>
                <p className="text-xs text-green-700 font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle size={12} /> Based on your policy
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-1">Ready to Submit?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Review your documents and prepare your claim submission package.
            </p>
            <div className="flex gap-3">
              <button className="bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-teal-800 flex items-center gap-2">
                <CheckCircle size={14} /> Review Claim Details
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 tracking-wider">CLAIM PROCESS</p>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Your policy outlines these steps for claim submission:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-teal-100 text-teal-700 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <p className="text-gray-700">Inform insurer within 48 hours of admission</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-teal-100 text-teal-700 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <p className="text-gray-700">Submit documents within 30 days</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-teal-100 text-teal-700 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <p className="text-gray-700">Claim decision within 5-7 working days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">HUMAN REVIEW</p>
            <p className="text-xs text-gray-600 mb-3">
              For complex claims or if you need help, you can escalate to human review.
            </p>
            <button className="w-full bg-teal-700 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-teal-800">
              Request Human Review
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 tracking-wider mb-2">POLICY INFO</p>
            <p className="font-bold text-gray-900">{policy?.holderName || 'Raj Kumar'}</p>
            <p className="text-xs text-gray-500">Policy: {policy?.policyNumber || 'HDFC/0125/2024'}</p>
            <p className="text-xs text-gray-500">Coverage: Rs.{policy?.coverageAmount?.toLocaleString('en-IN') || '5,00,000'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
