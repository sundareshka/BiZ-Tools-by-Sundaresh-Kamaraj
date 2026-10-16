import { ToolDefinition, StrategyStack, ScenarioMission, GlossaryItem } from './toolsData.ts';

export const RISK_TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'riskmatrix',
    name: 'Risk Matrix & Probability-Impact Heat Map',
    shortName: 'Risk Matrix',
    category: 'Risk & Decision-Making',
    tagline: 'Rank risks by likelihood and impact so you act on the vital threats first',
    origin: 'Military and engineering safety standards (e.g., US DoD MIL-STD-882); formalised in international risk standards ISO 31000:2018 and IEC 31010:2019, and PMBOK project risk guidelines.',
    corePurpose: 'Turn a long, unordered list of organizational worries into a ranked, owned, and treated set of risks, directing executive attention to the highest exposures.',
    primaryUsers: [
      'Boards of Directors & Risk Management Committees',
      'Chief Risk Officers (CROs) & Internal Auditors',
      'Project Managers & Operations Directors',
      'Compliance & Information Security Officers (ISO 27001 / SOC 2)',
      'Institutional Deans & Quality Assurance Coordinators (NAAC/NBA)'
    ],
    difficulty: 'Beginner',
    horizon: 'Tactical to Annual (Rolling 12-Month Review Window)',
    scope: 'Whole Enterprise, Business Unit, Operational Department, or Major Capital Project',
    timeToResult: '1 to 3 hour workshop for initial rating; quarterly review cadence',
    dataNeeds: 'Cause-event-consequence statements, past incident history, qualitative likelihood estimates, and financial/operational consequence scales',
    keyOutput: '5×5 color-coded risk heat map and prioritized risk register with named owners, treatments, and KRIs',
    bestPairedWith: 'Pareto Analysis (upstream defect counts), Decision Tree Analysis (choosing treatments), Monte Carlo (quantifying financial exposure)',
    keyFeatures: [
      'Two 1–5 rating scales (Likelihood and Impact) producing a 1–25 risk score',
      'Written qualitative and quantitative rating scales ensuring consistent calibration across departments',
      'Distinct Inherent Risk (pre-control) and Residual Risk (post-control) evaluation',
      'Four classic risk treatments: Avoid, Reduce, Transfer (insure/contract), and Accept',
      'Mandatory board escalation rule for any severe consequence (Impact = 5) regardless of likelihood',
      'Key Risk Indicators (KRIs) paired with thresholds and single named owners'
    ],
    howItWorks: 'Identify operational or strategic risks in a cross-functional workshop using cause-event-consequence wording. Rate likelihood (1: <5% to 5: >80% over 12 months) and impact (1: Minimal to 5: Severe) against agreed written descriptors. Multiply likelihood by impact to place risks into color bands: Low (1-4 Green), Medium (5-9 Yellow), High (10-14 Amber), and Critical (15-25 Red). Evaluate inherent risk before controls, credit existing mitigations, score residual risk, and assign a single owner, treatment plan, and KRI to every high and critical item.',
    coreConcepts: [
      {
        term: 'Inherent vs. Residual Risk',
        definition: 'Inherent risk is the raw exposure level before considering existing internal controls; residual risk is the remaining exposure once active controls are factored in.'
      },
      {
        term: 'Risk Appetite Threshold',
        definition: 'The maximum level and type of risk an organization is willing to accept in pursuit of its strategic objectives before mandatory escalation or treatment.'
      },
      {
        term: 'Impact-5 Mandatory Escalation',
        definition: 'Governance rule stating that any risk with catastrophic impact (5) must be reported to the Board Risk Committee regardless of how low its likelihood score is.'
      },
      {
        term: 'Key Risk Indicator (KRI)',
        definition: 'A forward-looking metric that signals changes in risk exposure or the increasing probability of a risk event before the loss occurs.'
      }
    ],
    strengths: [
      'Very easy to learn and explain; works across non-financial and technical departments alike',
      'Produces a single visual heat map that boards, lenders, and auditors understand instantly',
      'Forces disciplined conversations about which risks matter most and who is individually accountable',
      'Integrates seamlessly with ISO 9001, ISO 27001, ISO 45001, and SEBI LODR governance mandates'
    ],
    limitations: [
      'Ratings are qualitative and vulnerable to subjective optimism and personal risk bias',
      'Multiplying ordinal numbers (1–5) can create false precision and occasionally misrank risks (Cox, 2008)',
      'Treats individual risks as independent; fails to model cascading failures or risk correlations',
      'Risk registers easily become stale compliance checkboxes if not tied to monthly operating agendas'
    ],
    workflowPlacement: {
      upstream: 'Takes input from PESTLE scanning, customer feedback, and Pareto defect incident logs',
      downstream: 'Feeds Decision Tree analysis for response selection, Monte Carlo modeling for budget contingency, and internal audit testing schedules'
    },
    useCases: [
      {
        title: 'Manufacturing Single-Line Dependency',
        situation: 'Spice processing exporter relying on a single grinding line.',
        problem: 'Breakdown causes 14 days of downtime, missed retail orders, and contract penalties.',
        action: 'Rated as Critical (Likelihood 4 × Impact 4 = 16); assigned treatment to lease a standby line.',
        outcome: 'Residual risk dropped to score 4 (Low); eliminated single point of operational failure.'
      },
      {
        title: 'Higher Education Accreditation Governance',
        situation: 'Engineering college preparing for NBA/NAAC peer review accreditation.',
        problem: 'Risks regarding faculty attrition, lab safety, and placement declines were discussed only informally.',
        action: 'Built an institutional risk register with 5×5 matrix, named Deans/HODs as owners, and held quarterly reviews.',
        outcome: 'Documented risk governance served as audit evidence; launched early faculty retention programs.'
      },
      {
        title: 'Information Security Asset Vulnerability',
        situation: 'IT services firm preparing for ISO 27001 client certification audits.',
        problem: 'Hundreds of IT assets and cyber threats with no objective mechanism to prioritize security spending.',
        action: 'Rated asset threats on likelihood and business impact; allocated controls (MFA, air-gapped backups) to red risks first.',
        outcome: 'Achieved audit-ready treatment plan; focused 80% of security budget on highest residual risks.'
      }
    ],
    caseStudy: {
      company: 'Kaveri Agro Foods (Madurai, Tamil Nadu)',
      revenue: '₹62 Crore',
      staff: '260 employees',
      profile: 'Processor of spices and ready-to-cook mixes supplying modern retail chains in India and export markets in the Gulf and Singapore.',
      challenge: 'In a single year, the company suffered a two-week shutdown when its sole chilli grinding line failed, an export consignment rejection due to pesticide residue, and a ransomware incident locking billing servers for three days. The existing risk register was a 15-item static list drafted for an audit three years earlier.',
      whyChosen: 'The board needed a fast, understandable way to visualize the entire enterprise risk landscape and establish actionable priorities before the next export season.',
      steps: [
        'Defined 5×5 likelihood and impact scales covering financial loss, customer impact, food safety, and compliance.',
        'Conducted four half-day workshops (procurement, production, quality/export, IT/finance) identifying 64 risks.',
        'De-duplicated risks into 41 items and scored both inherent and residual levels.',
        'Mapped 7 critical red risks on the heat map: single grinding line, pesticide residue, ransomware, and key-person export documentation.',
        'Assigned named owners, treatment plans, and measurable KRIs (e.g. % of incoming chilli lots tested for residue).',
        'Instituted a shared spreadsheet register with automated conditional formatting and a monthly board standing agenda review.'
      ],
      results: [
        'Leased a standby secondary grinding line, eliminating the single point of failure.',
        'Increased pesticide testing from 30% to 100% of export lots with zero subsequent container rejections.',
        'Implemented offline tested backups and regular incident-response recovery drills.',
        'Reduced critical red risks from seven to two within 12 months.',
        'Secured a lower business-interruption insurance premium from commercial underwriters.'
      ],
      lessonsLearned: [
        'Clear written descriptor scales mattered far more than the visual grid itself.',
        'Pairing every high risk with a measurable Key Risk Indicator (KRI) turned a static list into a living control dashboard.',
        'Monthly board reviews, rather than annual workshops, kept the risk management system alive.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Sponsor commitment (CEO, MD, or Principal) to review the register at monthly executive meetings',
        'Designated Risk Coordinator (Finance Head, Quality Manager, or Internal Auditor) to maintain register integrity',
        'Department heads and process owners with direct operational knowledge of failure modes'
      ],
      steps: [
        'Agree on strategic objectives that risks will be assessed against (annual plan, quality targets, compliance).',
        'Define a 5×5 matrix with 12-month likelihood percentages and multi-tier impact descriptions.',
        'Establish score banding thresholds: Low (1–4), Medium (5–9), High (10–14), and Critical (15–25).',
        'Formulate risk appetite statements specifying acceptable score bands by operational category.',
        'Conduct departmental workshops capturing threats strictly as cause → event → consequence.',
        'Consolidate duplicates, score inherent risk, credit existing internal controls, and score residual risk.',
        'Assign a single accountable owner, treatment deadline, and KRI to all High and Critical risks.',
        'Establish a monthly board review for red risks and quarterly refresh for the entire register.'
      ],
      checklist: [
        'Are likelihood descriptors framed with explicit probability percentages and time frames?',
        'Are impact scales defined in concrete rupee losses and operational disruptions?',
        'Does every risk have a single named owner rather than general "management"?',
        'Is the mandatory board escalation rule active for all Impact=5 risks?',
        'Is residual risk re-rated after verifying that controls actually function in practice?'
      ],
      commonMistakes: [
        {
          mistake: 'Writing vague risk statements such as "financial risk" or "market problem"',
          fix: 'Enforce strict cause-event-consequence phrasing (e.g., "Because supplier X is sole source, disruption halts line, causing missed deliveries").'
        },
        {
          mistake: 'Rating only inherent risk, failing to credit effective internal controls',
          fix: 'Always display inherent and residual side by side so management sees control effectiveness.'
        },
        {
          mistake: 'Treating the risk register as an annual compliance artifact for external auditors',
          fix: 'Make the top red and amber risks a mandatory standing agenda item at monthly executive reviews.'
        }
      ],
      plan306090: {
        d30: 'Define rating scales, score bands, and risk appetite; conduct cross-functional workshops to draft the initial register.',
        d60: 'Rate inherent and residual risks; assign single owners and treatments; present the first heat map to executive leadership.',
        d90: 'Launch monthly board review cadence, track first round of KRIs, close completed treatments, and extend to project teams.'
      },
      proTips: [
        'Test rating scales on three known past company incidents before rating new prospective risks.',
        'Add a trend arrow (↑ → ↓) to every top risk; directional momentum matters as much as current position.',
        'Rotate workshop facilitators annually to minimize cross-functional groupthink and blind spots.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Monte Carlo Simulation',
        reason: 'When you need to quantify the aggregate financial exposure of multiple interacting variables or calculate confidence levels for budgets (P80/P90).'
      },
      {
        alternative: 'Failure Mode and Effects Analysis (FMEA)',
        reason: 'When analyzing detailed step-by-step engineering or manufacturing failure modes requiring detectability scoring (RPN).'
      },
      {
        alternative: 'Decision Tree Analysis',
        reason: 'When deciding between discrete branching strategic options with quantifiable probability-weighted monetary payoffs.'
      }
    ],
    reflectionPrompts: [
      'Which risk in your organization is talked about most in corridors but has no named individual owner on paper?',
      'What major operational incident occurred in the last two years that was completely absent from your risk register?',
      'Which of your current internal controls do you assume work daily but have never been tested or audited?'
    ],
    quickReferenceCard: [
      'Write risks as: Cause → Event → Consequence',
      'Score = Likelihood (1–5) × Impact (1–5) [1-4 Low, 5-9 Medium, 10-14 High, 15-25 Critical]',
      'Evaluate inherent risk, credit controls, and track residual risk',
      'Four treatments: Avoid · Reduce · Transfer · Accept',
      'Escalate any Impact=5 risk to the Board regardless of total score'
    ],
    quiz: [
      {
        id: 'rm-1',
        question: 'On a standard 5×5 risk matrix, a risk with Likelihood 3 (Possible) and Impact 4 (Major) produces what risk score and band?',
        options: [
          'Score 7 (Low)',
          'Score 12 (High)',
          'Score 15 (Critical)',
          'Score 20 (Critical)'
        ],
        correctAnswer: 1,
        explanation: '3 × 4 = 12. On the standard banding scale (1-4 Low, 5-9 Medium, 10-14 High, 15-25 Critical), a score of 12 falls squarely into the High (Amber) band.'
      },
      {
        id: 'rm-2',
        question: 'What is the fundamental difference between Inherent Risk and Residual Risk?',
        options: [
          'Residual risk is the exposure remaining after existing internal controls are accounted for; inherent risk is raw exposure before controls.',
          'Inherent risk applies only to financial risks, while residual risk applies to operational risks.',
          'Residual risk is the risk transferred to an insurance company; inherent risk cannot be insured.',
          'Inherent risk is always lower than residual risk due to control failures.'
        ],
        correctAnswer: 0,
        explanation: 'Inherent risk represents the gross vulnerability of an objective prior to any mitigation. Residual risk reflects net vulnerability once active controls and treatments are credited.'
      },
      {
        id: 'rm-3',
        question: 'Purchasing commercial fire and business interruption insurance for an enterprise warehouse is an example of which risk treatment?',
        options: [
          'Avoidance',
          'Reduction',
          'Transfer',
          'Acceptance'
        ],
        correctAnswer: 2,
        explanation: 'Risk transfer shifts the financial consequence of a risk to a third party (such as an insurer or contractual subcontractor) while leaving the primary operational risk intact.'
      },
      {
        id: 'rm-4',
        question: 'What significant limitation of qualitative risk matrices did researcher Louis Anthony Cox highlight in decision research?',
        options: [
          'Risk matrices cannot be modeled inside spreadsheet software.',
          'Risk matrices require continuous stochastic distributions to calculate scores.',
          'Coarse ordinal multiplication can assign identical scores to vastly different risks and occasionally invert the true order of priorities.',
          'They cannot be used for ISO 31000 or ISO 27001 regulatory compliance.'
        ],
        correctAnswer: 2,
        explanation: 'Cox (2008) demonstrated that multiplying arbitrary 1-5 ordinal ranks lacks mathematical consistency, leading to "rank reversal" and equalizing high-likelihood/low-impact nuisances with low-likelihood/high-impact catastrophes.'
      },
      {
        id: 'rm-5',
        question: 'What is the most effective operational method to calibrate likelihood ratings across diverse departmental managers?',
        options: [
          'Allow each department head to use their intuitive personal feeling.',
          'Take the mathematical average of the highest and lowest proposed ratings.',
          'Establish pre-agreed written descriptors containing explicit percentage probability ranges and an explicit time frame (e.g., 12 months).',
          'Expand the matrix grid to 10×10 to allow finer gradations.'
        ],
        correctAnswer: 2,
        explanation: 'Explicit written descriptors (such as "Unlikely: 5–20% chance within 12 months") anchor subjective interpretations, preventing optimistic or alarmist bias during workshop ratings.'
      }
    ]
  },
  {
    id: 'decisiontree',
    name: 'Decision Tree Analysis & Expected Monetary Value (EMV)',
    shortName: 'Decision Tree',
    category: 'Risk & Decision-Making',
    tagline: 'Compare sequential choices under uncertainty using probabilities and expected monetary values',
    origin: 'Developed in the 1960s by Howard Raiffa (Harvard) and Ronald A. Howard (Stanford), formalising decision analysis on foundations of von Neumann & Morgenstern expected-utility theory.',
    corePurpose: 'Make complex, high-stakes decisions with uncertain chance events and sequential branching explicit and comparable, calculating Expected Monetary Value (EMV) and worst-case risks.',
    primaryUsers: [
      'Promoters, Managing Directors & Executive Boards',
      'Corporate Finance, M&A & Strategy Analysts',
      'Legal Counsel Evaluating Litigation vs. Settlement Offers',
      'R&D and Product Launch Managers',
      'Capital Procurement & Make-or-Buy Decision Teams'
    ],
    difficulty: 'Intermediate',
    horizon: '1 to 5 Year Capital Planning Horizon',
    scope: 'Discrete Strategic Choices & Irreversible Capital Commitments',
    timeToResult: '2 to 8 hours per decision model',
    dataNeeds: 'Discrete branch options, probability estimates summing to 1.0 at chance nodes, and net discounted cash payoffs (NPV) at terminal endpoints',
    keyOutput: 'Decision tree diagram, Expected Monetary Value (EMV) per path, break-even probability sensitivity line, and EVPI ceiling',
    bestPairedWith: 'Monte Carlo Simulation (stochastic payoffs), Risk Matrix (identifying critical crossroads), Capital Budgeting (NPV modeling)',
    keyFeatures: [
      'Standardized node geometry: Decision nodes (□), Chance nodes (○), and Terminal Payoff nodes (△)',
      'Backward induction (Roll-Back) calculation determining optimal expected value from right to left',
      'Sensitivity analysis identifying break-even probabilities where competing choices equalize',
      'Expected Value of Perfect Information (EVPI) establishing the maximum ceiling to spend on research/pilots',
      'Explicit risk profile presentation highlighting the worst-case downside alongside the weighted mean'
    ],
    howItWorks: 'Frame the decision statement and options (always including "do nothing" and "wait / pilot"). Draw the tree left to right: Decision nodes branch into choices; choices branch into chance events with probabilities. Assign net discounted payoffs (NPV net of capital investment) to terminal endpoints. Roll back the tree right to left: Chance nodes calculate expected monetary value EMV = Σ (Probability × Payoff); Decision nodes choose the branch with maximum EMV and prune alternatives. Run sensitivity analysis to find the break-even probability where options cross over.',
    coreConcepts: [
      {
        term: 'Expected Monetary Value (EMV)',
        definition: 'The probability-weighted average payoff of an uncertain event, calculated by summing the product of each possible payoff and its corresponding probability.'
      },
      {
        term: 'Backward Induction (Roll-Back)',
        definition: 'The recursive mathematical procedure of solving a decision tree from the terminal payoffs backward to the initial root decision.'
      },
      {
        term: 'Expected Value of Perfect Information (EVPI)',
        definition: 'The difference between the expected payoff with complete foresight and the EMV of the best option under uncertainty; represents the theoretical ceiling for market research or testing spend.'
      },
      {
        term: 'Break-Even Probability',
        definition: 'The exact probability threshold at which two competing strategic options yield identical expected monetary values.'
      }
    ],
    strengths: [
      'Replaces vague verbal optimism ("we have a great chance of winning") with explicit testable numbers',
      'Handles sequential multi-stage decisions and the economic value of waiting or testing',
      'Calculates the rigorous economic justification for due diligence, surveys, and exploratory pilots (EVPI)',
      'Separates the quality of a decision from the luck of its ultimate outcome'
    ],
    limitations: [
      'Outputs are only as sound as the subjective probability estimates supplied by experts',
      'Trees rapidly grow complex ("bushy trees") as options and continuous variables multiply',
      'Discretizes continuous uncertainties into artificial bins (e.g., High, Medium, Low demand)',
      'Pure EMV assumes risk neutrality; a promoter might reject a higher EMV if its worst-case loss triggers insolvency'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Risk Matrix triage, market feasibility surveys, and historical litigation records',
      downstream: 'Feeds Monte Carlo simulation to stress-test terminal payoffs, contract negotiations, and project stage-gate budgets'
    },
    useCases: [
      {
        title: 'Contract Dispute Settlement vs. Arbitration',
        situation: 'EPC subcontractor with withheld ₹2.4 Crore billing and delay counter-claims.',
        problem: 'Lawyers say "good chance of winning"; management cannot weigh that against a ₹90 Lakh haircut settlement offer.',
        action: 'Built tree with Win (50%), Partial (20%), and Loss (30%) branches; calculated EMV of arbitration as ₹133L expected loss.',
        outcome: 'Negotiated out-of-court settlement at ₹75 Lakh; avoided ₹58L expected litigation loss and preserved bank covenants.'
      },
      {
        title: 'Training Institute Regional Expansion',
        situation: 'Education provider deciding whether to open a new campus in Coimbatore.',
        problem: 'Promoter wants to own; CFO fears severe losses if student enrollment demand is weak.',
        action: 'Compared Own Centre (₹60L cost) vs. Franchise (₹10L) across High, Med, and Low demand; calculated break-even probability.',
        outcome: 'Showed Own Centre remains superior unless low-demand risk exceeds 69%; set ₹7L maximum budget for market study.'
      },
      {
        title: 'Manufacturing Equipment Make-or-Buy',
        situation: 'Component manufacturer evaluating ₹1.5 Crore CNC machine purchase.',
        problem: 'Future component volumes depend on whether a tier-1 automotive client renews its long-term contract.',
        action: 'Modeled chance node for client renewal followed by second decision node to add shifts if volume expands.',
        outcome: 'Decided to sign a 2-year outsourcing contract with an option to insource, proving the economic value of waiting.'
      }
    ],
    caseStudy: {
      company: 'Vaigai Infra Services (Madurai, Tamil Nadu)',
      revenue: '₹48 Crore',
      staff: '400 employees',
      profile: 'Electrical and instrumentation subcontractor executing major industrial infrastructure EPC projects across South India.',
      challenge: 'A lead contractor withheld ₹2.4 Crore of final retention billing citing milestone delays and counter-claimed liquidated damages. The contractor offered an out-of-court settlement with a ₹90 Lakh deduction. Company legal counsel urged arbitration, insisting there was "a very high chance of winning everything."',
      whyChosen: 'The decision had a small number of clear uncertain outcomes, measurable payoffs, and high stakes. The MD wanted to translate legal opinions into concrete numbers the board could evaluate.',
      steps: [
        'Framed the decision as: accept the ₹90 Lakh deduction now, or contest in arbitration.',
        'Elicited explicit probabilities from legal counsel: 50% Full Win (₹0 deduction), 20% Partial Loss (absorb ₹1.2 Cr), 30% Full Loss with damages (absorb ₹2.8 Cr).',
        'Estimated arbitration costs (tribunal fees, legal representation, management time) at ₹25 Lakh over 2.5 years.',
        'Calculated expected cost of contesting: ₹25L + (0.5 × 0) + (0.2 × ₹120L) + (0.3 × ₹280L) = ₹133 Lakh, compared to ₹90 Lakh to settle.',
        'Performed sensitivity analysis: contesting only beat settling if the probability of full loss fell below 15% (holding partial loss at 20%).',
        'Compared the worst-case contesting loss (₹3.05 Crore including legal fees) against cash reserves; it would breach bank debt covenants.'
      ],
      results: [
        'The board rejected arbitration and authorized the MD to negotiate an out-of-court settlement.',
        'The MD countered at ₹60 Lakh and settled at ₹75 Lakh—₹15 Lakh better than the contractor offer and ₹58 Lakh better than arbitration EMV.',
        'Retention cash was released within six weeks rather than tied up for three years in court.',
        'Preserved the commercial relationship with the lead contractor, securing a new ₹12 Crore contract the following year.'
      ],
      lessonsLearned: [
        'Asking lawyers for explicit numbers transformed vague optimism into rigorous financial probabilities.',
        'The worst-case outcome, rather than pure EMV, was the decisive factor for board solvency protection.',
        'The decision tree gave a clear negotiating ceiling: any settlement below ₹1.33 Crore was better than the expected cost of fighting.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Decision owner with formal authority to choose between the competing strategic options',
        'Financial analyst capable of building tree diagrams and net present value calculations',
        'Subject-matter experts (legal, technical, commercial) to supply probability estimates'
      ],
      steps: [
        'Write the decision statement in one sentence, specifying the deadline and decision-maker.',
        'List all realistic options, always including "do nothing" and "wait / gather more information".',
        'Identify the 2 or 3 critical chance uncertainties that govern outcomes; verify mutually exclusive states.',
        'Estimate net discounted cash payoffs (NPV) for every leaf endpoint, deducting upfront capital.',
        'Elicit calibrated probabilities using empirical win/loss ratios and reference cases.',
        'Roll back the tree right to left to compute EMV for each branch and prune inferior paths.',
        'Run sensitivity analysis on the most uncertain probability to calculate the break-even crossover point.',
        'Calculate EVPI to establish the maximum ceiling for feasibility studies or exploratory pilots.'
      ],
      checklist: [
        'Do probabilities at every chance node sum exactly to 1.00?',
        'Are terminal payoffs net of all upfront capital investments and discounted for time?',
        'Has the worst-case branch been evaluated against available liquid cash reserves?',
        'Is the sensitivity break-even probability clearly communicated to the board?',
        'Is the budget for external research or due diligence lower than the EVPI ceiling?'
      ],
      commonMistakes: [
        {
          mistake: 'Using top-line revenue rather than net discounted cash payoff at terminal leaves',
          fix: 'Always deduct upfront capital costs, operational expenses, and legal fees to compute true net payoff.'
        },
        {
          mistake: 'Anchoring on a single expert opinion without seeking reference cases',
          fix: 'Ask experts for historical frequencies (e.g., "Out of the last 10 similar arbitrations, how many were won?").'
        },
        {
          mistake: 'Selecting an option solely on highest EMV while ignoring an unaffordable worst-case loss',
          fix: 'Always present the worst-case leaf alongside EMV so leadership can evaluate downside solvency risk.'
        }
      ],
      plan306090: {
        d30: 'Train two internal analysts; build decision trees for one live capital decision and one past dispute to calibrate.',
        d60: 'Make decision tree analysis mandatory for capital expenditure and litigation requests exceeding ₹50 Lakh.',
        d90: 'Review completed decisions against actual outcomes; refine probability elicitation across procurement and M&A.'
      },
      proTips: [
        'Agree on the tree structure with the executive team before populating numbers; debates about structure are cheaper than debates about results.',
        'Present the break-even probability early; it shifts debate from "what is the probability?" to "is it above or below this threshold?".',
        'Keep trees small: three options and two chance nodes cover over 80% of business decisions without bushy confusion.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Monte Carlo Simulation',
        reason: 'When uncertainties involve continuous interacting variables (commodity prices, exchange rates) rather than discrete branching chance events.'
      },
      {
        alternative: 'Scenario Planning',
        reason: 'When facing deep qualitative structural shifts over 5 to 15 years where probability assignments are meaningless.'
      },
      {
        alternative: 'Multi-Criteria Decision Analysis (MCDA)',
        reason: 'When choices must be compared across non-monetary qualitative criteria (strategic fit, cultural alignment, brand equity).'
      }
    ],
    reflectionPrompts: [
      'Which recent major decision in your company would have looked different if explicit probabilities had been committed to paper?',
      'When your executive team says "there is a good chance," what exact probability do different leaders actually assume?',
      'Are you evaluating an expensive strategic move right now where paying for a small pilot would have positive net EVPI?'
    ],
    quickReferenceCard: [
      '□ Decision node · ○ Chance node · △ Terminal payoff',
      'EMV = Σ (Probability × Payoff); solve by rolling back right to left',
      'Always include "do nothing" and "wait / test" options',
      'Break-even probability = probability where two options yield equal EMV',
      'EVPI = Expected Value with Perfect Information − Best EMV (research spend cap)'
    ],
    quiz: [
      {
        id: 'dt-1',
        question: 'In standard decision tree notation, what do square (□) and circle (○) nodes represent respectively?',
        options: [
          'Square represents a chance outcome; circle represents a decision choice.',
          'Square represents a terminal payoff; circle represents a sunk cost.',
          'Square represents a decision node under your control; circle represents a chance node governed by uncertainty.',
          'Square represents a regulatory constraint; circle represents an investment milestone.'
        ],
        correctAnswer: 2,
        explanation: 'In decision analysis convention, squares (□) denote decision nodes where the manager makes a conscious choice, circles (○) denote chance nodes where nature/uncertainty determines the outcome, and triangles (△) represent terminal payoffs.'
      },
      {
        id: 'dt-2',
        question: 'Option X pays ₹100 Lakh with probability 0.60 and ₹20 Lakh with probability 0.40. What is its Expected Monetary Value (EMV)?',
        options: [
          '₹60 Lakh',
          '₹68 Lakh',
          '₹72 Lakh',
          '₹120 Lakh'
        ],
        correctAnswer: 1,
        explanation: 'EMV = (0.60 × ₹100 Lakh) + (0.40 × ₹20 Lakh) = ₹60 Lakh + ₹8 Lakh = ₹68 Lakh.'
      },
      {
        id: 'dt-3',
        question: 'What is meant by "rolling back" (backward induction) a decision tree?',
        options: [
          'Redrawing the diagram from scratch when assumptions change.',
          'Pruning away risky projects to reduce organizational exposure.',
          'Calculating expected values at chance nodes and selecting optimal choices from the terminal payoffs backward to the initial root decision.',
          'Ignoring probability branches and focusing only on optimistic best cases.'
        ],
        correctAnswer: 2,
        explanation: 'Rolling back is the standard solution algorithm: you start at the terminal payoffs on the far right, calculate expected values for chance nodes, select the highest value branch at decision nodes, and propagate the values back to the root.'
      },
      {
        id: 'dt-4',
        question: 'What does the Expected Value of Perfect Information (EVPI) indicate to an executive?',
        options: [
          'The historical cost of internal accounting reports.',
          'The maximum theoretical monetary value that the organization should be willing to pay for research, tests, or market studies that eliminate uncertainty.',
          'The maximum potential financial loss in the worst-case branch.',
          'The net present value of all future cash flows discounted at the cost of capital.'
        ],
        correctAnswer: 1,
        explanation: 'EVPI calculates how much better your payoff would be if you had perfect advance knowledge of chance events. It establishes the absolute upper economic ceiling for spending on pilots, feasibility surveys, or due diligence.'
      },
      {
        id: 'dt-5',
        question: 'Why might a rational CEO reject an investment option that possesses the highest mathematical EMV?',
        options: [
          'Because the probabilities at chance nodes do not sum to 1.0.',
          'Because the decision tree methodology is invalid for financial calculations.',
          'Because the CEO is risk-averse and the option carries an intolerable worst-case downside that would cause insolvency or covenant breaches.',
          'Because EVPI is always zero in real-world business decisions.'
        ],
        correctAnswer: 2,
        explanation: 'EMV assumes risk neutrality. In corporate reality, decision-makers must protect solvency; an option with an EMV of ₹5 Crore that has a 10% risk of bankruptcy is inferior to a safe option generating ₹3.5 Crore.'
      }
    ]
  },
  {
    id: 'montecarlo',
    name: 'Monte Carlo Simulation & Stochastic Risk Modeling',
    shortName: 'Monte Carlo',
    category: 'Risk & Decision-Making',
    tagline: 'Turn uncertain inputs into a probability range of outcomes and identify the dominant risk drivers',
    origin: 'Developed in the 1940s at Los Alamos by Stanislaw Ulam and John von Neumann, named by Nicholas Metropolis after the Monte Carlo casino; popularized in corporate finance by David Hertz (1964).',
    corePurpose: 'Replace misleading single-point deterministic estimates with full probability distributions by running 5,000–10,000 randomized iterations, revealing realistic P50/P80/P90 confidence targets and sensitivity rankings.',
    primaryUsers: [
      'Chief Financial Officers & Corporate FP&A Leaders',
      'Infrastructure & EPC Project Schedulers / Estimators',
      'Export Pricing & International Trade Managers',
      'Investment Analysts & Private Equity Portfolio Managers',
      'Supply Chain Planners & Procurement Directors'
    ],
    difficulty: 'Advanced',
    horizon: '1 to 10 Year Forecasts / Project Lifecycles',
    scope: 'Complex Budgets, Contract Pricing, Project Schedules, and Multi-Variable Financial Models',
    timeToResult: '1 to 5 days to build, calibrate, and simulate model',
    dataNeeds: 'Deterministic spreadsheet model, input ranges (min, mode, max) from historical data or expert elicitation, distribution shapes, and correlation estimates',
    keyOutput: 'Probability distribution, cumulative S-curve, P10/P50/P80/P90 percentile benchmarks, and tornado sensitivity chart',
    bestPairedWith: 'Decision Tree Analysis (stochastic payoffs), Project Schedules (PERT/CPM duration risks), Risk Matrix (quantifying top exposures)',
    keyFeatures: [
      'Stochastic sampling drawing across 5,000–10,000 iterations using Triangular, Normal, or PERT distributions',
      'Statistical percentile profiling: P10 (optimistic), P50 (median), P80 (defensible commitment), P90 (stress test)',
      'Cumulative probability S-curves illustrating the exact probability of clearing budget or completion milestones',
      'Tornado sensitivity chart identifying which uncertain variables exert the greatest leverage on bottom-line outcomes',
      'Demonstration of the "Flaw of Averages": single-point most-likely plans consistently understate reality'
    ],
    howItWorks: 'Start with a deterministic spreadsheet model calculating net margin, project duration, or NPV. Identify the 5 to 15 inputs that are genuinely uncertain and material. Assign probability distributions (e.g., triangular defined by minimum, most likely, and maximum). Run 5,000 to 10,000 randomized iterations drawing values for each input and recording output values. Analyze output percentiles, inspect the S-curve, and generate a tornado chart swinging inputs from P10 to P90. Commit project budgets and deadlines at the P80 confidence level and target contractual risk-sharing at the top tornado driver.',
    coreConcepts: [
      {
        term: 'The Flaw of Averages',
        definition: 'The statistical principle that plans based on average or "most likely" inputs are wrong on average, because real-world risks have asymmetric fat tails on the downside.'
      },
      {
        term: 'P80 Confidence Milestone',
        definition: 'The outcome value at which 80% of all simulated trials finish at or below; the executive standard for defensible budget contingency and client schedule commitments.'
      },
      {
        term: 'Tornado Chart',
        definition: 'A visual sensitivity chart that swings each uncertain input from its 10th to 90th percentile to rank variables from widest impact (top) to narrowest impact (bottom).'
      },
      {
        term: 'Triangular Distribution',
        definition: 'A continuous probability distribution bounded by lower limit (a), upper limit (b), and mode (c), ideal for business modeling when historical data is limited.'
      }
    ],
    strengths: [
      'Gives decision-makers realistic probabilities and distributions rather than fragile single numbers',
      'Exposes systemic optimism bias in corporate budgets and project delivery schedules',
      'Objectively identifies which uncertainties to mitigate first using tornado sensitivity rankings',
      'Widely accepted by commercial lenders, boards, and regulators for project finance and sovereign infrastructure'
    ],
    limitations: [
      'Susceptible to "garbage in, garbage out" if underlying input ranges are arbitrarily fabricated or overly narrow',
      'Requires quantitative spreadsheet or coding proficiency (Excel Data Tables, @RISK, Python NumPy)',
      'Failing to specify correlation between co-moving inputs will substantially understate simulated risk',
      'Cannot predict structural "black swan" shocks or unmodeled external geopolitical crises'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Risk Matrix triage and historical enterprise purchase/schedule ledgers',
      downstream: 'Feeds capital expenditure approvals, commercial bid pricing, hedging strategies, and project baseline commitments'
    },
    useCases: [
      {
        title: 'Export Garment Contract Pricing',
        situation: 'Tiruppur knitwear exporter quoting on a 600,000-unit European contract at $4.20/piece.',
        problem: 'Yarn price and USD/INR exchange rates swing wildly; single-point costing showed 8% margin but lacked confidence.',
        action: 'Simulated contract margin with correlated yarn and exchange rate distributions across 10,000 runs.',
        outcome: 'Discovered a 25% risk of loss; negotiated a yarn price escalation clause and hedged currency, reducing loss risk to <8%.'
      },
      {
        title: 'Bridge Construction Schedule Contingency',
        situation: 'Infrastructure contractor bidding on a ₹120 Crore bridge project.',
        problem: 'Deterministic schedule showed 22 months; past company projects averaged 20% duration overruns.',
        action: 'Simulated duration ranges for piling, monsoon disruption, and statutory approvals; calculated P50 (24m) and P80 (26.5m).',
        outcome: 'Bid 26 months with mitigation plans for top three tornado drivers, avoiding liquidated damage penalties.'
      },
      {
        title: 'University Student Hostel Capital Budget',
        situation: 'Higher education trust evaluating board approval for a new hostel block.',
        problem: 'Construction material costs, student enrollment, and hostel occupancy rates were uncertain.',
        action: 'Modeled 10-year Net Present Value (NPV) using probability distributions for each input.',
        outcome: 'Board approved with a phased architectural design after seeing a 70% probability of positive NPV.'
      }
    ],
    caseStudy: {
      company: 'Noyyal Knit Exports (Tiruppur, Tamil Nadu)',
      revenue: '₹55 Crore',
      staff: '300 employees',
      profile: 'Tiruppur knitwear garment exporter shipping basic apparel to major European retail chains.',
      challenge: 'A European buyer offered a 12-month fixed-price contract for 600,000 garments at $4.20 per piece. In the prior year, cotton yarn had surged and the rupee strengthened unexpectedly, wiping out margins on a similar order. The owner’s single-point costing spreadsheet showed an 8% margin, but he no longer trusted static numbers.',
      whyChosen: 'Contract margins depended on several continuous interacting uncertainties—yarn price, USD/INR rate, dyeing costs, and defect rates—that a discrete decision tree could not capture.',
      steps: [
        'Built a single deterministic financial model calculating net contract margin.',
        'Selected five uncertain inputs: cotton yarn price/kg, USD/INR rate, dyeing cost, rejection rate, and ocean freight.',
        'Estimated ranges from 3-year historical purchase records and bank currency forecasts using triangular distributions.',
        'Modeled moderate positive correlation between yarn price and processing cost (both driven by energy prices).',
        'Ran the model for 10,000 iterations using Excel Data Tables.',
        'Analyzed results: median P50 margin was 7%, but revealed an alarming 25% probability of net contract loss. Tornado chart proved yarn price was the dominant risk driver.'
      ],
      results: [
        'The owner negotiated a yarn price adjustment clause beyond a ±10% corridor and forward-booked 50% of yarn supply.',
        'Hedging 50% of dollar receipts dropped the probability of contract loss below 10% while preserving a 7% median margin.',
        'The contract was signed; actual realized margin finished within the model’s P30–P70 projected corridor.',
        'The finance manager now mandates Monte Carlo simulation for every commercial contract exceeding ₹2 Crore.'
      ],
      lessonsLearned: [
        'The tornado chart transformed negotiations: rather than arguing over price, the owner targeted the contract clause that controlled the biggest risk.',
        'Using the company’s own purchase records for input ranges made the simulation completely credible to executive leadership.',
        'Presenting "probability of loss" was far more persuasive to the board than presenting abstract standard deviations.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Validated deterministic spreadsheet model that calculates target metrics correctly without circular errors',
        'Analyst with spreadsheet modeling or Python (NumPy/SciPy) proficiency',
        'Operational and commercial subject-matter experts to provide realistic minimum, mode, and maximum ranges'
      ],
      steps: [
        'Define the primary decision and key output metric (total cost, completion duration, margin, NPV).',
        'Build or clean the deterministic base model; test with simple inputs to confirm formula integrity.',
        'List all model inputs and select the 5 to 15 that are genuinely uncertain and material.',
        'Elicit 10th percentile (min), most likely (mode), and 90th percentile (max) estimates from experts.',
        'Choose distribution shapes (triangular or PERT for expert estimates; normal for financial market rates).',
        'Identify and model essential correlations between co-dependent cost variables.',
        'Execute 5,000 to 10,000 iterations; verify result stability across two independent runs.',
        'Produce the frequency histogram, cumulative S-curve, percentile table, and tornado sensitivity chart.',
        'Present the P80 commitment value and probability of meeting targets to executive leadership.'
      ],
      checklist: [
        'Has the deterministic base model been audited for formula errors?',
        'Are input ranges wide enough to reflect realistic historical volatility?',
        'Have positive and negative correlations between related inputs been accounted for?',
        'Is the iteration count set to at least 5,000 trials with a recorded random seed?',
        'Has executive leadership agreed in advance on which percentile (e.g., P80) will be used for commitments?'
      ],
      commonMistakes: [
        {
          mistake: 'Using unrealistically narrow minimum and maximum ranges due to expert overconfidence bias',
          fix: 'Ask experts "what would make this outcome even worse than your maximum?" and widen bounds accordingly.'
        },
        {
          mistake: 'Simulating every single input cell in the spreadsheet, creating statistical noise',
          fix: 'Focus exclusively on the 5 to 10 material drivers; run a one-at-a-time sensitivity check first.'
        },
        {
          mistake: 'Ignoring positive correlation between related cost inputs (e.g., fuel and freight)',
          fix: 'Model input correlations; otherwise, offsetting random numbers will artificially dampen the true downside risk.'
        }
      ],
      plan306090: {
        d30: 'Train two financial analysts; construct a Monte Carlo model for one live budget or tender bid and compare with the single-point plan.',
        d60: 'Present simulation percentiles to leadership; establish a corporate policy of committing bids at P80 confidence.',
        d90: 'Apply Monte Carlo to all capital expenditure requests exceeding ₹1 Crore; track actual actuals against simulated percentiles.'
      },
      proTips: [
        'Agree with executive leadership on which confidence percentile (P80 or P90) will be used before running and presenting results.',
        'Show the deterministic single-point estimate directly on the S-curve; the gap between it and P80 is the most compelling slide in the board pack.',
        'Re-run the simulation model after negotiating risk-mitigation clauses to quantify value in probability terms.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Decision Tree Analysis',
        reason: 'When the uncertainty consists of a small number of discrete sequential choices (win/lose, proceed/halt) rather than continuous distributions.'
      },
      {
        alternative: 'Sensitivity / What-If Tables',
        reason: 'When you require a quick 10-minute snapshot of best, base, and worst cases for routine low-stakes operational decisions.'
      },
      {
        alternative: 'Scenario Planning',
        reason: 'When uncertainties are deep, structural, and qualitative (geopolitical shifts, regulatory upheaval) where probability distributions cannot be defined.'
      }
    ],
    reflectionPrompts: [
      'Which recurring corporate forecast (budget, sales target, project delivery) in your company is regularly missed due to the flaw of averages?',
      'What statistical confidence level does your executive team implicitly assume when making commitments to external stakeholders?',
      'If you could negotiate a risk-sharing clause for only one input in your major contract, which top tornado driver would it be?'
    ],
    quickReferenceCard: [
      'Model → Uncertain Inputs → Distributions → 10,000 Iterations → Percentile Outputs',
      'Report P50 (median), P80 (commitment standard), P90 (stress test), and probability of target',
      'Triangular distribution: min / most likely / max; Excel normal: NORM.INV(RAND(),μ,σ)',
      'Tornado chart identifies the single widest bar where risk mitigation must concentrate',
      'Always model correlations between co-dependent cost inputs'
    ],
    quiz: [
      {
        id: 'mc-1',
        question: 'In project schedule simulation, what does the output statement "P80 = 60 days" communicate to a project manager?',
        options: [
          'The project is guaranteed to finish in exactly 60 days.',
          'There is an 80% statistical probability that the project will be completed within 60 days or less.',
          'There is an 80% chance that the project will take longer than 60 days.',
          '80% of project tasks require 60 days of labor effort.'
        ],
        correctAnswer: 1,
        explanation: 'Percentile P80 denotes the 80th percentile of the cumulative distribution: in 80% of the 10,000 simulated project runs, total duration was 60 days or shorter, leaving a 20% risk of overrun.'
      },
      {
        id: 'mc-2',
        question: 'What three parameters uniquely define a standard Triangular probability distribution in risk modeling?',
        options: [
          'Mean, Median, and Mode',
          'Standard deviation, Variance, and Kurtosis',
          'Minimum (a), Most Likely / Mode (c), and Maximum (b)',
          'Upper Quartile, Lower Quartile, and Interquartile Range'
        ],
        correctAnswer: 2,
        explanation: 'The triangular distribution is defined by three intuitive expert parameters: the absolute minimum value (a), the most likely modal estimate (c), and the maximum plausible value (b).'
      },
      {
        id: 'mc-3',
        question: 'What core management insight is described by statistician Sam Savage as the "Flaw of Averages"?',
        options: [
          'Plans and budgets constructed using average or most-likely input values tend to be wrong, systematically overstating profits and understating durations.',
          'Mathematical averages are always statistically identical to the median.',
          'Running more Monte Carlo iterations automatically reduces the average.',
          'Average inputs produce completely risk-free forecasts.'
        ],
        correctAnswer: 0,
        explanation: 'The Flaw of Averages highlights that because real-world uncertainties have asymmetric downside risks and non-linear interactions, plugging in average inputs does not yield average outputs—it yields systematically optimistic distortions.'
      },
      {
        id: 'mc-4',
        question: 'What primary information does a Tornado Chart provide in a Monte Carlo simulation report?',
        options: [
          'It maps weather patterns affecting logistics operations.',
          'It ranks uncertain input variables from top to bottom by the magnitude of their swing on the outcome metric.',
          'It plots the cumulative probability S-curve against project milestones.',
          'It lists the chronological order in which project tasks must be executed.'
        ],
        correctAnswer: 1,
        explanation: 'A Tornado chart displays horizontal bars representing the sensitivity of the output to each input driver (varying each from P10 to P90 while holding others constant), immediately identifying the top leverage factors.'
      },
      {
        id: 'mc-5',
        question: 'What occurs if a financial modeler fails to specify a strong positive correlation between two cost inputs that actually move together in the market?',
        options: [
          'The simulation will dramatically overstate the volatility of the output.',
          'The simulation will artificially understate the true spread and downside variance of outcomes.',
          'The simulation will crash due to mathematical singularity.',
          'It has zero mathematical impact on the resulting output distribution.'
        ],
        correctAnswer: 1,
        explanation: 'When two cost drivers move in tandem (e.g., fuel prices and air freight rates), treating them as independent allows high fuel to be artificially offset by low freight in random trials, masking severe downside compound spikes.'
      }
    ]
  },
  {
    id: 'scenarioplanning',
    name: 'Scenario Planning & Strategic Wind-Tunnelling',
    shortName: 'Scenario Planning',
    category: 'Risk & Decision-Making',
    tagline: 'Prepare strategy for several plausible futures instead of betting on a single fragile forecast',
    origin: 'Pioneered in the 1950s by Herman Kahn at RAND Corporation; adapted to corporate business strategy by Pierre Wack at Royal Dutch Shell (1970s); popularized by Peter Schwartz in The Art of the Long View (1991).',
    corePurpose: 'Challenge executive assumptions, avoid strategic surprise, and build strategies that remain sound across a range of plausible long-term future worlds.',
    primaryUsers: [
      'Chief Executive Officers, Promoters & Board Chairs',
      'Corporate Strategy & Long-Range Planning Teams',
      'University Deans, Trustees & Institutional Chancellors',
      'Government Policy Makers & Infrastructure Authorities',
      'Private Equity Partners Evaluating Long-Horizon Buyouts'
    ],
    difficulty: 'Intermediate',
    horizon: '3 to 15 Year Strategic Planning Horizon',
    scope: 'Whole Enterprise Strategic Direction, New Market Entry, Capital Asset Architecture',
    timeToResult: '2 to 3 structured workshops over 4 to 10 weeks',
    dataNeeds: 'PESTLE environmental scans, 10–25 stakeholder interviews, identification of predetermined trends, and isolation of two critical uncertainties',
    keyOutput: '2×2 scenario matrix, four distinct future narratives, wind-tunnel strategy assessment table, and early-warning signpost dashboard',
    bestPairedWith: 'PESTLE / Porter’s Five Forces (scanning driving forces), Risk Matrix (strategic risks), Monte Carlo (modeling within specific scenarios)',
    keyFeatures: [
      'Clear definition of a strategic focal question with an explicit multi-year planning horizon',
      'Separation of Predetermined Elements (reliable demographic/technological trends) from Critical Uncertainties',
      '2×2 Scenario Matrix generated by crossing two independent, high-impact critical uncertainties',
      'Four vivid, named future narratives detailing macroeconomic, customer, and competitive conditions',
      'Strategic "Wind-Tunnelling" table evaluating initiatives across all four quadrants (Robust, Contingent, Risky)',
      'Early-warning Signpost Dashboard paired with measurable triggers activating pre-planned contingent responses'
    ],
    howItWorks: 'Define a specific focal question and time horizon (e.g., "What will skills-training demand look like in 2032?"). Scan external driving forces across PESTLE categories. Plot forces on an impact-uncertainty grid: high-impact low-uncertainty forces become predetermined elements; high-impact high-uncertainty forces become critical uncertainties. Choose two independent critical uncertainties as axes to form a 2×2 matrix of four distinct quadrants. Write vivid storylines for each world with memorable names. Wind-tunnel proposed strategies against all four worlds to classify moves as Robust (no-regret), Contingent (options), or Risky (bets). Establish early-warning signposts to monitor.',
    coreConcepts: [
      {
        term: 'The "Official Future"',
        definition: 'The unconscious, unquestioned collective assumption held by organizational leadership that the external operating environment will continue along recent historical trajectories.'
      },
      {
        term: 'Predetermined Elements',
        definition: 'High-impact driving forces whose future direction is virtually certain and irreversible (e.g., demographic aging of the regional working population).'
      },
      {
        term: 'Strategic Wind-Tunnelling',
        definition: 'The systematic stress-testing of proposed corporate strategies against each of the four distinct scenario worlds to evaluate viability, failure modes, and robustness.'
      },
      {
        term: 'Early-Warning Signposts & Triggers',
        definition: 'Observable real-world metrics (e.g., patent filings, regulatory policy drafts, hiring statistics) that signal which specific scenario is unfolding, activating contingency plans.'
      }
    ],
    strengths: [
      'Breaks entrenched "official future" thinking and exposes hidden executive assumptions',
      'Operates effectively when statistical probabilities cannot be meaningfully calculated due to deep uncertainty',
      'Builds shared understanding among leaders and enhances executive agility when shocks hit',
      'Prepares contingency plans in advance, dramatically accelerating response times when change occurs'
    ],
    limitations: [
      'Time-intensive; requires senior executive participation and skilled neutral facilitation',
      'Can deteriorate into entertaining fictional stories with no concrete link to capital decisions',
      'Quality of output is heavily dependent on selecting two truly independent, orthogonal uncertainty axes',
      'Teams frequently lapse into treating one preferred quadrant as the "de facto forecast," defeating the method'
    ],
    workflowPlacement: {
      upstream: 'Sits at the top of the strategy hierarchy, synthesizing PESTLE scans, customer interviews, and industry trends',
      downstream: 'Informs strategic corporate choices, capital budget phasing, M&A option design, and the strategic section of the risk register'
    },
    useCases: [
      {
        title: 'Skills Training Institute AI Disruption',
        situation: 'Vocational training institute considering ₹6 Crore expansion into 8 physical campuses.',
        problem: 'Generative AI automation of entry-level BPO/IT jobs and government skilling funding volatility.',
        action: 'Built 2×2 matrix (AI Automation Pace × Skilling Funding); wind-tunnelled the 8-centre capital plan.',
        outcome: 'Discovered opening 8 centres was disastrous in Disrupted Demand; opened 3 centres, embedded AI across curricula, saving ₹3.5 Cr.'
      },
      {
        title: 'Two-Wheeler Component Manufacturer EV Shift',
        situation: 'Manufacturing supplier with 900 staff investing in capacity amidst the electric vehicle transition.',
        problem: 'Speed of EV adoption and OEM localization policies were highly unpredictable.',
        action: 'Combined EV adoption pace with local-sourcing intensity; classified investments as robust, contingent, or risky.',
        outcome: 'Split capital expenditure between robust precision machining and staged battery enclosure options.'
      },
      {
        title: 'Regional Cooperative Bank Digital Strategy',
        situation: 'Financial institution evaluating 5-year branch expansion amidst digital payment surges.',
        problem: 'Leadership assumed customer banking behavior in rural districts would evolve very slowly.',
        action: 'Developed scenarios on fintech regulation and rural digital adoption; showed branch-heavy plans failed in 2 of 4 futures.',
        outcome: 'Shifted capital investment toward digital onboarding and fintech partnerships as no-regret moves.'
      }
    ],
    caseStudy: {
      company: 'Meenakshi Skills Academy (Madurai, Tamil Nadu)',
      revenue: '₹14 Crore',
      staff: '110 full-time educators & staff',
      profile: 'Madurai-headquartered skills-training institute with 2,000 annual learners across IT, BPO, and electronics programs across 14 centres in Tamil Nadu.',
      challenge: 'The executive board was considering a ₹6 Crore plan to open eight new physical training centres focused on entry-level IT support and BPO roles. At the same time, generative AI tools were rapidly automating routine coding and voice support tasks, and government scheme funding was volatile. The board forecast assumed steady growth based on a single fragile view of the future.',
      whyChosen: 'The key uncertainties—the pace of AI automation and the level of public/employer skilling funding—could not be assigned meaningful probabilities over a six-year horizon. The board needed a way to test expansion without pretending to forecast.',
      steps: [
        'Formulated the focal question: "What should our programme portfolio and centre network look like in 2032?"',
        'Conducted 20 structured interviews with employers, placement partners, alumni, faculty, and state skilling officials.',
        'Compiled 38 driving forces; identified regional working-age population growth as a predetermined element.',
        'Selected two critical uncertainties as axes: Pace of AI automation of entry roles (Slow ↔ Fast) and Public/Employer skilling funding (Low ↔ High).',
        'Authored four scenario narratives: Skilling Boom (Q1), AI Upskill Rush (Q2), Steady Squeeze (Q3), and Disrupted Demand (Q4).',
        'Wind-tunnelled the 8-centre plan: proved it performed well only in Skilling Boom and failed catastrophically in Disrupted Demand.',
        'Identified robust no-regret moves (AI tools in all courses, employer partnerships, hybrid delivery) and contingent options (2-wave centre rollout).',
        'Established leading signposts: partner employer hiring volumes YoY, state scheme allocations, and AI adoption rates.'
      ],
      results: [
        'Opened three physical centres instead of eight, saving ₹3.5 Crore in committed capital expenditure.',
        'Launched AI-augmented curricula across all programs; placement rates held steady while competitors saw sharp declines.',
        'Signposts pointed toward the AI Upskill Rush world, triggering the second investment wave in a modified hybrid form.',
        'Signed five new corporate reskilling contracts for enterprise clients.'
      ],
      lessonsLearned: [
        'Stakeholder interviews mattered more than internal workshops: employers revealed hiring shifts before internal staff recognized them.',
        'Giving scenarios vivid, memorable names allowed board members to reference them continuously in subsequent executive meetings.',
        'The hardest executive discipline was resisting the urge to pick one favored scenario as the "real" forecast.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Executive sponsor (CEO or Board Chair) committed to acting on strategic findings and challenging assumptions',
        'Cross-functional core team of 6 to 12 leaders representing different operational and commercial tiers',
        'Experienced facilitator to steer discussions and external voices (clients, partners) to confront groupthink'
      ],
      steps: [
        'Agree on the strategic focal question, time horizon (3–10 years), and capital decisions to be informed.',
        'Conduct 10 to 25 interviews with internal executives and external stakeholders to surface hidden driving forces.',
        'Gather trend data across PESTLE categories and compile an environmental briefing pack.',
        'Facilitate Workshop 1: brainstorm driving forces, rate on impact and uncertainty, and extract predetermined elements.',
        'Select the two highest-impact, largely independent critical uncertainties to form the 2×2 matrix.',
        'Draft four plausible scenario narratives with memorable names, timelines, and customer dynamics.',
        'Facilitate Workshop 2: wind-tunnel existing strategy and new options; classify as Robust, Contingent, or Risky.',
        'Define explicit early-warning signpost metrics, trigger thresholds, and pre-planned contingent responses.',
        'Integrate robust moves into the annual operating plan and review signpost metrics quarterly at board meetings.'
      ],
      checklist: [
        'Is the focal question specific enough to drive tangible capital and product commitments?',
        'Are the two critical uncertainty axes genuinely independent (orthogonal)?',
        'Have you strictly avoided creating "Best Case, Worst Case, Base Case" disguised forecasts?',
        'Has the team avoided assigning subjective percentage probabilities to the four worlds?',
        'Does the executive board agenda include a quarterly signpost indicator tracking review?'
      ],
      commonMistakes: [
        {
          mistake: 'Choosing axes that are predictable trends rather than genuine high-impact uncertainties',
          fix: 'Test axes for genuine unpredictability; predetermined demographic shifts must go into all four scenarios.'
        },
        {
          mistake: 'Structuring scenarios as Best, Worst, and Base cases, leading teams to pick the middle forecast',
          fix: 'Ensure all four quadrants present plausible, internally consistent combinations with unique trade-offs.'
        },
        {
          mistake: 'Stopping at creative storytelling without executing the wind-tunnelling decision matrix',
          fix: 'Always force the team to test specific strategic options against each world and classify them into robust or contingent plays.'
        }
      ],
      plan306090: {
        d30: 'Agree on focal question; assemble core team; conduct stakeholder interviews; compile trend briefing.',
        d60: 'Execute driving forces workshop; select critical uncertainty axes; author four scenario narratives.',
        d90: 'Run wind-tunnelling workshop; define signpost dashboard and trigger actions; present strategic roadmap to the board.'
      },
      proTips: [
        'Interview outsiders—customers, young frontline employees, industry suppliers—before the first workshop to break internal blind spots.',
        'Write scenario narratives as if reporting from the future (e.g. "By October 2032..."), citing specific simulated events.',
        'Link signposts directly to the enterprise risk register and review them in the same governance forum.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Monte Carlo Simulation',
        reason: 'When uncertainties involve measurable financial or operational variables over short-to-medium horizons where historical distributions exist.'
      },
      {
        alternative: 'PESTLE / SWOT Analysis',
        reason: 'When you require a static current-state snapshot of the external environment rather than dynamic alternative futures.'
      },
      {
        alternative: 'Decision Tree Analysis',
        reason: 'When facing discrete near-term crossroads with clearly defined branch probabilities and immediate monetary payoffs.'
      }
    ],
    reflectionPrompts: [
      'What is your organization’s unspoken "official future"—the core assumption about customers and technology that nobody dares challenge?',
      'If you look back five years, what unexpected external disruption most impacted your sector, and could scenario thinking have rehearsed your response?',
      'Which of your company’s current capital commitments would turn into an unaffordable write-off under a plausible alternate future?'
    ],
    quickReferenceCard: [
      'Focal question + horizon → driving forces → impact/uncertainty sort',
      'Predetermined elements in all worlds; two critical uncertainties as axes',
      'Four distinct, named, plausible narratives — not best/worst/base',
      'Wind-tunnel strategies: robust (no-regret) · contingent (options) · risky (bets)',
      'Signposts + thresholds + triggered actions reviewed quarterly by the Board'
    ],
    quiz: [
      {
        id: 'sp-1',
        question: 'Under what external conditions is Scenario Planning the most valuable strategic framework for executive leadership?',
        options: [
          'When the market environment is highly stable and future revenue can be predicted with standard linear regressions.',
          'When key external drivers carry deep structural uncertainty such that assigning statistical probabilities is meaningless.',
          'When an organization only needs to audit past operational defect records.',
          'When a single mathematical formula can solve all corporate strategic dilemmas.'
        ],
        correctAnswer: 1,
        explanation: 'Scenario planning was developed specifically for environments characterized by deep, structural uncertainty—where multiple plausible futures exist and calculating precise probabilities creates dangerous false confidence.'
      },
      {
        id: 'sp-2',
        question: 'In scenario planning methodology, how is a "Predetermined Element" defined?',
        options: [
          'An external force that is high impact but whose trajectory is relatively certain and predictable across all scenarios.',
          'A decision node already approved by the board of directors.',
          'An uncertain variable that carries zero significance for corporate strategy.',
          'A worst-case scenario that must be avoided at all costs.'
        ],
        correctAnswer: 0,
        explanation: 'Predetermined elements are major forces whose future course is known with near certainty (such as predictable demographic transitions or already-enacted legislation); they form the shared backdrop of all four scenario narratives.'
      },
      {
        id: 'sp-3',
        question: 'What is the golden rule for defining the two axes of a standard 2×2 scenario planning matrix?',
        options: [
          'They should represent "Best Case" on the horizontal and "Worst Case" on the vertical.',
          'They should be two financial ratios that always move in direct proportion.',
          'They must be two high-impact, highly uncertain forces that are largely independent of each other.',
          'They should represent quarterly sales volume versus marketing expenditure.'
        ],
        correctAnswer: 2,
        explanation: 'To generate four genuinely distinct, challenging quadrants, the two axes must be critical uncertainties that are orthogonal (independent). If one axis dictates the other, the matrix collapses into a 1-dimensional best/worst continuum.'
      },
      {
        id: 'sp-4',
        question: 'What is a "Robust" or "No-Regret" strategic move discovered during wind-tunnelling?',
        options: [
          'A risky bet that yields extraordinary profits in only one specific scenario.',
          'An initiative that performs acceptably or exceptionally well across all four plausible future scenarios.',
          'An option that maximizes debt financing regardless of interest rate shifts.',
          'A strategy that requires zero initial capital investment.'
        ],
        correctAnswer: 1,
        explanation: 'A robust or no-regret move is an initiative that provides clear strategic and financial benefits regardless of which future scenario actually materializes (e.g., training staff in AI tools or building modular flexible capacity).'
      },
      {
        id: 'sp-5',
        question: 'What is the operational function of "Signposts" and "Triggers" in a scenario planning system?',
        options: [
          'To assign creative names to the four quadrants of the matrix.',
          'To continuously detect observable real-world signals indicating which scenario is emerging and activate pre-planned contingent options.',
          'To calculate Expected Monetary Value (EMV) at decision chance nodes.',
          'To replace traditional monthly income statement reporting.'
        ],
        correctAnswer: 1,
        explanation: 'Signposts are leading external indicators (such as hiring indices, policy drafts, or competitor pricing shifts) monitored systematically to give leadership early warning of which scenario is becoming reality, triggering pre-agreed actions.'
      }
    ]
  },
  {
    id: 'pareto',
    name: 'Pareto Analysis & The 80/20 Prioritisation Rule',
    shortName: 'Pareto Analysis',
    category: 'Risk & Decision-Making',
    tagline: 'Isolate the vital few causes that generate 80% of problems, defects, and costs from the trivial many',
    origin: 'Italian economist Vilfredo Pareto (1896); generalized to quality and operations management by Joseph M. Juran (1940s–50s) as the "vital few and trivial many"; adopted by Kaoru Ishikawa among the 7 Basic Tools of Quality.',
    corePurpose: 'Focus scarce executive, technical, and operational resources on the vital 20% of root causes, customer categories, or defect types that drive 80% of total business friction, rework cost, and customer dissatisfaction.',
    primaryUsers: [
      'Operations & Quality Managers (Six Sigma / Lean Practitioners)',
      'Customer Service & Technical Support Directors',
      'Supply Chain & Warehouse Inventory Controllers (ABC Analysis)',
      'IT Service & Software Bug Triage Teams',
      'Finance Controllers Analysing Cost Overruns & Warranty Claims'
    ],
    difficulty: 'Beginner',
    horizon: 'Immediate Operational Prioritisation & Continuous Improvement',
    scope: 'Quality Control, Customer Support, Inventory Management, Warranty & Rework',
    timeToResult: '1 to 2 hours with clean categorized historical data',
    dataNeeds: 'Categorized incident records, defect logs, customer complaint tickets, or inventory SKU consumption values',
    keyOutput: 'Dual-axis Pareto chart (sorted descending bars + cumulative % curve) and prioritized root-cause action plan',
    bestPairedWith: 'Fishbone / 5 Whys (root-cause discovery on top bar), Risk Matrix (rating prioritized issues), Six Sigma DMAIC',
    keyFeatures: [
      'Dual-axis Pareto chart combining sorted descending frequency bars with a cumulative percentage curve',
      'Clear 80% cutoff threshold visually demarcating the "vital few" from the "trivial many"',
      'Distinction between Frequency Pareto (count) and Weighted Pareto (monetary cost, downtime, safety severity)',
      'Nested (drill-down) Pareto analysis breaking down the primary bar into actionable sub-causes',
      'ABC Inventory Classification mapping SKUs into A (top 70–80% value), B (15–20%), and C (5–10%) groups',
      'Before-and-after comparative Pareto charting proving verified defect reduction after intervention'
    ],
    howItWorks: 'Define the operational problem and metric (count, rework cost, or downtime hours). Establish 6 to 10 clear, non-overlapping categories, grouping minor items as "Other" (<10%). Collect data over a representative 3-to-6 month period. Sort categories in descending order, compute percentage of total, and calculate cumulative percentage line. Plot the dual-axis chart and identify categories reaching ~70–80% cumulative share. Drill down into the top category with a second-level Pareto or root-cause 5 Whys / Fishbone analysis. Implement targeted countermeasures and re-measure after 90 days to verify that the top bar has shrunk.',
    coreConcepts: [
      {
        term: 'The Vital Few vs. Trivial (Useful) Many',
        definition: 'Joseph Juran’s formulation of Pareto’s principle: a minority of causes (~20%) consistently accounts for the vast majority (~80%) of the total effect or problem.'
      },
      {
        term: 'Weighted Pareto Analysis',
        definition: 'Sorting categories by monetary impact, downtime hours, or safety severity rather than pure occurrence frequency, preventing low-cost high-volume noise from hiding critical expensive failures.'
      },
      {
        term: 'Nested / Drill-Down Pareto',
        definition: 'Performing a secondary Pareto analysis on the single largest category from the first-level chart to uncover specific, actionable root sub-mechanisms.'
      },
      {
        term: 'ABC Classification',
        definition: 'An inventory and customer segmentation technique based on the Pareto principle: Class A items (top 80% value, ~20% items) receive strict daily controls; Class C items receive loose periodic controls.'
      }
    ],
    strengths: [
      'Simple, intuitive, and can be mastered and implemented by frontline supervisors in under an hour',
      'Converts raw operational data into an objective, indisputable priority ranking that builds consensus',
      'Prevents spreading scarce engineering and managerial effort thinly across dozens of minor symptoms',
      'Provides definitive visual before-and-after proof of process improvement for quality audits'
    ],
    limitations: [
      'Completely dependent on consistent, high-integrity categorization of incident tickets and defect logs',
      'Frequency-only Pareto can dangerously mislead if a rare defect is catastrophic while frequent defects are minor',
      'Shows what is happening and where it concentrates, but does not explain WHY the defect occurs',
      'Represents a historical backward-looking snapshot; cannot foresee emerging new failure modes'
    ],
    workflowPlacement: {
      upstream: 'Takes input from customer complaint portals, ERP quality modules, warranty logs, and accounting ledgers',
      downstream: 'Feeds Ishikawa (Fishbone) root-cause diagrams, 5 Whys deep dives, Kaizen rapid improvement events, and Risk Matrix updates'
    },
    useCases: [
      {
        title: 'Appliance Service Repeat-Visit Reduction',
        situation: 'Field service network with 180 technicians experiencing 18% repeat customer calls.',
        problem: 'Management planned generic soft-skills training with zero measurable benefit.',
        action: 'Built Pareto chart on 5,600 repeat visits; top 3 causes accounted for 74% of repeats, led by missing spare parts.',
        outcome: 'Drill-down into parts showed 20 SKUs caused 78% of shortages; trunk kits cut repeats from 18% to 9% in 5 months.'
      },
      {
        title: 'E-Commerce Logistics Complaint Triage',
        situation: 'Online retailer processing 500 customer complaints monthly.',
        problem: 'Support team was overwhelmed treating all ticket categories with equal priority.',
        action: 'Classified complaints; Late Delivery (36%), Wrong Item (22%), and Damaged Goods (14%) drove 72% of issues.',
        outcome: 'Focused vendor reviews on courier SLA and barcode picking checks; cut complaint volume by 48%.'
      },
      {
        title: 'Machine Shop Defect Cost Reduction',
        situation: 'CNC precision machining facility with rising scrap and rework costs.',
        problem: 'Supervisors argued over causes based on personal impressions.',
        action: 'Constructed a Weighted Pareto by rework rupee cost; showed dimensional errors on one family drove 62% of expenses.',
        outcome: 'Redesigned workholding fixture for that product family; rework expenses plunged immediately.'
      }
    ],
    caseStudy: {
      company: 'Thirumalai Appliance Care (Madurai, Tamil Nadu)',
      revenue: '₹18 Crore',
      staff: '180 technicians across 22 service centres',
      profile: 'Authorized after-sales service network for major consumer home appliances across southern Tamil Nadu.',
      challenge: 'Repeat visits—where a technician had to revisit the same customer complaint within 30 days—had climbed to 18% of all jobs, increasing operating costs and pulling down the brand’s customer-satisfaction score, which threatened annual authorized service contract renewal.',
      whyChosen: 'The company had six months of job-card data (31,000 jobs with 5,600 repeat visits) but had never analyzed it systematically. The operations manager needed to know where to focus before spending more on technician retraining.',
      steps: [
        'Exported six months of job cards and recoded free-text remarks into nine non-overlapping cause categories.',
        'Constructed a first-level Pareto: revealed three causes accounted for 74% of repeat visits (spare part not available on first visit 38%, wrong initial diagnosis 22%, incomplete installation checks 14%).',
        'Built a Weighted Pareto by total cost (travel + technician time + part re-shipment) confirming spare-part unavailability was also the most expensive cause.',
        'Conducted a drill-down Pareto on spare-part shortages: discovered that just 20 part numbers accounted for 78% of all delays.',
        'Created standardized van trunk stock for the 20 critical parts; introduced a 5-point diagnosis checklist and photo verification for appliance faults.',
        'Instituted a monthly Pareto review in the operations meeting to monitor progress.'
      ],
      results: [
        'Repeat service visits fell from 18% to 9% across the network within five months.',
        'Spare-part-related repeat visits dropped by roughly two-thirds.',
        'Technician jobs completed per day expanded as fewer return trips freed capacity.',
        'Network customer-satisfaction score moved into the top regional quartile, securing contract renewal.'
      ],
      lessonsLearned: [
        'Recoding unstructured free-text descriptions into clear standardized categories was the most time-consuming but essential step.',
        'Retraining—the original management instinct—addressed only the second-largest cause; parts availability was the far larger financial lever.',
        'The drill-down Pareto turned a vague "parts problem" into an actionable list of 20 specific part numbers that procurement could immediately stock.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Clearly defined operational problem statement and historical incident records (minimum 100 entries)',
        'Analyst to clean data, recode free text, and build the Pareto chart in spreadsheets or BI tools',
        'Process owner with authority to implement corrective countermeasures on identified top categories'
      ],
      steps: [
        'Define the problem statement and the ranking metric (count, rework cost, downtime hours).',
        'Set a representative data period (typically 3 to 6 months) to avoid seasonal distortion.',
        'Define 6 to 10 clear, non-overlapping categories with written definitions.',
        'Clean data, eliminate duplicates, and recode free-text ticket remarks.',
        'Sum by category, sort descending, and compute individual and cumulative percentages.',
        'Build the dual-axis chart (bars for values on left axis, cumulative line on right axis); mark the 80% line.',
        'Evaluate whether a Weighted Pareto by monetary cost changes the category priority order.',
        'Drill down into the top 1 or 2 vital categories with a secondary Pareto or 5 Whys root-cause inquiry.',
        'Assign corrective actions with single owners and deadlines; re-measure after 90 days to verify shrinkage.'
      ],
      checklist: [
        'Are incident categories non-overlapping with clear written definitions?',
        'Is the "Other" catch-all category kept below 10–12% of total problem volume?',
        'Have you verified whether weighting by financial cost changes the ranking order?',
        'Does the cumulative percentage line clearly identify which categories cross 80%?',
        'Is a re-measurement date scheduled 90 days out to generate the before/after chart?'
      ],
      commonMistakes: [
        {
          mistake: 'Using vague, overlapping categories that lead staff to misclassify incidents',
          fix: 'Write category definitions with concrete examples and test them on 20 sample records before coding.'
        },
        {
          mistake: 'Ranking purely by frequency when unit financial costs differ widely across categories',
          fix: 'Always build a companion Weighted Pareto by financial cost or safety severity.'
        },
        {
          mistake: 'Stopping at the Pareto chart without initiating root-cause analysis (5 Whys or Fishbone)',
          fix: 'Treat the Pareto chart as the starting diagnostic that identifies WHERE to focus root-cause problem solving.'
        }
      ],
      plan306090: {
        d30: 'Select one high-friction operational area; clean 3–6 months of incident records; build the first Pareto chart.',
        d60: 'Execute drill-down Pareto on the top category; perform 5 Whys root-cause analysis; deploy corrective countermeasures.',
        d90: 'Re-measure data; publish side-by-side before/after charts proving bar shrinkage; expand Pareto to inventory or sales.'
      },
      proTips: [
        'Keep the "Other" category small; if it grows beyond 10%, split it into more granular categories.',
        'Stratify data by shift, location, or product before concluding; an aggregated company-wide Pareto can mask local bottlenecks.',
        'Display before/after Pareto charts publicly in team work areas to celebrate visible proof of quality improvements.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Risk Matrix',
        reason: 'When prioritizing prospective future risks that have not yet occurred rather than analyzing historical incident data.'
      },
      {
        alternative: 'Fishbone (Ishikawa) Diagram / 5 Whys',
        reason: 'When you have already identified the top defect category and need to dissect underlying causes rather than prioritize categories.'
      },
      {
        alternative: 'Six Sigma DMAIC',
        reason: 'When the primary defect requires complex multivariate statistical modeling of process variance rather than categorical segmentation.'
      }
    ],
    reflectionPrompts: [
      'In which operational department of your company is effort currently diluted equally across minor issues instead of focused on the vital 20%?',
      'Which 20% of your customer accounts or SKU product codes generate 80% of your bottom-line gross margin—and do you manage them differently?',
      'If you constructed a Weighted Pareto of your operations team’s weekly rework costs, which single defect type would emerge at the very top?'
    ],
    quickReferenceCard: [
      'Define problem → categorise → count/cost → sort descending → cumulative % → dual-axis chart',
      'Vital few ≈ categories reaching ~70–80% cumulative share',
      'Use Weighted Pareto whenever financial cost or severity varies across defect types',
      'Drill down into top bar with 2nd-level Pareto; follow with 5 Whys root-cause analysis',
      'Plot before/after charts side-by-side to verify that the top bar has shrunk'
    ],
    quiz: [
      {
        id: 'pa-1',
        question: 'What visual components make up a standard Pareto chart in quality and operations management?',
        options: [
          'A pie chart divided into four quadrants with equal angles.',
          'A horizontal scatter plot showing correlations between two continuous variables.',
          'Vertical bars sorted in descending order of frequency or cost from left to right, paired with an ascending cumulative percentage line.',
          'A chronological time-series line tracking daily production output.'
        ],
        correctAnswer: 2,
        explanation: 'A Pareto chart combines a bar chart (with categories ordered from largest to smallest) and an ogive line representing the running cumulative percentage, making the vital few immediately obvious.'
      },
      {
        id: 'pa-2',
        question: 'How should executives and operational leaders interpret the "80/20 rule"?',
        options: [
          'As an immutable, exact mathematical law that must always equal precisely 80.0% and 20.0%.',
          'As a general empirical rule of thumb highlighting that severe imbalance is common, where roughly 80% of effects stem from 20% of causes.',
          'As a mandatory government accounting requirement for corporate tax filings.',
          'As an operational standard requiring staff to work 80 hours across 20 days.'
        ],
        correctAnswer: 1,
        explanation: 'The 80/20 rule is an empirical observation of natural skewness in human, economic, and technical systems (real data may be 70/30 or 90/10). The key insight is the profound concentration of effects in a vital few causes.'
      },
      {
        id: 'pa-3',
        question: 'In an e-commerce complaint audit: Late Delivery represents 36%, Wrong Item Shipped represents 22%, and Damaged Product represents 14%. What is the cumulative percentage for these top three categories?',
        options: [
          '58%',
          '72%',
          '81%',
          '87%'
        ],
        correctAnswer: 1,
        explanation: 'Cumulative percentage = 36% + 22% + 14% = 72%. Just three of eight complaint types account for nearly three-quarters of all customer grievances.'
      },
      {
        id: 'pa-4',
        question: 'When is it essential to construct a "Weighted Pareto" rather than a standard frequency Pareto?',
        options: [
          'When all categories have identical unit costs and customer impact.',
          'When there are fewer than three categories to analyze.',
          'When the financial cost, safety severity, or downtime impact varies widely across different defect types.',
          'When historical data is completely unavailable.'
        ],
        correctAnswer: 2,
        explanation: 'A pure frequency count can mislead: 200 minor label scratches costing ₹50 each (₹10,000) rank higher on a frequency chart than 40 motor failures costing ₹900 each (₹36,000). A weighted Pareto prioritizes financial and operational impact.'
      },
      {
        id: 'pa-5',
        question: 'After a Pareto chart clearly highlights the top 1 or 2 "vital few" categories, what is the recommended next operational step?',
        options: [
          'Immediately conclude the quality review and file the report.',
          'Delete the "trivial many" categories from future data collection.',
          'Conduct root-cause analysis (e.g., 5 Whys, Ishikawa Fishbone, or a secondary drill-down Pareto) specifically on the top categories.',
          'Re-rate categories until the distribution appears evenly balanced.'
        ],
        correctAnswer: 2,
        explanation: 'Pareto shows WHERE problems concentrate, not WHY they happen. Once the vital few are identified, teams must apply root-cause tools (like 5 Whys, Fishbone diagrams, or nested Paretos) to isolate actionable corrective countermeasures.'
      }
    ]
  }
];

