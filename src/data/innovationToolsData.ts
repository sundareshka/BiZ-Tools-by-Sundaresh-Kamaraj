import { ToolDefinition, StrategyStack, ScenarioMission, GlossaryItem } from './toolsData.ts';

export const INNOVATION_TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'bmc',
    name: 'Business Model Canvas (BMC)',
    shortName: 'Business Model Canvas',
    category: 'Business Model & Innovation',
    tagline: 'Describe, assess and test how a business creates, delivers and captures value on one page',
    origin: 'Alexander Osterwalder & Yves Pigneur (University of Lausanne, Business Model Generation, 2010).',
    corePurpose: 'To replace the long business plan with a shared visual language that lets a team see the whole model at once, argue about it, and change it quickly.',
    primaryUsers: ['Founders & business owners', 'Product managers', 'Corporate innovation teams', 'Incubator mentors', 'Consultants & investors'],
    difficulty: 'Beginner',
    horizon: 'Operating model / Strategic review',
    scope: 'Whole business / Business unit',
    timeToResult: 'Half day',
    dataNeeds: 'Medium (validate after drafting)',
    keyOutput: '9-block one-page model with colour-coded segments and fact/assumption tags',
    bestPairedWith: 'Takes input from Value Proposition Canvas, JTBD, Design Thinking; Feeds Navigator, SWOT, Balanced Scorecard',
    keyFeatures: [
      'Nine blocks covering Customer side (right), Infrastructure side (left), and Economics (bottom)',
      'Visual and spatial: entries are sticky notes, enabling fast rearrangement and alternatives',
      'Colour-coding by customer segment shows multi-sided platforms and multi-segment models',
      'Fact vs assumption tagging convention (green = proven, yellow = interview, red = untested)',
      'Quantified revenue streams and cost structure to evaluate viability'
    ],
    howItWorks: 'The team starts on the right-hand side with Customer Segments and Value Propositions for each, then works outward: Channels, Customer Relationships, and Revenue Streams. The left-hand side addresses Key Resources, Key Activities, and Key Partnerships required to deliver that value, and the resulting Cost Structure. Each entry is tagged as fact or assumption, and experiments are designed for the riskiest assumptions.',
    coreConcepts: [
      {
        term: 'Nine Canvas Blocks',
        definition: 'Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure.'
      },
      {
        term: 'Business Model vs Business Plan',
        definition: 'The business model is the underlying logic of how value is created, delivered, and captured; the business plan is the detailed operational and financial projection built on a validated model.'
      },
      {
        term: 'Fact vs Assumption Tagging',
        definition: 'Green dot = proven by data or paying customers; Yellow dot = supported by interviews only; Red dot = untested hypothesis. The block with the most red dots gets the next experiment.'
      },
      {
        term: 'Multi-Sided Platform Colour-Coding',
        definition: 'Using distinct colours for each segment (e.g. blue for free users, orange for paying sponsors) to trace exactly which channels, activities, and revenues belong to each side.'
      }
    ],
    strengths: [
      'Whole business visible on a single page so cross-functional teams see the same logic',
      'Fast to draft, iterate, and compare alternative strategic models side by side',
      'Exposes missing links (e.g. a value proposition with no channel, or a segment with no revenue)'
    ],
    limitations: [
      'Says nothing about direct competitor rivalry or macro environment (requires Five Forces and PESTLE)',
      'Does not show sequence, priority, or time; all blocks appear equally weighted',
      'Can easily be filled with generic vague platitudes ("quality", "marketing") if unevidenced'
    ],
    workflowPlacement: {
      upstream: 'Customer discovery (JTBD, Design Thinking, Value Proposition Canvas) and environment scanning (PESTLE, Five Forces)',
      downstream: 'Hypothesis testing, financial models, operating plans, Business Model Navigator for reinvention, Balanced Scorecard'
    },
    useCases: [
      {
        title: 'Family-Run Coaching Institute (15 staff)',
        scenario: 'The owner wants to add online courses to an existing classroom business.',
        problem: 'Online was treated as "the same business on a website".',
        howItHelps: 'Drawing the current canvas and a second canvas for online showed different segments (out-of-town students), channels (app stores, YouTube), relationships (automated plus community) and costs (video production, cloud fees).',
        outcome: 'Online launched as a separate model with distinct pricing and a community manager, avoiding diluting classroom operations.'
      },
      {
        title: 'SaaS Startup at Seed Stage',
        scenario: 'Founders preparing for venture capital fund-raising.',
        problem: 'Investors asked "How do you make money from each side?" and received a confusing, convoluted answer.',
        howItHelps: 'A colour-coded canvas clearly separated the free user acquisition funnel from the enterprise buyer monetization tier.',
        outcome: 'A crisp one-slide investor response, plus discovering the free segment lacked a structured retention activity.'
      }
    ],
    caseStudy: {
      company: 'Vaigai Agro Labs',
      revenue: '₹2.4 Crore',
      staff: '18 staff, soil and water testing laboratory in Madurai',
      profile: 'Soil and water testing lab serving farmers, fertilizer dealers, and agro-processors through walk-in submissions.',
      challenge: 'Revenue depended on seasonal farmer walk-ins; lab equipment was idle 65% of the time for eight months of the year. The owner assumed capacity was the constraint and planned to buy more machines.',
      whyChosen: 'Needed to see the entire business on one page before taking on debt, and compare current walk-in model with alternatives.',
      steps: [
        'Current-state canvas drafted in 2 hours with owner, lab head, accountant, and 2 field agents',
        'Colour-coding revealed 3 segments (farmers, dealers, processors) sharing 1 channel and 1 price list',
        'Quantified accounts: farmers were 55% of samples but only 30% of revenue; processors were 10% of samples but 45% of revenue',
        'Tagged 11 red-dot untested assumptions',
        'Drafted 3 alternative canvases: dealer-subscription, processor-contract, and mobile-sampling',
        'Ran 5 customer interviews per segment over 2 weeks to test top assumptions'
      ],
      results: [
        'Signed 4 annual processor contracts with monthly scheduled sampling; lab off-season utilization jumped from 35% to 68%',
        'Dealer subscription (10 tests/month bundled with fertilizer advisory) adopted by 22 dealers; dealer revenue up 40%',
        'Overall annual revenue grew 31% without purchasing a single piece of new equipment',
        'Replaced single walk-in pricing with three tailored price lists'
      ],
      lessonsLearned: [
        'Colour-coding by segment proved transformative: the owner had never realized the smallest volume segment was the profit engine',
        'Roughly quantifying revenue and cost blocks turned a visual poster into an executive decision tool',
        'Fact/assumption tagging prevented the team from prematurely confusing new ideas with validated plans'
      ]
    },
    implementationGuide: {
      prerequisites: ['Sponsor with business authority', 'Facilitator familiar with 9 blocks', '4-8 cross-functional participants', 'Basic revenue/cost estimates by segment'],
      steps: [
        'Define scope: whole firm, one business unit, or one new product',
        'Agree customer segments first and assign a color to each',
        'Draft Value Propositions per segment ("Why would they choose us over alternatives?")' ,
        'Complete Channels, Customer Relationships, and Revenue Streams for each segment',
        'Complete Key Resources, Activities, Partnerships, and Cost Structure',
        'Tag every sticky note as Fact (Green), Interview-supported (Yellow), or Untested (Red)',
        'Quantify revenues and costs with real or ballpark figures',
        'List the 5 riskiest untested assumptions and design cheap tests with numeric criteria',
        'Run 2-4 week experiment sprint, record results, and iterate the canvas'
      ],
      checklist: [
        'Scope stated clearly',
        'Segments colour-coded',
        'One value proposition articulated per segment',
        'Every entry tagged fact / supported / untested',
        'Revenues and costs roughly quantified',
        'Top 5 assumptions assigned test experiments and owners'
      ],
      commonMistakes: [
        { mistake: 'Starting with Key Resources instead of the Customer', fix: 'Always start on the right side: Customer Segments and Value Propositions' },
        { mistake: 'Writing generic words ("good service", "marketing")', fix: 'Require a specific noun, channel, and where possible, a number' },
        { mistake: 'One canvas for several unrelated segments', fix: 'Use color-coding or split into separate canvases to track distinct unit economics' },
        { mistake: 'Treating the canvas as a finished strategy', fix: 'A first draft is merely a hypothesis list waiting for customer validation' }
      ],
      plan306090: {
        d30: 'Draft current canvas, color-code segments, tag facts/assumptions, launch top 3 tests.',
        d60: 'Synthesize experiment results, revise canvas, draw alternative models if needed.',
        d90: 'Build detailed financial model on validated canvas; establish quarterly review rhythm.'
      },
      proTips: [
        'Draw the canvas by hand or on a whiteboard first; polished software makes guesses look like proven facts.',
        'Write every entry so it could be proven wrong ("Customers value 24h speed" can be tested; "Quality" cannot).',
        'Review Revenue Streams against Cost Structure per segment: if a segment costs more than it pays, redesign or exit.'
      ]
    },
    whenNotToUse: [
      { alternative: 'Lean Canvas', reason: 'Choose Lean Canvas for early pre-revenue startups where the main risk is problem-solution fit rather than key partners and resources.' },
      { alternative: 'Business Model Navigator', reason: 'Choose Navigator when you have an established business needing structured pattern-based reinvention.' }
    ],
    reflectionPrompts: [
      'If you drew your organization’s canvas today, which block would your leadership team disagree on most?',
      'Which customer segment costs you the most to serve relative to what it pays, and have you ever calculated that ratio?',
      'Which sticky note on your canvas has never been tested with a live customer?'
    ],
    quickReferenceCard: [
      'Use when: You need the whole business model on one page to describe, assess, or redesign.',
      'Nine blocks; start from Customer Segments & Value Propositions on the right.',
      'Colour-code segments; tag facts (green), supported (yellow), untested (red).',
      'Quantify revenue and cost blocks with real or estimated figures.',
      'Test the five riskiest assumptions before building detailed business plans.'
    ],
    quiz: [
      {
        id: 'bmc-1',
        question: 'Which block in the Business Model Canvas answers "how does the customer learn about, evaluate, buy, and receive our offer"?',
        options: ['Customer Relationships', 'Channels', 'Key Activities', 'Value Propositions'],
        correctAnswer: 1,
        explanation: 'Channels cover the five phases of customer touchpoints: awareness, evaluation, purchase, delivery, and after-sales support.'
      },
      {
        id: 'bmc-2',
        question: 'The Business Model Canvas was originally developed and published by:',
        options: ['Ash Maurya', 'Alexander Osterwalder and Yves Pigneur', 'Clayton Christensen', 'Tim Brown'],
        correctAnswer: 1,
        explanation: 'Osterwalder and Pigneur developed the framework based on doctoral research and published it in Business Model Generation (2010).'
      },
      {
        id: 'bmc-3',
        question: 'In a multi-sided platform business, what is the best technique to keep the canvas readable?',
        options: ['Draw only the paying side', 'Colour-code entries by customer segment', 'Leave Revenue Streams blank', 'Merge all segments into one collective box'],
        correctAnswer: 1,
        explanation: 'Color-coding entries by customer segment allows you to trace which value proposition, channel, and revenue stream serves which side.'
      },
      {
        id: 'bmc-4',
        question: 'How does a business model fundamentally differ from a business plan?',
        options: ['A business model is longer and more bureaucratic', 'The model describes the logic of value creation and capture, while the plan is the detailed operational projection', 'A business model covers only financial accounting', 'A business model is written exclusively for commercial banks'],
        correctAnswer: 1,
        explanation: 'The model is the conceptual architecture of how an enterprise creates and captures value; the business plan is the execution roadmap built on a validated model.'
      },
      {
        id: 'bmc-5',
        question: 'What is the most effective first step immediately after finishing a first draft of a Business Model Canvas?',
        options: ['Print it as a permanent poster for the office wall', 'Tag each entry as fact or assumption and design tests for the riskiest', 'Hire staff to execute all Key Activities', 'Immediately write a 40-page business plan'],
        correctAnswer: 1,
        explanation: 'A fresh canvas is entirely a set of unproven hypotheses. Tagging facts vs assumptions allows you to test the critical risks before spending capital.'
      }
    ]
  },
  {
    id: 'leancanvas',
    name: 'Lean Canvas',
    shortName: 'Lean Canvas',
    category: 'Business Model & Innovation',
    tagline: 'Capture a startup’s riskiest assumptions on one page before writing code',
    origin: 'Ash Maurya (Running Lean, 2010/2022; adapting Osterwalder’s BMC for Lean Startup).',
    corePurpose: 'To make a founding team write down its riskiest assumptions — problem, customer, solution — before writing code or spending capital on marketing.',
    primaryUsers: ['Startup founders & co-founders', 'Intrapreneurs', 'Incubator & accelerator teams', 'Hackathon participants', 'Product managers'],
    difficulty: 'Beginner',
    horizon: 'Idea / Validation stage',
    scope: 'Startup / New Product Venture',
    timeToResult: '20 minutes per draft',
    dataNeeds: 'Medium-High (interviews & experiments)',
    keyOutput: '9-block one-page problem-solution model + ranked riskiest assumptions',
    bestPairedWith: 'Takes input from JTBD, Design Thinking; Feeds customer interviews, MVP scope, pitch decks, BMC',
    keyFeatures: [
      'Replaces 4 operational BMC blocks with 4 risk blocks: Problem, Solution, Key Metrics, Unfair Advantage',
      'Existing Alternatives included directly inside the Problem block (the real competitors)',
      'Recommended 20-minute fill order starting from Customer Segments and Problem outward',
      'Forces single-sentence Unique Value Proposition (UVP) with high-level concept ("X for Y")',
      'Caps Solution at maximum 3 core features to prevent premature over-building'
    ],
    howItWorks: 'The founder completes the canvas in a strict sequence: 1. Customer Segments & Early Adopters, 2. Problem & Existing Alternatives, 3. UVP, 4. Solution (max 3 features), 5. Channels, 6. Revenue Streams, 7. Cost Structure, 8. Key Metrics, 9. Unfair Advantage. Assumptions are ranked by impact and uncertainty. The team conducts problem interviews, updates the canvas, runs solution interviews with pre-orders, and defines an MVP.',
    coreConcepts: [
      {
        term: 'Four Replaced Blocks',
        definition: 'Replaces Key Partners, Activities, Resources, and Customer Relationships with Problem, Solution, Key Metrics, and Unfair Advantage.'
      },
      {
        term: 'Existing Alternatives',
        definition: 'How customers solve the problem today—including spreadsheets, WhatsApp groups, or doing nothing. These are your true competitors.'
      },
      {
        term: 'Early Adopter',
        definition: 'The specific subset of a customer segment who feels the pain acutely today and is actively seeking a solution, willing to tolerate an imperfect v1.'
      },
      {
        term: 'Unfair Advantage',
        definition: 'Something that cannot easily be copied or bought by a competitor (insider access, network effects, personal authority, proprietary data). Often left blank initially.'
      },
      {
        term: 'Innovator’s Bias',
        definition: 'The fatal tendency of founders to fall in love with their technical solution before validating that the customer has an urgent, painful problem.'
      }
    ],
    strengths: [
      'Forces disciplined problem-first thinking before code or capital are spent',
      'Fast enough to draft one canvas per candidate customer segment in under 30 minutes',
      'Exposes the absence of a real metric or an unfair advantage early in the venture lifecycle'
    ],
    limitations: [
      'Oromits partner networks and supply-chain operations (which become vital once scaling)',
      'Easy to fill with clever guesses and fail to get out of the building to interview customers',
      'Less suited for established enterprises with complex multi-stakeholder approval chains'
    ],
    workflowPlacement: {
      upstream: 'Problem discovery (JTBD interviews, Design Thinking empathy sprints)',
      downstream: 'Customer interview scripts, MVP definition, pitch deck slides, traction dashboard, Business Model Canvas'
    },
    useCases: [
      {
        title: 'Two Engineering Graduates with App Idea',
        scenario: 'Building a hostel mess food-rating mobile app.',
        problem: 'Started coding app features before speaking to a single student.',
        howItHelps: 'Problem block forced them to articulate the actual student struggle. Existing alternatives were complaining on WhatsApp.',
        outcome: '20 problem interviews revealed the real issue was wasted meals; pivoted to a meal-opt-out app sold to hostel management.'
      },
      {
        title: 'Training Provider Launching AI Course',
        scenario: 'Curriculum completed; preparing marketing budget.',
        problem: 'No clarity on who the actual early adopter was.',
        howItHelps: 'Separate Lean Canvases for college students, working professionals, and SME owners revealed completely different price tolerances and pain points.',
        outcome: 'Working professionals selected as early adopters; pre-sold 40 seats before filming video lessons.'
      }
    ],
    caseStudy: {
      company: 'FarmLink Madurai',
      revenue: '₹69,000 MRR (from ₹0)',
      staff: '3 co-founders (agri graduate, developer, former fertilizer salesman), ₹6 lakh savings',
      profile: 'Early-stage agri-tech venture that built an advisory app with weather, crop calendars, and an AI chatbot.',
      challenge: 'After 4 months, 900 downloads and 40 weekly active users, zero users had paid. The founders argued whether to add features or lower price.',
      whyChosen: 'Incubator mentor ordered them to freeze coding and draft one Lean Canvas per candidate segment, then interview customers.',
      steps: [
        'Drafted 3 separate canvases: smallholder farmers, fertilizer dealers, and farmer producer organizations (FPOs)',
        'Ranked riskiest assumption: that any segment would actually pay for software advisory',
        'Ran 15 scripted problem interviews per segment over 3 weeks',
        'Finding: Farmers loved advice but would not pay; fertilizer dealers wanted to stop farmers defecting to online platforms and would happily pay',
        'Rewrote canvas with agri-dealers as customer; UVP: "Keep your farmers loyal with branded advisory under your dealership name"',
        'Priced at ₹1,500/month per dealer; trimmed solution from 9 features to 3; pre-sold 5 dealers on the spot'
      ],
      results: [
        'Signed 46 paying dealers at ₹1,500/mo, generating ₹69,000 monthly recurring revenue from zero',
        '90-day dealer retention reached 78%',
        'Each dealer connected ~110 farmers, reaching over 5,000 farmers through the dealer channel',
        '60% of planned app features were permanently scrapped, saving 6 months of burn'
      ],
      lessonsLearned: [
        'Separating "user" (farmer) from "paying customer" (dealer) was the existential turning point',
        'Existing alternatives (informal dealer verbal advice, WhatsApp groups) revealed true competition',
        'The Unfair Advantage block remained blank for 5 months until they realized the co-founder’s 12 years of dealer relationships was the moat'
      ]
    },
    implementationGuide: {
      prerequisites: ['Founding team with authority to pivot the product', 'Designated interviewer and note-taker', 'Access to 10-20 target customers', 'Mentor to challenge assumptions'],
      steps: [
        'Draft one canvas per candidate customer segment (time-box to 20 minutes each)',
        'Fill Problem before Solution; list existing alternatives honestly (including doing nothing)',
        'Formulate UVP as a single sentence a customer would repeat, with a high-level concept',
        'Limit Solution to maximum 3 features',
        'Rank assumptions by impact and uncertainty; select the top 3',
        'Run 10-20 structured problem interviews; never pitch the solution during problem discovery',
        'Update canvas; drop segments where problem is mild',
        'Run solution interviews with a clickable prototype; ask for financial commitment',
        'Define MVP, instrument 2 Key Metrics, and launch'
      ],
      checklist: [
        'One canvas per customer segment, dated and versioned',
        'Problem block has <= 3 problems with existing alternatives',
        'Solution block has <= 3 features',
        'Riskiest assumptions ranked with tests',
        'Problem interview script written',
        'Key Metrics defined (retention and revenue, not vanity)'
      ],
      commonMistakes: [
        { mistake: 'Filling Solution first', fix: 'Cover the Solution block until Customer Segments and Problems are evidenced' },
        { mistake: 'Writing "No Competition"', fix: 'Existing alternatives always include current messy workarounds, spreadsheets, or inertia' },
        { mistake: 'Confusing user with customer', fix: 'The customer is the person who pays the invoice; name both user and payer' },
        { mistake: 'Tracking vanity metrics (downloads, page views)', fix: 'Choose actionable metrics tied to retention or revenue (e.g. repeat orders, 90-day retention)' }
      ],
      plan306090: {
        d30: 'Draft canvases, rank assumptions, complete 20 problem interviews, update canvas.',
        d60: 'Conduct solution interviews, secure pre-commitments, build minimum viable product.',
        d90: 'Launch MVP to early adopters, measure key metrics, make persevere/pivot decision.'
      },
      proTips: [
        'Write the canvas individually first, then compare; differences reveal hidden founder disagreements.',
        'Name a specific real human as the early adopter ("Someone like Priya running a 500-farmer shop").',
        'Ask for commitment at the end of solution interviews: verbal interest is free, money and time are evidence.'
      ]
    },
    whenNotToUse: [
      { alternative: 'Business Model Canvas', reason: 'Choose BMC once the venture has validated problem-solution fit and needs to design key partnerships, resources, and operating infrastructure.' },
      { alternative: 'Value Proposition Canvas', reason: 'Choose VPC when the customer segment is fixed and you need to deeply map customer pains/gains to product features.' }
    ],
    reflectionPrompts: [
      'Which of your current initiatives has a Solution designed before the customer Problem was validated?',
      'Who is the user and who is the paying customer for your product, and are they the same entity?',
      'What is the single operational number that, if it doubled, would prove your business model is working?'
    ],
    quickReferenceCard: [
      'Use when: Pre-revenue startup or new product idea where customer, problem, and solution are uncertain.',
      'Fill Segments & Problem first; Solution last among top blocks.',
      'One canvas per segment; 20 minutes per draft; version everything.',
      'Rank assumptions: test problem existence before writing code.',
      'Key Metrics: Measure retention and revenue, never vanity.'
    ],
    quiz: [
      {
        id: 'lean-1',
        question: 'Which four blocks does the Lean Canvas introduce in place of four Business Model Canvas blocks?',
        options: [
          'Problem, Solution, Key Metrics, Unfair Advantage',
          'Key Partners, Key Resources, Key Activities, Customer Relationships',
          'Mission, Vision, Values, Long-term Goals',
          'Market Size, Product Features, Pricing Tiers, Promotion'
        ],
        correctAnswer: 0,
        explanation: 'Ash Maurya replaced Key Partners, Activities, Resources, and Relationships with Problem, Solution, Key Metrics, and Unfair Advantage to focus on startup risk.'
      },
      {
        id: 'lean-2',
        question: 'What is the recommended sequence when filling out a Lean Canvas for the first time?',
        options: [
          'Solution first, then Revenue Streams',
          'Revenue Streams first, then Cost Structure',
          'Customer Segments and Problem first, Solution later',
          'Unfair Advantage first, then Channels'
        ],
        correctAnswer: 2,
        explanation: 'Filling Customer Segments and Problem first counters innovator’s bias, ensuring the solution is designed specifically to address validated pain.'
      },
      {
        id: 'lean-3',
        question: 'What should be documented under "Existing Alternatives" on a Lean Canvas?',
        options: [
          'Only direct venture-funded software competitors',
          'How customers solve the problem today, including manual workarounds or doing nothing',
          'Only large enterprise legacy software vendors',
          'Patented intellectual property in the sector'
        ],
        correctAnswer: 1,
        explanation: 'The customer’s real competitor is often a spreadsheet, a WhatsApp group, an informal habit, or total inaction.'
      },
      {
        id: 'lean-4',
        question: 'Which of the following represents an effective Key Metric for an early-stage startup?',
        options: [
          'Cumulative mobile app downloads',
          'Total social media follower count',
          'Paying customers retained after 90 days',
          'Number of press and media mentions'
        ],
        correctAnswer: 2,
        explanation: '90-day retention of paying customers proves genuine product-market traction, whereas downloads and followers are vanity metrics.'
      },
      {
        id: 'lean-5',
        question: 'Who created the Lean Canvas framework?',
        options: ['Eric Ries', 'Steve Blank', 'Ash Maurya', 'Alexander Osterwalder'],
        correctAnswer: 2,
        explanation: 'Ash Maurya created the Lean Canvas in 2010, synthesizing Osterwalder’s canvas with Lean Startup customer development.'
      }
    ]
  },
  {
    id: 'vpc',
    name: 'Value Proposition Canvas (VPC)',
    shortName: 'Value Proposition Canvas',
    category: 'Business Model & Innovation',
    tagline: 'Fit what you offer to what a specific customer segment actually needs',
    origin: 'Alexander Osterwalder, Yves Pigneur, Greg Bernarda & Alan Smith (Value Proposition Design, 2014).',
    corePurpose: 'To stop teams from describing their product and start describing their customer, making the match between the two explicit, visual, and testable.',
    primaryUsers: ['Product managers', 'Founders', 'PMM & marketing teams', 'Enterprise sales leads', 'Service designers'],
    difficulty: 'Beginner-Intermediate',
    horizon: 'Discovery & Product Design',
    scope: 'One Customer Segment + One Offer',
    timeToResult: '1 to 3 weeks (with customer interviews)',
    dataNeeds: 'High (direct customer interviews)',
    keyOutput: 'Customer Profile (Jobs, Pains, Gains) + Value Map + Fit Check matrix',
    bestPairedWith: 'Takes input from JTBD; Feeds Lean Canvas/BMC blocks 1-2, positioning, ad copy, feature backlogs',
    keyFeatures: [
      'Two halves on one page: Customer Profile (circle) and Value Map (square)',
      'Customer Profile maps Functional, Social, Emotional, and Supporting Jobs, plus Pains and Gains',
      'Value Map maps Products & Services, Pain Relievers, and Gain Creators',
      'Explicit Fit Check: identifies unaddressed high-priority pains and features that create zero value (candidates for removal)',
      'Test Cards & Learning Cards for validating hypotheses with real metrics'
    ],
    howItWorks: 'The team selects one segment and completes the Customer Profile first based on research: jobs to be done, frustrations/risks (pains), and desired outcomes (gains). Items are ranked by severity and relevance. Next, the team completes the Value Map: products/services, pain relievers, and gain creators. Finally, the two sides are matched in a Fit Check to ensure every top pain/gain is addressed, and unmapped features are considered for removal.',
    coreConcepts: [
      {
        term: 'Customer Profile (Right Circle)',
        definition: 'Customer Jobs (what they are trying to get done), Pains (annoyances, obstacles, risks), and Gains (desired outcomes, benefits, delights).'
      },
      {
        term: 'Value Map (Left Square)',
        definition: 'Products & Services (the bundle offered), Pain Relievers (how you kill specific pains), and Gain Creators (how you produce specific outcomes).'
      },
      {
        term: 'Three Levels of Fit',
        definition: '1. Problem-Solution Fit (evidence that customers care on paper); 2. Product-Market Fit (evidence they buy and use at scale); 3. Business-Model Fit (profitable and scalable).'
      },
      {
        term: 'Feature Deprecation Candidate',
        definition: 'A product feature that maps to no ranked customer pain or gain. It adds engineering complexity and cost without increasing customer willingness to pay.'
      }
    ],
    strengths: [
      'Forces the team to write the customer side before touching the product side',
      'Exposes over-engineering: reveals expensive features that solve no meaningful pain',
      'Provides marketing and sales with authentic customer language for ad copy and pitches'
    ],
    limitations: [
      'Easy to invent the Customer Profile in a conference room without speaking to users (produces fiction)',
      'Does not cover pricing, distribution channels, partners, or unit economics',
      'In B2B, every buying-centre role (user, procurement, security approver) requires a separate canvas'
    ],
    workflowPlacement: {
      upstream: 'Discovery research (JTBD switch interviews, Design Thinking empathy, win/loss reviews)',
      downstream: 'Lean Canvas / BMC, product backlog feature prioritization, landing page copy, sales enablement'
    },
    useCases: [
      {
        title: 'College Placement Training Provider',
        scenario: 'Selling aptitude training packages to engineering colleges.',
        problem: 'Renewals were plummeting; sales pitch listed syllabus modules.',
        howItHelps: 'Profile for the college placement officer showed the functional job was "Hit the placement percentage promised to management", pain was "Students fail first-round aptitude screening", gain was "A reportable number for the principal".',
        outcome: 'Repositioned training as "First-Round Screening Pass-Rate Improvement" with quarterly reports; contract renewals doubled.'
      },
      {
        title: 'Fintech App for Gig Workers',
        scenario: 'Developing a personal budgeting tool for delivery drivers.',
        problem: 'User engagement was near zero.',
        howItHelps: 'Interviews revealed the core job was not "budgeting", but "smooth out irregular daily income so I can pay rent on the 1st".',
        outcome: 'Scrapped budgeting charts; launched an income-smoothing emergency rent reserve wallet.'
      }
    ],
    caseStudy: {
      company: 'Kodai Fresh',
      revenue: '₹1.8 Crore',
      staff: '14 staff, 1,100 active subscribers, organic farm vegetable boxes in Coimbatore',
      profile: 'Direct-to-consumer vegetable subscription sourcing fresh produce from hill farms.',
      challenge: 'Monthly subscriber churn climbed to 11%. The team believed customers were bored and wanted more variety, planning to add 30 exotic SKUs.',
      whyChosen: 'Needed to pinpoint the exact fit between their vegetable box offering and subscriber lifestyle, without building complex models.',
      steps: [
        'Targeted core segment: Dual-income families with young children (60% of subscribers, 70% of churn)',
        'Conducted 20 in-depth interviews with current, churned, and non-subscribing families; analyzed 6 months of customer support tickets',
        'Customer Profile: Top jobs were "Put healthy meal on table on weeknights without grocery run" and "Feel like a responsible parent"; top pains: "Box arrives with vegetables I don’t know how to cook", "Food waste when work is busy", "Unpredictable delivery time"',
        'Value Map check: Current offer had doorstep delivery and farm story, but zero solutions for weeknight cooking anxiety or delivery predictability. "Variety" appeared nowhere in customer pains!',
        'Redesigned Value Map: "Family Weeknight Box" with 5 staple vegetables + 1 seasonal item with step-by-step recipe card; in-app pause-and-skip button; guaranteed 2-hour evening delivery slot',
        'Piloted with 150 families for 8 weeks'
      ],
      results: [
        'Monthly churn in the segment dropped from 11% to 5%',
        'Pause-and-skip feature cut cancellations by 30% (customers paused temporarily instead of terminating subscription)',
        'Vegetables bundled with recipe cards had 2.4x higher repeat satisfaction',
        'Cancelled the 30-item SKU expansion, slashing procurement complexity and refrigeration waste',
        'Annual revenue grew 19% with zero increase in marketing customer-acquisition spend'
      ],
      lessonsLearned: [
        'The team’s original assumption (variety) came from vocal outliers, not from ranked segment data',
        'Emotional jobs ("Feel like a good parent") drove subscription renewals more than the physical produce itself',
        'Interviews with churned customers provided the decisive strategic insights'
      ]
    },
    implementationGuide: {
      prerequisites: ['Explicitly defined customer segment', 'Interviewer with 10-20 customer access', 'Cross-functional product/marketing team', 'Facilitator to enforce customer phrasing'],
      steps: [
        'Write one-line persona description for the segment',
        'Review existing evidence (churn exit notes, customer reviews, support tickets)',
        'Conduct 10-20 open-ended interviews focusing on jobs, obstacles, and desired outcomes',
        'Build Customer Profile: write jobs, pains, and gains in the customer’s exact words',
        'Rank jobs by importance, pains by severity, and gains by relevance',
        'List products and services on the Value Map',
        'Map specific Pain Relievers and Gain Creators to profile items',
        'Conduct the Fit Check: flag unaddressed pains (gaps) and unmapped features (waste)',
        'Redesign Value Map, formulate Test Cards with numeric criteria, and pilot'
      ],
      checklist: [
        'One segment per canvas',
        'Customer Profile completed before Value Map',
        'Pains written as customer experiences, not absence of your features',
        'Jobs, pains, and gains ranked by severity/importance',
        'Unaddressed pains identified and prioritized',
        'Value proposition summary statement drafted'
      ],
      commonMistakes: [
        { mistake: 'Writing the Value Map first', fix: 'Cover the product side until the customer profile is fully evidenced and ranked' },
        { mistake: 'Describing pains as lack of your feature ("No dashboard")', fix: 'Describe the real operational pain ("Cannot identify which students are failing")' },
        { mistake: 'Listing 25 jobs without ranking', fix: 'Force ranking to isolate the top 3-5 jobs that drive purchasing decisions' },
        { mistake: 'Stopping at paper fit', fix: 'Write test cards and run live pilots to validate product-market fit' }
      ],
      plan306090: {
        d30: 'Select segment, complete 15 interviews, build profile, map current offer, run fit check.',
        d60: 'Redesign value map, write test cards, run 8-week pilot with target customer cohort.',
        d90: 'Evaluate pilot metrics, update positioning and sales scripts, prune unmapped features.'
      },
      proTips: [
        'Record customer quotes verbatim: their phrasing should directly become your ad copy and landing page headlines.',
        'Always interview churned customers; they reveal the dealbreakers loyal customers have learned to tolerate.',
        'Use different colored sticky notes for interview-backed facts versus internal team hypotheses.'
      ]
    },
    whenNotToUse: [
      { alternative: 'Outcome-Driven JTBD', reason: 'Choose Ulwick’s ODI when you need a rigorous mathematical survey of 50-100 outcome statements across an entire market.' },
      { alternative: 'Lean Canvas', reason: 'Choose Lean Canvas when the entire business model (channels, revenue, costs) is still unvalidated.' }
    ],
    reflectionPrompts: [
      'What is the #1 ranked pain of your core customer segment, and does your product address it directly?',
      'Which product feature does your engineering team love that no customer has ever mentioned in a review?',
      'When did an executive in your company last sit down with a customer who cancelled their contract?'
    ],
    quickReferenceCard: [
      'Use when: Designing, repositioning, or fixing churn for a specific customer segment.',
      'Customer Profile (Jobs, Pains, Gains) first; Value Map (Products, Relievers, Creators) second.',
      'Rank items by importance and severity; write in the customer’s vocabulary.',
      'Run Fit Check: address top pains; prune unmapped features.',
      'Validate with Test Cards before writing code or expanding SKUs.'
    ],
    quiz: [
      {
        id: 'vpc-1',
        question: 'The right-hand side of the Value Proposition Canvas represents the:',
        options: ['Value Map', 'Customer Profile', 'Business Model', 'Strategy Canvas'],
        correctAnswer: 1,
        explanation: 'The circle on the right is the Customer Profile, capturing jobs, pains, and gains.'
      },
      {
        id: 'vpc-2',
        question: '"Looking competent and proactive in front of my senior executive" is which category of customer job?',
        options: ['Functional Job', 'Social Job', 'Supporting Job', 'Financial Job'],
        correctAnswer: 1,
        explanation: 'Social jobs describe how the customer wants to be perceived by peers, superiors, or clients.'
      },
      {
        id: 'vpc-3',
        question: 'When completing the Value Proposition Canvas, which side should be completed first?',
        options: ['Products and Services', 'Pain Relievers', 'Customer Profile (Jobs, Pains, Gains)', 'Gain Creators'],
        correctAnswer: 2,
        explanation: 'The Customer Profile must always be completed first from research to prevent designing features around internal assumptions.'
      },
      {
        id: 'vpc-4',
        question: 'During a Fit Check, a product feature that relieves no ranked pain and creates no ranked gain should be:',
        options: [
          'Promoted with heavier marketing spend',
          'Considered for removal or deprecation to cut complexity',
          'Priced higher as an optional add-on',
          'Moved into the Customer Profile'
        ],
        correctAnswer: 1,
        explanation: 'Features that solve no customer pain and create no gain add technical overhead without generating willingness to pay, making them removal candidates.'
      },
      {
        id: 'vpc-5',
        question: 'In Value Proposition Design, "Problem-Solution Fit" is achieved when:',
        options: [
          'The entire business is demonstrably profitable at scale',
          'Customers confirm on paper and in interviews that the value map addresses their top pains and gains',
          'The product has scaled to 100,000 active users',
          'All 9 blocks of a Business Model Canvas are filled'
        ],
        correctAnswer: 1,
        explanation: 'Problem-solution fit occurs when evidence confirms that customers care about your jobs, pains, and gains, and that your proposed value map matches them.'
      }
    ]
  },
  {
    id: 'designthinking',
    name: 'Design Thinking',
    shortName: 'Design Thinking',
    category: 'Business Model & Innovation',
    tagline: 'Solve complex problems by empathising, defining, ideating, prototyping and testing with users',
    origin: 'Codified by IDEO (David Kelley, Tim Brown) and Stanford d.school (2005); UK Design Council Double Diamond (2005).',
    corePurpose: 'To ensure teams solve problems that matter to real humans in a way they will eagerly adopt, learning through low-cost prototypes rather than months of boardroom debates.',
    primaryUsers: ['Product & UX designers', 'Service innovation teams', 'Founders', 'Operations & process engineers', 'Educators'],
    difficulty: 'Intermediate',
    horizon: 'Discovery & Prototyping (5-day sprints to 6-week projects)',
    scope: 'A Specific User Problem / Service Experience',
    timeToResult: '5-day sprint (tested prototype)',
    dataNeeds: 'Very High (field observation & user tests)',
    keyOutput: 'Problem Statement (POV), "How Might We" (HMW) questions, tested low-fidelity prototypes, feedback grid',
    bestPairedWith: 'Takes input from PESTLE, market signals, JTBD; Feeds Value Proposition Canvas, Lean Canvas, agile development',
    keyFeatures: [
      'Five iterative stages: Empathise, Define, Ideate, Prototype, Test (with fluid backward loops)',
      'Alternates divergent thinking (generating possibilities) with convergent thinking (selecting focus)',
      'Empathy methods: Contextual shadowing, user interviews, journey mapping, "day-in-the-life" immersion',
      'Point-of-View (POV) reframing into actionable "How Might We..." (HMW) challenge questions',
      'Prototype Fidelity Ladder: from paper sketches and role-play (hours) to interactive clickable mocks (days)'
    ],
    howItWorks: 'A cross-functional team tackles an ill-defined challenge. In Empathise, they observe users in context. In Define, they synthesize journey maps into a Point-of-View statement ("[User] needs [need] because [insight]") and generate HMW questions. In Ideate, they generate 50-100 ideas with deferred judgment. In Prototype, they build the cheapest testable version in hours. In Test, they observe users interact, capturing feedback in a 4-quadrant grid (+ worked, - did not, ? questions, 💡 new ideas).',
    coreConcepts: [
      {
        term: 'Five Stages of d.school',
        definition: 'Empathise (observe users), Define (frame the problem), Ideate (generate solutions), Prototype (build to think), Test (learn from users).'
      },
      {
        term: 'Point-of-View (POV) Statement',
        definition: 'A synthesis formula: "[User] needs [specific need] because [surprising insight discovered during empathy]".'
      },
      {
        term: 'How Might We (HMW)',
        definition: 'A question format that translates an insight into an open creative springboard without prematurely prescribing a technical solution.'
      },
      {
        term: 'Prototype Fidelity Ladder',
        definition: 'Level 1: Sketch/storyboard (minutes); Level 2: Paper mock-up/role-play (hours); Level 3: Clickable digital mock (1 day); Level 4: Live pilot (weeks). Test at lowest level possible.'
      },
      {
        term: 'Three Lenses of Human-Centred Design',
        definition: 'Desirability (do people want it?), Feasibility (can we build it technically?), and Viability (is it financially sustainable?).'
      }
    ],
    strengths: [
      'Grounds solutions in observed human behavior rather than executive opinions',
      'Radically cheap failure: paper prototypes cost hours, preventing costly software development disasters',
      'Breaks corporate silos by uniting engineering, sales, and design in shared empathy'
    ],
    limitations: [
      'Often reduced to a feel-good sticky-note workshop where the rigorous Test stage is skipped',
      'Can over-index on Desirability while neglecting unit economics and business Viability',
      'Requires skilled facilitation to avoid shallow obvious ideas and confirmation bias'
    ],
    workflowPlacement: {
      upstream: 'Open problem brief, service breakdown, JTBD switch interviews',
      downstream: 'Value Proposition Canvas (formalizing the winning concept), Lean Canvas / BMC, sprint delivery'
    },
    useCases: [
      {
        title: 'Government Skilling Centre Dropout Crisis',
        scenario: '45% of enrolled rural vocational trainees dropped out before course completion.',
        problem: 'Management assumed students lacked motivation.',
        howItHelps: 'Shadowing revealed trainees lost daily agricultural wages and spent 3 hours traveling on buses.',
        outcome: 'Prototyped a split-shift evening schedule with a travel stipend; course completion rose to 78%.'
      },
      {
        title: 'Hospital Outpatient Waiting Queues',
        scenario: 'Patients constantly complained about 2-hour waits in overcrowded waiting rooms.',
        problem: 'Installing digital token display screens failed to reduce complaints.',
        howItHelps: 'Journey mapping showed the true pain was uncertainty, not duration—patients feared missing their turn if they stepped out for tea or prayer.',
        outcome: 'Prototyped an SMS call-back alert with estimated consultation times, letting patients wait outside; complaints halved.'
      }
    ],
    caseStudy: {
      company: 'Pandian Transport',
      revenue: '₹55 Crore',
      staff: '400 staff, 60 intercity buses operating Madurai–Chennai & Bengaluru corridors',
      profile: 'Established regional private bus operator facing slipping customer ratings.',
      challenge: 'Customer ratings had fallen to 3.4/5.0 with complaints concentrated around "night boarding" and "lost luggage". The operations head wanted to buy ₹6 Crore of new luxury buses; the marketing head demanded ticket discounts.',
      whyChosen: 'The issue was an experiential service breakdown; management had never observed a night departure in the field.',
      steps: [
        'Day 1 (Empathise): 8 staff in pairs rode buses at midnight, observed 3 boarding points, and interviewed 40 passengers in transit',
        'Day 2 (Define): Journey map revealed passengers experienced peak terror finding unmarked boarding points in the dark and worrying the bus had already left. POV: "A first-time passenger travelling at night needs to know where to stand and that the bus will wait, because fear of missing the bus is worse than the journey." Drafted HMW questions',
        'Day 3 (Ideate): Generated 110 ideas; clustered into wayfinding, communication, and luggage; dot-voted to top 4',
        'Day 4 (Prototype): Built in 1 day using paper and WhatsApp: Automated WhatsApp message with driver photo and live location pin; numbered luggage tag matching seat number; illuminated boarding sign; conductor greeting script',
        'Day 5 (Test): Tested with 90 passengers across 2 evening departures; captured feedback grid'
      ],
      results: [
        'Average customer rating recovered from 3.4 to 4.1 within 4 months',
        'Boarding-related customer complaints plummeted 70%; luggage complaints dropped 55%',
        'Total implementation cost was under ₹4 lakh, allowing the company to defer the ₹6 Crore bus-purchase proposal',
        'Repeat ticket bookings on the Madurai–Chennai route increased 12%'
      ],
      lessonsLearned: [
        'The true problem (fear of being stranded at night) was invisible from the corporate boardroom',
        'Prototypes built in hours with cardboard and WhatsApp resolved disputes faster than months of committee debates',
        'Involving bus conductors in the sprint ensured the new procedures were embraced on the ground with zero friction'
      ]
    },
    implementationGuide: {
      prerequisites: ['Sponsor committed to piloting tested concepts', 'Trained facilitator', 'Cross-functional team of 5-8 (including frontline staff)', 'Recruited users for interviews and testing'],
      steps: [
        'Frame challenge as a "How Might We..." question, not a pre-conceived solution',
        'Time-box the sprint (5 days recommended)',
        'Recruit 10-20 users for empathy interviews and 5-8 users for prototype testing',
        'Empathise: Conduct field observations in pairs; capture verbatim quotes and photos',
        'Synthesise: Construct journey map, identify emotional valleys, write POV statement',
        'Ideate: Set idea quota (50+), enforce brainstorm rules (defer judgment, build on ideas)',
        'Select concepts against Desirability, Feasibility, Viability lenses',
        'Build low-fidelity prototypes (cap construction at 1 day)',
        'Test with users using Feedback Capture Grid (+, -, ?, 💡); do not defend the prototype',
        'Hold sponsor decision meeting: iterate, pivot, or proceed to operational pilot'
      ],
      checklist: [
        'Challenge framed as HMW question',
        'External users recruited for both empathy and testing',
        'Frontline staff included on the sprint team',
        'POV statement contains a non-obvious human insight',
        'Low-fidelity prototype built in <= 1 day',
        'Feedback capture grid documented during tests'
      ],
      commonMistakes: [
        { mistake: 'Starting with a solution in mind ("Design an app")', fix: 'Reframe as a user question ("How might we reduce boarding anxiety?")' },
        { mistake: 'Interviewing internal colleagues instead of real users', fix: 'Mandate direct contact with external customers in their actual environment' },
        { mistake: 'Skipping the Test stage after a great ideation session', fix: 'Book test users on Day 1 of the sprint so testing is non-negotiable' },
        { mistake: 'Building high-fidelity software prototypes too early', fix: 'Use paper, storyboards, and roleplay—test at the lowest fidelity that yields learning' }
      ],
      plan306090: {
        d30: 'Run first 5-day sprint on a focused challenge; deliver tested prototype to sponsor.',
        d60: 'Launch live Level 4 pilot; conduct second sprint on an adjacent customer friction point.',
        d90: 'Evaluate pilot metrics; establish standing quarterly design sprint cadence; train facilitators.'
      },
      proTips: [
        'Interview in pairs: one person maintains eye contact and probes, the other records body language and verbatim quotes.',
        'Include the executive sponsor in at least one empathy interview—it permanently transforms how they weigh user evidence.',
        'Set an idea quota (aim for 100): conventional ideas surface first; true breakthroughs emerge after item 40.'
      ]
    },
    whenNotToUse: [
      { alternative: 'Jobs To Be Done', reason: 'Choose JTBD when you need a structured, quantitative analysis of customer outcome metrics rather than an open-ended creative sprint.' },
      { alternative: 'Lean Process / Six Sigma', reason: 'Choose Lean/Six Sigma for well-defined mechanical or manufacturing workflows where the goal is variance reduction, not problem reframing.' }
    ],
    reflectionPrompts: [
      'When did your leadership team last watch a live customer struggle with your product in person?',
      'Which recent corporate decision committed budget to a solution before the underlying problem was understood?',
      'What is the cheapest cardboard or paper prototype you could build this afternoon for your team’s longest-debated idea?'
    ],
    quickReferenceCard: [
      'Use when: The problem is ill-defined, customer-facing, and previous fixes have failed.',
      'Empathise -> Define -> Ideate -> Prototype -> Test (loop back freely).',
      'Frame challenge as "How Might We..." without prescribing the technology.',
      'Build prototypes in hours; test with 5-8 external users.',
      'Check Desirability, Feasibility, and Viability before committing capital.'
    ],
    quiz: [
      {
        id: 'dt-1',
        question: 'What are the five stages of the Stanford d.school Design Thinking model?',
        options: [
          'Plan, Build, Test, Launch, Review',
          'Empathise, Define, Ideate, Prototype, Test',
          'Discover, Design, Develop, Deploy, Debug',
          'Research, Strategy, Design, Marketing, Sales'
        ],
        correctAnswer: 1,
        explanation: 'The d.school model comprises Empathise, Define, Ideate, Prototype, and Test.'
      },
      {
        id: 'dt-2',
        question: 'In which stage of Design Thinking are "How Might We" (HMW) questions formulated?',
        options: ['Empathise', 'Define', 'Prototype', 'Test'],
        correctAnswer: 1,
        explanation: 'HMW questions are drafted in the Define stage to translate synthesised user insights into actionable creative springboards.'
      },
      {
        id: 'dt-3',
        question: 'What is the primary objective of creating low-fidelity prototypes in Design Thinking?',
        options: [
          'To impress the executive sponsor with visual polish',
          'To learn cheaply and quickly from user interaction before committing capital',
          'To replace the production engineering process',
          'To document comprehensive functional software specifications'
        ],
        correctAnswer: 1,
        explanation: 'Low-fidelity prototypes exist to test specific hypotheses rapidly with users at minimal cost, allowing teams to fail and iterate early.'
      },
      {
        id: 'dt-4',
        question: 'Which stage of Design Thinking is most frequently neglected or skipped in corporate practice?',
        options: ['Empathise', 'Ideate', 'Prototype', 'Test'],
        correctAnswer: 3,
        explanation: 'Teams frequently celebrate generating ideas or demoing a prototype, but fail to put it in front of real users to test whether it solves the problem.'
      },
      {
        id: 'dt-5',
        question: 'The renowned "Double Diamond" innovation model was introduced by which institution?',
        options: ['IDEO', 'Stanford d.school', 'UK Design Council', 'Google Ventures'],
        correctAnswer: 2,
        explanation: 'The UK Design Council introduced the Double Diamond (Discover, Define, Develop, Deliver) in 2005.'
      }
    ]
  },
  {
    id: 'jtbd',
    name: 'Jobs To Be Done (JTBD)',
    shortName: 'Jobs To Be Done',
    category: 'Business Model & Innovation',
    tagline: 'Understand the progress customers are trying to make when they "hire" a product',
    origin: 'Clayton Christensen (The Innovator’s Solution, 2003; Competing Against Luck, 2016), Tony Ulwick (ODI), Bob Moesta (Four Forces).',
    corePurpose: 'To shift the unit of analysis from customer demographics or product features to the progress the customer wants to achieve, ensuring innovation targets unmet outcomes.',
    primaryUsers: ['Product managers & strategists', 'PMM & positioning teams', 'Founders', 'UX researchers', 'R&D leaders'],
    difficulty: 'Intermediate-Advanced',
    horizon: 'Customer motivation & Market positioning',
    scope: 'A Customer Job & Its Circumstance',
    timeToResult: '2 to 6 weeks',
    dataNeeds: 'Very High (switch interviews & outcome surveys)',
    keyOutput: 'Job Statement, 8-Step Job Map, Four Forces of Progress diagram, Opportunity Scores',
    bestPairedWith: 'Feeds Value Proposition Canvas, Design Thinking Define stage, Lean Canvas Problem block, Blue Ocean Strategy',
    keyFeatures: [
      'Core idea: Customers don’t buy products; they "hire" them to make progress in a specific struggling circumstance',
      'Universal Job Statement formula: Verb + Object of the verb + Contextual clarifier (free of solution words)',
      'Universal 8-Step Job Map: Define, Locate, Prepare, Confirm, Execute, Monitor, Modify, Conclude',
      'The Four Forces of Progress: Push of current situation, Pull of new solution, Anxiety of the new, Habit of the present',
      'Opportunity Scoring: Opportunity = Importance + (Importance - Satisfaction); scores > 12 mark high-potential unmet needs'
    ],
    howItWorks: 'The team interviews recent buyers or switchers using Switch Interviews to retrace their decision timeline from the first thought to consumption. They map the Four Forces (Push, Pull, Anxiety, Habit) that drove or delayed the purchase. For quantitative rigor, they map the 8-step functional job, formulate desired outcome statements ("Minimise the time it takes to..."), survey 100+ customers on Importance and Satisfaction, and calculate Opportunity Scores to guide product roadmaps.',
    coreConcepts: [
      {
        term: 'The Job',
        definition: 'The fundamental progress an individual is trying to accomplish in a specific circumstance. Jobs are stable over decades, whereas products come and go.'
      },
      {
        term: 'Job Statement Structure',
        definition: 'Must follow: Verb + Object + Context (e.g. "Prepare final-year students for campus placements before recruitment season starts"). Never include solutions or adjectives.'
      },
      {
        term: 'Four Forces of Progress',
        definition: 'Push (frustration with the current status quo) and Pull (attraction to the new possibility) move toward change. Anxiety (fear of the unknown) and Habit (inertia) hold the customer back.'
      },
      {
        term: 'Struggling Moment',
        definition: 'The specific friction event or breakdown that creates the demand for a new solution and causes the customer to begin searching.'
      },
      {
        term: 'Non-Consumption',
        definition: 'Individuals who face the struggling circumstance but currently hire nothing because existing market offerings are too costly or complex. Often the largest market.'
      }
    ],
    strengths: [
      'Uncovers enduring human needs that outlast fluctuating technology trends',
      'Reveals non-obvious competitors from outside the industry (e.g. Netflix competing with sleep, milkshakes competing with bananas)',
      'Produces measurable, solution-free outcome statements that align product engineering with marketing'
    ],
    limitations: [
      'Requires skilled interview technique; unskilled interviewers elicit stated feature requests rather than underlying motivations',
      'Full quantitative outcome-driven surveys are expensive and require rigorous statistical discipline',
      'Defines what the customer wants to achieve, but does not design the technical solution itself'
    ],
    workflowPlacement: {
      upstream: 'Market entry decisions, feature prioritization disputes, rising customer churn',
      downstream: 'Value Proposition Canvas, Design Thinking Define phase, Lean Canvas Problem block, product roadmaps, positioning copy'
    },
    useCases: [
      {
        title: 'Coaching Institute Losing Students',
        scenario: 'Students drifting to online ed-tech platforms.',
        problem: 'Management assumed students wanted cheaper discounts; price cuts failed to halt churn.',
        howItHelps: 'Switch interviews revealed the job was "Stay disciplined for 10 months without parents nagging". The struggling moment was missing a class due to illness and falling hopelessly behind.',
        outcome: 'Added recorded make-up classes and a weekly personal accountability call; student churn dropped by half.'
      },
      {
        title: 'Fintech MSME Merchant Lender',
        scenario: 'Working capital loan product had low repeat borrowing.',
        problem: 'Lending team assumed the interest rate was too high.',
        howItHelps: 'The job was "Restock shop inventory before the Diwali festival rush without begging wholesalers for credit". The primary outcome was "Minimise time from request to cash in hand".',
        outcome: 'Introduced 1-click pre-approved top-ups timed to festival stocking windows; repeat borrowing doubled despite unchanged interest rates.'
      }
    ],
    caseStudy: {
      company: 'Meenakshi Home Appliances',
      revenue: '₹38 Crore',
      staff: '150 staff, water purifier brand with 300 dealer showrooms in Tamil Nadu',
      profile: 'Regional manufacturer selling residential reverse-osmosis purifiers with an attached Annual Maintenance Contract (AMC) service.',
      challenge: 'AMC service contract renewal rates plummeted from 70% to 48% over 3 years. Management tried reminder calls and 10% price discounts with zero effect.',
      whyChosen: 'Needed to understand the actual decision customers made when their service expired, and why they were hiring local independent technicians instead.',
      steps: [
        'Conducted 30 switch interviews across 3 cohorts: renewed customers, lapsed customers, and switchers to local mechanics',
        'Mapped the decision timeline: first thought -> passive notice -> trigger event -> active search -> decision -> consumption',
        'Mapped the Four Forces: Push (missed service reminders, unpunctual visits); Pull (local mechanic arrives within 2 hours); Anxiety (fear of fake filter cartridges, stranger entering home); Habit (loyalty to brand)',
        'Core Job defined: "Keep my family’s drinking water safe without having to think about it or chase technicians"',
        'Drafted 40 desired outcome statements along the 8-step job map; surveyed 200 customers',
        'Top unmet outcomes: "Minimise likelihood of being unaware a filter is due" and "Minimise likelihood of an unverified technician arriving at my home"'
      ],
      results: [
        'AMC renewal rate rebounded from 48% to 66% within 12 months',
        'Rebranded AMC as the "Safe Water Plan": dispatched replacement filters automatically with a photo and verification of the assigned technician',
        'Increased subscription price by 8% with zero churn impact',
        'Customer switching to unorganized independent mechanics dropped by 50%'
      ],
      lessonsLearned: [
        'Lapsed customers were not price-sensitive; they were exhausted from chasing unpunctual service agents',
        'The Anxiety force (fear of unknown strangers in the house) had never been mentioned in any internal company meeting',
        'Translating the marketing message from "Annual Maintenance" to "We remember so you don’t have to" directly addressed the job'
      ]
    },
    implementationGuide: {
      prerequisites: ['Decision requiring customer motivation clarity', '1-2 trained switch interviewers', 'Access to 15-30 recent buyers, switchers, and non-consumers', 'Note-taker'],
      steps: [
        'Define the strategic decision the study will inform (positioning, roadmap, churn)',
        'Recruit interviewees: include recent buyers, churned customers, and people who bought nothing',
        'Conduct 45-minute Switch Interviews in pairs; retrace the chronological timeline',
        'Map the Four Forces of Progress (Push, Pull, Anxiety, Habit) for each interviewee',
        'Draft the core functional Job Statement using the Verb + Object + Context formula',
        'Draw the 8-step universal Job Map (Define -> Conclude)',
        'Formulate solution-free desired outcome statements ("Minimise the time it takes to...")',
        'Run an Importance vs Satisfaction survey (1-10) to calculate Opportunity Scores',
        'Focus product and marketing exclusively on outcomes scoring > 12',
        'Feed findings into Value Proposition Canvas and feature roadmaps'
      ],
      checklist: [
        'Strategic decision defined',
        'Interviewee sample includes switchers and non-consumers',
        'Switch interview timeline reconstructed',
        'Job statement formulated without product nouns',
        'Four Forces mapped',
        'Opportunity scores calculated for core job steps'
      ],
      commonMistakes: [
        { mistake: 'Asking customers "What do you want?"', fix: 'Ask "What happened?" and retrace the chronological purchase story' },
        { mistake: 'Writing the job as a product ("Use our app")', fix: 'Strip all solution language; describe the underlying progress' },
        { mistake: 'Interviewing only happy current customers', fix: 'Interview switchers and lapsed customers—they hold the decisive breakthroughs' },
        { mistake: 'Ignoring the emotional and social job dimensions', fix: 'Probe for how the user wants to feel and how they want to be perceived by peers' }
      ],
      plan306090: {
        d30: 'Recruit interviewees, conduct 20 switch interviews, map Four Forces, draft job statement.',
        d60: 'Construct job map, survey customers on importance/satisfaction, calculate opportunity scores.',
        d90: 'Reprioritize product roadmap around top underserved outcomes; revise marketing positioning.'
      },
      proTips: [
        'Begin interviews with: "Tell me about the day you bought it." The narrative uncovers the real triggering events.',
        'Listen intently whenever the customer says "because"—the force of progress follows immediately.',
        'Write outcome metrics in the customer’s units (time, likelihood, effort), never internal metrics (clicks, views).'
      ]
    },
    whenNotToUse: [
      { alternative: 'Value Proposition Canvas', reason: 'Choose VPC when the core job is already understood and you need a fast visual tool to match features to customer needs.' },
      { alternative: 'Customer Journey Mapping', reason: 'Choose Journey Mapping when optimizing an existing operational service experience step by step rather than investigating why customers choose.' }
    ],
    reflectionPrompts: [
      'In the customer’s exact words, what progress are they trying to make when they hire your product?',
      'What unconventional workaround do customers use when your product is unavailable, and have you treated it as a competitor?',
      'What anxiety prevents prospective buyers from switching to you today, and how could your onboarding eliminate it?'
    ],
    quickReferenceCard: [
      'Use when: Repositioning a product, reducing customer churn, or entering a new market.',
      'Job formula: Verb + Object + Context (no solution words).',
      'Reconstruct timeline via Switch Interviews; map Push, Pull, Anxiety, Habit.',
      'Job map (8 steps) -> Desired outcome statements -> Opportunity Scores.',
      'Competitors = anything the customer hires to get the job done.'
    ],
    quiz: [
      {
        id: 'jtbd-1',
        question: 'In Jobs To Be Done theory, what is a "job"?',
        options: [
          'A customer’s professional occupation or job title',
          'The progress an individual is trying to make in a specific circumstance',
          'A technical product capability or specification',
          'A marketing demographic persona'
        ],
        correctAnswer: 1,
        explanation: 'A job is the progress a customer seeks to make in a particular circumstance; products are hired to achieve that progress.'
      },
      {
        id: 'jtbd-2',
        question: 'Which of the following adheres to the correct format for a Job Statement?',
        options: [
          '"Use our mobile application to study for exams"',
          '"Pass college entrance exams easily"',
          '"Prepare for a competitive government exam while working full-time"',
          '"Purchase an annual coaching subscription"'
        ],
        correctAnswer: 2,
        explanation: 'A valid job statement uses Verb + Object + Contextual clarifier, containing zero solution nouns (app, coaching) and zero subjective adjectives (easily).'
      },
      {
        id: 'jtbd-3',
        question: 'What are the Four Forces of Progress that govern whether a customer makes a purchase switch?',
        options: [
          'Price, Quality, Speed, Service',
          'Push, Pull, Anxiety, Habit',
          'Strengths, Weaknesses, Opportunities, Threats',
          'Empathise, Define, Ideate, Test'
        ],
        correctAnswer: 1,
        explanation: 'Bob Moesta’s Four Forces model consists of Push (current pain) and Pull (new attraction) driving change, countered by Anxiety (fear of the new) and Habit (inertia).'
      },
      {
        id: 'jtbd-4',
        question: 'In Outcome-Driven Innovation (ODI), a high Opportunity Score indicates a customer outcome that is:',
        options: [
          'Unimportant and already well satisfied',
          'Highly important to the customer, but poorly satisfied by current solutions',
          'Important and completely satisfied by incumbents',
          'Already built into the current software version'
        ],
        correctAnswer: 1,
        explanation: 'Opportunity = Importance + (Importance - Satisfaction). When importance is high and satisfaction is low, the opportunity score is high, signaling an underserved market need.'
      },
      {
        id: 'jtbd-5',
        question: 'What does a "Switch Interview" primarily reconstruct?',
        options: [
          'A customer’s demographic and psychographic profile',
          'The chronological timeline of events, triggers, and forces leading to a purchase decision',
          'A competitor’s operational pricing structure',
          'An engineering sprint product release roadmap'
        ],
        correctAnswer: 1,
        explanation: 'A switch interview reconstructs the complete chronological story—from first thought and passive looking to trigger events and final purchase.'
      }
    ]
  },
  {
    id: 'bmn',
    name: 'Business Model Navigator',
    shortName: 'Business Model Navigator',
    category: 'Business Model & Innovation',
    tagline: 'Reinvent your business model by recombining 55+ proven cross-industry patterns',
    origin: 'Oliver Gassmann, Karolin Frankenberger & Michaela Csik (University of St. Gallen, 2014/2020).',
    corePurpose: 'To make business model innovation systematic rather than accidental by giving teams a catalogue of proven patterns to adapt before competitors disrupt them.',
    primaryUsers: ['Executive leadership teams', 'Corporate strategy & innovation units', 'Family-business successors', 'Scale-up founders', 'Consultants'],
    difficulty: 'Intermediate',
    horizon: 'Reinvention / Diversification',
    scope: 'Whole Business Enterprise',
    timeToResult: '2-day workshop + pilot phase',
    dataNeeds: 'Low-Medium (ecosystem scan & capability audit)',
    keyOutput: 'Candidate business models, consistency checks, pilot definition cards with kill criteria',
    bestPairedWith: 'Takes input from BMC, Five Forces, PESTLE, VRIO; Feeds Ansoff, pilot execution, Balanced Scorecard',
    keyFeatures: [
      'The "Magic Triangle": Four core dimensions — Who (customer), What (value proposition), How (value chain), and Value (revenue model)',
      'Threshold rule: Business model innovation requires changing AT LEAST TWO of the four dimensions',
      'Catalogue of 55+ proven patterns (Subscription, Razor & Blade, Freemium, Add-On, Pay-per-Use, Lock-In, Solution Provider, Two-Sided Market, Orchestrator, etc.)',
      'Similarity Principle (patterns from adjacent sectors) vs Confrontation Principle (patterns from distant industries to smash dominant logic)',
      'Pilot Definition Cards with explicit "Kill Criteria" to fail fast without bankrupting the core business'
    ],
    howItWorks: 'In Initiation, the team describes the current model on the Magic Triangle and maps ecosystem drivers. In Ideation, they apply 15-20 patterns via the Similarity Principle and 10-15 via the Confrontation Principle, generating 30+ candidate models. In Integration, shortlisted models are tested for internal consistency (do Who, What, How, and Value fit?) and capability fit via VRIO. In Implementation, 2-3 models are piloted with explicit kill criteria.',
    coreConcepts: [
      {
        term: 'The Magic Triangle',
        definition: 'Who (target customer), What (value proposition), How (value chain and resources), Value (how money is made and costs structured).'
      },
      {
        term: 'Two-Dimension Innovation Rule',
        definition: 'Modifying only one dimension (e.g. tweaking price) is a marketing tactic; genuine business model innovation requires changing at least two dimensions.'
      },
      {
        term: 'Dominant Industry Logic',
        definition: 'The entrenched, unwritten assumptions that every company in an industry follows without question (e.g. "Locks are sold once through hardware stores").'
      },
      {
        term: 'Confrontation Principle',
        definition: 'Deliberately applying patterns from industries radically distant from your own (e.g. applying printer cartridge Razor-and-Blade logic to industrial mechanical locks) to shatter orthodoxies.'
      },
      {
        term: 'Pilot with Kill Criteria',
        definition: 'A bounded, real-world experiment with a predetermined metric threshold (e.g. "<100 subscribers by month 3 = terminate") that guarantees objective learning.'
      }
    ],
    strengths: [
      'Replaces sterile, blank-page brainstorming with structured inspiration from 50 years of empirical business history',
      'Explicitly breaks industry orthodoxies through confrontation techniques',
      'Includes organizational change management: plans for internal stakeholders who might resist the new model'
    ],
    limitations: [
      'Patterns are descriptive lenses, not turnkey plans; execution capabilities must still be built',
      'Can generate superficially appealing models that the organization lacks the technical capability to deliver (requires VRIO check)',
      'Less suited for pre-revenue startups with no established baseline model to transform'
    ],
    workflowPlacement: {
      upstream: 'Current Business Model Canvas, Five Forces (structural profit compression), PESTLE, VRIO capability review',
      downstream: 'Ansoff growth route classification, pilot project roadmaps, Balanced Scorecard strategic objectives'
    },
    useCases: [
      {
        title: 'Textbook Publisher Facing Digital Decline',
        scenario: 'Physical print sales collapsing; student piracy rampant.',
        problem: '"Sell PDF e-books" was the only idea management had.',
        howItHelps: 'Navigator applied Subscription (institutional library access), Freemium (free chapters, paid tests), and Solution Provider (curriculum plus teacher grading portal).',
        outcome: 'Institutional school digital subscription piloted with 20 schools; revenue per institution exceeded print volume.'
      },
      {
        title: 'Two-Wheeler Dealership Group',
        scenario: 'Shrinking retail margins on new motorcycle sales.',
        problem: 'Service workshop bay capacity was saturated.',
        howItHelps: 'Rent-Instead-of-Buy and Pay-per-Use suggested a rental scooter package for gig-economy delivery riders with Guaranteed Availability.',
        outcome: 'Launched gig-worker subscription fleet; dealership unlocked stable recurring monthly revenues.'
      }
    ],
    caseStudy: {
      company: 'Dindigul Lock Works',
      revenue: '₹28 Crore',
      staff: '240 employees, third-generation mechanical lock manufacturer in South India',
      profile: 'Heritage manufacturer celebrated for brass padlock durability, selling via hardware distributors.',
      challenge: 'Imported smart electronic locks were capturing 40% annual growth in urban residential apartments. The family’s initial reaction was to "build a digital smart lock", which would pit them against global consumer electronics giants.',
      whyChosen: 'The firm had a strong legacy brand to protect, severe external digital pressure, and needed a new business model rather than just an expensive electronics product.',
      steps: [
        'Initiation: Mapped current Magic Triangle (Who: hardware dealers; What: heavy mechanical locks; How: foundry manufacturing; Value: one-time retail transaction)',
        'Ideation: Evaluated 20 patterns via similarity (appliances) and 15 via confrontation (telecoms, software, shaving razors). Generated 38 ideas; shortlisted 9',
        'Integration: Tested consistency. Surviving model: "Lock-In plus Razor & Blade" — a heavy-duty modular lock body with swappable cylinders, paired with a "Subscription" service for rental landlords',
        'Capability Check (VRIO): Sourced the electronic smart cylinder through a specialized IoT hardware partner rather than building semiconductors in-house',
        'Implementation: Piloted modular lock with 15 residential builders and 200 landlords in Coimbatore for 6 months with clear kill criteria (<100 units = kill)'
      ],
      results: [
        'Modular lock line accounted for 22% of firm revenue within 18 months, with 30% attaching smart-cylinder upgrades',
        'Landlord lock-and-key subscription reached 1,400 units at ₹1,200/year, generating the company’s first recurring revenue stream',
        'Gross margins on the modular line were 9 percentage points higher than traditional padlocks',
        'Capital expenditure was 70% lower than the original "build a smart lock" proposal because electronics were partnered'
      ],
      lessonsLearned: [
        'The confrontation principle generated the winning breakthrough (Razor & Blade came from discussing printer ink cartridges)',
        'The VRIO capability check killed two seductive patterns that the company lacked the talent to operate',
        'Changing the Value dimension (recurring subscription) produced more profit than changing the physical product'
      ]
    },
    implementationGuide: {
      prerequisites: ['Leadership sponsor willing to pilot models competing with core', 'Cross-functional team of 6-10', 'Facilitator familiar with 55+ pattern cards', 'Current BMC and Five Forces analysis'],
      steps: [
        'Document current business model on the Magic Triangle (Who, What, How, Value)',
        'Map the ecosystem: actors, technologies, and regulatory drivers forcing change',
        'Articulate the dominant industry logic in one provocative sentence',
        'Work through 15-20 patterns using the Similarity Principle; draft candidate models',
        'Work through 10-15 patterns using the Confrontation Principle; combine patterns',
        'Shortlist 5-8 models based on strategic fit and attractiveness',
        'Run internal and external consistency checks on shortlisted models',
        'Conduct VRIO capability check; drop models with unbridgeable resource gaps',
        'Select 2-3 models; draft Pilot Definition Cards with explicit kill criteria',
        'Address internal organizational resistance; launch pilots in separate operating units'
      ],
      checklist: [
        'Current model documented on Magic Triangle',
        'Dominant industry logic stated explicitly',
        'At least 30 candidate models generated',
        'Winning models change at least 2 of the 4 dimensions',
        'VRIO capability check completed',
        'Pilot cards have explicit numeric kill criteria'
      ],
      commonMistakes: [
        { mistake: 'Treating a pattern as an off-the-shelf plan', fix: 'Adapt the underlying pattern logic to your specific customer and regulatory ecosystem' },
        { mistake: 'Only exploring similar industries', fix: 'The Confrontation Principle (distant industries) is where breakthrough innovations originate' },
        { mistake: 'Changing only one dimension and calling it innovation', fix: 'Ensure at least two dimensions of the Magic Triangle are transformed' },
        { mistake: 'Launching pilots without kill criteria', fix: 'Pilots that cannot fail cannot teach: define clear stop thresholds in advance' }
      ],
      plan306090: {
        d30: 'Map current model, conduct 2-day workshop, generate 30+ models, shortlist 3, draft pilot cards.',
        d60: 'Launch pilots in separate units; bridge capability gaps with partners.',
        d90: 'Evaluate pilot metrics against kill criteria; decide to scale, adjust, or kill.'
      },
      proTips: [
        'Include at least one outsider from a completely different industry in the workshop; they will immediately spot the dominant logic everyone else takes for granted.',
        'Time-box each pattern card to 5 minutes: rapid pace produces volume, and volume creates quality.',
        'Always ask: "Who loses inside our company under this new model?" Address their incentives before launching the pilot.'
      ]
    },
    whenNotToUse: [
      { alternative: 'Lean Canvas', reason: 'Choose Lean Canvas for early-stage pre-revenue startups with no existing model to reinvent.' },
      { alternative: 'Blue Ocean Strategy', reason: 'Choose Blue Ocean when the objective is reconstructing the buyer value curve rather than the revenue and value-chain architecture.' }
    ],
    reflectionPrompts: [
      'What is the dominant unwritten rule of your industry that every competitor obeys and no one questions?',
      'Which business model pattern from a completely different industry has changed your personal buying habits, and could it apply here?',
      'If an aggressive competitor transformed two dimensions of your business model tomorrow, which two changes would be fatal to your firm?'
    ],
    quickReferenceCard: [
      'Use when: Established business faces commoditization or structural disruption and incremental tweaks are insufficient.',
      'Magic Triangle: Who, What, How, Value (innovate on at least two).',
      'Initiation -> Ideation (Similarity & Confrontation) -> Integration (Consistency & VRIO) -> Implementation.',
      '55+ patterns; combine 2-3 patterns to construct robust models.',
      'Always set explicit Kill Criteria for pilots to prevent endless resource drains.'
    ],
    quiz: [
      {
        id: 'bmn-1',
        question: 'What are the four core dimensions of the Business Model Navigator’s "Magic Triangle"?',
        options: [
          'Strengths, Weaknesses, Opportunities, Threats',
          'Who (Customer), What (Value Proposition), How (Value Chain), Value (Revenue Model)',
          'Product, Price, Place, Promotion',
          'Plan, Do, Check, Act'
        ],
        correctAnswer: 1,
        explanation: 'The Magic Triangle defines a business model across Who (Target Customer), What (Offering), How (Value Chain), and Value (Profit Mechanism).'
      },
      {
        id: 'bmn-2',
        question: 'The Business Model Navigator methodology was developed at which institution?',
        options: ['Harvard Business School', 'Stanford University', 'University of St. Gallen', 'INSEAD'],
        correctAnswer: 2,
        explanation: 'Oliver Gassmann, Karolin Frankenberger, and Michaela Csik developed the framework at the University of St. Gallen, Switzerland.'
      },
      {
        id: 'bmn-3',
        question: 'What is the "Confrontation Principle" in the Business Model Navigator process?',
        options: [
          'Confronting direct competitors in aggressive price wars',
          'Deliberately applying business model patterns from industries radically distant from your own to break dominant logic',
          'Confronting customers with unexpected price increases',
          'Challenging underperforming sales teams'
        ],
        correctAnswer: 1,
        explanation: 'The confrontation principle forces teams to adopt patterns from unrelated sectors, breaking free from entrenched industry assumptions.'
      },
      {
        id: 'bmn-4',
        question: 'According to the authors, genuine business model innovation typically requires changing at least how many dimensions of the Magic Triangle?',
        options: ['At least one dimension', 'At least two dimensions', 'All four dimensions simultaneously', 'Only the revenue model'],
        correctAnswer: 1,
        explanation: 'Changing only one dimension is generally an incremental feature or pricing tactic; transforming at least two dimensions constitutes true business model innovation.'
      },
      {
        id: 'bmn-5',
        question: 'The classic "Razor and Blade" business model pattern describes an architecture where:',
        options: [
          'High-margin luxury items are sold once to affluent buyers',
          'A base product is sold cheaply or at a loss, while ongoing consumables or proprietary upgrades generate high recurring profit',
          'Customers pay strictly on a metered pay-per-use basis',
          'A platform connects buyers and sellers in a two-sided market'
        ],
        correctAnswer: 1,
        explanation: 'The Razor and Blade pattern locks in customers with an inexpensive base device (razor, printer, console) and profits from continuous high-margin consumables (blades, ink cartridges, games).'
      }
    ]
  }
];

