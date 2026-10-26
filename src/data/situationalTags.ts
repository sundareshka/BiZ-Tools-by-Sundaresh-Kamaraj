export interface SituationalTag {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  executiveQuestion: string;
  toolIds: string[];
}

export const SITUATIONAL_TAGS: SituationalTag[] = [
  {
    id: 'turnaround',
    label: 'Crisis & Turnaround',
    shortLabel: 'Crisis',
    description: 'Emergency stabilization, rapid cash bleed reduction, operational fire-fighting, and risk mitigation.',
    executiveQuestion: 'How do we stop cash burn and stabilize the core operating model within 30-90 days?',
    toolIds: ['workingcapital', 'breakeven', 'lean', 'raci', 'pestle', 'riskmatrix', 'kaizen', 'sixsigma']
  },
  {
    id: 'scaleup',
    label: 'Startup & Scaleup',
    shortLabel: 'Scaleup',
    description: 'Product-market fit validation, rapid unit economics scaling, customer acquisition loops, and roadmap execution.',
    executiveQuestion: 'How do we validate demand quickly and build repeatable, high-velocity customer acquisition engines?',
    toolIds: ['bmc', 'leancanvas', 'mvp', 'growthhacking', 'stp', 'aida', 'productroadmap', 'abtesting', 'churnanalysis']
  },
  {
    id: 'ma-valuation',
    label: 'M&A & Due Diligence',
    shortLabel: 'M&A',
    description: 'Target strategic evaluation, synergy modeling, balance sheet stress testing, and organizational integration.',
    executiveQuestion: 'Does this target possess a defensible moat, and where do genuine post-merger synergies exist?',
    toolIds: ['dupont', 'costbenefit', 'vrio', 'porter', 'mckinsey7s', 'activitybasedcosting', 'decisiontree']
  },
  {
    id: 'cost-optimization',
    label: 'Cost & Margin Optimization',
    shortLabel: 'Cost Reduction',
    description: 'Eliminating non-value-add waste, activity-based overhead reduction, inventory velocity, and operational throughput.',
    executiveQuestion: 'Where are hidden operating costs eroding unit margins, and how do we unlock working capital?',
    toolIds: ['lean', 'activitybasedcosting', 'vsm', 'bpr', 'workingcapital', 'breakeven', 'kaizen', 'pareto']
  },
  {
    id: 'pricing-margins',
    label: 'Pricing & Moats',
    shortLabel: 'Pricing',
    description: 'Pricing power defense, premium tier capture, supplier/buyer power resistance, and gross margin protection.',
    executiveQuestion: 'How can we raise realized prices without triggering customer churn or inviting competitive retaliation?',
    toolIds: ['porter', 'marketingmix', 'breakeven', 'dupont', 'blueocean', 'vpc', 'jtbd']
  },
  {
    id: 'market-entry',
    label: 'Market Entry & Growth',
    shortLabel: 'Expansion',
    description: 'TAM expansion, new geographic or vertical launch, competitive wedge strategy, and category creation.',
    executiveQuestion: 'Which adjacent markets offer the highest risk-adjusted return and lowest barrier to differentiation?',
    toolIds: ['ansoff', 'blueocean', 'pestle', 'porter', 'jtbd', 'stp', 'scenarioplanning']
  },
  {
    id: 'governance',
    label: 'Boardroom & Governance',
    shortLabel: 'Governance',
    description: 'C-suite goal alignment, multi-perspective scorecarding, executive decision trees, and black swan resilience.',
    executiveQuestion: 'How do we maintain board alignment, stress-test high-stakes bets, and cascade accountability?',
    toolIds: ['bsc', 'okrs', 'scenarioplanning', 'decisiontree', 'riskmatrix', 'mckinsey7s', 'montecarlo']
  },
  {
    id: 'org-performance',
    label: 'Team & Org Velocity',
    shortLabel: 'People & Org',
    description: 'Cross-functional role clarity, talent retention, cultural transformation, and agile execution sprint cadence.',
    executiveQuestion: 'How do we eliminate cross-silo decision friction, align incentives, and retain critical leaders?',
    toolIds: ['raci', 'mckinsey7s', 'engagementsurvey', 'performanceappraisal', 'competencymapping', 'agile', 'scrum']
  }
];

export function getSituationalTagsForTool(toolId: string): SituationalTag[] {
  return SITUATIONAL_TAGS.filter(tag => tag.toolIds.includes(toolId));
}
