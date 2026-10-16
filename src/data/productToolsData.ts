import { ToolDefinition, StrategyStack, ScenarioMission, GlossaryItem } from './toolsData.ts';

export const PRODUCT_TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'mvp',
    name: 'Minimum Viable Product (MVP) & Build-Measure-Learn Loop',
    shortName: 'MVP & Validation',
    category: 'Product & Startup',
    tagline: 'Test your riskiest business assumptions with real customer commitment before investing in full-scale development',
    origin: 'Pioneered by Frank Robinson (2001) and popularized globally by Eric Ries in "The Lean Startup" (2011) and Steve Blank in Customer Development methodology.',
    corePurpose: 'To maximize validated customer learning about market demand and willingness to pay with the minimum possible expenditure of time, capital, and engineering effort.',
    primaryUsers: [
      'Startup Founders & Incubator Entrepreneurs',
      'Chief Product Officers (CPOs) & Product Managers',
      'Corporate Intrapreneurs & Venture Studio Leads',
      'SME Owners Launching New Product Lines',
      'Digital Transformation & Innovation Heads'
    ],
    difficulty: 'Beginner',
    horizon: 'Immediate to Tactical (2 to 6 week validation sprints)',
    scope: 'New Product Concept, Core Value Proposition, or Major Subsystem Feature',
    timeToResult: '1 to 3 weeks to build and launch; 2 to 4 weeks to collect behavioral conversion data',
    dataNeeds: 'Clear falsifiable hypothesis, target persona definition, event tracking funnel data, and pre-agreed quantitative pass/fail decision threshold',
    keyOutput: 'Validated learning log, customer commitment behavioral data, and an executive decision: Persevere, Pivot, or Stop',
    bestPairedWith: 'Lean Canvas (upstream hypothesis generator), User Story Mapping (slicing release 1), Product Roadmap (scaling validated concepts)',
    keyFeatures: [
      'Build-Measure-Learn continuous hypothesis testing loop',
      'Pre-committed quantitative decision rules to combat founder cognitive confirmation bias',
      'Five core testing archetypes: Landing Page Smoke Test, Concierge MVP, Wizard of Oz, Single-Feature MVP, and Pre-Sale',
      'Focus on skin-in-the-game customer behavior (advance deposits, time commitments) rather than polite survey opinions',
      'Clear separation of actionable metrics (conversion to paid, activation) from vanity metrics (social likes, impressions)'
    ],
    howItWorks: 'Identify the single leap-of-faith assumption that, if false, invalidates the entire business. Draft a falsifiable hypothesis with explicit target audience, required action, quantitative success threshold, and deadline. Select the simplest archetype that tests real customer commitment. Build the artifact in 1-2 weeks. Direct targeted traffic through realistic acquisition channels. Measure behavior against the pre-committed threshold. Hold an executive review on the deadline to choose: Persevere (build walking skeleton), Pivot (modify one dimension of the business model), or Stop (preserve remaining capital).',
    coreConcepts: [
      {
        term: 'Build-Measure-Learn Loop',
        definition: 'The fundamental Lean Startup feedback cycle: transform ideas into experiments/artifacts, measure customer behavior, and learn whether to pivot or persevere.'
      },
      {
        term: 'Riskiest Assumption',
        definition: 'The specific leap-of-faith premise that represents the greatest uncertainty and potential lethality to the business model; must be tested before anything else.'
      },
      {
        term: 'Falsifiable Hypothesis',
        definition: 'A testable proposition formatted as: We believe [target group] will [take specific action] because [reason]. We will know we are right when [metric] reaches [threshold] within [timeframe].'
      },
      {
        term: 'Smoke Test / Fake Door',
        definition: 'A landing page or UI element describing a product offering with a "Pre-Order" or "Buy Now" CTA to measure actual purchase intent before building any code or inventory.'
      },
      {
        term: 'Concierge MVP',
        definition: 'Manually delivering the service directly to early adopters who know it is manual, maximizing qualitative insights into user workflows and pain points.'
      },
      {
        term: 'Wizard of Oz MVP',
        definition: 'Presenting a front-end that appears fully automated to the user while humans manually operate the backend processes to validate value delivery.'
      },
      {
        term: 'Single-Feature MVP',
        definition: 'A functional software release that solves exactly one critical problem exceptionally well (e.g., Dropbox video, early Foursquare check-ins).'
      },
      {
        term: 'Actionable vs. Vanity Metrics',
        definition: 'Actionable metrics inform repeatable decisions (e.g., checkout conversion, 30-day retention); vanity metrics look flattering but do not correlate with business survival (e.g., page views, social followers).'
      }
    ],
    strengths: [
      'Drastically reduces cash burn and prevents teams from building sophisticated software nobody wants',
      'Replaces executive opinions and polite user survey feedback with empirical customer commitment',
      'Accelerates organizational learning speed and customer feedback cycles',
      'Creates high investor confidence by demonstrating market traction with minimal capital expenditure'
    ],
    limitations: [
      'Vulnerable to poor execution bias: a poorly built test can invalidate a genuinely strong market opportunity',
      'Does not test enterprise regulatory compliance, security audits, or massive technical scale',
      'Requires emotional discipline to honor negative results and avoid falling in love with the prototype',
      'Can disappoint early adopters if communications fail to set clear beta expectations'
    ],
    workflowPlacement: {
      upstream: 'Takes hypothesis inputs from Lean Canvas, Value Proposition Canvas, and Jobs-to-be-Done customer discovery interviews',
      downstream: 'Feeds User Story Mapping (slicing the walking skeleton), Product Roadmap (sequencing themes), and A/B Testing (optimizing funnels)'
    },
    useCases: [
      {
        title: 'Consumer Home Services Platform',
        situation: 'Two founders planned a ₹15 lakh mobile app to connect apartment dwellers with vetted AC maintenance technicians.',
        problem: 'Uncertain whether urban residents would trust an app-based technician or continue calling neighborhood contacts.',
        action: 'Launched a 2-page bilingual landing page with a ₹199 advance booking link; founders manually dispatched two vetted technicians via WhatsApp.',
        outcome: 'Achieved 82 bookings in 21 days with 91% satisfaction; proved market demand and willingness to pay before writing any code.'
      },
      {
        title: 'B2B Industrial Machinery Predictive Maintenance',
        situation: 'Textile pump manufacturer wanted to offer IoT vibration monitoring for factory spinning units.',
        problem: 'Developing hardware sensors and cloud telemetry required ₹40 lakh and 9 months of engineering.',
        action: 'Offered a manual "Concierge Audit" where an engineer visited mills twice weekly with a portable vibration meter for ₹4,999/month.',
        outcome: 'Secured 14 paid mill subscriptions in 30 days, discovering plant managers cared about bearing failure alerts rather than real-time graphs.'
      },
      {
        title: 'EdTech Vernacular Coding Academy',
        situation: 'Startup wanted to build an automated AI-guided Tamil Python learning app.',
        problem: 'Uncertain whether Tier-2/3 college students would pay for recorded coding tutorials in regional languages.',
        action: 'Conducted live weekend cohort classes on Zoom for ₹999 with Razorpay pre-orders; set a threshold of 35 paid students.',
        outcome: 'Received 58 paid enrolments; learned students valued live mentor Q&A over self-paced videos, reshaping the company strategy.'
      },
      {
        title: 'Corporate Employee Wellness Benefit',
        situation: 'HR department at an IT services firm proposed a ₹20 lakh custom mental health counseling app.',
        problem: 'High risk of low employee engagement and privacy skepticism regarding corporate-sponsored apps.',
        action: 'Piloted an anonymous third-party helpline voucher system with 100 employee volunteers over 60 days.',
        outcome: 'Discovered only 4% utilization due to privacy concerns; pivoted to subsidized independent offsite therapy sessions.'
      }
    ],
    caseStudy: {
      company: 'CodeThamizh (Madurai, Tamil Nadu)',
      revenue: '₹18 Lakh (Seed stage)',
      staff: '4 founders & instructors',
      profile: 'Early-stage edtech venture teaching computer science, logic, and Scratch/Python to school students (Classes 6-10) in Tamil.',
      challenge: 'The founders budgeted ₹4.5 lakh (nearly their entire personal savings) to develop an automated mobile learning app with gamified badges. They had zero proof that parents in Madurai and Tirunelveli would pay ₹999 for vernacular coding when YouTube had free videos.',
      whyChosen: 'Classic Lean Startup scenario: high capital risk, unvalidated customer willingness to pay, and a strong temptation to over-engineer software before testing market demand.',
      steps: [
        'Identified the riskiest assumption: "Parents of Tier-2/3 middle-class school students will pay ₹999 upfront for a structured coding course taught in Tamil."',
        'Drafted a falsifiable hypothesis: We believe 40 parents will pay ₹999 within 3 weeks of attending a free live demo webinar.',
        'Built a bilingual landing page in 4 days using a no-code builder with a syllabus summary and Razorpay payment link.',
        'Promoted the free Saturday demo via 5 local school WhatsApp groups and ₹6,000 in hyper-targeted Facebook ads.',
        'Taught the 60-minute demo personally on Google Meet; pitched the 6-week weekend cohort at the end with a 48-hour payment deadline.',
        'Conducted exit calls with parents who attended the demo but did not enroll to capture objections.'
      ],
      results: [
        'Generated 1,850 page views and 210 webinar demo attendees.',
        'Secured 52 paid enrolments (₹51,948 total revenue) within 72 hours, surpassing the 40-student threshold.',
        'Discovered parents valued live instructor feedback and homework reviews far more than gamified automated badges.',
        'Validated the business model for ₹38,000 total expenditure, saving ₹4.1 lakh in unneeded software development.'
      ],
      lessonsLearned: [
        'Skin-in-the-game upfront payments are the only reliable evidence of customer demand; free signups and compliments mean very little.',
        'Manual Concierge teaching revealed customer preferences that no questionnaire or automated software could ever uncover.',
        'Validating customer willingness to pay early enabled the founders to price future live cohorts at ₹1,499 with higher confidence.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Clear problem statement identified through 15-20 customer discovery interviews',
        'Specific target customer persona (not "everyone in India")',
        'Documented riskiest assumption scored by impact and uncertainty',
        'Strictly time-boxed budget (e.g., ₹15,000 to ₹50,000) and deadline (2 to 4 weeks)'
      ],
      steps: [
        'Map out the entire business model on a Lean Canvas and isolate the single riskiest assumption.',
        'Formulate a written falsifiable hypothesis: segment, action, success threshold, and time limit.',
        'Select the leanest archetype (Smoke Test, Concierge, Wizard of Oz, or Pre-Sale).',
        'Build the experiment artifact within 7 to 10 working days.',
        'Establish event analytics tracking with conversion goals (landing page visits -> CTA clicks -> paid commitments).',
        'Drive genuine, cold target audience traffic through paid or organic distribution channels.',
        'Conduct qualitative interviews with both converting and bouncing visitors.',
        'Hold an executive decision review meeting on the deadline date: Persevere, Pivot, or Stop.'
      ],
      checklist: [
        'Is the riskiest assumption explicitly written down before building the experiment?',
        'Is the quantitative pass/fail threshold committed to in writing prior to seeing data?',
        'Does the experiment measure actual customer behavior rather than stated verbal opinions?',
        'Is the prototype scoped to be delivered within 2 weeks maximum?',
        'Are analytics events and conversion tracking verified before launching traffic?'
      ],
      commonMistakes: [
        {
          mistake: 'Building a full product and calling it an "MVP" after spending 8 months and ₹10 lakh.',
          fix: 'Constrain the first experiment to a 2-4 week time box and a budget under ₹30,000.'
        },
        {
          mistake: 'Setting the pass/fail threshold after the data comes in to justify continuing.',
          fix: 'Write the numerical threshold and date in a team charter signed before launching marketing traffic.'
        },
        {
          mistake: 'Testing with friends and family who provide polite encouragement rather than real buying behavior.',
          fix: 'Acquire experimental traffic strictly through public channels and cold customer outreach.'
        }
      ],
      plan306090: {
        d30: 'Interview 20 target users, map the riskiest assumption, formulate the hypothesis, and launch the MVP experiment.',
        d60: 'Analyze behavioral conversion data, conduct qualitative debrief interviews, and execute the Persevere/Pivot/Stop decision.',
        d90: 'If persevering, map the walking skeleton via User Story Mapping; if pivoting, launch the revised hypothesis test.'
      },
      proTips: [
        'If a customer says "I love this idea!", reply immediately: "Wonderful, pre-orders are 50% off today—can I take your advance payment now?"',
        'A negative MVP result that saves ₹20 lakh of development capital is an enormous strategic victory, not a failure.',
        'Always interview 5 people who saw your offer and decided NOT to buy—they hold the key to your future product revisions.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Customer Discovery Interviews (Jobs-to-be-Done)',
        reason: 'When you do not yet understand the customer’s core problem or daily workflow; build nothing until the pain is clearly defined.'
      },
      {
        alternative: 'Full Specification Agile Engineering',
        reason: 'When the market demand, compliance requirements, and user workflows are already 100% proven and established.'
      },
      {
        alternative: 'A/B Testing',
        reason: 'When optimizing an existing high-volume product rather than testing the existence of initial customer demand.'
      }
    ],
    reflectionPrompts: [
      'What is the single assumption in your business plan that, if proven wrong, destroys your entire model?',
      'How could you test whether customers will pay for your solution by next Friday without writing a single line of software code?',
      'If your current MVP experiment shows only 10% of your target conversion rate, are you prepared to pivot or stop?'
    ],
    quickReferenceCard: [
      'Build-Measure-Learn Loop: Turn assumptions into tests, measure behavior, learn whether to pivot or persevere',
      'Test behavior (payments, commitments), never verbal opinions or polite feedback',
      '5 Archetypes: Landing Page Smoke Test · Concierge · Wizard of Oz · Single-Feature · Pre-Sale',
      'Always commit to your quantitative pass/fail threshold before driving traffic',
      'A fast negative learning saves months of cash and is a true strategic win'
    ],
    quiz: [
      {
        id: 'mvp-1',
        question: 'What does the term "minimum" in Minimum Viable Product primarily refer to?',
        options: [
          'Minimum software quality and bare-bones user interface',
          'Minimum effort and capital required to generate validated customer learning',
          'Minimum number of target customers surveyed in focus groups',
          'Minimum price charged to early adopters in the market'
        ],
        correctAnswer: 1,
        explanation: 'MVP minimizes the effort, time, and capital required to learn whether real customers have a problem worth solving. It does not imply sloppy execution, as poor quality invalidates viable concepts.'
      },
      {
        id: 'mvp-2',
        question: 'Which MVP archetype delivers the service manually while the customer is fully aware that human operators are delivering it?',
        options: [
          'Wizard of Oz MVP',
          'Landing Page Smoke Test',
          'Concierge MVP',
          'Single-Feature MVP'
        ],
        correctAnswer: 2,
        explanation: 'In a Concierge MVP, the manual delivery is transparent to the customer, maximizing qualitative operational learning. In Wizard of Oz, the customer believes the system is automated while humans operate the backend.'
      },
      {
        id: 'mvp-3',
        question: 'Which of the following represents the strongest behavioral evidence of customer demand?',
        options: [
          '1,000 likes on an Instagram product teaser video',
          'A customer survey where 85% of respondents state they "would definitely buy"',
          '35 non-refundable pre-paid advance deposits placed through a payment gateway',
          '4,000 unique organic visits to the product marketing landing page'
        ],
        correctAnswer: 2,
        explanation: 'Financial skin-in-the-game represents genuine commitment. Surveys and social media likes measure polite opinions that rarely convert to repeatable business revenue.'
      },
      {
        id: 'mvp-4',
        question: 'When must the quantitative success metric and decision threshold be committed to in an MVP experiment?',
        options: [
          'After reviewing the first week of traffic results',
          'Before launching the experiment to customer traffic',
          'Midway through the test when initial conversion trends appear',
          'Only if the results look weak and need executive reinterpretation'
        ],
        correctAnswer: 1,
        explanation: 'Success thresholds and decision criteria must be committed to in writing before launching to prevent teams from succumbing to confirmation bias and moving the goalposts.'
      },
      {
        id: 'mvp-5',
        question: 'In the Lean Startup Build-Measure-Learn cycle, what is the ultimate output of the loop?',
        options: [
          'A finalized production software release',
          'Validated learning that guides the decision to persevere, pivot, or stop',
          'An updated financial profit-and-loss forecast',
          'A comprehensive marketing promotional campaign'
        ],
        correctAnswer: 1,
        explanation: 'The fundamental output of the Build-Measure-Learn feedback loop is validated learning about real customer behavior, which determines whether to persevere, pivot, or stop.'
      }
    ]
  },
  {
    id: 'productroadmap',
    name: 'Outcome-Based Product Roadmap & RICE Prioritization',
    shortName: 'Product Roadmap',
    category: 'Product & Startup',
    tagline: 'Align teams around customer outcomes and business problems rather than rigid feature release dates',
    origin: 'Evolved from agile product management methodologies (Janna Bastow, Bruce McCarthy, Melissa Perri) and Intercom’s RICE prioritization framework developed by Sean McBride.',
    corePurpose: 'To communicate product strategy, align cross-functional stakeholders around prioritized problem themes, and eliminate high-friction sales date promises through the Now/Next/Later horizon framework.',
    primaryUsers: [
      'Chief Product Officers (CPOs) & VPs of Product',
      'Product Managers & Technical Program Managers',
      'Engineering Leads & Scrum Masters',
      'Founders, CEOs & Executive Leadership',
      'Sales, Marketing & Customer Success Directors'
    ],
    difficulty: 'Intermediate',
    horizon: 'Strategic to Tactical (Now: current quarter; Next: 1-2 quarters; Later: 6-12 months)',
    scope: 'Whole Product Portfolio, Major Platform Subsystem, or Value Stream',
    timeToResult: '1 to 2 days for initial thematic mapping; bi-weekly review and quarterly refresh cadence',
    dataNeeds: 'Business strategy objectives, customer churn and request logs, engineering effort estimates, and RICE scoring variables (Reach, Impact, Confidence, Effort)',
    keyOutput: 'Outcome-based Now/Next/Later roadmap board, objective RICE scoring matrix, and stakeholder alignment charter',
    bestPairedWith: 'MVP & Validation (upstream inputs), User Story Mapping (downstream sprint breakdown), OKRs (strategic alignment)',
    keyFeatures: [
      'Now/Next/Later horizon structure replacing rigid Gantt chart release dates with certainty bands',
      'RICE scoring mathematical formula: (Reach × Impact × Confidence) ÷ Effort',
      'Audience-tailored views: Executive strategic themes, Sales problem-resolution windows, and Engineering delivery boards',
      'Separation of customer problems (outcomes) from technical implementation details (outputs)',
      'Documented trade-off change log to defend development focus against ad-hoc executive interruptions'
    ],
    howItWorks: 'Translate corporate strategic goals into 4-6 high-level outcome themes (e.g., "Reduce onboarding time by 50%"). Solicit candidate initiatives from customer telemetry, support tickets, sales objections, and team suggestions. Score each candidate using RICE: Reach (customers impacted per quarter), Impact (0.25 minimal to 3.0 massive), Confidence (50% low to 100% high), and Effort (person-months). Populate the Now (committed, high certainty), Next (under discovery/scoping), and Later (exploratory, future horizon) columns. Share view-tailored summaries with executive, sales, and engineering stakeholders. Review bi-weekly and re-balance quarterly.',
    coreConcepts: [
      {
        term: 'Outcome vs. Output',
        definition: 'Outputs are features and code delivered (e.g., "build an export button"); outcomes are measurable business or customer behavior changes achieved (e.g., "reduce monthly customer churn by 1.5%").'
      },
      {
        term: 'Now / Next / Later Framework',
        definition: 'A time-horizon structure where Now represents committed current work with high detail; Next represents validated problems being architected; Later represents strategic exploratory directions without date commitments.'
      },
      {
        term: 'RICE Prioritization Formula',
        definition: 'A scoring mechanism that calculates ROI for feature ideas: (Reach × Impact × Confidence) ÷ Effort, producing an objective score for rank-ordering.'
      },
      {
        term: 'Confidence Deflator',
        definition: 'A factor in RICE (100% high, 80% medium, 50% low) that penalizes speculative ideas with little empirical backing, preventing pet projects from overtaking validated needs.'
      },
      {
        term: 'Theme-Based Roadmapping',
        definition: 'Organizing initiatives by customer problem areas (e.g., "Frictionless Billing", "First-Run Experience") rather than isolated functional department wishlists.'
      },
      {
        term: 'Roadmap vs. Release Plan',
        definition: 'A roadmap communicates strategic direction and problem intent to stakeholders; a release plan manages sprint-level engineering delivery and release coordination.'
      }
    ],
    strengths: [
      'Eliminates the vicious cycle of missed arbitrary calendar deadlines and stakeholder disappointment',
      'Provides an objective, mathematically grounded defense against executive whim and "loudest sales rep" syndrome',
      'Empowers engineering teams to invent optimal technical solutions for well-defined customer problems',
      'Keeps the entire company aligned on strategic business outcomes rather than feature volume'
    ],
    limitations: [
      'Requires stakeholder education to shift mindsets away from fixed calendar dates toward problem horizons',
      'RICE scoring inputs (especially Impact and Effort) can still be gamed if confidence ratings are not strictly audited',
      'Does not replace technical dependency mapping or critical path project management for complex physical hardware',
      'Can create tension with enterprise procurement teams who demand contractual delivery dates'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Corporate Strategy, OKRs, MVP validation experiments, and Customer Success churn analytics',
      downstream: 'Feeds User Story Mapping (slicing release 1), Agile Sprint Backlogs, and Go-to-Market marketing plans'
    },
    useCases: [
      {
        title: 'B2B SaaS Managing Sales Feature Creep',
        situation: 'A 25-person billing SaaS company faced constant sprint disruptions because sales reps promised custom features to close individual deals.',
        problem: 'Engineering velocity dropped 45%, sprint deadlines were consistently missed, and core onboarding software remained buggy.',
        action: 'Implemented an outcome-based Now/Next/Later board and mandated that any sales request must be scored via RICE against current Now themes.',
        outcome: 'Disruptions fell from 9 per month to 2; on-time sprint completion increased from 42% to 85%; monthly churn dropped from 4.0% to 2.8%.'
      },
      {
        title: 'Healthcare Clinic Chain Digital Transformation',
        situation: 'A multi-center clinic chain wanted to digitize patient appointments, pharmacy deliveries, and lab reports.',
        problem: 'Stakeholders from 5 departments submitted 120 conflicting feature requests, paralyzing the software team.',
        action: 'Clustered requests into 3 themes: "Zero Waiting Room Queue", "Home Lab Phlebotomy", and "Digital Prescription Refills"; prioritized via RICE.',
        outcome: 'Launched the queue management system in Now horizon; reduced average patient waiting time by 35 minutes across 8 clinics.'
      },
      {
        title: 'FinTech Payment Gateway Enterprise Alignment',
        situation: 'Payment gateway startup scaling from 50 to 200 people with engineering teams pulling in opposing technical directions.',
        problem: 'Internal infrastructure upgrades were constantly deferred in favor of flashy marketing-driven UI redesigns.',
        action: 'Established an executive portfolio roadmap allocating capacity: 50% Core Growth, 30% Infrastructure/Reliability, 20% Exploratory Later.',
        outcome: 'API uptime improved to 99.98%; resolved technical debt before peak Diwali festive shopping transaction volumes.'
      },
      {
        title: 'Manufacturing ERP Modernization',
        situation: 'Automotive component manufacturer replacing a legacy 15-year-old on-premise inventory system.',
        problem: 'Plant managers feared operational shutdown if all modules were switched simultaneously on a single calendar date.',
        action: 'Constructed an outcome roadmap sequencing high-risk inventory tracking into Now, quality audits into Next, and supplier portal into Later.',
        outcome: 'Achieved zero production line stoppage during rollout; plant supervisors embraced the phased thematic transition.'
      }
    ],
    caseStudy: {
      company: 'LoomLedger (Coimbatore, Tamil Nadu)',
      revenue: '₹3.2 Crore ARR',
      staff: '22 employees (9 engineers, 5 sales, 4 support, 4 executive/ops)',
      profile: 'B2B vertical SaaS provider delivering cloud inventory, production tracking, and GST invoicing to 340 textile weaving and garment manufacturing units.',
      challenge: 'The two co-founders managed product development via an unprioritized 140-row spreadsheet. Every sales meeting created emergency feature promises to win ₹50,000 deals, derailing planned sprints. The engineering team was demoralized, release dates were routinely missed, and monthly customer churn climbed to 4.2% due to unresolved onboarding bugs.',
      whyChosen: 'Textbook growing SME challenge: reactive sales-led feature development destroying engineering predictability, customer satisfaction, and recurring revenue retention.',
      steps: [
        'Conducted a 2-day executive offsite with founders, tech lead, and sales head to transition from dates to an outcome-based roadmap.',
        'Audited the 140 spreadsheet requests and grouped them into 4 strategic outcome themes: "Self-Serve Onboarding", "Frictionless GST Filing", "Weaving Waste Reduction", and "Enterprise Multi-Unit Reporting".',
        'Introduced the RICE prioritization formula; audited all Reach, Impact, Confidence, and Effort estimates with the tech lead.',
        'Restructured the product board into Now (strictly committed, no dates on customer views), Next (problem validated, in design), and Later (exploratory).',
        'Instituted a customer-facing portal showing problem themes instead of calendar months, and established a trade-off change log for any sales interruption.'
      ],
      results: [
        'On-time delivery of committed "Now" initiatives improved from 38% to 82% across two consecutive quarters.',
        'Sales-driven ad-hoc interruptions dropped by 75% as salespeople used RICE to explain trade-offs to prospects.',
        'Focused onboarding improvements cut time-to-first-invoice from 18 days to 5 days.',
        'Monthly customer churn dropped from 4.2% to 2.4%, boosting annual Net Revenue Retention (NRR) from 92% to 108%.'
      ],
      lessonsLearned: [
        'Removing specific calendar delivery dates from customer roadmaps actually increased client trust because delivery promises were reliably met.',
        'The Confidence factor in RICE was the single most effective tool to stop founders from chasing unverified pet ideas.',
        'Focusing on customer outcomes rather than software outputs turned the engineering team from feature builders into problem solvers.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Clear corporate strategy and annual business objectives (e.g., ARR targets, churn goals)',
        'Customer feedback repository (support tickets, exit interview notes, NPS comments)',
        'Engineering lead capable of providing rough t-shirt or person-month effort estimates',
        'Executive agreement to cease promising calendar delivery dates to prospective sales leads'
      ],
      steps: [
        'Gather the product, engineering, and commercial leadership team for a 1-day roadmapping workshop.',
        'Group all existing backlog requests and ideas into 4 to 6 strategic outcome themes.',
        'Calculate RICE scores for each candidate initiative: Reach × Impact × Confidence ÷ Effort.',
        'Populate the Now column with items having high RICE scores and proven customer demand.',
        'Populate Next with prioritized problem themes undergoing discovery and architecture design.',
        'Populate Later with long-term strategic opportunities that require future investigation.',
        'Create tailored communication views: Executive Overview, Sales Problem Horizon, and Tech Board.',
        'Review the roadmap bi-weekly with engineering leads and perform a full re-prioritization quarterly.'
      ],
      checklist: [
        'Are roadmap items expressed as customer outcomes/problems rather than purely technical feature descriptions?',
        'Are specific calendar dates eliminated from external customer and sales-facing roadmap views?',
        'Has every item in the Now horizon been scored with RICE using audited confidence ratings?',
        'Is the Now column strictly constrained by verified engineering team sprint capacity?',
        'Is there a documented trade-off log for recording what gets deferred when a new item is added?'
      ],
      commonMistakes: [
        {
          mistake: 'Treating the roadmap as a Gantt chart with exact delivery dates 12 months in advance.',
          fix: 'Adopt Now/Next/Later horizons where certainty decreases appropriately with time distance.'
        },
        {
          mistake: 'Allowing executives or sales reps to insert features into Now without dropping an equivalent effort item.',
          fix: 'Enforce the "Zero-Sum Capacity Rule": adding 2 person-months of work requires removing 2 person-months.'
        },
        {
          mistake: 'Inflating confidence scores to 100% on speculative ideas to force high RICE rankings.',
          fix: 'Require documented user research or telemetry data before granting confidence ratings above 50%.'
        }
      ],
      plan306090: {
        d30: 'Audit the feature backlog, group into 5 outcome themes, score top 25 items with RICE, and publish the first Now/Next/Later board.',
        d60: 'Conduct bi-weekly reviews, transition sales teams to theme-based roadmap discussions, and measure reduction in sprint interruptions.',
        d90: 'Run the first quarterly roadmap refresh, retire completed Now items, pull groomed Next items into Now, and report outcome ROI.'
      },
      proTips: [
        'When an executive asks for a pet feature, don’t say "No"—say "Let’s run the RICE score together and see where it lands on our Now board."',
        'Limit the Now horizon to no more than 3 to 5 core problem themes to avoid multitasking dilution.',
        'Always celebrate the business metric moved (e.g., churn cut by 1%) rather than simply shipping a feature.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Gantt Chart & Critical Path Method (CPM)',
        reason: 'When managing physical construction, regulatory factory audits, or hardware tooling where physical sequential dependencies and fixed calendar dates are mandatory.'
      },
      {
        alternative: 'Agile Sprint Backlog',
        reason: 'When managing daily 2-week developer tasks and bug tickets; roadmaps operate at the strategic outcome level.'
      },
      {
        alternative: 'Lean Canvas',
        reason: 'When the business model and customer value proposition are completely unproven; test hypotheses with MVPs first.'
      }
    ],
    reflectionPrompts: [
      'What percentage of your development capacity last quarter was consumed by unplanned sales interruptions?',
      'If your top customer leaves tomorrow, will your current roadmap initiatives still make sense for the rest of your market?',
      'How do you currently resolve prioritization disagreements between your sales head and your engineering lead?'
    ],
    quickReferenceCard: [
      'Focus on Outcomes (customer/business results), not Outputs (lines of code or features shipped)',
      'Now: High certainty, committed current work (no dates on customer views)',
      'Next: Validated problems, in discovery and technical architecture',
      'Later: Strategic opportunities, exploratory and direction-setting',
      'RICE Formula: (Reach × Impact × Confidence) ÷ Effort',
      'Zero-Sum Rule: Adding new work to Now requires explicitly removing an equal effort item'
    ],
    quiz: [
      {
        id: 'roadmap-1',
        question: 'What is the fundamental difference between a Product Roadmap and a Release Plan?',
        options: [
          'There is no difference; the terms are interchangeable in modern software engineering',
          'A roadmap communicates strategic direction and outcomes; a release plan coordinates detailed delivery tasks and dates',
          'A release plan covers 3 to 5 years while a roadmap covers only the next 2-week sprint',
          'A roadmap is exclusively for external investors while a release plan is strictly for customer support'
        ],
        correctAnswer: 1,
        explanation: 'A product roadmap aligns stakeholders around strategic outcomes and problem horizons (Now/Next/Later), whereas a release plan manages sprint-level developer tasks, release dates, and technical packaging.'
      },
      {
        id: 'roadmap-2',
        question: 'In the RICE prioritization framework, what is the role of the Confidence score?',
        options: [
          'It measures how much the CEO likes the project',
          'It acts as an objective deflator that penalizes speculative ideas with little empirical supporting evidence',
          'It multiplies the financial valuation of the product in pitch decks',
          'It measures whether the software engineers have experience with the programming language'
        ],
        correctAnswer: 1,
        explanation: 'Confidence (100% high, 80% medium, 50% low) serves as a vital mathematical brake against pet projects and speculative guesses, ensuring evidence-backed initiatives rank above hype.'
      },
      {
        id: 'roadmap-3',
        question: 'Why do modern product teams prefer "Now / Next / Later" roadmaps over timeline Gantt charts with fixed dates?',
        options: [
          'Because software engineers refuse to work under any management oversight',
          'Because Gantt charts create false precision, force premature technical commitments, and trigger stakeholder friction when dates slip',
          'Because Now/Next/Later boards are legally required by international software standards',
          'Because Gantt charts cannot be drawn in modern spreadsheet applications'
        ],
        correctAnswer: 1,
        explanation: 'Fixed calendar dates on distant software roadmaps create false precision. Uncertainty increases with time; Now/Next/Later communicates certainty bands appropriately and prevents broken promises.'
      },
      {
        id: 'roadmap-4',
        question: 'An initiative has Reach = 400 customers, Impact = 2 (High), Confidence = 80% (0.8), and Effort = 2 person-months. What is its RICE score?',
        options: [
          '160',
          '320',
          '256',
          '640'
        ],
        correctAnswer: 2,
        explanation: 'RICE = (Reach × Impact × Confidence) ÷ Effort = (400 × 2 × 0.8) ÷ 2 = 640 ÷ 2 = 320.'
      },
      {
        id: 'roadmap-5',
        question: 'What is the "Zero-Sum Capacity Rule" when managing product roadmaps?',
        options: [
          'The product budget must reach zero rupees at the end of each fiscal quarter',
          'Adding a new unplanned initiative to the committed "Now" horizon requires explicitly removing or deferring an equivalent amount of effort',
          'All software defects must be reduced to zero before releasing any new feature',
          'Sales commissions are set to zero if any committed roadmap delivery slips'
        ],
        correctAnswer: 1,
        explanation: 'Engineering capacity is finite. The zero-sum rule prevents team burnout and predictable failure by mandating that introducing new work into Now requires consciously taking something else out.'
      }
    ]
  },
  {
    id: 'userstorymapping',
    name: 'User Story Mapping & Agile Release Slicing',
    shortName: 'Story Mapping',
    category: 'Product & Startup',
    tagline: 'Transform a flat, fragmented backlog into a 2D customer journey map to slice a viable Walking Skeleton',
    origin: 'Created by Jeff Patton in 2005 and detailed in his definitive book "User Story Mapping: Discover the Whole Story, Build the Right Product" (2014).',
    corePurpose: 'To prevent teams from building incomplete, disconnected software features by visualizing the end-to-end customer journey horizontally and slicing viable, functional releases vertically.',
    primaryUsers: [
      'Agile Product Managers & Product Owners',
      'UX Designers & User Researchers',
      'Engineering Leads & Full-Stack Developers',
      'Scrum Masters & Agile Coaches',
      'Founders Scoping MVP Release 1'
    ],
    difficulty: 'Intermediate',
    horizon: 'Tactical (Release 1, 2, and 3 scoping across 1 to 6 months)',
    scope: 'Complete End-to-End User Experience or Major Complex Workflow',
    timeToResult: 'Half-day to 1-day collaborative workshop with cross-functional team',
    dataNeeds: 'User persona journey steps, user activity touchpoints, technical feasibility constraints, and business release objectives',
    keyOutput: '2D User Story Map board with chronological Backbone, prioritized walking skeleton, and sliced Release 1, 2, and 3 scopes',
    bestPairedWith: 'MVP & Validation (upstream concept validation), Product Roadmap (strategic themes), Scrum & Kanban (sprint execution)',
    keyFeatures: [
      'Horizontal chronological Backbone capturing user activities and high-level steps from left to right',
      'Vertical depth representing prioritized options and user stories (highest necessity at top, nice-to-have below)',
      'Walking Skeleton: the thinnest possible end-to-end slice that actually functions and delivers value',
      'Horizontal release slice dividers (Release 1 / MVP, Release 2, Release 3) replacing disconnected flat backlogs',
      'INVEST criteria validation and Given/When/Then acceptance criteria for every user story card'
    ],
    howItWorks: 'Assemble a cross-functional group (Product, Design, Tech, QA, Operations). Identify the target user persona and their overall goal. Lay out the horizontal Backbone chronologically from left to right: high-level User Activities (e.g., Discover -> Book -> Pay -> Manage) broken into User Steps. Beneath each step, brainstorm vertical cards representing user stories, placing essential core interactions at the top and alternative/advanced variations below. Draw a horizontal line across the board to slice out Release 1 (the Walking Skeleton) ensuring the user can complete the entire journey end-to-end. Draw subsequent lines for Release 2 and Release 3. Validate stories against INVEST criteria and write acceptance tests.',
    coreConcepts: [
      {
        term: 'The Backbone',
        definition: 'The top horizontal bar of the story map representing the chronological flow of activities and steps a user takes from the beginning to the end of their journey.'
      },
      {
        term: 'Walking Skeleton',
        definition: 'The thinnest possible vertical slice through the entire story map that connects the front-end user experience to the backend database, delivering a functional end-to-end journey.'
      },
      {
        term: 'Flat Backlog Trap',
        definition: 'The common failure mode where teams prioritize 200 disconnected items in a 1D spreadsheet or Jira list, losing all context of the end-to-end customer workflow.'
      },
      {
        term: 'Release Slicing',
        definition: 'Drawing horizontal dividing lines across the story map to carve out cohesive, releasable iterations that deliver complete user value rather than half-built components.'
      },
      {
        term: 'INVEST Criteria',
        definition: 'Quality standard for user stories: Independent, Negotiable, Valuable, Estimable, Small, and Testable.'
      },
      {
        term: 'Given / When / Then Acceptance Criteria',
        definition: 'Standard behavioral test syntax: Given [precondition], When [action occurs], Then [expected measurable outcome].'
      }
    ],
    strengths: [
      'Restores full contextual visibility to agile backlogs, eliminating disjointed feature development',
      'Guarantees that Release 1 delivers a complete, unbroken end-to-end user workflow rather than isolated fragments',
      'Creates profound shared understanding between software engineers, UX designers, and business leaders',
      'Makes scope negotiation visual and straightforward: teams physically see what is deferred below the release line'
    ],
    limitations: [
      'Requires a collaborative 1-day time commitment from key cross-functional team members',
      'Can become visually unwieldy if user activities are mapped at too granular a technical level',
      'Does not replace relational database schema design or low-level API architecture specifications',
      'Requires active facilitation to prevent teams from overloading the top Release 1 slice'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Customer Journey Maps, Jobs-to-be-Done discovery, and Product Roadmap outcome themes',
      downstream: 'Feeds Jira/GitLab sprint backlog estimation, Scrum sprint planning, and automated QA test suite authoring'
    },
    useCases: [
      {
        title: 'Micro-Lending App MVP Scoping',
        situation: 'An NBFC in Chennai planned an instant personal loan application portal with an external vendor.',
        problem: 'The vendor submitted a 320-item spreadsheet requiring 10 months of coding before any customer could submit a loan.',
        action: 'Conducted a 1-day Story Mapping workshop; mapped the applicant journey and carved out a "Walking Skeleton" for one salaried profile.',
        outcome: 'Sliced an 8-week Release 1 that accepted applications and disbursed 45 pilot loans, generating customer feedback 8 months ahead of schedule.'
      },
      {
        title: 'Hospital Outpatient Teleconsultation Portal',
        situation: 'A multi-specialty hospital needed to launch remote video consultations during regional travel restrictions.',
        problem: 'Doctors, IT, billing, and pharmacy teams fought over dozens of conflicting features, delaying the launch.',
        action: 'Mapped the patient journey (Select Doctor -> Choose Slot -> Pay -> Video Call -> Receive Digital Prescription); sliced Release 1.',
        outcome: 'Launched the walking skeleton in 3 weeks using WhatsApp video links; processed 1,200 consults before building complex native video features.'
      },
      {
        title: 'Garment Export Production Tracking System',
        situation: 'Textile factory replacing physical paper tally sheets across cutting, stitching, washing, and packing departments.',
        problem: 'Plant managers feared floor workers would reject a complex enterprise software interface.',
        action: 'Story mapped the daily shift flow with floor supervisors; placed barcode scanning at the top of the backbone and reports below.',
        outcome: 'Achieved 96% worker adoption in Week 1 because the digital interface mirrored their natural physical sequence.'
      },
      {
        title: 'D2C E-Commerce Return & Refund Flow',
        situation: 'Fashion apparel brand suffering 28% customer support call volume driven by return status inquiries.',
        problem: 'Engineers kept optimizing the product catalog while the reverse logistics user journey was completely neglected.',
        action: 'Mapped the return journey (Request Return -> Pickup Window -> Quality Inspection -> Refund Trigger); sliced an automated tracking portal.',
        outcome: 'Cut customer return-related support tickets by 62% within 30 days of releasing the self-serve return tracking flow.'
      }
    ],
    caseStudy: {
      company: 'QuickShiksha (Tiruchirappalli, Tamil Nadu)',
      revenue: '₹85 Lakh annual revenue',
      staff: '16 team members (7 developers, 3 content, 3 sales, 3 operations)',
      profile: 'SaaS school administration and parent communication portal serving 65 private matriculation and CBSE schools.',
      challenge: 'The school portal needed to launch a new "Annual Fee Collection & Bus GPS Tracking" module before the upcoming June academic term (10 weeks away). The engineering team had accumulated an unorganized 210-item Jira backlog. Developers were working on complex push-notification preferences and bus driver analytics, while the core payment gateway integration remained half-finished. Release was at severe risk of missing the academic reopening deadline.',
      whyChosen: 'Classic agile crisis: fragmented backlog, misallocated engineering effort, and imminent commercial deadline where half-built software equals zero business value.',
      steps: [
        'Called an emergency 1-day Story Mapping workshop with the lead developer, UX designer, school operations manager, and CEO.',
        'Built the horizontal Backbone across a 5-meter whiteboard: Discover Fee -> Review Breakdown -> Select Payment Mode -> Process Transaction -> Receive Receipt -> Notify School Admin.',
        'Populated 120 story cards vertically below each step; discovered the team had prioritized 14 "nice-to-have" reporting features while receipt generation was entirely absent.',
        'Vigorously sliced out "Release 1 — June Reopening Walking Skeleton" by drawing a strict horizontal line. Everything below (automated late-fee penalty calculation, multi-sibling splits, bus geofencing) was moved to Release 2.',
        'Formulated Given/When/Then acceptance tests for the 18 stories in Release 1 and loaded them into 2-week sprint boards.'
      ],
      results: [
        'Delivered the working fee collection skeleton 10 days ahead of the school reopening date.',
        'Processed ₹4.2 Crore in school tuition fees across 48 schools in the first 3 weeks with zero transaction loss.',
        'Eliminated 60% of unnecessary scope from the initial 210-item backlog, saving an estimated 350 engineering hours.',
        'School administrators praised the simplicity of the system, resulting in 17 new school client referrals for the subsequent term.'
      ],
      lessonsLearned: [
        'A horizontal customer journey exposes missing workflow steps that flat vertical backlogs completely hide.',
        'A Walking Skeleton that does the entire job simply is infinitely more valuable than an ambitious system that is 80% complete everywhere.',
        'Physical story mapping creates immediate cross-functional consensus because scope trade-offs are visibly indisputable.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Defined target user persona and their primary business/personal objective',
        'Cross-functional team present: Product Owner, Lead Engineer, UX Designer, and Domain Specialist',
        'Physical wall/whiteboard or collaborative visual canvas (Miro, FigJam)',
        'Clear commercial deadline or release milestone target'
      ],
      steps: [
        'Frame the mapping workshop: identify who the user is and what problem they are solving.',
        'Map the Backbone horizontally: brainstorm user activities from left to right in chronological order.',
        'Break each activity into detailed sequential User Steps along the top row.',
        'Brainstorm user stories vertically beneath each step: write cards with user-centric actions.',
        'Prioritize vertically: place mandatory, frequent, and simple stories high; place variations and enhancements low.',
        'Carve the Walking Skeleton (Release 1): draw a horizontal line capturing the thinnest end-to-end journey.',
        'Draw subsequent horizontal slice lines for Release 2 (enhancements) and Release 3 (scale/polish).',
        'Review each Release 1 story against INVEST criteria and write explicit Given/When/Then acceptance criteria.'
      ],
      checklist: [
        'Does the horizontal Backbone read chronologically from left to right from the customer perspective?',
        'Does the top Release 1 slice allow a user to complete their entire task from start to finish?',
        'Are technical architecture tasks linked to specific user value cards rather than floating unattached?',
        'Has the engineering team verified that the Walking Skeleton is technically feasible within the time box?',
        'Are acceptance criteria written using unambiguous Given/When/Then conditions?'
      ],
      commonMistakes: [
        {
          mistake: 'Allowing the top Release 1 slice to balloon until it includes 80% of all cards on the board.',
          fix: 'Challenge every card: "Can the user finish the core transaction without this?" If yes, move it to Release 2.'
        },
        {
          mistake: 'Structuring the Backbone by technical architecture (Database -> API -> UI) instead of user journey steps.',
          fix: 'Frame every backbone card from the user perspective: "User browses...", "User verifies...", "User pays...".'
        },
        {
          mistake: 'Abandoning the story map after the workshop and reverting to a disconnected flat Jira list.',
          fix: 'Keep the visual map updated weekly in sprint reviews to track progress across the journey.'
        }
      ],
      plan306090: {
        d30: 'Run the first story mapping workshop for the core product workflow, slice the Walking Skeleton, and launch Sprint 1.',
        d60: 'Deliver and deploy Release 1 to beta users; collect feedback and adjust Release 2 story priorities on the map.',
        d90: 'Release Release 2 enhancements; map the next major customer subsystem or value stream.'
      },
      proTips: [
        'Color-code your cards: yellow for user stories, blue for high-level activities, pink for technical/compliance constraints.',
        'Always test your Walking Skeleton with a real non-technical user before coding Release 2 features.',
        'If two team members disagree on whether a story belongs in Release 1, ask: "Will the product literally crash or fail legally without this?" If not, it belongs in Release 2.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Kanban Board',
        reason: 'When managing routine, repetitive operational tasks or bug maintenance with no multi-step user journey.'
      },
      {
        alternative: 'Database Entity-Relationship (ER) Modeling',
        reason: 'When designing technical backend data schemas and normalization; story mapping models user experience, not data architecture.'
      },
      {
        alternative: 'Lean Canvas',
        reason: 'When defining high-level business model viability before scoping software features.'
      }
    ],
    reflectionPrompts: [
      'Look at your current backlog: does your planned next release allow a user to finish an entire end-to-end task, or only parts of several tasks?',
      'How much development time has your team spent on advanced edge-case features while core journey steps remain clunky?',
      'Can your newest developer describe the user’s end-to-end journey from memory without opening a Jira ticket?'
    ],
    quickReferenceCard: [
      'Horizontal Axis: Chronological user journey from left to right (User Activities & Steps)',
      'Vertical Axis: Priority depth (critical essentials at top, nice-to-haves below)',
      'Walking Skeleton: Thinnest functional slice connecting the entire journey end-to-end',
      'Horizontal Release Lines: Carve Release 1 (MVP), Release 2, and Release 3',
      'INVEST Rules: Independent · Negotiable · Valuable · Estimable · Small · Testable',
      'Given / When / Then: Clear testable acceptance criteria on every story card'
    ],
    quiz: [
      {
        id: 'storymap-1',
        question: 'What is the primary role of the horizontal "Backbone" in a User Story Map?',
        options: [
          'To list developer assignments and individual hourly billing rates',
          'To represent the chronological flow of high-level user activities and steps from left to right',
          'To document database entity relationship schemas and API endpoints',
          'To track financial expenditures and marketing promotional budgets'
        ],
        correctAnswer: 1,
        explanation: 'The Backbone forms the top horizontal row of the story map, organizing high-level customer activities in chronological order from left to right, providing essential workflow context.'
      },
      {
        id: 'storymap-2',
        question: 'What defines a "Walking Skeleton" in agile release slicing?',
        options: [
          'A prototype with complete visual design but zero functional backend database connections',
          'The thinnest possible end-to-end functional slice of software that connects all system components and delivers real value',
          'A user story that has been abandoned by the product owner due to excessive complexity',
          'A wireframe mockup created exclusively for marketing brochures'
        ],
        correctAnswer: 1,
        explanation: 'A Walking Skeleton is a minimal, fully functioning end-to-end implementation that links the user interface through the backend infrastructure, proving the entire workflow operates in reality.'
      },
      {
        id: 'storymap-3',
        question: 'How does a User Story Map solve the classic "Flat Backlog Trap" in project management tools?',
        options: [
          'By deleting all low-priority user stories permanently from the database',
          'By structuring stories in a 2D grid that visualizes the end-to-end customer journey horizontally and priority vertically',
          'By replacing human product managers with automated AI story generators',
          'By mandating that all features be delivered within a single 2-week sprint'
        ],
        correctAnswer: 1,
        explanation: 'A flat backlog is a 1D list where context is lost. Story maps provide a 2D spatial view: horizontal journey context and vertical priority depth, preventing disconnected feature development.'
      },
      {
        id: 'storymap-4',
        question: 'In the INVEST criteria for agile user stories, what does the "V" represent?',
        options: [
          'Variable (can change budget during the sprint)',
          'Valuable (delivers demonstrable value to the customer or business)',
          'Verified (pre-approved by corporate legal counsel)',
          'Velocity (measures developer story points per hour)'
        ],
        correctAnswer: 1,
        explanation: 'In INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable), "Valuable" ensures every card delivers tangible benefit to the end user or business, rather than being an isolated technical chore.'
      },
      {
        id: 'storymap-5',
        question: 'Which of the following represents a properly structured acceptance criterion using the standard behavior-driven syntax?',
        options: [
          'The software must run fast and have an attractive mobile user interface',
          'Given a user with a verified mobile number, When they enter the correct 6-digit OTP within 60 seconds, Then they are redirected to the dashboard and an authentication token is issued',
          'Developers should write unit tests for the login screen before Friday',
          'The login page must support both Google and Apple login options eventually'
        ],
        correctAnswer: 1,
        explanation: 'Standard behavior-driven development (BDD) uses Given (preconditions), When (action trigger), and Then (expected measurable outcome) to remove ambiguity for developers and QA engineers.'
      }
    ]
  },
  {
    id: 'abtesting',
    name: 'A/B Testing & Statistical Experimentation',
    shortName: 'A/B Testing',
    category: 'Product & Startup',
    tagline: 'Make scientific product and growth decisions through rigorous online controlled experiments',
    origin: 'Pioneered in clinical trials by Ronald Fisher (1920s-1930s) and adapted for digital web optimization by Google, Amazon, and Microsoft (Ron Kohavi) in the 2000s.',
    corePurpose: 'To replace executive HiPPO (Highest Paid Person\'s Opinion) debates with empirical statistical proof, establishing whether a product or design change causes a true improvement in customer behavior.',
    primaryUsers: [
      'Growth Product Managers & Conversion Rate Optimization (CRO) Specialists',
      'Data Scientists & Experimentation Analysts',
      'Performance Marketers & Acquisition Leads',
      'UX Designers & Frontend Software Engineers',
      'Chief Technology Officers (CTOs) & Heads of Engineering'
    ],
    difficulty: 'Advanced',
    horizon: 'Tactical to Continuous (1 to 4 week test runs; ongoing experimentation program)',
    scope: 'Conversion Funnel, Pricing Tiers, Onboarding Flows, Search Algorithms, and User Interfaces',
    timeToResult: '1 to 2 weeks for power calculation and setup; 2 to 4 full weekly cycles of runtime data collection',
    dataNeeds: 'Baseline conversion rate (p1), Minimum Detectable Effect (MDE), statistical power (1-β, typically 80%), significance level (α, typically 5%), and daily visitor traffic volume',
    keyOutput: 'Sample size requirement, two-proportion z-test results, p-value, confidence intervals, Sample Ratio Mismatch (SRM) audit, and roll-out decision',
    bestPairedWith: 'MVP & Validation (scaling proven concepts), Product Roadmap (optimizing Now themes), Churn Analysis (reducing onboarding drop-offs)',
    keyFeatures: [
      'Mathematical sample size calculator ensuring tests have sufficient statistical power before launching',
      'Two-proportion hypothesis testing (z-test) generating exact p-values and 95% confidence intervals',
      'Automated Sample Ratio Mismatch (SRM) Chi-Square detection to identify corrupt traffic splits',
      'Interactive demonstration of the "Peeking Problem" (inflated Type I false positives from early stopping)',
      'Guardrail metric monitoring (e.g., latency, uninstalls, support tickets) to prevent harmful secondary effects'
    ],
    howItWorks: 'Formulate a falsifiable hypothesis with a clear primary metric, measurable direction, and behavioral mechanism. Calculate the required sample size per variant using baseline conversion rate, desired MDE, 5% alpha, and 80% power. Verify technical traffic allocation (50/50 randomized cookie/user hash). Run the experiment for complete business cycles (minimum 14 full days to balance weekday vs. weekend patterns). Never peek and stop early. Audit for Sample Ratio Mismatch using Chi-Square goodness-of-fit. Calculate the z-statistic and p-value. Inspect guardrail metrics. If p < 0.05, confidence interval is positive, and guardrails are clean: deploy variant to 100% of traffic.',
    coreConcepts: [
      {
        term: 'Statistical Significance (p-value)',
        definition: 'The probability of observing a difference at least as large as the experimental result assuming the null hypothesis (no true difference) is true. Typically thresholded at p < 0.05 (5%).'
      },
      {
        term: 'Statistical Power (1 - β)',
        definition: 'The probability of correctly detecting a true effect when one actually exists; industry standard is 80% (β = 0.20, or a 20% Type II false negative risk).'
      },
      {
        term: 'Minimum Detectable Effect (MDE)',
        definition: 'The smallest relative or absolute percentage lift between Control and Variant that an experiment is powered to detect reliably.'
      },
      {
        term: 'The Peeking Problem',
        definition: 'Repeatedly checking p-values during an ongoing test and stopping early when "significance" appears; dramatically inflates the true false positive rate from 5% to over 30%.'
      },
      {
        term: 'Sample Ratio Mismatch (SRM)',
        definition: 'A failure where the observed split of visitors (e.g., 52/48 on a 50/50 test) deviates significantly from the expected ratio, indicating tracking bugs, bot filtering, or redirect errors that invalidate results.'
      },
      {
        term: 'Guardrail Metrics',
        definition: 'Metrics tracked alongside the primary goal to ensure the variant does not cause unintended collateral damage (e.g., page load latency, return rates, customer support contacts).'
      },
      {
        term: 'HiPPO Effect',
        definition: 'Highest Paid Person\'s Opinion; the organizational failure mode where product decisions are made based on executive seniority rather than empirical evidence.'
      }
    ],
    strengths: [
      'Provides definitive causal proof rather than deceptive correlation or seasonal coincidence',
      'Protects business revenue by preventing well-intentioned but commercially harmful designs from being rolled out',
      'Fosters an objective, data-driven engineering and product culture where the best idea wins regardless of rank',
      'Compound gains from dozens of 3-5% conversion lifts compound into massive annual revenue growth'
    ],
    limitations: [
      'Requires substantial visitor traffic volume; low-traffic startups cannot achieve statistical power in reasonable timeframes',
      'Tests incremental optimizations exceptionally well, but cannot invent radical 10x breakthrough business models on its own',
      'Vulnerable to statistical malpractice: peeking, cherry-picking metric goals post-test, or ignoring SRM warnings',
      'Focusing exclusively on short-term conversions can blind teams to long-term customer retention damage'
    ],
    workflowPlacement: {
      upstream: 'Takes hypothesis ideas from UX usability audits, customer churn drop-off analytics, and Product Roadmap themes',
      downstream: 'Feeds engineering production deployment pipelines and informs future thematic roadmap iterations'
    },
    useCases: [
      {
        title: 'D2C Checkout Friction Reduction',
        situation: 'An organic skincare brand with 40,000 monthly checkout visits suffered a 68% cart abandonment rate.',
        problem: 'Debate between marketing (demanding a multi-step gift selection) and product (advocating a 1-page express UPI checkout).',
        action: 'Ran a 14-day 50/50 A/B test powered for a 10% MDE; tracked completed purchases as primary metric and return rate as guardrail.',
        outcome: '1-page express checkout produced a +14.2% lift in completed orders (p = 0.002) with zero change in returns; generated ₹18 lakh in additional monthly ARR.'
      },
      {
        title: 'SaaS Free-Trial Credit Card Gate',
        situation: 'A B2B project software company required credit cards upfront during 14-day free trial signups.',
        problem: 'Acquisition team argued removing the credit card would triple signups; sales argued it would flood the pipeline with low-quality leads.',
        action: 'Conducted a 21-day experiment measuring downstream paid customer activations at Day 30 rather than top-of-funnel signups.',
        outcome: 'No-card variant increased initial signups by 180%, but 30-day paid conversion dropped 70%, yielding an 8% net revenue loss; test prevented a fatal mistake.'
      },
      {
        title: 'EdTech Course Pricing Display',
        situation: 'A professional upskilling platform tested displaying prices as "₹1,999/month" vs. "₹22,000 billed annually".',
        problem: 'Monthly framing boosted initial checkout starts, but finance feared higher mid-year cancellation churn.',
        action: 'A/B tested the pricing cards while tracking payment gateway completion rates and auto-debit success rates as guardrails.',
        outcome: 'Monthly framing with an annual savings badge increased total cash collections by 22% with p = 0.014.'
      },
      {
        title: 'News Media Subscription Paywall',
        situation: 'Regional digital news publisher testing a 3-article metered paywall vs. a hard registration wall.',
        problem: 'Editorial feared a hard wall would destroy SEO impressions and ad impressions.',
        action: 'Ran an experiment using user-level cookie splitting; monitored subscription starts and total pageviews per session.',
        outcome: 'Metered paywall converted 8.5% of loyal readers while preserving 94% of ad impressions, optimizing total revenue.'
      }
    ],
    caseStudy: {
      company: 'AyurVeda Direct (Bengaluru, Karnataka)',
      revenue: '₹14 Crore annual GMV',
      staff: '34 employees (6 growth/tech, 12 ops/fulfillment, 16 marketing/support)',
      profile: 'D2C wellness and herbal personal care e-commerce brand driving 120,000 monthly unique visitors through Instagram, Meta ads, and Google Shopping.',
      challenge: 'The marketing agency insisted on adding a prominent "15% First-Order Discount Popup" appearing after 5 seconds on all product detail pages. The CEO loved the idea, but the lead developer warned it would cannibalize full-price purchases from users already planning to buy and slow down mobile loading speed. The team was locked in an emotional HiPPO debate.',
      whyChosen: 'Classic e-commerce dilemma where an intuitive promotion might increase conversion percentage but reduce net profit margins, requiring empirical experimentation.',
      steps: [
        'Formulated a falsifiable hypothesis: "Displaying a 15% discount popup after 5 seconds will increase overall conversion to purchase without reducing net gross profit per visitor."',
        'Defined metrics: Primary Metric = Revenue Per Visitor (RPV); Secondary Metric = Order Conversion Rate (CR); Guardrail Metric = Average Order Value (AOV) and Mobile Bounce Rate.',
        'Calculated sample size: Baseline CR = 2.4%, MDE = 12% relative lift, α = 0.05, Power = 80%. Required sample = 28,500 visitors per variant (~14 days of traffic).',
        'Built a 50/50 server-side random split to eliminate flickering; verified tracking events in Google Analytics 4 and custom backend database.',
        'Ran the test for exactly 14 full days (two complete Monday-Sunday retail cycles); strictly enforced a no-peeking policy.'
      ],
      results: [
        'Sample size reached 31,200 visitors in Control and 31,050 in Variant (SRM Chi-Square p = 0.54, confirming an uncorrupted split).',
        'Variant CR increased from 2.40% to 2.58% (+7.5% lift, p = 0.12, not statistically significant).',
        'However, AOV in the Variant dropped from ₹1,250 to ₹1,080 (-13.6% reduction) because existing buyers used the coupon.',
        'Net Revenue Per Visitor (RPV) dropped from ₹30.00 to ₹27.86 (a statistically significant -7.1% loss of revenue, p = 0.038).',
        'The experiment conclusively proved the discount popup would have destroyed over ₹10 Lakh in annual gross profit.'
      ],
      lessonsLearned: [
        'Tracking only top-line conversion rate can be dangerously misleading; always track Net Revenue Per Visitor and financial guardrails.',
        'A/B testing saved the company from an expensive executive intuition mistake that would have eroded margins indefinitely.',
        'Establishing fixed sample size and test duration in advance eliminated executive temptation to declare a premature victory on Day 3.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Sufficient traffic volume to reach statistical power within 2 to 4 weeks (use the sample size calculator)',
        'Event analytics infrastructure capable of tracking visitor-level conversion funnels',
        'Technical ability to randomize visitors (cookies or user IDs) without UI flickering',
        'Agreement across leadership to honor the statistical outcome and not cherry-pick post-hoc metrics'
      ],
      steps: [
        'Identify a clear optimization opportunity from analytics drop-off funnels or user session recordings.',
        'Draft a falsifiable hypothesis: identify the specific UI change, expected behavioral mechanism, and primary metric.',
        'Calculate required sample size per variant using baseline conversion, MDE, 5% alpha, and 80% power.',
        'Select guardrail metrics to monitor system health and downstream customer value.',
        'Deploy the test with 50/50 randomized traffic allocation; test on multiple devices to ensure zero flicker.',
        'Run the test for at least 14 full days to cover two complete weekly behavioral cycles; do not stop early.',
        'Audit the sample split for Sample Ratio Mismatch (SRM) using a Chi-Square test (p > 0.01 required).',
        'Calculate the two-proportion z-statistic, p-value, and 95% confidence interval.',
        'If p < 0.05, the confidence interval is strictly positive, and guardrails are uncompromised: deploy Variant.'
      ],
      checklist: [
        'Was the sample size and test duration calculated and documented before launching?',
        'Does the experiment duration cover complete weekly cycles (minimum 14 full days)?',
        'Has a Sample Ratio Mismatch (SRM) audit verified that traffic split within statistical expectations?',
        'Are guardrail metrics (latency, unsubscribes, return rates, margins) verified to be neutral or positive?',
        'Did the team resist stopping early when temporary significance appeared during the first week?'
      ],
      commonMistakes: [
        {
          mistake: 'Checking the test on Day 3, seeing p = 0.03, and immediately shipping to 100% of traffic.',
          fix: 'Enforce the "No-Peeking Rule": pre-commit to a fixed runtime (e.g. 14 days) or use sequential testing mathematics.'
        },
        {
          mistake: 'Running A/B tests on websites with only 200 visitors per week, taking 2 years to reach significance.',
          fix: 'If traffic is low, use qualitative user testing, customer interviews, or large radical redesigns instead of micro-tests.'
        },
        {
          mistake: 'Testing 10 different metrics and celebrating whichever one happens to show p < 0.05 (p-hacking).',
          fix: 'Pre-register a single Primary Success Metric before launching the test; treat all other metrics as exploratory.'
        }
      ],
      plan306090: {
        d30: 'Set up experimentation infrastructure, verify event tracking, conduct an A/A validation test, and launch the first A/B test.',
        d60: 'Complete first 2 tests, publish findings in an internal experimentation repository, and audit for SRM errors.',
        d90: 'Establish a bi-weekly experimentation cadence, train product and design teams on hypothesis design, and scale testing velocity.'
      },
      proTips: [
        'Always run an A/A test (splitting 50/50 with identical pages) first: if your tool reports a winner, your tracking is broken.',
        'A flat test with no statistically significant winner is not a failure—it proves the proposed redesign is safe or unimportant, saving engineering time.',
        'The best experiments test bold, distinct hypotheses rather than subtle 2-pixel button color tweaks.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Qualitative Usability Testing & Customer Interviews',
        reason: 'When your product has low traffic (under 5,000 visitors per month) where achieving statistical power would take half a year.'
      },
      {
        alternative: 'MVP & Prototype Smoke Tests',
        reason: 'When testing whether an entirely new product concept should exist at all, rather than optimizing an established funnel.'
      },
      {
        alternative: 'Cohort Retention & Churn Analysis',
        reason: 'When analyzing long-term multi-month customer loyalty and recurring subscription renewals.'
      }
    ],
    reflectionPrompts: [
      'How many times in the last year did your team ship a feature based on an executive opinion that failed to move any business metric?',
      'Does your organization celebrate inconclusive test results that prevented commercially harmful code from shipping?',
      'If an A/B test proves your favorite design variant reduces revenue, do you have the discipline to delete the code?'
    ],
    quickReferenceCard: [
      'Two-proportion z-test: Determines if difference between Control and Variant is real or random chance',
      'Significance threshold: p < 0.05 (less than 5% probability of false positive)',
      'Power threshold: 80% (ability to detect true effect if it exists)',
      'No-Peeking Rule: Never stop a test early based on interim p-values; run full weekly cycles (minimum 14 days)',
      'Sample Ratio Mismatch (SRM): Chi-Square audit ensuring traffic split matches expected ratio (e.g. 50/50)',
      'Always track Guardrail Metrics to ensure conversion lifts don’t damage customer experience or profit margins'
    ],
    quiz: [
      {
        id: 'ab-1',
        question: 'What is the "Peeking Problem" in digital A/B testing and why is it dangerous?',
        options: [
          'Competitors looking at your website changes before you officially announce them',
          'Continuously checking p-values during an ongoing test and stopping early when significance appears, which inflates false positive rates from 5% to over 30%',
          'Users discovering hidden coupon codes in the browser developer console',
          'Search engines indexing experimental variants and lowering SEO ranking'
        ],
        correctAnswer: 1,
        explanation: 'The peeking problem occurs when teams repeatedly monitor p-values and stop as soon as p < 0.05. Because random noise fluctuates, early stopping dramatically inflates the Type I error (false positive) rate.'
      },
      {
        id: 'ab-2',
        question: 'In statistical experimentation, what does a p-value of 0.03 indicate?',
        options: [
          'There is exactly a 3% chance that Variant B will generate revenue',
          'Assuming the null hypothesis is true (no real difference), there is only a 3% probability of observing a difference this large by random chance alone',
          'The conversion rate has increased by exactly 3.0%',
          'The test was run with only 3% of total website visitors'
        ],
        correctAnswer: 1,
        explanation: 'A p-value measures the probability of observing the data (or more extreme data) under the assumption that the null hypothesis is true. A p of 0.03 (< 0.05) is statistically significant.'
      },
      {
        id: 'ab-3',
        question: 'What is a Sample Ratio Mismatch (SRM) and what action must a team take when it is detected?',
        options: [
          'A minor discrepancy in font size; the team should proceed with the rollout immediately',
          'A statistically significant deviation between expected and actual visitor splits (e.g., 52/48 on a 50/50 test), indicating data corruption that invalidates the test results',
          'An error where mobile users outnumber desktop users, requiring mobile ads to be paused',
          'A discrepancy between credit card and debit card payment transactions'
        ],
        correctAnswer: 1,
        explanation: 'SRM occurs when the observed visitor ratio deviates significantly from the planned split (tested via Chi-Square). It signals severe tracking bugs, bot skew, or redirect drop-offs, making test results unreliable.'
      },
      {
        id: 'ab-4',
        question: 'Why must digital A/B tests be run for complete weekly cycles (e.g., 14 or 21 full days)?',
        options: [
          'To ensure digital analytics platforms have time to generate billing invoices',
          'To account for day-of-week behavioral differences (weekday work hours vs. weekend leisure habits)',
          'Because web servers require 7 days of caching before recording accurate traffic',
          'To give marketing agencies enough time to draft executive press releases'
        ],
        correctAnswer: 1,
        explanation: 'User behavior differs dramatically between weekdays and weekends. Running experiments for full 7-day cycles (ideally 14 or 21 days) ensures day-of-week effects are evenly balanced.'
      },
      {
        id: 'ab-5',
        question: 'What is the purpose of a "Guardrail Metric" in an A/B experimentation program?',
        options: [
          'To restrict developer access to server production code',
          'To monitor organizational health, user experience, and financial integrity ensuring that optimizing the primary metric does not cause unintended collateral damage',
          'To calculate sales commissions for the growth marketing team',
          'To ensure all web pages conform to corporate logo branding guidelines'
        ],
        correctAnswer: 1,
        explanation: 'Guardrail metrics (e.g., page load speed, refund rates, customer unsubscribe rates, net margins) protect the business by ensuring a lift in the primary goal does not degrade overall health.'
      }
    ]
  },
  {
    id: 'churnanalysis',
    name: 'Cohort Retention & SaaS Churn Analysis',
    shortName: 'Churn Analysis',
    category: 'Product & Startup',
    tagline: 'Diagnose the health of your recurring revenue engine and stop the leaky bucket before scaling acquisition',
    origin: 'Pioneered in telecommunications, actuarial science, and SaaS metrics frameworks popularized by David Skok (Matrix Partners) and Tomasz Tunguz (Redpoint Ventures).',
    corePurpose: 'To measure and diagnose customer and revenue attrition, separate voluntary cancellations from involuntary technical payment failures, and identify early warning signals across monthly cohorts to maximize Net Revenue Retention (NRR).',
    primaryUsers: [
      'Chief Revenue Officers (CROs) & VPs of Customer Success',
      'SaaS Founders & Chief Financial Officers (CFOs)',
      'Product Managers & Growth Engineers',
      'Customer Retention & Account Management Specialists',
      'Venture Capital Investors & Board Members'
    ],
    difficulty: 'Intermediate',
    horizon: 'Tactical to Strategic (Monthly cohort tracking; rolling 12-month LTV evaluation)',
    scope: 'Entire Customer Base, Subscription Tiers, Geographic Regions, or Acquisition Cohorts',
    timeToResult: '1 to 2 days for initial cohort data aggregation; continuous monthly operating dashboard review',
    dataNeeds: 'Monthly customer starting counts, lost customers, starting MRR, expansion MRR, churned MRR, product usage telemetry, and payment gateway failure logs',
    keyOutput: 'Monthly cohort retention heatmap matrix, Customer Churn Rate, Gross/Net Revenue Retention (NRR), LTV:CAC health ratio, and Customer Health Scorecard',
    bestPairedWith: 'Break-Even & Financial Performance (unit economics), Product Roadmap (prioritizing onboarding themes), A/B Testing (testing retention saves)',
    keyFeatures: [
      'Monthly cohort retention heatmap tracking percentage of active customers across Months 0 to 12',
      'Mathematical formulas for Customer Churn Rate, MRR Churn Rate, and Net Revenue Retention (NRR)',
      'Crucial split between Voluntary Churn (dissatisfaction, competitor switch) and Involuntary Churn (failed payment mandates)',
      'Customer Lifetime Value (LTV) and LTV:CAC unit economics calculation engine',
      'Composite Customer Health Score formula incorporating product usage frequency, support ticket severity, and NPS'
    ],
    howItWorks: 'Extract monthly subscriber data and organize customers into signup cohorts by month of acquisition. Track each cohort across subsequent months to plot a retention curve; healthy cohorts flatten into a horizontal line, while unviable products decay toward zero. Calculate monthly Customer Churn Rate (lost accounts ÷ starting accounts) and Net Revenue Retention (Ending MRR from existing customers ÷ Starting MRR). Categorize cancellations into voluntary vs. involuntary payment failures. Inspect customer telemetry for leading indicators of churn (e.g. drop in weekly logins, unresolved support tickets). Implement targeted interventions: automated dunning workflows for payment recovery, guided onboarding for early churn, and executive outreach for high-value accounts.',
    coreConcepts: [
      {
        term: 'Customer (Logo) Churn Rate',
        definition: 'The percentage of paying customer accounts that cancel or fail to renew their subscription during a given time period: (Customers Lost ÷ Starting Customers) × 100.'
      },
      {
        term: 'Net Revenue Retention (NRR)',
        definition: 'The percentage of recurring revenue retained from existing customers over a period, factoring in downgrades, churn, and expansion (upgrades/cross-sells): (Starting MRR + Expansion - Contraction - Churn) ÷ Starting MRR. Rates > 100% indicate net negative churn.'
      },
      {
        term: 'Involuntary (Passive) Churn',
        definition: 'Churn caused by technical payment processing failures (expired credit cards, failing UPI AutoPay mandates, bank timeouts) rather than an intentional decision by the customer to terminate service.'
      },
      {
        term: 'Cohort Retention Curve',
        definition: 'A visual chart plotting the percentage of customers remaining active over time for groups that started in the same month. A flattening curve indicates product-market fit.'
      },
      {
        term: 'Customer Lifetime Value (LTV)',
        definition: 'The total net profit or revenue expected from a customer relationship over its lifespan: Average Revenue Per User (ARPU) ÷ Monthly Customer Churn Rate (multiplied by Gross Margin % for margin LTV).'
      },
      {
        term: 'LTV:CAC Ratio',
        definition: 'The golden ratio of unit economics comparing customer lifetime value to customer acquisition cost. A healthy benchmark is 3.0:1 or higher.'
      },
      {
        term: 'Customer Health Score',
        definition: 'A predictive composite index (0–100) combining login telemetry, feature depth, support ticket sentiment, and payment history to flag at-risk accounts 60–90 days before renewal.'
      }
    ],
    strengths: [
      'Exposes the "leaky bucket" syndrome, preventing companies from wasting acquisition budgets on unviable products',
      'Separates technical payment mandate failures from genuine customer product dissatisfaction',
      'Provides the single most critical predictor of SaaS valuation and business longevity (Net Revenue Retention)',
      'Enables proactive customer success intervention weeks before a cancellation officially occurs'
    ],
    limitations: [
      'Historical churn is a lagging indicator; by the time an account cancels, the underlying problem occurred months earlier',
      'Requires clean, reconciled billing and telemetry data across CRM, payment gateways, and databases',
      'Average aggregate churn metrics can mask extreme polarization between enterprise accounts and self-serve tiers',
      'Small monthly percentage differences compound into massive annual retention variances that non-financial executives often underestimate'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Billing and Payment Gateway logs, CRM subscription records, and Product Usage Telemetry',
      downstream: 'Feeds Product Roadmap outcome prioritization (retention themes), Sales qualification rules, and Customer Success playbooks'
    },
    useCases: [
      {
        title: 'B2B SaaS Onboarding Drop-Off Audit',
        situation: 'A 400-customer CRM startup in Chennai had high sales acquisition but suffered a 5.5% monthly customer churn rate.',
        problem: 'The team assumed churn was driven by competitor pricing, but exit interviews were rare and inconclusive.',
        action: 'Mapped monthly cohort retention curves and analyzed telemetry; discovered 42% of churned accounts never imported contacts during Week 1.',
        outcome: 'Introduced guided 14-day human onboarding for new signups; Month 1 retention improved from 72% to 89%; overall monthly churn dropped to 3.2%.'
      },
      {
        title: 'D2C Subscription Payment Recovery',
        situation: 'A specialty coffee subscription brand with 6,000 monthly active subscribers noticed a surge in monthly cancellations.',
        problem: 'Customer service was overwhelmed by cancellation tickets, assuming customers were cutting household budgets.',
        action: 'Analyzed billing logs to split voluntary from involuntary churn; discovered 48% of losses were recurring UPI AutoPay bank mandate timeouts.',
        outcome: 'Implemented an automated WhatsApp payment failure notification with an instant retry link; recovered 54% of failed transactions.'
      },
      {
        title: 'EdTech Test Prep Annual Renewal Optimization',
        situation: 'An online competitive exam coaching portal with 12,000 enrolled annual students.',
        problem: 'Year 2 student renewals hovered at only 28%, severely impairing enterprise valuation.',
        action: 'Built a predictive Customer Health Score combining mock test attempts, video hours, and mentor chat frequency.',
        outcome: 'Academic mentors reached out to students scoring below 40 health points 60 days before exam season; Year 2 renewal jumped to 52%.'
      },
      {
        title: 'Enterprise IT Maintenance Contract Health',
        situation: 'An enterprise cloud hosting provider with 120 corporate clients on ₹5-25 lakh annual contracts.',
        problem: 'Two major enterprise accounts unexpectedly chose not to renew, erasing ₹35 lakh in high-margin ARR.',
        action: 'Instituted quarterly Executive Business Reviews (EBRs) and tracked unresolved Severity-1 support tickets in health scorecards.',
        outcome: 'Identified 4 at-risk accounts 90 days prior to renewal; resolved infrastructure bottlenecks and achieved 114% Net Revenue Retention.'
      }
    ],
    caseStudy: {
      company: 'FeeTrack (Madurai, Tamil Nadu)',
      revenue: '₹1.1 Crore ARR',
      staff: '18 employees (6 engineering, 5 customer success/support, 4 sales, 3 ops)',
      profile: 'B2B vertical SaaS platform providing automated student fee collection, attendance management, and parent SMS alerts to 600 private tuition academies and coaching institutes.',
      challenge: 'The company was acquiring 40 new coaching institutes every month via aggressive sales marketing, but losing 30 institutes to churn each month (5.0% monthly logo churn). Annual logo retention was capped at a dismal 54% (0.95^12). The company was burning through cash on customer acquisition to remain on a treadmill, and venture capital investors refused Series A funding until the leaky bucket was fixed.',
      whyChosen: 'Textbook SaaS leaky bucket crisis: high top-of-funnel sales masking severe customer retention failure, requiring cohort analysis and involuntary churn separation.',
      steps: [
        'Aggregated 18 months of billing and product telemetry data into a monthly cohort retention matrix.',
        'Separated historical churn into Voluntary (dissatisfaction, closure) and Involuntary (failed debit mandate, expired card, bank error).',
        'Discovered that 38% of all churn was involuntary: institute owners’ bank accounts had insufficient balance on the 1st of the month, triggering bank mandate cancellations without warning.',
        'Telemetry analysis revealed that institutes that did not send their first fee SMS reminder within 14 days of signup had an 80% probability of churning by Month 3.',
        'Engineered an automated Dunning system: intelligent retry schedule on the 3rd, 5th, and 7th of the month paired with automated WhatsApp alerts to the institute director.',
        'Restructured customer success into a mandatory 14-day "Onboarding Concierge" program that configured the institute\'s student database and launched their first live fee SMS.'
      ],
      results: [
        'Monthly logo churn plummeted from 5.0% to 2.8% within 6 months.',
        'Involuntary churn was reduced by 62% through automated WhatsApp retry notifications.',
        'Annual customer retention surged from 54% to 71%, expanding average customer lifetime from 20 months to 36 months.',
        'Net Revenue Retention (NRR) climbed from 88% to 106% as retained institutes added more student seats and opted for branded SMS packages.',
        'Successfully closed an ₹8 Crore Series A funding round on the strength of world-class unit economics and a 4.2:1 LTV:CAC ratio.'
      ],
      lessonsLearned: [
        'Never treat churn as a single blended number; separating voluntary from involuntary churn often reveals quick operational wins.',
        'The first 14 days of customer onboarding dictate 80% of long-term cohort retention.',
        'Fixing churn is the highest ROI growth strategy in SaaS: reducing churn from 5% to 2.8% was equivalent to doubling the sales team.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Subscription billing system recording starting MRR, lost MRR, upgrades, and cancellations',
        'Customer database capable of tagging accounts by acquisition cohort (signup month)',
        'Product telemetry tracking active user sessions and core feature utilization',
        'Customer success team empowered to conduct exit interviews and trigger proactive interventions'
      ],
      steps: [
        'Extract monthly subscriber records for the past 12 to 24 months.',
        'Construct a Cohort Retention Heatmap: rows = signup month, columns = Month 0 to Month 12 retention percentage.',
        'Calculate monthly Customer Churn Rate: (Lost Accounts ÷ Starting Accounts) × 100.',
        'Calculate Net Revenue Retention (NRR): (Starting MRR + Expansion - Contraction - Churn) ÷ Starting MRR.',
        'Audit cancellation reasons and classify into Voluntary Churn vs. Involuntary Payment Failures.',
        'Implement automated dunning recovery workflows (card expiry notices, retries, WhatsApp/SMS links).',
        'Construct a Customer Health Score formula combining usage recency, feature depth, and support sentiment.',
        'Establish a weekly at-risk account review meeting to trigger targeted interventions before renewal dates.'
      ],
      checklist: [
        'Is churn tracked by both customer count (logo churn) AND recurring revenue (MRR churn)?',
        'Is Net Revenue Retention (NRR) calculated and reviewed monthly by executive leadership?',
        'Are technical payment gateway failures segregated from voluntary product cancellations?',
        'Does the cohort retention curve flatten horizontally after Month 3 to Month 6?',
        'Is there an automated dunning process actively retrying failed recurring subscription payments?'
      ],
      commonMistakes: [
        {
          mistake: 'Calculating churn by dividing lost customers by ending customers instead of starting customers.',
          fix: 'Always use starting customers in the denominator: Churn = Lost in Month ÷ Starting on Day 1.'
        },
        {
          mistake: 'Focusing exclusively on logo churn while ignoring net revenue retention (NRR).',
          fix: 'Track NRR: high expansion revenue from enterprise clients can produce negative net churn even with modest logo loss.'
        },
        {
          mistake: 'Accepting "customer didn’t need it anymore" as a valid exit survey explanation.',
          fix: 'Conduct deep-dive exit interviews to uncover the root cause (e.g., poor onboarding, lack of team training, missing feature).'
        }
      ],
      plan306090: {
        d30: 'Build the 12-month cohort retention matrix, calculate historical NRR, and split voluntary vs. involuntary churn.',
        d60: 'Deploy automated payment retry notifications for involuntary churn and launch a 14-day guided onboarding playbook.',
        d90: 'Implement predictive Customer Health Scorecards in the CRM and conduct weekly proactive intervention reviews.'
      },
      proTips: [
        'Invert the cohort curve: instead of asking "How many canceled?", ask "What shared behaviors distinguish the cohort members who stayed for 2 years?"',
        'Recovering involuntary payment failures with automated WhatsApp messages has an ROI exceeding 1,000%—it is the lowest-hanging fruit in subscription businesses.',
        'A company with 5% monthly churn must replace 46% of its entire customer base every single year just to stay even.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Customer Acquisition Funnel Analytics',
        reason: 'When optimizing top-of-funnel landing page conversion and ad spend efficiency rather than existing customer loyalty.'
      },
      {
        alternative: 'Transactional Retail Sales Analysis',
        reason: 'When analyzing one-off, non-recurring retail purchases with no subscription or account relationship.'
      },
      {
        alternative: 'Activity-Based Costing (ABC)',
        reason: 'When allocating indirect overhead costs across physical factory manufacturing lines.'
      }
    ],
    reflectionPrompts: [
      'If you turn off all advertising spend tomorrow, how many months would your current recurring revenue sustain your team?',
      'What percentage of your churned customers last quarter left because of a technical payment failure rather than an active choice to quit?',
      'Do you know which specific action in your product during the first 7 days turns a casual user into a multi-year customer?'
    ],
    quickReferenceCard: [
      'Customer Churn Rate: (Lost Accounts ÷ Starting Accounts) × 100',
      'Net Revenue Retention (NRR): (Starting MRR + Expansion - Contraction - Churn) ÷ Starting MRR',
      'NRR > 100% means existing cohorts expand in value over time (Net Negative Churn)',
      'Split Churn: Voluntary (product dissatisfaction/competition) vs. Involuntary (failed payment mandates)',
      'Cohort Retention Curve: Must flatten into a horizontal line to indicate sustainable product-market fit',
      'Customer Lifetime Value (LTV): ARPU ÷ Monthly Customer Churn Rate'
    ],
    quiz: [
      {
        id: 'churn-1',
        question: 'A SaaS company starts the month with 250 paying accounts and loses 10 accounts during the month. What is its monthly customer churn rate?',
        options: [
          '2.5%',
          '4.0%',
          '10.0%',
          '25.0%'
        ],
        correctAnswer: 1,
        explanation: 'Monthly Customer Churn Rate = Customers Lost ÷ Starting Customers = 10 ÷ 250 = 0.04 or 4.0%.'
      },
      {
        id: 'churn-2',
        question: 'What does a Net Revenue Retention (NRR) rate exceeding 100% signify for a subscription business?',
        options: [
          'Zero customers canceled their subscriptions during the period',
          'Expansion revenue (upgrades, cross-sells) from retained customers exceeded revenue lost to churn and downgrades',
          'The company achieved exceptional top-of-funnel sales acquisition from new customers',
          'Subscription prices were heavily discounted across the board'
        ],
        correctAnswer: 1,
        explanation: 'An NRR > 100% means existing customer cohorts expand in revenue over time ("net negative churn"), meaning the business grows organically even without acquiring any new customers.'
      },
      {
        id: 'churn-3',
        question: 'If a subscription software business retains 95% of its customers each month (5% monthly churn), what is its approximate annual customer retention rate?',
        options: [
          '95%',
          '80%',
          '54%',
          '40%'
        ],
        correctAnswer: 2,
        explanation: 'Compounding monthly retention: (0.95)^12 ≈ 0.5404 or approximately 54%. Small monthly churn numbers compound over a 12-month period into significant annual customer attrition.'
      },
      {
        id: 'churn-4',
        question: 'Which of the following scenarios represents an example of involuntary (passive) churn?',
        options: [
          'A customer cancels because a competitor launched a lower-priced tier with more features',
          'A customer\'s recurring UPI AutoPay mandate fails due to bank timeout and the subscription lapses without notice',
          'A client closes down their business due to external macroeconomic downturn',
          'A customer finds the software interface too complex and stops logging in'
        ],
        correctAnswer: 1,
        explanation: 'Involuntary churn is triggered by technical payment gateway failures, expired cards, or failing recurring debit mandates, rather than an active decision by the customer to terminate service.'
      },
      {
        id: 'churn-5',
        question: 'Why is cohort retention analysis mathematically superior to tracking a single blended monthly churn percentage?',
        options: [
          'Cohort analysis requires less calculation effort in spreadsheets',
          'It separates customer groups by signup date, showing whether onboarding improvements actually increase retention in recent cohorts',
          'It eliminates the need to track customer acquisition cost (CAC)',
          'It guarantees that churn will drop to zero within 6 months'
        ],
        correctAnswer: 1,
        explanation: 'A single blended churn number is masked by new user influx. Cohort analysis isolates groups by vintage, revealing whether product and onboarding changes actually improve long-term retention curves.'
      }
    ]
  }
];

