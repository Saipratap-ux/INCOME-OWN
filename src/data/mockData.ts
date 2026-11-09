import { DigitalService, CommunityPost, PaymentTransaction, WithdrawalRequest, PublisherAnalytics, User, HealthCheckResult } from '../types';

export const DEMO_USERS: Record<string, User> = {
  saipratap: {
    id: 'user_pub_01',
    name: 'Saipratap',
    email: 'saipratapdansana@gmail.com',
    role: 'publisher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    rewardPoints: 2450,
    walletBalanceINR: 520,
    referralCode: 'SAIPRATAP_VIP',
    joinedDate: 'Jan 15, 2025',
    isVerified: true,
    purchasedServiceIds: ['srv_1', 'srv_2', 'srv_3', 'srv_4', 'srv_5', 'srv_6'],
    streakDays: 42,
    lastCheckInDate: new Date().toISOString().split('T')[0],
  },
  rahul: {
    id: 'user_mem_02',
    name: 'Rahul Sharma',
    email: 'rahul.sharma24@gmail.com',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    rewardPoints: 340,
    walletBalanceINR: 40,
    referralCode: 'RAHUL99',
    joinedDate: 'Feb 10, 2025',
    isVerified: true,
    purchasedServiceIds: ['srv_1'],
    streakDays: 7,
    lastCheckInDate: new Date().toISOString().split('T')[0],
  },
  priya: {
    id: 'user_crt_03',
    name: 'Priya Verma',
    email: 'priya.creator@gmail.com',
    role: 'creator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    rewardPoints: 890,
    walletBalanceINR: 110,
    referralCode: 'PRIYA_CREATIVE',
    joinedDate: 'Jan 28, 2025',
    isVerified: true,
    purchasedServiceIds: ['srv_2', 'srv_3'],
    streakDays: 19,
    lastCheckInDate: new Date().toISOString().split('T')[0],
  }
};

