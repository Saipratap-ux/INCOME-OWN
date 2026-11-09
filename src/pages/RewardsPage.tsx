import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Coins, 
  Gift, 
  Calendar, 
  Share2, 
  Copy, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const { 
    currentUser, 
    claimDailyCheckIn, 
    scratchCardReward, 
    showToast 
  } = useApp();

  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [scratchReward, setScratchReward] = useState<{ points: number; inr: number } | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [redeemMethod, setRedeemMethod] = useState<'upi' | 'amazon'>('upi');
  const [redeemUpi, setRedeemUpi] = useState('rahul99@oksbi');

  const referralLink = `${window.location.origin}/?ref=${currentUser.referralCode}`;

  const handleScratch = () => {
    if (scratchRevealed) return;
    setIsScratching(true);
    setTimeout(() => {
      const res = scratchCardReward();
      setScratchReward({ points: res.wonPoints, inr: res.wonINR });
      setScratchRevealed(true);
      setIsScratching(false);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 800);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'success');
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser.rewardPoints < 200) {
      showToast('Minimum points for redemption is 200 points (= ₹20). Keep using free tools!', 'warning');
      return;
    }
    setRedeemModalOpen(false);
    showToast(`Redemption request of ₹${Math.floor(currentUser.rewardPoints / 10)} submitted! Payout processed via ${redeemMethod.toUpperCase()}.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
              <Coins className="w-3.5 h-3.5" /> Transparent Value Rewards
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
              Earn Rewards by Contributing & Learning
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Earn community points for daily engagement, using digital tools, and answering peer queries. Redeem directly for UPI cash or digital gift cards.
            </p>
          </div>

          {/* User Scorecard */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex items-center gap-6 shrink-0">
            <div>
              <p className="text-[11px] text-amber-200 font-bold uppercase tracking-wider">
                Reward Points
              </p>
              <p className="text-3xl font-black font-heading mt-0.5">
                {currentUser.rewardPoints}
              </p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <p className="text-[11px] text-amber-200 font-bold uppercase tracking-wider">
                Wallet Cash
              </p>
              <p className="text-3xl font-black font-heading mt-0.5">
                ₹{currentUser.walletBalanceINR}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Daily Check-in & Scratch Card */}
        <div className="lg:col-span-7 space-y-6">
          {/* Daily Streak Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Daily Learning Streak: {currentUser.streakDays} Days
                  </h3>
                  <p className="text-xs text-slate-500">
                    Check in every day to claim bonus points and maintain your streak!
                  </p>
                </div>
              </div>
              <button
                onClick={claimDailyCheckIn}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Claim Today's Bonus
              </button>
            </div>

            {/* Streak days pills */}
            <div className="grid grid-cols-7 gap-2 pt-2 border-t border-slate-100">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const isPassed = day <= (currentUser.streakDays % 7 || 7);
                return (
                  <div
                    key={day}
                    className={`p-2.5 rounded-xl text-center border text-xs font-bold ${
                      isPassed
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div>Day {day}</div>
                    <div className="text-[10px] font-semibold mt-0.5">
                      {isPassed ? '✓ Done' : '+15 Pts'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Scratch Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-rose-600" />
                Daily Mystery Scratch Card
              </h3>
              <span className="text-xs font-bold text-slate-500">
                1 Free Scratch Available
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl text-center relative overflow-hidden">
              {scratchRevealed && scratchReward ? (
                <div className="space-y-3 animate-in zoom-in-95">
                  <span className="text-4xl">🎉</span>
                  <h4 className="text-2xl font-black text-amber-400 font-heading">
                    +{scratchReward.points} Points & ₹{scratchReward.inr} Cash!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Credited instantly to your Saipratap S❤️C wallet balance!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-w-xs">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 mx-auto flex items-center justify-center text-amber-300 text-2xl border border-white/20">
                    🎁
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Tap to Scratch & Reveal
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Win up to 100 reward points & instant UPI wallet credit.
                    </p>
                  </div>
                  <button
                    onClick={handleScratch}
                    disabled={isScratching}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                  >
                    {isScratching ? 'Scratching...' : 'Reveal My Reward'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Transparent Referral & Redemption */}
        <div className="lg:col-span-5 space-y-6">
          {/* Redeem Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Points Payout & Redemption</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                100 Pts = ₹10
              </span>
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              Convert your accumulated activity points into real UPI direct cashback or Amazon gift cards.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Available to Redeem:</span>
                <span className="font-bold text-slate-900">{currentUser.rewardPoints} Points</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Estimated Cash Value:</span>
                <span className="font-bold text-emerald-600 font-mono text-sm">
                  ₹{Math.floor(currentUser.rewardPoints / 10)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setRedeemModalOpen(true)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Request UPI / Voucher Payout
            </button>
          </div>

          {/* Referral Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-rose-600" />
                Invite Friends Transparently
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +50 Pts
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Share your link with friends. They get free access to all 5 digital tools, and you earn 50 reward points when they verify their free account.
            </p>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-600">
                Your Referral Code:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentUser.referralCode}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-800"
                />
                <button
                  onClick={() => handleCopy(currentUser.referralCode, 'Referral Code')}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
              </div>
            </div>

            {/* Strict Anti-Pyramid Disclosure as mandated by prompt */}
            <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                RBI Anti-Money Circulation Compliance:
              </div>
              <p className="leading-relaxed">
                Joining is 100% free with no deposit. Users never earn commissions by recruiting people into paying money. Rewards are non-cash community tokens sponsored strictly by platform advertising revenue.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Redemption Dialog */}
      {redeemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Redeem Community Points
            </h3>
            <p className="text-xs text-slate-500">
              Redeeming {currentUser.rewardPoints} points = ₹{Math.floor(currentUser.rewardPoints / 10)}
            </p>

            <form onSubmit={handleRedeem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payout Method
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setRedeemMethod('upi')}
                    className={`py-2 rounded-xl border transition-all ${
                      redeemMethod === 'upi' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Direct UPI Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRedeemMethod('amazon')}
                    className={`py-2 rounded-xl border transition-all ${
                      redeemMethod === 'amazon' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Amazon India E-Voucher
                  </button>
                </div>
              </div>

              {redeemMethod === 'upi' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your UPI ID / VPA
                  </label>
                  <input
                    type="text"
                    value={redeemUpi}
                    onChange={(e) => setRedeemUpi(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                    required
                  />
                </div>
              ) : (
                <div className="text-xs text-slate-600 p-3 bg-slate-50 rounded-xl">
                  Voucher code will be sent to your verified registered email: <strong>{currentUser.email}</strong>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRedeemModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Confirm Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
