import React, { useState } from 'react';
import {
  Send,
  Loader,
  CheckCircle,
  ShieldCheck,
} from 'lucide-react';

const scenarios = [
  "I had knee surgery last month. What's my coverage?",
  'Can I claim for dental work?',
  'Is maternity covered under my policy?',
];

export default function Step3AskFinSaathi({ policy, onQuerySubmit, response, loading, error }) {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (!query.trim()) return;
    onQuerySubmit(query);
    setQuery('');
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Ask specific questions about coverage, treatments, or hospital bills.
        </h2>
        <p className="text-gray-600 mt-1">
          Grounded strictly in your indexed policy wording (Clause 3.1 through 8.4). No guesswork, no generic AI speculation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 tracking-wider">ACTIVE DOCUMENT PROFILE</p>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Loaded</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center">
                <ShieldCheck size={16} className="text-teal-700" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">{policy?.coverageType || 'Health Insurance Policy'}</p>
                <p className="text-xs text-gray-500">Policyholder: {policy?.holderName || 'Raj Kumar'}, Sum Insured: Rs.{policy?.coverageAmount?.toLocaleString('en-IN') || '5,00,000'}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">DEDUCTIBLE</p>
                <p className="text-xs font-bold text-gray-900">Rs.{policy?.deductible?.toLocaleString('en-IN') || '10,000'}</p>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">COPAY</p>
                <p className="text-xs font-bold text-gray-900">{((policy?.copay || 0.2) * 100).toFixed(0)}%</p>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">VALIDITY</p>
                <p className="text-xs font-bold text-gray-900">{policy?.validity || '2024'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">COMMON SCENARIOS TO TEST</p>
            <div className="space-y-2">
              {scenarios.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(s)}
                  className="w-full text-left text-xs text-gray-700 hover:text-teal-700 hover:bg-teal-50 p-2 rounded transition-colors"
                >
                  {'\u2192'} {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">ANSWER CONFIDENCE</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <div>
                  <p className="text-xs font-bold text-gray-900">Policy-Supported Answer</p>
                  <p className="text-xs text-gray-500">Directly stated in your policy document.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <div>
                  <p className="text-xs font-bold text-gray-900">Conditional</p>
                  <p className="text-xs text-gray-500">May require additional information or documentation.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <div>
                  <p className="text-xs font-bold text-gray-900">Not Covered</p>
                  <p className="text-xs text-gray-500">Excluded under your policy terms.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
            <p className="text-xs text-blue-800 font-bold mb-1">PROTOTYPE NOTE</p>
            <p className="text-xs text-blue-700">
              Answers are generated by an AI based on your uploaded policy document. For final claim decisions, contact your insurance provider directly.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          {response ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-xs font-bold text-teal-700">RK</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{policy?.holderName || 'Raj Kumar'} asked</p>
                  <p className="text-sm text-gray-600">"{response.query}"</p>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck size={16} className="text-teal-700" />
                  <p className="font-bold text-teal-900">FinSaathi AI Response</p>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-auto flex items-center gap-1">
                    <CheckCircle size={10} /> Policy-based Answer
                  </span>
                </div>

                <div className="text-sm text-teal-900 leading-relaxed whitespace-pre-wrap">
                  {response.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 shadow-sm text-center">
              <ShieldCheck size={48} className="text-teal-200 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Select a scenario from the left or type your question below.</p>
              <p className="text-xs text-gray-400">FinSaathi will answer based on your uploaded policy document.</p>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <p className="text-xs text-gray-500 tracking-wider mb-2">ASK ANOTHER POLICY OR BILLING QUESTION</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your query (e.g. 'Can I claim home nursing care?') or paste estimate bill..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-900"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !query.trim()}
            className="bg-teal-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-800 disabled:bg-gray-400 flex items-center gap-2 text-sm transition-colors"
          >
            {loading ? <Loader className="animate-spin" size={16} /> : <Send size={16} />}
            {loading ? '' : 'Consult Policy'}
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>FinSaathi answers based on your uploaded policy.</span>
          <span className="flex items-center gap-1"><CheckCircle size={10} className="text-green-500" /> Ready for queries</span>
        </div>
      </div>
    </div>
  );
}