export const CATEGORY_8_STACKS: StrategyStack[] = [
  {
    id: 'stack-risk-startup',
    name: 'Stack A — Lean Startup & SME Risk Stack',
    targetOrg: 'Under 50 people, single product or fast-growing venture',
    recommendedChain: ['pareto', 'riskmatrix', 'decisiontree'],
    cadence: {
      quarterly: 'Monthly Pareto review on customer complaints and waste leaks; quarterly 5×5 Risk Matrix check-in on top 10 risks',
      annually: 'Comprehensive Risk Matrix refresh with written likelihood and impact scales',
      every23Years: 'Decision Tree Analysis for threshold capex decisions (leases, senior hires, vendor agreements)'
    },
    whyItFits: 'Startups need immediate cash and leak detection rather than heavy GRC software. Monthly Pareto isolates operational drains while a 1-page Risk Matrix keeps the founder and investors aligned on key threats.',
    whatToSkip: 'Skip formal Monte Carlo and Scenario Planning; simple three-point best/base/worst spreadsheets suffice.'
  },
  {
    id: 'stack-risk-sme',
    name: 'Stack B — Growing Mid-Market SME & Institution',
    targetOrg: '50 to 500 employees, multi-branch, colleges, or mid-size industrial exporters',
    recommendedChain: ['pareto', 'riskmatrix', 'decisiontree', 'montecarlo', 'scenarioplanning'],
    cadence: {
      quarterly: 'Monthly Pareto in operations; quarterly Risk Matrix review with active KRI tracking for high/red items',
      annually: 'Monte Carlo simulation for annual budgeting, tender bids, and critical capital scheduling (commit at P80); Decision Trees for major disputes and capex requests',
      every23Years: 'Scenario Planning workshop with 2×2 matrix and signposts prior to major geographic expansion or campus construction'
    },
    whyItFits: 'Scaling mid-market firms face multi-variable pricing and contract risks. Combining Pareto for defects, Risk Matrix for governance, and Monte Carlo for P80 financial commitments prevents costly overruns.',
    whatToSkip: 'Avoid multimillion-dollar enterprise GRC platforms; well-governed spreadsheets with automated data validation are sufficient.'
  },
  {
    id: 'stack-risk-enterprise',
    name: 'Stack C — Enterprise & Listed Institution Governance',
    targetOrg: '500+ employees, listed public companies, universities, or industrial holding groups',
    recommendedChain: ['riskmatrix', 'montecarlo', 'decisiontree', 'scenarioplanning', 'pareto'],
    cadence: {
      quarterly: 'Enterprise Risk Management (ERM) heat map dashboard reviewed quarterly by Board Risk Committee; monthly KRI anomaly reporting',
      annually: 'Stochastic portfolio Monte Carlo modeling for capex allocations, treasury hedging, and M&A due diligence',
      every23Years: 'Institutionalized Scenario Planning with standing signpost radar dashboards reviewed by executive directors; Pareto embedded in Lean Six Sigma belts'
    },
    whyItFits: 'Meets stringent SEBI LODR, ISO 31000, and institutional accreditation mandates. Quantifies risk across portfolios, protects debt covenants, and rehearses responses to deep macroeconomic disruptions.',
    whatToSkip: 'Do not rely on unverified qualitative ratings alone; mandate quantitative stochastic modeling for all multi-crore initiatives.'
  }
];

