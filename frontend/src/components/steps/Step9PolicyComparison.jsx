import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader,
  TrendingUp,
} from 'lucide-react';
import { sampleCandidatePolicies } from '../../data/samplePolicies';
import { comparePolicies } from '../../lib/groqClient';

export default function Step9PolicyComparison({ policy }) {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompare = async (candidate) => {
    setSelectedPolicy(candidate);
    setLoading(true);
    setError(null);
    try {
      const result = await comparePolicies(policy, candidate);
      if (result) {
        setComparison(result);
      } else {
        setError('Could not generate comparison. Try again.');
      }
    } catch {
      setError('Failed to connect to AI service.');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Policy Comparison Tool</h2>
        <p className="text-gray-600 mt-1">
          Compare your current policy vs alternatives. See if an upgrade is worth it before renewal.
        </p>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">Enhancement #6</span>
          <span>Side-by-side policy analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-4">SELECT POLICY TO COMPARE</p>
            <div className="space-y-3">
              {sampleCandidatePolicies.map((candidate) => (
                <button
                  key={candidate.id}
                  onClick={() => handleCompare(candidate)}
                  disabled={loading}
                  className={`w-full text-left border rounded-lg p-4 transition ${
                    selectedPolicy?.id === candidate.id
                      ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{candidate.insurer}</p>
                      <p className="text-xs text-gray-500">#{candidate.policyNumber} - {candidate.coverageType}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">Rs.{candidate.coverageAmount?.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-gray-500">Sum Insured</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-600">
                    <span>Deductible: Rs.{candidate.deductible?.toLocaleString('en-IN')}</span>
                    <span>Copay: {(candidate.copay * 100).toFixed(0)}%</span>
                    {candidate.premiumMonthly && <span>Premium: Rs.{candidate.premiumMonthly}/mo</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="animate-spin text-teal-600" size={28} />
              <span className="ml-3 text-gray-600">Analyzing policy differences...</span>
            </div>
          )}

          {comparison && !loading && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <p className="text-xs text-gray-500 tracking-wider mb-4">SIDE-BY-SIDE COMPARISON</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 bg-gray-50 text-xs font-bold text-gray-600 px-4 py-2">
                    <span>FEATURE</span>
                    <span>CURRENT ({policy?.insurer?.split(' ')[0] || 'HDFC'})</span>
                    <span>CANDIDATE ({selectedPolicy?.insurer?.split(' ')[0] || 'New'})</span>
                    <span>IMPACT</span>
                  </div>
                  {comparison.comparison?.map((row, i) => (
                    <div key={i} className="grid grid-cols-4 text-xs px-4 py-3 border-t border-gray-100 items-start">
                      <span className="font-semibold text-gray-900">{row.feature}</span>
                      <span className="text-gray-600">{row.currentPolicy}</span>
                      <span className="text-gray-600">{row.candidatePolicy}</span>
                      <span className={`font-semibold ${
                        row.winner === 'candidate' ? 'text-green-600' :
                        row.winner === 'current' ? 'text-amber-600' : 'text-gray-500'
                      }`}>
                        {row.winner === 'candidate' ? 'Candidate wins' :
                         row.winner === 'current' ? 'Current wins' : 'Tie'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {comparison.betterCoverageAreas?.length > 0 && (
                <div className="bg-green-50 rounded-xl border border-green-200 p-5">
                  <p className="text-xs font-bold text-green-900 mb-2">BETTER COVERAGE AREAS (Candidate)</p>
                  <ul className="space-y-1">
                    {comparison.betterCoverageAreas.map((area, i) => (
                      <li key={i} className="flex gap-2 text-sm text-green-800">
                        <CheckCircle size={14} className="mt-0.5 flex-shrink-0" /> {area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {comparison.worseCoverageAreas?.length > 0 && (
                <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
                  <p className="text-xs font-bold text-amber-900 mb-2">WORSE COVERAGE AREAS (Candidate)</p>
                  <ul className="space-y-1">
                    {comparison.worseCoverageAreas.map((area, i) => (
                      <li key={i} className="flex gap-2 text-sm text-amber-800">
                        <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" /> {area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {comparison.watchOutFor?.length > 0 && (
                <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                  <p className="text-xs font-bold text-red-900 mb-2">WATCH OUT FOR</p>
                  <ul className="space-y-1">
                    {comparison.watchOutFor.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-red-800">
                        <XCircle size={14} className="mt-0.5 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={`rounded-xl border p-5 ${
                comparison.shouldUpgrade
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm font-bold ${comparison.shouldUpgrade ? 'text-green-900' : 'text-gray-900'}`}>
                    {comparison.shouldUpgrade ? 'RECOMMENDATION: Upgrade' : 'RECOMMENDATION: Stay with current'}
                  </p>
                  {comparison.shouldUpgrade && <TrendingUp size={20} className="text-green-600" />}
                </div>
                <p className="text-sm text-gray-700">{comparison.financialJustification}</p>
                {comparison.premiumDifference > 0 && (
                  <div className="flex gap-6 mt-3 text-xs">
                    <span className="text-gray-600">Premium difference: Rs.{comparison.premiumDifference?.toLocaleString('en-IN')}/year</span>
                    <span className="text-green-600 font-semibold">Estimated savings: Rs.{comparison.estimatedSavings?.toLocaleString('en-IN')}/year</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">YOUR CURRENT POLICY</p>
            <div className="space-y-2 text-sm">
              <p className="font-bold text-gray-900">{policy?.insurer || 'HDFC Health Insurance'}</p>
              <p className="text-gray-600">#{policy?.policyNumber || 'HDFC/0125/2024'}</p>
              <div className="border-t border-gray-200 pt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sum Insured</span>
                  <span className="font-semibold">Rs.{policy?.coverageAmount?.toLocaleString('en-IN') || '5,00,000'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deductible</span>
                  <span className="font-semibold">Rs.{policy?.deductible?.toLocaleString('en-IN') || '10,000'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Copay</span>
                  <span className="font-semibold">{((policy?.copay || 0.2) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl border border-teal-200 p-5">
            <p className="text-xs font-bold text-teal-800 mb-1">PROTOTYPE NOTE</p>
            <p className="text-sm text-teal-900">
              This comparison is based on publicly available policy information. In production, it would pull real-time policy terms from insurer APIs and include premium calculations based on your age and health profile.
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-amber-600" />
              <p className="text-xs font-bold text-amber-800">KEY INSIGHT</p>
            </div>
            <p className="text-sm text-amber-900">
              65% of Indians renew the same policy without comparing. Even a small upgrade can save you Rs.15,000+ on your first claim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
