import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DigitalService } from '../types';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  Download, 
  CheckCircle2, 
  Eye, 
  X, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const { services, currentUser, initiatePayment, setActiveTab, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewService, setPreviewService] = useState<DigitalService | null>(null);

  const categories = ['All', 'Exam Prep', 'Business & GST', 'AI & Content', 'Career & Jobs', 'Digital Marketing'];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (service: DigitalService) => {
    // Generate sample text file blob to simulate real instant download
    const blob = new Blob([
      `SAIPRATAP S❤️C - OFFICIAL DIGITAL ASSET DOWNLOAD
Title: ${service.title}
Licensed To: ${currentUser.name} (${currentUser.email})
Order Timestamp: ${new Date().toISOString()}

=============================================
DESCRIPTION:
${service.description}

KEY FEATURES & CONTENTS:
${service.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

SAMPLE CONTENT PREVIEW:
${service.samplePreviewText}

=============================================
Thank you for supporting genuine creators on Saipratap S❤️C!
Compliant with RBI & NPCI Digital Guidelines.
`
    ], { type: 'text/plain;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${service.title.replace(/[^a-zA-Z0-9]/g, '_')}_SaipratapSC.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Downloaded "${service.title}" successfully!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <ShoppingBag className="w-3.5 h-3.5" /> High-Value Micro-Services
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
            Curated Digital Toolkits for Just ₹10
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Genuine educational materials, exam revision digests, and business automation kits handcrafted for Indian youth. Free from false pyramid schemes.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 relative z-10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search kits, exam notes, GST templates, AI prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:bg-white/20 focus:border-amber-400 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const isOwned = currentUser.purchasedServiceIds.includes(service.id);
          return (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-200 p-6 flex flex-col justify-between"
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
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Features list */}
                <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold ml-1 text-slate-800">{service.rating}</span>
                    <span className="text-slate-400 ml-1">({service.reviewsCount})</span>
                  </div>
                  <span className="font-mono text-[11px] bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {service.fileFormat} • {service.fileSize}
                  </span>
                </div>
              </div>

              {/* Action footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-1">
                    ₹{service.originalPriceINR}
                  </span>
                  <span className="text-2xl font-black text-slate-900 font-heading">
                    ₹{service.priceINR}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewService(service)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                    title="Quick Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {isOwned ? (
                    <button
                      onClick={() => handleDownload(service)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => initiatePayment(service)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20 cursor-pointer"
                    >
                      <span>Unlock ₹{service.priceINR}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {previewService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  Sample Content Preview
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {previewService.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewService(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Full Summary:</h4>
                <p className="text-slate-600">{previewService.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">What is Included:</h4>
                <ul className="space-y-1.5">
                  {previewService.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-100 rounded-xl font-mono text-xs text-slate-800 border border-slate-200">
                <span className="font-bold text-slate-500 block mb-1">Content Excerpt:</span>
                {previewService.samplePreviewText}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-lg font-black text-slate-900 font-heading">
                Price: ₹{previewService.priceINR}
              </span>
              <button
                onClick={() => {
                  const srv = previewService;
                  setPreviewService(null);
                  if (currentUser.purchasedServiceIds.includes(srv.id)) {
                    handleDownload(srv);
                  } else {
                    initiatePayment(srv);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                {currentUser.purchasedServiceIds.includes(previewService.id) ? 'Download Now' : `Proceed to Pay ₹${previewService.priceINR}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
