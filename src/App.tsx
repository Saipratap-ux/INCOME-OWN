/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { ExplorePage } from './pages/ExplorePage';
import { CommunityPage } from './pages/CommunityPage';
import { RewardsPage } from './pages/RewardsPage';
import { RevenueCalculatorPage } from './pages/RevenueCalculatorPage';
import { PublisherDashboardPage } from './pages/PublisherDashboardPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { HealthCheckPage } from './pages/HealthCheckPage';
import { SupportPage } from './pages/SupportPage';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'tools' && <ToolsPage />}
        {activeTab === 'explore' && <ExplorePage />}
        {activeTab === 'community' && <CommunityPage />}
        {activeTab === 'rewards' && <RewardsPage />}
        {activeTab === 'calculator' && <RevenueCalculatorPage />}
        {activeTab === 'publisher' && <PublisherDashboardPage />}
        {activeTab === 'payments' && <PaymentsPage />}
        {activeTab === 'health' && <HealthCheckPage />}
        {activeTab === 'support' && <SupportPage />}
      </main>

      <Footer />

      {/* Global Interactive Modals & Toast Manager */}
      <PaymentModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