export const CATEGORY_2_STACKS: StrategyStack[] = [
  {
    id: 'stack-cat2-a',
    name: 'Stack A — Startup / New Product (Idea to First Revenue)',
    targetOrg: 'Pre-revenue founders, incubator cohorts, innovation squads',
    recommendedChain: ['jtbd', 'designthinking', 'vpc', 'leancanvas'],
    cadence: {
      quarterly: 'Week 1-2: JTBD switch interviews / Design Thinking sprint -> Week 2-3: VPC & Lean Canvas -> Week 3-8: Solution interviews, test cards, MVP',
      annually: 'When model stabilizes: migrate to Business Model Canvas and hand over to SWOT & OKRs',
      every23Years: 'N/A — maintain rapid validation speed'
    },
    whyItFits: 'The primary risk in a new venture is the customer and the problem. Every tool in this sequence keeps the team listening to customers before writing code.',
    whatToSkip: 'Skip the Business Model Navigator (there is no existing model to transform yet) and formal 40-page business plans.'
  },
  {
    id: 'stack-cat2-b',
    name: 'Stack B — Growing SME (25–300 people, Established Revenue)',
    targetOrg: 'Operating companies, family business successors, multi-product firms',
    recommendedChain: ['bmc', 'vpc', 'jtbd', 'bmn', 'designthinking'],
    cadence: {
      quarterly: 'VPC refreshed whenever customer churn or win-rates shift; Design Thinking sprints for service bottlenecks',
      annually: 'Full Business Model Canvas refresh with segment-level revenue/cost quantification and fact/assumption tagging',
      every23Years: 'Business Model Navigator 2-day workshop with pilots whenever growth stalls or disruption hits'
    },
    whyItFits: 'The SME has an established cashflow engine to protect and optimize. BMC keeps it transparent, JTBD and VPC keep offers fitted, and Navigator prevents model obsolescence.',
    whatToSkip: 'Avoid heavy bureaucratic ERP strategy modules; collaborative whiteboards and BI dashboards suffice.'
  },
  {
    id: 'stack-cat2-c',
    name: 'Stack C — Enterprise & Multi-Division Innovation',
    targetOrg: '300+ people, corporate holding groups, corporate incubators',
    recommendedChain: ['bmn', 'bmc', 'jtbd', 'vpc', 'designthinking', 'leancanvas'],
    cadence: {
      quarterly: 'Corporate innovation units: standing BMN pattern database and pilot portfolio reviews with strict kill criteria',
      annually: 'Division level: Business Model Canvas reviewed alongside strategy cycle; VRIO check on new pattern capabilities',
      every23Years: 'Enterprise-wide business model portfolio transformation'
    },
    whyItFits: 'Scale requires a dual operating system: core business units run on BMC and VPC, while new internal venture spinouts run on Lean Canvas with dedicated metrics so the core does not absorb them.',
    whatToSkip: 'Do not allow corporate divisions to force corporate budgeting cycles onto agile Lean Canvas internal spinouts.'
  }
];

