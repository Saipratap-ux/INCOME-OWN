export type UserRole = 'member' | 'creator' | 'publisher';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  role: UserRole;
  rewardPoints: number;
  walletBalanceINR: number;
  referralCode: string;
  joinedDate: string;
  isVerified: boolean;
  purchasedServiceIds: string[];
  streakDays: number;
  lastCheckInDate?: string;
}

export interface DigitalService {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  priceINR: number;
  originalPriceINR: number;
  category: 'Career & Jobs' | 'Business & GST' | 'AI & Content' | 'Exam Prep' | 'Digital Marketing';
  rating: number;
  reviewsCount: number;
  downloadsCount: number;
  features: string[];
  fileFormat: string;
  fileSize: string;
  badge?: string;
  samplePreviewText: string;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  category: 'Earning Opportunities' | 'Career & Skills' | 'Govt Schemes' | 'Freelancing India' | 'Platform Updates';
  tags: string[];
  likes: number;
  likedByMe?: boolean;
  comments: CommunityComment[];
  createdAt: string;
  isPinned?: boolean;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  serviceId?: string;
  serviceTitle: string;
  amountINR: number;
  method: 'UPI' | 'QR' | 'NetBanking' | 'Card';
  upiVpa?: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  date: string;
  invoiceNumber: string;
  payerName: string;
  payerEmail: string;
}

export interface WithdrawalRequest {
  id: string;
  amountINR: number;
  method: 'IMPS' | 'NEFT' | 'UPI';
  accountDetails: {
    bankName: string;
    accountNumberMasked: string;
    ifsc: string;
    upiId?: string;
  };
  status: 'COMPLETED' | 'PROCESSING' | 'PENDING';
  requestDate: string;
  settledDate?: string;
  utrNumber?: string;
}

export interface PublisherAnalytics {
  monthlyGrossRevenue: number;
  revenueBreakdown: {
    microServicesINR: number;
    adSenseINR: number;
    affiliatesINR: number;
    sponsorshipsINR: number;
  };
  totalUsers: number;
  activeToday: number;
  totalServiceOrders: number;
  totalAdImpressions: number;
  adEcpm: number;
  affiliateClicks: number;
  settledEarningsINR: number;
  pendingBalanceINR: number;
}

export interface HealthCheckResult {
  service: string;
  status: 'operational' | 'degraded' | 'maintenance';
  latencyMs: number;
  details: string;
  lastChecked: string;
}
