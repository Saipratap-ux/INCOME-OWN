import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  Building2, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  Info
} from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { 
    isPaymentModalOpen, 
    activePaymentService, 
    closePaymentModal, 
    completePayment, 
    currentUser,
    showToast 
  } = useApp();

  const [paymentTab, setPaymentTab] = useState<'upi_qr' | 'upi_apps' | 'upi_id' | 'netbanking' | 'card'>('upi_qr');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [processing, setProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [timeLeft, setTimeLeft] = useState(299); // 5 min timer

  useEffect(() => {
    if (!isPaymentModalOpen) return;
    setTimeLeft(299);
    setProcessing(false);
    setProcessStep('');
  }, [isPaymentModalOpen]);

  useEffect(() => {
    if (!isPaymentModalOpen || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaymentModalOpen, timeLeft]);

  if (!isPaymentModalOpen || !activePaymentService) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleSimulatePayment = async (method: 'UPI' | 'QR' | 'NetBanking' | 'Card', specificUpiId?: string) => {
    setProcessing(true);
    setProcessStep('Connecting to NPCI UPI Gateway...');
    
    await new Promise((r) => setTimeout(r, 600));
    setProcessStep('Verifying merchant settlement route with acquiring bank...');
    
    await new Promise((r) => setTimeout(r, 700));
    setProcessStep('Confirming digital asset instant delivery...');
    
    await new Promise((r) => setTimeout(r, 500));
    setProcessing(false);
    
    await completePayment(
      activePaymentService, 
      method, 
      specificUpiId || upiIdInput || `${currentUser.name.toLowerCase().replace(/\s+/g, '')}@okaxis`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  NPCI Certified UPI Gateway
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                Saipratap S❤️C Merchant Checkout
              </h3>
            </div>
          </div>
          <button
            onClick={closePaymentModal}
            disabled={processing}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
            aria-label="Close payment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Summary Pill */}
        <div className="bg-amber-50/90 border-b border-amber-200/80 px-5 py-3 flex items-center justify-between">
          <div className="pr-4">
            <p className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
              Selected Digital Service:
            </p>
            <p className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
              {activePaymentService.title}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-400 line-through mr-1.5">
              ₹{activePaymentService.originalPriceINR}
            </span>
            <span className="text-xl font-extrabold text-slate-900 font-heading">
              ₹{activePaymentService.priceINR}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {processing ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin flex items-center justify-center"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Processing Secure Transaction
              </h4>
              <p className="text-sm text-slate-600 font-medium animate-pulse">
                {processStep}
              </p>
              <p className="text-xs text-slate-400 max-w-xs">
                Do not refresh or press back. Encrypted 256-bit payment verification in progress.
              </p>
            </div>
          ) : (
            <>
              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setPaymentTab('upi_qr')}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    paymentTab === 'upi_qr'
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>Scan QR</span>
                </button>
                <button
                  onClick={() => setPaymentTab('upi_apps')}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    paymentTab === 'upi_apps'
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI Apps</span>
                </button>
                <button
                  onClick={() => setPaymentTab('upi_id')}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    paymentTab === 'upi_id'
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="font-extrabold text-xs">@VPA</span>
                  <span>UPI ID</span>
                </button>
                <button
                  onClick={() => setPaymentTab('netbanking')}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    paymentTab === 'netbanking'
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Net Banking</span>
                </button>
                <button
                  onClick={() => setPaymentTab('card')}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    paymentTab === 'card'
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>
              </div>

              {/* Dynamic QR Code View */}
              {paymentTab === 'upi_qr' && (
                <div className="flex flex-col items-center text-center space-y-4 py-2">
                  <div className="relative p-3 bg-white border-2 border-dashed border-indigo-200 rounded-2xl shadow-sm">
                    {/* Simulated Authentic Indian UPI QR Code */}
                    <div className="w-48 h-48 bg-slate-900 rounded-xl p-2.5 flex flex-col items-center justify-between relative overflow-hidden">
                      {/* Stylized QR grid pattern */}
                      <div className="w-full h-full bg-white rounded-lg p-2 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div className="w-10 h-10 border-4 border-slate-900 p-1">
                            <div className="w-full h-full bg-slate-900"></div>
                          </div>
                          <div className="w-10 h-10 border-4 border-slate-900 p-1">
                            <div className="w-full h-full bg-slate-900"></div>
                          </div>
                        </div>

                        {/* Center UPI Badge */}
                        <div className="my-auto flex flex-col items-center justify-center">
                          <div className="bg-gradient-to-r from-orange-500 via-white to-emerald-600 p-0.5 rounded-md shadow-xs">
                            <div className="bg-slate-900 text-[10px] text-white px-2 py-0.5 rounded font-black tracking-wider flex items-center gap-1">
                              UPI • ₹{activePaymentService.priceINR}
                            </div>
                          </div>
                          <div className="text-[9px] text-slate-500 font-mono mt-1 font-bold">
                            saipratap@icici
                          </div>
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="w-10 h-10 border-4 border-slate-900 p-1">
                            <div className="w-full h-full bg-slate-900"></div>
                          </div>
                          <div className="text-[8px] font-mono text-slate-400">
                            NPCI-2026
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-700">
                      Scan with any UPI App: <strong className="text-slate-900">GPay, PhonePe, Paytm, BHIM</strong>
                    </p>
                    <p className="text-xs text-amber-700 font-medium">
                      QR expires in: <span className="font-mono font-bold">{timeFormatted}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleSimulatePayment('QR')}
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Simulate Successful QR Scan & Pay (₹{activePaymentService.priceINR})
                  </button>
                </div>
              )}

              {/* UPI Apps 1-Click Pay */}
              {paymentTab === 'upi_apps' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 font-medium">
                    Select your preferred Indian UPI payment app:
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { name: 'Google Pay', color: 'border-blue-300 hover:bg-blue-50/50', icon: '🔵', vpa: '@okaxis' },
                      { name: 'PhonePe', color: 'border-purple-300 hover:bg-purple-50/50', icon: '🟣', vpa: '@ybl' },
                      { name: 'Paytm UPI', color: 'border-sky-300 hover:bg-sky-50/50', icon: '🔷', vpa: '@paytm' },
                      { name: 'BHIM NPCI', color: 'border-emerald-300 hover:bg-emerald-50/50', icon: '🟢', vpa: '@upi' },
                    ].map((app) => (
                      <button
                        key={app.name}
                        onClick={() => handleSimulatePayment('UPI', `${currentUser.name.toLowerCase().replace(/\s+/g, '')}${app.vpa}`)}
                        className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${app.color}`}
                      >
                        <span className="text-xl">{app.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{app.name}</div>
                          <div className="text-[10px] text-slate-500">Instant UPI Intent</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSimulatePayment('UPI', 'direct_app@upi')}
                    className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Proceed with App Intent (₹{activePaymentService.priceINR})
                  </button>
                </div>
              )}

              {/* Enter Custom UPI ID */}
              {paymentTab === 'upi_id' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Enter your UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      placeholder="e.g. mobileNumber@upi or name@oksbi"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      A payment request will be sent to your UPI app.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {['@oksbi', '@okhdfcbank', '@okicici', '@okaxis', '@paytm'].map((suf) => (
                      <button
                        key={suf}
                        type="button"
                        onClick={() => setUpiIdInput((prev) => (prev ? prev.split('@')[0] + suf : 'rahul' + suf))}
                        className="text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-lg"
                      >
                        {suf}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSimulatePayment('UPI', upiIdInput || 'user@upi')}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Verify & Send UPI Request (₹{activePaymentService.priceINR})
                  </button>
                </div>
              )}

              {/* Net Banking */}
              {paymentTab === 'netbanking' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-medium">
                    Select your bank for secure netbanking gateway:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'sbi', name: 'State Bank of India' },
                      { id: 'hdfc', name: 'HDFC Bank' },
                      { id: 'icici', name: 'ICICI Bank' },
                      { id: 'axis', name: 'Axis Bank' },
                      { id: 'pnb', name: 'Punjab National Bank' },
                      { id: 'kotak', name: 'Kotak Mahindra' }
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBank(b.id)}
                        className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                          selectedBank === b.id
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSimulatePayment('NetBanking')}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Pay via Netbanking (₹{activePaymentService.priceINR})
                  </button>
                </div>
              )}

              {/* Debit/Credit Card */}
              {paymentTab === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242 (Visa / RuPay / MC)"
                      defaultValue="4532 8921 4410 4242"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        defaultValue="08/28"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        defaultValue="891"
                        maxLength={4}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSimulatePayment('Card')}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Pay Securely with Card (₹{activePaymentService.priceINR})
                  </button>
                </div>
              )}
            </>
          )}

          {/* Transparent Regulatory Disclaimer */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              NPCI & RBI Compliance Terms:
            </div>
            <p>
              This payment is strictly for the genuine digital tool asset: <em>{activePaymentService.title}</em>. No subscription or recurring fees. Instant download available upon confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
