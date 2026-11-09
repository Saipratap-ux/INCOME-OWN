import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  IndianRupee, 
  ShieldCheck, 
  AlertCircle, 
  BarChart3, 
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';

export const RevenueCalculatorPage: React.FC = () => {
  const { setActiveTab } = useApp();

  // Interactive Sliders State (Defaults set to prompt's example: 900 users, 20% conversion)
  const [registeredUsers, setRegisteredUsers] = useState<number>(900);
  const [conversionRatePercent, setConversionRatePercent] = useState<number>(20);
  const [servicePriceINR, setServicePriceINR] = useState<number>(10);
  const [adViewsPerUser, setAdViewsPerUser] = useState<number>(12);
  const [adEcpmINR, setAdEcpmINR] = useState<number>(140);
  const [affiliateSalesCount, setAffiliateSalesCount] = useState<number>(15);
  const [sponsorshipTierINR, setSponsorshipTierINR] = useState<number>(5000);

  // Calculations
  const payingUsers = Math.round((registeredUsers * conversionRatePercent) / 100);
  const microServiceRevenue = payingUsers * servicePriceINR;

  const totalMonthlyAdImpressions = registeredUsers * adViewsPerUser;
  const advertisingRevenue = Math.round((totalMonthlyAdImpressions / 1000) * adEcpmINR);

  const affiliateRevenue = affiliateSalesCount * 180; // ₹180 avg commission per course/hosting sale
  const totalGrossRevenue = microServiceRevenue + advertisingRevenue + affiliateRevenue + sponsorshipTierINR;

  // Estimated platform costs & net estimate
  const paymentGatewayFee = Math.round(microServiceRevenue * 0.02); // 2% UPI/Payment gateway fee
  const estimatedNetRevenue = totalGrossRevenue - paymentGatewayFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <TrendingUp className="w-3.5 h-3.5" /> Interactive Business Forecaster
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
            Saipratap S❤️C Revenue Forecaster
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Simulate realistic, legitimate platform income across all four revenue streams without relying on unethical pay-per-login or recruitment fees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Configuration */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Adjust Community & Monetization Metrics
            </h2>
            <button
              onClick={() => {
                setRegisteredUsers(900);
                setConversionRatePercent(20);
                setServicePriceINR(10);
                setAdViewsPerUser(12);
                setSponsorshipTierINR(5000);
              }}
              className="text-xs text-rose-600 font-bold hover:underline"
            >
              Reset to Prompt Baseline (900 Users)
            </button>
          </div>

          {/* Slider 1: Registered Users */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Free Registered Community Members</span>
              <span className="font-mono font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md text-sm">
                {registeredUsers.toLocaleString()} users
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="25000"
              step="100"
              value={registeredUsers}
              onChange={(e) => setRegisteredUsers(Number(e.target.value))}
              className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>100 (Starter)</span>
              <span>900 (Baseline)</span>
              <span>10,000 (Growing)</span>
              <span>25,000 (Mature)</span>
            </div>
          </div>

          {/* Slider 2: % of Users Purchasing ₹10 Service */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Users Purchasing Genuine ₹10 Service</span>
              <span className="font-mono font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md text-sm">
                {conversionRatePercent}% ({payingUsers} paying members)
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={conversionRatePercent}
              onChange={(e) => setConversionRatePercent(Number(e.target.value))}
              className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Assumes realistic 10%–25% conversion of users purchasing curated high-value digital kits (not forced membership fee).
            </p>
          </div>

          {/* Slider 3: Ad Impressions & Views */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Monthly Ad Pageviews per Active Member</span>
              <span className="font-mono font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md text-sm">
                {adViewsPerUser} views/mo
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="40"
              step="2"
              value={adViewsPerUser}
              onChange={(e) => setAdViewsPerUser(Number(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Total monthly ad impressions: <strong className="text-slate-700 font-mono">{totalMonthlyAdImpressions.toLocaleString()} views</strong> @ avg eCPM of ₹{adEcpmINR}/1k.
            </p>
          </div>

          {/* Slider 4: Brand Sponsorships & Deals */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Monthly Business Sponsorships & Featured Banners</span>
              <span className="font-mono font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md text-sm">
                ₹{sponsorshipTierINR.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30000"
              step="1000"
              value={sponsorshipTierINR}
              onChange={(e) => setSponsorshipTierINR(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Real-Time Gross Revenue Projection Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-extrabold">
                Estimated Monthly Gross Revenue
              </span>
              <div className="text-4xl sm:text-5xl font-black font-heading text-white mt-1">
                ₹{totalGrossRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Projected monthly inflow to publisher account
              </p>
            </div>

            {/* Inflow Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  ₹10 Micro-Service Sales:
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  ₹{microServiceRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  AdSense / Partner Ads:
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  ₹{advertisingRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  Disclosed Affiliate Income:
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  ₹{affiliateRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Business Sponsorships:
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  ₹{sponsorshipTierINR.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Net settlement note */}
            <div className="pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
              <span>Est. Net after 2% payment gateway fee:</span>
              <span className="font-mono font-bold text-emerald-400">
                ₹{estimatedNetRevenue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Statutory Disclaimer Box */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Statutory RBI Compliance Disclaimer:
            </div>
            <p className="text-[11px] leading-relaxed">
              Illustrative calculation, before payment fees, refunds, taxes, and operating costs. Not guaranteed income.
              Do not make people pay ₹10 just to join, and then promise that the publisher earns money from every new member or that members earn by recruiting others. RBI explains that money-circulation and pyramid schemes based primarily on enrolling members are strictly prohibited in India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
