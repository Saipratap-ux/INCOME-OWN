import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck, Lock, Activity, CheckCircle2, IndianRupee } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm">
      {/* Trust & Compliance Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm flex items-center gap-2 justify-center md:justify-start">
                100% RBI & NPCI Compliance Guarantee
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  Verified Ethical
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Zero entry fee. No pay-per-login or recruitment-based pyramid models. Pure value-driven digital tools & community.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Lock className="w-3.5 h-3.5 text-amber-400" /> 256-Bit TLS Security
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> UPI & Bank Sourced
            </span>
            <button
              onClick={() => handleNav('health')}
              className="flex items-center gap-1.5 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-800 transition-colors cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Weekly Health Check: 99.98% Healthy
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-md text-white font-extrabold text-sm">
                S<Heart className="w-3.5 h-3.5 fill-white inline mx-0.5" />C
              </div>
              <span className="text-xl font-black text-white tracking-tight font-heading">
                Saipratap S<span className="text-rose-500">❤️</span>C
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India's Free Digital Community & Earning Platform. Dedicated to empowering students, freelancers, job seekers, and digital creators across India with high-quality free tools, transparent monetization, and legitimate community networking.
            </p>
            <p className="text-xs font-semibold text-amber-400/90 italic">
              "Connecting People, Creating Opportunities."
            </p>
            <div className="pt-2">
              <span className="text-xs text-slate-500 block">Founded & Published by:</span>
              <span className="text-xs font-bold text-slate-300">Saipratap • India</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Platform
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tools')} className="hover:text-white transition-colors">
                  Free Digital Tools
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('explore')} className="hover:text-white transition-colors">
                  ₹10 Micro-Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('community')} className="hover:text-white transition-colors">
                  Community Discussions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rewards')} className="hover:text-white transition-colors">
                  Rewards & Scratch Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Monetization & Business */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Earning & Publisher
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('calculator')} className="hover:text-white transition-colors">
                  Interactive Revenue Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('publisher')} className="hover:text-white transition-colors">
                  Publisher Analytics & Ledger
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('publisher')} className="hover:text-white transition-colors">
                  Bank Account Withdrawals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('payments')} className="hover:text-white transition-colors">
                  Payment History & Invoices
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('health')} className="hover:text-white transition-colors">
                  System Health & Uptime
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Compliance & Help
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('support')} className="hover:text-white transition-colors">
                  RBI Compliance Notice
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('support')} className="hover:text-white transition-colors">
                  NPCI UPI Payment Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('support')} className="hover:text-white transition-colors">
                  Terms of Service & Privacy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('support')} className="hover:text-white transition-colors">
                  Digital Delivery & Refunds
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('support')} className="hover:text-white transition-colors">
                  Customer Grievance Officer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Regulatory Disclaimer as mandated by user prompt */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-2">
          <p className="leading-relaxed">
            <strong className="text-slate-400">Statutory Notice on Earning Models:</strong> Saipratap S❤️C operates under the guidelines of the Reserve Bank of India (RBI FAQ View Id 92) and the Prize Chits and Money Circulation Schemes (Banning) Act, 1978. Saipratap S❤️C is not a money-circulation, get-rich-quick, or multi-level marketing (MLM) platform. We never ask users to pay any fee simply to register, login, or recruit other users.
          </p>
          <p className="leading-relaxed">
            <strong className="text-slate-400">UPI Payment Security:</strong> All digital service purchases (such as optional ₹10 utility packs) are processed through accredited Indian acquiring bank gateways under NPCI regulations. Customer mobile numbers and bank credentials are kept confidential and are never published in source code or publicly displayed.
          </p>
        </div>

        {/* Copyright bar */}
        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Saipratap S❤️C. All rights reserved across India.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for India
            </span>
            <span className="text-slate-700">•</span>
            <span>Version 2.4 (Live)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