export const CATEGORY_8_SCENARIOS: ScenarioMission[] = [
  {
    id: 'mission-rm-1',
    title: 'The Single-Supplier Grinding Collapse & Board Alarm',
    role: 'Operations & Supply Chain Director',
    companyContext: 'Kaveri Agro Foods: Madurai-based spice processing exporter with 260 employees.',
    crisisPrompt: 'Following an unexpected 14-day production halt from a critical grinding mill breakdown, the board demands a complete overhaul of the company’s outdated risk register. 19 of the 45 proposed risks are marked "Red" by emotional department heads. The CEO states the company cannot address 19 top priorities simultaneously. How do you calibrate the risk register and structure an executive action plan?',
    targetTools: ['riskmatrix'],
    options: [
      {
        id: 'opt-1',
        label: 'Accept all 19 red risks as urgent and divide the maintenance budget equally across all 19 departments',
        toolUsed: 'Diluted Budgeting',
        explanation: 'Budget is diluted paper-thin; core single-point failures remain unmitigated while minor nuisances consume emergency funds.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Run a calibration workshop with written descriptors, score residual risk after controls, merge duplicates, and enforce Impact-5 board escalation',
        toolUsed: 'ISO 31000 Calibrated Risk Matrix',
        explanation: 'Outstanding governance! Written scales eliminate subjective inflation, condensing red risks to 6 genuine critical items with named owners, KRIs, and backup lease agreements.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Arbitrarily cap red risks at 3 items by deleting the bottom 16 from the tracking spreadsheet',
        toolUsed: 'Arbitrary Suppression',
        explanation: 'Hides genuine vulnerabilities from the board audit committee, creating catastrophic blind spots in food safety and cyber security.',
        isOptimal: false,
        rubricPoints: 8
      }
    ],
    modelAnswer: 'Treat this as a calibration problem. Establish concrete written likelihood percentage scales and multi-tier financial/operational consequence descriptors. Re-rate all 19 risks against residual risk, properly crediting existing preventive controls. Merge overlapping duplicates into consolidated operational risks. The critical red list will condense to 5–8 genuine items. Assign a single named owner, treatment plan, and early-warning KRI to each, and enforce the mandatory board escalation rule for any Impact=5 item.',
    actionChecklist: [
      'Define written likelihood and consequence rating scales',
      'Evaluate residual risk by crediting operational controls',
      'Consolidate duplicate risks across branch locations',
      'Enforce mandatory board escalation for Impact=5 risks',
      'Pair every High/Critical risk with a single owner and KRI'
    ],
    reflectionKey: 'Written descriptor scales, rather than the visual grid itself, anchor subjective emotions and prevent alarmist rating inflation.'
  },
  {
    id: 'mission-dt-2',
    title: 'The ₹2.4 Crore Subcontractor Retention Dispute',
    role: 'Managing Director & Legal Liaison',
    companyContext: 'Vaigai Infra Services: Industrial electrical EPC subcontractor with 400 staff.',
    crisisPrompt: 'A general contractor has withheld ₹2.4 Crore in project milestone retention payments, alleging delay damages, and offers an out-of-court settlement with a ₹90 Lakh deduction. Your legal counsel urges immediate arbitration, claiming a "great chance of total victory." What analytical approach guides the decision?',
    targetTools: ['decisiontree'],
    options: [
      {
        id: 'opt-1',
        label: 'Accept the lawyer’s verbal reassurance and file for full arbitration in tribunal court immediately',
        toolUsed: 'Unchecked Litigation',
        explanation: 'Fails to quantify probability-weighted outcomes or cash freeze; arbitration costs and potential liquidated counter-claims jeopardize bank debt covenants.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Construct a decision tree with calibrated probabilities, calculate arbitration EMV (₹133L cost), find break-even probability, and negotiate counter-settlement',
        toolUsed: 'Decision Tree Analysis & EMV Roll-Back',
        explanation: 'Brilliant decision analysis! Proves arbitration is economically inferior to settling (₹133L expected loss vs ₹90L offer); empowers MD to counter-settle at ₹75 Lakh and unlock immediate liquidity.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Accept the ₹90 Lakh deduction immediately without any counter-offer or probability analysis',
        toolUsed: 'Passive Concession',
        explanation: 'Leaves ₹15–20 Lakh of recoverable cash on the table by failing to understand the contractor’s own litigation avoidance incentives.',
        isOptimal: false,
        rubricPoints: 12
      }
    ],
    modelAnswer: 'Translate subjective lawyer assertions into explicit branch probabilities: 50% Full Win (₹0 deduction), 20% Partial Loss (absorb ₹1.2 Cr), 30% Full Loss with damages (absorb ₹2.8 Cr). Add ₹25 Lakh in legal costs. Rolling back the tree produces an expected cost of contesting of ₹133 Lakh versus ₹90 Lakh to settle. Sensitivity analysis demonstrates that arbitration only beats settling if full-loss risk falls below 15%. Counter-offer at ₹60 Lakh and settle at ₹75 Lakh, releasing cash within six weeks.',
    actionChecklist: [
      'Draw decision tree left to right with square and circle nodes',
      'Elicit calibrated reference case probabilities from legal counsel',
      'Roll back tree right to left to compute Expected Monetary Value',
      'Evaluate worst-case leaf against available cash covenants',
      'Use EMV as the walk-away ceiling during out-of-court negotiation'
    ],
    reflectionKey: 'Asking lawyers for numbers transforms vague legal opinions into explicit economic trade-offs that boards can objectively govern.'
  },
  {
    id: 'mission-mc-3',
    title: 'The Fixed-Price Garment Export Margin Trap',
    role: 'Chief Financial Officer',
    companyContext: 'Noyyal Knit Exports: Tiruppur knitwear manufacturer evaluating 600,000 garment order.',
    crisisPrompt: 'A European retailer offers a 12-month fixed-price purchase order for 600,000 garments at $4.20/piece. The finance manager’s single-point spreadsheet shows a comfortable 8% net margin based on average cotton yarn prices and standard rupee exchange rates. Cotton yarn prices have fluctuated by 35% in prior years. How do you evaluate the contract before signing?',
    targetTools: ['montecarlo'],
    options: [
      {
        id: 'opt-1',
        label: 'Sign the contract immediately based on the 8% single-point margin model, assuming positive and negative swings will cancel out',
        toolUsed: 'Deterministic Flaw of Averages',
        explanation: 'Succumbs to the "Flaw of Averages"—the contract suffers a 25% risk of net loss as yarn spikes and currency drops compound during peak production.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Run a 10,000-iteration Monte Carlo simulation, generate an S-curve and Tornado chart, and negotiate a yarn-escalation band and currency hedge to protect P80 margin',
        toolUsed: 'Monte Carlo Stochastic Simulation',
        explanation: 'Masterful risk quantification! Reveals yarn price as the 54% primary variance driver; implementing a ±10% price collar and forward currency cover reduces loss probability below 8% while safeguarding order volume.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Reject the contract outright because any commodity price volatility makes international fixed-price manufacturing unviable',
        toolUsed: 'Excessive Risk Aversion',
        explanation: 'Forfeits a high-volume ₹21 Crore revenue relationship that could have been safely executed with targeted hedging.',
        isOptimal: false,
        rubricPoints: 10
      }
    ],
    modelAnswer: 'Replace the deterministic spreadsheet with a 10,000-iteration Monte Carlo simulation using triangular distributions for yarn price, USD/INR rate, dyeing costs, and rejection rates, modeling positive correlation between yarn and dyeing energy costs. The simulation will expose the Flaw of Averages: a 25% probability of contract loss despite a 7% median margin. The Tornado Chart will identify cotton yarn as the dominant driver. Negotiate a yarn price adjustment clause beyond a ±10% band and forward-hedge currency to secure P80 profitability.',
    actionChecklist: [
      'Validate base deterministic costing sheet for formula accuracy',
      'Assign triangular distributions (min, mode, max) from 3-year records',
      'Incorporate correlation between co-moving input costs',
      'Generate S-curve and extract P80 confidence commitment benchmark',
      'Target contract risk-sharing clauses on the top Tornado chart lever'
    ],
    reflectionKey: 'Single-point plans built on "most likely" inputs are systematically optimistic because real-world risks have asymmetric fat tails.'
  },
  {
    id: 'mission-sp-4',
    title: 'The AI Disruption & ₹6 Crore Vocational Campus Crossroad',
    role: 'Chief Executive Officer',
    companyContext: 'Meenakshi Skills Academy: Vocational skilling network with 2,000 students across 14 centres.',
    crisisPrompt: 'Your board plans to invest ₹6 Crore in constructing eight physical branch campuses focused on training youth for entry-level BPO and junior software coding roles. Generative AI tools are rapidly automating customer service scripts and basic coding, while government vocational funding is uncertain. How do you test this large irreversible capital commitment against deep future uncertainty?',
    targetTools: ['scenarioplanning'],
    options: [
      {
        id: 'opt-1',
        label: 'Proceed with building all eight campuses immediately to beat regional educational competitors to market',
        toolUsed: 'Unchecked Capital Overhang',
        explanation: 'Disastrous over-capacity if AI automates entry-level jobs; leaves the organization saddled with empty brick-and-mortar facilities and unserviceable debt.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Cross two critical uncertainties (Pace of AI Automation × Skilling Funding Level) into a 2×2 scenario matrix, wind-tunnel the plan, fund robust moves, and stage campus openings in signpost-triggered waves',
        toolUsed: 'Scenario Planning & Wind-Tunnelling',
        explanation: 'Exemplary strategic leadership! Opens only 3 campuses initially, conserving ₹3.5 Crore; embeds AI tool fluency across all courses and establishes an early-warning hiring signpost dashboard.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Build best-case, worst-case, and base-case financial spreadsheets and pick the middle base-case forecast',
        toolUsed: 'Disguised Single Forecast',
        explanation: 'Fails to explore distinct future structural dynamics; disguises deep qualitative disruption behind arbitrary percentage adjustments.',
        isOptimal: false,
        rubricPoints: 10
      }
    ],
    modelAnswer: 'Establish a 2×2 scenario matrix crossing the two independent critical uncertainties: Pace of AI automation (Slow vs. Fast) and Skilling funding level (Low vs. High). Generate four vivid worlds: Skilling Boom, AI Upskill Rush, Steady Squeeze, and Disrupted Demand. Wind-tunnel the 8-campus plan to expose its fatal vulnerability in Disrupted Demand. Identify robust no-regret moves: embed AI copilot tools across all courses, partner directly with employers, and adopt hybrid delivery. Commit to a 2-wave rollout (3 centres now, 5 triggered by signposts), saving ₹3.5 Crore upfront.',
    actionChecklist: [
      'Formulate time-bounded strategic focal question (2026–2032)',
      'Isolate predetermined demographic trends from critical uncertainties',
      'Construct 2×2 scenario matrix using two orthogonal critical axes',
      'Wind-tunnel strategic initiatives into robust, contingent, and risky buckets',
      'Establish quarterly signpost monitoring dashboard with trigger actions'
    ],
    reflectionKey: 'Never assign probabilities to scenarios; identify no-regret robust moves that work in all worlds and set signpost triggers for contingent options.'
  },
  {
    id: 'mission-pa-5',
    title: 'The 18% Repeat-Service Field Failure Hemorrhage',
    role: 'General Manager of Operations',
    companyContext: 'Thirumalai Appliance Care: 180 technicians across 22 service centres in Tamil Nadu.',
    crisisPrompt: 'Repeat service visits (second technician visit within 30 days for the same complaint) have surged to 18%, draining service profitability and threatening authorized OEM contract renewal. The operations team wants to retrain all 180 technicians on customer communication and revise job-card paperwork. How do you systematically diagnose and solve the issue?',
    targetTools: ['pareto'],
    options: [
      {
        id: 'opt-1',
        label: 'Mandate a mandatory 2-week customer service and etiquette training program for all 180 technicians across all 22 centres',
        toolUsed: 'Untargeted Training',
        explanation: 'Costs significant downtime and money while addressing only peripheral symptoms; repeat visits remain at 17% because technical part availability was the root issue.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-2',
        label: 'Export 6 months of service tickets, build a Frequency and Weighted Cost Pareto chart, drill down into the #1 category, and supply standardized trunk kits of the 20 critical missing parts',
        toolUsed: 'Weighted Pareto & Nested Drill-Down',
        explanation: 'Superb quality engineering! Discovers that spare part unavailability and diagnostic errors account for 74% of repeat visits; trunk stock of the top 20 parts cuts repeats from 18% to 9% in 5 months.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-3',
        label: 'Penalize technicians financially for every repeat visit logged in their territory',
        toolUsed: 'Punitive Distortion',
        explanation: 'Demoralizes field staff, triggers technician resignations, and incentivizes technicians to falsify customer sign-off sheets.',
        isOptimal: false,
        rubricPoints: 4
      }
    ],
    modelAnswer: 'Export six months of job cards (31,000 jobs, 5,600 repeats) and recode free-text remarks into standardized categories. Construct a first-level Pareto chart and companion Weighted Pareto by cost. The analysis will reveal that three causes account for 74% of repeat visits: spare part unavailable (38%), incorrect diagnosis (22%), and incomplete installation checks (14%). Execute a secondary drill-down Pareto on parts shortages: just 20 part numbers cause 78% of delays. Stock technician vans with these 20 parts and mandate a 5-point diagnosis checklist to slash repeats from 18% to 9%.',
    actionChecklist: [
      'Recode raw ticket text into mutually exclusive defect categories',
      'Plot descending bars and compute cumulative percentage line',
      'Build companion Weighted Pareto by monetary rework cost',
      'Execute secondary drill-down Pareto on the #1 vital category',
      'Deploy targeted countermeasures and re-measure at 90 days'
    ],
    reflectionKey: 'Pareto shows where problems concentrate, not why they happen; drill down into the vital few and follow with root-cause analysis.'
  }
];

