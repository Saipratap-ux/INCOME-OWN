import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentTransaction, DigitalService } from '../types';
import { 
  Receipt, 
  Download, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  FileText,
  Clock
} from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const { transactions, currentUser, services, showToast } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentTransaction | null>(null);

  const handleDownloadAsset = (serviceTitle: string) => {
    const blob = new Blob([
      `SAIPRATAP S❤️C - DIGITAL ASSET DOWNLOAD
Asset Title: ${serviceTitle}
Purchaser: ${currentUser.name} (${currentUser.email})
Status: Legally Licensed via NPCI UPI Gateway
Date: ${new Date().toISOString()}

Enjoy your lifetime access! Built with ❤️ in India.
`
    ], { type: 'text/plain;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${serviceTitle.replace(/[^a-zA-Z0-9]/g, '_')}_SaipratapSC.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded asset for "${serviceTitle}"!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 mb-2">
            <Receipt className="w-3.5 h-3.5" /> Official Billing & Receipts
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-heading">
            My Purchases & GST Tax Invoices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete transaction ledger of your verified ₹10 digital tools and downloadable kits.
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Transactions Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't purchased any ₹10 digital services yet. Explore our genuine tools catalog to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-4">Invoice / Order ID</th>
                  <th className="p-4">Service Item</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-mono font-bold text-slate-800">
                      <div>{txn.invoiceNumber}</div>
                      <div className="text-[10px] text-slate-400">{txn.orderId}</div>
                    </td>
                    <td className="p-4 font-semibold text-slate-900 max-w-xs">
                      {txn.serviceTitle}
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="font-bold text-slate-800">{txn.method}</span>
                      {txn.upiVpa && <div className="text-[10px] text-slate-400 font-mono">{txn.upiVpa}</div>}
                    </td>
                    <td className="p-4 font-mono font-black text-slate-900 text-sm">
                      ₹{txn.amountINR}
                    </td>
                    <td className="p-4 text-slate-500">
                      {txn.date}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedInvoice(txn)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Tax Invoice</span>
                      </button>
                      <button
                        onClick={() => handleDownloadAsset(txn.serviceTitle)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Kit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tax Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white font-extrabold flex items-center justify-center text-xs">
                  S❤️C
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    GST Compliant Tax Invoice
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {selectedInvoice.invoiceNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Invoice Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
              {/* Header Info */}
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Saipratap S❤️C Platform
                  </h4>
                  <p className="text-slate-500">Digital Community & Educational Publisher</p>
                  <p className="text-slate-500">Karnataka / Delhi / India</p>
                  <p className="text-slate-500">SAC Code: 998439 (Online Content & Tool Services)</p>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                    PAID VIA {selectedInvoice.method}
                  </span>
                  <p className="font-mono text-slate-500 mt-1">{selectedInvoice.date}</p>
                </div>
              </div>

              {/* Billed To */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Billed To:</span>
                <p className="font-bold text-slate-900">{selectedInvoice.payerName}</p>
                <p className="text-slate-600">{selectedInvoice.payerEmail}</p>
                {selectedInvoice.upiVpa && <p className="font-mono text-slate-500">UPI VPA: {selectedInvoice.upiVpa}</p>}
              </div>

              {/* Line Items Table */}
              <div className="border rounded-xl border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Description</th>
                      <th className="p-3 text-right">Taxable</th>
                      <th className="p-3 text-right">GST (18%)</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">
                        {selectedInvoice.serviceTitle}
                      </td>
                      <td className="p-3 text-right font-mono">
                        ₹{(selectedInvoice.amountINR / 1.18).toFixed(2)}
                      </td>
                      <td className="p-3 text-right font-mono">
                        ₹{(selectedInvoice.amountINR - (selectedInvoice.amountINR / 1.18)).toFixed(2)}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">
                        ₹{selectedInvoice.amountINR.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center text-sm font-bold bg-slate-900 text-white p-4 rounded-xl">
                <span>Grand Total (INR):</span>
                <span className="text-emerald-400 font-mono text-lg">
                  ₹{selectedInvoice.amountINR.toFixed(2)}
                </span>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                This is a computer-generated tax invoice under Section 31 of CGST Act 2017. No physical signature required.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