export const CATEGORY_9_STACKS: StrategyStack[] = [
  {
    id: 'stack-product-startup',
    name: 'Stack A — Lean Startup & Incubatee Tool Stack',
    targetOrg: 'Pre-seed to Seed startups, incubatees, and solo founders (1-10 people, ₹0–low budget)',
    recommendedChain: ['mvp', 'userstorymapping', 'productroadmap'],
    cadence: {
      quarterly: 'Reset Now/Next/Later roadmap horizons based on validated MVP learnings and investor milestones.',
      annually: 'Comprehensive business model review, market sizing audit, and foundational product strategy refresh.',
      every23Years: 'Pivot evaluation or expansion into secondary adjacent product categories.'
    },
    whyItFits: 'Minimizes cash burn by replacing custom code development with smoke tests and concierge MVPs, structuring only validated features into a walking skeleton.',
    whatToSkip: 'Skip heavy enterprise roadmapping software, A/B testing platforms (insufficient traffic), and formal statistical power calculators.'
  },
  {
    id: 'stack-product-growth',
    name: 'Stack B — Scaling SME & Venture-Backed Product Stack',
    targetOrg: 'Growing startups & mid-market SMEs (10-100 people, paying customers, active marketing traffic)',
    recommendedChain: ['productroadmap', 'userstorymapping', 'abtesting', 'churnanalysis'],
    cadence: {
      quarterly: 'Reset 4-6 problem themes with executive stakeholders; review cohort retention curves and LTV:CAC health.',
      annually: 'Full product portfolio audit, RICE prioritization calibration, and annual pricing tier review.',
      every23Years: 'Core platform architecture re-platforming and expansion into enterprise multi-tier offerings.'
    },
    whyItFits: 'Provides a complete product optimization loop: roadmaps set direction, story mapping scopes releases, A/B testing optimizes funnels, and churn analysis protects recurring revenue.',
    whatToSkip: 'Skip premature multivariate tests on low-volume secondary pages and over-engineered ML-based churn predictors.'
  },
  {
    id: 'stack-product-enterprise',
    name: 'Stack C — Enterprise Digital Transformation & Portfolio Stack',
    targetOrg: 'Large enterprises, banks, healthcare groups & mature tech companies (100+ people, multiple product lines)',
    recommendedChain: ['productroadmap', 'abtesting', 'churnanalysis', 'userstorymapping'],
    cadence: {
      quarterly: 'Quarterly portfolio prioritization council; multi-product NRR benchmark review; governance board sign-off.',
      annually: 'Corporate digital transformation portfolio audit, experimentation platform governance review, and customer retention targets.',
      every23Years: 'Enterprise legacy system modernization and multi-division digital capability benchmarking.'
    },
    whyItFits: 'Ensures strict alignment across competing business units, enforces statistical experiment guardrails, and safeguards multi-crore recurring ARR.',
    whatToSkip: 'Skip unvetted public smoke tests that expose brand identity risk without legal compliance review.'
  }
];

