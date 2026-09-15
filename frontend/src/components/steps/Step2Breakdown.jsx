import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Copy,
  MapPin,
  Loader,
} from 'lucide-react';
import { checkNetworkHospital } from '../../lib/groqClient';
import { sampleNetworkHospitals } from '../../data/samplePolicies';

const clauseTabs = [
  'Deductible & Copay',
  'Covered Conditions',
  'Exclusions & Waiting Periods',
];

export default function Step2Breakdown({ policy }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hospitalQuery, setHospitalQuery] = useState('');
  const [departmentQuery, setDepartmentQuery] = useState('');
  const [networkResult, setNetworkResult] = useState(null);
  const [loadingNetwork, setLoadingNetwork] = useState(false);

  const handleNetworkCheck = async () => {
    if (!hospitalQuery || !departmentQuery) return;
    setLoadingNetwork(true);
    try {
      const result = await checkNetworkHospital(policy, hospitalQuery, departmentQuery, 'Bangalore');
      if (result) setNetworkResult(result);
    } catch {
      // demo fallback
    }
    setLoadingNetwork(false);
  };

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

      {/* Network Hospital Intelligence */}
      <div className="mt-8">
        <div className="mb-4">
          <p className="text-xs text-gray-500 tracking-wider">ENHANCEMENT #5</p>
          <h3 className="text-xl font-bold text-gray-900">Network Hospital Intelligence</h3>
          <p className="text-xs text-gray-400 mt-1">Check if a hospital + department is truly in-network before admission</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-xs text-gray-500 tracking-wider mb-4">HOSPITAL NETWORK CHECK</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Hospital Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apollo Hospitals"
                    value={hospitalQuery}
                    onChange={(e) => setHospitalQuery(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Department / Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Orthopedics, Cardiology"
                    value={departmentQuery}
                    onChange={(e) => setDepartmentQuery(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>
                <button
                  onClick={handleNetworkCheck}
                  disabled={loadingNetwork || !hospitalQuery || !departmentQuery}
                  className="w-full bg-teal-700 text-white py-3 rounded-lg text-sm font-semibold hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
                >
                  {loadingNetwork ? (
                    <><Loader size={16} className="animate-spin" /> Checking...</>
                  ) : (
                    <><MapPin size={16} /> Check Network Status</>
                  )}
                </button>
              </div>
            </div>

            {networkResult && (
              <div className="space-y-4">
                <div className={`rounded-xl border p-5 ${
                  networkResult.networkStatus === 'FULL_NETWORK' ? 'bg-green-50 border-green-200' :
                  networkResult.networkStatus === 'PARTIAL_NETWORK' ? 'bg-amber-50 border-amber-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{networkResult.hospital}</p>
                      <p className="text-xs text-gray-600">{networkResult.department}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      networkResult.networkStatus === 'FULL_NETWORK' ? 'bg-green-200 text-green-800' :
                      networkResult.networkStatus === 'PARTIAL_NETWORK' ? 'bg-amber-200 text-amber-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {networkResult.networkStatus === 'FULL_NETWORK' ? 'FULLY IN-NETWORK' :
                       networkResult.networkStatus === 'PARTIAL_NETWORK' ? 'PARTIAL NETWORK' :
                       'NOT IN-NETWORK'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall Hospital:</span>
                      <span className="font-semibold">{networkResult.details?.overallNetwork}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className={`font-semibold ${
                        networkResult.details?.youPayEverything ? 'text-red-600' : 'text-green-600'
                      }`}>{networkResult.details?.departmentNetwork}</span>
                    </div>
                    {networkResult.details?.youPayEverything && (
                      <p className="text-xs text-red-700 bg-red-100 p-2 rounded mt-2">
                        Cashless will NOT apply. You will need to pay everything upfront and file for reimbursement.
                      </p>
                    )}
                  </div>
                </div>

                {networkResult.alternativeNetworkHospitals?.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-xs text-gray-500 tracking-wider mb-3">ALTERNATIVE NETWORK HOSPITALS</p>
                    <div className="space-y-2">
                      {networkResult.alternativeNetworkHospitals.map((alt, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{alt.hospital}</p>
                            <p className="text-xs text-gray-600">{alt.departmentRating} - {alt.distance}</p>
                          </div>
                          <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-0.5 rounded">
                            {alt.networkStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {networkResult.whatToDoBefore?.length > 0 && (
                  <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
                    <p className="text-xs font-bold text-blue-900 mb-2">WHAT TO DO BEFORE ADMISSION</p>
                    <ul className="space-y-1">
                      {networkResult.whatToDoBefore.map((item, i) => (
                        <li key={i} className="text-sm text-blue-800 flex gap-2">
                          <span className="text-blue-500 flex-shrink-0">{i + 1}.</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-xs text-gray-500 tracking-wider mb-3">SAMPLE NETWORK HOSPITALS</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sampleNetworkHospitals.map((h, i) => (
                  <div key={i} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <p className="font-semibold text-sm text-gray-900">{h.hospital}</p>
                    <p className="text-xs text-gray-500">{h.city} - {h.rating}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {h.departments.slice(0, 3).map((d, j) => (
                        <span key={j} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{d}</span>
                      ))}
                    </div>
                    <span className={`text-xs font-semibold mt-2 inline-block ${
                      h.networkStatus === 'FULL_NETWORK' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {h.networkStatus === 'FULL_NETWORK' ? 'Fully Networked' : 'Partial Network'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-amber-600" />
                <p className="text-xs font-bold text-amber-800">KEY INSIGHT</p>
              </div>
              <p className="text-sm text-amber-900">
                "Network" does not always mean "fully covered." Hospital departments and specialties vary by network tier. Always verify the specific department before admission.
              </p>
            </div>

            <div className="bg-teal-50 rounded-xl border border-teal-200 p-5">
              <p className="text-xs font-bold text-teal-800 mb-1">PROTOTYPE NOTE</p>
              <p className="text-sm text-teal-900">
                This check uses sample data. In production, it would query real-time IRDA network hospital directories and your insurer's specific network list.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
