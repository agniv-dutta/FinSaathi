import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Printer,
  Flag,
  ChevronRight,
} from 'lucide-react';
import { sampleClaimItems } from '../../data/samplePolicies';

const certaintyColors = {
  COVERED: 'bg-green-100 text-green-700',
  'NON-PAYABLE': 'bg-red-100 text-red-700',
  CONDITIONAL: 'bg-amber-100 text-amber-700',
  DEDUCTED: 'bg-red-100 text-red-700',
};

const certaintyIcons = {
  COVERED: <CheckCircle size={12} />,
  'NON-PAYABLE': <AlertTriangle size={12} />,
  CONDITIONAL: <Clock size={12} />,
  DEDUCTED: <AlertTriangle size={12} />,
};

export default function Step4ClaimAnalysis({ policy }) {
  const totalEstimate = sampleClaimItems.reduce((sum, item) => sum + item.amount, 0);
  const coveredAmount = sampleClaimItems
    .filter((i) => i.certainty === 'COVERED')
    .reduce((sum, item) => sum + item.amount, 0);
  const conditionalAmount = sampleClaimItems
    .filter((i) => i.certainty === 'CONDITIONAL')
    .reduce((sum, item) => sum + item.amount, 0);
  const excludedAmount = sampleClaimItems
    .filter((i) => i.certainty === 'NON-PAYABLE' || i.certainty === 'DEDUCTED')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Pre-Hospitalization & Surgery Claim Estimate Audit
        </h2>
        <p className="text-gray-600 mt-1">
          Simulate and audit potential hospital bill deductions based on your policy terms. See what might be covered, excluded, or conditional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="grid grid-cols-4 gap-4 text-sm border-b border-gray-100 pb-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">POLICYHOLDER</p>
                <p className="font-bold text-gray-900">{policy?.holderName || 'Raj Kumar'}</p>
                <p className="text-xs text-gray-500">{policy?.insurer || 'HDFC Health Insurance'} - #{policy?.policyNumber || 'HDFC/0125/2024'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">SUM INSURED</p>
                <p className="font-bold text-gray-900">Rs.{policy?.coverageAmount?.toLocaleString('en-IN') || '5,00,000'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">DEDUCTIBLE</p>
                <p className="font-bold text-gray-900">Rs.{policy?.deductible?.toLocaleString('en-IN') || '10,000'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">COPAY</p>
                <p className="font-bold text-gray-900">{((policy?.copay || 0.2) * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500 tracking-wider">HOSPITAL ESTIMATE LINE-ITEM AUDIT</p>
                <p className="text-xs text-gray-400">Based on your policy terms and sample claim data</p>
              </div>
              <p className="text-sm font-bold text-gray-900">TOTAL ESTIMATE: Rs.1,42,000</p>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-50 text-xs font-bold text-gray-600 px-4 py-2">
                <span className="col-span-3">EXPENSE CATEGORY &<br />HOSPITAL DESCRIPTION</span>
                <span className="col-span-2">EST. AMOUNT</span>
                <span className="col-span-2">CERTAINTY LEVEL</span>
                <span className="col-span-5">TPA ADJUDICATION RULE</span>
              </div>
              {sampleClaimItems.map((item, i) => (
                <div key={i} className="grid grid-cols-12 text-xs px-4 py-3 border-t border-gray-100 items-start">
                  <div className="col-span-3">
                    <p className="font-semibold text-gray-900">{item.category}</p>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                  <div className="col-span-2 font-bold text-gray-900">Rs.{item.amount.toLocaleString('en-IN')}</div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold ${certaintyColors[item.certainty]}`}>
                      {certaintyIcons[item.certainty]} {item.certainty}
                    </span>
                  </div>
                  <div className="col-span-5 text-gray-600">{item.rule}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
              <span>FinSaathi Claim Analysis - Demo data</span>
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500">IN-HOSPITAL NET PAYABLE</p>
                  <p className="text-lg font-bold text-green-600">Rs.97,500</p>
                  <p className="text-xs text-gray-500">Cashless</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">POST-HOSP. REIMBURSEMENT</p>
                  <p className="text-lg font-bold text-amber-600">Rs.6,800 Rx Claim</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">ADJUDICATION CAPITAL ALLOCATION</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-gray-900">Total Claim Value: Rs.1,42,000</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden flex">
              <div className="bg-green-500 h-4" style={{ width: `${(coveredAmount / totalEstimate) * 100}%` }}></div>
              <div className="bg-amber-500 h-4" style={{ width: `${(conditionalAmount / totalEstimate) * 100}%` }}></div>
              <div className="bg-red-500 h-4" style={{ width: `${(excludedAmount / totalEstimate) * 100}%` }}></div>
            </div>
            <div className="flex items-center gap-6 mt-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-sm"></span> Approved Cashless: Rs.97,500</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 rounded-sm"></span> Conditional Reimbursement: Rs.6,800</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-sm"></span> Out-of-Pocket Liability: Rs.16,700</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
              <Printer size={14} /> Print Pre-Claim Dossier
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
              <Flag size={14} /> Flag Disputed Item to TPA Advisor
            </button>
            <span className="text-sm text-gray-500 ml-auto">Next: Assemble mandatory surgical documents</span>
            <button className="bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-teal-800 flex items-center gap-2">
              Generate Required Document Checklist <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">PRE-AUTH FORECAST</p>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Demo Mode</span>
            <div className="space-y-2 mt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Hospital Estimate:</span>
                <span className="font-bold text-gray-900">Rs.1,42,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurer Direct Settlement:</span>
                <span className="font-bold text-green-600">Rs.1,25,300</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deductions & Consumables:</span>
                <span className="font-bold text-red-600">-Rs.16,700</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-bold text-gray-900">NET PATIENT LIABILITY:</span>
                <span className="text-xl font-bold text-gray-900">Rs.16,700</span>
              </div>
              <p className="text-xs text-gray-500">Due at discharge desk</p>
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl border border-teal-200 p-5">
            <p className="text-xs font-bold text-teal-800 mb-1">PROTOTYPE TIP</p>
            <p className="text-sm text-teal-900">
              This analysis is based on your policy terms and sample data. In production, this would integrate with your insurer's systems to provide real-time claim estimates.
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-amber-600" />
              <p className="text-xs font-bold text-amber-800">CLAIM PROCESS NOTE</p>
            </div>
            <p className="text-sm text-amber-900">
              According to your policy, claims should be submitted within 30 days of admission. Inform your insurer within 48 hours for cashless facility.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">DEMO DATA</p>
            <p className="text-xs text-gray-600">
              Claim items shown are sample data for demonstration. The actual claim analysis would use real hospital bills and policy terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
