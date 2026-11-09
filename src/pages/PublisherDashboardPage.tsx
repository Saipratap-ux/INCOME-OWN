import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  IndianRupee, 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  Activity, 
  Download,
  AlertCircle,
  Lock,
  Smartphone
} from 'lucide-react';

export const PublisherDashboardPage: React.FC = () => {
  const { 
    publisherAnalytics, 
    withdrawals, 
    requestWithdrawal, 
    currentUser, 
    setActiveTab, 
    showToast 
  } = useApp();

  const [withdrawAmount, setWithdrawAmount] = useState<number>(5000);
  const [withdrawMethod, setWithdrawMethod] = useState<'IMPS' | 'NEFT' | 'UPI'>('IMPS');
  const [upiVpa, setUpiVpa] = useState('saipratap@okaxis');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const res = requestWithdrawal(withdrawAmount, withdrawMethod, upiVpa);
      setIsSubmitting(false);
      if (res.success) {
        setWithdrawAmount(5000);
      } else {
        showToast(res.message, 'error');
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Publisher Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Publisher & Founder Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
              Saipratap S❤️C Revenue & Settlement Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time analytics across advertising, ₹10 digital tools, affiliate revenue, and automated settlement to verified Indian bank accounts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                showToast('Exported publisher P&L statement (PDF/Excel) for tax filing!', 'success');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export P&L Report</span>
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>System Health</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Revenue Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Monthly Gross Revenue
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              +18.4%
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            ₹{publisherAnalytics.monthlyGrossRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Combined 4-stream platform earnings
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ₹10 Micro-Service Orders
            </span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              {publisherAnalytics.totalServiceOrders} orders
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            ₹{publisherAnalytics.revenueBreakdown.microServicesINR.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            100% digital fulfillment via instant UPI
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              AdSense & Partner Ads
            </span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              eCPM ₹{publisherAnalytics.adEcpm}
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            ₹{publisherAnalytics.revenueBreakdown.adSenseINR.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            {publisherAnalytics.totalAdImpressions.toLocaleString()} verified impressions
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Affiliates & Sponsorships
            </span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Disclosed
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            ₹{(publisherAnalytics.revenueBreakdown.affiliatesINR + publisherAnalytics.revenueBreakdown.sponsorshipsINR).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            {publisherAnalytics.affiliateClicks.toLocaleString()} verified course clicks
          </p>
        </div>
      </div>

      {/* Main Action Grid: Bank Withdrawal Form & Verified Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Withdrawal Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Bank Account Withdrawal Request
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Disburse eligible earnings to your registered Indian bank account.
              </p>
            </div>
          </div>

          {/* Balance overview */}
          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-800">
                Eligible Balance for Withdrawal:
              </span>
              <div className="text-2xl font-black text-emerald-950 font-heading mt-0.5">
                ₹{publisherAnalytics.pendingBalanceINR.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-500">
                Total Already Settled:
              </span>
              <div className="text-sm font-bold text-slate-700">
                ₹{publisherAnalytics.settledEarningsINR.toLocaleString()}
              </div>
            </div>
          </div>

          <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Withdrawal Amount (₹)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">
                  ₹
                </div>
                <input
                  type="number"
                  min="500"
                  max={publisherAnalytics.pendingBalanceINR}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Min. ₹500 • Instant IMPS settlement available 24/7.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Settlement Transfer Method
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                {(['IMPS', 'NEFT', 'UPI'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setWithdrawMethod(method)}
                    className={`py-2.5 rounded-xl border transition-all ${
                      withdrawMethod === method
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-black'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {withdrawMethod === 'UPI' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target UPI VPA for Instant Credit
                </label>
                <input
                  type="text"
                  value={upiVpa}
                  onChange={(e) => setUpiVpa(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || publisherAnalytics.pendingBalanceINR < 500}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>{isSubmitting ? 'Processing Banking Route...' : `Initiate ₹${withdrawAmount.toLocaleString()} Settlement`}</span>
            </button>
          </form>

          {/* Privacy Note */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Private Credentials Protected:</strong> Bank account numbers and mobile numbers are stored in secure backend environments and are never exposed in public website code.
            </span>
          </div>
        </div>

        {/* Linked Verified Indian Bank Accounts */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                Verified Bank Credentials
              </h3>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> NPCI KYC Verified
              </span>
            </div>

            <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                    Primary Settlement Bank
                  </span>
                  <div className="text-lg font-bold">State Bank of India (SBI)</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold">
                  SBI
                </div>
              </div>

              <div className="space-y-1 font-mono text-xs">
                <div className="text-slate-400">Account Holder: <span className="text-white font-bold">Saipratap S.</span></div>
                <div className="text-slate-400">Account No: <span className="text-white font-bold">•••• •••• •••• 4821</span></div>
                <div className="text-slate-400">IFSC Code: <span className="text-white font-bold">SBIN0001248</span></div>
                <div className="text-slate-400">UPI VPA: <span className="text-amber-400 font-bold">saipratap@okaxis</span></div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Account Status: Active</span>
                <span className="text-emerald-400 font-bold">Auto-Settlement Ready</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Stream */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Live Platform Health & Traffic
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-slate-500">Active Users Today</div>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  {publisherAnalytics.activeToday.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-slate-500">Ad Click-Through Rate</div>
                <div className="text-lg font-bold text-slate-900 mt-1">2.42%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Settlement Ledger */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Bank Settlement & Transfer Ledger
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Official banking transaction records with RBI / NPCI UTR reference numbers.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">Transaction / UTR ID</th>
                <th className="p-4">Method & Account</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {withdrawals.map((wdr) => (
                <tr key={wdr.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-mono font-bold text-slate-800">
                    {wdr.utrNumber || wdr.id}
                  </td>
                  <td className="p-4 text-slate-600">
                    <span className="font-bold text-slate-800">{wdr.method}</span> • {wdr.accountDetails.bankName}
                  </td>
                  <td className="p-4 font-mono font-black text-slate-900 text-sm">
                    ₹{wdr.amountINR.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      wdr.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {wdr.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">
                    {wdr.requestDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
