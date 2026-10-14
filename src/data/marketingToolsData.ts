import { ToolDefinition, StrategyStack, ScenarioMission, GlossaryItem } from './toolsData.ts';

export const MARKETING_TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'marketingmix',
    name: 'Marketing Mix (4Ps & 7Ps)',
    shortName: 'Marketing Mix (4Ps/7Ps)',
    category: 'Marketing & Growth',
    tagline: 'Design the controllable levers — Product, Price, Place, Promotion — as one coherent offer',
    origin: 'E. Jerome McCarthy (Basic Marketing, 1960), extended to 7Ps for services by Bernard H. Booms and Mary Jo Bitner (1981).',
    corePurpose: 'To ensure all marketing decisions reinforce one another: product designed for the segment, priced for willingness to pay, available where they buy, and promoted in their language.',
    primaryUsers: ['Marketing managers', 'Brand managers', 'Founders writing launch plans', 'Agencies', 'Business owners'],
    difficulty: 'Beginner',
    horizon: 'Annual marketing plan / Campaign design / Launch',
    scope: 'Product / Service line / Business unit',
    timeToResult: '1–2 weeks',
    dataNeeds: 'Target segment, customer evidence, competitor pricing & channels',
    keyOutput: 'One-page marketing mix with owners, metrics, and consistency check',
    bestPairedWith: 'STP (upstream), AIDA (promotion messaging), Budgets & OKRs, Journey Map & NPS (downstream)',
    keyFeatures: [
      'Four core controllable levers: Product, Price, Place, Promotion',
      'Extended 7Ps for services: adds People, Process, and Physical Evidence',
      'Consistency Audit: flags contradictions (e.g. luxury pricing in discount channels)',
      '4Cs mirror check: Customer solution, Cost, Convenience, Communication',
      '4Ps-to-budget conversion connecting promotion spend to expected contribution'
    ],
    howItWorks: 'Begin with the target segment and positioning statement from STP. Define Product features, warranty, and packaging; set Price and payment terms using value-based anchors; design Place channels and margins; and schedule Promotion media and messaging. For services, define People standards, Process steps, and Physical Evidence cues. Run a contradiction audit across all levers before budgeting.',
    coreConcepts: [
      {
        term: 'Controllable Variables',
        definition: 'Internal tactical levers the firm directly decides, as opposed to external macro factors in PESTLE.'
      },
      {
        term: '7Ps Service Mix',
        definition: 'Adds People (staff competencies/appearance), Process (step-by-step customer flow), and Physical Evidence (tangible quality reassurance).'
      },
      {
        term: 'Mix Contradiction',
        definition: 'Conflicting signals across levers (e.g., premium product claims paired with steep discount-led ads in bargain channels).'
      },
      {
        term: 'Lauterborn 4Cs',
        definition: 'Customer-centric mirror of the 4Ps: Customer solution (Product), Cost (Price), Convenience (Place), and Communication (Promotion).'
      }
    ],
    strengths: [
      'Comprehensive: prevents hyper-fixating on promotion while ignoring pricing or distribution',
      'Universal vocabulary understood by founders, bankers, sales, and operations teams',
      'Instantly exposes marketing mix contradictions and misaligned channel incentives'
    ],
    limitations: [
      'Product-centric by default unless checked against the customer-side 4Cs or VPC',
      'Requires STP upfront; designing a mix without a defined segment leads to generic mediocrity',
      'Static snapshot: requires quarterly refresh and customer feedback loops to adapt'
    ],
    workflowPlacement: {
      upstream: 'STP, Value Proposition Canvas, Business Model Canvas (Channels & Revenue)',
      downstream: 'AIDA campaign briefs, marketing budgets, sales enablement, Customer Journey Maps'
    },
    useCases: [
      {
        title: 'Hybrid IT Training Course Launch',
        industry: 'Education & EdTech',
        situation: 'Madurai institute debating course fees without fixing batch format or college outreach channels.',
        action: 'Defined 4Ps: weekend hybrid course with capstone; ₹45,000 fee with EMI; campus tie-ups; trainer LinkedIn content & seminars.',
        outcome: 'Aligned curriculum, pricing, and placement support into a single executable plan.'
      },
      {
        title: 'Millet Snack D2C Repositioning',
        industry: 'FMCG & Consumer Goods',
        situation: 'Premium healthy snack selling on bargain marketplaces with 50% discount ads had low repeat rates.',
        action: '4Ps audit flagged channel-price conflict. Shifted place to specialty health stores/D2C; shifted promotion to nutrition education.',
        outcome: 'Average order value rose and customer repeat rate increased.'
      }
    ],
    caseStudy: {
      company: 'GreenLeaf Academy',
      revenue: '₹3 crore',
      staff: '2 founders + 20 staff',
      profile: 'Coimbatore coaching centre with 400 students preparing for state engineering entrance and NEET.',
      challenge: 'Enrolments had fallen 18% over two years as online coaching platforms entered the market. Founders responded with newspaper ads and a 20% discount, failing to stop the decline.',
      whyChosen: 'A marketing audit showed the only lever pulled was Price, and only promotion was print, while competitor dynamics had completely shifted.',
      steps: [
        'Audited mix against target segment: Tier-2 city parents wanting offline discipline + online flexibility.',
        'Product: Added recorded lectures, weekly online doubt-clearing, and parent dashboard (Hybrid Classroom).',
        'Price: Removed blanket discount; introduced 3-tier fee (classroom, hybrid, online-only) with partner EMI.',
        'Place: Opened satellite enquiry desks in nearby towns and enabled digital online enrolment.',
        'Promotion: Shifted 60% of print budget to YouTube topper interviews, WhatsApp parent groups, and school seminars.',
        'People & Process (7Ps): Trained counsellors with standard enquiry scripts and a mandatory 48-hour follow-up rule.'
      ],
      results: [
        'Enrolments increased 23% in one admission cycle; hybrid tier accounted for 41% of new students.',
        'Cost per enrolment fell by roughly 33% due to print budget reallocation.',
        'Average realised fee rose despite discount removal because tiering allowed families to self-select.',
        'Referral share of enrolments grew from 8% to 19%.'
      ],
      lessonsLearned: [
        'Price is the easiest lever to pull and the most damaging to pull in isolation.',
        'In services, counsellor behaviour (People) and enquiry response (Process) matter as much as ads.',
        'Weekly channel performance tracking turns a static plan into a responsive system.'
      ]
    },
    quiz: [
      {
        id: 'q-mix-1',
        question: 'The 4Ps framework was originally popularised in 1960 by:',
        options: ['Philip Kotler', 'E. Jerome McCarthy', 'Michael Porter', 'Seth Godin'],
        correctAnswer: 1,
        explanation: 'E. Jerome McCarthy organized Borden’s marketing mix variables into the 4Ps in his 1960 book Basic Marketing.'
      },
      {
        id: 'q-mix-2',
        question: 'Which of the following belongs to Booms and Bitner’s 7Ps extension for service businesses?',
        options: ['Profit', 'Process', 'Partnership', 'Performance'],
        correctAnswer: 1,
        explanation: 'The 7Ps service mix adds People, Process, and Physical Evidence to the traditional 4Ps.'
      },
      {
        id: 'q-mix-3',
        question: 'A premium product sold through a deep-discount marketplace with "50% off" ads is an example of:',
        options: ['Good penetration pricing', 'An inconsistent marketing mix', 'Effective promotion', 'Channel conflict only'],
        correctAnswer: 1,
        explanation: 'Price and Product communicate premium quality, while Place and Promotion signal a cheap bargain—creating an internal contradiction.'
      },
      {
        id: 'q-mix-4',
        question: 'Which strategic process must be completed before the marketing mix can be designed properly?',
        options: ['AIDA messaging', 'Net Promoter Score', 'STP (Segmentation, Targeting, Positioning)', 'Growth hacking experiments'],
        correctAnswer: 2,
        explanation: 'STP decides whom you serve and how you are positioned; the 4Ps is the tactical implementation of that positioning.'
      },
      {
        id: 'q-mix-5',
        question: 'Lauterborn’s 4Cs (Customer solution, Cost, Convenience, Communication) are useful because they:',
        options: ['Replace the 4Ps permanently', 'View the controllable levers from the customer’s perspective', 'Apply only to pure digital businesses', 'Automatically calculate marketing budgets'],
        correctAnswer: 1,
        explanation: 'The 4Cs restate each P from the buyer’s viewpoint to prevent insular, product-centric thinking.'
      }
    ]
  },
  {
    id: 'stp',
    name: 'STP Model (Segmentation, Targeting, Positioning)',
    shortName: 'STP Model',
    category: 'Marketing & Growth',
    tagline: 'Segment the market, target the right customers, and position your brand indelibly in their minds',
    origin: 'Philip Kotler formalized the STP sequence in marketing management; Al Ries and Jack Trout popularized Positioning (1981).',
    corePurpose: 'To stop an organization from trying to be everything to everyone by selecting high-fit customer groups and establishing a sharp, repeatable point of difference.',
    primaryUsers: ['Founders', 'Chief Marketing Officers', 'Strategists', 'Agencies', 'Product Managers'],
    difficulty: 'Beginner-Intermediate',
    horizon: '1–3 years / Go-to-market strategy',
    scope: 'Total addressable market / Business unit / New product line',
    timeToResult: '3–6 weeks',
    dataNeeds: 'Customer sales data, interviews, CRM fields, competitor positioning',
    keyOutput: 'Segment profiles, weighted targeting scorecard, positioning statement, perceptual map',
    bestPairedWith: 'Jobs To Be Done & VPC (upstream), Marketing Mix (4Ps) & AIDA (downstream)',
    keyFeatures: [
      'Three-stage sequential logic: Segment (divide) → Target (choose) → Position (message)',
      'Multiple segmentation bases: Demographic, Geographic, Psychographic, and Behavioural/Needs-based',
      'Weighted Targeting Scorecard assessing segment size, growth, margin, competition, and capability fit',
      'Standardized Positioning Statement format: For [Target], [Brand] is the [Category] that [POD] because [Proof]',
      'Two-axis Perceptual Mapping to identify uncrowded, highly valued market positions'
    ],
    howItWorks: 'Divide the market using behavioral and needs-based variables. Filter candidate segments against the 5 criteria: measurable, substantial, accessible, differentiable, and actionable. Evaluate targets using a weighted scorecard. For the winning segment, identify category frame of reference, points of parity (POP), and points of difference (POD). Draft a one-sentence positioning statement and plot on a perceptual map.',
    coreConcepts: [
      {
        term: 'Needs-Based Segmentation',
        definition: 'Grouping customers by the specific outcome or problem they seek to solve rather than just demographic attributes.'
      },
      {
        term: 'Point of Difference (POD)',
        definition: 'The unique, compelling benefit that sets your brand apart from all direct and indirect alternatives.'
      },
      {
        term: 'Point of Parity (POP)',
        definition: 'Legitimate table-stakes features a brand must match so customers consider it a credible option in the category.'
      },
      {
        term: 'Perceptual Map',
        definition: 'A visual two-axis grid comparing competitor brands on the two primary buying criteria customers care most about.'
      }
    ],
    strengths: [
      'Focuses finite sales and marketing capital on the highest-margin, highest-win-rate customers',
      'Provides a memorable, one-sentence positioning statement that sales reps can repeat word-for-word',
      'Prevents brand dilution and wasteful scattershot advertising'
    ],
    limitations: [
      'Boardroom guesswork without customer interview data creates fictional, ineffective segments',
      'Segments naturally drift over time and require re-evaluation every 12–18 months',
      'Over-segmenting into micro-niches can create segments too small to support company overhead'
    ],
    workflowPlacement: {
      upstream: 'PESTLE, Porter’s Five Forces, Jobs To Be Done, Value Proposition Canvas',
      downstream: 'Marketing Mix (4Ps/7Ps), AIDA copy briefs, sales territory design, customer personas'
    },
    useCases: [
      {
        title: 'PhD Technical Research-Support Service',
        industry: 'Professional Services',
        situation: 'Firm targeting "all PhD students" received low-budget, price-sensitive inquiries from humanities.',
        action: 'Segmented by discipline and funding. Targeted 3rd-year part-time engineering scholars facing thesis deadlines.',
        outcome: 'Positioned as "deadline-safe technical research support", doubling conversion rate on lower lead volume.'
      },
      {
        title: 'B2B Logistics SaaS Targeting',
        industry: 'Software / Technology',
        situation: 'Generic workflow software pitching all SMEs had high trial volume but sub-2% paid conversion.',
        action: 'Analyzed converters: 60% were logistics fleets with 20–200 drivers. Targeted fleet dispatchers with traffic-aware rerouting.',
        outcome: 'Positioned as the dedicated dispatcher tool; trial-to-paid conversion tripled.'
      }
    ],
    caseStudy: {
      company: 'Suvai Foods',
      revenue: '₹6 crore turnover',
      staff: '25 employees',
      profile: 'Madurai-based maker of ready-to-cook South Indian breakfast mixes selling via regional supermarkets.',
      challenge: 'Annual revenue growth was stuck at 4%. TV advertising generated awareness but negligible sales lift; shoppers viewed products as identical to national brands.',
      whyChosen: 'Company had never clearly decided who it was serving or why a shopper should pay a premium over national conglomerate mixes.',
      steps: [
        'Analyzed 12 months of SKU sales and conducted a 400-shopper survey across three cities plus 20 in-home interviews.',
        'Identified two standout segments: (a) Dual-income urban families wanting authentic stone-ground taste in <15 minutes; (b) Hostel students wanting cheap calories.',
        'Evaluated targets on margin and competitive intensity: Segment (a) bought weekly at premium prices, while (b) was price-sensitive.',
        'Selected concentrated targeting on busy urban families for the core brand.',
        'Formulated positioning statement: "For busy families who refuse to compromise on home-style taste, Suvai is the breakfast mix that tastes like amma’s kitchen because it uses stone-ground batter and no preservatives."',
        'Plotted perceptual map (Authenticity vs. Convenience); discovered national brands clustered on convenience, leaving authentic+convenient empty.'
      ],
      results: [
        'Annual revenue growth accelerated from 4% to 21% in 18 months.',
        'Average selling price rose 12% with zero volume loss in the targeted family segment.',
        'Marketing spend shifted from broadcast TV to in-store tasting and parenting communities, slashing acquisition cost by 40%.'
      ],
      lessonsLearned: [
        'Customer interview insights outweighed broad mass-media reach.',
        'Targeting a narrower segment gave the brand pricing power and distributor shelf leverage.'
      ]
    },
    quiz: [
      {
        id: 'q-stp-1',
        question: 'What is the correct logical sequence of the STP strategic process?',
        options: ['Positioning → Segmentation → Targeting', 'Segmentation → Targeting → Positioning', 'Targeting → Segmentation → Positioning', 'Segmentation → Positioning → Targeting'],
        correctAnswer: 1,
        explanation: 'You first divide the market (Segmentation), select the best group(s) to serve (Targeting), and finally craft the brand perception (Positioning).'
      },
      {
        id: 'q-stp-2',
        question: 'Which segmentation base is universally considered the most predictive of customer buying behavior?',
        options: ['Age and demographics', 'Needs and benefits sought', 'Postal code and geography', 'Gender and marital status'],
        correctAnswer: 1,
        explanation: 'Grouping by the outcome or benefit sought links directly to the product offer and marketing message.'
      },
      {
        id: 'q-stp-3',
        question: 'When a company chooses to focus entirely on one distinct, high-margin customer segment with a tailored offer, it is using:',
        options: ['Undifferentiated mass marketing', 'Differentiated multi-segment targeting', 'Concentrated (niche) targeting', 'Cost leadership marketing'],
        correctAnswer: 2,
        explanation: 'Concentrated (niche) targeting dedicates resources to winning one specific customer segment.'
      },
      {
        id: 'q-stp-4',
        question: 'In positioning theory, what is a "Point of Parity" (POP)?',
        options: ['The unique advantage that beats all competitors', 'A standard category feature you must match to be considered a viable alternative', 'A legally protected trademark', 'A price discount matched across retailers'],
        correctAnswer: 1,
        explanation: 'Points of Parity are the necessary category table-stakes required for customer consideration.'
      },
      {
        id: 'q-stp-5',
        question: 'Which of the following is NOT one of the 5 classic criteria for a usable market segment?',
        options: ['Measurable', 'Accessible', 'Profitable for competitors', 'Actionable'],
        correctAnswer: 2,
        explanation: 'The classic Kotler criteria are Measurable, Substantial, Accessible, Differentiable, and Actionable.'
      }
    ]
  },
  {
    id: 'aida',
    name: 'AIDA Model (Attention, Interest, Desire, Action)',
    shortName: 'AIDA Model',
    category: 'Marketing & Growth',
    tagline: 'Structure messages that guide prospects from Attention through Interest and Desire to Action',
    origin: 'E. St. Elmo Lewis (1898–1900), the foundational blueprint of persuasive communication and direct marketing.',
    corePurpose: 'To ensure every advertisement, landing page, sales script, or email systematically performs four sequential jobs without dropping the prospect.',
    primaryUsers: ['Copywriters', 'Marketers', 'Sales teams', 'Admissions counselors', 'Founders'],
    difficulty: 'Beginner',
    horizon: 'Per message / Campaign execution / Sales call',
    scope: 'Ad / Landing page / Email / Sales conversation',
    timeToResult: 'Same day',
    dataNeeds: 'Customer pain points, proof assets (testimonials, data), single clear call to action',
    keyOutput: 'Structured high-converting copy with AIDA stage scores and friction audit',
    bestPairedWith: 'STP & 4Ps Promotion (upstream), A/B testing & Growth Hacking (downstream)',
    keyFeatures: [
      'Four linked steps: Attention (hook) → Interest (problem relevance) → Desire (benefits & proof) → Action (low-friction CTA)',
      'AIDA Diagnostic Scorecard (1–5 per stage) identifying exactly where messaging leaks conversions',
      'Proof and Objection integration in the Desire stage (guarantees, metrics, client case stories)',
      'Friction audit for Call to Action (removing superfluous fields, specifying immediate next step)',
      'Sales-call cue card application for live telephone counseling and consultative selling'
    ],
    howItWorks: 'Draft messages backward: define the single desired Action first. Next, write the Desire section combining outcome-based benefits, proof points, and objection counters. Then, write Interest reflecting the prospect’s daily reality in their own words. Finally, craft the Attention hook targeting the specific audience. Audit readability and remove all competing CTAs.',
    coreConcepts: [
      {
        term: 'Hook (Attention)',
        definition: 'The headline, thumbnail, or opening sentence designed to stop the target reader by naming their urgent problem or a compelling fact.'
      },
      {
        term: 'Relevance (Interest)',
        definition: 'Demonstrating deep empathy with the reader’s current pain so they feel understood before introducing any solution.'
      },
      {
        term: 'Proof Assets (Desire)',
        definition: 'Verifiable evidence (customer metrics, testimonials, accreditations) proving the transformation claim is genuine.'
      },
      {
        term: 'Action Friction',
        definition: 'Any obstacle, ambiguity, or excessive form field that slows down the user from completing the primary CTA.'
      }
    ],
    strengths: [
      'Provides a universal, highly memorable structure that instantly sharpens fuzzy marketing copy',
      'Diagnoses exactly why an ad or email underperformed (e.g. high open rate + zero clicks = Interest/Desire failure)',
      'Applies equally well to 30-second video hooks, cold sales emails, or 40-minute pitch meetings'
    ],
    limitations: [
      'Linear model: does not natively represent circular loyalty, repeat subscriptions, or referral loops',
      'Can feel mechanical or pushy if executed without authentic customer language and proof',
      'Assumes the target audience has already been accurately identified by STP'
    ],
    workflowPlacement: {
      upstream: 'STP target personas, Marketing Mix promotion decisions, customer interview verbatims',
      downstream: 'A/B testing, email automation, landing page optimization, sales cue cards'
    },
    useCases: [
      {
        title: 'B2B IT Onboarding Cold Email',
        industry: 'B2B Software',
        situation: 'Cold outreach emails to HR heads listed software features; reply rates were under 0.8%.',
        action: 'Restructured in AIDA: Hook on 90-day ramp delays; Interest on spreadsheet onboarding pain; Desire on 30% faster ramp at client; Action on 15-min call.',
        outcome: 'Positive reply rate jumped from 0.8% to 5.2%.'
      },
      {
        title: 'Education Course Landing Page Overhaul',
        industry: 'EdTech / Professional Training',
        situation: 'Course page displayed full technical syllabus with a 2% inquiry rate.',
        action: 'Rewrote with AIDA: Headline on career outcome; Interest with student dilemmas; Desire with alumni salaries & guarantee; Action with 1-click WhatsApp.',
        outcome: 'Student inquiry rate tripled to 6.4%.'
      }
    ],
    caseStudy: {
      company: 'Placement Pro',
      revenue: '₹9 crore revenue',
      staff: '40 staff',
      profile: 'Chennai career-skills institute running aptitude and interview preparation for final-year college students across 60 institutions.',
      challenge: 'Direct-to-student online course had an abysmal 1.1% conversion rate from webinar attendees to paid enrollments against an internal target of 5%. Webinar attendance was high, meaning follow-up messaging was failing.',
      whyChosen: 'Marketing audit revealed post-webinar follow-up emails and sales call scripts jumped immediately from a greeting to a price discount announcement without building desire.',
      steps: [
        'Mapped five-part email sequence and admissions counselor call script against the 4 AIDA stages.',
        'Attention: Rewrote email subject lines to tap into core fear: "The first interview round rejects 70% — here’s why".',
        'Interest: Added vivid depictions of the actual placement day test room stress.',
        'Desire: Inserted verified alumni job offers with company names and compensation, plus a "clear round 1 or retrain free" guarantee.',
        'Action: Replaced vague "Enroll Now" buttons with a low-friction calendar CTA: "Book your 15-minute diagnostic call".',
        'Sales enablement: Equipped counselors with a 1-page AIDA call cue card and ran roleplay drills.'
      ],
      results: [
        'Webinar-to-enrollment conversion surged from 1.1% to 4.6% in 8 weeks.',
        'Email click-through rate doubled and phone call booking rates tripled.',
        'Cost per paid enrollment dropped by 60% without increasing top-of-funnel ad spend.'
      ],
      lessonsLearned: [
        'Attention was never the bottleneck; lack of verifiable proof (Desire) and high friction (Action) were.',
        'A formal risk-reversal guarantee outperformed generic price discounts.'
      ]
    },
    quiz: [
      {
        id: 'q-aida-1',
        question: 'What does the acronym AIDA stand for in marketing communication?',
        options: ['Awareness, Information, Decision, Advocacy', 'Attention, Interest, Desire, Action', 'Audience, Insight, Design, Approval', 'Attract, Inform, Deliver, Assess'],
        correctAnswer: 1,
        explanation: 'AIDA stands for Attention, Interest, Desire, and Action, describing the psychological stages of persuasion.'
      },
      {
        id: 'q-aida-2',
        question: 'Who is historically credited with developing the AIDA model around the turn of the 20th century?',
        options: ['David Ogilvy', 'E. St. Elmo Lewis', 'Philip Kotler', 'Claude Hopkins'],
        correctAnswer: 1,
        explanation: 'American advertising pioneer E. St. Elmo Lewis articulated the sequence around 1898–1900.'
      },
      {
        id: 'q-aida-3',
        question: 'In an AIDA landing page, where do client testimonials, performance metrics, and guarantees primarily belong?',
        options: ['Attention stage', 'Interest stage', 'Desire stage', 'Action stage'],
        correctAnswer: 2,
        explanation: 'Desire is built by translating features into benefits and proving credibility with social proof, metrics, and guarantees.'
      },
      {
        id: 'q-aida-4',
        question: 'A promotional webpage that presents three competing buttons ("Download App", "Schedule Call", "Subscribe") most critically fails which stage?',
        options: ['Attention', 'Interest', 'Desire', 'Action'],
        correctAnswer: 3,
        explanation: 'Multiple competing calls to action cause decision paralysis and friction, weakening the Action stage.'
      },
      {
        id: 'q-aida-5',
        question: 'Which of the following is a recognized structural limitation of the AIDA model?',
        options: ['It cannot be used for email newsletters', 'It is linear and does not model post-purchase retention or word-of-mouth loops', 'It only works in B2B enterprise software', 'It requires expensive proprietary software to implement'],
        correctAnswer: 1,
        explanation: 'AIDA ends at the initial transaction and does not account for customer onboarding, retention, or referral loops.'
      }
    ]
  },
  {
    id: 'journeymap',
    name: 'Customer Journey Mapping',
    shortName: 'Customer Journey Mapping',
    category: 'Marketing & Growth',
    tagline: 'Visualize every step, touchpoint, emotion, and pain point across the end-to-end customer experience',
    origin: 'Pioneered through service design and Lynn Shostack’s service blueprinting (Harvard Business Review, 1984).',
    corePurpose: 'To see the complete customer experience from the outside in—across departments, channels, and timelines—revealing the moments of truth where loyalty is won or churn is triggered.',
    primaryUsers: ['Customer Experience (CX) leads', 'Product managers', 'Operations heads', 'Marketing teams', 'Service designers'],
    difficulty: 'Intermediate',
    horizon: 'Ongoing customer experience / Product onboarding redesign',
    scope: 'End-to-end customer lifecycle / Key customer persona',
    timeToResult: '3–5 weeks',
    dataNeeds: 'Support tickets, user interviews, call recordings, website analytics, churn logs',
    keyOutput: 'Current and future-state journey maps with emotion curve, moments of truth, and service blueprint',
    bestPairedWith: 'Jobs To Be Done & STP (upstream), NPS & Process Redesign (downstream)',
    keyFeatures: [
      'Multi-stage lifecycle: Awareness → Enquiry → Enrol/Buy → First Week/Onboarding → Use → Completion → Advocacy',
      'Parallel analytical lanes: Customer Actions, Touchpoints, Thoughts, Emotions (1–5 curve), Pain Points, Opportunities',
      'Moments of Truth identification: highlighting critical steps where experience disproportionately shapes brand retention',
      'Pain Point Prioritization Matrix: ranking issues by Frequency × Severity × Business Impact vs. Cost to fix',
      'Service Blueprint extension: connecting frontstage interactions with backstage staff workflows and IT support systems'
    ],
    howItWorks: 'Choose one target persona and explicit goal. Define chronological stages from the customer’s viewpoint, not departmental silos. Populate parallel lanes using real evidence from support tickets and customer interviews. Plot the emotional curve to locate critical dips. Rank pain points on frequency and business impact. Design the future-state map and service blueprint with assigned stage metrics.',
    coreConcepts: [
      {
        term: 'Moment of Truth',
        definition: 'A pivotal touchpoint where a positive or negative experience disproportionately cements the customer’s decision to stay or churn.'
      },
      {
        term: 'Emotion Curve',
        definition: 'A visual trajectory showing customer confidence, delight, or frustration across sequential lifecycle stages.'
      },
      {
        term: 'Service Blueprint',
        definition: 'An operational map linking the customer’s journey directly to backstage employee actions, IT systems, and vendor handovers.'
      },
      {
        term: 'Evidence Gate',
        definition: 'The strict rule that no pain point or emotion rating is entered without supporting tickets, recordings, or user quotes.'
      }
    ],
    strengths: [
      'Breaks down departmental silos by forcing cross-functional teams to examine the unified customer reality',
      'Identifies inexpensive operational fixes with massive emotional payoffs (e.g. automated payment receipts, orientation calls)',
      'Provides a contextual home for NPS verbatim feedback and churn prevention initiatives'
    ],
    limitations: [
      'Maps created in boardroom workshops without actual customer data become speculative fiction',
      'Requires separate journey maps for distinct personas with fundamentally different goals',
      'Can turn into decorative wall posters if leadership fails to assign owners and budgets to prioritized pain points'
    ],
    workflowPlacement: {
      upstream: 'STP personas, Jobs To Be Done interviews, NPS verbatims, customer support logs',
      downstream: 'Process redesign SOPs, onboarding automation, product backlog, stage-level CSAT/NPS'
    },
    useCases: [
      {
        title: 'Online Upskilling Course Churn Reduction',
        industry: 'EdTech',
        situation: '45% of learners dropped out in week 2. Marketing blamed curriculum quality; academics blamed lead quality.',
        action: 'Journey mapping revealed the emotion curve plummeted at the first assignment due to login and submission confusion.',
        outcome: 'Added 5-minute LMS walkthrough video and 24-hr tutor feedback rule, cutting early dropout by half.'
      },
      {
        title: 'Outpatient Clinic Patient Satisfaction',
        industry: 'Healthcare Services',
        situation: 'Doctors had top clinical ratings but overall hospital Google reviews were 3.4 stars.',
        action: 'Mapped patient journey: identified acute friction at registration desk queues and delayed discharge billing.',
        outcome: 'Introduced digital pre-registration and clear itemized billing, raising patient review ratings.'
      }
    ],
    caseStudy: {
      company: 'LearnBridge Academy',
      revenue: '₹5 crore revenue',
      staff: '35 staff',
      profile: 'Madurai IT-training institute educating 1,200 adult learners annually across classroom and online programs.',
      challenge: 'Net Promoter Score had dropped from 48 to 22 in twelve months despite hiring seasoned trainers and renovating labs. Reviews praised teaching but complained about general disorganization.',
      whyChosen: 'Operations head proposed mapping the entire student journey for the core working-professional persona to pinpoint exactly where handovers were breaking.',
      steps: [
        'Formed cross-functional team: admissions, faculty, placement, accounts, support, and an active alumnus.',
        'Mapped eight lifecycle stages from "Sees LinkedIn Ad" through "Refers a Friend".',
        'Collected ground evidence: 25 student interviews, 400 helpdesk tickets, and class feedback logs.',
        'Constructed current-state map with emotion curve; identified three acute Moments of Truth: (a) Enrolment payment (no receipt or login for 5 days), (b) First weekend (zero orientation, lost in LMS), (c) Placement prep (guidance began too late).',
        'Designed service blueprint and automated instant WhatsApp receipts + LMS logins within 60 minutes.',
        'Instituted mandatory 30-minute orientation during session one and assigned personal placement advisors in week 6.'
      ],
      results: [
        'NPS rebounded from 22 to 51 within six months.',
        'Customer support tickets regarding schedules and payment receipts plummeted by 80%.',
        'First-month student dropout fell from 14% to 6%, and word-of-mouth referral enrollments climbed 30%.'
      ],
      lessonsLearned: [
        'Classroom instruction was fine; operational handoffs between siloed departments were destroying customer goodwill.',
        'Objective ticket data was far more convincing to internal department heads than qualitative executive opinions.'
      ]
    },
    quiz: [
      {
        id: 'q-cjm-1',
        question: 'A customer journey map should always be organized around:',
        options: ['The internal hierarchy of company departments', 'The customer’s sequential stages toward accomplishing a goal', 'The quarterly marketing campaign calendar', 'The technical architecture of the product'],
        correctAnswer: 1,
        explanation: 'Journey maps reflect the outside-in customer perspective, organized by their steps rather than internal departments.'
      },
      {
        id: 'q-cjm-2',
        question: 'In customer journey terminology, what is a "Moment of Truth"?',
        options: ['The initial digital impression ad', 'A high-stakes touchpoint that disproportionately determines customer retention or churn', 'The moment of invoice payment only', 'The exit survey when a customer leaves'],
        correctAnswer: 1,
        explanation: 'Moments of truth are pivotal interactions where customer expectations are either fulfilled or broken.'
      },
      {
        id: 'q-cjm-3',
        question: 'What does a Service Blueprint add beneath a customer journey map?',
        options: ['Competitor price benchmarks', 'Frontstage staff actions, backstage processes, and supporting IT systems', 'Social media ad copy', 'Company profit margins'],
        correctAnswer: 1,
        explanation: 'A service blueprint links customer actions to the backstage systems and organizational operations required to deliver them.'
      },
      {
        id: 'q-cjm-4',
        question: 'What is the single most critical prerequisite for a reliable, credible journey map?',
        options: ['Executive consensus without external input', 'Empirical customer evidence (interviews, tickets, call logs, behavioral data)', 'Complex expensive design software', 'A large corporate marketing budget'],
        correctAnswer: 1,
        explanation: 'Without empirical customer evidence, journey maps represent internal assumptions rather than customer reality.'
      },
      {
        id: 'q-cjm-5',
        question: 'How many distinct customer personas should be mapped onto a single journey canvas?',
        options: ['All company customer types combined', 'Exactly one primary persona per journey map', 'At least five distinct buyer profiles', 'Only enterprise B2B purchasing committees'],
        correctAnswer: 1,
        explanation: 'Each distinct persona has unique motivations, touchpoints, and emotions; mixing multiple personas muddies the map.'
      }
    ]
  },
  {
    id: 'growthhacking',
    name: 'Growth Hacking & AARRR Funnel',
    shortName: 'Growth Hacking',
    category: 'Marketing & Growth',
    tagline: 'Accelerate scalable growth through rapid, data-driven experiments across the full AARRR pirate funnel',
    origin: 'Term coined by Sean Ellis (2010); pirate metrics funnel (AARRR) developed by Dave McClure (500 Startups, 2007).',
    corePurpose: 'To replace slow annual marketing plans with a high-velocity weekly experiment loop optimizing acquisition, activation, retention, referral, and revenue as one cross-functional team.',
    primaryUsers: ['Growth leads', 'Founders', 'Product managers', 'Digital marketers', 'Data analysts'],
    difficulty: 'Intermediate-Advanced',
    horizon: 'Weekly experiment sprints / Product growth roadmap',
    scope: 'Whole customer conversion and retention funnel',
    timeToResult: '4–8 weeks to first documented wins',
    dataNeeds: 'Full-funnel telemetry, event tracking, statistical sample sizes, experiment log',
    keyOutput: 'AARRR funnel dashboard, ICE-ranked hypothesis backlog, weekly experiment sprint log',
    bestPairedWith: 'OKRs, Customer Journey Mapping, AIDA (message testing), NPS (guardrail metric)',
    keyFeatures: [
      'Single North Star Metric capturing delivered user value (e.g., Weekly Active Learners)',
      'The AARRR Pirate Funnel: Acquisition → Activation → Retention → Referral → Revenue',
      'ICE Scoring prioritization engine: Impact (1–10) × Confidence (1–10) × Ease (1–10)',
      'Minimum Viable Experiments (MVE) with explicit pre-set duration and decision rules (scale/kill/iterate)',
      'Product-led growth loops: viral coefficient (k-factor) and self-reinforcing referral loops'
    ],
    howItWorks: 'Confirm initial Product-Market Fit (Sean Ellis 40% rule). Define the North Star metric and instrument event tracking across all five AARRR funnel stages. Identify the primary constraint stage. Brainstorm hypotheses in the "If [change], then [metric] improves by [amount] because [insight]" format. Rank with ICE scores. Execute 2–4 minimum viable tests weekly, analyze statistical outcomes, scale winners, and log learnings.',
    coreConcepts: [
      {
        term: 'AARRR Pirate Funnel',
        definition: 'Acquisition (visitors/signups), Activation (first value "aha" moment), Retention (return usage), Referral (invites/advocacy), Revenue (monetization).'
      },
      {
        term: 'North Star Metric',
        definition: 'The single operational metric that best represents the core value delivered to customers and leads forward revenue.'
      },
      {
        term: 'Activation / Aha Moment',
        definition: 'The critical early milestone where a new user first experiences the product’s promised benefit.'
      },
      {
        term: 'ICE Score',
        definition: 'Prioritization calculation multiplying Impact (1–10), Confidence (1–10), and Ease of implementation (1–10).'
      },
      {
        term: 'Viral Coefficient (k)',
        definition: 'The average number of new paying users generated by each existing customer; k > 1.0 creates viral self-sustaining growth.'
      }
    ],
    strengths: [
      'Replaces subjective opinions with rapid empirical testing and measurable business outcomes',
      'Unifies marketing, product development, and engineering behind a single conversion funnel',
      'Uncovers massive growth leverage in retention and onboarding rather than overspending on top-of-funnel ads'
    ],
    limitations: [
      'Cannot fix a product that lacks fundamental Product-Market Fit; accelerates churn as fast as acquisition',
      'Susceptible to statistical false positives if sample sizes are small or tests are stopped prematurely',
      'Risks tempting short-term "dark patterns" (hidden subscriptions, deceptive clicks) that ruin customer trust'
    ],
    workflowPlacement: {
      upstream: 'Product-Market fit validation (VPC/JTBD), STP customer personas, Journey Maps',
      downstream: 'Product roadmaps, AIDA email copy variants, automated referral loops, retention playbooks'
    },
    useCases: [
      {
        title: 'EdTech App Activation Optimization',
        industry: 'Mobile Software',
        situation: 'App generated 10,000 monthly downloads, but only 14% of users completed a first interactive lesson.',
        action: 'Treated Activation as the primary bottleneck. Tested preview lessons without mandatory signup and WhatsApp Day-1 nudges.',
        outcome: 'Activation jumped from 14% to 38%, producing 2.7x more active students without increasing ad budget.'
      },
      {
        title: 'SaaS Referral Loop Architecture',
        industry: 'B2B SaaS',
        situation: 'Subscribers loved the platform but organic word-of-mouth referrals were flat.',
        action: 'Engineered a two-sided credit referral mechanic and auto-generated branded client performance badges.',
        outcome: 'Referrals expanded to drive 22% of total new monthly user registrations.'
      }
    ],
    caseStudy: {
      company: 'SkillSprint',
      revenue: '₹4 crore annual revenue',
      staff: '18 staff',
      profile: 'Chennai-based online training platform offering short tech career courses to 40,000 registered users.',
      challenge: 'Customer acquisition cost (CAC) had escalated 70% in 12 months as digital ad rates rose. Only 22% of registered users completed their first module, and overall paid conversion was stagnant at 3%.',
      whyChosen: 'Management chose to transition from ad-heavy acquisition to a disciplined growth experimentation process focused on funnel conversion bottlenecks.',
      steps: [
        'Set North Star Metric: Weekly active learners completing at least one coding lesson.',
        'Instrumented complete AARRR tracking; identified severe drop-offs at Activation (22%) and Referral (2%).',
        'Created cross-functional Growth Team (Product Lead, Marketer, Fullstack Dev, Data Analyst) meeting weekly for 60 minutes.',
        'Constructed backlog of 40 hypotheses prioritized using ICE scores.',
        'Executed 24 disciplined two-week experiments: micro-lessons, certificate sharing to LinkedIn with referral codes, and peer WhatsApp study pods.',
        'Logged every test in a transparent knowledge repository, scaling seven statistically proven winners directly into core software.'
      ],
      results: [
        'First-module lesson completion (Activation) climbed from 22% to 47%.',
        'Overall paid user conversion rose from 3.0% to 5.4%.',
        'Referral-driven registrations expanded to 21% of new monthly volume, cutting blended CAC by 45%.'
      ],
      lessonsLearned: [
        'Product-led onboarding fixes generated far higher ROI than optimizing external social media ad campaigns.',
        'Failed tests provided critical insights; strict adherence to weekly testing cadence was the true driver of growth.'
      ]
    },
    quiz: [
      {
        id: 'q-gh-1',
        question: 'Who originally introduced the "AARRR" pirate metrics funnel in 2007?',
        options: ['Sean Ellis', 'Dave McClure', 'Eric Ries', 'Brian Balfour'],
        correctAnswer: 1,
        explanation: 'Dave McClure (founder of 500 Startups) introduced the AARRR pirate metrics model in his 2007 presentation.'
      },
      {
        id: 'q-gh-2',
        question: 'In the AARRR funnel, what does "Activation" refer to?',
        options: ['Launching the paid Google Ads campaign', 'The user’s initial "aha" moment experiencing the core value of the product', 'Renewing an annual software contract', 'Hiring an outsourced growth agency'],
        correctAnswer: 1,
        explanation: 'Activation is when a newly acquired user experiences the core product value for the first time.'
      },
      {
        id: 'q-gh-3',
        question: 'In growth experimentation, what does the ICE prioritization score stand for?',
        options: ['Innovation, Cost, Effort', 'Impact, Confidence, Ease', 'Insight, Channel, Execution', 'Intent, Conversion, Engagement'],
        correctAnswer: 1,
        explanation: 'ICE stands for Impact, Confidence, and Ease, scored on a 1–10 scale to prioritize backlog tests.'
      },
      {
        id: 'q-gh-4',
        question: 'A viral coefficient (k-factor) greater than 1.0 mathematically indicates:',
        options: ['The product is experiencing accelerating churn', 'Each active user brings more than one new user, driving exponential viral growth', 'Paid advertising is unprofitable', 'User retention is below industry average'],
        correctAnswer: 1,
        explanation: 'When k > 1.0, every user brings in more than one replacement user, creating self-sustaining viral growth.'
      },
      {
        id: 'q-gh-5',
        question: 'Growth hacking processes are most likely to fail disastrously when:',
        options: ['The team maintains a disciplined weekly meeting', 'The product lacks genuine Product-Market Fit', 'Experiments are carefully documented in a log', 'The North Star metric is directly tied to customer value'],
        correctAnswer: 1,
        explanation: 'Without product-market fit, growth hacking merely accelerates customer churn and exposes product weaknesses.'
      }
    ]
  },
  {
    id: 'nps',
    name: 'Net Promoter Score (NPS)',
    shortName: 'Net Promoter Score (NPS)',
    category: 'Marketing & Growth',
    tagline: 'Measure customer loyalty with the ultimate question and drive retention through closed-loop feedback',
    origin: 'Fred Reichheld (Bain & Company, Harvard Business Review, 2003: "The One Number You Need to Grow").',
    corePurpose: 'To provide leadership with a clear metric of customer loyalty and establish a disciplined inner and outer loop process that turns customer feedback into operational improvements and referrals.',
    primaryUsers: ['Leadership teams', 'Customer Success leads', 'CX managers', 'Operations heads', 'Marketing teams'],
    difficulty: 'Beginner-Intermediate',
    horizon: 'Continuous operational monitoring / Quarterly relationship reviews',
    scope: 'Enterprise customer base / Branch network / Product lines',
    timeToResult: 'One survey cycle (2–4 weeks)',
    dataNeeds: 'Consented customer contacts, survey delivery tool, designated loop-closers',
    keyOutput: 'NPS score (-100 to +100), driver analysis matrix, closed-loop resolution log',
    bestPairedWith: 'Customer Journey Mapping (upstream touchpoints), AIDA & Growth Hacking (downstream proof & referrals)',
    keyFeatures: [
      'The Ultimate 0–10 Question: "How likely are you to recommend us to a friend or colleague?"',
      'Customer classification: Promoters (9–10), Passives (7–8), and Detractors (0–6)',
      'NPS Calculation formula: % Promoters minus % Detractors (ranges from -100 to +100)',
      'Mandatory qualitative "Why?" open-text follow-up capturing the operational root cause',
      'Dual Closed Loop: Inner Loop (calling detractors in 48 hrs) and Outer Loop (monthly systemic fixes)'
    ],
    howItWorks: 'Deploy the 0–10 recommendation question alongside an open-text "Why?" prompt at suitable moments (quarterly relationship surveys or post-transaction events). Categorize responses: subtract % Detractors from % Promoters. Code open-text answers into driver themes. Mandate that account managers or service leads contact all detractors within 48 hours to resolve grievances. Convene monthly leadership outer-loop reviews to fund permanent systemic fixes.',
    coreConcepts: [
      {
        term: 'Promoters (9–10)',
        definition: 'Loyal enthusiasts who keep buying, refer others, and fuel organic business growth.'
      },
      {
        term: 'Passives (7–8)',
        definition: 'Satisfied but unenthusiastic customers vulnerable to competitive offerings; excluded from the net score.'
      },
      {
        term: 'Detractors (0–6)',
        definition: 'Unhappy customers trapped in bad experiences who account for high support costs and spread negative word-of-mouth.'
      },
      {
        term: 'Inner Closed Loop',
        definition: 'The immediate 48-hour individual follow-up conversation between a staff member and an unhappy customer to resolve their problem.'
      },
      {
        term: 'Outer Closed Loop',
        definition: 'The monthly cross-functional leadership review that analyzes verbatim drivers and funds systemic fixes to prevent recurring complaints.'
      }
    ],
    strengths: [
      'Single, easily communicated metric that boards, frontline staff, and executives instantly grasp',
      'The accompanying "Why?" question converts a vanity number into an actionable operational roadmap',
      'Directly links customer sentiment to business economics: Promoters have higher LTV and lower support costs'
    ],
    limitations: [
      'A score alone without verbatim driver analysis or closed-loop follow-up is merely a vanity metric',
      'Frontline staff can game the system ("Please give me a 10") if bonuses are tied to the raw score rather than follow-up completion',
      'Small sample sizes produce high statistical margins of error that can mislead quarterly comparisons'
    ],
    workflowPlacement: {
      upstream: 'Customer Journey Mapping (identifying survey points), CRM customer segmentation',
      downstream: 'Service recovery procedures, product defect resolutions, promoter testimonial generation'
    },
    useCases: [
      {
        title: 'B2B Managed Cloud Churn Intervention',
        industry: 'IT Services',
        situation: '19% annual client churn with exit interviews citing vague reasons like "found cheaper options".',
        action: 'Deployed quarterly relationship NPS with a strict 48-hr executive call rule for all detractors.',
        outcome: 'Uncovered hidden support delays and billing confusion; saved 11 out of 16 at-risk accounts, halving churn.'
      },
      {
        title: 'Diagnostic Lab Experience Overhaul',
        industry: 'Healthcare Services',
        situation: 'Patient Google ratings were falling; management did not know which operational step caused the issue.',
        action: 'Sent SMS transactional NPS 24 hours after home blood sample visits with root-cause driver tracking.',
        outcome: 'Discovered report delivery delays and unreadable bills were driving low scores; fixed workflows.'
      }
    ],
    caseStudy: {
      company: 'NexaCloud Solutions',
      revenue: '₹12 crore revenue',
      staff: '60 staff',
      profile: 'Madurai-based IT services SME providing managed cloud infrastructure and cybersecurity to 140 enterprise clients.',
      challenge: 'Annual client churn had risen to 19%. Sales attributed losses to aggressive competitor pricing, while technical teams insisted support was exceptional. No structured feedback system existed.',
      whyChosen: 'The CEO wanted an objective customer loyalty metric combined with a mandatory process to catch and resolve client grievances before contract renewal dates.',
      steps: [
        'Constructed a quarterly relationship NPS survey sent to both the CIO (economic buyer) and daily system admin (end user).',
        'Instituted transactional NPS SMS survey triggered within 24 hours of closing major support tickets.',
        'Established strict Inner Loop protocol: Account managers call detractors within 48 hours; CEO calls clients scoring 0–3.',
        'Coded verbatim feedback into operational driver categories: Response Time, Escalation Handling, Billing Clarity, and Proactive Guidance.',
        'Established monthly Outer Loop leadership review to fund infrastructure improvements.',
        'Tied 20% of account managers’ bonuses to closed-loop completion rate (documented calls) rather than raw NPS scores.'
      ],
      results: [
        'Relationship NPS improved from +18 to +46 over 12 months.',
        'Annual client churn dropped from 19% down to 9%; 11 of 16 detractor accounts renewed after personal intervention.',
        'Primary detractor complaint shifted from "slow response" to "need more architectural advice"—proving foundational operational issues were solved.',
        '14 delighted promoter clients provided public case studies, unlocking 7 new enterprise client wins via referrals.'
      ],
      lessonsLearned: [
        'The qualitative "Why?" question and rapid 48-hour call mattered infinitely more than the score itself.',
        'Incentivizing closed-loop call execution rather than raw scores prevented employee score-begging and gaming.'
      ]
    },
    quiz: [
      {
        id: 'q-nps-1',
        question: 'Who originally introduced the Net Promoter Score framework in a 2003 Harvard Business Review article?',
        options: ['Philip Kotler', 'Fred Reichheld', 'Sean Ellis', 'Peter Drucker'],
        correctAnswer: 1,
        explanation: 'Fred Reichheld of Bain & Company introduced the metric in his seminal HBR article "The One Number You Need to Grow".'
      },
      {
        id: 'q-nps-2',
        question: 'In standard NPS methodology, respondents who answer 7 or 8 on the 0–10 recommendation scale are classified as:',
        options: ['Promoters', 'Passives', 'Detractors', 'Neutral Exclusions'],
        correctAnswer: 1,
        explanation: 'Respondents scoring 7 or 8 are Passives. They are counted in the total respondent base but do not contribute to the net score.'
      },
      {
        id: 'q-nps-3',
        question: 'If a survey receives 50% Promoters, 30% Passives, and 20% Detractors, what is the Net Promoter Score?',
        options: ['+50', '+30', '+20', '+80'],
        correctAnswer: 1,
        explanation: 'NPS = % Promoters (50) minus % Detractors (20) = +30.'
      },
      {
        id: 'q-nps-4',
        question: 'What is the most critical companion element that must accompany the standard 0–10 recommendation rating?',
        options: ['A discount coupon code', 'The open-text "Why did you give this score?" diagnostic question', 'A customer demographic questionnaire', 'A social media share button'],
        correctAnswer: 1,
        explanation: 'The open-text "Why?" question turns an isolated number into an actionable diagnosis of customer drivers.'
      },
      {
        id: 'q-nps-5',
        question: 'Which organizational behavior is universally recognized as the most destructive to an authentic NPS program?',
        options: ['Calling detractors within 48 hours', 'Frontline staff coaching or begging customers to give them a 10', 'Reporting the sample size alongside the score', 'Segmenting NPS results by branch or product line'],
        correctAnswer: 1,
        explanation: 'Score coaching destroys the integrity of the customer sentiment signal and undermines trust.'
      }
    ]
  }
];

