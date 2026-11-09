import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Smartphone, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  UserCheck 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    switchDemoUser, 
    loginWithEmailOrPhone, 
    showToast 
  } = useApp();

  const [mode, setMode] = useState<'otp' | 'demo'>('demo');
  const [identityInput, setIdentityInput] = useState('');
  const [otpInput, setOtpInput] = useState('123456');
  const [step, setStep] = useState<'identity' | 'verify'>('identity');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identityInput.trim()) {
      showToast('Please enter your mobile number or email ID', 'warning');
      return;
    }
    setStep('verify');
    showToast(`Verification code sent! For demo testing, use code: 123456`, 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginWithEmailOrPhone(identityInput, otpInput);
    if (success) {
      setStep('identity');
      setIdentityInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-heading">
                Saipratap S❤️C Access
              </h3>
              <p className="text-xs text-rose-100">
                100% Free Registration • Zero Hidden Fees
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 text-xs font-bold bg-slate-50">
          <button
            onClick={() => {
              setMode('demo');
              setStep('identity');
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              mode === 'demo'
                ? 'border-rose-600 text-rose-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Instant Persona Switcher
          </button>
          <button
            onClick={() => setMode('otp')}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              mode === 'otp'
                ? 'border-rose-600 text-rose-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Email / Mobile OTP
          </button>
        </div>

        <div className="p-6">
          {mode === 'demo' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Experience Saipratap S❤️C from any perspective: Community Member, Digital Creator, or Platform Publisher/Owner:
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    switchDemoUser('saipratap');
                    closeAuthModal();
                  }}
                  className="w-full p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      SP
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        Saipratap <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded">Platform Owner</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Publisher & Admin • Revenue analytics, bank withdrawals
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    switchDemoUser('rahul');
                    closeAuthModal();
                  }}
                  className="w-full p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      RS
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        Rahul Sharma <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded">Member</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        College student • Using free tools & earning reward points
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    switchDemoUser('priya');
                    closeAuthModal();
                  }}
                  className="w-full p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      PV
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        Priya Verma <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">Creator</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Freelance designer • Sharing posts and purchased tools
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Free to switch personas at any time during review.
              </div>
            </div>
          ) : (
            <div>
              {step === 'identity' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Indian Mobile Number or Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={identityInput}
                        onChange={(e) => setIdentityInput(e.target.value)}
                        placeholder="e.g. 9876543210 or name@gmail.com"
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Strict privacy: Mobile numbers are never displayed publicly.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold rounded-xl text-sm shadow-md hover:from-rose-700 hover:to-amber-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get 6-Digit OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Enter 6-Digit OTP sent to {identityInput}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full text-center tracking-widest text-lg font-bold py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                    />
                    <p className="text-[11px] text-emerald-600 mt-1 font-medium text-center">
                      Demo OTP pre-filled: 123456
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Verify & Access Saipratap S❤️C
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('identity')}
                    className="w-full text-xs text-slate-500 hover:text-slate-800 text-center"
                  >
                    ← Change Mobile / Email
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
