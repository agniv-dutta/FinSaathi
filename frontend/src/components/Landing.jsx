import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Upload,
  MessageSquare,
  FileSearch,
  Clock,
  GitCompare,
  ChevronRight,
  AlertTriangle,
  DollarSign,
  MapPin,
  ArrowRight,
  Zap,
  Lock,
} from 'lucide-react';

const features = [
  {
    icon: <Upload size={22} />,
    title: 'Policy Parsing',
    desc: 'Upload your health insurance PDF and get instant structured breakdowns — coverage, deductible, copay, exclusions.',
    tag: 'Core',
  },
  {
    icon: <MessageSquare size={22} />,
    title: 'AI Claim Advisor',
    desc: 'Ask any claim question in plain language. FinSaathi answers based on YOUR policy — not generic advice.',
    tag: 'Core',
  },
  {
    icon: <FileSearch size={22} />,
    title: 'Claim Analysis',
    desc: 'Line-item audit of hospital bills against your policy. See what is covered, excluded, or conditional before you pay.',
    tag: 'Core',
  },
  {
    icon: <DollarSign size={22} />,
    title: 'Pre-Auth Predictor',
    desc: 'Know your out-of-pocket cost BEFORE hospital admission. No surprise bills at the discharge counter.',
    tag: 'Enhancement',
  },
  {
    icon: <Clock size={22} />,
    title: 'Claim Tracker',
    desc: 'Real-time claim status with timeline. No more chasing between hospital and insurer.',
    tag: 'Enhancement',
  },
  {
    icon: <GitCompare size={22} />,
    title: 'Policy Comparison',
    desc: 'Compare your current policy vs alternatives. See if an upgrade is worth it before renewal.',
    tag: 'Enhancement',
  },
];

const painPoints = [
  { stat: '42 min', label: 'Avg time to find one coverage detail' },
  { stat: '45+ days', label: 'Average claim settlement time' },
  { stat: '60%', label: 'Claims have unexpected deductions' },
  { stat: '82%', label: 'Claim delays from missing documents' },
];