export const CATEGORY_9_SCENARIOS: ScenarioMission[] = [
  {
    id: 'mission-mvp-logistics',
    title: 'The ₹25 Lakh Logistics Tracking App Dilemma',
    role: 'Head of Operations',
    companyContext: 'A 40-person regional third-party logistics company in Tamil Nadu managing 500 business consignments per day.',
    crisisPrompt: 'The CEO wants to commit ₹25 lakh of working capital to build a custom customer-tracking mobile app because "competitors have one." Customers currently check consignment status via phone calls to dispatch. What is your strategic move using MVP & Validation tools?',
    targetTools: ['mvp', 'userstorymapping'],
    options: [
      {
        id: 'opt-mvp-1',
        label: 'Immediately issue an RFP to software agencies to build native iOS and Android apps with GPS tracking',
        toolUsed: 'Pre-mature custom development',
        explanation: 'Incurs ₹25 lakh expenditure and 6 months of delivery delay without validating whether commercial B2B clients actually want a mobile app over simpler communication channels.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-mvp-2',
        label: 'Run a 3-week Wizard of Oz MVP using automated-looking WhatsApp status updates prepared manually by a dispatcher for 50 key clients',
        toolUsed: 'MVP & Validation (Wizard of Oz archetype)',
        explanation: 'Masterful Lean Startup application! Validates client willingness to use digital tracking in 3 weeks at near-zero capital cost, measuring inbound call reduction against a 40% pre-committed target.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-mvp-3',
        label: 'Survey all 500 customers by asking "Would you use our mobile tracking app if we launched it next month?"',
        toolUsed: 'Survey opinion bias',
        explanation: 'Surveys measure polite verbal opinions rather than actual skin-in-the-game behavior. Clients frequently say "yes" to sound modern but never download or use the finished application.',
        isOptimal: false,
        rubricPoints: 8
      },
      {
        id: 'opt-mvp-4',
        label: 'Reject the CEO\'s proposal outright and declare that tracking technology is a waste of capital for B2B logistics',
        toolUsed: 'Dogmatic resistance without data',
        explanation: 'Dismissive without empirical evidence. The operational problem (high dispatch phone volume) is real; an empirical experiment is required to guide capital allocation.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'Apply Lean Startup principles: the riskiest assumption is not "Can software engineers code a tracking app?", but "Will B2B freight clients actively use a self-serve digital tracking tool to replace phone calls to dispatch?" Run a 3-week Wizard of Oz or Concierge experiment with 50 high-volume clients. Provide instant WhatsApp tracking updates triggered manually by dispatchers. Set a pre-committed threshold: if inbound tracking calls from these 50 clients drop by >40% and 70% rate the updates as satisfactory, proceed to slice a Walking Skeleton using User Story Mapping. If not, pivot to automated SMS delivery.',
    actionChecklist: [
      'Isolate the riskiest assumption regarding client behavioral adoption',
      'Select a low-cost Wizard of Oz MVP archetype testing actual dispatch call reduction',
      'Commit to a quantitative pass/fail threshold before launching the experiment',
      'Present empirical behavioral data to the CEO to guide the ₹25 lakh capital decision'
    ],
    reflectionKey: 'Building software is the most expensive way to test if anyone wants it; simulate the value proposition first.'
  },
  {
    id: 'mission-roadmap-sales',
    title: 'The 12% Revenue Customer Custom Feature Demand',
    role: 'VP of Product',
    companyContext: 'LoomLedger, a 22-person SaaS company with 340 paying garment units, operating under tight engineering capacity.',
    crisisPrompt: 'Your biggest customer (representing 12% of total ARR) threatens to churn unless your team builds a custom multi-currency export report within 6 weeks, which would derail your entire "Now" onboarding sprint. What do you do?',
    targetTools: ['productroadmap'],
    options: [
      {
        id: 'opt-rm-1',
        label: 'Immediately halt the onboarding sprint and order all developers to build the custom multi-currency report',
        toolUsed: 'Sales-led feature creep',
        explanation: 'Succumbs to sales pressure, delays onboarding for the other 339 customers, increases general churn risk, and establishes a dangerous precedent of custom bespoke engineering.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-rm-2',
        label: 'Refuse the customer outright and quote rigid company policy that custom requests are strictly prohibited',
        toolUsed: 'Rigid policy enforcement',
        explanation: 'Risks forfeiting 12% of company ARR without investigating the underlying customer problem or exploring intermediate technical solutions.',
        isOptimal: false,
        rubricPoints: 8
      },
      {
        id: 'opt-rm-3',
        label: 'Understand the underlying decision needed, evaluate smaller interim solutions (e.g. scheduled CSV export), score the request with RICE, and present transparent trade-offs',
        toolUsed: 'Outcome-Based Product Roadmap & RICE Prioritization',
        explanation: 'Masterful product management! Solves the client\'s immediate problem in days with a lightweight solution while protecting core roadmap outcomes and recording trade-offs in the change log.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-rm-4',
        label: 'Promise the feature in 6 weeks to appease the customer, but keep engineering working on onboarding and apologize when the deadline slips',
        toolUsed: 'Deceptive calendar commitment',
        explanation: 'Destroys commercial credibility and burns customer trust when the uncommunicated delivery deadline inevitably slips.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Apply outcome-based roadmapping and RICE governance. Meet with the customer to diagnose the root business requirement: they do not necessarily need a native multi-currency UI, but an automated monthly conversion summary for their overseas buyers. Provide an immediate interim workaround: a scheduled automated CSV export script built in 2 days. Run the full native feature through RICE scoring against current Now themes. Demonstrate to the CEO and Sales Head the explicit trade-off: pulling the feature into Now requires deferring the onboarding theme, increasing churn across the remaining 339 clients. Enforce the Zero-Sum Rule.',
    actionChecklist: [
      'Diagnose the underlying customer job-to-be-done before accepting feature specifications',
      'Provide a rapid lightweight interim workaround to protect account relationship',
      'Score the native feature request via RICE including revenue-at-risk weightings',
      'Enforce the Zero-Sum Capacity Rule with executive leadership to record trade-offs'
    ],
    reflectionKey: 'When sales asks for a feature, they are describing a symptom; your job as a product leader is to cure the underlying problem without breaking the roadmap.'
  },
  {
    id: 'mission-storymap-nbfc',
    title: 'Rescuing the 300-Item Monolithic Loan Backlog',
    role: 'Operations Head',
    companyContext: 'A mid-sized Non-Banking Financial Company (NBFC) launching a digital micro-loan application portal.',
    crisisPrompt: 'The external IT vendor delivered a 300-item monolithic specification document and announced that Release 1 will require 9 months of development before any loan can be processed. What is your move?',
    targetTools: ['userstorymapping'],
    options: [
      {
        id: 'opt-sm-1',
        label: 'Accept the vendor\'s timeline and request weekly status reports for the next 9 months',
        toolUsed: 'Passive waterfall compliance',
        explanation: 'Guarantees 9 months of zero customer feedback, massive scope risk, and potential market obsolescence before release 1 ever touches a live user.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-sm-2',
        label: 'Convene a story mapping workshop with credit officers, branch staff, and vendor leads to map the applicant journey and slice a "Walking Skeleton" for one loan product',
        toolUsed: 'User Story Mapping & Agile Release Slicing',
        explanation: 'Optimal solution! Slices out a minimal compliant loan journey (Discover -> Apply -> Upload -> Verify -> Approve -> Disburse -> Repay) to pilot in one district in 8 weeks.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-sm-3',
        label: 'Arbitrarily cut the bottom 150 items from the vendor\'s spreadsheet and tell them to build the top 150',
        toolUsed: 'Flat backlog truncation',
        explanation: 'Cutting a flat backlog without journey context breaks end-to-end flows, leaving fatal workflow gaps like missing verification or approval steps.',
        isOptimal: false,
        rubricPoints: 8
      },
      {
        id: 'opt-sm-4',
        label: 'Cancel the digital loan project entirely and continue processing all loans through manual paper forms at physical branches',
        toolUsed: 'Capitulation and tech abandonment',
        explanation: 'Surrenders digital competitive advantage instead of applying modern agile scoping techniques.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'Break the flat backlog trap using User Story Mapping. Convene a 1-day collaborative workshop bringing together branch credit officers, compliance officers, and the vendor technical architect. Lay out the horizontal customer journey: Discover Loan -> Complete Application -> Upload KYC -> Credit Verification -> Sanction Approval -> Account Disbursement -> Monthly Repayment. Vertically brainstorm minimal compliant actions. Draw a horizontal dividing line for "Release 1 — Walking Skeleton": limit scope to a single loan product, basic automated KYC, manual underwriter review, and direct NEFT disbursement. Deliver in 8 weeks in one pilot branch, deferring multi-loan cross-sells, gamified credit scores, and automated WhatsApp chatbots to Release 2.',
    actionChecklist: [
      'Convert the 300-row spreadsheet into a 2D customer journey Backbone',
      'Ensure the Walking Skeleton spans all steps from application to repayment',
      'Limit Release 1 to one loan product and one pilot branch district',
      'Defer non-essential automation and enhancements to Release 2 and Release 3'
    ],
    reflectionKey: 'A walking skeleton that processes one loan end-to-end in 8 weeks teaches you more than 9 months of unreleased code.'
  },
  {
    id: 'mission-abtesting-ceo',
    title: 'The Day-3 Early A/B Test Shipping Demand',
    role: 'Head of Growth',
    companyContext: 'A fast-growing D2C skincare e-commerce platform with 3,500 checkout visitors per day.',
    crisisPrompt: 'Three days into a pre-calculated 14-day A/B test on checkout discount messaging, the CEO notices Variant B is ahead by 18% with p = 0.04 and demands you ship it to 100% of traffic today. What do you do?',
    targetTools: ['abtesting'],
    options: [
      {
        id: 'opt-ab-1',
        label: 'Immediately ship Variant B to 100% of traffic to celebrate the early victory and claim growth credit',
        toolUsed: 'The Peeking Trap',
        explanation: 'Falls victim to the Peeking Problem! Early significance often regresses to the mean, and stopping on Day 3 inflates false positive risk beyond 30% due to weekday vs. weekend variations.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-ab-2',
        label: 'Politely refuse, present the wide confidence interval, explain that early peeking inflates false positives, and run the full 14-day cycle to cover weekend behavior',
        toolUsed: 'A/B Testing & Statistical Experimentation Rigor',
        explanation: 'Exemplary scientific rigor! Defends statistical integrity, explains why weekday/weekend patterns matter, and preserves executive trust by honoring pre-registered protocols.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-ab-3',
        label: 'Silently shut down the A/B test and revert to the control without informing the CEO',
        toolUsed: 'Subversion without communication',
        explanation: 'Unprofessional and destructive. Hides data and avoids constructive executive communication.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-ab-4',
        label: 'Double the traffic allocation to Variant B immediately while keeping Control running for the remaining 11 days',
        toolUsed: 'Sample Ratio Mismatch corruption',
        explanation: 'Creates an artificial Sample Ratio Mismatch (SRM), corrupting time-series validity and making final z-test calculations uninterpretable.',
        isOptimal: false,
        rubricPoints: 8
      }
    ],
    modelAnswer: 'Apply rigorous experimentation principles: explain the Peeking Problem to the CEO. Show that a Day-3 sample represents only 20% of the statistical power calculated for the experiment, meaning the 95% confidence interval is excessively wide and can easily swing negative once weekend shopping traffic arrives. Present historical company examples where early Day-3 "winners" regressed to neutral or negative by Day 14. Confirm that the test must run for two full 7-day cycles (14 days) to capture both weekday desktop shoppers and weekend mobile buyers, and verify that guardrail metrics (net margin, coupon abuse) remain healthy before shipping.',
    actionChecklist: [
      'Explain the mathematical risk of the Peeking Problem and Type I false positives',
      'Demonstrate why weekday vs. weekend shopping cycles require full 14-day testing',
      'Check guardrail metrics (average order value, net profit margin per visitor)',
      'Commit to an executive debrief on Day 14 with finalized z-test and p-values'
    ],
    reflectionKey: 'Stopping an A/B test early when you see a lucky p-value is the statistical equivalent of walking out of a cricket match after the third over.'
  },
  {
    id: 'mission-churn-spike',
    title: 'The 11% Monthly Churn Emergency',
    role: 'VP of Customer Success',
    companyContext: 'A subscription meal-delivery service with 2,500 active monthly subscribers across 3 cities.',
    crisisPrompt: 'Monthly customer churn spiked from a stable 6% to 11% last month. The CEO is panicking and plans to immediately blast a 30% discount coupon to all existing subscribers. What is your strategic move?',
    targetTools: ['churnanalysis'],
    options: [
      {
        id: 'opt-ca-1',
        label: 'Immediately broadcast the 30% discount code to all 2,500 subscribers via WhatsApp and SMS',
        toolUsed: 'Panic discounting',
        explanation: 'Erodes gross margin on the 89% of loyal, satisfied subscribers without diagnosing whether the churn spike was caused by food quality, delivery delays, or payment gateway failures.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-ca-2',
        label: 'Conduct an immediate diagnostic split: separate voluntary from involuntary churn, inspect payment gateway logs, check cohort concentration, and review support tickets',
        toolUsed: 'Cohort Retention & SaaS Churn Analysis',
        explanation: 'Outstanding diagnosis! Identifies whether the spike is technical (failed mandates) or localized (delivery partner failure in one city), enabling targeted saves rather than margin-destroying blanket discounts.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-ca-3',
        label: 'Increase Google Ads acquisition spend to acquire more new subscribers to replace the lost 11%',
        toolUsed: 'The Leaky Bucket Trap',
        explanation: 'The classic "leaky bucket" trap. Pouring acquisition money into a high-churn product accelerates cash burn and reduces customer lifetime value.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-ca-4',
        label: 'Lock all subscribers into non-refundable annual contracts so they cannot cancel next month',
        toolUsed: 'Coercive contractual lock-in',
        explanation: 'Aggressive lock-in triggers customer backlash, credit card chargebacks, and legal consumer protection complaints.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'Perform an immediate forensic churn analysis: divide the 275 lost subscribers into Voluntary vs. Involuntary Churn. In subscription models, sudden churn spikes are frequently technical (e.g., an updated bank mandate protocol or payment gateway API failure causing automated debits to fail). If involuntary, deploy automated WhatsApp payment retry links to recover up to 50% of the lost accounts within 48 hours. If voluntary, examine cohort and geographic concentration: did the spike occur in a specific city (e.g. food quality/kitchen disruption in one hub) or among newly onboarded users? Target interventions specifically where the breakdown occurred rather than eroding gross margin across the entire healthy subscriber base with a 30% blanket coupon.',
    actionChecklist: [
      'Segregate the churn spike into Voluntary vs. Involuntary payment failures',
      'Audit payment gateway failure logs and mandate error codes',
      'Analyze geographic and cohort vintage concentration',
      'Deploy targeted dunning recovery and customer success outreach instead of blanket discounts'
    ],
    reflectionKey: 'Never apply a commercial pricing discount to cure what might be an operational or technical payment failure.'
  }
];

export const CATEGORY_9_GLOSSARY: GlossaryItem[] = [
  {
    term: 'A/A Test',
    definition: 'An experiment running two identical versions of a page against each other to verify that traffic splits correctly and no false positive bias exists.',
    tool: 'A/B Testing'
  },
  {
    term: 'Acceptance Criteria',
    definition: 'Explicit, testable conditions a user story must satisfy to be accepted as complete, frequently structured as Given / When / Then.',
    tool: 'User Story Mapping'
  },
  {
    term: 'Actionable Metric',
    definition: 'A metric directly tied to a repeatable business decision (e.g. conversion to paid, week-4 retention), contrasted with vanity metrics.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'Alpha (Significance Level, α)',
    definition: 'The probability of making a Type I error (false positive)—declaring a variant a winner when no true difference exists. Typically set at 5% (0.05).',
    tool: 'A/B Testing'
  },
  {
    term: 'Backbone',
    definition: 'The horizontal top row of a User Story Map showing the chronological sequence of user activities and steps across their entire workflow.',
    tool: 'User Story Mapping'
  },
  {
    term: 'Beta (False Negative Rate, β)',
    definition: 'The probability of making a Type II error—failing to detect a real improvement when one actually exists. Typically set at 20% (giving 80% Power).',
    tool: 'A/B Testing'
  },
  {
    term: 'Build-Measure-Learn',
    definition: 'The foundational Lean Startup feedback loop: turn ideas into experiments, measure customer behavior, and learn whether to pivot or persevere.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'Chi-Square Test (Goodness of Fit)',
    definition: 'A statistical test used in A/B testing to verify whether the observed traffic split matches the expected ratio (e.g., 50/50), detecting Sample Ratio Mismatch.',
    tool: 'A/B Testing'
  },
  {
    term: 'Cohort Retention Curve',
    definition: 'A graphical chart plotting the percentage of retained active users over elapsed time for groups acquired in the same month. A flattening curve signals product-market fit.',
    tool: 'Churn Analysis'
  },
  {
    term: 'Concierge MVP',
    definition: 'Delivering the service value proposition manually to early customers who are fully aware that human operators are delivering it.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'Confidence Deflator',
    definition: 'A factor in RICE prioritization (100% high, 80% medium, 50% low) that down-ranks ideas lacking empirical customer validation.',
    tool: 'Product Roadmap'
  },
  {
    term: 'Customer Churn Rate (Logo Churn)',
    definition: 'The percentage of paying customer accounts that cancel during a given time period: (Customers Lost ÷ Starting Customers) × 100.',
    tool: 'Churn Analysis'
  },
  {
    term: 'Customer Health Score',
    definition: 'A composite metric (0-100) combining login frequency, feature adoption depth, and support ticket sentiment to predict churn risk in advance.',
    tool: 'Churn Analysis'
  },
  {
    term: 'Dunning Management',
    definition: 'Automated processes and communications (retry intervals, email/WhatsApp notices) used to recover failed recurring subscription payments.',
    tool: 'Churn Analysis'
  },
  {
    term: 'Falsifiable Hypothesis',
    definition: 'A testable proposition formulated with a target user, specific action, quantitative threshold, and deadline that can be empirically proven false.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'Flat Backlog Trap',
    definition: 'The failure mode where teams prioritize 200 disconnected items in a 1D list, losing all context of the end-to-end customer workflow.',
    tool: 'User Story Mapping'
  },
  {
    term: 'Given / When / Then',
    definition: 'Standard behavior-driven development (BDD) syntax for writing clear, testable acceptance criteria on user story cards.',
    tool: 'User Story Mapping'
  },
  {
    term: 'Guardrail Metric',
    definition: 'A secondary metric monitored during an A/B test (e.g., page latency, return rates) to ensure primary metric gains do not cause collateral damage.',
    tool: 'A/B Testing'
  },
  {
    term: 'HiPPO',
    definition: 'Highest Paid Person\'s Opinion; the organizational failure where product decisions are made by executive authority rather than customer data.',
    tool: 'A/B Testing'
  },
  {
    term: 'INVEST Criteria',
    definition: 'A checklist for quality user stories: Independent, Negotiable, Valuable, Estimable, Small, and Testable.',
    tool: 'User Story Mapping'
  },
  {
    term: 'Involuntary Churn',
    definition: 'Churn caused by technical payment failures (expired cards, failing UPI mandates) rather than an intentional customer cancellation.',
    tool: 'Churn Analysis'
  },
  {
    term: 'Lifetime Value (LTV)',
    definition: 'The total revenue or gross margin expected from a customer relationship over its lifespan: ARPU ÷ Monthly Customer Churn Rate.',
    tool: 'Churn Analysis'
  },
  {
    term: 'LTV:CAC Ratio',
    definition: 'The unit economics ratio comparing customer lifetime value to acquisition cost; healthy recurring businesses target 3.0:1 or higher.',
    tool: 'Churn Analysis'
  },
  {
    term: 'Minimum Detectable Effect (MDE)',
    definition: 'The smallest relative percentage lift in conversion that an A/B test is mathematically powered to detect reliably.',
    tool: 'A/B Testing'
  },
  {
    term: 'Net Revenue Retention (NRR)',
    definition: 'The percentage of recurring revenue retained from existing customers over a period, factoring in downgrades, churn, and expansion.',
    tool: 'Churn Analysis'
  },
  {
    term: 'Now / Next / Later',
    definition: 'A time-horizon framework replacing rigid Gantt chart release dates with certainty bands: Now (committed), Next (discovery), Later (exploratory).',
    tool: 'Product Roadmap'
  },
  {
    term: 'Outcome vs. Output',
    definition: 'Outputs are features and code delivered; outcomes are measurable business or customer behavior changes achieved.',
    tool: 'Product Roadmap'
  },
  {
    term: 'Peeking Problem',
    definition: 'Repeatedly checking p-values during an ongoing A/B test and stopping early when "significance" appears; inflates false positive rates above 30%.',
    tool: 'A/B Testing'
  },
  {
    term: 'Pivot',
    definition: 'A structured course correction designed to test a new fundamental hypothesis about the product, business model, or engine of growth.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'RICE Score',
    definition: 'A prioritization formula: (Reach × Impact × Confidence) ÷ Effort, used to rank product initiatives objectively.',
    tool: 'Product Roadmap'
  },
  {
    term: 'Riskiest Assumption',
    definition: 'The single leap-of-faith hypothesis that, if wrong, completely destroys the business model; must be tested before building code.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'Sample Ratio Mismatch (SRM)',
    definition: 'A statistical discrepancy where the observed visitor split diverges from the expected ratio, indicating tracking bugs that invalidate the test.',
    tool: 'A/B Testing'
  },
  {
    term: 'Single-Feature MVP',
    definition: 'A fully functional software release that solves exactly one critical problem exceptionally well without feature bloat.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'Smoke Test / Fake Door',
    definition: 'A landing page or UI element describing a product offering with a "Pre-Order" or "Buy Now" CTA to measure real customer demand before building.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'Statistical Power (1 - β)',
    definition: 'The probability of correctly detecting a true effect when one exists; standard experimentation programs target 80% power.',
    tool: 'A/B Testing'
  },
  {
    term: 'User Activity',
    definition: 'A high-level customer workflow milestone forming the Backbone of a story map (e.g., "Manage Subscription").',
    tool: 'User Story Mapping'
  },
  {
    term: 'Vanity Metric',
    definition: 'A metric that looks impressive on social media or slides (e.g., page views, total signups) but does not correlate with business survival.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'Voluntary Churn',
    definition: 'An intentional decision by a customer to cancel their subscription due to pricing, lack of usage, or competitor switching.',
    tool: 'Churn Analysis'
  },
  {
    term: 'Walking Skeleton',
    definition: 'The thinnest functional vertical slice that links the user journey end-to-end from interface to backend database in Release 1.',
    tool: 'User Story Mapping'
  },
  {
    term: 'Wizard of Oz MVP',
    definition: 'A test where the front-end appears fully automated to the user while human operators manually execute backend workflows.',
    tool: 'Minimum Viable Product'
  },
  {
    term: 'Zero-Sum Capacity Rule',
    definition: 'The governance rule stating that adding an unplanned initiative to the committed Now horizon requires removing an equivalent effort item.',
    tool: 'Product Roadmap'
  }
];