export const INITIAL_SERVICES: DigitalService[] = [
  {
    id: 'srv_1',
    title: 'India Govt Exam Fast-Track Cheat Sheet & GK Dossier 2026',
    shortDesc: 'Curated 120-page high-yield revision summaries for SSC CGL, Banking, Railways, and State PSCs.',
    description: 'A comprehensive, exam-ready handbook distilled by top qualifiers. Features quick memory maps, recent central schemes, budget highlights, static GK shortcuts, and formula cards.',
    priceINR: 10,
    originalPriceINR: 299,
    category: 'Exam Prep',
    rating: 4.9,
    reviewsCount: 384,
    downloadsCount: 4210,
    features: [
      'Print-ready PDF + Notion revision dashboard',
      'High-yield formula & shortcut cheat cards',
      'Latest Indian Govt flagship schemes digest',
      'Instant lifetime download with free updates'
    ],
    fileFormat: 'PDF + Notion Link',
    fileSize: '14.8 MB',
    badge: 'Bestseller ₹10 Deal',
    samplePreviewText: 'Table of Contents: 1. Modern Indian History Timelines 2. Indian Polity Crucial Articles 3. Union Budget & Eco Survey Cheat-Sheet 4. Quantitative Aptitude Vedic Math Formulas...'
  },
  {
    id: 'srv_2',
    title: 'Indian Freelancer GST, Invoicing & Contract Toolkit',
    shortDesc: 'Legally compliant freelance client contracts, GST invoice generator spreadsheets & proposal templates.',
    description: 'Designed specifically for Indian developers, designers, copywriters, and consultants. Includes bilingual (English/Hindi) milestone agreements, GST-compliant invoice templates, and payment reminder sequences.',
    priceINR: 10,
    originalPriceINR: 399,
    category: 'Business & GST',
    rating: 4.8,
    reviewsCount: 260,
    downloadsCount: 3120,
    features: [
      'Bilingual freelance contract agreement (MS Word + PDF)',
      'Automated Excel & Google Sheets GST Tax Invoice calculator',
      'UPI payment link & QR integration instructions',
      'Non-disclosure agreement (NDA) template for Indian law'
    ],
    fileFormat: 'DOCX + XLSX + PDF',
    fileSize: '8.2 MB',
    badge: 'Popular for Freelancers',
    samplePreviewText: 'Section 1: Standard Independent Contractor Agreement governed under the Indian Contract Act 1872. Section 2: Automated CGST, SGST & IGST breakdown schedule...'
  },
  {
    id: 'srv_3',
    title: 'Top 500 AI Prompts for Indian Creators, Students & Solopreneurs',
    shortDesc: 'Handcrafted ChatGPT & Gemini prompts optimized for Indian market, Hinglish content, and resume tailoring.',
    description: 'Unlock explosive productivity with prompts tested for Indian competitive exams, YouTube video scripts in Hinglish, cold emails to Indian recruiters, and e-commerce product descriptions.',
    priceINR: 10,
    originalPriceINR: 249,
    category: 'AI & Content',
    rating: 4.9,
    reviewsCount: 512,
    downloadsCount: 5800,
    features: [
      'Hinglish script writing & Instagram reel hooks',
      'ATS resume bullet point enhancers for Indian jobs',
      'Cold email templates for Indian startup founders',
      'Copy-paste prompt guide with examples'
    ],
    fileFormat: 'PDF + Web Access',
    fileSize: '6.4 MB',
    badge: 'Trending 🔥',
    samplePreviewText: 'Prompt Category 1: LinkedIn Viral Hooks for Indian Tech & Corporate. Prompt Category 2: Academic Synopsis & Thesis Drafting. Prompt Category 3: Customer Service Scripts...'
  },
  {
    id: 'srv_4',
    title: 'Verified Remote Work & Internship Playbook for Tier 2/3 India',
    shortDesc: 'Step-by-step roadmap to landing verified work-from-home gigs, avoiding scams, and getting paid in INR/USD.',
    description: 'A practical, hype-free blueprint for ambitious youth in Indian towns and cities. Covers legitimate platforms (Upwork, Internshala, LinkedIn, contra), tax basics, and portfolio building.',
    priceINR: 10,
    originalPriceINR: 349,
    category: 'Career & Jobs',
    rating: 4.7,
    reviewsCount: 198,
    downloadsCount: 2450,
    features: [
      'Curated list of 40+ legitimate remote hiring companies',
      'Anti-scam checklist: how to spot fake tele-calling offers',
      'Portfolio starter templates (No-code, Canva & GitHub)',
      'Payment methods: domestic UPI and international PayPal/Wise guide'
    ],
    fileFormat: 'PDF + Resource Links',
    fileSize: '11.0 MB',
    badge: 'Must Read',
    samplePreviewText: 'Chapter 1: The Remote Landscape in India. Chapter 2: Essential Tech Stack for Remote Gigs. Chapter 3: Red Flags of Telegram & Data Entry Scams...'
  },
  {
    id: 'srv_5',
    title: 'WhatsApp & Instagram Business Automation Kit (Hinglish/English)',
    shortDesc: 'Ready-to-use message templates, quick reply catalogs, and customer greeting scripts for small business.',
    description: 'Empower your local shop, boutique, or agency with tested WhatsApp Business auto-replies, festive discount broadcast templates, and order confirmation flows.',
    priceINR: 10,
    originalPriceINR: 499,
    category: 'Digital Marketing',
    rating: 4.8,
    reviewsCount: 142,
    downloadsCount: 1890,
    features: [
      '75+ copy-paste WhatsApp Business quick replies',
      'Order dispatch and payment acknowledgement scripts',
      'Customer review collection scripts for Google Business',
      'Festival and promotional broadcast templates'
    ],
    fileFormat: 'PDF + Text Snippets',
    fileSize: '5.6 MB',
    samplePreviewText: 'Template 1: Instant Greeting for New Enquiries (Hinglish). Template 2: UPI Payment Details & Invoice Share. Template 3: Gentle Payment Reminder...'
  },
  {
    id: 'srv_6',
    title: 'Personal Financial Freedom Blueprint - PPF, Mutual Funds & Tax Saving',
    shortDesc: 'Clear, jargon-free investment roadmap for Indian beginners earning between ₹15k to ₹1L per month.',
    description: 'Learn how to construct an emergency fund, allocate between index mutual funds, gold, and PPF, and optimize between the Old and New Income Tax regimes.',
    priceINR: 19,
    originalPriceINR: 499,
    category: 'Business & GST',
    rating: 4.9,
    reviewsCount: 310,
    downloadsCount: 3600,
    features: [
      'SIP Return projection spreadsheet with inflation adjustments',
      'Health & Term insurance evaluation checklist',
      'Emergency fund safety calculator',
      'Tax saving strategy comparison guide'
    ],
    fileFormat: 'PDF + Interactive Google Sheet',
    fileSize: '9.5 MB',
    badge: 'High Value',
    samplePreviewText: 'Section 1: The 50-30-20 Rule adapted for Indian household expenses. Section 2: Low-cost Nifty 50 Index Funds vs Direct Equity. Section 3: Safe sovereign gold bonds...'
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    title: 'Welcome to Saipratap S❤️C! Why 100% Free Access & Genuine Value is our Core Promise',
    content: `Namaste community! We built Saipratap S❤️C with one simple belief: Nobody should be asked to pay just to create an account or login. 

We strongly respect the Reserve Bank of India (RBI) guidelines prohibiting money-circulation or pyramid enrollment schemes. On our platform:
1. Registration & all community tools are completely FREE forever.
2. The publisher earns revenue transparently through verified brand advertising, optional ₹10 digital tools, and genuine affiliate commissions.
3. Users earn rewards solely through productive participation (skills quizzes, sharing helpful answers, daily digital tool usage).

Explore the free tools, share your queries, and let's help each other grow!`,
    authorName: 'Saipratap',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    authorRole: 'publisher',
    category: 'Platform Updates',
    tags: ['Welcome', 'RBIGuidelines', 'FreePlatform', 'Transparency'],
    likes: 84,
    likedByMe: true,
    isPinned: true,
    createdAt: '2 days ago',
    comments: [
      {
        id: 'c_1',
        authorName: 'Rahul Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
        authorRole: 'member',
        content: 'This is so refreshing! Every other platform asks for registration fee with false promises. Very proud of this ethical Indian platform.',
        createdAt: '1 day ago',
        likes: 18
      },
      {
        id: 'c_2',
        authorName: 'Priya Verma',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
        authorRole: 'creator',
        content: 'The GST calculator and ₹10 freelance contract pack saved me so much time with my first Bangalore client. Kudos to Saipratap!',
        createdAt: '18 hours ago',
        likes: 12
      }
    ]
  },
  {
    id: 'post_2',
    title: 'How I landed my first remote graphic design project on Internshala without any paid agency',
    content: `Wanted to share my journey as a tier-2 city student (from Indore). I practiced Canva and Figma daily using the free design prompts here. When applying, instead of sending a standard generic resume, I attached a 3-page personalized sample redesign for their brand. 

Within 4 days, they invited me for a Google Meet and gave me a 2-month paid stipend of ₹14,000/month! If you are starting out, don't pay money to scam recruiters. Build real proof of work!`,
    authorName: 'Priya Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    authorRole: 'creator',
    category: 'Freelancing India',
    tags: ['Freelancing', 'Internshala', 'RemoteWork', 'ProofOfWork'],
    likes: 62,
    createdAt: '3 days ago',
    comments: [
      {
        id: 'c_3',
        authorName: 'Amit Patel',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
        authorRole: 'member',
        content: 'Inspiring journey Priya! What kind of portfolio link did you share?',
        createdAt: '2 days ago',
        likes: 4
      }
    ]
  },
  {
    id: 'post_3',
    title: 'New Income Tax Regime for FY 2025-26: Key changes every salaried person must know',
    content: `Quick summary of the updated tax slabs under the Finance Act:
- Standard deduction is now ₹75,000 for salaried employees.
- Nil tax slab up to ₹3,00,000.
- Rebate under section 87A ensures no tax liability up to ₹7,75,000 taxable income under the New Regime!
- Use our free in-house Tax Calculator tool under the Digital Tools section to calculate your exact monthly TDS and take-home pay.`,
    authorName: 'Rahul Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    authorRole: 'member',
    category: 'Govt Schemes',
    tags: ['IncomeTax', 'FY26', 'Finance', 'Budget'],
    likes: 47,
    createdAt: '4 days ago',
    comments: []
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'txn_10928',
    orderId: 'ORD_2025_0912',
    serviceId: 'srv_1',
    serviceTitle: 'India Govt Exam Fast-Track Cheat Sheet & GK Dossier 2026',
    amountINR: 10,
    method: 'UPI',
    upiVpa: 'rahul99@oksbi',
    status: 'SUCCESS',
    date: '2025-05-18 14:32 IST',
    invoiceNumber: 'INV-SSC-2025-0912',
    payerName: 'Rahul Sharma',
    payerEmail: 'rahul.sharma24@gmail.com'
  },
  {
    id: 'txn_10929',
    orderId: 'ORD_2025_0913',
    serviceId: 'srv_2',
    serviceTitle: 'Indian Freelancer GST, Invoicing & Contract Toolkit',
    amountINR: 10,
    method: 'QR',
    upiVpa: 'priya.creator@okaxis',
    status: 'SUCCESS',
    date: '2025-05-18 16:10 IST',
    invoiceNumber: 'INV-GST-2025-0913',
    payerName: 'Priya Verma',
    payerEmail: 'priya.creator@gmail.com'
  },
  {
    id: 'txn_10930',
    orderId: 'ORD_2025_0914',
    serviceId: 'srv_3',
    serviceTitle: 'Top 500 AI Prompts for Indian Creators & Students',
    amountINR: 10,
    method: 'UPI',
    upiVpa: 'vikas_m@paytm',
    status: 'SUCCESS',
    date: '2025-05-19 10:05 IST',
    invoiceNumber: 'INV-AI-2025-0914',
    payerName: 'Vikas Mishra',
    payerEmail: 'vikas.mishra@yahoo.com'
  }
];

