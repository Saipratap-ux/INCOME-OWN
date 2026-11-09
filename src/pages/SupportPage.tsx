import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HelpCircle, 
  ShieldCheck, 
  Mail, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Lock, 
  ExternalLink 
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { showToast, currentUser } = useApp();

  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'Payment' | 'Account' | 'Tools' | 'Grievance'>('Payment');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is registration and tool usage on Saipratap S❤️C completely free?',
      a: 'Yes, 100% free forever. We do not require any entry fee, membership deposit, or mandatory joining cost. All 5 core digital calculators (GST, Income Tax FY26, UPI QR Maker, Resume Optimizer, Letter Writer) and community reading are free to all Indian citizens.'
    },
    {
      q: 'How does Saipratap S❤️C comply with RBI anti-money-circulation rules?',
      a: 'Under the Reserve Bank of India (RBI) Prize Chits and Money Circulation Schemes (Banning) Act guidelines (FAQ View Id 92), schemes that charge users to join and promise returns based on recruiting new paying members are strictly banned in India. Saipratap S❤️C has zero recruitment fees and no pyramid hierarchy. Our platform revenue comes purely from external advertising partners, optional ₹10 digital tools, verified sponsorships, and disclosed affiliate commissions.'
    },
    {
      q: 'How does the ₹10 digital micro-service model work?',
      a: 'Instead of charging users just to browse or login, we offer optional, high-value digital assets (such as exam revision digests or legal freelance contracts) for just ₹10. Payment is verified via NPCI-accredited UPI gateways, and customers receive an instant downloadable file and a GST-compliant tax invoice.'
    },
    {
      q: 'Is my mobile number or UPI PIN exposed?',
      a: 'Never. In accordance with NPCI digital security regulations, customer mobile numbers and banking identifiers are kept strictly confidential within secure server environments. UPI PINs are only entered into your own official UPI banking app (like GPay, PhonePe, or BHIM) and are never captured or seen by Saipratap S❤️C.'
    },
    {
      q: 'Can I get a refund for a ₹10 digital download?',
      a: 'If a purchased digital file fails to download or has technical defects, our automated support system immediately re-delivers the asset or initiates an instant UPI reversal to your account within 24 hours.'
    }
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      showToast('Please fill in both subject and message', 'warning');
      return;
    }
    const tkt = 'TKT-' + Math.floor(10000 + Math.random() * 90000);
    setSubmittedTicketId(tkt);
    setTicketSubject('');
    setTicketMessage('');
    showToast(`Support ticket ${tkt} registered! Our team will respond via email.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <HelpCircle className="w-3.5 h-3.5" /> Support & Grievance Redressal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
            Help Center & Statutory Compliance
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Need assistance with a ₹10 purchase, digital tools, or have a grievance? We are committed to complete transparency and prompt user support.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Support Ticket Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-rose-600" />
              Submit a Support Request
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Average response time: Under 4 hours during business days.
            </p>
          </div>

          {submittedTicketId ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Ticket Registered: #{submittedTicketId}
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                We have received your enquiry. An email update has been dispatched to <strong>{currentUser.email}</strong>.
              </p>
              <button
                onClick={() => setSubmittedTicketId(null)}
                className="text-xs font-bold text-emerald-700 hover:underline pt-2 block mx-auto"
              >
                Submit another query
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Query Category
                </label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                >
                  <option value="Payment">UPI Payment & Invoice Question</option>
                  <option value="Tools">Digital Tool Bug or Feature Request</option>
                  <option value="Account">Account / Profile Access</option>
                  <option value="Grievance">Statutory / Legal Grievance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject / Summary
                </label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Download link for Exam Prep Kit"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Message
                </label>
                <textarea
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Explain your query clearly..."
                  className="w-full p-3.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}

          {/* Grievance officer info */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-900">
              Grievance Officer (Rule 3(2) of IT Rules, 2021):
            </div>
            <p>Name: Saipratap S. (Founder & Publisher)</p>
            <p>Email: saipratapdansana@gmail.com</p>
            <p>Jurisdiction: India • All disputes subject to Indian courts.</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Frequently Answered Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RBI Statutory Link Badge */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Official Statutory References:</span>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Learn more about RBI's official consumer protection policies on prize chits and money circulation schemes at the official Reserve Bank of India portal (FAQ View Id 92).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
