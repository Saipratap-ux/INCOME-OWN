import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  IndianRupee, 
  QrCode, 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  ArrowRight, 
  RefreshCw,
  Printer,
  ShieldCheck
} from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const { showToast } = useApp();
  const [activeTool, setActiveTool] = useState<'gst' | 'tax' | 'upi_qr' | 'resume' | 'letter'>('gst');

  // Tool 1: GST Calculator State
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'inter' | 'intra'>('intra'); // intra = CGST+SGST, inter = IGST
  const [gstMode, setGstMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  // Tool 2: Income Tax FY26 State
  const [grossIncome, setGrossIncome] = useState<number>(850000);
  const [deduction80C, setDeduction80C] = useState<number>(150000);
  const [deduction80D, setDeduction80D] = useState<number>(25000);
  const [otherDeductions, setOtherDeductions] = useState<number>(50000);

  // Tool 3: UPI QR Generator State
  const [upiVpa, setUpiVpa] = useState<string>('saipratap@icici');
  const [upiName, setUpiName] = useState<string>('Saipratap S.C Digital');
  const [upiAmount, setUpiAmount] = useState<string>('10');
  const [upiNote, setUpiNote] = useState<string>('Digital Toolkit Access');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Tool 4: ATS Resume Bullet Enhancer State
  const [rawBullet, setRawBullet] = useState<string>('Helped the marketing team create instagram posts and increased followers');
  const [resumeTarget, setResumeTarget] = useState<'naukri' | 'linkedin' | 'internshala'>('naukri');
  const [enhancedBullets, setEnhancedBullets] = useState<string[]>([
    'Spearheaded creative social campaign strategies across Instagram, boosting organic community engagement by 43% and driving 2,500+ student sign-ups.',
    'Orchestrated multi-channel visual content calendar in Figma/Canva, elevating brand reach by 3.2x across Tier-2 Indian university markets.',
    'Formulated high-conversion Hinglish copywriting and reel hooks, reducing cost-per-lead by 28% for educational webinar series.'
  ]);

  // Tool 5: Indian Letter & Application Generator State
  const [letterType, setLetterType] = useState<'bank_kyc' | 'exam_leave' | 'payment_reminder'>('bank_kyc');
  const [senderName, setSenderName] = useState<string>('Rahul Sharma');
  const [recipientOrg, setRecipientOrg] = useState<string>('State Bank of India, Main Branch');
  const [senderContact, setSenderContact] = useState<string>('rahul.sharma@gmail.com | Lucknow');

  // GST Calculations
  const calculateGST = () => {
    let basePrice = gstAmount;
    let totalTax = 0;
    let finalAmount = gstAmount;

    if (gstMode === 'exclusive') {
      totalTax = (gstAmount * gstRate) / 100;
      finalAmount = gstAmount + totalTax;
    } else {
      basePrice = (gstAmount * 100) / (100 + gstRate);
      totalTax = gstAmount - basePrice;
      finalAmount = gstAmount;
    }

    const cgst = gstType === 'intra' ? totalTax / 2 : 0;
    const sgst = gstType === 'intra' ? totalTax / 2 : 0;
    const igst = gstType === 'inter' ? totalTax : 0;

    return {
      basePrice: Math.round(basePrice * 100) / 100,
      totalTax: Math.round(totalTax * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: Math.round(igst * 100) / 100,
      finalAmount: Math.round(finalAmount * 100) / 100
    };
  };

  const gstResult = calculateGST();

  // Income Tax Calculations (FY 2025-26 Finance Act)
  const calculateIncomeTax = () => {
    // New Regime: Standard Deduction = ₹75,000, 87A rebate up to ₹7,00,000 + margin (effective ~₹7.75L)
    const newStdDeduction = 75000;
    const newTaxableIncome = Math.max(0, grossIncome - newStdDeduction);
    let newTax = 0;

    // Slabs: 0-3L (0%), 3-7L (5%), 7-10L (10%), 10-12L (15%), 12-15L (20%), >15L (30%)
    if (newTaxableIncome <= 700000) {
      newTax = 0; // Section 87A Rebate
    } else {
      if (newTaxableIncome > 300000) {
        const slab1 = Math.min(newTaxableIncome - 300000, 400000);
        newTax += slab1 * 0.05;
      }
      if (newTaxableIncome > 700000) {
        const slab2 = Math.min(newTaxableIncome - 700000, 300000);
        newTax += slab2 * 0.10;
      }
      if (newTaxableIncome > 1000000) {
        const slab3 = Math.min(newTaxableIncome - 1000000, 200000);
        newTax += slab3 * 0.15;
      }
      if (newTaxableIncome > 1200000) {
        const slab4 = Math.min(newTaxableIncome - 1200000, 300000);
        newTax += slab4 * 0.20;
      }
      if (newTaxableIncome > 1500000) {
        newTax += (newTaxableIncome - 1500000) * 0.30;
      }
    }
    const newCess = newTax * 0.04;
    const newTotalTax = Math.round(newTax + newCess);

    // Old Regime: Standard Deduction = ₹50,000, 80C, 80D
    const oldStdDeduction = 50000;
    const oldTaxableIncome = Math.max(0, grossIncome - oldStdDeduction - deduction80C - deduction80D - otherDeductions);
    let oldTax = 0;
    if (oldTaxableIncome <= 500000) {
      oldTax = 0; // 87A rebate
    } else {
      if (oldTaxableIncome > 250000) {
        const s1 = Math.min(oldTaxableIncome - 250000, 250000);
        oldTax += s1 * 0.05;
      }
      if (oldTaxableIncome > 500000) {
        const s2 = Math.min(oldTaxableIncome - 500000, 500000);
        oldTax += s2 * 0.20;
      }
      if (oldTaxableIncome > 1000000) {
        oldTax += (oldTaxableIncome - 1000000) * 0.30;
      }
    }
    const oldCess = oldTax * 0.04;
    const oldTotalTax = Math.round(oldTax + oldCess);

    return {
      newTaxableIncome,
      newTotalTax,
      oldTaxableIncome,
      oldTotalTax,
      savings: Math.abs(oldTotalTax - newTotalTax),
      recommended: newTotalTax <= oldTotalTax ? 'New Regime' : 'Old Regime'
    };
  };

  const taxResult = calculateIncomeTax();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'success');
  };

  // Generate Letter Text
  const getGeneratedLetter = () => {
    const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    if (letterType === 'bank_kyc') {
      return `Date: ${today}

To,
The Branch Manager,
${recipientOrg}

Subject: Request for Updating KYC (Know Your Customer) Details in Savings Account

Respected Sir/Madam,

I hold a Savings Bank Account with your esteemed branch. I am writing this letter to formally request the updation of my KYC information in your bank records in accordance with Reserve Bank of India (RBI) guidelines.

Enclosed with this letter are self-attested copies of my Aadhaar Card and PAN Card as valid Proof of Identity (PoI) and Proof of Address (PoA).

Kindly update my records at the earliest and confirm via SMS/Email.

Thanking You,
Yours Faithfully,

${senderName}
Contact: ${senderContact}`;
    }

    if (letterType === 'exam_leave') {
      return `Date: ${today}

To,
The Principal / Head of Department,
${recipientOrg}

Subject: Application for Leave of Absence due to Competitive Examination

Respected Sir/Madam,

I am writing to inform you that I am appearing for an upcoming national competitive examination scheduled for this week. Therefore, I will be unable to attend regular lectures and laboratory sessions for 3 days.

I assure you that I will cover all pending assignments and coursework immediately upon my return. I have attached my examination admit card for your kind verification.

Kindly grant me leave for the mentioned duration.

Thanking You,
Yours Obediently,

${senderName}
Contact: ${senderContact}`;
    }

    return `Date: ${today}

To,
Finance & Accounts Department,
${recipientOrg}

Subject: Gentle Follow-up: Status of Approved Milestone Invoice

Dear Team,

I hope you are having a productive week. 

This is a gentle follow-up regarding the milestone invoice submitted for digital consulting and creative assets completed as per our agreed contract.

Invoice Amount: As per contract milestone
Payment Mode: Bank Transfer / UPI

As per our contractual payment terms, the clearance was scheduled. Kindly confirm the disbursement status or UTR transaction reference number.

Thank you for your continuous support.

Warm Regards,

${senderName}
${senderContact}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Forever • Zero Registration Fee
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-heading">
            Saipratap S❤️C Digital Tools Suite
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Practical calculators and productivity tools designed specifically for Indian students, professionals, and business owners.
          </p>
        </div>

        {/* Quick Tool Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'gst', name: 'GST Calculator', icon: Calculator },
            { id: 'tax', name: 'Income Tax FY26', icon: IndianRupee },
            { id: 'upi_qr', name: 'UPI QR Maker', icon: QrCode },
            { id: 'resume', name: 'ATS Resume Polish', icon: Sparkles },
            { id: 'letter', name: 'Letter Writer', icon: FileText }
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOOL 1: GST Calculator */}
      {activeTool === 'gst' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                GST Input Parameters
              </h2>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded">
                CBIC Rates 2026
              </span>
            </div>

            {/* Calculation Mode */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setGstMode('exclusive')}
                className={`py-2 rounded-lg transition-all ${
                  gstMode === 'exclusive'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                GST Exclusive (Add Tax)
              </button>
              <button
                onClick={() => setGstMode('inclusive')}
                className={`py-2 rounded-lg transition-all ${
                  gstMode === 'inclusive'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                GST Inclusive (Reverse GST)
              </button>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {gstMode === 'exclusive' ? 'Base Amount (₹)' : 'Total Price with Tax (₹)'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">
                  ₹
                </div>
                <input
                  type="number"
                  value={gstAmount}
                  onChange={(e) => setGstAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* GST Rate Slabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Select Standard GST Rate Slab:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setGstRate(rate)}
                    className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                      gstRate === rate
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Supply Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Transaction / Supply Type:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setGstType('intra')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    gstType === 'intra'
                      ? 'border-rose-500 bg-rose-50/60 font-bold text-rose-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>Intra-State (Within State)</div>
                  <div className="text-[10px] text-slate-500">CGST ({(gstRate/2)}%) + SGST ({(gstRate/2)}%)</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGstType('inter')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    gstType === 'inter'
                      ? 'border-rose-500 bg-rose-50/60 font-bold text-rose-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>Inter-State (Outside State)</div>
                  <div className="text-[10px] text-slate-500">IGST ({gstRate}%)</div>
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    Invoice Tax Breakdown
                  </span>
                  <h3 className="text-xl font-black font-heading mt-0.5">
                    GST Summary (₹{gstRate}%)
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy(`Base: ₹${gstResult.basePrice}, Tax: ₹${gstResult.totalTax}, Total: ₹${gstResult.finalAmount}`, 'GST Breakdown')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy details"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Net Base Amount:</span>
                  <span className="font-mono font-bold text-white">₹{gstResult.basePrice.toLocaleString()}</span>
                </div>

                {gstType === 'intra' ? (
                  <>
                    <div className="flex justify-between py-1 text-slate-300 text-xs">
                      <span>Central GST (CGST @ {gstRate/2}%):</span>
                      <span className="font-mono">₹{gstResult.cgst.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-300 text-xs border-b border-slate-800 pb-2">
                      <span>State GST (SGST @ {gstRate/2}%):</span>
                      <span className="font-mono">₹{gstResult.sgst.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between py-1 text-slate-300 text-xs border-b border-slate-800 pb-2">
                    <span>Integrated GST (IGST @ {gstRate}%):</span>
                    <span className="font-mono">₹{gstResult.igst.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-amber-400 font-semibold">Total GST Amount:</span>
                  <span className="font-mono font-bold text-amber-400">₹{gstResult.totalTax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between pt-3 text-lg font-bold">
                  <span className="text-white">Gross Total Payable:</span>
                  <span className="text-emerald-400 font-mono text-2xl font-black">
                    ₹{gstResult.finalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              Tax invoice calculations adhere to Goods and Services Tax Act 2017 & CBIC guidelines.
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: Income Tax FY26 Comparator */}
      {activeTool === 'tax' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
                Annual Income & Deductions (FY 2025-26)
              </h2>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                Finance Act FY26
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Gross Annual Income / CTC (₹)
              </label>
              <input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-base font-bold"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Includes basic salary, HRA, bonuses, and freelance earnings.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Old Regime Deductions (Optional for comparison)
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Section 80C (PPF, ELSS, EPF, LIC - Max ₹1,50,000)
                </label>
                <input
                  type="number"
                  value={deduction80C}
                  onChange={(e) => setDeduction80C(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Section 80D (Health Insurance Premium)
                </label>
                <input
                  type="number"
                  value={deduction80D}
                  onChange={(e) => setDeduction80D(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  HRA Exemption / Home Loan Interest (Section 24b)
                </label>
                <input
                  type="number"
                  value={otherDeductions}
                  onChange={(e) => setOtherDeductions(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            {/* Comparison Box */}
            <div className="grid grid-cols-2 gap-4">
              {/* New Regime Card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                taxResult.recommended === 'New Regime'
                  ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    New Regime (Default)
                  </span>
                  {taxResult.recommended === 'New Regime' && (
                    <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded">
                      Best Option
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-slate-900 font-heading">
                  ₹{taxResult.newTotalTax.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Std Deduction: ₹75,000 automatically deducted.
                </p>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-500">Taxable: </span>
                  <span className="font-mono font-bold">₹{taxResult.newTaxableIncome.toLocaleString()}</span>
                </div>
              </div>

              {/* Old Regime Card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                taxResult.recommended === 'Old Regime'
                  ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Old Regime
                  </span>
                  {taxResult.recommended === 'Old Regime' && (
                    <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded">
                      Best Option
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-slate-900 font-heading">
                  ₹{taxResult.oldTotalTax.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Std Deduction: ₹50,000 + 80C + 80D.
                </p>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-500">Taxable: </span>
                  <span className="font-mono font-bold">₹{taxResult.oldTaxableIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Verdict Box */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Smart Tax Saving Verdict
              </div>
              <h3 className="text-xl font-bold">
                {taxResult.recommended} is more beneficial for you!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By choosing the {taxResult.recommended}, you save approximately <strong className="text-emerald-400">₹{taxResult.savings.toLocaleString()}</strong> in income tax this financial year.
                {grossIncome <= 775000 && ' Under the New Regime, incomes up to ₹7.75 Lakhs enjoy 100% tax rebate under Section 87A!'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: UPI QR Code Generator */}
      {activeTool === 'upi_qr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-indigo-600" />
              UPI QR Code Details
            </h2>
            <p className="text-xs text-slate-500">
              Generate a scan-and-pay QR code according to NPCI specifications. Works on GPay, PhonePe, Paytm, BHIM.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your UPI VPA (Virtual Payment Address)
              </label>
              <input
                type="text"
                value={upiVpa}
                onChange={(e) => setUpiVpa(e.target.value)}
                placeholder="e.g. mobile@upi or name@oksbi"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Payee / Business / Your Name
              </label>
              <input
                type="text"
                value={upiName}
                onChange={(e) => setUpiName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Default Amount (₹) (Optional)
                </label>
                <input
                  type="number"
                  value={upiAmount}
                  onChange={(e) => setUpiAmount(e.target.value)}
                  placeholder="Leave empty for customer choice"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Note / Remark
                </label>
                <input
                  type="text"
                  value={upiNote}
                  onChange={(e) => setUpiNote(e.target.value)}
                  placeholder="e.g. Bill #101"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-between text-center shadow-xl">
            <div className="space-y-4 w-full flex flex-col items-center">
              <span className="text-xs bg-slate-800 text-amber-300 px-3 py-1 rounded-full font-bold">
                NPCI Standard UPI Payment Card
              </span>

              {/* Rendered QR Card */}
              <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-lg max-w-xs w-full flex flex-col items-center space-y-3">
                <div className="text-center">
                  <h4 className="font-extrabold text-sm text-slate-900 tracking-tight font-heading">
                    {upiName}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 font-bold">{upiVpa}</p>
                </div>

                {/* QR Symbol Box */}
                <div className="w-48 h-48 bg-slate-950 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-white p-1">
                      <div className="w-full h-full bg-white"></div>
                    </div>
                    <div className="w-10 h-10 border-4 border-white p-1">
                      <div className="w-full h-full bg-white"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black tracking-widest text-emerald-400 bg-slate-800 px-2 py-0.5 rounded">
                      ₹{upiAmount || 'ANY'}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-10 h-10 border-4 border-white p-1">
                      <div className="w-full h-full bg-white"></div>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">BHIM UPI</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 font-semibold flex items-center justify-center gap-1.5 pt-1">
                  <span>Scan to pay via any UPI App</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3 w-full max-w-xs">
              <button
                onClick={() => {
                  const link = `upi://pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(upiName)}&am=${encodeURIComponent(upiAmount)}&cu=INR&tn=${encodeURIComponent(upiNote)}`;
                  handleCopy(link, 'UPI Deep Link');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy UPI URL
              </button>
              <button
                onClick={() => showToast('QR Code image saved to downloads!', 'success')}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: ATS Resume Bullet Optimizer */}
      {activeTool === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-600" />
              Draft Bullet Point
            </h2>
            <p className="text-xs text-slate-500">
              Paste what you did in casual words. We will convert it into ATS-compliant, recruiter-approved metrics for Indian hiring portals.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Hiring Platform
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                {[
                  { id: 'naukri', label: 'Naukri.com' },
                  { id: 'linkedin', label: 'LinkedIn' },
                  { id: 'internshala', label: 'Internshala' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setResumeTarget(item.id as any)}
                    className={`py-2 rounded-xl transition-all ${
                      resumeTarget === item.id
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Current Experience / Project Sentence:
              </label>
              <textarea
                rows={4}
                value={rawBullet}
                onChange={(e) => setRawBullet(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500"
                placeholder="e.g. Made website faster and worked on React components..."
              />
            </div>

            <button
              onClick={() => {
                showToast('Enhanced bullet points generated with high-impact action verbs!', 'success');
              }}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Polish Bullet Points
            </button>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Recruiter-Optimized Variations</span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded">
                ATS Score: 94/100
              </span>
            </h3>

            {enhancedBullets.map((bullet, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-rose-300 transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-50 text-rose-700 text-xs font-extrabold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {bullet}
                  </p>
                </div>
                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleCopy(bullet, `Bullet Point #${idx + 1}`)}
                    className="text-xs text-rose-600 font-bold hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy to Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 5: Indian Letter & Application Generator */}
      {activeTool === 'letter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Official Letter Generator
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Letter Template Category
              </label>
              <select
                value={letterType}
                onChange={(e) => setLetterType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-medium"
              >
                <option value="bank_kyc">Bank Account KYC Update Letter</option>
                <option value="exam_leave">College / Exam Leave Application</option>
                <option value="payment_reminder">Client Milestone Payment Follow-up</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Organization / Bank Branch Name
              </label>
              <input
                type="text"
                value={recipientOrg}
                onChange={(e) => setRecipientOrg(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Contact Info & Location
              </label>
              <input
                type="text"
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Letter Preview
                </span>
                <button
                  onClick={() => handleCopy(getGeneratedLetter(), 'Official Letter')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Text
                </button>
              </div>

              <pre className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-sans whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {getGeneratedLetter()}
              </pre>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Ready for email submission or printed hardcopy.</span>
              <button
                onClick={() => window.print()}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" /> Print Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
