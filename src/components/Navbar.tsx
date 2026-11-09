import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Sparkles, 
  Calculator, 
  ShoppingBag, 
  Users, 
  Award, 
  BarChart3, 
  Activity, 
  Menu, 
  X, 
  ShieldCheck, 
  Coins, 
  ChevronDown, 
  UserCheck, 
  LogOut,
  HelpCircle,
  Receipt
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    switchDemoUser, 
    logout, 
    openAuthModal, 
    showToast 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'Free Tools', badge: '5 Tools' },
    { id: 'explore', label: '₹10 Services', badge: 'New' },
    { id: 'community', label: 'Community' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'calculator', label: 'Revenue Calc' },
    { 
      id: 'publisher', 
      label: 'Publisher Hub', 
      highlight: true 
    },
    { id: 'health', label: 'Health Check' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-600 text-white text-xs font-medium py-1 px-4 text-center flex items-center justify-center gap-2">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Registration & Genuine Services
        </span>
        <span className="opacity-60">•</span>
        <span className="hidden sm:inline">Compliant with RBI & NPCI Digital Guidelines</span>
        <span className="opacity-60">•</span>
        <button 
          onClick={() => handleNavClick('calculator')} 
          className="underline hover:text-amber-100 transition-colors cursor-pointer"
        >
          Explore Revenue Model →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group transition-transform focus:outline-hidden"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-extrabold text-base sm:text-lg tracking-wider font-heading">
                  S
                </span>
                <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
                <span className="text-white font-extrabold text-base sm:text-lg tracking-wider font-heading">
                  C
                </span>
                {/* Indian Tricolor pip */}
                <div className="absolute -bottom-1 -right-1 flex h-2.5 w-5 rounded-full overflow-hidden border border-white shadow-xs">
                  <div className="w-1/3 bg-orange-500"></div>
                  <div className="w-1/3 bg-white"></div>
                  <div className="w-1/3 bg-emerald-600"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-heading group-hover:text-rose-600 transition-colors">
                    Saipratap S<span className="text-rose-600">❤️</span>C
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200 hidden md:inline-block">
                    India
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Connecting People, Creating Opportunities.
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-rose-600 bg-rose-50/80 font-bold'
                      : link.highlight
                      ? 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      {link.badge}
                    </span>
                  )}
                  {link.highlight && (
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-rose-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wallet & Points Pill */}
            <button
              onClick={() => handleNavClick('rewards')}
              className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-xl transition-all cursor-pointer group"
              title="View Rewards Wallet & Points"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Coins className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight hidden xs:block">
                <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                  {currentUser.rewardPoints} Pts
                </div>
                <div className="text-xs font-extrabold text-slate-800">
                  ₹{currentUser.walletBalanceINR}
                </div>
              </div>
            </button>

            {/* Role switch / Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-xs"
                />
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-slate-900 leading-none">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize font-medium mt-0.5">
                    {currentUser.role === 'publisher' ? 'Platform Publisher' : currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl mb-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {currentUser.email}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                      <span>Role:</span>
                      <span className="font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>

                  {/* Switch Demo Persona */}
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Quick Persona Switcher
                  </div>
                  <button
                    onClick={() => {
                      switchDemoUser('saipratap');
                      setUserDropdownOpen(false);
                      setActiveTab('publisher');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                      currentUser.role === 'publisher'
                        ? 'bg-rose-50 text-rose-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-rose-600" /> Saipratap (Publisher)
                    </span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">
                      Admin
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      switchDemoUser('rahul');
                      setUserDropdownOpen(false);
                      setActiveTab('home');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                      currentUser.name === 'Rahul Sharma'
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-blue-600" /> Rahul (Member/Student)
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                      User
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      switchDemoUser('priya');
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                      currentUser.name === 'Priya Verma'
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Priya (Digital Creator)
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                      Creator
                    </span>
                  </button>

                  <div className="my-1 border-t border-slate-100"></div>

                  <button
                    onClick={() => {
                      handleNavClick('payments');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2 font-medium"
                  >
                    <Receipt className="w-3.5 h-3.5 text-slate-500" /> Invoices & Purchases
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('support');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2 font-medium"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" /> Help & Compliance FAQ
                  </button>

                  <button
                    onClick={() => {
                      openAuthModal();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2 font-medium"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-indigo-500" /> Sign In / Register Modal
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all ${
                    isActive
                      ? 'bg-rose-50 text-rose-600 font-bold border border-rose-200'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                        {link.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 capitalize">{currentUser.role}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal();
              }}
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              Switch / Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