export const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'wdr_101',
    amountINR: 12500,
    method: 'IMPS',
    accountDetails: {
      bankName: 'State Bank of India (Main Branch)',
      accountNumberMasked: '•••• •••• •••• 4821',
      ifsc: 'SBIN0001248',
      upiId: 'saipratap@okaxis'
    },
    status: 'COMPLETED',
    requestDate: '2025-05-01 09:15 IST',
    settledDate: '2025-05-01 11:20 IST',
    utrNumber: 'SBI20250501192849182'
  },
  {
    id: 'wdr_102',
    amountINR: 18000,
    method: 'UPI',
    accountDetails: {
      bankName: 'HDFC Bank Ltd',
      accountNumberMasked: '•••• •••• •••• 9034',
      ifsc: 'HDFC0000492',
      upiId: 'saipratap@okhdfcbank'
    },
    status: 'COMPLETED',
    requestDate: '2025-05-10 14:00 IST',
    settledDate: '2025-05-10 14:45 IST',
    utrNumber: 'HDFC2025051084729103'
  }
];

export const INITIAL_PUBLISHER_ANALYTICS: PublisherAnalytics = {
  monthlyGrossRevenue: 48250,
  revenueBreakdown: {
    microServicesINR: 18400,
    adSenseINR: 14600,
    affiliatesINR: 9250,
    sponsorshipsINR: 6000
  },
  totalUsers: 12480,
  activeToday: 1892,
  totalServiceOrders: 1840,
  totalAdImpressions: 89400,
  adEcpm: 163.3,
  affiliateClicks: 3410,
  settledEarningsINR: 30500,
  pendingBalanceINR: 17750
};

