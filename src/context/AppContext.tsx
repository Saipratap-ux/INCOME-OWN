import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, 
  DigitalService, 
  CommunityPost, 
  PaymentTransaction, 
  WithdrawalRequest, 
  PublisherAnalytics 
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_SERVICES, 
  INITIAL_POSTS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_WITHDRAWALS, 
  INITIAL_PUBLISHER_ANALYTICS 
} from '../data/mockData';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentUser: User;
  switchDemoUser: (key: 'saipratap' | 'rahul' | 'priya') => void;
  loginWithEmailOrPhone: (identity: string, otp: string) => boolean;
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  services: DigitalService[];
  posts: CommunityPost[];
  addPost: (data: { title: string; content: string; category: any; tags: string[] }) => void;
  addComment: (postId: string, content: string) => void;
  toggleLikePost: (postId: string) => void;
  transactions: PaymentTransaction[];
  withdrawals: WithdrawalRequest[];
  publisherAnalytics: PublisherAnalytics;
  initiatePayment: (service: DigitalService) => void;
  completePayment: (service: DigitalService, method: 'UPI' | 'QR' | 'NetBanking' | 'Card', upiId?: string) => Promise<PaymentTransaction>;
  activePaymentService: DigitalService | null;
  isPaymentModalOpen: boolean;
  closePaymentModal: () => void;
  requestWithdrawal: (amount: number, method: 'IMPS' | 'NEFT' | 'UPI', upiId?: string) => { success: boolean; message: string };
  claimDailyCheckIn: () => { success: boolean; points: number; message: string };
  scratchCardReward: () => { wonPoints: number; wonINR: number };
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state with localStorage fallback
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('saipratap_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.rahul;
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [services] = useState<DigitalService[]>(INITIAL_SERVICES);

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('saipratap_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('saipratap_txns');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('saipratap_withdrawals');
    return saved ? JSON.parse(saved) : INITIAL_WITHDRAWALS;
  });

  const [publisherAnalytics, setPublisherAnalytics] = useState<PublisherAnalytics>(() => {
    const saved = localStorage.getItem('saipratap_analytics');
    return saved ? JSON.parse(saved) : INITIAL_PUBLISHER_ANALYTICS;
  });

  const [activePaymentService, setActivePaymentService] = useState<DigitalService | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('saipratap_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('saipratap_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('saipratap_txns', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('saipratap_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('saipratap_analytics', JSON.stringify(publisherAnalytics));
  }, [publisherAnalytics]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchDemoUser = (key: 'saipratap' | 'rahul' | 'priya') => {
    const selected = DEMO_USERS[key];
    if (selected) {
      setCurrentUser(selected);
      showToast(`Switched account to ${selected.name} (${selected.role.toUpperCase()})`, 'info');
    }
  };

  const loginWithEmailOrPhone = (identity: string, otp: string) => {
    if (otp === '123456' || otp.length === 6) {
      const newUser: User = {
        id: 'usr_' + Date.now(),
        name: identity.includes('@') ? identity.split('@')[0] : 'Community Member',
        email: identity.includes('@') ? identity : `${identity}@saipratap.community`,
        role: identity.toLowerCase().includes('saipratap') ? 'publisher' : 'member',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
        rewardPoints: 100,
        walletBalanceINR: 10,
        referralCode: 'SP' + Math.floor(1000 + Math.random() * 9000),
        joinedDate: 'Today',
        isVerified: true,
        purchasedServiceIds: [],
        streakDays: 1,
        lastCheckInDate: new Date().toISOString().split('T')[0]
      };
      setCurrentUser(newUser);
      setIsAuthModalOpen(false);
      showToast(`Welcome ${newUser.name}! ₹10 welcome credit & 100 points added!`, 'success');
      return true;
    }
    showToast('Invalid OTP. Use demo OTP: 123456', 'error');
    return false;
  };

  const logout = () => {
    setCurrentUser(DEMO_USERS.rahul);
    showToast('Logged out. Returned to demo account.', 'info');
  };

  const addPost = ({ title, content, category, tags }: { title: string; content: string; category: any; tags: string[] }) => {
    const newPost: CommunityPost = {
      id: 'post_' + Date.now(),
      title,
      content,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      category,
      tags: tags.length > 0 ? tags : ['General'],
      likes: 1,
      likedByMe: true,
      comments: [],
      createdAt: 'Just now'
    };

    setPosts([newPost, ...posts]);
    
    // Reward user with 25 points for posting genuine content
    setCurrentUser((prev) => ({
      ...prev,
      rewardPoints: prev.rewardPoints + 25
    }));

    showToast('Post published! +25 community points earned.', 'success');
  };

  const addComment = (postId: string, content: string) => {
    const comment = {
      id: 'cmt_' + Date.now(),
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      content,
      createdAt: 'Just now',
      likes: 0
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, comment]
          };
        }
        return p;
      })
    );

    setCurrentUser((prev) => ({
      ...prev,
      rewardPoints: prev.rewardPoints + 10
    }));

    showToast('Comment added! +10 points awarded.', 'success');
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = p.likedByMe;
          return {
            ...p,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
            likedByMe: !isLiked
          };
        }
        return p;
      })
    );
  };

  const initiatePayment = (service: DigitalService) => {
    if (currentUser.purchasedServiceIds.includes(service.id)) {
      showToast(`You already own "${service.title}". You can download it directly!`, 'info');
      setActiveTab('payments');
      return;
    }
    setActivePaymentService(service);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setActivePaymentService(null);
  };

  const completePayment = async (
    service: DigitalService, 
    method: 'UPI' | 'QR' | 'NetBanking' | 'Card', 
    upiId?: string
  ): Promise<PaymentTransaction> => {
    const now = new Date();
    const dateFormatted = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' IST';

    const orderId = 'ORD_' + now.getFullYear() + '_' + Math.floor(100000 + Math.random() * 900000);
    const invoiceNumber = 'INV-' + service.id.toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);

    const newTxn: PaymentTransaction = {
      id: 'txn_' + Date.now(),
      orderId,
      serviceId: service.id,
      serviceTitle: service.title,
      amountINR: service.priceINR,
      method,
      upiVpa: upiId || 'customer@okaxis',
      status: 'SUCCESS',
      date: dateFormatted,
      invoiceNumber,
      payerName: currentUser.name,
      payerEmail: currentUser.email
    };

    setTransactions((prev) => [newTxn, ...prev]);

    // Update current user purchased services
    setCurrentUser((prev) => ({
      ...prev,
      purchasedServiceIds: [...prev.purchasedServiceIds, service.id],
      rewardPoints: prev.rewardPoints + 50 // bonus points for supporting genuine digital creators
    }));

    // Update publisher analytics
    setPublisherAnalytics((prev) => ({
      ...prev,
      monthlyGrossRevenue: prev.monthlyGrossRevenue + service.priceINR,
      pendingBalanceINR: prev.pendingBalanceINR + service.priceINR,
      totalServiceOrders: prev.totalServiceOrders + 1,
      revenueBreakdown: {
        ...prev.revenueBreakdown,
        microServicesINR: prev.revenueBreakdown.microServicesINR + service.priceINR
      }
    }));

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    showToast(`Payment of ₹${service.priceINR} confirmed via ${method}! Service unlocked.`, 'success');
    closePaymentModal();
    return newTxn;
  };

  const requestWithdrawal = (amount: number, method: 'IMPS' | 'NEFT' | 'UPI', upiId?: string) => {
    if (amount < 500) {
      return { success: false, message: 'Minimum withdrawal amount to bank account is ₹500 as per banking guidelines.' };
    }
    if (amount > publisherAnalytics.pendingBalanceINR) {
      return { success: false, message: `Insufficient eligible balance. Available: ₹${publisherAnalytics.pendingBalanceINR}` };
    }

    const newWdr: WithdrawalRequest = {
      id: 'wdr_' + Date.now(),
      amountINR: amount,
      method,
      accountDetails: {
        bankName: method === 'UPI' ? 'UPI Virtual Account' : 'State Bank of India',
        accountNumberMasked: method === 'UPI' ? 'N/A' : '•••• •••• •••• 4821',
        ifsc: method === 'UPI' ? 'N/A' : 'SBIN0001248',
        upiId: upiId || 'saipratap@okaxis'
      },
      status: 'PROCESSING',
      requestDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      utrNumber: 'BANK' + Date.now()
    };

    setWithdrawals([newWdr, ...withdrawals]);

    setPublisherAnalytics((prev) => ({
      ...prev,
      pendingBalanceINR: prev.pendingBalanceINR - amount,
      settledEarningsINR: prev.settledEarningsINR + amount
    }));

    showToast(`Withdrawal of ₹${amount} initiated via ${method}. Will settle into your verified bank account shortly.`, 'success');
    return { success: true, message: 'Withdrawal initiated successfully.' };
  };

  const claimDailyCheckIn = () => {
    const today = new Date().toISOString().split('T')[0];
    if (currentUser.lastCheckInDate === today) {
      return { success: false, points: 0, message: 'You have already collected today’s check-in bonus! Come back tomorrow.' };
    }

    const earnedPoints = 15;
    setCurrentUser((prev) => ({
      ...prev,
      streakDays: prev.streakDays + 1,
      rewardPoints: prev.rewardPoints + earnedPoints,
      lastCheckInDate: today
    }));

    showToast(`Daily streak bonus: +${earnedPoints} points awarded! Streak: ${currentUser.streakDays + 1} days`, 'success');
    return { success: true, points: earnedPoints, message: 'Daily streak reward claimed!' };
  };

  const scratchCardReward = () => {
    const pointsOptions = [20, 35, 50, 75, 100];
    const wonPoints = pointsOptions[Math.floor(Math.random() * pointsOptions.length)];
    const wonINR = wonPoints >= 50 ? 5 : 2;

    setCurrentUser((prev) => ({
      ...prev,
      rewardPoints: prev.rewardPoints + wonPoints,
      walletBalanceINR: prev.walletBalanceINR + wonINR
    }));

    showToast(`🎉 Scratch Card Won: +${wonPoints} points and ₹${wonINR} instant wallet credit!`, 'success');
    return { wonPoints, wonINR };
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchDemoUser,
        loginWithEmailOrPhone,
        logout,
        activeTab,
        setActiveTab,
        services,
        posts,
        addPost,
        addComment,
        toggleLikePost,
        transactions,
        withdrawals,
        publisherAnalytics,
        initiatePayment,
        completePayment,
        activePaymentService,
        isPaymentModalOpen,
        closePaymentModal,
        requestWithdrawal,
        claimDailyCheckIn,
        scratchCardReward,
        toasts,
        showToast,
        removeToast,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
