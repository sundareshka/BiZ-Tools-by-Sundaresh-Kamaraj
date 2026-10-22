import { LucideIcon } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface CaseStudy {
  company: string;
  revenue: string;
  staff: string;
  profile: string;
  challenge: string;
  whyChosen: string;
  steps: string[];
  results: string[];
  lessonsLearned: string[];
}

export interface ToolDefinition {
  id: string;
  name: string;
  shortName: string;
  category: string;
  icon?: LucideIcon;
  tagline: string;
  origin: string;
  corePurpose: string;
  primaryUsers: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  horizon: string;
  scope: string;
  timeToResult: string;
  dataNeeds: string;
  keyOutput: string;
  bestPairedWith: string;
  keyFeatures: string[];
  howItWorks: string;
  coreConcepts: { term: string; definition: string }[];
  strengths: string[];
  limitations: string[];
  workflowPlacement: {
    upstream: string;
    downstream: string;
  };
  useCases: {
    title: string;
    scenario?: string;
    situation?: string;
    industry?: string;
    problem?: string;
    action?: string;
    howItHelps?: string;
    outcome: string;
  }[];
  caseStudy: CaseStudy;
  implementationGuide?: {
    prerequisites: string[];
    steps: string[];
    checklist: string[];
    commonMistakes: { mistake: string; fix: string }[];
    plan306090: { d30: string; d60: string; d90: string };
    proTips: string[];
  };
  whenNotToUse?: {
    alternative: string;
    reason: string;
  }[];
  reflectionPrompts?: string[];
  quickReferenceCard?: string[];
  quiz: QuizQuestion[];
}

