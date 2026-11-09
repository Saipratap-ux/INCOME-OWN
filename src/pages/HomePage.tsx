import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Calculator, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Coins, 
  Award, 
  Lock, 
  IndianRupee, 
  Activity, 
  ChevronRight,
  FileCheck,
  Star,
  Download
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveTab, services, initiatePayment, currentUser } = useApp();

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pb-24 lg:pt-14 bg-gradient-to-b from-amber-50/50 via-white to-slate-50 border-b border-slate-200/60">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
              <span>India's 100% Free Digital Community & Earning Platform</span>
              <span className="hidden sm:inline text-rose-300">|</span>
              <span className="hidden sm:inline text-slate-600">Zero Joining Fee</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] font-heading">
              SAIPRATAP S<span className="text-rose-600">❤️</span>C
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-700 mt-2">
                Connecting People, Creating Opportunities.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              One Platform. Millions of Opportunities. Learn • Connect • Discover • Grow.
              Access high-yield free digital tools, join an active community of Indian learners & creators, and discover genuine earning pathways.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => handleNavigate('tools')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-600/20 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                <span>Explore Free Digital Tools</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavigate('explore')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                <span>₹10 Digital Store</span>
              </button>

              <button
                onClick={() => handleNavigate('calculator')}
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>Revenue Calculator</span>
              </button>
            </div>

            {/* Statutory Compliance Callout */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free Forever Registration
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-indigo-600" /> RBI Anti-Pyramid Compliant
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                <Lock className="w-4 h-4 text-amber-600" /> Verified NPCI Payment Gateway
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              12,480+
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Free Registered Members
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Across 28 states & UTs in India
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Coins className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              ₹2,45,000+
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Community Rewards Disbursed
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              For skill quizzes & peer help
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              5 Free Tools
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Built for Indian Needs
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              GST, Income Tax FY26, UPI QR
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              ₹10 Only
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Genuine Micro-Services
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Real downloads, zero fake schemes
            </p>
          </div>
        </div>
      </section>

      {/* Transparent Revenue Model Explained (Section 3 of User Brief) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
              <Sparkles className="w-3.5 h-3.5" /> Transparent Business Model
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading">
              How Saipratap S❤️C Generates Legitimate Business Revenue
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We never charge users to create an account or login. Instead, our platform creates a sustainable, multi-crore business through four legitimate, transparent monetization streams:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-base font-bold text-white">
                Advertising Revenue
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Earned from verified display advertisements shown to real visitors via Google AdSense and accredited digital ad partners.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-base font-bold text-white">
                Optional ₹10 Micro-Services
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Users can choose to purchase curated digital toolkits, cheat-sheets, and legal contract templates for just ₹10.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-base font-bold text-white">
                Disclosed Affiliate Income
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Legitimate referral commissions when community members enroll in certified courses, books, or web hosting.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="text-base font-bold text-white">
                Business Sponsorships
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Indian startups sponsor community hackathons, featured company spotlights, and skill challenges.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Complies with Reserve Bank of India (RBI) Prize Chits and Money Circulation Schemes (Banning) Act guidelines.
            </p>
            <button
              onClick={() => handleNavigate('calculator')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Simulate Revenue in Calculator →
            </button>
          </div>
        </div>
      </section>

      {/* Featured Digital Tools Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
              <Calculator className="w-4 h-4" /> 100% Free Utilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Useful Digital Tools for Everyday Needs
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              No registration or download fee needed. Use them directly in your browser.
            </p>
          </div>
          <button
            onClick={() => handleNavigate('tools')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
          >
            View All 5 Tools <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => handleNavigate('tools')}
            className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-rose-300 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
              Indian GST & Invoicing Calculator
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Calculate CGST, SGST, and IGST for 5%, 12%, 18%, and 28% slabs. Includes reverse GST mode and instant invoice breakdown.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
              <span>Open Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => handleNavigate('tools')}
            className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-rose-300 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <IndianRupee className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
              Income Tax FY 2025-26 Comparator
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Compare New vs Old Tax Regime with standard deduction of ₹75,000, 80C deductions, and Section 87A rebate calculations.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
              <span>Open Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => handleNavigate('tools')}
            className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-rose-300 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
              Dynamic UPI QR Code Generator
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Create printable, high-resolution UPI QR payment codes for your shop, freelance services, or donations with custom notes.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
              <span>Open Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* ₹10 Curated Digital Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded mb-1">
              <ShoppingBag className="w-3.5 h-3.5" /> High-Value Digital Store
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Unlock Verified Kits for Just ₹10
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Affordable, genuine educational and business toolkits. Instant lifetime download via UPI.
            </p>
          </div>
          <button
            onClick={() => handleNavigate('explore')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
          >
            Explore All Kits <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => {
            const isOwned = currentUser.purchasedServiceIds.includes(service.id);
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {service.category}
                    </span>
                    {service.badge && (
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {service.shortDesc}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold ml-1 text-slate-800">{service.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{service.downloadsCount.toLocaleString()} downloads</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-1">
                      ₹{service.originalPriceINR}
                    </span>
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹{service.priceINR}
                    </span>
                  </div>

                  {isOwned ? (
                    <button
                      onClick={() => handleNavigate('payments')}
                      className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => initiatePayment(service)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>Get for ₹{service.priceINR}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
              Loved by Thousands of Learners & Professionals in India
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Genuine stories from members who found real value on Saipratap S❤️C.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Rahul Sharma"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Rahul Sharma</h4>
                  <p className="text-[11px] text-slate-500">B.Tech Student, Lucknow</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Finding a platform that doesn't push scam telegram groups or charge a ₹500 joining fee was impossible until Saipratap S❤️C. The ₹10 Govt Exam sheet and the free ATS resume tool helped me crack my campus interview."
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Priya Verma"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Priya Verma</h4>
                  <p className="text-[11px] text-slate-500">Freelance Designer, Indore</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "The GST invoice tool and freelance agreement pack for ₹10 saved me from legal troubles with my first corporate client. Also earned ₹150 in recharge rewards just for daily check-ins."
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Amit Patel"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Amit Patel</h4>
                  <p className="text-[11px] text-slate-500">Store Owner, Ahmedabad</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Generated our retail store UPI QR code in 20 seconds. The WhatsApp Business templates also helped us announce our Diwali offers. Truly transparent and useful."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Health Check Preview Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Weekly Saipratap S❤️C System Health Check
              </h4>
              <p className="text-xs text-emerald-300">
                Continuous uptime, zero broken links, verified payment gateways, and encrypted APIs.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleNavigate('health')}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
          >
            Run System Diagnostics →
          </button>
        </div>
      </section>
    </div>
  );
};
