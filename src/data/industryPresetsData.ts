export interface IndustryPreset {
  id: string;
  name: string;
  industry: string;
  badgeColor: string;
  executiveSummary: string;
  challenge: string;
  sundareshInsight: string;
  primaryToolId: string;
  toolSequence: {
    toolId: string;
    toolName: string;
    pillar: string;
    rationale: string;
  }[];
  appliedParameters: {
    label: string;
    value: string;
  }[];
}

export const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: 'b2b-saas-plg',
    name: 'B2B Enterprise SaaS — PLG Expansion & Retention',
    industry: 'Enterprise Technology & Software',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    executiveSummary: 'Transitioning from high-CAC outbound sales to product-led growth (PLG) expansion, lifting Net Revenue Retention to 118% and shortening payback to 11 months.',
    challenge: 'Rising customer acquisition costs (CAC) and customer churn at annual renewals threatening ARR run-rate.',
    sundareshInsight: 'In subscription models, growth is an expansion equation: retaining an existing customer at 120% NRR produces 3.8x greater enterprise valuation than acquiring new churn-prone logos at 18-month payback.',
    primaryToolId: 'ansoff',
    toolSequence: [
      { toolId: 'ansoff', toolName: 'Ansoff Growth Matrix', pillar: 'Corporate Portfolio & Growth', rationale: 'Market Penetration with enterprise tier upgrades and API bundles' },
      { toolId: 'churn', toolName: 'Cohort & Churn Analysis', pillar: 'Data & Analytics', rationale: 'Isolate month-3 drop-offs and enforce proactive customer health scoring' },
      { toolId: 'okrs', toolName: 'OKRs Alignment', pillar: 'Strategy Execution & Governance', rationale: 'Align sales comp with renewal retention rather than first-year booking' },
      { toolId: 'balancedscorecard', toolName: 'Balanced Scorecard', pillar: 'Performance Governance', rationale: 'Map customer onboarding velocity directly to recurring gross margins' }
    ],
    appliedParameters: [
      { label: 'Market Strategy', value: 'Expansion of Core Account Tiers (118% NRR)' },
      { label: 'CAC Payback Target', value: '11 Months' },
      { label: 'Churn Threshold', value: '< 0.6% Monthly Voluntary Churn' },
      { label: 'Gross Margin Buffer', value: '78% Normalized' }
    ]
  },
  {
    id: 'd2c-blue-ocean',
    name: 'Consumer Brand — Blue Ocean Concierge & Moat',
    industry: 'Consumer Goods & Retail',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    executiveSummary: 'Escaping price wars on third-party marketplaces by launching an exclusive membership concierge and family legacy archiving service.',
    challenge: 'Commoditization from white-label competitors and escalating ad bidding wars across social advertising channels.',
    sundareshInsight: 'Value innovation is not about outbidding rivals in saturated red oceans. Eliminate costly discount promotions, raise personalized concierge service, and create an emotional brand archive that cannot be copied on a marketplace shelf.',
    primaryToolId: 'blueocean',
    toolSequence: [
      { toolId: 'blueocean', toolName: 'Blue Ocean Strategy Canvas', pillar: 'Value Innovation', rationale: 'Eliminate marketplace discount coupons; Raise bespoke concierge service' },
      { toolId: 'vrio', toolName: 'VRIO Advantage Framework', pillar: 'Core Competencies', rationale: 'Protect 20-year proprietary artisan supplier relationships' },
      { toolId: 'bmc', toolName: 'Business Model Canvas', pillar: 'Business Model Innovation', rationale: 'Introduce recurring membership tier with guaranteed seasonal curation' },
      { toolId: 'nps', toolName: 'Net Promoter Score Simulator', pillar: 'Marketing & Customer Experience', rationale: 'Drive organic referral loops from VIP promoter cohort (>72 NPS)' }
    ],
    appliedParameters: [
      { label: 'Strategic Posture', value: 'Value Innovation & Concierge Membership' },
      { label: 'Price Elasticity', value: 'Inelastic Premium (+28% Realized ASP)' },
      { label: 'Target NPS', value: '74' },
      { label: 'Customer Retention Rate', value: '86% Annual Renewal' }
    ]
  },
  {
    id: 'industrial-supply-resilience',
    name: 'Industrial OEM — Supply Chain Resilience & Clean Energy',
    industry: 'Advanced Manufacturing & Automotive',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    executiveSummary: 'Mitigating single-source dependency on rare earth components while transitioning machinery lines to high-efficiency electrified powertrains.',
    challenge: 'Critical component lead times extending from 6 weeks to 34 weeks with severe supplier forward-integration risks.',
    sundareshInsight: 'Supply chain defense requires simultaneous multi-sourcing and internal modular architecture. When critical input power is concentrated in single-source suppliers, your balance sheet is held hostage to external shocks.',
    primaryToolId: 'fiveforces',
    toolSequence: [
      { toolId: 'fiveforces', toolName: "Porter's Five Forces", pillar: 'Strategic Environmental Audit', rationale: 'Analyze supplier bargaining leverage and establish dual-source quotas' },
      { toolId: 'riskmatrix', toolName: 'Enterprise Risk Matrix', pillar: 'Crisis & Risk Governance', rationale: 'Quantify probability and balance sheet impact of key port disruptions' },
      { toolId: 'sixsigma', toolName: 'Six Sigma DMAIC', pillar: 'Operational Agility', rationale: 'Reduce sub-assembly re-work defects from 4.1% to 0.7%' },
      { toolId: 'scenarioplanning', toolName: 'Scenario Planning', pillar: 'Strategic Renewal', rationale: 'Stress-test 3-year copper and lithium raw material volatility' }
    ],
    appliedParameters: [
      { label: 'Supplier Redundancy Ratio', value: '60/40 Dual Sourcing' },
      { label: 'Safety Stock Inventory', value: '45 Days Normalized' },
      { label: 'Defect Rate (Sigma Level)', value: '4.8σ (<0.8% Scrap)' },
      { label: 'Capital Reserve Hedging', value: '$14.2M Currency & Commodity Buffer' }
    ]
  },
  {
    id: 'healthcare-lean-flow',
    name: 'Hospital Network — Patient Flow & Lean 5S',
    industry: 'Healthcare & Clinical Services',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    executiveSummary: 'Eliminating emergency room bottlenecks and surgical turnover delays through Value Stream Mapping and standardized clinical 5S protocols.',
    challenge: 'Overcrowded triage queues and rising staff burnout causing patient diversion to competing medical centers.',
    sundareshInsight: 'Lean operations in healthcare is not about cutting care hours—it is about removing non-value-added friction so clinical providers spend maximum touch time directly at the patient bedside.',
    primaryToolId: 'vsm',
    toolSequence: [
      { toolId: 'vsm', toolName: 'Value Stream Mapping', pillar: 'Operational Agility', rationale: 'Map admission to bed assignment, eliminating 48 minutes of triage waiting' },
      { toolId: 'lean', toolName: 'Lean 5S Methodology', pillar: 'Operations & Process', rationale: 'Standardize surgical prep trays and medication replenishment racks' },
      { toolId: 'raci', toolName: 'RACI Governance Matrix', pillar: 'Organizational Leadership', rationale: 'Clarify discharge sign-off accountability between floor nurses and attendings' },
      { toolId: 'kpis', toolName: 'Executive KPI Dashboard', pillar: 'Performance Governance', rationale: 'Track real-time door-to-provider time and 30-day readmission indices' }
    ],
    appliedParameters: [
      { label: 'Average ER Wait Time', value: 'Reduced from 84 min to 26 min' },
      { label: 'Surgical Room Turnover', value: 'Improved by 32%' },
      { label: 'Patient Satisfaction', value: '4.7 / 5.0 Composite' },
      { label: 'Staff Overtime Hours', value: '-22% Across Critical Care' }
    ]
  },
  {
    id: 'fintech-neobank-unit-econ',
    name: 'FinTech Neobank — Capital Efficiency & Unit Economics',
    industry: 'Banking & Financial Technology',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    executiveSummary: 'Navigating interest-rate shifts by diversifying interchange fees into SMB high-margin credit lines, improving return on equity (ROE) to 19.4%.',
    challenge: 'High cost of cash deposits and compression of net interest margins requiring strict capital allocation scrutiny.',
    sundareshInsight: 'A venture-backed valuation is meaningless without positive contribution margins. DuPont decomposition isolates whether returns are driven by genuine operating margin or hazardous leverage.',
    primaryToolId: 'dupont',
    toolSequence: [
      { toolId: 'dupont', toolName: 'DuPont ROE Analysis', pillar: 'Financial & Performance', rationale: 'Deconstruct return on equity into net margin, asset turnover, and equity multiplier' },
      { toolId: 'breakeven', toolName: 'Break-Even Unit Economics', pillar: 'Financial Planning', rationale: 'Determine minimum active accounts needed per tier to fund compliance audits' },
      { toolId: 'montecarlo', toolName: 'Monte Carlo Stress Simulation', pillar: 'Risk Governance', rationale: 'Run 10,000 credit default scenarios under varying rate curves' },
      { toolId: 'pestle', toolName: 'PESTLE Environmental Audit', pillar: 'Strategic Audit', rationale: 'Monitor open-banking data privacy mandates and central bank reserve ratios' }
    ],
    appliedParameters: [
      { label: 'Return on Equity (ROE)', value: '19.4% Annualized' },
      { label: 'Net Interest Margin (NIM)', value: '3.65%' },
      { label: 'Tier-1 Capital Adequacy', value: '14.8%' },
      { label: 'Customer LTV / CAC', value: '4.2x' }
    ]
  }
];