export const TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'swot',
    name: 'SWOT & TOWS Analysis',
    shortName: 'SWOT',
    category: 'Strategy & Planning',
    tagline: 'Audit internal strengths & weaknesses against external opportunities & threats',
    origin: 'Stanford Research Institute in the 1960s (Albert Humphrey). In continuous use for 50+ years.',
    corePurpose: 'To force a balanced look at both the inside and outside of the business before any strategic direction is chosen.',
    primaryUsers: ['Owners and founders', 'Department heads', 'Marketing & product teams', 'Consultants', 'Corporate trainees'],
    difficulty: 'Beginner',
    horizon: 'Now / Current state',
    scope: 'Firm / Division / Product',
    timeToResult: 'Half day',
    dataNeeds: 'Low',
    keyOutput: '4-quadrant factor list + TOWS actionable strategy matrix',
    bestPairedWith: 'Takes input from PESTLE, Five Forces; Feeds Ansoff, Balanced Scorecard, OKRs',
    keyFeatures: [
      'Two-by-two grid: internal (S, W) vs external (O, T), positive vs negative',
      'Extends into the TOWS matrix (SO, WO, ST, WT action strategies)',
      'Requires no heavy data infrastructure; works with cross-functional workshops',
      'Naturally captures qualitative frontline employee insights',
      'Easy to repeat quarterly or annually to track organizational shifts'
    ],
    howItWorks: 'A facilitator gathers a cross-functional group, defines scope and time horizon, then populates quadrants. Strengths and weaknesses are things management controls (people, process, brand, tech). Opportunities and threats are external things management does not control (market shifts, regulation, rivals). Factors are verified with evidence, prioritized by impact and probability, and cross-matched in TOWS.',
    coreConcepts: [
      {
        term: 'Internal vs External Rule',
        definition: 'The single most important distinction: If you can change it directly by a management decision by Friday, it is internal (S/W). If it happens outside your direct authority, it is external (O/T).'
      },
      {
        term: 'TOWS Matrix',
        definition: 'The action layer of SWOT: SO (use strengths to seize opportunities), WO (fix weaknesses to pursue opportunities), ST (use strengths to blunt threats), WT (minimize weaknesses and avoid threats).'
      },
      {
        term: 'Relative Strength',
        definition: 'A capability is only a strength relative to named competitors and customer willingness to pay. Generic claims like "good customer service" are not strengths if rivals offer the same.'
      },
      {
        term: 'Evidence Tag',
        definition: 'Every item must cite a concrete data point, metric, or customer quote. Factors without evidence are unverified hypotheses.'
      }
    ],
    strengths: [
      'Fast, intuitive, and builds universal shared language across departments',
      'Surfaces tacit frontline knowledge often hidden from senior executives',
      'Inexpensive and flexible across company scales and business models'
    ],
    limitations: [
      'Produces long unprioritized "laundry lists" if not strictly ranked (cap at 3-5)',
      'Vulnerable to optimism bias (softening weaknesses, ignoring threats)',
      'Static snapshot; does not model dynamic competitive maneuvers on its own without TOWS'
    ],
    workflowPlacement: {
      upstream: 'PESTLE (for O & T), Porter’s Five Forces (for T & O), financial & customer audit (for S & W)',
      downstream: 'Ansoff Matrix (growth choices), VRIO (testing strength durability), Balanced Scorecard & OKRs (execution)'
    },
    useCases: [
      {
        title: 'Family-Run Retail Store (12 staff)',
        scenario: 'A hardware retailer in a Tier-2 city faces an aggressive national chain opening nearby.',
        problem: 'The owner’s reflexive instinct was to enter an unsustainable price war.',
        howItHelps: 'SWOT revealed contractor credit relationships and local brands as distinctive strengths, weak e-commerce as weakness, and national chain standardized stock as an opening.',
        outcome: 'Store repositioned around contractor accounts and regional products, preserving gross margins.'
      },
      {
        title: 'EdTech Startup (Pre-seed)',
        scenario: 'Founders preparing an investor seed pitch deck.',
        problem: 'Investors kept asking "Why you?", but founders pitched generic product features.',
        howItHelps: 'Forced them to identify founder academic pedagogy domain expertise as strength and sales execution as a transparent weakness to hire against.',
        outcome: 'Crafted a defensible "Why Us, Why Now" thesis and a clear hiring plan tied to the funding round.'
      }
    ],
    caseStudy: {
      company: 'Kaveri Agro Supplies',
      revenue: '₹18 Crore',
      staff: '35 employees, 1,200 farmer customers, 40 retail dealers in Madurai',
      profile: '20-year-old agricultural inputs distributor facing revenue plateau and doorstep online delivery startups.',
      challenge: 'Owner’s son pushed for a expensive proprietary app; senior sales team resisted change.',
      whyChosen: 'Needed a neutral, low-cost method that all 8 cross-functional members could participate in within one day without costly outside consultants.',
      steps: [
        'Defined scope: "Kaveri dealer and farmer business over next 24 months"',
        '8 participants: owner, son, 3 senior salesmen, accountant, warehouse head, 1 dealer as external voice',
        'Pre-work: each brought 3 evidenced facts per quadrant; 63 raw factors clustered into 19 items',
        'Dot-voting to isolate top 4 per quadrant, then built TOWS matrix generating 9 candidate strategies',
        'Selected top 3 strategies with designated 90-day owners and measurable targets'
      ],
      results: [
        'Introduced WhatsApp-based ordering with credit for existing dealers (SO strategy): 38% orders moved to WhatsApp, cycle dropped from 2 days to 4 hours',
        'Agronomist advisory farm visits bundled with bulk orders (ST strategy): farmer-direct sales grew 14%',
        'Deferred building a standalone app (WT strategy: avoid spending on a technical weakness while working capital was tight)',
        'Overall annual revenue grew 11% compared to 0.5% the prior year'
      ],
      lessonsLearned: [
        'Inviting an actual dealer changed the tone; several internally cherished "strengths" were not valued by customers',
        'The TOWS matching step created the real ROI; SWOT alone is just an audit',
        'Enforcing pre-work evidence prevented the first two hours being wasted on subjective opinions'
      ]
    },
    implementationGuide: {
      prerequisites: ['Executive sponsor committed to acting on results', 'Facilitator who is not the most senior leader', '6-10 cross-functional participants', 'Designated scribe'],
      steps: [
        'Define a single-line scope statement and horizon 1 week ahead',
        'Distribute pre-work requiring evidence tags for every candidate factor',
        'Conduct workshop: test internal vs external rule with 2 live examples',
        'Brainstorm S first, then W, then O, then T (15 min each)',
        'Cluster duplicates and prioritize using Impact (1-5) x Probability (1-5) scoring',
        'Cap top factors at 3-5 per quadrant',
        'Build TOWS matrix: generate at least 2 strategies per cell (SO, WO, ST, WT)',
        'Select 3-5 high-priority initiatives with named owners, 90-day milestones, and metrics'
      ],
      checklist: [
        'Scope & horizon written and agreed',
        'Internal vs external test understood ("Can CEO change this by Friday?")',
        'Evidence citations attached to each factor',
        'Dot-voting or Impact x Probability scoring completed',
        'TOWS action matrix populated',
        'Owners & 90-day milestones assigned'
      ],
      commonMistakes: [
        { mistake: 'Listing generic strengths ("good team")', fix: 'Demand comparison to a named competitor and customer willingness to pay' },
        { mistake: 'Mixing internal and external factors', fix: 'Ask: "Could management change or reverse this by Friday afternoon?"' },
        { mistake: 'Stopping at the 2x2 grid without TOWS', fix: 'Always run TOWS matching to generate actionable strategy pairs' },
        { mistake: 'Senior boss speaking first', fix: 'Enforce silent individual sticky-note writing before group debate' }
      ],
      plan306090: {
        d30: 'Run workshop, publish 1-page summary, launch top 3 TOWS initiatives with owners.',
        d60: 'Hold 60-day milestone review; inspect leading metrics and reallocate resources.',
        d90: 'Run a lightweight SWOT review to check which factors shifted; feed into Ansoff or OKRs.'
      },
      proTips: [
        'Always define relative strength against a named rival, not in vacuum.',
        'Invite one external voice (trusted dealer, customer, advisor) to eliminate self-congratulation.',
        'Keep a "parking lot" for valid observations that fall outside the agreed scope.'
      ]
    },
    whenNotToUse: [
      { alternative: 'SOAR Framework', reason: 'Choose SOAR when team morale is low and an appreciative, forward-looking session is needed rather than problem auditing.' },
      { alternative: 'VRIO Framework', reason: 'Choose VRIO when you need to rigorously test whether a specific internal advantage is defensible against rivals.' }
    ],
    reflectionPrompts: [
      'Which of your organization’s listed strengths would a customer actually pay more for?',
      'What strategic threat has your team been aware of for over a year without taking action?',
      'Who in your company sees operational weaknesses most clearly, and were they in the room?'
    ],
    quickReferenceCard: [
      'Use when: You need a fast, shared snapshot of competitive position before making decisions.',
      'Internal = S/W; External = O/T. Test: "Can management alter this directly?"',
      'Strict limit: Max 5 factors per quadrant with evidence notes.',
      'Always execute TOWS (SO, WO, ST, WT) to convert factors into actionable projects.',
      'Pairs with: PESTLE & Five Forces (inputs) -> Ansoff, BSC & OKRs (outputs).'
    ],
    quiz: [
      {
        id: 'swot-1',
        question: 'A strong brand reputation among existing customers is best classified as:',
        options: ['Opportunity', 'Strength', 'Threat', 'Weakness'],
        correctAnswer: 1,
        explanation: 'Reputation is built by the firm’s past internal actions and decisions; it is an internal positive attribute (Strength).'
      },
      {
        id: 'swot-2',
        question: 'Which of the following is an external factor in a SWOT analysis?',
        options: ['High staff turnover', 'Outdated e-commerce website', 'A new data-protection compliance law', 'Low working capital reserves'],
        correctAnswer: 2,
        explanation: 'Government regulations and laws are entirely outside management’s direct control; hence they are external (Threat or Opportunity).'
      },
      {
        id: 'swot-3',
        question: 'What is the primary function of the TOWS matrix?',
        options: ['To replace SWOT completely', 'To rank factors by implementation cost', 'To generate actionable strategies by cross-matching quadrants', 'To calculate financial return on investment'],
        correctAnswer: 2,
        explanation: 'TOWS matches internal S/W with external O/T to formulate SO, WO, ST, and WT strategic initiatives.'
      },
      {
        id: 'swot-4',
        question: 'In TOWS terminology, what does a "WO" strategy represent?',
        options: ['Using strengths to exploit opportunities', 'Overcoming internal weaknesses to pursue external opportunities', 'Avoiding threats by mitigating weaknesses', 'Leveraging strengths to neutralize competitor threats'],
        correctAnswer: 1,
        explanation: 'WO (Mini-Maxi) strategies focus on fixing or circumventing an internal weakness to capture an attractive external opportunity.'
      },
      {
        id: 'swot-5',
        question: 'What is the most frequent failure mode observed in SWOT workshops?',
        options: ['Having too few participants', 'Generating long unranked factor lists with zero follow-up actions', 'Using physical or digital whiteboards', 'Inviting an external client or advisor'],
        correctAnswer: 1,
        explanation: 'Unprioritized lists without evidence or TOWS action conversion leave teams with endless talking points and zero execution.'
      }
    ]
  },
  {
    id: 'pestle',
    name: 'PESTLE Analysis',
    shortName: 'PESTLE',
    category: 'Strategy & Planning',
    tagline: 'Scan macro-environmental forces across six external dimensions',
    origin: 'Francis Aguilar (Harvard, 1967) as ETPS; expanded with Legal & Environmental in 1980s-90s.',
    corePurpose: 'To make the external macro-environment visible and ranked so strategy is built on where the world is heading rather than where it was.',
    primaryUsers: ['Strategy & expansion teams', 'Market-entry leads', 'Risk & compliance officers', 'Policy analysts', 'Founders'],
    difficulty: 'Beginner',
    horizon: '3 to 10 years out',
    scope: 'Macro-environment / Country / Industry',
    timeToResult: '1 to 2 weeks',
    dataNeeds: 'Medium (public & regulatory data)',
    keyOutput: 'Ranked driver register + heat-map action triggers',
    bestPairedWith: 'Feeds SWOT (Opportunities & Threats), Blue Ocean Strategy, risk registers',
    keyFeatures: [
      'Six structural categories: Political, Economic, Social, Technological, Legal, Environmental',
      'Prevents blindspots by prompting coverage of easily forgotten Legal & Environmental shifts',
      'Heat-map scoring formula: Impact (1-5) x Certainty (1-5); scores >= 16 demand immediate action',
      'Differentiates signal strength (enacted law vs rumored policy)',
      'Functions as an ongoing living register reviewed quarterly'
    ],
    howItWorks: 'The team defines the scope and time horizon, then conducts desk research across the 6 categories using primary sources (gazettes, central bank data, trade filings). Each driver is documented with concrete source citation, direction (rising/falling), timing, impact (1-5), and certainty (1-5). High-scoring drivers feed directly into SWOT O/T and risk registers.',
    coreConcepts: [
      {
        term: 'Driver (not Category Label)',
        definition: 'A specific, evidenced event or trend (e.g. "GST e-invoicing threshold lowered to ₹5 crore"), never a vague heading like "Technology" or "Economy".'
      },
      {
        term: 'Heat-Map Scoring Rule',
        definition: 'Score = Impact (1-5) × Certainty (1-5). Scores ≥ 16 require an assigned owner and action within the quarter; 9-15 go to the watch list; ≤ 8 are logged.'
      },
      {
        term: 'Signal Strength & Timing',
        definition: 'Separating large-but-speculative forces from imminent certainties. A massive driver 5 years out requires scenario monitoring; a medium driver arriving next quarter needs budget.'
      }
    ],
    strengths: [
      'Forces organizational breadth beyond immediate competitors',
      'Inexpensive, utilizing public regulatory, macroeconomic, and demographic data',
      'Acts as an indispensable early-warning radar when maintained on a regular cadence'
    ],
    limitations: [
      'Can degrade into generic laundry lists if drivers lack concrete metrics and sources',
      'Says nothing about internal capability or direct competitor rivalry (needs SWOT & Five Forces)',
      'A PESTLE scan older than 12 months is historical, not strategic'
    ],
    workflowPlacement: {
      upstream: 'Primary research, economic data, regulatory gazettes, industry whitepapers',
      downstream: 'SWOT (informs O & T), Five Forces (drivers changing entry barriers), Blue Ocean (emerging buyer shifts)'
    },
    useCases: [
      {
        title: 'Regional Food Brand Expanding Interstate',
        scenario: 'Tamil Nadu packaged food maker evaluating entry into Karnataka.',
        problem: 'Assumed identical consumer habits and regulatory parameters.',
        howItHelps: 'PESTLE surfaced state food processing incentives (Political), urban disposable income tiers (Economic), regional culinary taste nuances (Social), and FSSAI bilingual packaging mandates (Legal).',
        outcome: 'Customized regional packaging language, secured state cold-chain subsidies, and avoided regulatory recall.'
      },
      {
        title: 'Logistics SME Assessing EV Fleet Transition',
        scenario: 'Fleet operator facing escalating diesel operational costs.',
        problem: 'Confused whether to convert now or wait for battery prices to fall.',
        howItHelps: 'Analyzed state EV subsidies (Political), fuel price trajectories (Economic), charging station density (Tech), and municipal low-emission zones (Environmental/Legal).',
        outcome: 'Executed a phased transition targeting intra-city delivery routes first while deferring long-haul highway routes.'
      }
    ],
    caseStudy: {
      company: 'Sivakasi Print & Pack',
      revenue: '₹40 Crore',
      staff: '180 employees, 60% revenue from firecracker packaging, 40% from FMCG cartons',
      profile: 'Traditional printing firm vulnerable to escalating environmental regulations on firecrackers.',
      challenge: 'Management sensed severe external exposure but lacked structured data on timing and impact.',
      whyChosen: 'Risks were almost entirely external macro forces (Supreme Court orders, environmental curbs, e-commerce growth).',
      steps: [
        'Set scope: "Demand for our packaging lines in South India over 5 years"',
        'Two research analysts spent 2 weeks reviewing court gazettes, pollution control board notices, and e-commerce packaging data',
        'Built driver register with 41 specific drivers scored on Impact and Certainty',
        'Management workshop ranked top drivers: Supreme Court green-cracker orders scored 20 (5x4), e-commerce carton surge scored 20 (4x5)',
        'Quarterly review calendar established to track plastic extended producer responsibility (EPR)'
      ],
      results: [
        'Capped firecracker packaging revenue at 40% within 3 years to prevent catastrophic sudden drop',
        'Invested in corrugated e-commerce line, growing e-commerce packaging from 0% to 17% of total revenue',
        'Secured FSC-certified paper certification ahead of mandatory FMCG buyer requirements, saving a ₹6 Crore contract',
        'Proactively prepared for plastics EPR regulations before rivals, avoiding penalties'
      ],
      lessonsLearned: [
        'The living register proved far more valuable than a one-time workshop',
        'Legal and Environmental factors—often dismissed as "compliance formalities"—contained the biggest existential business drivers',
        'Separating timing from impact prevented premature over-reaction'
      ]
    },
    implementationGuide: {
      prerequisites: ['Sponsor with mandate to adjust strategy/budget', '1-2 analysts for primary desk research', 'Cross-functional validation group of 5-8 managers', 'Register custodian'],
      steps: [
        'Write specific business scope, geography, and 3-5 year horizon',
        'Build driver register columns: Category, Driver, Source, Direction, Timing, Impact, Certainty, Score, Response',
        'Assign category research to distinct individuals to avoid discipline bias',
        'Insist on primary sources (regulator gazettes, central bank repo rates, census data)',
        'Score Impact (1-5) and Certainty (1-5); compute Score = I x C',
        'Conduct validation workshop to challenge scores and uncover cross-category patterns',
        'Apply heat-map rule: Score >= 16 triggers immediate initiative; 9-15 goes to watch list',
        'Map high-scoring drivers directly into SWOT Opportunities & Threats'
      ],
      checklist: [
        'Scope and geographical boundary defined',
        'All 6 categories researched with primary sources cited',
        'Drivers written as verbs/metrics, not static labels',
        'Impact x Certainty scoring applied',
        'Quarterly register review scheduled on calendar'
      ],
      commonMistakes: [
        { mistake: 'Writing category labels as drivers ("AI is growing")', fix: 'Require a verb, metric, or named policy ("GenAI reduces content production cost by 40%")' },
        { mistake: 'Relying solely on mainstream news headlines', fix: 'Reference primary source documents (court rulings, ministry gazettes, central bank circulars)' },
        { mistake: 'Ignoring driver timing', fix: 'Differentiate immediate 0-12 month impacts from slow 3-5 year trends' },
        { mistake: 'Treating PESTLE as a one-and-done slide', fix: 'Assign a permanent owner and review the register every 90 days' }
      ],
      plan306090: {
        d30: 'Scope scan, complete primary research, score register, and run validation workshop.',
        d60: 'Transfer top drivers to SWOT/risk register; fund immediate responses for scores >= 16.',
        d90: 'Run first quarterly update; evaluate watch-list drivers and incorporate shifts into annual budget.'
      },
      proTips: [
        'Assign categories to different researchers; single individuals over-weight their familiar field.',
        'Drivers that intersect two or more categories (e.g. Tech + Legal) are almost always the most disruptive.',
        'Include a "What would have to be true" note for speculative drivers to track trigger milestones.'
      ]
    },
    whenNotToUse: [
      { alternative: 'Porter’s Five Forces', reason: 'Choose Five Forces when investigating direct industry profitability, supplier power, or competitor pressure rather than macro environment.' },
      { alternative: 'Scenario Planning', reason: 'Choose Scenario Planning when key drivers are deeply uncertain with diverging high-impact trajectories.' }
    ],
    reflectionPrompts: [
      'Which PESTLE category does your company systematically overlook, and what has it cost you in the past?',
      'Where would you locate primary-source regulatory information for your specific industry?',
      'Which driver on your current register would break your business model if its arrival moved forward by one year?'
    ],
    quickReferenceCard: [
      'Use when: Entering a new territory, planning 3+ years ahead, or auditing macro risks.',
      '6 categories: Political, Economic, Social, Technological, Legal, Environmental.',
      'Driver rule: Must be specific, sourced, quantified, and timed.',
      'Scoring rule: Score = Impact x Certainty; >= 16 requires immediate quarterly action.',
      'Outputs: Direct inputs to SWOT (O/T) and risk management registers.'
    ],
    quiz: [
      {
        id: 'pestle-1',
        question: 'Under which PESTLE category does a new state government electric vehicle (EV) purchase subsidy belong?',
        options: ['Economic', 'Political', 'Technological', 'Environmental'],
        correctAnswer: 1,
        explanation: 'A subsidy originates from a government policy decision; its primary origin is Political, although it has economic ripple effects.'
      },
      {
        id: 'pestle-2',
        question: 'Which of the following is formulated as an effective PESTLE driver?',
        options: ['"Technology is accelerating"', '"Consumers want better service"', '"Central Bank repo rate raised by 50 bps in Q2"', '"Rival companies are aggressively pricing"'],
        correctAnswer: 2,
        explanation: 'A good PESTLE driver is specific, sourced, quantified, and actionable, rather than a generic thematic label.'
      },
      {
        id: 'pestle-3',
        question: 'Which of the following business aspects is explicitly NOT covered by PESTLE?',
        options: ['Statutory labour laws', 'Competitor pricing behaviour and rivalry', 'Demographic shifts in target population', 'Climate and weather volatility'],
        correctAnswer: 1,
        explanation: 'Competitor behaviour and internal industry rivalry belong to Porter’s Five Forces, not the macro-environmental PESTLE.'
      },
      {
        id: 'pestle-4',
        question: 'What is the primary rationale for scoring both Impact and Certainty in a driver register?',
        options: ['To create more columns in the spreadsheet', 'To separate large-but-speculative trends from smaller-but-certain operational shifts', 'To satisfy formal ISO compliance audits', 'To filter out Legal drivers automatically'],
        correctAnswer: 1,
        explanation: 'Separating impact and certainty prevents an organization from panicking over high-impact speculations while ignoring certain imminent shifts.'
      },
      {
        id: 'pestle-5',
        question: 'The output of a PESTLE scan most directly feeds into which components of a SWOT analysis?',
        options: ['Strengths and Weaknesses', 'Strengths and Opportunities', 'Opportunities and Threats', 'Weaknesses and Threats'],
        correctAnswer: 2,
        explanation: 'Because PESTLE analyzes external macro forces outside management control, it directly populates SWOT Opportunities and Threats.'
      }
    ]
  },
  {
    id: 'porter',
    name: 'Porter’s Five Forces',
    shortName: 'Five Forces',
    category: 'Strategy & Planning',
    tagline: 'Assess structural industry attractiveness and profit-squeeze points',
    origin: 'Michael E. Porter (Harvard Business School, 1979/1980/2008).',
    corePurpose: 'To explain why some industries sustain high returns while others struggle, showing exactly where profit is squeezed so firms can reposition or reshape forces.',
    primaryUsers: ['Strategy heads', 'Founders choosing markets', 'Investors & lenders', 'Pricing executives', 'Product leads'],
    difficulty: 'Intermediate',
    horizon: 'Now / 2 to 3 years',
    scope: 'Industry & Sector',
    timeToResult: '1 to 2 weeks',
    dataNeeds: 'Medium-High',
    keyOutput: 'Force-by-force ratings (Low/Med/High) + structural profit-pressure map & levers',
    bestPairedWith: 'Takes input from PESTLE; Feeds SWOT (T/O), VRIO, Blue Ocean Strategy',
    keyFeatures: [
      'Five structural forces: Threat of New Entrants, Bargaining Power of Buyers, Bargaining Power of Suppliers, Threat of Substitutes, Rivalry among Existing Competitors',
      'Distinguishes fundamental industry profitability from individual firm operating performance',
      'Pinpoints pricing power distribution across the value chain',
      'Dual evaluation: "Now" versus "In 3 Years" to anticipate structural shifts',
      'Actionable focus: Identify levers to weaken the most damaging force (e.g. raise switching costs)'
    ],
    howItWorks: 'The analyst first defines the industry boundaries with precision (product scope and geography). Each force is evaluated against its standard economic drivers (concentration, switching costs, barriers, differentiation) and rated Low/Medium/High with empirical evidence. The collective pressure determines industry profitability. The firm then identifies where to position itself, which force to change, and how forces will evolve.',
    coreConcepts: [
      {
        term: 'Threat of New Entrants',
        definition: 'Governed by entry barriers: economies of scale, capital needs, customer switching costs, distribution access, proprietary technology, and anticipated incumbent retaliation.'
      },
      {
        term: 'Buyer Power',
        definition: 'High when buyers are concentrated, buy large volumes, face negligible switching costs, the product is undifferentiated, or buyers have credible backward integration threats.'
      },
      {
        term: 'Supplier Power',
        definition: 'High when suppliers are concentrated, inputs are differentiated or mission-critical, switching suppliers is costly, or suppliers threaten forward integration.'
      },
      {
        term: 'Threat of Substitutes',
        definition: 'Alternatives from OUTSIDE the defined industry performing the same functional job (e.g. video calling as a substitute for airline business travel).'
      },
      {
        term: 'Rivalry Intensity',
        definition: 'Fiercest when competitors are equal in scale, industry growth is stagnant, fixed costs are high, products lack differentiation, and exit barriers are elevated.'
      }
    ],
    strengths: [
      'Provides rigorous microeconomic grounding recognized by banks, investors, and boards',
      'Explains structural margin differences that SWOT cannot diagnose',
      'Directs attention toward durable structural levers (switching costs, differentiation) rather than short-term price cuts'
    ],
    limitations: [
      'Assumes relatively stable industry boundaries; less suited for platform ecosystems and co-opetition',
      'Ignores internal resources and execution capabilities (requires VRIO to evaluate)',
      'Can be distorted if the industry is defined too broadly (e.g. "education") or too narrowly'
    ],
    workflowPlacement: {
      upstream: 'PESTLE (macro drivers that modify entry barriers or introduce substitutes)',
      downstream: 'SWOT (threats & opportunities), VRIO (which internal assets counter the strongest force), Blue Ocean (escaping red oceans)'
    },
    useCases: [
      {
        title: 'Founder Choosing Between Business Ideas',
        scenario: 'Deciding between a food delivery aggregator app vs B2B industrial canteen catering.',
        problem: 'Both looked attractive on top-line consumer demand.',
        howItHelps: 'Five Forces showed food aggregator faces cutthroat rivalry, zero consumer switching costs, and high platform power. B2B catering featured 3-year signed contracts and licensing barriers.',
        outcome: 'Selected B2B industrial catering, securing profitable contracts and predictable cash flow.'
      },
      {
        title: 'Generic Pharma Pricing Team',
        scenario: 'Facing constant margin erosion on commoditized formulations.',
        problem: 'Team was reflexively discounting prices to win institutional bids.',
        howItHelps: 'Identified that Buyer Power (hospital buying consortia) was dominant, while API Supplier Power was climbing.',
        outcome: 'Invested in guaranteed supply SLAs to raise switching costs and backward integrated into active ingredients.'
      }
    ],
    caseStudy: {
      company: 'Nellai Tiles & Sanitaryware',
      revenue: '₹25 Crore',
      staff: '22 employees, exclusive regional distribution rights for a national tile brand in Tirunelveli',
      profile: 'Regional distributor whose principal manufacturer announced plans to open its own flagship company showroom in the city.',
      challenge: 'Gross margins had fallen for 3 years; owner questioned whether to exit tile distribution entirely.',
      whyChosen: 'The challenge was structural bargaining power and forward integration, not internal sales execution.',
      steps: [
        'Defined industry boundary: "Ceramic tile and sanitaryware distribution to builders and homeowners in 3 southern districts"',
        'Gathered dealer counts, contractor purchasing habits, online retailer pricing, and manufacturer expansion filings',
        'Rated forces: Supplier Power Very High (single supplier threatening forward integration); Buyer Power High for commercial builders, Low for homeowners; Substitutes Medium (vitrified, imported stone); Rivalry High',
        'Positioning insight: The only segment with weak buyer power was homeowner renovations where personalized design consultation mattered',
        'Crafted strategic response: Diversify away from single brand, recruit two non-competing luxury brands, build an experiential showroom'
      ],
      results: [
        'Reduced single-brand revenue dependency from 70% to 45%',
        'Homeowner retail segment revenue surged 30% at gross margins 6 percentage points higher than builder contracts',
        'Design-consultation service converted 1 in 3 walk-ins (versus 1 in 7 previously)',
        'Overall business gross margin recovered by 2.5 percentage points despite the manufacturer opening its own store'
      ],
      lessonsLearned: [
        'Defining the boundary at regional distribution (rather than "tiles") made supplier forward integration the obvious key threat',
        'The primary threat was not rival dealers, but the supplier’s structural power',
        'Dual "Now vs 3 Years" analysis proved forward integration would intensify, validating immediate diversification'
      ]
    },
    implementationGuide: {
      prerequisites: ['Sponsor with clear decision mandate (enter, invest, price, exit)', 'Access to trade/competitor data', 'Industry veterans for grounded ratings'],
      steps: [
        'State the precise strategic decision to be made',
        'Define industry boundary in one sentence (product scope and geography)',
        'List top 5 customers, suppliers, competitors, and potential substitutes by name',
        'Evaluate each force against standard economic drivers; rate Low/Med/High with evidence',
        'Rate forces again for a 3-year future horizon',
        'Synthesize overall structural attractiveness',
        'Isolate the 1-2 most destructive forces squeezing profitability',
        'Identify segment niches where forces are weakest, and choose concrete levers to reshape forces'
      ],
      checklist: [
        'Industry boundary written in one sentence with geography',
        'Actual named companies listed for each force',
        'Evidence citations provided for each rating',
        'Dual ratings completed (Current vs 3-Year Outlook)',
        'Concrete defensive lever selected with assigned action'
      ],
      commonMistakes: [
        { mistake: 'Defining industry too broadly ("transport")', fix: 'Narrow to exact segment: "Intercity luxury bus travel in South India"' },
        { mistake: 'Confusing industry growth with profitability', fix: 'Remember: fast-growing markets with zero barriers destroy capital' },
        { mistake: 'Treating government as a 6th force', fix: 'Government is a factor that influences the five forces (via regulation or subsidies)' },
        { mistake: 'Stopping at force ratings without choosing a lever', fix: 'Strategy is deciding which force to reshape and how to position the firm' }
      ],
      plan306090: {
        d30: 'Define boundary, collect competitor/supplier data, rate forces, and present findings to leadership.',
        d60: 'Implement first defensive lever (e.g. multi-supplier qualification or contract switching-cost feature).',
        d90: 'Embed findings into SWOT and annual plan; set calendar for annual structural review.'
      },
      proTips: [
        'Ask customers directly: "What would you do if we raised prices 10%?" Their answer assesses buyer power and substitutes simultaneously.',
        'Distinguish price rivalry from feature rivalry: price wars destroy profit; feature competition can expand market value.',
        'Watch for forward or backward integration announcements—they signal irreversible structural shifts.'
      ]
    },
    whenNotToUse: [
      { alternative: 'PESTLE Analysis', reason: 'Choose PESTLE when exploring macro-environmental trends rather than industry-specific economics.' },
      { alternative: 'Blue Ocean Strategy', reason: 'Choose Blue Ocean when the industry is proven to be structurally unattractive and you want to redefine the value curve entirely.' }
    ],
    reflectionPrompts: [
      'Which force currently squeezes your organization’s profit margins hardest, and have you named it openly?',
      'What ethical steps could you implement in the next 6 months to raise customer switching costs?',
      'Which substitute from outside your direct industry are your customers already testing?'
    ],
    quickReferenceCard: [
      'Use when: Choosing a new market, defending margins, or deciding investment capital allocation.',
      'Define the industry narrowly first with geography and product scope.',
      'Rate 5 forces Low/Med/High with evidence; repeat for 3 years out.',
      'Strong forces = structurally low profit; identify where forces are weakest.',
      'Pick the most damaging force and apply structural levers to reshape it.'
    ],
    quiz: [
      {
        id: 'porter-1',
        question: 'Which force is strongest when a few large institutional clients account for 70% of an industry’s total sales?',
        options: ['Rivalry among competitors', 'Bargaining power of buyers', 'Bargaining power of suppliers', 'Threat of substitutes'],
        correctAnswer: 1,
        explanation: 'Concentrated buyers hold immense negotiating leverage, allowing them to dictate terms and play competitors against each other.'
      },
      {
        id: 'porter-2',
        question: 'High capital requirements, patent protections, and strong incumbent brand loyalty primarily affect:',
        options: ['Buyer bargaining power', 'Threat of new entrants', 'Threat of substitutes', 'Supplier bargaining power'],
        correctAnswer: 1,
        explanation: 'These factors represent classic economic entry barriers that reduce the threat of new competitors entering the market.'
      },
      {
        id: 'porter-3',
        question: 'For an airline company’s corporate business-travel segment, high-definition video conferencing is best categorized as:',
        options: ['A new entrant', 'An industry rival', 'A substitute', 'A supplier'],
        correctAnswer: 2,
        explanation: 'Video conferencing performs the underlying functional need (business meeting) from outside the aviation industry, making it a substitute.'
      },
      {
        id: 'porter-4',
        question: 'If all five competitive forces in an industry are evaluated as "High", long-run industry profitability is typically:',
        options: ['Exceptionally high', 'Structurally low and compressed', 'Unaffected by market forces', 'Entirely determined by marketing spend'],
        correctAnswer: 1,
        explanation: 'When all forces are strong, profit is squeezed from every direction (suppliers, buyers, entrants, substitutes, rivals), depressing industry returns.'
      },
      {
        id: 'porter-5',
        question: 'What is the most frequent mistake made when conducting a Porter’s Five Forces analysis?',
        options: ['Gathering excessive empirical data', 'Defining the industry boundary too broadly', 'Rating supplier power separately', 'Analyzing competitive rivalry'],
        correctAnswer: 1,
        explanation: 'Defining the industry too broadly (e.g. "food" instead of "packaged organic tea") blurs the forces and conceals critical substitute threats.'
      }
    ]
  },
  {
    id: 'bsc',
    name: 'Balanced Scorecard (BSC)',
    shortName: 'Balanced Scorecard',
    category: 'Strategy & Planning',
    tagline: 'Translate strategy into linked objectives across four balanced perspectives',
    origin: 'Robert S. Kaplan & David P. Norton (Harvard Business Review, 1992/1996/2004).',
    corePurpose: 'To prevent strategy from remaining trapped in a document by connecting it to what departments measure, tracking leading indicators alongside lagging financials.',
    primaryUsers: ['CEOs & executive teams', 'Business unit leaders', 'Finance & operations heads', 'Non-profit directors', 'Strategy offices'],
    difficulty: 'Intermediate',
    horizon: 'Annual (with monthly/quarterly reviews)',
    scope: 'Firm / Business Unit',
    timeToResult: '4 to 8 weeks',
    dataNeeds: 'High (cross-department metrics)',
    keyOutput: 'Strategy map + balanced scorecard (objectives, measures, targets, initiatives)',
    bestPairedWith: 'Takes input from SWOT/Ansoff/Blue Ocean; Drives quarterly OKRs and operating budgets',
    keyFeatures: [
      'Four linked perspectives: Financial, Customer, Internal Process, Learning & Growth',
      'Strategy Map: Visual cause-and-effect flow showing how people enable processes, which delight customers, driving financial return',
      'Balances leading indicators (predictive) with lagging indicators (confirmatory)',
      'Caps corporate measures (recommended 15-20 total) to maintain focus',
      'Institutes a disciplined monthly strategy review meeting rhythm'
    ],
    howItWorks: 'Leadership articulates a concise strategy statement, defines 3-5 objectives per perspective, and constructs a visual strategy map with directional arrows. Each objective is paired with 1-2 measures (combining leading and lagging), baseline values, 12-month targets, and funded initiatives. Teams review the scorecard monthly, interrogating whether the cause-and-effect hypotheses are actually holding.',
    coreConcepts: [
      {
        term: 'Four Perspectives',
        definition: 'Financial (What do shareholders expect?), Customer (How do we create value?), Internal Process (What must we excel at?), Learning & Growth (How do our people, systems, and culture improve?).'
      },
      {
        term: 'Strategy Map',
        definition: 'A visual architecture showing cause-and-effect hypotheses bottom-up: Learning & Growth -> Internal Process -> Customer -> Financial.'
      },
      {
        term: 'Leading vs Lagging Indicators',
        definition: 'Lagging metrics confirm historical outcomes (revenue, customer retention). Leading metrics predict future results (training hours, sales pipeline, first-contact resolution).'
      },
      {
        term: 'Cause-and-Effect Hypothesis',
        definition: 'Every arrow on a strategy map is a testable business theory. If internal processes improve but customer metrics do not budge, the hypothesis is disproven and must be adjusted.'
      }
    ],
    strengths: [
      'Prevents obsessive short-term financial tunnel vision',
      'Explicitly connects employee development and process engineering to top-line business results',
      'Creates a shared organizational compass and a monthly strategic cadence'
    ],
    limitations: [
      'Can turn into an overwhelming bureaucratic spreadsheet if the strategy map is omitted',
      'Tracking more than 20-25 metrics destroys executive focus',
      'Building the underlying automated data pipelines often takes weeks of systems work'
    ],
    workflowPlacement: {
      upstream: 'Chosen strategic position (SWOT/TOWS, Ansoff, Blue Ocean)',
      downstream: 'Quarterly OKRs (sprint execution on top initiatives), annual departmental budgets'
    },
    useCases: [
      {
        title: 'Growing Software Services SME (120 people)',
        scenario: 'Founder wants to shift from low-margin hourly staffing to high-value productized solutions.',
        problem: 'Project managers and sales were still evaluated solely on billable hours logged.',
        howItHelps: 'BSC instituted Customer objective ("Buy outcomes, not hours"), Process objective ("Productize 3 service lines"), Learning objective ("Certify 30 architects in IP"), and Financial objective ("40% revenue from fixed-price contracts").',
        outcome: 'Aligned team incentives, retired the billable hour metric, and lifted gross margins by 12%.'
      },
      {
        title: 'Manufacturing Plant (300 workers)',
        scenario: 'Corporate strategy champions "Total Quality Leadership".',
        problem: 'Plant manager bonuses were tied 100% to gross production volume, encouraging defective output.',
        howItHelps: 'Cascaded plant scorecard balancing first-pass yield (Process), customer complaint rate (Customer), rework cost (Financial), and cross-skilling certifications (Learning).',
        outcome: 'Reduced scrap and rework costs by 35% within two quarters.'
      }
    ],
    caseStudy: {
      company: 'Vaigai Hospitality',
      revenue: '₹32 Crore',
      staff: '260 employees, 3 mid-range business hotels and 2 restaurants in Madurai',
      profile: 'Family-owned hospitality group aiming to become the preferred regional business traveler choice.',
      challenge: 'Each property manager operated in isolation, focusing only on daily room occupancy and discounting rates. Online guest reviews were slipping.',
      whyChosen: 'The strategic direction was agreed; the breakdown was execution and lack of balanced alignment across properties.',
      steps: [
        'Leadership offsite defined 12 core strategic objectives across the 4 perspectives',
        'Selected 16 measures total, pairing at least 1 leading and 1 lagging metric per perspective',
        'Gathered baselines from property management software and online review aggregators',
        'Funded 9 strategic initiatives, including a frontline service-standards training curriculum and digital guest feedback kiosks',
        'Cascaded scorecards to individual hotel property managers (3-5 measures each)',
        'Instituted monthly 90-minute strategy reviews following the strategy map from bottom to top'
      ],
      results: [
        'Learning & Growth: 100% frontline staff completed service training; annual staff turnover dropped from 38% to 27%',
        'Internal Process: Check-in duration slashed from 9 minutes to 4 minutes; complaint resolution under 24 hours climbed from 55% to 88%',
        'Customer: Average online rating rose from 3.8 to 4.3; repeat-guest share grew from 18% to 26%',
        'Financial: RevPAR (Revenue Per Available Room) increased 14%; restaurant covers rose 11%'
      ],
      lessonsLearned: [
        'Pruning measures from 31 down to 16 was essential for effective review meetings',
        'The monthly meeting worked only when the General Manager stopped discussing daily operations and focused on strategy map arrows',
        'One hypothesis held true (staff training directly lifted guest ratings); another failed (points loyalty card did not drive repeat visits), prompting a fast pivot'
      ]
    },
    implementationGuide: {
      prerequisites: ['Explicit strategy statement agreed by executive leadership', 'Executive sponsor who chairs monthly reviews', 'Scorecard custodian', 'Measure owners for each metric'],
      steps: [
        'Confirm corporate strategy in 1-2 clear sentences',
        'Order perspectives (put Customer/Beneficiary on top for non-profits and education)',
        'Draft 3-5 strategic objectives per perspective as active verb phrases',
        'Draw the visual strategy map with cause-and-effect arrows; eliminate disconnected objectives',
        'Pair each objective with 1-2 measures (ensure leading + lagging balance)',
        'Establish baselines and identify data sources; set 12-month targets with quarterly milestones',
        'Fund only those initiatives directly attached to scorecard objectives',
        'Build a single-page executive dashboard; cascade 3-5 metrics to teams',
        'Conduct monthly 90-minute strategy reviews using the strategy map as the agenda'
      ],
      checklist: [
        '1-sentence strategy statement documented',
        'Strategy map drawn on a single page with cause-and-effect arrows',
        'Total measures capped at <= 20 at corporate tier',
        'Every perspective includes leading and lagging indicators',
        'Owners and data sources verified for each measure',
        'Monthly review scheduled on executive calendars'
      ],
      commonMistakes: [
        { mistake: 'Skipping the strategy map and making a generic KPI list', fix: 'The map showing cause-and-effect is the core of the framework' },
        { mistake: 'Tracking 50+ measures', fix: 'Strictly enforce a cap of 15-20 corporate measures' },
        { mistake: 'Tying compensation to the scorecard in year one', fix: 'Wait until data integrity and measures are trusted before linking to bonuses' },
        { mistake: 'Letting the monthly meeting degenerate into daily ops', fix: 'Enforce a separate operational meeting; use the strategy map as the review agenda' }
      ],
      plan306090: {
        d30: 'Finalize strategy statement, draw strategy map, establish baselines, and select 16 measures.',
        d60: 'Deploy dashboard, fund initiatives, assign owners, and host the first monthly review.',
        d90: 'Cascade scorecards to departments; validate cause-and-effect links; extract quarterly OKRs.'
      },
      proTips: [
        'Write objectives as active verb phrases ("Compress check-in time"), not vague nouns ("Check-in efficiency").',
        'Fund initiatives only through the scorecard—it is the cleanest way to terminate executive pet projects.',
        'Celebrate disproved hypotheses: discovering that an initiative didn’t drive the expected customer metric is the BSC working as an organizational learning engine.'
      ]
    },
    whenNotToUse: [
      { alternative: 'OKRs (Objectives and Key Results)', reason: 'Choose OKRs for fast-moving early startups (<25 people) or quarterly team sprint alignment without annual multi-tier architecture.' },
      { alternative: 'Hoshin Kanri', reason: 'Choose Hoshin Kanri in mature lean manufacturing environments where catchball negotiation and policy deployment are already established.' }
    ],
    reflectionPrompts: [
      'What is your organization measuring today that has zero connection to its stated strategic goals?',
      'Which leading indicator, if measured weekly, would alert you 3 months in advance that revenue was at risk?',
      'Who in your leadership team would need to overhaul their monthly meeting structure for a scorecard to succeed?'
    ],
    quickReferenceCard: [
      'Use when: Strategy is defined but organizational execution is fragmented or disconnected.',
      'Four perspectives: Financial, Customer, Internal Process, Learning & Growth.',
      'Draw the Strategy Map first to prove cause-and-effect logic.',
      'Cap at 15-20 measures total; always pair leading with lagging indicators.',
      'Conduct monthly reviews bottom-up (Learning -> Process -> Customer -> Financial).'
    ],
    quiz: [
      {
        id: 'bsc-1',
        question: 'Which perspective sits at the foundation (bottom) of a standard for-profit strategy map?',
        options: ['Financial', 'Customer', 'Internal Process', 'Learning & Growth'],
        correctAnswer: 3,
        explanation: 'Learning & Growth (skills, culture, technology infrastructure) enables all operational processes and customer outcomes above it.'
      },
      {
        id: 'bsc-2',
        question: '"Training hours per service engineer" is best classified as which type of indicator?',
        options: ['Lagging indicator', 'Leading indicator', 'Financial measure', 'Customer outcome measure'],
        correctAnswer: 1,
        explanation: 'It is a leading indicator because employee training predicts future service quality and defect reduction before results appear.'
      },
      {
        id: 'bsc-3',
        question: 'What is the primary function of a Strategy Map in the Balanced Scorecard system?',
        options: ['To display the company organization chart', 'To illustrate cause-and-effect hypotheses linking strategic objectives', 'To allocate annual departmental capital budgets', 'To track competitor market share trends'],
        correctAnswer: 1,
        explanation: 'The strategy map illustrates the explicit hypotheses of how objectives in lower perspectives drive outcomes in higher ones.'
      },
      {
        id: 'bsc-4',
        question: 'What is the recommended upper limit of measures for an effective corporate-level Balanced Scorecard?',
        options: ['5 measures', '15 to 20 measures', '50 measures', '100+ measures'],
        correctAnswer: 1,
        explanation: 'Capping measures at 15-20 ensures management focus; exceeding 20-25 dilutes attention and turns reviews into bureaucratic data reporting.'
      },
      {
        id: 'bsc-5',
        question: 'Who developed and introduced the Balanced Scorecard framework in 1992?',
        options: ['Michael E. Porter', 'Robert S. Kaplan and David P. Norton', 'H. Igor Ansoff', 'John Doerr'],
        correctAnswer: 1,
        explanation: 'Kaplan and Norton introduced the Balanced Scorecard in a 1992 Harvard Business Review article.'
      }
    ]
  },
  {
    id: 'ansoff',
    name: 'Ansoff Matrix',
    shortName: 'Ansoff Matrix',
    category: 'Strategy & Planning',
    tagline: 'Choose growth routes based on product and market newness',
    origin: 'H. Igor Ansoff (Harvard Business Review, 1957; Corporate Strategy, 1965).',
    corePurpose: 'To make the risk gradient of each growth route explicit so leaders make deliberate expansion choices rather than wandering into new products and markets simultaneously.',
    primaryUsers: ['Owners & CEOs', 'Product managers', 'Marketing & BD leads', 'Corporate development teams', 'Investors'],
    difficulty: 'Beginner',
    horizon: '1 to 3 years',
    scope: 'Product-Market Portfolio',
    timeToResult: 'Half day',
    dataNeeds: 'Low-Medium',
    keyOutput: 'Classified and sequenced growth initiatives with explicit risk ratings',
    bestPairedWith: 'Takes input from SWOT/VRIO; Feeds business cases, OKRs, Balanced Scorecard',
    keyFeatures: [
      'Two-by-two grid: Existing vs New Products along Existing vs New Markets',
      'Four distinct growth routes: Market Penetration, Market Development, Product Development, Diversification',
      'Inherent risk gradient: Penetration (lowest risk) to Diversification (highest risk)',
      'Enforces formal definition of what "existing" and "new" mean for the firm',
      'Encourages staged sequencing rather than simultaneous uncoordinated bets'
    ],
    howItWorks: 'Leaders inventory candidate growth initiatives, then evaluate each on two fundamental questions: Is this offering substantially the same as what we sell today? And is the target customer group substantially the same as who we sell to today? The team evaluates capability fit, capital requirements, and risk, then sequences funding—typically exhausting penetration opportunities before financing diversification.',
    coreConcepts: [
      {
        term: 'Market Penetration (Existing / Existing)',
        definition: 'Selling more of current offerings to existing customer segments. Lowest risk; accomplished via customer retention, wallet share, competitive win-backs, or loyalty programs.'
      },
      {
        term: 'Market Development (Existing / New)',
        definition: 'Taking existing proven products to new geographies, demographic segments, or distribution channels. Unknown factor is the customer.'
      },
      {
        term: 'Product Development (New / Existing)',
        definition: 'Developing new products or complementary services for established customers. Unknown factor is the product design and delivery.'
      },
      {
        term: 'Diversification (New / New)',
        definition: 'Launching novel products into unfamiliar markets. Highest risk. Related diversification leverages core assets; unrelated (conglomerate) shares no capabilities.'
      },
      {
        term: 'Synergy ("2 + 2 = 5")',
        definition: 'Ansoff’s term for shared capabilities, facilities, or customer trust between a new initiative and the core business.'
      }
    ],
    strengths: [
      'Extremely simple, memorable, and enforces disciplined strategic classification',
      'Exposes hidden expansion risk before capital and headcount are committed',
      'Prevents leadership teams from pursuing too many high-risk bets at once'
    ],
    limitations: [
      'Binary "Existing vs New" can feel crude (mitigated by 9-box expanded variants)',
      'Does not model competitor counter-attacks (requires Porter’s Five Forces)',
      'Can give false comfort that penetration is always safe even in dying or saturated sectors'
    ],
    workflowPlacement: {
      upstream: 'SWOT/TOWS (SO/WO strategic options), VRIO (validating internal capability fit), Five Forces',
      downstream: 'Business case models, Balanced Scorecard initiatives, quarterly OKRs'
    },
    useCases: [
      {
        title: 'Sweet-and-Snacks Manufacturer (Tier-2 City)',
        scenario: 'Owner targeted 30% top-line growth.',
        problem: 'Simultaneously preparing to expand to a new city, launch a sugar-free health line, and roll out a franchise network.',
        howItHelps: 'Ansoff plotted each move: new city (Market Development), sugar-free line (Product Development), franchise network (Market Development channel).',
        outcome: 'Sequenced intentionally: launched sugar-free line to existing retail customers first (lowest capability gap), then rolled out local franchises; deferred opening the new city.'
      },
      {
        title: 'SaaS Startup with High Churn',
        scenario: 'Board demanded an aggressive new growth plan.',
        problem: 'Founders wanted to build and launch a second software product.',
        howItHelps: 'Showed that Market Penetration (improving onboarding, reducing churn, expanding seats per account) delivered 3x higher ROI at a fraction of product development risk.',
        outcome: 'Executed two quarters of focused penetration OKRs before funding a second product.'
      }
    ],
    caseStudy: {
      company: 'Coimbatore Motor Works',
      revenue: '₹85 Crore',
      staff: '320 employees, 70% agricultural pump motor sales in Tamil Nadu & Karnataka',
      profile: '40-year-old submersible motor manufacturer facing plateaued agricultural demand.',
      challenge: 'Second-generation directors had 6 conflicting ideas competing for one capital allocation budget: solar pump kits, exports to Africa, industrial motors, e-commerce direct, a service franchise, and a battery JV.',
      whyChosen: 'Needed a structured framework to compare fundamentally different growth proposals and avoid over-extending resources.',
      steps: [
        'Defined "Existing Product": Submersible water pump motors up to 15 HP',
        'Defined "Existing Market": Agricultural farmers in South India reached through authorized dealers',
        'Classified all 6 proposals onto the Ansoff grid with two-sentence justifications',
        'Classification: Service franchise & E-commerce = Market Penetration; Africa exports & Industrial motors = Market Development; Solar pump kits = Product Development; Battery JV = Unrelated Diversification',
        'Scored each option on capability fit (via quick VRIO), capital cost, time to revenue, and risk',
        'Sequencing decision: Fund penetration moves immediately; launch solar kits in year 1; pilot Africa exports via a vetted Kenyan distributor in year 2; freeze industrial motors and battery JV'
      ],
      results: [
        'Service franchise added ₹4 Crore in high-margin (60% gross margin) recurring maintenance revenue',
        'Solar pump kits generated 12% of total revenue within 18 months, sold through existing agricultural dealers',
        'Africa pilot through a distributor generated ₹3 Crore in year 2 with minimal balance-sheet strain',
        'Total revenue grew 23% over 2 years, with capital expenditure 40% below what funding all six ideas would have cost'
      ],
      lessonsLearned: [
        'Writing precise definitions of "existing product" and "existing market" resolved half of executive debates',
        'Scoring internal capability fit stopped the team from entering industrial motors, which would have required an enterprise sales force they lacked',
        'Strict sequencing allowed cash flows from penetration to safely bankroll higher-risk product development'
      ]
    },
    implementationGuide: {
      prerequisites: ['Portfolio of growth ideas from SWOT, sales, or R&D', 'Decision maker with capital budget authority', 'Finance lead for cost/payback estimates'],
      steps: [
        'Document formal definitions of "Existing Product" and "Existing Market" for your firm',
        'Collect all growth ideas without premature filtering',
        'Plot each idea into one of the 4 Ansoff quadrants with a written justification',
        'Challenge borderline items (use a 3x3 nine-box matrix if items are "partially new")',
        'Score each option on Capability Fit (1-5), Capital Investment, Time to Revenue, and Risk',
        'Vet new markets with Five Forces/PESTLE; vet new products with VRIO',
        'Establish an explicit sequence: Penetration -> Best-fit Dev route -> Other Dev route -> Diversification',
        'Set stage gates: the next quadrant is funded only when previous stage milestones are met'
      ],
      checklist: [
        'Definitions of existing product and market agreed in writing',
        'All candidate ideas plotted with justification',
        'Scoring criteria (capability, cost, time, risk) tabulated',
        'Stage gates established between expansion phases',
        'Funded options assigned owners and quarterly OKRs'
      ],
      commonMistakes: [
        { mistake: 'Plotting ideas without defining "existing"', fix: 'Write the definition statements before placing any sticky note' },
        { mistake: 'Assuming market penetration is "free"', fix: 'Penetration still requires marketing spend and sales effort to win market share' },
        { mistake: 'Pursuing diversification because it feels glamorous', fix: 'Only diversify with an established partner, license, or proven acquisition' },
        { mistake: 'Funding all four quadrants simultaneously', fix: 'Enforce staged gates: let penetration profits fund subsequent quadrants' }
      ],
      plan306090: {
        d30: 'Define boundaries, plot ideas, complete scoring, and choose the prioritized sequence.',
        d60: 'Draft 1-page business cases and establish stage-1 OKRs; launch penetration initiatives.',
        d90: 'Run first stage-gate review; measure initial returns before unlocking subsequent quadrant funding.'
      },
      proTips: [
        'Run Ansoff on your competitors’ recent launches to uncover their strategic risk appetite.',
        'Treat distribution channels as markets: entering modern trade or e-commerce behaves like a new market.',
        'Attach a "What we must learn" list to each option—the quadrant tells you where your ignorance lies.'
      ]
    },
    whenNotToUse: [
      { alternative: 'BCG Growth-Share Matrix', reason: 'Choose BCG when the challenge is capital allocation across an existing multi-product business portfolio rather than choosing new growth directions.' },
      { alternative: 'Three Horizons Framework', reason: 'Choose Three Horizons when balancing long-term R&D pipelines across core, emerging, and disruptive time horizons.' }
    ],
    reflectionPrompts: [
      'Which Ansoff quadrant has your company been operating in by default, and was it an intentional decision?',
      'What would "existing market" look like if you defined it by channel rather than geography?',
      'Which project in your current pipeline is actually high-risk diversification disguised as product development?'
    ],
    quickReferenceCard: [
      'Use when: Comparing expansion avenues and deciding funding sequence.',
      'Define "Existing" in writing before plotting initiatives.',
      'Risk Gradient: Penetration < Market Dev ≈ Product Dev < Diversification.',
      'Sequence and gate: Exhaust low-risk opportunities before funding high-risk bets.',
      'Pairs with: SWOT & VRIO (inputs) -> OKRs & Balanced Scorecard (execution).'
    ],
    quiz: [
      {
        id: 'ansoff-1',
        question: 'Selling your existing SaaS software to hospitals when you previously sold exclusively to schools is an example of:',
        options: ['Market Penetration', 'Market Development', 'Product Development', 'Diversification'],
        correctAnswer: 1,
        explanation: 'The product remains the same, but you are entering an entirely new customer segment/industry (Market Development).'
      },
      {
        id: 'ansoff-2',
        question: 'Which quadrant of the Ansoff Matrix carries the highest structural failure risk?',
        options: ['Market Penetration', 'Market Development', 'Product Development', 'Diversification'],
        correctAnswer: 3,
        explanation: 'Diversification involves both an unproven product and an unfamiliar customer market, combining double uncertainty.'
      },
      {
        id: 'ansoff-3',
        question: 'Launching an automated loyalty reward program for your existing retail shoppers is:',
        options: ['Market Penetration', 'Market Development', 'Product Development', 'Diversification'],
        correctAnswer: 0,
        explanation: 'It sells more to current customers by increasing frequency and retention in the existing market (Market Penetration).'
      },
      {
        id: 'ansoff-4',
        question: 'What term did Igor Ansoff use to describe the "2 + 2 = 5" benefit of shared operational capabilities?',
        options: ['Leverage', 'Synergy', 'Economies of Scale', 'Economies of Scope'],
        correctAnswer: 1,
        explanation: 'Ansoff coined the term "Synergy" to describe the combined strategic benefits when new initiatives share resources with the core.'
      },
      {
        id: 'ansoff-5',
        question: 'Which strategic tool best evaluates whether a new market is structurally attractive before executing Market Development?',
        options: ['Balanced Scorecard', 'OKRs', 'Porter’s Five Forces', 'VRIO Framework'],
        correctAnswer: 2,
        explanation: 'Porter’s Five Forces analyzes industry structural attractiveness, profit pressure, and entry barriers before expansion.'
      }
    ]
  },
  {
    id: 'blueocean',
    name: 'Blue Ocean Strategy',
    shortName: 'Blue Ocean',
    category: 'Strategy & Planning',
    tagline: 'Create uncontested market space through value innovation and ERRC',
    origin: 'W. Chan Kim & Renée Mauborgne (INSEAD, 2005/2015/2017).',
    corePurpose: 'To stop benchmarking rivals in bloody "red oceans" and instead create new demand from non-customers by pursuing differentiation and low cost simultaneously.',
    primaryUsers: ['CEOs & founders in mature markets', 'Product innovators', 'Marketing strategists', 'Corporate venture leads'],
    difficulty: 'Advanced',
    horizon: '3 to 5 years',
    scope: 'Industry Offering / Business Model',
    timeToResult: '6 to 10 weeks',
    dataNeeds: 'High (in-depth buyer & non-customer research)',
    keyOutput: 'Strategy Canvas (new value curve) + ERRC Action Grid',
    bestPairedWith: 'Takes input from Five Forces (confirms red ocean), PESTLE; Feeds Balanced Scorecard, OKRs',
    keyFeatures: [
      'Strategy Canvas: Visual plot of competing factors showing industry average vs company value curves',
      'Value Innovation: Breaking the classic trade-off between low cost and high differentiation',
      'ERRC Grid: Eliminate and Reduce (lowers cost structure), Raise and Create (unlocks new buyer value)',
      'Six Paths Framework: Structured lenses to identify unexplored market space across industries and buyer groups',
      'Three Tiers of Non-Customers: Soon-to-be, Refusing, Unexplored'
    ],
    howItWorks: 'The team plots the as-is Strategy Canvas against rivals to visualize the crowded red ocean. They interview non-customers and explore the Six Paths to discover overlooked utility blocks. Applying the Four Actions Framework, they build an ERRC grid to draft a divergent value curve that passes the Three Tests: Focus, Divergence, and a Compelling Tagline. Finally, they validate the commercial sequence: Utility -> Price -> Cost -> Adoption.',
    coreConcepts: [
      {
        term: 'Value Innovation',
        definition: 'Pursuing differentiation and low cost simultaneously by eliminating/reducing over-engineered factors and raising/creating unprecedented value.'
      },
      {
        term: 'ERRC Grid',
        definition: 'Eliminate (factors taken for granted), Reduce (factors over-designed), Raise (factors buyers value most), Create (factors never before offered).'
      },
      {
        term: 'Three Tiers of Non-Customers',
        definition: 'Tier 1: "Soon-to-be" (buy minimally out of necessity); Tier 2: "Refusing" (evaluated your market and explicitly chose against it); Tier 3: "Unexplored" (never even considered your market).'
      },
      {
        term: 'Strategy Canvas & Value Curve',
        definition: 'Diagnostic visual chart plotting factors of competition along the X-axis and offering level on the Y-axis. A divergent shape signals a blue ocean.'
      },
      {
        term: 'Three Tests of Good Strategy',
        definition: '1. Focus (efforts concentrated on 3-4 key factors); 2. Divergence (shape stands apart from rivals); 3. Compelling Tagline (clear, memorable customer promise).'
      }
    ],
    strengths: [
      'Breaks out of cutthroat price competition and feature-matching parity',
      'Highly intuitive visual tools (Strategy Canvas) that communicate strategy clearly',
      'Expands total market size by capturing non-customers rather than fighting for scraps'
    ],
    limitations: [
      'Requires genuine field discovery with non-customers; fabricated in an office it produces fiction',
      'Competitors eventually imitate successful blue oceans, turning them red over time',
      'Substantial organizational resistance to eliminating cherished legacy features'
    ],
    workflowPlacement: {
      upstream: 'Porter’s Five Forces (confirming red ocean rivalry), PESTLE (identifying macro consumer shifts)',
      downstream: 'Business model canvas, pricing models, Balanced Scorecard objectives, launch OKRs'
    },
    useCases: [
      {
        title: 'Budget Hotel in Pilgrim City',
        scenario: '20 near-identical hotels engaged in aggressive discount price wars.',
        problem: 'Rooms were filled only on religious festival days; operating margins were negative off-season.',
        howItHelps: 'Canvas showed all hotels competed on identical amenities. Non-customer Tier 2 (families renting private houses) valued kitchens and family suites over hotel restaurants.',
        outcome: 'Converted upper floors into suites with kitchenettes, closed the money-losing restaurant, added temple transit; occupancy stayed high year-round.'
      },
      {
        title: 'Two-Wheeler Service Chain',
        scenario: 'Authorized brand service centers and local roadside mechanics split the motorcycle maintenance market.',
        problem: 'Customers hated endless wait times at both.',
        howItHelps: 'Buyer Utility Map revealed major convenience blocks in vehicle handoff and diagnostic trust. Created doorstep pickup and live video inspection, eliminating waiting lounges.',
        outcome: 'Attracted refusing non-customers who previously serviced vehicles themselves or postponed maintenance.'
      }
    ],
    caseStudy: {
      company: 'Madurai Wedding Services',
      revenue: '₹9 Crore',
      staff: '40 employees, competing against 150 local event planners and caterers',
      profile: 'Full-service wedding and event coordinator facing severe margin collapse.',
      challenge: 'Every competitor offered the exact same checklist: stage decoration, catering coordination, and vendor markups. Clients bargained down margins to 8%.',
      whyChosen: 'A Five Forces audit confirmed extreme buyer power and zero switching costs. Ansoff matrix moves would just mean more of the same red ocean.',
      steps: [
        'Drew as-is Strategy Canvas across 8 industry factors: curves of 3 top rivals and themselves were identical',
        'Conducted 50 non-customer interviews: 15 soon-to-be (planning DIY weddings) and 10 refusing (families hosting intimate home ceremonies)',
        'Insight: Paying parents and young couples experienced intense coordination anxiety. Emotional relief and memory preservation mattered far more than lavish stage setups',
        'ERRC Grid: ELIMINATE grand generic stage packages & opaque vendor commissions; REDUCE vendor options presented; RAISE single accountable planner & transparent fixed package; CREATE guest experience concierge & curated post-wedding family digital archive',
        'Validated against the 3 tests: Passed Focus, Divergence, and crafted Tagline: "One planner. One price. Your story, kept."',
        'Piloted with 12 weddings before official commercial relaunch'
      ],
      results: [
        'Gross margin jumped from 8% to 22% on transparent fixed-fee contracts',
        '40% of new clients came directly from former non-customers who previously self-managed weddings',
        'Annual client engagements increased 60% with zero increase in full-time headcount',
        'Competitors attempted to imitate the fixed fee, but could not copy the family archive service'
      ],
      lessonsLearned: [
        'Non-customer interviews yielded 10x more strategic value than interviewing existing happy clients',
        'The Eliminate decision met fierce internal resistance from creative staff who took pride in extravagant decor',
        'Durable competitive advantage resided in the newly created service capabilities that rivals could not replicate'
      ]
    },
    implementationGuide: {
      prerequisites: ['Leadership prepared to eliminate legacy offerings', 'Cross-functional team (6-8 members)', 'Researchers committed to 30+ non-customer interviews', 'Skilled facilitator'],
      steps: [
        'Confirm red ocean conditions using a Five Forces review',
        'List 6-10 competing factors typical of the industry',
        'Draw the as-is Strategy Canvas for your firm and 2-3 key competitors',
        'Conduct field research with existing clients and all three tiers of non-customers',
        'Explore the Six Paths to uncover alternative cross-industry models',
        'Plot the Buyer Utility Map to pinpoint friction blocks across the buyer journey',
        'Construct the ERRC Grid: insist on at least 2 entries in Eliminate and 2 in Create',
        'Draw the to-be Strategy Canvas and evaluate against Focus, Divergence, and Tagline',
        'Validate commercial feasibility: Buyer Utility -> Strategic Price -> Target Cost -> Adoption Hurdles',
        'Pilot the new offering on a small customer segment before wide rollout'
      ],
      checklist: [
        'As-is canvas drawn comparing key rivals',
        'Field interviews conducted across 3 tiers of non-customers',
        'Six Paths explored and documented',
        'ERRC grid includes tangible Eliminate and Create items',
        'To-be curve passes Focus, Divergence, Tagline tests',
        'Price corridor and target cost model established'
      ],
      commonMistakes: [
        { mistake: 'Only Raising and Creating factors', fix: 'Value innovation requires Elimination and Reduction to lower cost and fund the new factors' },
        { mistake: 'Interviewing only current loyal customers', fix: 'New demand lives exclusively with non-customers who refuse or ignore your industry' },
        { mistake: 'Confusing a small niche with a blue ocean', fix: 'A blue ocean aggregates mass demand; a niche carves a smaller slice of existing demand' },
        { mistake: 'Pricing from internal costs instead of buyer alternatives', fix: 'Set price against the substitutes non-customers currently use, then reverse-engineer cost' }
      ],
      plan306090: {
        d30: 'Draw as-is canvas, draft interview protocol, and conduct 30 field interviews.',
        d60: 'Synthesize Six Paths, build Buyer Utility Map, draft ERRC grid, and test to-be canvas.',
        d90: 'Establish target cost model, address vendor/staff adoption hurdles, and launch pilot.'
      },
      proTips: [
        'Ensure senior executives personally conduct several non-customer interviews to avoid second-hand sanitization.',
        'Hang the as-is canvas on the boardroom wall: visual sameness is the most compelling argument for change.',
        'Revisit the canvas every 18-24 months: successful blue oceans inevitably attract imitators.'
      ]
    },
    whenNotToUse: [
      { alternative: 'Porter’s Competitive Positioning', reason: 'Choose Porter’s positioning when the industry still possesses attractive niches and the goal is choosing a defensible spot within standard rules.' },
      { alternative: 'Jobs-to-be-Done (JTBD)', reason: 'Choose JTBD when optimizing a specific product feature rather than reconstructing an entire industry value proposition.' }
    ],
    reflectionPrompts: [
      'What does your industry invest heavily in that your customers rarely mention when explaining why they buy?',
      'Who are your industry’s "refusing" non-customers, and when did you last sit down with one?',
      'If you eliminated your most expensive visible feature tomorrow, which customers would actually notice?'
    ],
    quickReferenceCard: [
      'Use when: You are stuck in a bloody red ocean with falling margins and identical competitor offerings.',
      'Canvas -> Six Paths -> Non-Customers -> Utility Map -> ERRC -> To-be Canvas.',
      'Three Tests: Focus, Divergence, Compelling Tagline.',
      'Sequence: Buyer Utility -> Strategic Price -> Target Cost -> Adoption Hurdles.',
      'Eliminate and Reduce fund Raise and Create to achieve simultaneous differentiation and low cost.'
    ],
    quiz: [
      {
        id: 'blueocean-1',
        question: 'What is the foundational principle of "Value Innovation" in Blue Ocean Strategy?',
        options: ['Adding more product features than rivals', 'Simultaneously pursuing high differentiation and low cost by reconfiguring the offering', 'Slashing prices below competitor costs', 'Filing aggressive patent protections'],
        correctAnswer: 1,
        explanation: 'Value innovation defies the conventional trade-off between low cost and differentiation by eliminating over-engineered factors and creating new value.'
      },
      {
        id: 'blueocean-2',
        question: 'What are the four components of the Four Actions Framework (ERRC)?',
        options: ['Evaluate, Review, Reorganize, Control', 'Eliminate, Reduce, Raise, Create', 'Enter, Reduce, Return, Capitalize', 'Analyze, Design, Build, Deliver'],
        correctAnswer: 1,
        explanation: 'ERRC stands for Eliminate, Reduce, Raise, and Create.'
      },
      {
        id: 'blueocean-3',
        question: 'On a Strategy Canvas, what indicates that a company possesses a "divergent" strategy?',
        options: ['Its value curve is positioned higher than rivals on every factor', 'The profile shape of its value curve is visibly distinct from competitor curves', 'It maintains the absolute lowest price in the market', 'It competes on more factors than any other company'],
        correctAnswer: 1,
        explanation: 'Divergence refers to the shape of the curve across factors, demonstrating fundamentally different strategic priorities from rivals.'
      },
      {
        id: 'blueocean-4',
        question: 'In Blue Ocean terminology, who are "Tier 2 Refusing Non-Customers"?',
        options: ['People who have never heard of your category', 'People who consciously evaluated the industry’s offerings and decided against purchasing', 'Occasional buyers who are loyal to a direct competitor', 'Former clients who were terminated due to non-payment'],
        correctAnswer: 1,
        explanation: 'Tier 2 non-customers explored the offerings in the market but deliberately refused them because the value proposition did not meet their needs.'
      },
      {
        id: 'blueocean-5',
        question: 'What is the correct commercial sequence for testing the viability of a Blue Ocean idea?',
        options: ['Target Cost -> Strategic Price -> Buyer Utility -> Adoption Hurdles', 'Buyer Utility -> Strategic Price -> Target Cost -> Adoption Hurdles', 'Adoption Hurdles -> Target Cost -> Strategic Price -> Buyer Utility', 'Strategic Price -> Buyer Utility -> Adoption Hurdles -> Target Cost'],
        correctAnswer: 1,
        explanation: 'The sequence begins with exceptional Buyer Utility, sets a compelling Strategic Price, reverse-engineers the Target Cost, and solves Adoption Hurdles.'
      }
    ]
  },
  {
    id: 'vrio',
    name: 'VRIO Framework',
    shortName: 'VRIO',
    category: 'Strategy & Planning',
    tagline: 'Test whether an internal resource provides sustainable competitive advantage',
    origin: 'Jay B. Barney (Journal of Management, 1991 as VRIN; refined to VRIO in 1995/1997).',
    corePurpose: 'To move internal strategy from vague self-praise ("what are we good at") to identifying which resources rivals cannot easily replicate, pinpointing organizational gaps.',
    primaryUsers: ['CEOs & strategy teams', 'M&A and due diligence evaluators', 'HR & talent leaders', 'Founders defending market position'],
    difficulty: 'Intermediate',
    horizon: 'Now / Current capability base',
    scope: 'Firm Resources & Capabilities',
    timeToResult: '1 week',
    dataNeeds: 'Medium (internal audits & competitor comparisons)',
    keyOutput: 'Resource defensibility ladder + organizational gap remediation list',
    bestPairedWith: 'Takes input from SWOT (Strengths); Feeds Ansoff, Blue Ocean factor defence, BSC Learning & Growth',
    keyFeatures: [
      'Four sequential filter questions: Valuable? Rare? Costly to Imitate? Organised to capture value?',
      'Clear decision ladder from Disadvantage -> Parity -> Temporary Advantage -> Unused Advantage -> Sustained Advantage',
      'Applies to tangible assets (equipment), intangible assets (brand, data), and capabilities (culture, processes)',
      'Uncovers "Organisation" gaps: valuable, rare, and inimitable assets the firm is failing to monetize',
      'Grounds internal strategy in empirical Resource-Based View (RBV) economics'
    ],
    howItWorks: 'The team inventories 10-20 core candidate resources and capabilities from SWOT strengths and customer win interviews. Each resource is tested sequentially: 1. Is it Valuable? (If No -> Disadvantage). 2. Is it Rare? (If No -> Competitive Parity). 3. Is it Costly to Imitate? (If No -> Temporary Advantage). 4. Is the firm Organised? (If No -> Unused Advantage). Passing all four yields Sustained Competitive Advantage.',
    coreConcepts: [
      {
        term: 'Resource-Based View (RBV)',
        definition: 'Strategic theory positing that unique, bundle-specific internal resources—rather than industry structure alone—drive superior corporate performance.'
      },
      {
        term: 'Resource vs Capability',
        definition: 'A resource is something a firm possesses (patents, proprietary dataset, land). A capability is something the firm does effectively (rapid product iteration, dealer channel management).'
      },
      {
        term: 'Costly to Imitate (Inimitability)',
        definition: 'Protected by: unique historical conditions (path dependence), causal ambiguity (rivals cannot decipher how it works), social complexity (culture, trust networks), or legal rights (patents).'
      },
      {
        term: 'Organised to Capture Value',
        definition: 'Complementary reporting structures, compensation incentives, workflows, and IT systems in place to fully exploit the resource.'
      },
      {
        term: 'The VRIO Ladder',
        definition: 'Valuable? (No = Disadvantage) -> Rare? (No = Parity) -> Inimitable? (No = Temporary Advantage) -> Organised? (No = Unused Advantage) -> Yes to all = Sustained Advantage.'
      }
    ],
    strengths: [
      'Forces brutal honesty about whether internal capabilities are truly distinctive or just common hygiene factors',
      'Reveals low-hanging fruit: "Unused Advantages" where fixing management systems unlocks immediate value',
      'Prevents wasting capital on acquiring off-the-shelf assets that rivals can duplicate by Friday'
    ],
    limitations: [
      'Subjective assessments unless forced to cite strict competitor benchmarks and customer evidence',
      'Static: sustained advantages can quickly degrade into parity due to technological disruption or regulatory changes',
      'Says nothing about market demand: having a sustained advantage in an obsolete industry still fails'
    ],
    workflowPlacement: {
      upstream: 'SWOT (validating listed Strengths), customer interviews, operational capability audits',
      downstream: 'Ansoff Matrix (screening growth feasibility), Blue Ocean (defending created factors), Balanced Scorecard (Learning & Growth)'
    },
    useCases: [
      {
        title: 'Specialty Coffee Roaster (3 Outlets)',
        scenario: 'Founder planning to franchise the concept statewide.',
        problem: 'Unsure what franchisees were truly paying for.',
        howItHelps: 'Tested roasting recipe (Valuable, but not rare, easily copied), farmer supply contracts in Coorg (Valuable, rare, socially complex, but lacked formal contracts = Unused Advantage), and local brand (Valuable, rare regionally, but easily matched with ad spend = Temporary).',
        outcome: 'Formalized long-term farmer contracts before franchising; redirected capital from brand marketing to secure supply chain.'
      },
      {
        title: 'VC Evaluating Logistics Startup',
        scenario: 'Pitch deck boasted "Proprietary AI routing algorithm".',
        problem: 'Investors needed to know if the software was defensible.',
        howItHelps: 'VRIO revealed the algorithm was valuable and rare today, but easily replicated within 6 months by well-funded competitors (Temporary Advantage). However, exclusive onboarding contracts with 400 neighborhood kirana stores possessed high social complexity.',
        outcome: 'Valuation anchored on the kirana distribution network, with covenants mandating contract formalization.'
      }
    ],
    caseStudy: {
      company: 'Thanjavur Rice Mills',
      revenue: '₹120 Crore',
      staff: '210 employees, branded rice distributor in Tamil Nadu & Kerala',
      profile: 'Established processor that commissioned an expensive modern parboiling processing plant 3 years prior.',
      challenge: 'Assumed the new automated plant gave them an invincible competitive moat. Within 18 months, two local competitors built identical facilities and a national corporate brand entered.',
      whyChosen: 'Needed to distinguish genuine defensibility from commoditized hygiene factors across their 12 internal strengths.',
      steps: [
        'Inventoried 14 resources/capabilities from SWOT and distributor interviews',
        'Testing panel: CEO, CFO, sales head, plant manager, and an external strategic advisor',
        'Plant was tested: Valuable, but NOT Rare (competitors bought identical imported equipment) -> Reclassified as Competitive Parity',
        'Tested farmer procurement network: 25-year informal relationships with 1,800 paddy farmers. Valuable, Rare, Costly to imitate (social complexity), but NOT Organised (no written agreements, no data logging) -> Diagnosed as Unused Advantage',
        'Tested artisanal grain quality-grading know-how: Valuable, Rare, Costly to imitate (causal ambiguity) -> Sustained Advantage, but invisible to consumers',
        'Management reallocated ₹3 Crore from generic billboard advertising to launch a structured farmer partnership app and certified quality labeling'
      ],
      results: [
        'Contracted farmer supply rose from 0% to 62% of total paddy intake, cutting seasonal grain price volatility by 33%',
        'Graded-quality SKUs commanded a 9% price premium and captured 35% of branded volume',
        'Regional market share held rock-solid against the national conglomerate while two regional competitors lost volume',
        'Distributor surveys revealed "consistent quality batch after batch" overtook price as the #1 reason to stock the brand'
      ],
      lessonsLearned: [
        'The firm’s most valuable asset was completely uncodified and taken for granted because it was informal',
        'Capital investments in equipment almost always end up as table-stakes Competitive Parity',
        'Remediating the "Organisation" gap on an existing resource provided far higher ROI than investing in new physical machinery'
      ]
    },
    implementationGuide: {
      prerequisites: ['Executive sponsor willing to reallocate capital', 'Cross-functional panel (4-6 leaders)', 'At least one outside challenger (customer or advisor)'],
      steps: [
        'Build resource inventory of 10-20 items from SWOT strengths and operational reviews',
        'For each item, articulate concrete customer benefit or cost reduction',
        'Assemble proof: customer quotes, competitor teardowns, time-to-replicate estimates',
        'Test Valuable (eliminate non-valuable items as Disadvantages)',
        'Test Rare (benchmarked against the 10 closest competitors; mark non-rare as Parity)',
        'Test Costly to Imitate using the inimitability checklist (path dependence, ambiguity, complexity)',
        'Test Organised (audit systems, incentives, reporting, and tools)',
        'Place every resource onto the VRIO Decision Ladder',
        'Prioritize fixes: Remedy "Unused Advantages" first (fastest return), protect Sustained Advantages, and treat Parity items as hygiene costs to minimize'
      ],
      checklist: [
        'Inventory of 10-20 specific resources/capabilities created',
        'Evidence attached to every affirmative rating',
        'Outside challenger participated in scoring',
        'Inimitability criteria (history, causal ambiguity, complexity, legal) applied',
        'Specific organizational remedies assigned to Unused Advantages',
        'Capital reallocation approved by leadership'
      ],
      commonMistakes: [
        { mistake: 'Testing broad platitudes ("our talented people")', fix: 'Break into concrete capabilities: "specialized micro-optics lens calibration skills"' },
        { mistake: 'Marking common industry capabilities as Rare', fix: 'Apply the 10-closest-competitors rule: if 3 or more have it, it is not rare' },
        { mistake: 'Confusing "hard-to-build" with "costly-to-imitate"', fix: 'Ask: "Could a competitor with ₹50 Crore in capital replicate this in 12 months?" If yes, it is imitable' },
        { mistake: 'Ignoring the "O" (Organised)', fix: 'A valuable, rare, and inimitable asset that lacks management exploitation is pure dead overhead' }
      ],
      plan306090: {
        d30: 'Build inventory, gather competitor benchmarks, conduct panel scoring, and map the ladder.',
        d60: 'Launch organizational fixes for top Unused Advantages; communicate Sustained Advantages in marketing.',
        d90: 'Screen all growth proposals (Ansoff) against VRIO; link sustained assets to Balanced Scorecard Learning & Growth.'
      },
      proTips: [
        'Always interview customers about why they buy before running the workshop—their answers define "Valuable".',
        'Look for hidden advantages in informal operational places: vendor trust, tacit assembly knowledge, community reputation.',
        'Codify causally ambiguous advantages internally; otherwise they leave when key employees resign.'
      ]
    },
    whenNotToUse: [
      { alternative: 'Core Competence Analysis', reason: 'Choose Core Competence (Prahalad & Hamel) when determining which meta-capabilities span multiple business divisions.' },
      { alternative: 'Value Chain Analysis', reason: 'Choose Porter’s Value Chain when locating where along the operational sequence costs and value are generated before assessing defensibility.' }
    ],
    reflectionPrompts: [
      'Which of your company’s cherished "strengths" could a well-funded competitor purchase off the shelf within 12 months?',
      'Which invaluable asset in your organization relies entirely on one person, and what happens if they walk away?',
      'Do your customers purchase from you for the reasons management thinks they do?'
    ],
    quickReferenceCard: [
      'Use when: Deciding capital allocation, evaluating an M&A acquisition, or vetting SWOT strengths.',
      'Sequential Questions: Valuable -> Rare -> Costly to Imitate -> Organised.',
      'Ladder: Disadvantage -> Parity -> Temporary -> Unused -> Sustained Advantage.',
      'Require proof for every "Yes"; an outside challenger is mandatory.',
      'Fix "Organised" gaps first—it delivers the highest ROI without new capital expenditure.'
    ],
    quiz: [
      {
        id: 'vrio-1',
        question: 'According to VRIO, a resource that is Valuable, but NOT Rare, provides the organization with:',
        options: ['Sustained competitive advantage', 'Competitive parity', 'Competitive disadvantage', 'Temporary competitive advantage'],
        correctAnswer: 1,
        explanation: 'If a resource is valuable but widespread among competitors, it is a hygiene factor that provides Competitive Parity.'
      },
      {
        id: 'vrio-2',
        question: 'Why does "causal ambiguity" protect an organization’s capability from imitation?',
        options: ['Because it is registered under patent law', 'Because competitors cannot decipher the exact combination of factors creating the advantage', 'Because it requires immense capital expenditure', 'Because it is owned exclusively by the company founder'],
        correctAnswer: 1,
        explanation: 'Causal ambiguity means even outside observers and rivals cannot pinpoint the exact cause-and-effect relationship producing the success.'
      },
      {
        id: 'vrio-3',
        question: 'What does the "O" represent in the VRIO framework?',
        options: ['Operational efficiency', 'Opportunity assessment', 'Organised to capture value', 'Ownership structure'],
        correctAnswer: 2,
        explanation: '"Organised" refers to whether the firm has the structure, systems, metrics, and culture in place to exploit the resource.'
      },
      {
        id: 'vrio-4',
        question: 'VRIO is rooted in which foundational strategic management theory?',
        options: ['Industrial Organization economics', 'Resource-Based View (RBV) of the firm', 'Game Theory', 'Transaction Cost Economics'],
        correctAnswer: 1,
        explanation: 'VRIO was formulated by Jay Barney as an operational diagnostic for the Resource-Based View (RBV) of the firm.'
      },
      {
        id: 'vrio-5',
        question: 'If a resource is Valuable, Rare, and Costly to Imitate, but the firm is NOT Organised to exploit it, the outcome is:',
        options: ['Sustained competitive advantage', 'Unused (unrealized) competitive advantage', 'Competitive parity', 'Competitive disadvantage'],
        correctAnswer: 1,
        explanation: 'The latent potential for superior advantage exists, but remains Unused until management installs the necessary systems and incentives.'
      }
    ]
  },
  {
    id: 'okrs',
    name: 'OKRs (Objectives and Key Results)',
    shortName: 'OKRs',
    category: 'Strategy & Planning',
    tagline: 'Set ambitious quarterly objectives with measurable, outcome-based key results',
    origin: 'Andy Grove (Intel, 1970s); brought to Google in 1999 by John Doerr (Measure What Matters, 2018).',
    corePurpose: 'To focus teams on the few things that matter most each quarter, make progress visible, and connect daily work to strategy without bureaucratic overhead.',
    primaryUsers: ['Founders & startups', 'Product & engineering teams', 'Department managers', 'Growth squads', 'Corporate teams'],
    difficulty: 'Intermediate',
    horizon: 'Quarterly (with weekly check-ins)',
    scope: 'Team / Department / Company',
    timeToResult: '2 weeks',
    dataNeeds: 'Medium (baseline metrics & cadence)',
    keyOutput: '3-5 qualitative Objectives, each with 3-5 quantitative Key Results',
    bestPairedWith: 'Takes input from Balanced Scorecard initiatives, Ansoff growth choices; Feeds weekly sprints & retros',
    keyFeatures: [
      '3-5 Objectives per level, each with 3-5 measurable Key Results (the 3x3 rule)',
      'Key Results are strictly numeric, time-bound outcomes—never activity task lists',
      'Distinguishes Committed OKRs (1.0 expected) from Aspirational stretch OKRs (0.6-0.7 is healthy success)',
      'Weekly 20-minute check-ins with confidence scores (1-10)',
      'Deliberately decoupled from individual salary compensation to protect ambitious stretch goals'
    ],
    howItWorks: 'Leadership defines 2-3 company OKRs from annual strategy. Teams draft bottom-up OKRs aligned with the company goals (60% bottom-up, 40% top-down). OKRs are published transparently for everyone to view. Teams conduct weekly 20-minute check-ins logging current values and confidence scores. At quarter end, each KR is graded (0.0 to 1.0) and lessons are synthesized for the next cycle.',
    coreConcepts: [
      {
        term: 'Objective (Qualitative & Inspiring)',
        definition: 'A memorable, motivating statement of WHAT to achieve (e.g. "Make first-time customer onboarding delightful").'
      },
      {
        term: 'Key Result (Quantitative Outcome)',
        definition: 'A measurable metric with baseline, target, and date showing HOW we know the objective was achieved (e.g. "Reduce time-to-first-value from 14 to 4 days by Sept 30").'
      },
      {
        term: 'Initiative vs Key Result',
        definition: 'An initiative is the work done (e.g. "Redesign checkout flow"). A Key Result is the resulting outcome (e.g. "Checkout abandonment drops from 65% to 40%").'
      },
      {
        term: 'Aspirational vs Committed',
        definition: 'Committed OKRs are operational imperatives expected to score 1.0. Aspirational OKRs are stretch ambitions where 0.6 to 0.7 represents exceptional achievement.'
      },
      {
        term: 'Decoupling from Compensation',
        definition: 'If OKR attainment is tied to annual bonuses, employees will aggressively sandbag targets and eliminate ambitious innovation.'
      }
    ],
    strengths: [
      'Creates intense focus on top organizational priorities each quarter',
      'Radical company-wide transparency prevents duplicated or conflicting efforts',
      'Fast 90-day feedback loop allows continuous tactical course correction'
    ],
    limitations: [
      'Frequently corrupted into to-do lists of tasks instead of measurable business outcomes',
      'Fails when teams lack baseline measurement systems or historical data',
      'Quarterly cycle can feel too compressed for multi-year scientific R&D or capital infrastructure'
    ],
    workflowPlacement: {
      upstream: 'Annual strategy themes, Balanced Scorecard initiatives, Ansoff expansion choices',
      downstream: 'Bi-weekly sprint planning, weekly team priorities, CFRs (Conversations, Feedback, Recognition)'
    },
    useCases: [
      {
        title: 'Early-Stage Startup (12 people)',
        scenario: 'Everyone worked 60 hours a week, but investors asked what actually changed this quarter.',
        problem: 'No unified priorities; team members pulled in competing directions.',
        howItHelps: 'Defined 3 company OKRs on user activation, retention, and MRR. Every employee linked their personal focus to one company KR.',
        outcome: 'Weekly check-ins replaced chaotic status meetings; quarter-end grading provided investors with crisp milestone clarity.'
      },
      {
        title: 'Marketing Department in Mid-Size Enterprise',
        scenario: 'Team reported volume of blog posts written and webinars hosted.',
        problem: 'Executive leadership couldn’t see tangible pipeline or revenue contribution.',
        howItHelps: 'Replaced task metrics with Objective ("Become the #1 choice for Tier-2 SMEs") and KRs on qualified leads, acquisition cost, and organic branded search traffic.',
        outcome: 'Content output was evaluated by KR movement; dropped two low-performing social channels to focus on high-intent lead funnels.'
      }
    ],
    caseStudy: {
      company: 'Trichy EduTech',
      revenue: '₹7 Crore',
      staff: '45 employees, 60,000 registered learners, 9,000 paid test-prep subscribers',
      profile: 'Online exam prep startup experiencing plateaued growth and finger-pointing across departments.',
      challenge: 'Previously attempted OKRs and created 38 disconnected goals that nobody looked at after week one.',
      whyChosen: 'Needed fast alignment and focus without the heavy annual architecture of a full Balanced Scorecard.',
      steps: [
        'Held offsite establishing single annual theme: "Win the Subscriber’s Second Year"',
        'Drafted 3 company Objectives for the quarter, each with 3 Key Results',
        'Trained team leads on writing outcome-based KRs using the test: "Would this count if we did nothing?"',
        'Aligned team OKRs, pruning 19 drafted goals down to 11 focused team OKRs',
        'Published all OKRs on a single shared dashboard; instituted weekly 20-minute check-ins with 1-10 confidence scores',
        'Mid-quarter review retired one mis-specified KR and re-baselined another',
        'Conducted quarter-end grading and transparent retrospective across the entire company'
      ],
      results: [
        'Company KR "Subscriber renewal rate from 31% to 45%" graded 0.8 (achieved 42%)',
        'Company KR "Monthly active learners from 14,000 to 20,000" graded 1.0 (hit target)',
        'Content team terminated a 40-video series in week 6 when its associated KR showed zero movement, reallocating budget to mock-test quality',
        'Inter-departmental friction plummeted as retrospective meetings surfaced blockers constructively',
        'Quarter-on-quarter revenue growth accelerated to 18% in Q2 compared to 2% prior to OKRs'
      ],
      lessonsLearned: [
        'The weekly 20-minute check-in is the real engine of OKRs—the document itself is useless without the cadence',
        'Writing KRs as measurable outcomes forced the company to build data analytics tracking that did not previously exist',
        'Keeping OKRs explicitly separated from salary bonuses empowered the team to set the ambitious 45% renewal stretch target honestly'
      ]
    },
    implementationGuide: {
      prerequisites: ['Leadership with a defined annual strategy or theme', 'Designated OKR champion to facilitate cadence', 'Team leads trained in writing measurable KRs', 'Central shared tracking dashboard'],
      steps: [
        'Formulate annual strategic theme in one memorable sentence',
        'Draft 3 corporate Objectives for the upcoming quarter',
        'Write 3 Key Results per Objective; verify baseline, target, date, and outcome orientation',
        'Tag each OKR as Committed (1.0 target) or Aspirational (0.7 target)',
        'Train department leads on Good vs Bad KR examples',
        'Teams draft bottom-up OKRs in one week (cap at 3 Objectives each)',
        'Hold 2-hour alignment review to harmonize dependencies and remove duplicates',
        'Publish all OKRs in an open, visible workspace',
        'Run weekly 20-minute check-ins: record current metric value and 1-10 confidence rating',
        'Hold mid-quarter check to re-baseline or retire obsolete KRs',
        'Grade all KRs at quarter-end (0.0 to 1.0) and host retrospective'
      ],
      checklist: [
        'Strategic theme articulated in one sentence',
        '<= 3 company Objectives, <= 3 KRs each',
        'Every KR includes baseline, target, and completion date',
        'Committed vs Aspirational tags marked',
        'Weekly 20-min check-in recurring on team calendars',
        'OKRs explicitly separated from salary reviews'
      ],
      commonMistakes: [
        { mistake: 'Writing initiatives as Key Results ("Launch the iOS app")', fix: 'Transform into measurable outcome ("Grow iOS active users from 0 to 5,000")' },
        { mistake: 'Too many OKRs (setting 10+ Objectives)', fix: 'Enforce the strict 3x3 rule (3 Objectives x 3 KRs maximum)' },
        { mistake: 'Setting and forgetting until the end of quarter', fix: 'The weekly confidence check-in is mandatory; without it, OKRs fail' },
        { mistake: 'Linking OKRs directly to financial bonuses', fix: 'Decouple compensation completely; pay links cause employees to sandbag stretch goals' }
      ],
      plan306090: {
        d30: 'Set theme, write company OKRs, train leads, align team drafts, and initiate weekly check-ins.',
        d60: 'Conduct mid-quarter review; coach struggling teams on confidence ratings; fix data pipeline gaps.',
        d90: 'Complete quarter-end scoring and retrospective; publish results company-wide; draft next quarter OKRs.'
      },
      proTips: [
        'If your organization has never used OKRs, start with just ONE company Objective in Quarter 1.',
        'Assign a single named owner to each Key Result—shared ownership leads to neglected ownership.',
        'Celebrate teams that achieved a 0.65 on a bold stretch goal; it validates high ambition.'
      ]
    },
    whenNotToUse: [
      { alternative: 'Balanced Scorecard', reason: 'Choose BSC when an enterprise needs an annual, multi-perspective strategic architecture with explicit causal maps across business units.' },
      { alternative: 'SMART / MBO Individual Goals', reason: 'Choose SMART goals when establishing individual role performance expectations tied directly to annual compensation reviews.' }
    ],
    reflectionPrompts: [
      'Which of your team’s current goals cannot be expressed with a baseline, a target number, and a date?',
      'If every department’s quarterly priorities were published openly tomorrow, which hidden conflicts would surface?',
      'How would team psychological safety improve if achieving 70% on a courageous stretch goal was celebrated as a victory?'
    ],
    quickReferenceCard: [
      'Use when: You need quarterly alignment, team focus, and outcome accountability.',
      'Strict Rule: 3 Objectives x 3 Key Results per level.',
      'KRs are numeric outcomes: Baseline -> Target -> Date.',
      'Aspirational: 0.7 is healthy success. Committed: 1.0 expected.',
      'Weekly 20-min check-in with 1-10 confidence score is the engine.'
    ],
    quiz: [
      {
        id: 'okr-1',
        question: 'Which of the following represents a properly formulated Key Result?',
        options: ['"Improve client satisfaction and happiness"', '"Deploy the updated mobile app to the app store"', '"Increase NPS from 30 to 48 by March 31"', '"Work more aggressively on organic search marketing"'],
        correctAnswer: 2,
        explanation: 'A Key Result must specify a measurable metric, a baseline (30), a target (48), a date (March 31), and represent an outcome rather than a task.'
      },
      {
        id: 'okr-2',
        question: 'For an Aspirational (stretch) OKR, what average end-of-quarter score is considered healthy success?',
        options: ['1.0 (100%)', '0.6 to 0.7 (60-70%)', '0.3 to 0.4 (30-40%)', '0.0 (0%)'],
        correctAnswer: 1,
        explanation: 'A score of 0.6 to 0.7 indicates ambitious stretch goal-setting. Consistently scoring 1.0 suggests the team is sandbagging and setting goals too low.'
      },
      {
        id: 'okr-3',
        question: 'Where was the OKR system originally conceived and developed before John Doerr brought it to Google?',
        options: ['Harvard Business School', 'Intel Corporation (under Andy Grove)', 'General Electric (under Jack Welch)', 'Toyota Motor Corporation'],
        correctAnswer: 1,
        explanation: 'Andy Grove developed iMBOs (Intel Management by Objectives) at Intel in the 1970s, which evolved into OKRs.'
      },
      {
        id: 'okr-4',
        question: '"Redesign the enterprise customer onboarding workflow" is best classified as:',
        options: ['An Objective', 'A Key Result', 'A Strategic Initiative (Task)', 'A Confidence Grade'],
        correctAnswer: 2,
        explanation: 'It describes an activity or project undertaken to move a metric, making it an Initiative rather than a measurable outcome Key Result.'
      },
      {
        id: 'okr-5',
        question: 'Why does OKR methodology strictly mandate decoupling OKR scores from employee salary bonuses?',
        options: ['To streamline HR payroll operations', 'To protect psychological safety so teams set audacious stretch targets without fear of financial penalty', 'Because OKRs are confidential executive documents', 'Because OKRs are evaluated only on a multi-year basis'],
        correctAnswer: 1,
        explanation: 'Tying OKRs to pay incentivizes teams to negotiate easy, guaranteed targets (sandbagging), destroying the ambitious stretch culture.'
      }
    ]
  }
];