export const CATEGORY_3_STACKS: StrategyStack[] = [
  {
    id: 'stack-cat3-a',
    name: 'Stack A — Startup (0–20 people, First 18 Months)',
    targetOrg: 'Seed founders, early-stage startups, bootstrapped product teams',
    recommendedChain: ['stp', 'vpc', 'marketingmix', 'aida', 'growthhacking', 'nps'],
    cadence: {
      quarterly: '4Ps reviewed quarterly; STP updated on major strategic pivots; transactional NPS ongoing',
      annually: 'Comprehensive go-to-market review and pricing adjustments based on LTV:CAC ratios',
      every23Years: 'Core category positioning and business model re-evaluation'
    },
    whyItFits: 'Startups have finite cash runway and cannot afford unfocused advertising. STP and 4Ps clarify the core offer, AIDA ensures landing page conversions, and growth experiments uncover cheap acquisition loops.',
    whatToSkip: 'Skip complex multi-department service blueprints and expensive enterprise CX survey suites.'
  },
  {
    id: 'stack-cat3-b',
    name: 'Stack B — Growing SME (20–200 people, Multiple Products/Branches)',
    targetOrg: 'Established SMEs, multi-branch service institutes, scaling B2B businesses',
    recommendedChain: ['stp', 'marketingmix', 'journeymap', 'nps', 'aida', 'growthhacking'],
    cadence: {
      quarterly: 'Relationship NPS surveys by branch/product; 7Ps quarterly service reviews; digital funnel experiment sprints',
      annually: 'Full STP review per product line; Customer Journey Map update for core customer persona',
      every23Years: 'Brand portfolio repositioning and channel restructuring'
    },
    whyItFits: 'Scaling firms face handover friction between sales, delivery, and support. Journey mapping and NPS make cross-department handoffs visible, while 7Ps ensure consistent service standards across branches.',
    whatToSkip: 'Avoid over-segmenting into micro-niches that require separate dedicated marketing teams.'
  },
  {
    id: 'stack-cat3-c',
    name: 'Stack C — Enterprise & Multi-Segment Institution (200+ people)',
    targetOrg: 'Large enterprise corporations, university networks, multi-division groups',
    recommendedChain: ['stp', 'marketingmix', 'journeymap', 'nps', 'aida', 'growthhacking'],
    cadence: {
      quarterly: 'Monthly Outer-Loop NPS governance; quarterly AARRR product team metrics; journey stage audits',
      annually: 'Enterprise-wide marketing mix and marketing budget allocation aligned with corporate OKRs',
      every23Years: 'Comprehensive perceptual mapping across all competitive categories'
    },
    whyItFits: 'Enterprises require robust governance and brand consistency across diverse units. Perceptual maps maintain brand differentiation, while structured NPS outer-loop meetings fund systemic customer experience fixes.',
    whatToSkip: 'Do not allow regional branch managers to modify corporate positioning statements without executive sign-off.'
  }
];

