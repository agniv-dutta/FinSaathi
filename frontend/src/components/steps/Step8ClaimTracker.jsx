import React, { useState } from 'react';
import {
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { sampleClaimHistory } from '../../data/samplePolicies';

const statusIcons = {
  approved: <CheckCircle className="text-green-600" size={24} />,
  query_raised: <AlertCircle className="text-amber-600" size={24} />,
  under_review: <Clock className="text-blue-600" size={24} />,
  rejected: <AlertCircle className="text-red-600" size={24} />,
  submitted: <Clock className="text-gray-600" size={24} />,
};

export default function Step8ClaimTracker({ policy }) {
  const [claimData] = useState(sampleClaimHistory[0]);
  const [lastChecked, setLastChecked] = useState(new Date());

  const refreshStatus = () => {
    setLastChecked(new Date());
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Real-Time Claim Tracker</h2>
        <p className="text-gray-600 mt-1">
          Track your claim status with live updates. No more chasing between hospital and insurer.
        </p>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">Enhancement #2</span>
          <span>Async claim status monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-500">CLAIM REFERENCE</p>
                <p className="font-mono font-bold text-lg text-gray-900">{claimData.ref}</p>
              </div>
              {statusIcons[claimData.status]}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-1">Current Status</p>
              <p className="text-xl font-semibold text-blue-900">{claimData.statusUpdate}</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-bold text-gray-900">{claimData.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${claimData.progress}%` }}
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg mb-4">
              <p className="text-xs text-gray-500 mb-1">NEXT STEP</p>
              <p className="text-sm font-semibold text-gray-900">{claimData.nextStep}</p>
              <p className="text-xs text-gray-500 mt-1">Expected: {claimData.expectedTimeline}</p>
            </div>

            {claimData.whatToWatch?.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
                <p className="text-xs font-bold text-amber-900 mb-2">WHAT TO WATCH</p>
                <ul className="space-y-1">
                  {claimData.whatToWatch.map((item, i) => (
                    <li key={i} className="text-sm text-amber-800 flex gap-2">
                      <span className="text-amber-500 flex-shrink-0">-</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {claimData.status === 'query_raised' && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-sm font-semibold text-red-900 mb-2">Insurer has raised a query</p>
                <p className="text-sm text-red-800 mb-3">
                  The insurer is asking for additional documents. We can help you prepare a response with the right policy references.
                </p>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center justify-center gap-2">
                  <AlertCircle size={14} /> Respond to Query with Policy References
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-500 tracking-wider">CLAIM TIMELINE</p>
              <button
                onClick={refreshStatus}
                className="text-xs text-teal-600 hover:text-teal-800 flex items-center gap-1"
              >
                <RefreshCw size={12} /> Refresh
              </button>
            </div>

            <div className="space-y-0">
              {claimData.timeline.map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        event.completed ? 'bg-green-600' : i === claimData.timeline.findIndex((e) => !e.completed) ? 'bg-blue-500 ring-2 ring-blue-200' : 'bg-gray-300'
                      }`}
                    />
                    {i < claimData.timeline.length - 1 && (
                      <div className={`w-0.5 h-10 ${event.completed ? 'bg-green-600' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`font-semibold text-sm ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {event.label}
                    </p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                    {event.details && (
                      <p className="text-xs text-gray-600 mt-1">{event.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">QUICK STATUS</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Claim Amount:</span>
                <span className="font-bold text-gray-900">Rs.1,42,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Filed On:</span>
                <span className="font-bold text-gray-900">Sep 2, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Days Since Filing:</span>
                <span className="font-bold text-amber-600">13 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Checked:</span>
                <span className="font-bold text-gray-900">{lastChecked.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">NOTIFICATION PREFERENCES</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                Status changes
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                Query raised
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                Approval/Rejection
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                Weekly summary
              </label>
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl border border-teal-200 p-5">
            <p className="text-xs font-bold text-teal-800 mb-1">PROTOTYPE NOTE</p>
            <p className="text-sm text-teal-900">
              This tracker uses sample claim data to demonstrate the real-time tracking concept. In production, it would poll your insurer's TPA portal and push status notifications automatically.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">YOUR POLICY</p>
            <p className="font-bold text-gray-900">{policy?.holderName || 'Raj Kumar'}</p>
            <p className="text-xs text-gray-500">{policy?.insurer || 'HDFC Health Insurance'} - #{policy?.policyNumber || 'HDFC/0125/2024'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