export interface StrategyStack {
  id: string;
  name: string;
  targetOrg: string;
  recommendedChain: string[];
  cadence: {
    quarterly: string;
    annually: string;
    every23Years: string;
  };
  whyItFits: string;
  whatToSkip: string;
}

export const STRATEGY_STACKS: StrategyStack[] = [
  {
    id: 'stack-a',
    name: 'Stack A — Lean Startup',
    targetOrg: 'Under 25 people, single product or early-stage offering',
    recommendedChain: ['swot', 'ansoff', 'okrs'],
    cadence: {
      quarterly: 'SWOT (light 90-min) -> Ansoff (confirm penetration focus) -> OKRs (3x3 team sprint)',
      annually: 'Five Forces (market attractiveness check) + Quick VRIO (defensibility audit)',
      every23Years: 'N/A — maintain quarterly iteration speed'
    },
    whyItFits: 'Speed and focus matter far more than corporate architecture. The entire quarterly stack can be completed in a single focused executive day.',
    whatToSkip: 'Skip formal Balanced Scorecard (OKRs suffice), full PESTLE (a 1-page scan is plenty), and Blue Ocean (unless market is hyper-red).'
  },
  {
    id: 'stack-b',
    name: 'Stack B — Growing SME',
    targetOrg: '25 to 300 people, multiple products or geographic markets',
    recommendedChain: ['pestle', 'porter', 'swot', 'vrio', 'ansoff', 'bsc', 'okrs'],
    cadence: {
      quarterly: 'OKRs derived directly from scorecard initiatives; lightweight SWOT check-in',
      annually: 'Full cycle: PESTLE -> Five Forces -> SWOT/TOWS -> VRIO -> Ansoff -> Balanced Scorecard Refresh',
      every23Years: 'Blue Ocean Strategy Canvas on core commoditized business lines'
    },
    whyItFits: 'Multiple markets and departments require both an annual map (Balanced Scorecard) and quarterly agile sprints (OKRs). The diagnostic chain prevents expensive growth moves the firm cannot operationally support.',
    whatToSkip: 'Avoid complex multi-division enterprise software; spreadsheets and BI dashboards are sufficient.'
  },
  {
    id: 'stack-c',
    name: 'Stack C — Enterprise & Multi-Division',
    targetOrg: '300+ employees, holding groups, or diverse business units',
    recommendedChain: ['pestle', 'porter', 'vrio', 'ansoff', 'bsc', 'swot', 'okrs', 'blueocean'],
    cadence: {
      quarterly: 'Division scorecards cascaded from corporate -> quarterly team OKRs across all units',
      annually: 'Corporate PESTLE & scenario planning -> Five Forces & VRIO per division -> portfolio review using Ansoff/BCG -> Corporate Balanced Scorecard',
      every23Years: 'Dedicated corporate innovation units using Blue Ocean Strategy as an institutionalized process with research budget'
    },
    whyItFits: 'Scale demands structured cascading: Balanced Scorecard guarantees cross-department alignment while OKRs keep frontline teams agile.',
    whatToSkip: 'Do not use single monolithic spreadsheets; require integrated strategy management software.'
  }
];