export const INITIAL_HEALTH_CHECKS: HealthCheckResult[] = [
  {
    service: 'Core Web Platform & CDN',
    status: 'operational',
    latencyMs: 24,
    details: 'Serving via high-speed edge nodes with 99.98% uptime across Indian regions.',
    lastChecked: 'Just now'
  },
  {
    service: 'Payment Webhook & UPI Verification Gateway',
    status: 'operational',
    latencyMs: 48,
    details: 'NPCI and acquiring bank sandbox integration verified. 0 dropped callbacks.',
    lastChecked: 'Just now'
  },
  {
    service: 'Digital Tools Calculation Engines',
    status: 'operational',
    latencyMs: 12,
    details: 'GST, Income Tax FY26, and UPI QR Code generators active client-side.',
    lastChecked: 'Just now'
  },
  {
    service: 'SSL / TLS 1.3 Security Certificate',
    status: 'operational',
    latencyMs: 18,
    details: 'Valid 256-bit encryption certificate; all requests strictly HTTPS.',
    lastChecked: 'Just now'
  },
  {
    service: 'Community Database & Activity Log',
    status: 'operational',
    latencyMs: 31,
    details: 'Read/write operational; spam filters and moderation triggers nominal.',
    lastChecked: 'Just now'
  },
  {
    service: 'Broken Link & Dead URL Scanner',
    status: 'operational',
    latencyMs: 65,
    details: 'Scanned 16 platform routes and external legal references. 0 dead links detected.',
    lastChecked: 'Just now'
  }
];
