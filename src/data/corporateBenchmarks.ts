export interface CorporateBenchmark {
  id: string;
  toolId: string;
  companyName: string;
  ticker?: string;
  industry: string;
  logoInitial: string;
  accentColor: string;
  headlineMetric: string;
  description: string;
  strategicTakeaway: string;
  metrics: { label: string; value: string; note?: string }[];
}

export const CORPORATE_BENCHMARKS: Record<string, CorporateBenchmark[]> = {
  // 1. DuPont Analysis
  dupont: [
    {
      id: 'dupont-apple',
      toolId: 'dupont',
      companyName: 'Apple Inc.',
      ticker: 'AAPL',
      industry: 'Consumer Technology & Services',
      logoInitial: '🍎',
      accentColor: 'indigo',
      headlineMetric: 'ROE ~147%',
      description: 'High net profit margins combined with aggressive share repurchases creating extraordinary financial leverage.',
      strategicTakeaway: 'Apple drives ROE not through high asset turnover, but by pairing a 25% net margin with negative net equity from massive cash return programs.',
      metrics: [
        { label: 'Net Profit Margin', value: '25.3%', note: 'Hardware premium + 70% Services gross margin' },
        { label: 'Asset Turnover', value: '1.08x', note: 'Fabless outsourcing keeps asset base lean' },
        { label: 'Financial Leverage', value: '5.38x', note: 'Equity reduced via $90B+ annual buybacks' }
      ]
    },
    {
      id: 'dupont-costco',
      toolId: 'dupont',
      companyName: 'Costco Wholesale',
      ticker: 'COST',
      industry: 'Membership Warehouse Retail',
      logoInitial: '🛒',
      accentColor: 'emerald',
      headlineMetric: 'ROE ~28%',
      description: 'Ultra-low net margin offset by extraordinary inventory and asset turnover funded by membership fees.',
      strategicTakeaway: 'Costco operates on a 2.6% net margin but achieves a high 28% ROE by turning over total assets 3.6 times per year.',
      metrics: [
        { label: 'Net Profit Margin', value: '2.6%', note: 'Caps merchandise markups at 14-15%' },
        { label: 'Asset Turnover', value: '3.62x', note: 'High velocity bulk SKU throughput' },
        { label: 'Financial Leverage', value: '2.95x', note: 'Conservative debt with high working capital velocity' }
      ]
    },
    {
      id: 'dupont-bofa',
      toolId: 'dupont',
      companyName: 'Bank of America',
      ticker: 'BAC',
      industry: 'Commercial & Investment Banking',
      logoInitial: '🏦',
      accentColor: 'amber',
      headlineMetric: 'ROE ~11.2%',
      description: 'Classic financial institution model: low asset turnover compensated by high balance-sheet leverage on deposits.',
      strategicTakeaway: 'Banks hold trillions in assets on balance sheet (low turnover of 0.03x), requiring 10-12x equity multiplier leverage to generate competitive ROE.',
      metrics: [
        { label: 'Net Profit Margin', value: '28.4%', note: 'Net interest spread + fee income' },
        { label: 'Asset Turnover', value: '0.034x', note: 'Trillion-dollar loan book assets' },
        { label: 'Financial Leverage', value: '11.6x', note: 'Tier-1 capital regulatory minimum' }
      ]
    }
  ],

  // 2. Working Capital & Cash Conversion Cycle
  workingcapital: [
    {
      id: 'wc-amazon',
      toolId: 'workingcapital',
      companyName: 'Amazon.com',
      ticker: 'AMZN',
      industry: 'E-Commerce & Cloud Infrastructure',
      logoInitial: '📦',
      accentColor: 'emerald',
      headlineMetric: 'CCC -28 Days',
      description: 'The premier negative cash conversion cycle. Amazon collects cash from customers before paying suppliers.',
      strategicTakeaway: 'Suppliers provide an interest-free float that funded Amazon AWS and fulfillment center capex without issuing debt.',
      metrics: [
        { label: 'Days Sales Outstanding (DSO)', value: '22 Days', note: 'Instant credit card collection' },
        { label: 'Days Inventory Outstanding (DIO)', value: '34 Days', note: 'High velocity automated fulfillment' },
        { label: 'Days Payables Outstanding (DPO)', value: '84 Days', note: 'High supplier leverage and payment terms' }
      ]
    },
    {
      id: 'wc-boeing',
      toolId: 'workingcapital',
      companyName: 'Boeing Aerospace',
      ticker: 'BA',
      industry: 'Commercial Aviation & Defense',
      logoInitial: '✈️',
      accentColor: 'amber',
      headlineMetric: 'CCC +118 Days',
      description: 'Extreme positive cash conversion cycle due to multi-year aircraft assembly lead times and supply chain parts inventory.',
      strategicTakeaway: 'Requires heavy revolving credit lines and customer progress milestone payments to avoid liquidity starvation during production delays.',
      metrics: [
        { label: 'Days Sales Outstanding (DSO)', value: '48 Days', note: 'Airline delivery final settlements' },
        { label: 'Days Inventory Outstanding (DIO)', value: '175 Days', note: 'Fuselage and avionics pipeline' },
        { label: 'Days Payables Outstanding (DPO)', value: '105 Days', note: 'Extended terms with Tier-1 aerospace vendors' }
      ]
    },
    {
      id: 'wc-walmart',
      toolId: 'workingcapital',
      companyName: 'Walmart Inc.',
      ticker: 'WMT',
      industry: 'Omnichannel Supercenter Retail',
      logoInitial: '🏪',
      accentColor: 'blue',
      headlineMetric: 'CCC +3 Days',
      description: 'Near-zero working capital footprint. Sells and restocks shelves in cadence with supplier payment invoices.',
      strategicTakeaway: 'Cross-docking logistics keeps inventory velocity matched almost day-for-day with trade payables.',
      metrics: [
        { label: 'Days Sales Outstanding (DSO)', value: '4 Days', note: '99% retail point-of-sale' },
        { label: 'Days Inventory Outstanding (DIO)', value: '41 Days', note: 'Fast grocery turn' },
        { label: 'Days Payables Outstanding (DPO)', value: '42 Days', note: 'Direct vendor EDI integration' }
      ]
    }
  ],

  // 3. Porter's Five Forces
  porter: [
    {
      id: 'porter-airline',
      toolId: 'porter',
      companyName: 'Commercial Airlines',
      ticker: 'DAL / UAL',
      industry: 'Passenger Aviation Transport',
      logoInitial: '🛫',
      accentColor: 'rose',
      headlineMetric: 'Attractiveness: 1.8 / 5',
      description: 'Historically poor structural profitability due to duopoly suppliers, price-sensitive consumers, and cutthroat rivalry.',
      strategicTakeaway: 'Airlines have high fixed costs, fierce rivalry, and powerful suppliers (Boeing/Airbus, jet fuel), suppressing long-term ROIC.',
      metrics: [
        { label: 'Supplier Power', value: '9/10 (High)', note: 'Boeing/Airbus & JetA1 fuel producers' },
        { label: 'Buyer Power', value: '8/10 (High)', note: 'Google Flights price comparison' },
        { label: 'Competitive Rivalry', value: '9/10 (Severe)', note: 'Perishable seat capacity warfare' }
      ]
    },
    {
      id: 'porter-pharma',
      toolId: 'porter',
      companyName: 'Patented Biotech (GLP-1s)',
      ticker: 'LLY / NVO',
      industry: 'Metabolic & Oncology Therapeutics',
      logoInitial: '💊',
      accentColor: 'emerald',
      headlineMetric: 'Attractiveness: 4.8 / 5',
      description: 'Extraordinary pricing power protected by 20-year patent exclusivity, FDA regulatory moats, and high switching costs.',
      strategicTakeaway: 'Patent-protected drugs command 80%+ gross margins because generic entrants are legally barred and clinical efficacy is unmatched.',
      metrics: [
        { label: 'Threat of Entrants', value: '2/10 (Minimal)', note: '$2B+ clinical trial barrier to entry' },
        { label: 'Buyer Power', value: '3/10 (Low)', note: 'Insured coverage & inelastic medical demand' },
        { label: 'Competitive Rivalry', value: '3/10 (Duopoly)', note: 'Eli Lilly vs. Novo Nordisk' }
      ]
    }
  ],

  // 4. BCG Growth-Share Matrix
  bcg: [
    {
      id: 'bcg-alphabet',
      toolId: 'bcg',
      companyName: 'Alphabet Inc.',
      ticker: 'GOOGL',
      industry: 'Digital Advertising & AI Services',
      logoInitial: '🔍',
      accentColor: 'indigo',
      headlineMetric: 'Cash Cow: $175B+',
      description: 'Text search generates steady billions that fund high-growth Stars (Google Cloud) and experimental Question Marks (Waymo).',
      strategicTakeaway: 'A textbook corporate portfolio where 90% of free cash flow from a mature Cash Cow is reinvested into next-generation Stars.',
      metrics: [
        { label: 'Cash Cow', value: 'Google Search & YouTube Ads', note: '70%+ digital ad market share' },
        { label: 'Star', value: 'Google Cloud Platform (GCP)', note: '28% YoY growth, expanding margins' },
        { label: 'Question Mark', value: 'Waymo Autonomous Driving', note: 'Heavy capex, high optionality' }
      ]
    }
  ],

  // 5. Churn Analysis & Retention
  churnanalysis: [
    {
      id: 'churn-saas',
      toolId: 'churnanalysis',
      companyName: 'Enterprise SaaS (Datadog)',
      ticker: 'DDOG',
      industry: 'B2B Observability Cloud',
      logoInitial: '📊',
      accentColor: 'emerald',
      headlineMetric: 'Net Retention 118%',
      description: 'Gross logo churn under 0.8% monthly paired with account expansion yields net negative churn.',
      strategicTakeaway: 'In elite B2B SaaS, expansion revenue from existing accounts outpaces customer losses, causing ARR to grow even with 0 new logos.',
      metrics: [
        { label: 'Monthly Logo Churn', value: '0.65%', note: 'Embedded mission-critical workflow' },
        { label: 'Net Revenue Retention', value: '118%', note: 'Usage-based volume growth' },
        { label: 'Avg Customer Lifetime', value: '12.8 Years', note: 'LTV/CAC ratio exceeds 6.2x' }
      ]
    },
    {
      id: 'churn-streaming',
      toolId: 'churnanalysis',
      companyName: 'Direct Streaming (Netflix)',
      ticker: 'NFLX',
      industry: 'Consumer Entertainment SVOD',
      logoInitial: '🎬',
      accentColor: 'amber',
      headlineMetric: 'Monthly Churn 2.2%',
      description: 'Lowest churn in consumer streaming industry due to personalized recommendation engine and weekly content cadence.',
      strategicTakeaway: 'Competitors suffer 5-7% monthly churn as users cancel after watching a hit show; Netflix achieves sub-2.5% churn via content breadth.',
      metrics: [
        { label: 'Monthly Churn', value: '2.15%', note: 'Lowest in SVOD industry' },
        { label: 'Customer Lifetime', value: '46 Months', note: 'ARPU $16.50/mo' },
        { label: 'Re-activation Rate', value: '31%', note: 'Paused users return within 6 months' }
      ]
    }
  ],

  // 6. Ansoff Matrix
  ansoff: [
    {
      id: 'ansoff-starbucks',
      toolId: 'ansoff',
      companyName: 'Starbucks Coffee Co.',
      ticker: 'SBUX',
      industry: 'Global Retail Beverages',
      logoInitial: '☕',
      accentColor: 'emerald',
      headlineMetric: 'All 4 Quadrants Active',
      description: 'Systematic execution across Market Penetration, Market Development, Product Development, and Diversification.',
      strategicTakeaway: 'Starbucks extracts maximum enterprise value by orchestrating all 4 Ansoff quadrants simultaneously.',
      metrics: [
        { label: 'Market Penetration', value: 'Rewards App & Drive-Thrus', note: 'More visits from existing customers' },
        { label: 'Market Development', value: 'Rapid Tier-2/3 Expansion in China', note: 'Entering new geography' },
        { label: 'Product Development', value: 'Cold Brew, Nitro, & Plant Milks', note: 'New drinks for existing stores' },
        { label: 'Diversification', value: 'Ready-To-Drink Grocery & Reserve', note: 'Nestle global coffee alliance' }
      ]
    }
  ],

  // 7. Break-Even Analysis
  breakeven: [
    {
      id: 'be-saas-vs-oem',
      toolId: 'breakeven',
      companyName: 'B2B Software vs. Auto OEM',
      ticker: 'MSFT vs F',
      industry: 'Operating Leverage Comparison',
      logoInitial: '⚖️',
      accentColor: 'indigo',
      headlineMetric: 'High vs. Low Operating Leverage',
      description: 'Software platforms bear huge upfront fixed engineering costs but near-zero marginal cost, creating infinite post-breakeven margins.',
      strategicTakeaway: 'Once a SaaS company clears its fixed break-even hurdle, 85 cents of every incremental dollar flows straight to operating profit.',
      metrics: [
        { label: 'Software Contribution Margin', value: '88%', note: 'Variable cost $12/seat server' },
        { label: 'Automotive Contribution Margin', value: '18%', note: 'Steel, battery, assembly labor' },
        { label: 'Post-BE Profit Velocity', value: '5.2x faster', note: 'Operating leverage multiplier' }
      ]
    }
  ]
};

// Generic corporate fallback for tools without a custom benchmark
export function getCorporateBenchmarksForTool(toolId: string, companyFallback: string): CorporateBenchmark[] {
  if (CORPORATE_BENCHMARKS[toolId]) {
    return CORPORATE_BENCHMARKS[toolId];
  }

  return [
    {
      id: `benchmark-${toolId}-primary`,
      toolId,
      companyName: companyFallback || 'Global Market Leader',
      industry: 'Fortune 500 Benchmark',
      logoInitial: '🏛️',
      accentColor: 'indigo',
      headlineMetric: 'Industry P75 Benchmark',
      description: `Institutional reference dataset calibrated for ${companyFallback || 'industry leaders'} executing this framework.`,
      strategicTakeaway: `Top-quartile operators utilize this methodology during quarterly strategic reviews to maintain defensible competitive advantages.`,
      metrics: [
        { label: 'Target Operating Margin', value: '24.5%', note: 'Top quartile P75' },
        { label: 'Execution Velocity', value: '90-Day Cadence', note: 'OKR synchronization' },
        { label: 'ROI Multiple', value: '3.8x', note: '3-year capital efficiency' }
      ]
    }
  ];
}
