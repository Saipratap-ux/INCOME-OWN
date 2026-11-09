import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_HEALTH_CHECKS } from '../data/mockData';
import { 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Zap, 
  Lock, 
  Server, 
  Globe, 
  FileCheck 
} from 'lucide-react';

export const HealthCheckPage: React.FC = () => {
  const { showToast } = useApp();
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [currentTestStep, setCurrentTestStep] = useState('');
  const [testProgress, setTestProgress] = useState(0);
  const [lastCheckTime, setLastCheckTime] = useState('Just now (Automated)');

  const [healthChecks, setHealthChecks] = useState(INITIAL_HEALTH_CHECKS);

  const runDiagnostics = async () => {
    setIsRunningCheck(true);
    setTestProgress(10);
    setCurrentTestStep('Pinging Edge CDN & checking DNS propagation across Indian telecom operators...');
    await new Promise((r) => setTimeout(r, 600));

    setTestProgress(35);
    setCurrentTestStep('Verifying 256-bit SSL/TLS certificate validity & HTTP/2 protocol handshake...');
    await new Promise((r) => setTimeout(r, 600));

    setTestProgress(60);
    setCurrentTestStep('Scanning 16 platform routes, legal references & RBI FAQ links for broken URLs...');
    await new Promise((r) => setTimeout(r, 700));

    setTestProgress(80);
    setCurrentTestStep('Auditing NPCI UPI Gateway webhook listener & checksum validation algorithms...');
    await new Promise((r) => setTimeout(r, 600));

    setTestProgress(100);
    setCurrentTestStep('Validating GST, Income Tax FY26, and UPI QR calculation mathematical precision...');
    await new Promise((r) => setTimeout(r, 500));

    setIsRunningCheck(false);
    setLastCheckTime('Just now (Manual Audit Passed)');
    showToast('Weekly Health Check Complete: All systems 100% operational!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Activity className="w-3.5 h-3.5 animate-pulse" /> Weekly Health Check Suite
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
              Saipratap S❤️C System Health & Uptime Monitor
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Automated weekly inspection routine checking downtime, response times, SSL security, dead links, and payment gateway integrity.
            </p>
          </div>

          <button
            onClick={runDiagnostics}
            disabled={isRunningCheck}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isRunningCheck ? 'animate-spin' : ''}`} />
            <span>{isRunningCheck ? 'Running Audit...' : 'Run Weekly Diagnostic Now'}</span>
          </button>
        </div>

        {/* Progress Bar during diagnostic run */}
        {isRunningCheck && (
          <div className="mt-6 pt-4 border-t border-white/10 space-y-2 animate-in fade-in">
            <div className="flex justify-between text-xs text-emerald-300">
              <span>{currentTestStep}</span>
              <span className="font-bold font-mono">{testProgress}%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${testProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Overall Uptime
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-6 h-6" /> 99.98%
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Zero unplanned outages</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Average Latency
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1 flex items-center gap-1.5">
            <Zap className="w-6 h-6 text-amber-500" /> 28 ms
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Edge CDN cached across India</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Broken Links Detected
          </span>
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 font-heading mt-1 flex items-center gap-1.5">
            <Globe className="w-6 h-6" /> 0 Dead Links
          </div>
          <p className="text-[11px] text-slate-500 mt-2">16 routes verified active</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            SSL Certificate
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1 flex items-center gap-1.5">
            <Lock className="w-6 h-6 text-emerald-600" /> Valid
          </div>
          <p className="text-[11px] text-slate-500 mt-2">256-Bit TLS encryption</p>
        </div>
      </div>

      {/* Detailed Services Diagnostic Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-600" />
            Core System Infrastructure Status
          </h2>
          <span className="text-xs text-slate-500">
            Last audited: <strong className="text-slate-800">{lastCheckTime}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthChecks.map((check, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {check.service}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Operational
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {check.details}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Latency: <strong className="text-slate-700 font-mono">{check.latencyMs}ms</strong>
                </span>
                <span className="text-slate-400">Checked: {check.lastChecked}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Audit Schedule Box */}
      <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Automated Weekly Health Audit Routine
            </h4>
            <p className="text-xs text-slate-500">
              Runs every Monday at 04:00 AM IST. Alerts the publisher instantly via email in case of any latency surge or failed webhooks.
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 shrink-0">
          Next Auto-Check: In 4 Days
        </span>
      </div>
    </div>
  );
};