export interface ScenarioMission {
  id: string;
  title: string;
  role: string;
  companyContext: string;
  crisisPrompt: string;
  targetTools: string[];
  options: {
    id: string;
    label: string;
    toolUsed: string;
    explanation: string;
    isOptimal: boolean;
    rubricPoints: number; // out of 25
  }[];
  modelAnswer: string;
  actionChecklist: string[];
  reflectionKey: string;
}

export const SCENARIO_MISSIONS: ScenarioMission[] = [
  {
    id: 'bpo-automation',
    title: 'The BPO Automation Threat',
    role: 'Operations Head',
    companyContext: '60-seat Business Process Outsourcing (BPO) firm in Coimbatore handling claims processing.',
    crisisPrompt: 'A key client representing 40% of total company revenue announces they will automate their claims process via RPA within 18 months. What is your strategic move using SWOT & TOWS?',
    targetTools: ['swot'],
    options: [
      {
        id: 'opt-1',
        label: 'Reflexively discount billing rates by 35% to convince client to retain manual team',
        toolUsed: 'SWOT (reactive price cut)',
        explanation: 'Fails to address structural shift. The client is automating for accuracy and speed, not just cost. A price war erodes your cash reserves without stopping the exit.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Treat automation as Threat & Opportunity: Launch ST Managed Services + WO RPA retraining + WT diversification',
        toolUsed: 'SWOT & TOWS Matrix',
        explanation: 'Model move! Scopes analysis over 24 months. ST: Offer to manage and audit the client’s new automated workflows. WO: Retrain 10 staff on RPA. WT: Begin client diversification immediately.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Immediately terminate 25 staff to protect margins and wait for replacement clients',
        toolUsed: 'Premature panic downsizing',
        explanation: 'Destroys morale and eliminates institutional knowledge needed to pivot into higher-value automation-management services.',
        isOptimal: false,
        rubricPoints: 10
      }
    ],
    modelAnswer: 'Scope analysis to "Revenue base over 24 months". Categorize automation as both an external Threat and an Opportunity (clients need automation governance and exception handling). Strengths: process documentation, client trust. Weaknesses: single-client concentration, zero internal RPA capability. ST Strategy: Offer to operate and quality-audit the automated workflow as a managed service. WO Strategy: Retrain 10 high-performing analysts on RPA toolchains to pursue new digital clients. WT Strategy: Launch aggressive sales diversification so the client transition is not fatal. Assign owners and 90-day milestones.',
    actionChecklist: [
      'Scope analysis to 24-month horizon',
      'Classify automation as both Threat and Opportunity in TOWS',
      'Formulate ST (Managed Automation Service) and WO (RPA Retraining) strategies',
      'Establish immediate client diversification WT mitigation milestones'
    ],
    reflectionKey: 'External technological disruption almost always conceals a high-value advisory or managed-service opportunity if the firm’s core process knowledge is repackaged.'
  },
  {
    id: 'ev-bus-disruption',
    title: 'The Subsidised Public EV Bus Shock',
    role: 'Head of Strategy',
    companyContext: 'Regional private intercity bus operator with a fleet of 80 diesel coaches across southern routes.',
    crisisPrompt: 'The state government announces a massive expansion of electric public buses on your prime routes at 50% subsidized fares. Which forces change and how do you respond using Five Forces & Blue Ocean?',
    targetTools: ['porter', 'blueocean'],
    options: [
      {
        id: 'opt-1',
        label: 'Engage in ticket discounting on existing routes and petition local government',
        toolUsed: 'Five Forces (price rivalry against subsidized state player)',
        explanation: 'You cannot win a price war against a government entity with subsidized capital and zero profitability requirements.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Recognize Substitute threat: Pivot to unserved segments (Premium Intercity & Corporate Shuttles) with Blue Ocean canvas',
        toolUsed: 'Five Forces + Blue Ocean Strategy',
        explanation: 'Subsidized public transit is a powerful Substitute. Repositioning to premium business travel and corporate subscription shuttles removes the firm from low-fare price wars and builds high switching costs.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Sell all buses immediately and exit the passenger transportation sector',
        toolUsed: 'Capitulation without analysis',
        explanation: 'Premature exit that liquidates valuable operating permits, fleet assets, and driver talent without testing alternative segments.',
        isOptimal: false,
        rubricPoints: 8
      }
    ],
    modelAnswer: 'Threat of Substitutes spikes drastically (subsidized public transport is a functional substitute, not a commercial peer rival). Buyer Power increases as commuters gain a cheap alternative. Response: Reposition away from price-sensitive commuter routes toward segments the public transit cannot serve well: Premium sleeper intercity coaches with onboard Wi-Fi, punctuality guarantees, and guaranteed seating; plus corporate employee shuttles. Build switching costs through corporate contracts and a mobile app subscription. Draw a Blue Ocean canvas for the premium business traveler segment.',
    actionChecklist: [
      'Reclassify subsidized state buses as Substitute, not industry peer rival',
      'Acknowledge surge in Buyer Power for generic transit',
      'Construct Blue Ocean Canvas for premium intercity routes',
      'Eliminate cutthroat price matching; raise punctuality and onboard workspace amenities'
    ],
    reflectionKey: 'When a non-commercial or state actor subsidizes standard service, your only defense is creating an uncontested value curve that public transit cannot structurally match.'
  },
  {
    id: 'diagnostics-bsc-mystery',
    title: 'The Diagnostic Lab Scorecard Mystery',
    role: 'General Manager',
    companyContext: 'Multi-center clinical diagnostic lab chain with 12 centers.',
    crisisPrompt: 'Your Balanced Scorecard dashboard shows green for Learning (technician certifications: 98%) and green for Process (turnaround time cut to 2 hours), but Customer referrals from doctors are stagnant and Financial revenue is 15% below target. What do you do?',
    targetTools: ['bsc'],
    options: [
      {
        id: 'opt-1',
        label: 'Assume technicians are cheating on certification tests and mandate re-training',
        toolUsed: 'BSC (doubling down on existing Learning measure)',
        explanation: 'Ignoring the real breakdown. The data shows process and learning are already functioning; the cause-and-effect hypothesis linking process speed to doctor referrals is flawed.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Investigate the broken cause-and-effect link: interview referring doctors to uncover real customer value drivers',
        toolUsed: 'Balanced Scorecard Hypothesis Auditing',
        explanation: 'Correct! The hypothesis from Process -> Customer failed. Doctors may not care about 2-hour turnaround if report formatting is confusing or sample collection is inconvenient. Fix the link, don’t add more metrics.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Cut prices on all pathology tests and add 10 new financial KPIs to the scorecard',
        toolUsed: 'BSC (metric proliferation)',
        explanation: 'Adding more metrics dilutes management attention and fails to address why doctors are not referring patients.',
        isOptimal: false,
        rubricPoints: 10
      }
    ],
    modelAnswer: 'The core cause-and-effect hypothesis from Internal Process to Customer is disproven. Turnaround time was an unverified assumption. Interview referring physicians: you will likely discover that report clarity, emergency pathologist consultations, and sample pickup convenience matter far more than speed. Revise the Customer objective and adjust the leading Process measures (e.g. "Specimen pickup reliability" and "Digital report interpretation clarity"). Redesign the initiative while preserving technician certification gains. Do not clutter the scorecard with more KPIs—repair the causal connection.',
    actionChecklist: [
      'Recognize that a green measure driving red outcomes indicates a broken hypothesis',
      'Conduct doctor interviews to uncover true value drivers',
      'Revise Customer and Internal Process objective pairings',
      'Keep total scorecard measures under 20'
    ],
    reflectionKey: 'The magic of the Balanced Scorecard is not hitting green targets; it is exposing when your strategic assumptions about customer behavior are wrong so you can pivot fast.'
  },
  {
    id: 'coaching-ansoff-dilemma',
    title: 'The Pan-India AI Tutoring Expansion',
    role: 'Chief Executive Officer',
    companyContext: 'Regional entrance-exam coaching institute chain with 8 physical centers growing at 8% annually.',
    crisisPrompt: 'Your board recommends launching an online-only brand across India utilizing experimental AI automated tutoring. How do you evaluate and sequence this using Ansoff Matrix and VRIO?',
    targetTools: ['ansoff', 'vrio'],
    options: [
      {
        id: 'opt-1',
        label: 'Commit 80% of annual capital immediately to the nationwide online brand launch',
        toolUsed: 'Unscreened Diversification',
        explanation: 'Commits massive capital to the highest-risk quadrant (unproven technology + unfamiliar nationwide students) while the core physical business still has untapped penetration potential.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Classify as Diversification: Sequence via Product Dev (AI for existing students) then Market Dev (online in adjacent states)',
        toolUsed: 'Ansoff Staged Sequencing + VRIO Check',
        explanation: 'Superb strategic discipline! Test AI tutoring on current students first (Product Development: lower risk). Then expand proven courses online to adjacent states (Market Development). Only merge both into pan-India brand after proving unit economics and VRIO capabilities.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Reject all digital technology and invest entirely in building two more offline physical branches',
        toolUsed: 'Defensive inertia',
        explanation: 'Fails to test new digital distribution channels while students increasingly demand hybrid and automated practice solutions.',
        isOptimal: false,
        rubricPoints: 12
      }
    ],
    modelAnswer: 'The proposal is Diversification (new product form and new market) and sits in the highest-risk quadrant while the core business still possesses penetration headroom. Recommend a disciplined staged route: Stage 1 (Product Development): Integrate the AI tutoring tool into existing physical centre students to validate pedagogy and engagement. Stage 2 (Market Development): Stream proven classroom courses online to students in adjacent districts. Stage 3 (Diversification): Only launch the pan-India standalone brand after Stage 1 and 2 achieve target completion and retention metrics. Run VRIO on AI content and instructional capabilities before committing stage-two capital.',
    actionChecklist: [
      'Identify proposal as high-risk Diversification on Ansoff grid',
      'Deconstruct the move into a two-step sequence (Product Dev -> Market Dev)',
      'Establish explicit stage-gate metrics on learner completion',
      'Conduct VRIO audit on proprietary curriculum and AI tutoring engine'
    ],
    reflectionKey: 'Never gamble the company on simultaneous product and market uncertainty when you can de-risk the move through adjacent two-step staging.'
  },
  {
    id: 'ticket-app-red-ocean',
    title: 'The Ticket Booking App Margin Death Spiral',
    role: 'Product & Strategy Lead',
    companyContext: 'Regional bus ticketing mobile app with 400,000 downloads.',
    crisisPrompt: 'Two venture-funded national aggregators enter your state offering heavy cashback discounts and listing hundreds of operators. Your margins are negative and marketing CAC has tripled. What do you do using Blue Ocean Strategy?',
    targetTools: ['blueocean'],
    options: [
      {
        id: 'opt-1',
        label: 'Match their discounts dollar-for-dollar and raise funding to sustain the burn',
        toolUsed: 'Red ocean price war',
        explanation: 'Suicidal against deep-pocketed national aggregators. Burning capital in an undifferentiated market destroys equity value.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Reconstruct Value Curve: Eliminate discount wars, reduce operator bloat, raise punctuality trust, create concierge boarding',
        toolUsed: 'Blue Ocean Strategy (ERRC & Non-Customers)',
        explanation: 'Transforms the offering! Solves real friction: families and elderly travelers who refuse apps due to unreliable boarding points and dirty buses will gladly pay a fair price for verified quality and concierge assistance.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Add hotel bookings, flight tickets, and grocery delivery to become a "Super App"',
        toolUsed: 'Unfocused feature bloat',
        explanation: 'Spreads limited engineering and capital across multiple fiercely competitive sectors where you have zero competitive advantage.',
        isOptimal: false,
        rubricPoints: 8
      }
    ],
    modelAnswer: 'Draw the Strategy Canvas: All three apps compete on identical factors: discount coupons, sheer number of operators, and generic app features. Explore non-customers: families who still book at physical counters (Tier 2 Refusing) and elderly travelers who find boarding confusing. Buyer Utility Map reveals friction blocks around boarding point safety, seat cleanliness, and punctuality. ERRC: ELIMINATE discount wars; REDUCE low-quality operator bloat; RAISE verified punctuality and live driver tracking; CREATE boarding-point concierge assistants and family-group seat guarantees. Price with a modest service fee justified by premium reliability. Pilot on 3 high-volume routes.',
    actionChecklist: [
      'Draw current canvas proving all players share the same curve',
      'Interview Tier 2 Refusing non-customers who buy at ticket counters',
      'Map friction blocks in the boarding and journey stages',
      'Formulate ERRC actions that substitute discount battles with reliability assurance'
    ],
    reflectionKey: 'When competitors battle over discounts, customers are screaming for reliability, trust, and service quality that discounted platforms cannot afford to provide.'
  }
];