const steps = [
  {
    num: '01',
    title: 'Upload Policy',
    desc: 'Drop your health insurance PDF. FinSaathi parses it instantly — no manual entry.',
  },
  {
    num: '02',
    title: 'Understand Coverage',
    desc: 'See your deductible, copay, exclusions, and claim process in plain language.',
  },
  {
    num: '03',
    title: 'Ask Anything',
    desc: 'Get instant, policy-grounded answers to any claim question. No generic advice.',
  },
  {
    num: '04',
    title: 'File Smart Claims',
    desc: 'Pre-check documents, predict costs, track status — all in one place.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-700 rounded-lg p-1.5 flex items-center justify-center">
              <ShieldCheck className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">FinSaathi</h1>
              <p className="text-[10px] text-gray-500 tracking-wider">HEALTH INSURANCE CLAIMS ASSISTANT</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/app"
              className="text-sm font-semibold text-gray-600 hover:text-teal-700 transition px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              to="/app"
              className="bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-teal-800 transition flex items-center gap-2"
            >
              Get Started <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Zap size={12} /> Built for Paytm Build for India Hackathon
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Your health insurance,{' '}
                <span className="text-teal-700">finally understandable.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                FinSaathi decodes your policy, predicts claim costs, tracks settlements, and
                fights for fair deductions — so you don't have to.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/app"
                  className="bg-teal-700 text-white px-8 py-3.5 rounded-lg text-sm font-bold hover:bg-teal-800 transition flex items-center gap-2 shadow-lg shadow-teal-700/20"
                >
                  Try Demo Policy <ArrowRight size={16} />
                </Link>
                <a
                  href="#how-it-works"
                  className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-lg text-sm font-bold hover:bg-gray-50 transition"
                >
                  See How It Works
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><Lock size={12} className="text-teal-600" /> No sign-up required</span>
                <span className="flex items-center gap-1.5"><Zap size={12} className="text-teal-600" /> Sub-2s AI responses</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-teal-600" /> Policy-grounded answers</span>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs text-gray-400 ml-2 font-mono">FinSaathi — Claims Dashboard</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">POLICY</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">Active</span>
                  </div>
                  <p className="font-bold text-gray-900">HDFC Health Insurance</p>
                  <p className="text-xs text-gray-500">#HDFC/0125/2024 — Raj Kumar</p>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-teal-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-teal-700">5L</p>
                    <p className="text-[10px] text-teal-600">Sum Insured</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-amber-700">10K</p>
                    <p className="text-[10px] text-amber-600">Deductible</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-blue-700">20%</p>
                    <p className="text-[10px] text-blue-600">Copay</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare size={12} className="text-teal-600" />
                    <span className="text-[10px] text-gray-500 font-semibold">AI QUERY</span>
                  </div>
                  <p className="text-xs text-gray-700 italic">"I had knee surgery last month. What's my coverage?"</p>
                  <div className="mt-2 bg-white rounded p-2 border border-gray-100">
                    <p className="text-[10px] text-gray-600">Eligibility: Yes — Surgery is covered at 100% after Rs.10,000 deductible is satisfied.</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-teal-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                9 integrated tools
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs text-teal-400 tracking-wider font-semibold mb-2">THE PROBLEM</p>
            <h3 className="text-3xl font-extrabold">India's claims system is broken.</h3>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
              50M+ policyholders face the same frustration every day. FinSaathi exists because these numbers are unacceptable.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((p, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-gray-800 border border-gray-700">
                <p className="text-3xl font-extrabold text-teal-400 mb-2">{p.stat}</p>
                <p className="text-sm text-gray-400">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-teal-600 tracking-wider font-semibold mb-2">9 INTEGRATED TOOLS</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Everything you need to fight for your claim.</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From policy parsing to pre-auth prediction to appeal escalation — one assistant, zero guesswork.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-200 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-lg flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition">
                    {f.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    f.tag === 'Core' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {f.tag}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{f.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-teal-600 tracking-wider font-semibold mb-2">HOW IT WORKS</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-3">From confusion to clarity in 4 steps.</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
                  <span className="text-4xl font-extrabold text-teal-100 mb-3 block">{s.num}</span>
                  <h4 className="font-bold text-gray-900 mb-2">{s.title}</h4>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight size={20} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhancements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs text-teal-600 tracking-wider font-semibold mb-2">BEYOND THE BASICS</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                6 enhancements that solve real pain points.
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Each feature is backed by documented insurance claim pain points — IRDA data, industry reports, and real customer frustrations.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <DollarSign size={16} />, title: 'Pre-Auth Predictor', desc: 'Know your bill before admission' },
                  { icon: <Clock size={16} />, title: 'Claim Tracker', desc: 'Real-time status updates' },
                  { icon: <FileSearch size={16} />, title: 'Document Compliance', desc: 'Validate before submission' },
                  { icon: <AlertTriangle size={16} />, title: 'Deduction Explainer', desc: 'Understand every deduction' },
                  { icon: <MapPin size={16} />, title: 'Network Intelligence', desc: 'Verify hospital + department' },
                  { icon: <GitCompare size={16} />, title: 'Policy Comparison', desc: 'Upgrade decisions with data' },
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition">
                    <div className="w-8 h-8 bg-teal-50 text-teal-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      {e.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{e.title}</p>
                      <p className="text-xs text-gray-500">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 p-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign size={16} className="text-teal-700" />
                  <p className="text-xs font-bold text-gray-700 tracking-wider">PRE-AUTH PREDICTOR</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hospital Estimate:</span>
                    <span className="font-bold">Rs.2,20,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurer Approval:</span>
                    <span className="font-bold text-green-600">Rs.1,52,000</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Your Liability:</span>
                    <span className="font-bold">Rs.68,000</span>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-2">Negotiation Tips:</p>
                    <p className="text-xs text-teal-700 bg-teal-50 p-2 rounded">Room rent cap: Rs.4,500/day. Negotiate upgrade within this limit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-extrabold text-white mb-4">
            Stop guessing. Start claiming smart.
          </h3>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto">
            Upload your policy, ask your questions, and get instant AI-powered answers grounded in YOUR coverage terms.
          </p>
          <Link
            to="/app"
            className="bg-white text-teal-700 px-10 py-4 rounded-lg text-sm font-bold hover:bg-gray-50 transition inline-flex items-center gap-2 shadow-lg"
          >
            Launch FinSaathi <ArrowRight size={16} />
          </Link>
          <p className="text-teal-200 text-xs mt-4">No sign-up required. Free for all policyholders.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-teal-700 rounded-lg p-1.5">
                <ShieldCheck className="text-white" size={18} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">FinSaathi</p>
                <p className="text-xs text-gray-500">AI Health Insurance Claims Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
              <Link to="/app" className="hover:text-white transition">Launch App</Link>
            </div>
            <div className="text-xs text-gray-600">
              <p>Prototype v2.0 — Paytm Build for India Hackathon</p>
              <p className="mt-1">&copy; 2024 FinSaathi</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