export const CATEGORY_2_SCENARIOS: ScenarioMission[] = [
  {
    id: 'printing-digital-invitations',
    title: 'The Wedding Invitation Digital Shift',
    role: 'Managing Director',
    companyContext: 'Heritage wedding invitation printing press facing declining offset print orders as couples shift to WhatsApp and digital invites.',
    crisisPrompt: 'Your production team proposes "adding digital invitations" to the existing Business Model Canvas. What is your strategic move?',
    targetTools: ['bmc', 'bmn'],
    options: [
      {
        id: 'opt-1',
        label: 'Treat digital invitations as just another product line on the existing canvas and price per PDF',
        toolUsed: 'BMC (additive bolt-on trap)',
        explanation: 'Fails to recognize that digital invitations have zero marginal cost, different customer channels (app stores, WhatsApp), and require web software developers rather than press operators.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Draw a second distinct BMC; test whether families will pay when free tools exist, and explore Freemium / Add-On patterns',
        toolUsed: 'Business Model Canvas Dual-Model + Navigator',
        explanation: 'Superb move! Comparing Canvas A (physical) and Canvas B (digital) block by block reveals the new digital capabilities required. Test the riskiest assumption—willingness to pay—with 20 interviews before building.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Buy a ₹50 lakh high-speed digital colour printing press to print faster',
        toolUsed: 'Premature equipment capital expenditure',
        explanation: 'Doubles down on physical printing machinery when the fundamental customer behavior is moving entirely onto mobile screens.',
        isOptimal: false,
        rubricPoints: 8
      }
    ],
    modelAnswer: 'Draw a second canvas rather than adding to the first. Digital invitations feature a fundamentally different value proposition (speed, RSVP tracking, multimedia), different channels (WhatsApp, app stores), near-zero marginal cost, different key resources (digital UI designers, cloud infrastructure), and a different revenue logic (low price high volume or subscription for event planners). Compare both canvases block by block; count new capabilities needed. Test the riskiest assumption—that families will pay anything when free Canva templates exist—with 20 interviews and a landing page test before writing code. Apply Business Model Navigator patterns like "Freemium" or "Add-On" to monetize.',
    actionChecklist: [
      'Separate physical and digital operations into two distinct canvases',
      'Identify differing cost structures and key resource requirements',
      'Test willingness to pay with a landing-page pre-order experiment',
      'Explore Freemium and Add-On business model patterns'
    ],
    reflectionKey: 'When a digital disruption hits an analog business, never bolt digital onto your legacy canvas: treat it as a distinct business model with its own unit economics.'
  },
  {
    id: 'campus-laundry-app',
    title: 'The Student Campus Laundry Startup',
    role: 'Lead Mentor / Founder',
    companyContext: 'College incubator team wanting ₹5 lakh to code a mobile app for campus laundry pickup.',
    crisisPrompt: 'The student team’s Lean Canvas says Customer: "All college students"; Problem: "Laundry is boring"; Key Metric: "App downloads". What do you do?',
    targetTools: ['leancanvas'],
    options: [
      {
        id: 'opt-1',
        label: 'Approve the ₹5 lakh grant to accelerate coding and launch on app stores',
        toolUsed: 'Premature scaling of unvalidated assumptions',
        explanation: 'Wastes capital on software development when the problem is unvalidated and the target customer is vaguely defined.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Decline app funding; narrow to hostel early adopters, rewrite problems in customer words, and mandate 10 pre-paid orders via WhatsApp pilot',
        toolUsed: 'Lean Canvas Customer Development',
        explanation: 'Textbook Lean Startup execution! Narrow segment to hostel students with zero machine access; rewrite problems around missed interview clothes; replace vanity downloads with repeat order rate; prove demand manually with WhatsApp first.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Tell the team to write a 40-page formal business plan with 5-year financial projections',
        toolUsed: 'Academic bureaucracy',
        explanation: 'A 40-page plan for an unvalidated campus idea is pure fantasy and delays real customer contact.',
        isOptimal: false,
        rubricPoints: 6
      }
    ],
    modelAnswer: 'Decline funding for software development; fund two weeks of customer discovery interviews instead. Narrow the segment from "all students" to hostel students without easy laundry access, and name the early adopter (final-year students preparing for placement interviews with zero free time). Rewrite Problem from the customer’s view (clothes not ready for interviews, lost garments, inconvenient collection times) and honestly document existing alternatives (hostel dhobi, self-wash, carrying clothes home on weekends). Replace vanity Key Metrics (downloads) with orders per week per active user and repeat retention. Mandate 30 problem interviews and 10 pre-paid orders through a manual WhatsApp-only concierge pilot before any software is engineered.',
    actionChecklist: [
      'Narrow customer segment to high-pain early adopters',
      'Rewrite problems from customer perspective with existing alternatives',
      'Replace vanity metrics with retention and repeat usage',
      'Run a manual WhatsApp concierge test before coding'
    ],
    reflectionKey: 'Interest is free; time and pre-paid money are evidence. Never write software until manual experiments prove people will pay to solve the problem.'
  },
  {
    id: 'school-bus-tracking-vpc',
    title: 'The School Bus Tracker Renewal Crisis',
    role: 'Head of Product',
    companyContext: 'B2B EdTech company selling GPS student bus tracking software to private schools.',
    crisisPrompt: 'Parents love the app, but school principals and administrators are refusing to renew annual contracts. The engineering team wants to build more parent features. What do you do?',
    targetTools: ['vpc'],
    options: [
      {
        id: 'opt-1',
        label: 'Add more parent tracking notifications and live video streaming to satisfy parents',
        toolUsed: 'VPC (User vs Buyer mismatch)',
        explanation: 'Doubles down on the user (parent) while ignoring the paying customer (school administrator). Adding parent features fails to address why the school refuses to renew.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Draw a Customer Profile for the School Administrator; add complaint deflection, compliance reports, and ERP sync',
        toolUsed: 'Value Proposition Canvas (Multi-Stakeholder B2B)',
        explanation: 'Spot on! The administrator is the payer. Their jobs are reducing parent phone calls and proving safety to trustees. Redesigning the value map for the payer fixes the contract renewal crisis.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Cut contract subscription prices by 50% for all renewing schools',
        toolUsed: 'Price discounting',
        explanation: 'Erodes software margins without solving the administrator’s administrative and compliance frustrations.',
        isOptimal: false,
        rubricPoints: 8
      }
    ],
    modelAnswer: 'Draw a separate Customer Profile for the school administrator, who is the paying customer. Interview ten school administrators: their functional jobs are likely "reduce angry parent phone calls during traffic delays", "prove safety and route compliance to the school board", and "manage driver accountability". Their top pains include "parents call the principal’s office instead of checking the app" and "no consolidated report for trustees". The current Value Map exclusively serves parents, not the payer! Redesign the offer: add a front-office complaint-deflection dashboard, automated monthly trustee safety compliance audits, driver speeding alerts, and integration with the school’s fee/student ERP. Test with 5 non-renewing schools before touching parent features.',
    actionChecklist: [
      'Distinguish the end-user (parent) from the economic buyer (administrator)',
      'Build a separate VPC Customer Profile for the school administrator',
      'Map features to administrator jobs: complaint deflection and regulatory compliance',
      'Update the master Business Model Canvas to show two segments and two value propositions'
    ],
    reflectionKey: 'In B2B, products fail when they delight the end-user but deliver zero value to the executive who signs the purchase order.'
  },
  {
    id: 'fee-payment-design-sprint',
    title: 'The College Fee-Payment Design Sprint',
    role: 'Head of Student Services',
    companyContext: 'Engineering college with 4,000 students facing fierce backlash over tuition fee collection.',
    crisisPrompt: 'Student feedback surveys report "fee payment is a nightmare". The IT department proposes buying a ₹15 lakh enterprise payment gateway. What do you do using Design Thinking?',
    targetTools: ['designthinking'],
    options: [
      {
        id: 'opt-1',
        label: 'Immediately issue an RFP to purchase the ₹15 lakh enterprise payment gateway',
        toolUsed: 'Premature technical purchase',
        explanation: 'Commits large capital before discovering whether the payment gateway itself is the actual source of student frustration.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Run a 5-day Design Thinking sprint: shadow 10 students, map journey, prototype zero-cost communication fixes, and test',
        toolUsed: 'Design Thinking 5-Day Sprint',
        explanation: 'Exemplary human-centered design! Empathy observation reveals the true pain is lack of fee breakdown transparency, surprise deadlines, and office stamping queues. Prototype cheap fixes in hours before buying software.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Send a circular threatening disciplinary action against students who pay late',
        toolUsed: 'Punitive administrative deflection',
        explanation: 'Alienates students and parents while escalating friction and negative word-of-mouth.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Run a one-week Design Thinking sprint before spending capital. In Empathise, shadow ten students and three parents through the payment process; map their emotional journey from initial notification to official receipt. In Define, you will likely discover the pain is not the transaction gateway, but external confusion: unclear fee breakdowns, receipts not reaching parents’ WhatsApp, long queues at the bursar’s desk for an ink stamp, or deadlines announced with only 3 days’ notice. Draft a POV and HMW questions. In Ideate and Prototype, build zero-cost fixes: a 1-page transparent fee breakdown, automated WhatsApp confirmation receipts, a 14-day advance notice calendar, and a "no physical stamp needed" policy. Test with one department during the next cycle. Buy a payment gateway only if testing proves the gateway itself is the root bottleneck.',
    actionChecklist: [
      'Shadow real students and parents through fee payment in person',
      'Map emotional highs and lows across the payment journey',
      'Prototype low-cost policy and communication fixes in 24 hours',
      'Test with one department before committing ₹15 lakh capital'
    ],
    reflectionKey: 'Organizations routinely spend millions on complex software to fix problems that were actually caused by poor communication and unnecessary ink stamps.'
  },
  {
    id: 'school-software-jtbd',
    title: 'The Unused ERP Modules Dilemma',
    role: 'VP of Product',
    companyContext: 'B2B school management SaaS provider.',
    crisisPrompt: 'Schools eagerly purchase your software bundle for attendance, but 90% of schools completely ignore the exam, fee, and communication modules. The CEO demands scheduling mandatory customer training webinars. What is your JTBD response?',
    targetTools: ['jtbd'],
    options: [
      {
        id: 'opt-1',
        label: 'Make attendance software contingent on completing all 4 module training certifications',
        toolUsed: 'Forced adoption bureaucracy',
        explanation: 'Enforces software modules customers did not hire, frustrating clients and sparking contract churn.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Run Switch Interviews to discover the core job; map separate jobs and executors for fees and parent communication, and unbundle',
        toolUsed: 'Jobs To Be Done Outcome Analysis',
        explanation: 'Masterful application of JTBD! Discovers the software was hired exclusively to "stop wasting a day on government attendance reports". Fees and communication have different executors (accountants, teachers) and different struggling moments. Reposition or unbundle each module.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Send weekly automated nag emails to school principals listing their unused modules',
        toolUsed: 'Nagging communication',
        explanation: 'Highlights perceived lack of value without understanding the customer’s functional workflow context.',
        isOptimal: false,
        rubricPoints: 8
      }
    ],
    modelAnswer: 'Run switch interviews with the school administrators who purchased the system: what was their struggling moment, and what job did they hire the software for? You will discover the software was hired for a narrow, urgent job: "Stop losing one day a month to attendance compliance paperwork for the state education department". The fee, exam, and communication modules were never hired for a job. Map the jobs for fee collection and parent communication separately: they have different executors (the accountant and the classroom teacher) with their own struggling moments and established alternatives (Tally and WhatsApp groups). Reposition each module around its own job and executor, or unbundle them so schools only pay for what they use. Training webinars will increase usage only if the underlying job exists.',
    actionChecklist: [
      'Conduct switch interviews to identify the true trigger that caused the purchase',
      'Map separate jobs and executors for the unused modules',
      'Identify entrenched non-obvious alternatives (WhatsApp, Tally, paper registers)',
      'Unbundle modules or reposition them to distinct job executors'
    ],
    reflectionKey: 'Customers do not use software modules because they were trained; they use them when the module makes progress on an urgent struggling moment.'
  }
];

export const CATEGORY_2_GLOSSARY: GlossaryItem[] = [
  { term: 'Business Model', definition: 'The underlying logic of how an organization creates, delivers, and captures value; distinct from the business plan and strategy.', tool: 'Business Model Canvas' },
  { term: 'Business Model Innovation', definition: 'Changing at least two of the four Magic Triangle dimensions (Who, What, How, Value) in a way new to the industry.', tool: 'Business Model Navigator' },
  { term: 'Confrontation Principle', definition: 'Applying business model patterns from distant industries to break entrenched dominant industry logic.', tool: 'Business Model Navigator' },
  { term: 'Customer Profile', definition: 'The right-hand side of the Value Proposition Canvas: customer jobs, pains, and gains of a specific segment.', tool: 'Value Proposition Canvas' },
  { term: 'Desired Outcome Statement', definition: 'A measurable, solution-free statement of what a customer wants from a job step ("Minimise the time it takes to...").', tool: 'Jobs To Be Done' },
  { term: 'Dominant Industry Logic', definition: 'The unwritten, unquestioned rules that every incumbent firm in an industry follows blindly.', tool: 'Business Model Navigator' },
  { term: 'Double Diamond', definition: 'The UK Design Council’s Discover–Define–Develop–Deliver framework alternating divergent and convergent thinking.', tool: 'Design Thinking' },
  { term: 'Early Adopter', definition: 'The subset of a customer segment who experiences the problem most acutely and will eagerly trial an imperfect v1.', tool: 'Lean Canvas' },
  { term: 'Empathise / Define / Ideate / Prototype / Test', definition: 'The five iterative stages of the Stanford d.school Design Thinking model.', tool: 'Design Thinking' },
  { term: 'Existing Alternatives', definition: 'How customers currently solve a problem (including spreadsheets, WhatsApp, or doing nothing); true competition.', tool: 'Lean Canvas' },
  { term: 'Fit Check', definition: 'Evaluating whether a value map’s pain relievers and gain creators address a customer profile’s top-ranked pains and gains.', tool: 'Value Proposition Canvas' },
  { term: 'Four Forces of Progress', definition: 'Push, Pull, Anxiety, and Habit; the psychological and situational forces governing purchase switching.', tool: 'Jobs To Be Done' },
  { term: 'How Might We (HMW)', definition: 'A question format that reframes an empathy insight into an open creative opportunity without dictating solutions.', tool: 'Design Thinking' },
  { term: 'Job (JTBD)', definition: 'The fundamental progress an individual is trying to make in a specific circumstance; functional, social, emotional.', tool: 'Jobs To Be Done' },
  { term: 'Job Map', definition: 'The universal eight-step sequence of job execution: Define, Locate, Prepare, Confirm, Execute, Monitor, Modify, Conclude.', tool: 'Jobs To Be Done' },
  { term: 'Key Metrics (Lean Canvas)', definition: 'The 1-2 actionable numbers that prove the business engine is working (retention, recurring revenue), avoiding vanity stats.', tool: 'Lean Canvas' },
  { term: 'Magic Triangle', definition: 'The Business Model Navigator’s four interconnected dimensions: Who (Customer), What (Value Proposition), How (Value Chain), Value (Revenue Model).', tool: 'Business Model Navigator' },
  { term: 'Opportunity Score', definition: 'Formula: Importance + (Importance - Satisfaction); scores > 12 identify high-priority underserved customer needs.', tool: 'Jobs To Be Done' },
  { term: 'Pattern (BMN)', definition: 'A recurring business model configuration observed across industries (Subscription, Freemium, Razor and Blade, etc.).', tool: 'Business Model Navigator' },
  { term: 'Point-of-View (POV)', definition: 'A synthesis statement: "[User] needs [need] because [surprising insight discovered during research]".', tool: 'Design Thinking' },
  { term: 'Problem Interview', definition: 'A structured discovery dialogue to validate whether a customer problem is real and painful before pitching any solution.', tool: 'Lean Canvas' },
  { term: 'Prototype Fidelity Ladder', definition: 'Testing at the lowest viable level of realism (sketches -> paper mocks -> clickable demos -> pilots) to maximize learning speed.', tool: 'Design Thinking' },
  { term: 'Riskiest Assumption', definition: 'The foundational belief that, if disproven, kills the business model fastest; must be tested before building.', tool: 'Lean Canvas / BMC' },
  { term: 'Similarity Principle', definition: 'Transferring business model patterns from industries adjacent or similar to your own.', tool: 'Business Model Navigator' },
  { term: 'Switch Interview', definition: 'A qualitative research interview reconstructing the timeline of events, triggers, and forces leading up to a purchase switch.', tool: 'Jobs To Be Done' },
  { term: 'Unfair Advantage', definition: 'Something that cannot easily be copied or purchased by competitors (network effects, proprietary community, personal relationships).', tool: 'Lean Canvas' },
  { term: 'Unique Value Proposition (UVP)', definition: 'A single clear message explaining why your offering is different, compelling, and worth customer attention.', tool: 'Lean Canvas' },
  { term: 'Value Map', definition: 'The left-hand side of the Value Proposition Canvas: products and services, pain relievers, and gain creators.', tool: 'Value Proposition Canvas' }
];