export interface GlossaryItem {
  term: string;
  definition: string;
  tool: string;
}

export const STRATEGY_GLOSSARY: GlossaryItem[] = [
  { term: 'Aspirational OKR', definition: 'A stretch goal where achieving ~0.7 (70%) is celebrated as exceptional success.', tool: 'OKRs' },
  { term: 'Blue Ocean / Red Ocean', definition: 'New uncontested market space with value innovation vs existing crowded, bloodied market space with price competition.', tool: 'Blue Ocean' },
  { term: 'Buyer Utility Map', definition: 'A matrix mapping 6 stages of the buyer journey against 6 utility levers to uncover barriers to purchase.', tool: 'Blue Ocean' },
  { term: 'Cascade', definition: 'Translating higher-level enterprise scorecards or OKRs into aligned sub-team priorities without rigid micromanagement.', tool: 'Balanced Scorecard / OKRs' },
  { term: 'Causal Ambiguity', definition: 'When competitors cannot determine the exact combination of internal practices, culture, and assets creating a firm’s advantage.', tool: 'VRIO' },
  { term: 'Committed OKR', definition: 'An operational imperative where delivery is fully expected (score 1.0 is required).', tool: 'OKRs' },
  { term: 'Core Competence', definition: 'An integrated bundle of skills and technologies that spans multiple products and passes VRIO-style defensibility tests.', tool: 'VRIO' },
  { term: 'Diversification', definition: 'An Ansoff quadrant combining a new product in a new market; related if sharing core synergies, unrelated otherwise.', tool: 'Ansoff Matrix' },
  { term: 'Driver (PESTLE)', definition: 'A specific, evidenced, and quantified external trend or policy, as opposed to a generic thematic category label.', tool: 'PESTLE' },
  { term: 'Entry Barrier', definition: 'An economic or regulatory factor (scale, capital, patents, switching costs) that makes it costly for new rivals to enter an industry.', tool: 'Porter’s Five Forces' },
  { term: 'ERRC Grid', definition: 'The core action framework of Blue Ocean: Eliminate, Reduce, Raise, and Create.', tool: 'Blue Ocean' },
  { term: 'Key Result', definition: 'A measurable, time-bound quantitative outcome that evidences achievement of an Objective (Baseline -> Target -> Date).', tool: 'OKRs' },
  { term: 'Lagging Indicator', definition: 'A metric that measures and confirms business performance after the fact (revenue, gross profit, customer churn).', tool: 'Balanced Scorecard' },
  { term: 'Leading Indicator', definition: 'A predictive metric that drives future outcomes (training hours, prospective pipeline, first-contact resolution).', tool: 'Balanced Scorecard' },
  { term: 'Non-Customers (Three Tiers)', definition: 'Tier 1 Soon-to-be (edge buyers), Tier 2 Refusing (consciously chose against), Tier 3 Unexplored (never evaluated).', tool: 'Blue Ocean' },
  { term: 'Organised to Capture Value', definition: 'Having the organizational governance, IT systems, workflows, and incentives in place to exploit a valuable asset.', tool: 'VRIO' },
  { term: 'Perspective (BSC)', definition: 'One of the four strategic dimensions: Financial, Customer, Internal Process, Learning & Growth.', tool: 'Balanced Scorecard' },
  { term: 'Resource-Based View (RBV)', definition: 'The economic theory that firm-specific, bundled internal capabilities explain sustained performance variance.', tool: 'VRIO' },
  { term: 'Six Paths Framework', definition: 'Systematic lenses to look across industries, strategic groups, buyer chains, complementary offerings, emotion/function, and time.', tool: 'Blue Ocean' },
  { term: 'Strategy Canvas', definition: 'Diagnostic visual chart plotting competitive industry factors against company and competitor offering levels.', tool: 'Blue Ocean' },
  { term: 'Strategy Map', definition: 'Single-page visual diagram showing cause-and-effect links connecting objectives from Learning & Growth up to Financial.', tool: 'Balanced Scorecard' },
  { term: 'Substitute', definition: 'A product or service from OUTSIDE the defined industry that fulfills the same underlying functional job for the customer.', tool: 'Porter’s Five Forces' },
  { term: 'Switching Cost', definition: 'The financial, temporal, or psychological friction incurred by a customer when migrating to an alternative vendor.', tool: 'Porter’s Five Forces' },
  { term: 'Synergy', definition: 'Ansoff’s term for the "2 + 2 = 5" strategic benefit generated when a new expansion shares assets with the core business.', tool: 'Ansoff Matrix' },
  { term: 'TOWS Matrix', definition: 'The action layer of SWOT that cross-matches internal S/W with external O/T into SO, WO, ST, and WT initiatives.', tool: 'SWOT' },
  { term: 'Value Innovation', definition: 'Pursuing differentiation and low cost simultaneously by eliminating/reducing over-engineered factors and creating new value.', tool: 'Blue Ocean' }
];
