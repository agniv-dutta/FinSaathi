import React, { useState } from 'react';
import {
  DollarSign,
  AlertTriangle,
  ChevronDown,
  Clock,
  Loader,
} from 'lucide-react';
import { analyzePreAuth } from '../../lib/groqClient';

export default function Step7PreAuth({ policy }) {
  const [hospital, setHospital] = useState('');
  const [procedure, setProcedure] = useState('');
  const [roomCategory, setRoomCategory] = useState('standard');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const handlePredict = async () => {
    if (!hospital || !procedure) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzePreAuth(policy, hospital, procedure, roomCategory);
      if (result) {
        setPrediction(result);
        const initial = {};
        (result.preAuthChecklist || []).forEach((_, i) => { initial[i] = false; });
        setCheckedItems(initial);
      } else {
        setError('Could not generate pre-auth estimate. Try again.');
      }
    } catch {
      setError('Failed to connect to AI service. Check API key.');
    }
    setLoading(false);
  };

  const toggleCheck = (i) => setCheckedItems((p) => ({ ...p, [i]: !p[i] }));

  const sampleHospitals = ['Apollo Hospitals Bangalore', 'Manipal Hospital Bangalore', 'Fortis Healthcare Delhi'];
  const sampleProcedures = ['Knee Replacement Surgery', 'Appendectomy', 'Cardiac Bypass Surgery', 'Cataract Surgery'];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pre-Authorization Predictor</h2>
        <p className="text-gray-600 mt-1">
          Predict your hospital bill breakdown BEFORE admission. Know your out-of-pocket cost upfront.
        </p>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">Enhancement #1</span>
          <span>Powered by policy analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-4">HOSPITAL & PROCEDURE DETAILS</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Hospital Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apollo Hospitals Bangalore"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
                <div className="flex gap-2 mt-2">
                  {sampleHospitals.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHospital(h)}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition"
                    >
                      {h.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Planned Procedure</label>
                <input
                  type="text"
                  placeholder="e.g. Knee Replacement Surgery"
                  value={procedure}
                  onChange={(e) => setProcedure(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
                <div className="flex gap-2 mt-2">
                  {sampleProcedures.map((p) => (
                    <button
                      key={p}
                      onClick={() => setProcedure(p)}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition"
                    >
                      {p.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Room Category</label>
                <select
                  value={roomCategory}
                  onChange={(e) => setRoomCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                >
                  <option value="standard">Standard Single Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="icu">ICU</option>
                </select>
              </div>

              <button
                onClick={handlePredict}
                disabled={loading || !hospital || !procedure}
                className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold text-sm hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
              >
                {loading ? (
                  <><Loader size={16} className="animate-spin" /> Predicting...</>
                ) : (
                  <><DollarSign size={16} /> Get Pre-Auth Estimate</>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>
          )}

          {prediction && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500 tracking-wider">INSURER LIKELY APPROVAL</p>
                    <p className="text-xs text-gray-400">Based on your policy terms and procedure type</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    Rs.{prediction.estimatedCoverage?.totalEstimatedApproval?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Surgery Fees Covered</span>
                    <span className="font-semibold">Rs.{prediction.estimatedCoverage?.surgeryFeesCovered?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Room Rent (Capped)</span>
                    <span className="font-semibold">Rs.{prediction.estimatedCoverage?.roomRentCap?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Deductible Applied</span>
                    <span className="font-semibold text-red-600">-Rs.{prediction.estimatedCoverage?.deductibleApplied?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 border-t pt-2">
                    <span>Co-pay ({prediction.estimatedCoverage?.copayPercentage}%)</span>
                    <span className="font-semibold">Applied after deductible</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-blue-900 tracking-wider">YOUR ESTIMATED OUT-OF-POCKET</p>
                  <span className="text-2xl font-bold text-blue-600">
                    Rs.{prediction.patientLiability?.estimatedOutOfPocket?.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-blue-700">Certainty: {prediction.patientLiability?.certaintyLevel}</p>
                <p className="text-xs text-blue-600 mt-1">Due at hospital discharge counter</p>
              </div>

              {prediction.negotiationTips?.length > 0 && (
                <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
                  <p className="text-xs font-bold text-amber-900 tracking-wider mb-3">NEGOTIATION TIPS</p>
                  <ul className="space-y-2">
                    {prediction.negotiationTips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-sm text-amber-800">
                        <ChevronDown size={14} className="mt-0.5 rotate-[-90deg] flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <p className="text-xs text-gray-500 tracking-wider mb-3">PRE-AUTH CHECKLIST</p>
                <div className="space-y-2">
                  {(prediction.preAuthChecklist || []).map((item, i) => (
                    <label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!checkedItems[i]}
                        onChange={() => toggleCheck(i)}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">PRE-AUTH WINDOW</p>
            {prediction ? (
              <div className="space-y-3">
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-teal-700" />
                    <p className="font-bold text-teal-900">{prediction.preAuthWindow}</p>
                  </div>
                  <p className="text-xs text-teal-700">Typical for network hospitals</p>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="font-semibold text-gray-700">Timeline:</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span className="text-gray-600">Day 1: Submit hospital estimate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-gray-600">Day 2-3: Insurer review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-600">Day 3: Approval/Rejection</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Enter hospital and procedure details to see the pre-auth timeline.</p>
            )}
          </div>

          <div className="bg-teal-50 rounded-xl border border-teal-200 p-5">
            <p className="text-xs font-bold text-teal-800 mb-1">PROTOTYPE NOTE</p>
            <p className="text-sm text-teal-900">
              This estimate is based on your policy terms and typical hospital charges. In production, this would integrate with real hospital pricing databases and insurer pre-auth systems.
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-amber-600" />
              <p className="text-xs font-bold text-amber-800">KEY INSIGHT</p>
            </div>
            <p className="text-sm text-amber-900">
              78% of health claims involve pre-auth delays. Getting a prediction before admission helps you negotiate better and avoid surprise bills at the discharge counter.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 tracking-wider mb-2">YOUR POLICY</p>
            <p className="font-bold text-gray-900">{policy?.holderName || 'Raj Kumar'}</p>
            <p className="text-xs text-gray-500">{policy?.insurer || 'HDFC Health Insurance'} - #{policy?.policyNumber || 'HDFC/0125/2024'}</p>
            <p className="text-xs text-gray-500">Sum Insured: Rs.{policy?.coverageAmount?.toLocaleString('en-IN') || '5,00,000'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