export const CATEGORY_8_GLOSSARY: GlossaryItem[] = [
  { term: 'Risk Matrix (Heat Map)', definition: 'A visual scoring grid that plots identified risks according to their estimated likelihood and consequence severity, categorizing them into low, medium, high, and critical action bands.', tool: 'Risk Matrix' },
  { term: 'Inherent Risk', definition: 'The raw level of risk exposure that exists in an organization or operational process before considering or applying any mitigating internal controls.', tool: 'Risk Matrix' },
  { term: 'Residual Risk', definition: 'The net remaining level of risk exposure after existing internal controls, audits, and treatment procedures are credited.', tool: 'Risk Matrix' },
  { term: 'Risk Appetite', definition: 'The aggregate amount and type of risk that an organization’s board and executive leadership are consciously willing to accept in pursuit of strategic value.', tool: 'Risk Matrix' },
  { term: 'Key Risk Indicator (KRI)', definition: 'A leading operational metric that provides an early warning signal that a specific risk exposure is increasing or approaching a predefined tolerance threshold.', tool: 'Risk Matrix' },
  { term: 'Risk Treatment', definition: 'The formal management decision on how to respond to an identified risk: Avoid (eliminate), Reduce (mitigate), Transfer (insure/contract), or Accept (retain).', tool: 'Risk Matrix' },
  { term: 'Risk Register', definition: 'A centralized operational document recording identified risks, cause-event-consequence statements, ratings, owners, controls, treatment plans, and review dates.', tool: 'Risk Matrix' },
  { term: 'Rank Reversal (Cox Critique)', definition: 'A known mathematical anomaly where multiplying ordinal likelihood and impact ratings can cause an objectively smaller risk to receive a higher score than a catastrophic one.', tool: 'Risk Matrix' },
  { term: 'Decision Node (□)', definition: 'A point in a decision tree diagram where the decision-maker has direct control to select one path from among competing strategic alternatives.', tool: 'Decision Tree' },
  { term: 'Chance Node (○)', definition: 'A point in a decision tree where an uncertain external event resolves according to state-of-nature probabilities that sum to 1.0.', tool: 'Decision Tree' },
  { term: 'Expected Monetary Value (EMV)', definition: 'The probability-weighted average of all possible financial payoffs emerging from an uncertain chance node: EMV = Σ (Probability_i × Payoff_i).', tool: 'Decision Tree' },
  { term: 'Backward Induction (Roll-Back)', definition: 'The mathematical algorithm used to solve a decision tree by calculating expected values from the terminal payoffs backward to the initial root choice.', tool: 'Decision Tree' },
  { term: 'Expected Value of Perfect Information (EVPI)', definition: 'The economic value difference between having complete perfect foresight before deciding and making the decision under uncertainty; sets the upper price ceiling for research or pilots.', tool: 'Decision Tree' },
  { term: 'Break-Even Probability', definition: 'The exact probability threshold at which two competing options in a decision tree yield identical expected monetary values.', tool: 'Decision Tree' },
  { term: 'Monte Carlo Simulation', definition: 'A computerized mathematical technique that quantifies risk by recalculating an operational model thousands of times using randomly sampled values from probability distributions.', tool: 'Monte Carlo' },
  { term: 'The Flaw of Averages', definition: 'The mathematical reality that plans, schedules, and budgets built on average or "most likely" assumptions are systematically wrong and biased toward optimism.', tool: 'Monte Carlo' },
  { term: 'P80 Confidence Level', definition: 'The simulated value at which 80% of Monte Carlo iterations fall at or below; the executive benchmark for defensible project scheduling and budget contingency commitments.', tool: 'Monte Carlo' },
  { term: 'Tornado Sensitivity Chart', definition: 'A specialized horizontal bar chart produced by Monte Carlo software that ranks uncertain inputs by the width of their influence on the output metric.', tool: 'Monte Carlo' },
  { term: 'Triangular Distribution', definition: 'A continuous probability distribution defined by three intuitive expert estimates: minimum (a), most likely / mode (c), and maximum (b).', tool: 'Monte Carlo' },
  { term: 'Cumulative S-Curve', definition: 'An ogive chart plotting cumulative probability from 0% to 100% against project cost or completion date, visually displaying the likelihood of clearing budget thresholds.', tool: 'Monte Carlo' },
  { term: 'Stochastic Model', definition: 'A simulation model whose inputs are specified as probability distributions rather than static single numbers, producing probabilistic outcome distributions.', tool: 'Monte Carlo' },
  { term: 'PERT Distribution', definition: 'A smooth probability distribution version of the triangular model that applies a four-fold weight to the mode (most likely), reducing the influence of extreme bounds.', tool: 'Monte Carlo' },
  { term: 'Input Correlation', definition: 'The statistical co-movement between two uncertain simulation variables (e.g., rising oil prices and rising air freight costs) that must be modeled to avoid underestimating risk.', tool: 'Monte Carlo' },
  { term: 'Scenario Planning', definition: 'A structured discipline for developing multiple plausible, internally consistent long-range future narratives to challenge official forecasts and build resilient strategies.', tool: 'Scenario Planning' },
  { term: 'Focal Question', definition: 'The overarching, time-bounded strategic dilemma or capital commitment that anchors a scenario planning exercise.', tool: 'Scenario Planning' },
  { term: 'Critical Uncertainty', definition: 'An external driving force that combines extraordinarily high strategic impact with genuine, deep unpredictability; selected as an axis for a 2×2 scenario matrix.', tool: 'Scenario Planning' },
  { term: 'Predetermined Element', definition: 'A high-impact external trend (such as regional demographic aging) whose future trajectory is virtually certain; incorporated into all scenario narratives.', tool: 'Scenario Planning' },
  { term: '2×2 Scenario Matrix', definition: 'A four-quadrant strategic canvas created by intersecting two orthogonal critical uncertainties at their extreme poles.', tool: 'Scenario Planning' },
  { term: 'Strategic Wind-Tunnelling', definition: 'The systematic testing of proposed corporate initiatives and investments across all four scenario worlds to identify robust moves, contingent options, and fatal vulnerabilities.', tool: 'Scenario Planning' },
  { term: 'Robust (No-Regret) Move', definition: 'A strategic action or capability investment that creates substantial organizational value across every plausible future scenario.', tool: 'Scenario Planning' },
  { term: 'Contingent Option', definition: 'A staged strategic initiative that is prepared in advance but executed only when an external signpost crosses a predefined threshold.', tool: 'Scenario Planning' },
  { term: 'Signposts & Triggers', definition: 'Observable leading metrics and predefined trigger thresholds that signal which specific future scenario is crystallizing, activating pre-planned contingent responses.', tool: 'Scenario Planning' },
  { term: 'Pareto Analysis (80/20 Rule)', definition: 'A decision and quality prioritization method based on Juran’s principle that roughly 80% of defects, costs, or complaints originate from roughly 20% of root causes.', tool: 'Pareto Analysis' },
  { term: 'Vital Few vs. Trivial Many', definition: 'Joseph Juran’s concept distinguishing the critical 20% of causes that warrant aggressive executive intervention from the remaining 80% of low-impact noise.', tool: 'Pareto Analysis' },
  { term: 'Weighted Pareto', definition: 'A Pareto chart where categories are sorted by total financial rework cost, safety severity, or downtime hours rather than simple occurrence frequency.', tool: 'Pareto Analysis' },
  { term: 'Nested (Drill-Down) Pareto', definition: 'A secondary Pareto chart constructed on the single largest defect category of a primary chart to isolate granular underlying failure modes.', tool: 'Pareto Analysis' },
  { term: 'ABC Inventory Classification', definition: 'A practical application of the Pareto principle that categorizes inventory into Class A (70-80% of value, tight control), Class B (15-20%), and Class C (5-10%, bulk reorder).', tool: 'Pareto Analysis' },
  { term: 'Cumulative Percentage Line', definition: 'The secondary ogive line on a Pareto chart representing the progressive running total percentage of defects or costs accounted for by sorted categories.', tool: 'Pareto Analysis' }
];