export const CATEGORY_3_SCENARIOS: ScenarioMission[] = [
  {
    id: 'diagnostic-chain-home-collection',
    title: 'The Diagnostic Lab Home Collection Crisis',
    role: 'Marketing Head',
    companyContext: 'Regional chain of diagnostic medical laboratories facing falling walk-in test volumes due to app-based competitors offering home sample collection at steep discounts.',
    crisisPrompt: 'Walk-in laboratory footfall has declined 16%. The CEO insists on slashing all diagnostic test prices by 25% to match app aggregators. What is your marketing mix move?',
    targetTools: ['marketingmix'],
    options: [
      {
        id: 'opt-1',
        label: 'Immediately cut all lab test prices by 25% across the board and run newspaper discount ads',
        toolUsed: 'Single-lever price panic',
        explanation: 'Destroys operating margins while failing to address the fundamental shift in customer buying convenience.',
        isOptimal: false,
        rubricPoints: 6
      },
      {
        id: 'opt-2',
        label: 'Resist price cuts alone: upgrade Product (home collection + doctor report calls), Place (booking app + local clinics), and 7Ps People/Process',
        toolUsed: 'Marketing Mix (4Ps & 7Ps) Alignment',
        explanation: 'Masterful strategic leadership! Re-evaluates the complete 7Ps mix: home visits for elderly patients, trusted doctor-reviewed reports, clean uniform phlebotomists (Physical Evidence), and bundle pricing that protects margins.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Ban app competitors from parking near lab premises and file trade complaints',
        toolUsed: 'Defensive deflection',
        explanation: 'Fails to solve the customer’s desire for convenience and burns goodwill.',
        isOptimal: false,
        rubricPoints: 2
      }
    ],
    modelAnswer: 'Resist changing Price in isolation. Re-examine the complete marketing mix for the target segment: families caring for elderly parents who value diagnostic accuracy and convenience over bargain basement testing. Product: introduce certified home sample collection and doctor-explained telephone summaries. Place: launch a simple booking app and partner with neighborhood clinics. Promotion: shift marketing spend from mass print to doctor referral networks and WhatsApp reminders. People & Process: train phlebotomists in patient empathy and sterile hygiene (Physical Evidence). Maintain premium pricing justified by superior service, offering bundled family wellness checks rather than margin-destroying discounts.',
    actionChecklist: [
      'Refuse single-lever price panic; audit all 7Ps together',
      'Add home sample collection and physician report reviews',
      'Train frontline phlebotomists with verifiable hygiene and ID standards',
      'Create bundled family packages instead of discounting individual blood tests'
    ],
    reflectionKey: 'Price is the easiest marketing lever to change and the most destructive to pull without aligning the rest of the mix.'
  },
  {
    id: 'college-admissions-stp',
    title: 'The Declining Engineering Admissions Dilemma',
    role: 'Director of Admissions',
    companyContext: 'Private engineering college in Tamil Nadu experiencing three consecutive years of falling student applications.',
    crisisPrompt: 'Applications have dropped 12% year-on-year. College management demands running full-page banner ads in every regional newspaper across the state. What is your STP decision?',
    targetTools: ['stp'],
    options: [
      {
        id: 'opt-1',
        label: 'Execute management’s plan and buy full-page banner ads across all 38 districts',
        toolUsed: 'Scattershot mass advertising',
        explanation: 'Wastes marketing budget by speaking generically to everyone without understanding which students actually enroll.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Decline blanket ads: analyze past 3-year admissions data, segment by student goals and parent priorities, and target 3 key districts with tailored positioning',
        toolUsed: 'STP Strategic Focusing',
        explanation: 'Spot on! Concentrates budget on the 2–3 high-yield districts where alumni thrive. Positions the institution around practical industry faculty and named corporate placements, with tailored counselor scripts.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Promise 100% placement guarantees on social media to generate quick clicks',
        toolUsed: 'Unsubstantiated marketing claims',
        explanation: 'Violates advertising ethics codes (ASCI guidelines) and generates untrustworthy leads that damage institutional reputation.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Decline blanket mass advertising until STP is rigorously completed. Analyze the last three years of admissions data by geographic district, feeder higher-secondary schools, entrance cutoffs, and department choices. Segment candidates by student goals (core industry job, software career, or overseas MS) and parent concerns (safety, hostel discipline, and return on tuition). You will find 3–4 specific districts yield 70% of enrolled students. Target those districts with a sharp positioning statement: "The practical engineering college where corporate engineers teach alongside professors", substantiated by named internship tie-ups. Deploy campus-visit buses and customized counselor guidance.',
    actionChecklist: [
      'Stop untargeted statewide mass-media ad spend immediately',
      'Analyze historical enrollment data to identify high-yield geographic clusters',
      'Segment prospective families by student career ambitions and parent security concerns',
      'Deploy defensible positioning backed by corporate training proof'
    ],
    reflectionKey: 'Positioning is not what you do to a product; it is what you do to the mind of the prospect.'
  },
  {
    id: 'prospectus-email-aida',
    title: 'The High-Open Low-Reply Prospectus Crisis',
    role: 'Head of Marketing',
    companyContext: 'Vocational career training institute sending digital admission prospectuses to high school graduates.',
    crisisPrompt: 'Your email campaign to 10,000 parents achieved a stellar 42% open rate, but produced only 14 replies. Management says the brochure "looks beautiful". What is your diagnosis using AIDA?',
    targetTools: ['aida'],
    options: [
      {
        id: 'opt-1',
        label: 'Send the exact same email three more times to tire out parents until they reply',
        toolUsed: 'Aggressive email spamming',
        explanation: 'Irritates parents, leads to spam complaints, and damages future domain deliverability.',
        isOptimal: false,
        rubricPoints: 2
      },
      {
        id: 'opt-2',
        label: 'Diagnose the failure: Attention worked (42% open), but Interest, Desire, and Action failed. Rewrite with parent concerns, alumni salary proof, and a 1-click WhatsApp CTA',
        toolUsed: 'AIDA Funnel Diagnosis & Rewrite',
        explanation: 'Exceptional copywriting audit! Recognizes that high open rates prove the subject line (Attention) worked, but the body lacked customer-centric relevance (Interest), verifiable evidence (Desire), and had high friction (Action).',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Add animated GIFs and change the background color of the email to neon yellow',
        toolUsed: 'Gimmick-led distraction',
        explanation: 'Focuses on visual gimmicks while leaving the lack of emotional relevance and proof unaddressed.',
        isOptimal: false,
        rubricPoints: 4
      }
    ],
    modelAnswer: 'The 42% open rate conclusively proves Attention succeeded. The problem lies entirely in the Interest, Desire, and Action stages. The current email body likely lists institutional infrastructure (campus square footage, lab equipment) rather than answering the parent’s anxious core question: "Will my child get a respected job?" Rewrite the email: open with the parent’s concern (Interest), present verifiable alumni placement salaries and a round-one interview guarantee (Desire), and replace "Visit our website" with a frictionless single CTA: "Reply with your student’s name for a 10-minute counselor phone call this week" (Action). A/B test on 1,000 parents before full rollout.',
    actionChecklist: [
      'Recognize that high open rates mean Attention worked; fix the body copy',
      'Replace feature lists with answers to parent anxiety',
      'Include verified alumni placement proof and risk-reversal guarantees',
      'Replace generic website links with one clear, low-friction phone/WhatsApp CTA'
    ],
    reflectionKey: 'When prospects open your message but refuse to act, you failed to build desire or made action too difficult.'
  },
  {
    id: 'nps-score-coaching-dilemma',
    title: 'The Suspicious NPS 74 Announcement',
    role: 'VP of Customer Operations',
    companyContext: 'Professional certification institute with 12 branches.',
    crisisPrompt: 'The marketing team wants to splash "NPS 74" on the company homepage and billboards. Investigation reveals the score came from 18 paper forms handed out by trainers at the final class session. What is your call?',
    targetTools: ['nps'],
    options: [
      {
        id: 'opt-1',
        label: 'Approve the billboard campaign immediately; a 74 score looks impressive to investors',
        toolUsed: 'Vanity metric exploitation',
        explanation: 'Misrepresents customer sentiment using a statistically invalid, biased sample that will collapse upon audit.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-2',
        label: 'Refuse publication: sample has survivorship bias, in-person trainer coercion, and huge margin of error. Run an anonymous digital survey across recent batches and enforce the 48-hr closed loop',
        toolUsed: 'Authentic Net Promoter System Governance',
        explanation: 'Textbook customer experience leadership! Protects organizational integrity by recognizing survivorship bias (only course completers surveyed) and social-desirability coaching. Demands statistical rigor and closed-loop follow-up.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Fire the trainers who collected the paper feedback forms',
        toolUsed: 'Punitive overreaction',
        explanation: 'Punishes employees who simply followed previous unguided collection practices instead of fixing the system.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'Decline to publish the score. The sample of 18 responses is statistically meaningless (margin of error ±22 points), collected in person by the trainers (creating severe social-desirability bias and score-begging), and sampled only from completers (survivorship bias ignoring dropouts). Rerun an anonymous, digital survey sent via email/SMS to all students enrolled across the last three batches. Report the score alongside response rate and margin of error. Mandate that branch managers call all detractors scoring 0–6 within 48 hours to fix operational issues. Publish an NPS figure only when the methodology is transparent and defensible.',
    actionChecklist: [
      'Ban in-person score collection by trainers to eliminate score coaching',
      'Survey both dropouts and completers to eliminate survivorship bias',
      'Calculate margin of error and report sample size transparently',
      'Focus organizational energy on the 48-hour closed-loop resolution process'
    ],
    reflectionKey: 'The score is just the thermometer; the closed-loop follow-up is the actual treatment.'
  }
];

export const CATEGORY_3_GLOSSARY: GlossaryItem[] = [
  { term: 'AARRR (Pirate Metrics)', definition: 'Acquisition, Activation, Retention, Referral, Revenue: Dave McClure’s framework for full-funnel measurement.', tool: 'Growth Hacking' },
  { term: 'Activation', definition: 'The first point at which a newly acquired user experiences the core value ("aha" moment) of a product.', tool: 'Growth Hacking' },
  { term: 'AIDA', definition: 'Attention, Interest, Desire, Action: the classic model of stages a prospect passes through when exposed to persuasive messaging.', tool: 'AIDA Model' },
  { term: 'AIDCA / AIDAS / AIDAR', definition: 'Extensions of AIDA adding Conviction, Satisfaction, or Retention to cover post-purchase loyalty.', tool: 'AIDA Model' },
  { term: 'Benefit Segmentation', definition: 'Dividing a market by the specific outcome, problem, or value proposition customers seek.', tool: 'STP Model' },
  { term: 'CAC (Customer Acquisition Cost)', definition: 'Total marketing and sales expenses divided by the number of new customers acquired during a period.', tool: 'Growth Hacking' },
  { term: 'Call to Action (CTA)', definition: 'The explicit instruction telling the reader exactly what single low-friction step to take next.', tool: 'AIDA Model' },
  { term: 'Customer Effort Score (CES)', definition: 'A metric evaluating how easy it was for a customer to resolve an issue or complete an interaction.', tool: 'Net Promoter Score' },
  { term: 'Customer Journey Map', definition: 'A visual, evidence-based representation of customer actions, touchpoints, thoughts, emotions, and pain points.', tool: 'Customer Journey Mapping' },
  { term: 'Closed Loop (Inner & Outer)', definition: 'NPS follow-up: individual outreach to detractors within 48h (Inner) and monthly leadership root-cause fixes (Outer).', tool: 'Net Promoter Score' },
  { term: 'Detractor / Passive / Promoter', definition: 'NPS classifications: Detractors (0–6), Passives (7–8), and Promoters (9–10) on the 0–10 recommendation scale.', tool: 'Net Promoter Score' },
  { term: 'Driver Analysis', definition: 'Correlating qualitative themes in verbatim customer comments to upward or downward shifts in loyalty scores.', tool: 'Net Promoter Score' },
  { term: 'Emotion Curve', definition: 'A line across a journey map tracking customer emotional highs and lows across sequential stages.', tool: 'Customer Journey Mapping' },
  { term: 'Growth Hacking', definition: 'A disciplined, experiment-driven process for scaling business growth through rapid testing across the full funnel.', tool: 'Growth Hacking' },
  { term: 'Growth Loop', definition: 'A self-reinforcing product mechanic where user engagement naturally generates new user acquisition.', tool: 'Growth Hacking' },
  { term: 'ICE Score', definition: 'Prioritization score multiplying Impact, Confidence, and Ease (1–10 each) to rank experiment backlog ideas.', tool: 'Growth Hacking' },
  { term: 'Ideal Customer Profile (ICP)', definition: 'The B2B description of the specific company size, industry, and firmographics that get the highest value.', tool: 'STP Model' },
  { term: 'Integrated Marketing Communication (IMC)', definition: 'Ensuring all brand touchpoints, advertising channels, and sales conversations deliver a consistent message.', tool: 'Marketing Mix (4Ps)' },
  { term: 'LTV (Lifetime Value)', definition: 'The total net profit a business expects to generate from a customer over the entire duration of the relationship.', tool: 'Growth Hacking' },
  { term: 'Marketing Mix (4Ps & 7Ps)', definition: 'The set of controllable variables (Product, Price, Place, Promotion + People, Process, Physical Evidence) combined into an offer.', tool: 'Marketing Mix (4Ps)' },
  { term: 'Moment of Truth', definition: 'A critical touchpoint in the customer journey that disproportionately shapes long-term brand perception and loyalty.', tool: 'Customer Journey Mapping' },
  { term: 'Net Promoter Score (NPS)', definition: '% Promoters minus % Detractors on the 0–10 "likely to recommend" question, yielding a score from -100 to +100.', tool: 'Net Promoter Score' },
  { term: 'North Star Metric', definition: 'The single operational metric that best represents customer value delivered and serves as the leading indicator of revenue.', tool: 'Growth Hacking' },
  { term: 'Perceptual Map', definition: 'A visual two-axis chart displaying customer perceptions of competing brands along the two most critical buying attributes.', tool: 'STP Model' },
  { term: 'Point of Difference (POD)', definition: 'The distinctive capability or benefit that sets a brand apart from all competitive alternatives in the category.', tool: 'STP Model' },
  { term: 'Point of Parity (POP)', definition: 'Standard category features a brand must demonstrate to be considered a credible alternative.', tool: 'STP Model' },
  { term: 'Positioning Statement', definition: 'A concise internal formula: "For [Target], [Brand] is the [Category] that [Benefit/POD] because [Proof]".', tool: 'STP Model' },
  { term: 'Product-Market Fit (40% Rule)', definition: 'Sean Ellis test: when at least 40% of surveyed users state they would be "very disappointed" if the product disappeared.', tool: 'Growth Hacking' },
  { term: 'Service Blueprint', definition: 'An operational diagram mapping frontstage customer experiences to backstage employee workflows and IT support systems.', tool: 'Customer Journey Mapping' },
  { term: 'STP Model', definition: 'Segmentation, Targeting, Positioning: the strategic sequence of dividing a market, picking target segments, and establishing brand perception.', tool: 'STP Model' },
  { term: 'Viral Coefficient (k)', definition: 'The average number of new users generated by each existing customer; k > 1.0 represents self-sustaining virality.', tool: 'Growth Hacking' }
];
