import { ToolDefinition, StrategyStack, ScenarioMission, GlossaryItem } from './toolsData.ts';

export const HR_TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'mckinsey7s',
    name: 'McKinsey 7S Framework',
    shortName: 'McKinsey 7S',
    category: 'HR & Organizational',
    tagline: 'Diagnose whether seven interdependent internal elements are mutually reinforcing during strategic change',
    origin: 'Developed in the late 1970s by McKinsey & Company consultants Tom Peters and Robert Waterman, working with Richard Pascale and Anthony Athos; published in "Structure Is Not Organization" (1980) and In Search of Excellence (1982).',
    corePurpose: 'Stop leaders from treating organization design merely as boxes on an org chart, demonstrating that "soft" elements (Shared Values, Style, Staff, Skills) matter as much as "hard" elements (Strategy, Structure, Systems).',
    primaryUsers: ['CEOs & Founders', 'Chief Human Resources Officers (CHRO)', 'Organization Development Leaders', 'Management Consultants', 'Merger Integration Leads'],
    difficulty: 'Intermediate',
    horizon: 'Strategic Transformations, Restructuring, Mergers & Annual Diagnostics',
    scope: 'Whole Enterprise, Business Unit, Newly Merged Entity, or Department',
    timeToResult: '1–2 weeks for initial diagnosis and validation workshop',
    dataNeeds: 'Leadership interviews, org charts, incentive and operating policies, culture observations, and documented strategy statements',
    keyOutput: '7×7 pairwise alignment matrix, identified misalignments, to-be design, and sequenced change execution roadmap',
    bestPairedWith: 'SWOT Analysis (strategic direction), RACI Matrix (re-architecting structure), Competency Mapping (defining skills), Employee Engagement Surveys (measuring style & values)',
    keyFeatures: [
      'Seven interdependent elements: 3 "Hard" (Strategy, Structure, Systems) and 4 "Soft" (Shared Values, Style, Staff, Skills)',
      'Shared Values placed at the organic center, directly connecting and anchoring all other six dimensions',
      '21-point pairwise alignment grid diagnosing where current policies contradict the stated business strategy',
      'As-Is diagnostic vs To-Be blueprinting to identify exact organizational friction points',
      'Surfaces hidden leadership habits (Style) and legacy procedures (Systems) that quietly sabotage structural reorganizations'
    ],
    howItWorks: 'Gather evidence across all seven elements through leadership interviews, frontline conversations, and document reviews. Describe the observable As-Is reality for each element. Perform a pairwise audit (checking each pair of elements for alignment, e.g. whether the bonus system supports the collaborative style required by the strategy). Identify the 3–5 critical misalignments that block business performance. Design the To-Be state starting with Shared Values and Strategy, then align Systems and Style before executing structural reorganization.',
    coreConcepts: [
      {
        term: 'Hard Elements',
        definition: 'Strategy (plan for competitive advantage), Structure (reporting lines and divisions), and Systems (formal procedures, budgets, IT, and metrics).'
      },
      {
        term: 'Soft Elements',
        definition: 'Shared Values (core beliefs at center), Style (observed leadership behavior and culture), Staff (people, roles, and demographics), and Skills (distinctive organizational capabilities).'
      },
      {
        term: 'Pairwise Alignment',
        definition: 'The systematic evaluation of how each of the 7 elements supports or conflicts with each of the other 6 elements (21 pairwise interactions).'
      },
      {
        term: 'As-Is vs To-Be State',
        definition: 'Contrasting current operational behavior against the required future configuration needed to achieve the strategic objective.'
      },
      {
        term: 'Shared Values (Superordinate Goals)',
        definition: 'The fundamental guiding principles and shared purpose that unite the organization, positioned at the core of the framework.'
      }
    ],
    strengths: [
      'Forces executive attention toward culture, leadership style, and incentives rather than just reshuffling org chart boxes',
      'Universally recognized vocabulary that executive boards and department heads immediately grasp',
      'Pinpoints exactly why well-intentioned strategic plans stall out during execution'
    ],
    limitations: [
      'Descriptive rather than prescriptive: highlights where misalignment exists but does not provide an automated recipe to fix it',
      'Internal focus: does not model external competitors, customers, or macro market shifts (requires SWOT/PESTLE pairing)',
      'Soft elements can be subjective and difficult to quantify without structured employee listening data'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Corporate Strategy, Balanced Scorecard, and SWOT analysis',
      downstream: 'Feeds RACI role matrices (Structure), Competency Frameworks (Skills/Staff), and Engagement Surveys (Style/Values)'
    },
    useCases: [
      {
        title: 'Founder to Professional Management Transition',
        situation: '60-person training firm appoints professional COO and department heads.',
        problem: 'All operational decisions still route to the founder; new department heads feel disempowered and ineffective.',
        action: 'Applied 7S: diagnosed that Structure changed on paper, but Systems (all approvals needed founder signoff) and Style (founder micromanaging) had not.',
        outcome: 'Established a formal Delegation of Authority matrix; freed 15 hours/week of founder time for long-range partnerships.'
      },
      {
        title: 'Cross-City IT Services Merger Integration',
        situation: 'Chennai technology services firm acquires a 70-person engineering boutique in Coimbatore.',
        problem: 'Integration focused exclusively on payroll and office leases; key senior architects began resigning.',
        action: 'Conducted side-by-side 7S profiles: discovered diametrically opposed Shared Values (client intimacy vs process compliance) and Style (consultative vs directive).',
        outcome: 'Formed a joint values steering council and blended leadership team before making further structural shifts, cutting turnover by half.'
      },
      {
        title: 'Retail Chain Scaling from 5 to 25 Outlets',
        situation: 'Regional consumer retail brand rapidly opening 20 new locations across South India.',
        problem: 'Customer experience and store profitability fluctuated wildly between branches.',
        action: '7S diagnostic exposed that Systems (no standardized store SOPs) and Skills (no store-manager training) had not scaled with the aggressive expansion Strategy.',
        outcome: 'Created standardized operating manuals, regional cluster managers (Structure), and a 4-week store manager academy.'
      }
    ],
    caseStudy: {
      company: 'Pandian Skill Academy (Madurai, Tamil Nadu)',
      revenue: '₹22 Crore ($2.7M)',
      staff: '140 Employees across 6 Branches',
      profile: 'Vocational skilling and IT training provider delivering both retail commercial student diplomas and government-sponsored employability courses.',
      challenge: 'The board mandated a strategic pivot to a blended learning model (classroom + online), targeting 40% online enrolments within 24 months. After 18 months, online revenue was stalled at just 9%. Branch managers and the central digital tech team engaged in mutual finger-pointing.',
      whyChosen: 'The learning platform functioned flawlessly, indicating that the failure was organizational and systemic across incentives, culture, and capabilities rather than technical.',
      steps: [
        'Facilitated 36 cross-level interviews across board members, all 6 branch managers, course counsellors, and trainers.',
        'Audited documents: branch P&L reporting formats, commission policies, trainer job descriptions, and monthly review agendas.',
        'Mapped the As-Is state across all seven dimensions and completed a pairwise alignment grid in a leadership workshop.',
        'Identified root misalignments: Systems vs Strategy (branch P&L credited online fees to central digital HQ, penalizing branch revenue); Style vs Strategy (leaders celebrated classroom seat-fill rates in every review); Skills vs Strategy (only 15% of faculty had online teaching pedagogy certification); Shared Values ("Real learning happens only in physical classrooms").',
        'Redesigned the To-Be state: credited online enrolments to the recruiting branch (Systems); retooled monthly reviews around blended metrics (Style); rolled out a 6-week online certification (Skills); and co-crafted a "Learn Anywhere" values charter with staff.'
      ],
      results: [
        'Online share of total company revenue surged from 9% to 27% within 12 months.',
        '88% of faculty achieved certified online-delivery credentials.',
        'Branch-initiated online enrolments expanded from 12% to 61% of all digital registrations.',
        'Inter-departmental conflict between physical branches and central tech fell from 54% to 21% on internal surveys.'
      ],
      lessonsLearned: [
        'A single misaligned incentive system will quietly undermine the most visionary corporate strategy.',
        'Observed leadership behavior in routine operational meetings communicates real priorities far louder than executive memos.',
        'Aligning soft elements (Values and Skills) requires proof of efficacy before employees genuinely abandon legacy habits.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Explicit, documented corporate strategy or transformation objective to test against',
        'Executive sponsor willing to receive unvarnished feedback regarding leadership style and culture',
        'Cross-functional diagnostic sample covering executives, middle management, and frontline staff'
      ],
      steps: [
        'Define diagnostic scope (whole enterprise, specific subsidiary, or business division).',
        'Collect hard evidence: strategic plans, org charts, incentive structures, KPIs, and operating manuals.',
        'Conduct confidential interviews using targeted questions for all 7 dimensions.',
        'Draft a 1-page As-Is summary profile with observable behavioral evidence for each element.',
        'Complete the 7×7 pairwise alignment matrix, marking pairs as Aligned, Partly Aligned, or Misaligned.',
        'Facilitate a leadership alignment workshop to validate findings and agree on top 3–5 strategic blockers.',
        'Blueprint the To-Be state: sequence changes starting with Shared Values and Strategy, then Systems and Style before Structure.',
        'Establish a quarterly review rhythm to prevent drift back into legacy operational habits.'
      ],
      checklist: [
        'Diagnostic scope and reference strategy clearly defined in writing',
        'Interview sample represents at least 15–20% of the target workforce across all tiers',
        'As-Is descriptions cite observed behavior and hard documentation, not aspirational slogans',
        'All 21 pairwise interactions evaluated in alignment grid',
        'Top 3–5 misalignments prioritized with named owners, budgets, and target quarters',
        'Follow-up pulse check scheduled for 6 months post-transformation'
      ],
      commonMistakes: [
        {
          mistake: 'Reorganizing the org chart (Structure) first because it is the easiest and most visible change',
          fix: 'Align Systems, Style, and Skills first; otherwise, people in the new structure will simply replicate old behaviors.'
        },
        {
          mistake: 'Interviewing only senior executives and neglecting frontline employees',
          fix: 'Frontline staff feel the actual reality of Systems and Style; always include them in the diagnostic sample.'
        },
        {
          mistake: 'Treating all misalignments with equal urgency and overwhelming the organization',
          fix: 'Focus execution capital strictly on the 3 misalignments that directly bottleneck the primary strategy.'
        }
      ],
      plan306090: {
        d30: 'Scope diagnostic, collect documents, conduct 20 cross-level interviews, and synthesize As-Is profiles.',
        d60: 'Facilitate leadership validation workshop, score pairwise matrix, and publish sequenced To-Be change plan.',
        d90: 'Deploy first system/incentive modifications, launch leadership style coaching, and conduct staff pulse check.'
      },
      proTips: [
        'Ask: "What gets someone rewarded and what gets someone penalized here?" It reveals Systems, Style, and Values in one answer.',
        'Audit executive calendars: where leaders spend their actual hours is the truest empirical measure of organizational Style.',
        'Before executing a merger, run separate 7S assessments on both companies to preempt culture-clash points.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Galbraith Star Model',
        reason: 'When the primary focus is pure organizational structure and reward design rather than cultural alignment.'
      },
      {
        alternative: 'Burke-Litwin Model',
        reason: 'When external transactional vs transformational drivers must be statistically linked to performance in massive enterprise changes.'
      },
      {
        alternative: 'SWOT / Five Forces',
        reason: 'When the core business problem is an external market shock or competitor pricing threat rather than internal execution friction.'
      }
    ],
    reflectionPrompts: [
      'Which of your organization’s 7 elements has remained stagnant the longest, and is it secretly capping your growth?',
      'Does your company’s formal compensation system reward the exact behaviors requested by your latest strategy?',
      'If an outside observer shadowed your executive team for a week, what would they conclude your "real" values are?'
    ],
    quickReferenceCard: [
      'Hard 3: Strategy (Plan), Structure (Org), Systems (Processes/Incentives)',
      'Soft 4: Shared Values (Core), Style (Leadership Culture), Staff (Talent), Skills (Capabilities)',
      'Rule of Sequence: Align Values & Strategy first -> Systems & Style -> Structure last',
      'Diagnostic Core: 21 pairwise checks to expose hidden points of internal friction',
      'Best for: Post-merger integration, stalled reorganizations, and digital business model transitions'
    ],
    quiz: [
      {
        id: '7s-q1',
        question: 'Which three elements are designated as the "Hard" elements in the McKinsey 7S Framework?',
        options: ['Staff, Skills, and Style', 'Strategy, Structure, and Systems', 'Shared Values, Strategy, and Skills', 'Structure, Staff, and Systems'],
        correctAnswer: 1,
        explanation: 'Strategy, Structure, and Systems are the three hard elements, which are tangible, easily identified, and traditionally documented.'
      },
      {
        id: '7s-q2',
        question: 'Which element sits at the interconnected center of the McKinsey 7S model?',
        options: ['Strategy', 'Style', 'Shared Values', 'Structure'],
        correctAnswer: 2,
        explanation: 'Shared Values (originally termed superordinate goals) sits at the center, connecting to and influencing all other six elements.'
      },
      {
        id: '7s-q3',
        question: 'A company\'s executive team preaches cross-functional collaboration, but bonuses are paid 100% on individual sales quotas. This is a misalignment between:',
        options: ['Shared Values and Systems', 'Staff and Skills', 'Structure and Strategy', 'Style and Staff'],
        correctAnswer: 0,
        explanation: 'The espoused shared value (collaboration) directly contradicts the operational reward system (individual commission payouts).'
      },
      {
        id: '7s-q4',
        question: 'In the 7S Framework, what does "Style" specifically refer to?',
        options: ['The corporate brand and marketing design guidelines', 'The formal written code of business conduct', 'How organizational leaders actually behave and the cultural norms that result', 'The office dress code policy'],
        correctAnswer: 2,
        explanation: 'Style represents the patterns of actual behavior exhibited by leaders and the resulting organizational culture, rather than written rhetoric.'
      },
      {
        id: '7s-q5',
        question: 'What is the primary acknowledged limitation of the McKinsey 7S Framework?',
        options: ['It analyzes only hard operational elements', 'It is purely internal and descriptive, ignoring external market forces and not prescribing solutions', 'It requires complex proprietary software to calculate', 'It functions only for Fortune 500 corporations'],
        correctAnswer: 1,
        explanation: '7S is an internal diagnostic that highlights where internal misalignment exists, but does not analyze competitors or provide prescriptive fixes.'
      }
    ]
  },
  {
    id: 'raci',
    name: 'RACI Matrix & Responsibility Assignment',
    shortName: 'RACI Matrix',
    category: 'HR & Organizational',
    tagline: 'Assign who is Responsible, Accountable, Consulted, and Informed for each task, process, or decision',
    origin: 'Evolved in project management and organizational practice during the 1950s; formalized in modern project management bodies of knowledge including PMI’s PMBOK Guide.',
    corePurpose: 'Eliminate role ambiguity, duplicate approvals, and handoff failures by enforcing the golden governance rule: exactly one Accountable individual per task or decision.',
    primaryUsers: ['Project & Program Managers', 'HR Business Partners', 'Operations Directors', 'Process Improvement Specialists', 'Department Heads'],
    difficulty: 'Beginner',
    horizon: 'Immediate Implementation across Projects, Recurring SOPs, and Governance Cycles',
    scope: 'Cross-Functional Processes, Multi-Department Projects, or Entire Operating Units',
    timeToResult: '1–3 days for workshop draft and alignment',
    dataNeeds: 'Process work-breakdown steps, list of organizational role titles (not individual names), and decision boundaries',
    keyOutput: 'Activity-by-role responsibility matrix, workload distribution analysis, and embedded task ownership protocols',
    bestPairedWith: 'McKinsey 7S (Structure dimension), Swimlane Process Maps, Standard Operating Procedures (SOPs), Job Descriptions',
    keyFeatures: [
      'Four distinct participation definitions: Responsible (R), Accountable (A), Consulted (C), Informed (I)',
      'The "Single Accountable" Golden Rule preventing diffusion of responsibility',
      'Row-wise checks ensuring every deliverable has clear execution and single ownership',
      'Column-wise checks detecting overloaded bottleneck roles (too many As) and disengaged roles',
      'Practical variations: RASCI (adding Support), DACI (Driver, Approver, Contributors, Informed), and RAPID'
    ],
    howItWorks: 'List all key activities, deliverables, or decisions in sequential rows down the left column. List all organizational roles (using job titles, never personal names) across the top header. For each activity row, assign exactly one "A" (the single person who answers for the final outcome). Assign at least one "R" (the role doing the work; R and A can be the same person on lean tasks). Assign "C" strictly to subject-matter experts whose two-way input changes the deliverable. Assign "I" to stakeholders needing one-way status notifications. Audit the matrix across rows and down columns to resolve bottlenecks and missing owners.',
    coreConcepts: [
      {
        term: 'Responsible (R)',
        definition: 'The doer(s) who complete the task or deliverable. Can be multiple people, but too many indicates unclear task scoping.'
      },
      {
        term: 'Accountable (A)',
        definition: 'The single individual with veto and sign-off authority who answers for the final quality and business outcome. Exactly one A per row.'
      },
      {
        term: 'Consulted (C)',
        definition: 'Subject matter experts whose two-way advice and input is sought before the work is completed. Too many Cs cause decision paralysis.'
      },
      {
        term: 'Informed (I)',
        definition: 'Stakeholders kept updated on progress or outcomes through one-way communication after milestones or decisions are reached.'
      },
      {
        term: 'RASCI Variant (Support)',
        definition: 'An extension adding "Support" (S) for roles providing dedicated tools, logistics, or assistance to the Responsible role without owning execution.'
      }
    ],
    strengths: [
      'Simple, intuitive framework that any team member can learn in fifteen minutes',
      'Dramatically reduces missed handoffs, duplicated work, and "I thought someone else was doing it" excuses',
      'Surfaces hidden administrative bottlenecks and executive micro-management visually'
    ],
    limitations: [
      'Does not depict task sequence, critical paths, or durations (is not a substitute for a Gantt/CPM schedule)',
      'Can become bloated and bureaucratic if applied to trivial, micro-level daily tasks',
      'Can be politically manipulated if leaders evade accountability (avoiding A) or hoard signoffs'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Work Breakdown Structures (WBS), process maps, and org design reviews',
      downstream: 'Feeds Job Descriptions, Standard Operating Procedures (SOPs), ticketing systems, and appraisal KRAs'
    },
    useCases: [
      {
        title: 'BPO Customer Escalation Management',
        situation: '200-person call center experiencing recurring client escalations with team leads and QA analysts blaming each other.',
        problem: 'Client tickets went unresolved for days while managers debated who had authority to issue refunds.',
        action: 'Built a 6-step escalation RACI: assigned Client Relationship Manager as A for resolution, Team Lead as R for root cause, QA as C, and Operations Head as I.',
        outcome: 'Escalation turnaround time plummeted from 48 hours to 4 hours; customer churn reduced by 35%.'
      },
      {
        title: 'College Campus Placement Season',
        situation: 'Higher education institution coordinating placement drives across academic departments and recruiters.',
        problem: 'Corporate recruiters received conflicting student eligibility lists and uncoordinated interview dates.',
        action: 'Mapped placement process: Placement Officer designated as sole A, Department Heads as R for student records, Training Lead as C, Principal as I.',
        outcome: 'Single unified channel for companies; recruiter onboarding time cut by 60%.'
      },
      {
        title: 'Software Release Governance',
        situation: '40-person SaaS product firm experiencing production outages after Friday deployments.',
        problem: 'Customer support and marketing were blind to new feature releases, causing customer confusion.',
        action: 'Constructed deployment RACI: Engineering Lead as A, DevOps as R, QA as C, and Customer Support as mandatory I.',
        outcome: 'Zero unannounced releases; support tickets resolved on first contact jumped by 40%.'
      }
    ],
    caseStudy: {
      company: 'Vaigai Digital Services (Madurai, Tamil Nadu)',
      revenue: '₹6 Crore ($720k)',
      staff: '55 Employees',
      profile: 'Full-service digital marketing and web application development agency serving over 120 SME corporate clients.',
      challenge: 'Client complaints about missed project deadlines and contradictory advice doubled within 12 months. In one critical incident, an e-commerce website was deployed live without client signoff, while two different agency leads sent conflicting SEO proposals to the same account. The founder spent 20+ hours a week fighting operational fires.',
      whyChosen: 'A previous organizational diagnostic pinpointed blurred boundaries between client-facing account managers and technical delivery leads. RACI provided a fast, low-friction tool to codify decision rights without purchasing costly software.',
      steps: [
        'Mapped the complete 28-activity client delivery cycle from onboarding, design, staging, and QA to invoicing and renewal.',
        'Identified 8 key roles: Founder, Account Manager, Strategist, Content Lead, Design Lead, Dev Lead, QA Lead, and Client.',
        'Had each role holder independently fill in the matrix based on their personal assumption of responsibilities.',
        'Compared drafts: surfaced 11 activities with multiple competing As, and 4 critical tasks with zero assigned owners.',
        'Held a 3-hour alignment session to enforce the "Exactly One A" rule: Account Manager became sole A for client communications; technical leads became R for deliverables and C on scope; Founder relinquished 11 As, keeping only 3 (pricing, contracts, high-tier escalations).',
        'Hardcoded the RACI matrix into the agency’s project management software and incorporated it into new-client onboarding binders.'
      ],
      results: [
        'Conflicting client instructions dropped from 9 instances per month to 1.',
        'Milestone on-time project completion jumped from 64% to 87%.',
        'Founder escalation firefighting fell from 20 hours/week to under 5 hours/week.',
        'Two senior account managers were promoted based on clear, demonstrable ownership of client retention.'
      ],
      lessonsLearned: [
        'Having leaders fill out the matrix independently is the most powerful diagnostic; divergence between sheets exposes operational chaos.',
        'Moving the founder out of the A column requires coaching founders to accept decisions they might have executed slightly differently.',
        'A RACI filed away in a PDF dies within months; it must be embedded directly into ticketing workflows and task boards.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Documented process flow, project work breakdown, or list of recurring organizational decisions',
        'Executive sponsor with organizational authority to resolve boundary disputes',
        'Role-based structure using job titles rather than individual personal names'
      ],
      steps: [
        'Define process scope: select a single high-friction workflow (10–30 activity rows is ideal).',
        'List 5–10 participating organizational roles across the top columns.',
        'Instruct key stakeholders to fill in draft RACI codes independently.',
        'Compare versions and flag conflicts: multiple As, missing As, or empty role columns.',
        'Facilitate a consensus workshop to enforce: exactly one A per row, at least one R per row.',
        'Challenge every "C": reduce to the absolute minimum necessary to prevent meeting bloat.',
        'Validate with executive sponsor and publish directly into operating systems and job descriptions.',
        'Audit compliance during quarterly process reviews.'
      ],
      checklist: [
        'Activities formulated with clear action verbs (e.g., "Approve Vendor Invoice", not "Invoicing")',
        'Columns represent roles/titles, not individual employee names',
        'Every single row has exactly one Accountable (A) owner',
        'Every single row has at least one Responsible (R) worker',
        'No single role is overloaded with more than 50% of the As',
        'RACI published where daily work occurs (project management tools, SOP repository)'
      ],
      commonMistakes: [
        {
          mistake: 'Assigning multiple As to a single row to avoid offending senior managers',
          fix: 'Enforce the single-A rule: if two people own a decision, nobody does. Split the task if multiple genuine signoffs exist.'
        },
        {
          mistake: 'Marking the entire executive team as "Consulted" (C) on operational tasks',
          fix: 'Change non-essential stakeholders to "Informed" (I); two-way consultation slows projects to a crawl.'
        },
        {
          mistake: 'Using employee names instead of organizational roles',
          fix: 'Use functional role titles so the matrix survives personnel departures, promotions, and turnover.'
        }
      ],
      plan306090: {
        d30: 'Build and ratify RACI matrix for the highest-friction company process; publish in project management tools.',
        d60: 'Audit first 50 project handoffs against RACI; link role accountabilities directly to appraisal KRAs.',
        d90: 'Expand RACI assignment across all recurring business operations and update company onboarding modules.'
      },
      proTips: [
        'Validation litmus test: "If this task fails completely, whose desk does the CEO stand beside?" That person is the A.',
        'Push accountability downward: the Accountable owner should be the most junior person competent to own the outcome.',
        'Couple every A with explicit financial decision limits (e.g., "Approves supplier spend up to ₹1,00,000").'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'RAPID Framework (Bain & Company)',
        reason: 'When the primary organizational bottleneck is contested strategic decision-making rather than execution task ownership.'
      },
      {
        alternative: 'Swimlane Process Diagram',
        reason: 'When visualizing the chronological sequence, time delays, and physical handoffs matters more than role labels.'
      },
      {
        alternative: 'Informal Agile Standups',
        reason: 'Within small, tightly-knit squads of 3–5 people where mutual task clarity is already high and paperwork adds friction.'
      }
    ],
    reflectionPrompts: [
      'Which recurring deliverable in your department regularly slips through the cracks because everyone assumed someone else owned it?',
      'In which meetings are you currently marked as "Consulted" where your presence adds zero value and an "Informed" email would suffice?',
      'Which decision in your firm currently has two executives who both believe they have final veto power?'
    ],
    quickReferenceCard: [
      'R (Responsible): The role that executes the task (at least one per row)',
      'A (Accountable): The single owner who signs off and answers for results (EXACTLY ONE per row)',
      'C (Consulted): Two-way communication before/during execution (keep to minimum)',
      'I (Informed): One-way status update after completion',
      'Row Audit: Exactly 1 A, ≥1 R | Column Audit: Check for bottleneck overload'
    ],
    quiz: [
      {
        id: 'raci-q1',
        question: 'According to foundational RACI governance principles, how many roles can be designated as "Accountable" (A) for a single activity?',
        options: ['As many as necessary for cross-department balance', 'At least two to ensure redundancy', 'Exactly one', 'None, provided there is a Responsible role'],
        correctAnswer: 2,
        explanation: 'The golden rule of RACI is that exactly one person must be Accountable per activity. If two people are accountable, nobody is.'
      },
      {
        id: 'raci-q2',
        question: 'In a standard RACI matrix, which letter designates the person or role that actually performs the operational work?',
        options: ['Accountable (A)', 'Consulted (C)', 'Informed (I)', 'Responsible (R)'],
        correctAnswer: 3,
        explanation: 'The Responsible (R) role is the person who does the physical or analytical work to complete the task.'
      },
      {
        id: 'raci-q3',
        question: 'What is the critical procedural distinction between a "Consulted" (C) role and an "Informed" (I) role?',
        options: [
          'Consulted is one-way communication; Informed is two-way communication',
          'Consulted provides two-way input before or during execution; Informed receives one-way updates after completion',
          'Consulted has formal veto power; Informed does not',
          'Informed roles approve financial budgets; Consulted roles do not'
        ],
        correctAnswer: 1,
        explanation: 'Consulted requires active two-way input prior to task completion; Informed involves one-way notification after decisions or actions are taken.'
      },
      {
        id: 'raci-q4',
        question: 'When performing a column analysis on a RACI matrix, what does finding the letter "A" in 12 out of 15 rows for a single manager indicate?',
        options: [
          'A highly effective, well-delegated management structure',
          'A severe managerial bottleneck and failure of organizational delegation',
          'A missing technical role in the department',
          'An excessive number of Consulted stakeholders'
        ],
        correctAnswer: 1,
        explanation: 'A single individual owning almost all Accountabilities creates a severe bottleneck, delays decisions, and indicates poor delegation.'
      },
      {
        id: 'raci-q5',
        question: 'In the RASCI variant of the framework, what does the letter "S" stand for?',
        options: ['Sponsor', 'Signatory', 'Support', 'Supervisor'],
        correctAnswer: 2,
        explanation: 'In RASCI, S stands for Support: individuals who provide assistance, tools, or resources to the Responsible person.'
      }
    ]
  },
  {
    id: 'engagement',
    name: 'Employee Engagement Surveys',
    shortName: 'Engagement Surveys',
    category: 'HR & Organizational',
    tagline: 'Measure emotional commitment, workforce sentiment, and statistical drivers to preempt attrition',
    origin: 'Pioneered conceptually by William Kahn (1990); popularized via Gallup’s Q12 instrument (Buckingham & Coffman, 1999) and the Utrecht Work Engagement Scale (UWES, Schaufeli & Bakker).',
    corePurpose: 'Provide leaders with reliable, anonymous data on employee sentiment and statistical engagement drivers to proactively resolve cultural and supervisory friction before it causes resignations.',
    primaryUsers: ['CHROs & People Leaders', 'People Analytics Specialists', 'CEOs & Executive Teams', 'Frontline Department Heads', 'Culture & Talent Committees'],
    difficulty: 'Intermediate',
    horizon: 'Annual Comprehensive Census + Quarterly or Monthly Pulse Cadences',
    scope: 'Entire Organization, Geographic Business Units, or Functional Teams',
    timeToResult: '4–6 weeks for census survey, driver analysis, and action planning',
    dataNeeds: 'Anonymous survey responses, organizational demographic tags (department, tenure, location), and validated question sets',
    keyOutput: 'Overall engagement index, employee Net Promoter Score (eNPS), driver priority matrix, and unit-level action plans',
    bestPairedWith: 'McKinsey 7S (Style & Shared Values), Performance Appraisal Systems, HRMS Analytics, Pulse Listening Tools',
    keyFeatures: [
      'Standardized Likert 5-point agreement scale assessing emotional commitment and discretionary effort',
      'Composite Engagement Index calculated from core outcome items (pride, advocacy, intent to stay)',
      'Statistical Driver Analysis correlating specific operational factors with overall engagement to identify priorities',
      'Strict anonymity threshold (minimum 5 respondents per reported cohort) to safeguard psychological safety',
      'Employee Net Promoter Score (eNPS = % Promoters minus % Detractors) as an executive loyalty benchmark',
      'Decentralized "You Said, We Did" action planning templates empowering frontline managers'
    ],
    howItWorks: 'Secure executive commitment to transparently publish findings and fund concrete improvements. Deploy a 25–40 item annual census survey combining engagement outcome items (advocacy, pride, retention) and driver items (manager respect, growth path, workload, tools, psychological safety). Enforce strict anonymity thresholds (minimum 5 respondents). Analyze overall favorable percentages and run statistical regression to identify high-impact, low-scoring drivers ("Fix First"). Distribute manager-specific reports with facilitated conversation guides, enabling each department to commit to 1–2 measurable actions tracked via quarterly pulse surveys.',
    coreConcepts: [
      {
        term: 'Work Engagement',
        definition: 'The emotional commitment and discretionary effort an employee invests in their organization; distinct from mere passive satisfaction or happiness.'
      },
      {
        term: 'Engagement Index',
        definition: 'A composite percentage score derived from core outcome questions measuring pride, willingness to recommend, and intent to stay.'
      },
      {
        term: 'Driver Analysis',
        definition: 'Statistical correlation/regression determining which workplace factors most strongly predict variations in employee engagement.'
      },
      {
        term: 'Employee Net Promoter Score (eNPS)',
        definition: 'Single-metric loyalty indicator: % Promoters (scores 9–10) minus % Detractors (scores 0–6) on the willingness to recommend the firm.'
      },
      {
        term: 'Anonymity Threshold (≥5)',
        definition: 'The strict minimum respondent threshold required before demographic reporting is generated, ensuring individual anonymity is never compromised.'
      }
    ],
    strengths: [
      'Gives employees an anonymous, structured, psychologically safe channel to voice organizational realities',
      'Provides vital early warning indicators of impending team attrition long before exit interviews occur',
      'Empirically isolates the few leverageable drivers that actually move workforce performance'
    ],
    limitations: [
      'Generates severe cynicism and damages employee trust if leadership fails to act visibly on survey findings',
      'Survey fatigue can distort results if questionnaires are excessively long or administered too frequently',
      'Can be politically manipulated if managers pressure teams for favorable scores to safeguard bonuses'
    ],
    workflowPlacement: {
      upstream: 'Takes input from HRMS demographic hierarchies, McKinsey 7S culture audits, and onboarding data',
      downstream: 'Feeds Manager Development coaching, retention plans, compensation reviews, and appraisal calibration'
    },
    useCases: [
      {
        title: 'IT Engineering Attrition Mitigation',
        situation: 'Tech services provider experiencing 28% annual turnover among mid-level software developers.',
        problem: 'Exit interviews generically cited "better opportunity" without actionable management insight.',
        action: 'Deployed engagement survey: driver analysis revealed that "Manager Career Conversations in past 6 months" was the #1 predictor of intent to stay, but scored only 41% favorable.',
        outcome: 'Instituted mandatory quarterly career development conversations; engineer cohort turnover dropped to 16% in year two.'
      },
      {
        title: 'Multi-Branch Educational Network Culture Audit',
        situation: 'School group with 8 campus locations experiencing wide disparities in faculty retention.',
        problem: 'Leadership relied on informal anecdotes from branch principals.',
        action: 'Analyzed branch-level cuts: isolated two campuses where "Supervisor Recognition" scored under 30% favorable.',
        outcome: 'Delivered targeted coaching to those two campus heads; teacher turnover stabilized across all branches.'
      },
      {
        title: 'Manufacturing Shift Worker Sentiment Scan',
        situation: 'Factory with 400 shift workers facing low attendance and union grievances.',
        problem: 'Digital online surveys yielded under 15% response rate due to lack of company email access.',
        action: 'Implemented bilingual kiosk and paper surveys across shift cafeterias; achieved 82% response rate.',
        outcome: 'Quickly fixed canteen nutrition and shift bus scheduling issues, creating goodwill for subsequent operational improvements.'
      }
    ],
    caseStudy: {
      company: 'Kalai Health Services (Tamil Nadu)',
      revenue: '₹75 Crore ($9.1M)',
      staff: '520 Employees across 18 Diagnostic Hubs',
      profile: 'Comprehensive pathology, imaging, and diagnostic clinic chain employing phlebotomists, lab technicians, front-desk staff, and radiologists.',
      challenge: 'Annual voluntary turnover among front-office staff and medical laboratory technicians spiked to 35%. Patient wait times increased, sample processing errors escalated, and recruitment costs skyrocketed. Senior leadership assumed that uncompetitive wages were the sole cause and planned a costly across-the-board 12% salary hike.',
      whyChosen: 'Management needed empirical evidence to test the compensation hypothesis before deploying significant balance-sheet capital, and required hub-by-hub operational visibility.',
      steps: [
        'CEO personally championed the initiative, pledging that all results would be shared openly and actioned within 60 days.',
        'Constructed a 32-item survey available in Tamil and English: 5 engagement outcome items, 25 driver questions, 1 eNPS item, and 1 open-ended feedback box.',
        'Deployed the survey via an independent third-party platform enforcing a strict 5-respondent anonymity floor, utilizing shared tablet kiosks at diagnostic labs.',
        'Achieved a 79% completion response rate across the 18 centres; company engagement stood at 54% favorable with an eNPS of −12.',
        'Driver analysis revealed surprising truths: Compensation ranked only 6th in statistical impact. The top three drivers were "My supervisor treats me with respect", "Shift workload is manageable", and "Clear career path for technicians".',
        'Canceled the untargeted 12% across-the-board raise; reallocated funds toward targeted market corrections for underpaid phlebotomists, a 4-tier Technician Career Ladder, and supervisor leadership training for all 40 lab heads.'
      ],
      results: [
        'Overall employee engagement favorable score climbed from 54% to 66% within 12 months.',
        'eNPS rebounded from −12 to +8.',
        'Technician and front-desk turnover dropped from 35% down to 24%, saving ₹48 lakh in recruitment and overtime costs.',
        'Diagnostic error rates decreased by 18% as lab staffing stabilized.'
      ],
      lessonsLearned: [
        'Compensation is often a hygiene factor; emotional respect and day-to-day workload balance frequently drive frontline retention more powerfully than base salary.',
        'An executive pledge to share results transparently is essential for securing high survey participation.',
        'Replacing uniform wage increases with targeted driver investments delivers dramatically higher financial ROI.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Public executive sponsor commitment to transparently disclose findings and resource action plans',
        'Independent survey delivery platform guaranteeing verified respondent anonymity',
        'Up-to-date HRMS demographic mapping (departments, tenure cohorts, locations, reporting hierarchies)'
      ],
      steps: [
        'Define strategic survey objectives (retention drivers, merger integration, culture change).',
        'Select a validated questionnaire (25–35 items) combining outcome metrics and driver categories.',
        'Formulate and circulate a clear data privacy notice guaranteeing anonymity (reporting floor ≥5).',
        'Ensure frictionless survey access for deskless and shift employees (mobile-friendly, local languages, kiosks).',
        'Run the survey across a 10–14 day window, broadcasting daily participation rates by department.',
        'Execute statistical driver regression to identify high-impact, low-scoring operational priorities.',
        'Publish organization-wide results within four weeks of survey close.',
        'Deliver team reports to department managers alongside structured 60-minute discussion guides.',
        'Mandate 1–2 specific team commitments logged centrally by HR, tracked via quarterly pulse surveys.'
      ],
      checklist: [
        'Survey questionnaire contains no double-barreled questions (one idea per item)',
        'Anonymity threshold (minimum 5 respondents) hardcoded into reporting filters',
        'Survey available in primary languages spoken by the workforce',
        'Company-wide results-sharing town hall scheduled prior to launch',
        'Frontline managers trained on facilitating non-defensive team feedback sessions',
        'Quarterly 8–10 item pulse surveys mapped to agreed action items'
      ],
      commonMistakes: [
        {
          mistake: 'Conducting an engagement survey and failing to announce visible follow-up actions',
          fix: 'Surveying without action destroys trust; announce at least one visible "Quick Win" within 30 days.'
        },
        {
          mistake: 'Tying manager annual performance bonuses directly to engagement survey scores',
          fix: 'Never incentivize scores; managers will coerce teams for high ratings. Reward action-plan execution instead.'
        },
        {
          mistake: 'Evaluating company results only by broad organizational averages',
          fix: 'Always inspect demographic slices; high corporate averages often mask severe pockets of disaffection in specific units.'
        }
      ],
      plan306090: {
        d30: 'Finalize question set, establish platform privacy rules, publish executive pledge, and launch census survey.',
        d60: 'Analyze driver correlations, host company-wide results town hall, and distribute department discussion toolkits.',
        d90: 'Collect logged team action plans, execute company-wide quick wins, and deploy the first 90-day pulse check.'
      },
      proTips: [
        'Include the statement: "I believe action will be taken as a result of this survey." It is the single best predictor of employee trust.',
        'Keep 75% of question items consistent year-over-year to maintain statistically reliable trendlines.',
        'Read anonymized employee comments thoroughly; qualitative themes provide the context behind quantitative driver ratings.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Confidential Stay Interviews',
        reason: 'In small teams of under 20–25 people where statistical anonymity cannot be maintained without identifying individuals.'
      },
      {
        alternative: 'Focus Groups / Town Halls',
        reason: 'During active workforce layoffs or organizational crises where employees require immediate human dialogue rather than cold surveys.'
      },
      {
        alternative: 'Continuous Real-Time Feedback Tools',
        reason: 'When monitoring sudden immediate reactions to a specific office relocation or software tool migration rather than cultural baseline.'
      }
    ],
    reflectionPrompts: [
      'If you surveyed your workforce today, what percentage would genuinely believe leadership will act on their feedback?',
      'Which employee segment in your organization is least represented in corporate digital communications?',
      'Do your managers facilitate constructive conversations around poor survey feedback, or do they react defensively?'
    ],
    quickReferenceCard: [
      'Engagement Index: Composite outcome score (% Agree/Strongly Agree on pride, advocacy, retention)',
      'eNPS: % Promoters (9-10) minus % Detractors (0-6) on recommendation willingness',
      'Driver Priority: Correlate drivers vs engagement; prioritize High-Impact / Low-Score items',
      'Golden Anonymity Rule: Never report or slice demographic data for groups under 5 people',
      'Execution Mandate: Visible action plan communicated within 30 days of survey close'
    ],
    quiz: [
      {
        id: 'eng-q1',
        question: 'In an employee Net Promoter Score (eNPS) survey of 100 employees, 40 are Promoters, 35 are Passives, and 25 are Detractors. What is the calculated eNPS?',
        options: ['+40', '+15', '−15', '+75'],
        correctAnswer: 1,
        explanation: 'eNPS = % Promoters minus % Detractors = (40 − 25) / 100 × 100 = +15. Passives are excluded from the net calculation.'
      },
      {
        id: 'eng-q2',
        question: 'What is the primary objective of running statistical "Driver Analysis" on employee engagement survey data?',
        options: [
          'To identify individual underperforming employees for disciplinary action',
          'To identify which specific workplace factors have the strongest statistical relationship with overall engagement',
          'To calculate annual wage inflation indices',
          'To replace traditional exit interviews'
        ],
        correctAnswer: 1,
        explanation: 'Driver analysis identifies which workplace factors (e.g. manager respect, growth, tools) most strongly predict overall engagement, guiding where to act first.'
      },
      {
        id: 'eng-q3',
        question: 'What is the standard minimum reporting threshold commonly applied to survey cohorts to guarantee respondent anonymity?',
        options: ['1 employee', '2 employees', '5 employees', '50 employees'],
        correctAnswer: 2,
        explanation: 'Five respondents is the industry-standard anonymity floor; reporting on groups smaller than five creates severe risk of individual identification.'
      },
      {
        id: 'eng-q4',
        question: 'Which statement accurately differentiates employee "engagement" from employee "satisfaction"?',
        options: [
          'They are identical psychological concepts',
          'Satisfaction reflects emotional commitment and discretionary effort, whereas engagement is passive contentment',
          'Engagement reflects emotional commitment and discretionary effort, whereas satisfaction reflects passive contentment',
          'Engagement is measured strictly through financial compensation levels'
        ],
        correctAnswer: 2,
        explanation: 'An employee can be completely satisfied (content with pay and hours) while contributing zero discretionary effort; engagement implies active emotional commitment.'
      },
      {
        id: 'eng-q5',
        question: 'What is recognized as the single most damaging executive mistake following the conclusion of an engagement survey?',
        options: [
          'Sharing unvarnished company survey results openly with all employees',
          'Taking no visible action on the survey findings',
          'Deploying a 10-question pulse survey six months later',
          'Filtering results by demographic departments'
        ],
        correctAnswer: 1,
        explanation: 'Failing to take visible action proves to employees that leadership does not care about their input, depressing morale and future survey honesty.'
      }
    ]
  },
  {
    id: 'appraisal',
    name: 'Performance Appraisal Systems',
    shortName: 'Performance Appraisal',
    category: 'HR & Organizational',
    tagline: 'Structure expectation setting, objective evaluation, calibration, and defensible career decisions',
    origin: 'Pioneered through early 20th-century merit ratings, Peter Drucker’s Management by Objectives (MBO, 1954), Behaviourally Anchored Rating Scales (BARS, Smith & Kendall 1963), and modern continuous check-in models (Adobe 2012, Deloitte 2015).',
    corePurpose: 'Establish unambiguous performance standards, evaluate accomplishments and competencies using verifiable evidence, mitigate subjective rater bias, and govern pay, promotion, and development decisions fairly.',
    primaryUsers: ['HR Directors & People Operations', 'Line Managers & Team Leads', 'Executive Calibration Committees', 'Employees conducting Self-Assessments', 'Compensation & Benefits Leads'],
    difficulty: 'Intermediate',
    horizon: 'Annual / Bi-Annual Evaluation Cycles coupled with Monthly Check-ins',
    scope: 'All Organizational Personnel across Individual, Team, and Functional Roles',
    timeToResult: '1 full operational appraisal cycle (3–6 months for complete goal-to-calibration loop)',
    dataNeeds: 'Documented KRAs and measurable KPIs, competency frameworks with BARS anchors, check-in logs, and multi-source feedback',
    keyOutput: 'Calibrated performance ratings, structured feedback plans, compensation adjustments, promotion rosters, and PIP documentation',
    bestPairedWith: 'OKRs & Balanced Scorecard (goals), Competency Mapping (behaviors), RACI Matrix (role boundaries), Compensation Bands',
    keyFeatures: [
      'Dual-axis evaluation balancing "What" was achieved (KRAs/KPIs: ~70%) with "How" it was achieved (Competencies: ~30%)',
      'Behaviourally Anchored Rating Scales (BARS) replacing vague numerical scales with observable behavioral examples',
      'Cross-departmental Calibration Sessions aligning grading standards and eliminating harsh vs lenient manager bias',
      'Continuous monthly performance check-ins replacing end-of-year memory guesswork with real-time documentation',
      'Systematic Rater Bias mitigation (combating Halo, Horns, Recency, Leniency, and Central Tendency errors)',
      'Transparent merit matrix linking performance ratings and salary band positioning to salary increments'
    ],
    howItWorks: 'At the start of the performance cycle, managers and employees agree on 4–6 measurable KRAs with specific KPIs (70% weight) and core role competencies defined by BARS (30% weight). Throughout the year, they conduct monthly 20-minute check-ins to track milestones and record evidence. At year-end, the employee completes a self-assessment and the manager assigns preliminary ratings with documented evidence. Department leaders then convene in calibration sessions to normalize ratings across teams. Following calibration, managers conduct feedback conversations, establish individual development plans, and apply published merit increment matrices.',
    coreConcepts: [
      {
        term: 'Key Result Area (KRA) & KPI',
        definition: 'A KRA defines the broad area of role responsibility; a KPI provides the precise quantitative metric measuring success within that KRA.'
      },
      {
        term: 'Behaviourally Anchored Rating Scale (BARS)',
        definition: 'A rating methodology where each numerical level (1 to 5) is explicitly defined by concrete, observable behavioral examples.'
      },
      {
        term: 'Calibration Meeting',
        definition: 'A collaborative executive session where managers review and defend preliminary ratings to ensure equitable grading standards across teams.'
      },
      {
        term: 'Rater Biases',
        definition: 'Systematic cognitive errors: Halo (one strength skews all ratings high), Horns (one flaw skews all ratings low), Recency, Leniency, and Central Tendency.'
      },
      {
        term: 'Performance Improvement Plan (PIP)',
        definition: 'A formal, documented 30-to-90 day support framework with explicit remedial targets and resources for underperforming employees.'
      }
    ],
    strengths: [
      'Provides objective, legally defensible documentation governing compensation, promotion, and termination decisions',
      'Fosters alignment between high-level company goals and daily frontline employee contributions',
      'Identifies exceptional high performers for leadership pipelines and retention incentives'
    ],
    limitations: [
      'Can trigger defensive behavior and anxiety if evaluations are coupled strictly to salary without developmental dialogue',
      'Traditional annual reviews suffer from severe recency bias if continuous check-ins are neglected',
      'Rigid forced distribution (stack ranking) destroys cross-team collaboration and damages organizational morale'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Corporate OKRs, Balanced Scorecard, RACI accountabilities, and Competency Frameworks',
      downstream: 'Feeds Annual Compensation increments, executive promotions, L&D training assignments, and PIP management'
    },
    useCases: [
      {
        title: 'Software Development Talent Retention',
        situation: '180-person software firm with 74% of developers rated 4 or 5; top performers resigning due to uniform increments.',
        problem: 'Manager ratings were completely uncalibrated; lenient managers rewarded average work identically to exceptional work.',
        action: 'Introduced calibration panels, BARS competency anchors, and a published merit increment matrix linking rating to compa-ratio.',
        outcome: 'Normalized top ratings to 31%; voluntary attrition among top performers fell by 50% in the following cycle.'
      },
      {
        title: 'Education Institute Faculty Performance System',
        situation: 'Accredited university needing to evaluate faculty across teaching, research publication, and campus administration.',
        problem: 'A single generic appraisal form treated newly recruited lecturers identically to senior tenured research professors.',
        action: 'Formulated designation-weighted KRAs (Assistant Prof: 60% teaching, 25% research; Full Prof: 40% teaching, 40% research, 20% mentoring).',
        outcome: 'Research publications increased by 45%; achieved highest NAAC/NBA accreditation audit rating.'
      },
      {
        title: 'Sales Team Quality Alignment',
        situation: 'Commercial vocational training academy evaluating admissions counselors solely on gross student signups.',
        problem: 'High student dropout rates occurred within 60 days because counselors over-promised curriculum outcomes.',
        action: 'Restructured KRAs: 50% new student enrolments, 30% student retention after 60 days, and 20% CRM process compliance.',
        outcome: 'Eliminated aggressive overselling; student course completion rates rose from 68% to 89%.'
      }
    ],
    caseStudy: {
      company: 'Meenakshi Software Labs (Madurai, Tamil Nadu)',
      revenue: '₹28 Crore ($3.4M)',
      staff: '180 Employees',
      profile: 'Custom enterprise software development, testing, and cloud systems integrator catering to Indian and international clients.',
      challenge: 'The legacy annual review utilized a simplistic 1–5 scale with a one-page form. In the preceding appraisal cycle, managers rated 74% of staff as "Exceeding" (4) or "Exceptional" (5). Consequently, the annual bonus pool was distributed almost uniformly, offering high performers a meager 8% raise while underperformers received 6%. Within six months, three top lead architects resigned, and employee survey data revealed only 29% felt appraisals were fair.',
      whyChosen: 'Leadership needed to establish defensible performance differentiation to reward elite contributors while transitioning from an annual interrogation to continuous feedback.',
      steps: [
        'Formed a joint design task force comprising the HR head, two delivery directors, two engineering managers, and senior developers.',
        'Redefined appraisal architecture: 70% weighted across 4–6 measurable KRAs with KPIs, and 30% based on 5 core competencies anchored by BARS.',
        'Re-anchored the 1–5 scale with explicit behavioral indicators (1 = Not Meeting, 2 = Partly Meeting, 3 = Fully Meeting, 4 = Exceeding, 5 = Exceptional).',
        'Mandated monthly 20-minute check-ins logged in the HRMS with a 3-line progress note to systematically eliminate recency bias.',
        'Introduced unit-level calibration sessions facilitated by HR with distribution guidelines (e.g., target 10–20% in bands 4 and 5) backed by required objective evidence.',
        'Published a transparent merit increment grid linking rating and employee position within their salary band (compa-ratio).'
      ],
      results: [
        'Percentage of staff rated 4 or 5 normalized from 74% down to 31%, restoring credibility to high ratings.',
        'Employee perception of appraisal fairness surged from 29% to 58% on internal audits.',
        'Voluntary attrition among top-rated employees fell by 50% over the subsequent 12 months.',
        '92% of staff maintained active monthly check-in documentation, cutting year-end review preparation time in half.'
      ],
      lessonsLearned: [
        'Calibration is the single most critical mechanism for equity; without peer review, lenient managers always inflate scores.',
        'Behavioral anchors (BARS) eliminate semantic disputes between managers and employees over what constitutes a "4".',
        'Separating the developmental conversation from the compensation announcement creates far more constructive dialogues.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Executive consensus on the core purpose of appraisals (development, pay differentiation, or promotion)',
        'Role-specific Job Descriptions and documented KRAs for all job families',
        'HRMS workflow or standardized digital forms capable of maintaining audit trails'
      ],
      steps: [
        'Formulate system principles: decide review cycle frequency and weightings (70% KRAs + 30% Competencies).',
        'Develop measurable KPIs for all KRAs and establish BARS descriptors across the 1–5 rating spectrum.',
        'Train all managers on goal setting, evidence logging, rater bias recognition, and constructive feedback.',
        'Execute formal goal setting at the beginning of the annual or bi-annual cycle.',
        'Enforce monthly or quarterly 20-minute check-ins to capture ongoing accomplishments and adjust goals.',
        'Initiate year-end self-assessments followed by preliminary manager evaluations supported by documented evidence.',
        'Convene cross-functional calibration committees to normalize rating distributions across departments.',
        'Conduct feedback conversations, co-create development plans, and apply the published merit increment matrix.'
      ],
      checklist: [
        'All KRAs established with measurable KPIs, specific targets, and percentage weightings',
        'Rating scale defined using BARS observable behaviors for every single point (1 to 5)',
        'Monthly check-in cadence enforced and tracked within the HRMS platform',
        'Calibration committee composition and guidelines established before rating submissions',
        'Merit increment matrix correlating rating and salary band compa-ratio published to employees',
        'Formal PIP protocol reviewed by legal counsel for statutory compliance'
      ],
      commonMistakes: [
        {
          mistake: 'Waiting until the end of the year to evaluate performance relying solely on recent memory',
          fix: 'Mandate monthly lightweight check-ins; recency bias invalidates annual-only evaluations.'
        },
        {
          mistake: 'Enforcing rigid, ruthless forced ranking (stack ranking) in small teams',
          fix: 'Use guidance distributions (e.g., "expect roughly 15% top performers") rather than strict punitive quotas.'
        },
        {
          mistake: 'Combining tense salary increment debates with developmental coaching in a single conversation',
          fix: 'Hold the developmental review first; communicate salary and bonus adjustments in a separate communication.'
        }
      ],
      plan306090: {
        d30: 'Standardize KRAs, KPIs, and BARS definitions for priority roles; configure HRMS appraisal workflow.',
        d60: 'Conduct manager bias training, execute employee goal-setting agreements, and initiate monthly check-in logs.',
        d90: 'Audit mid-year check-in documentation quality, refine struggling KRAs, and run a mock calibration session.'
      },
      proTips: [
        'Require managers to bring at least two pieces of written evidence for any rating submitted as a 1, 2, 4, or 5.',
        'During calibration, ask peer managers: "Would this individual receive the same rating if they were in your team?"',
        'Track performance rating distributions across gender, department, and tenure to identify systemic unconscious bias.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Agile OKRs with Weekly Check-ins',
        reason: 'In fast-pivoting early-stage startups where business priorities change weekly and annual goals become obsolete in 30 days.'
      },
      {
        alternative: 'Ratingless Narrative Reviews',
        reason: 'In non-profit or public institutions where compensation is strictly tied to tenure/grade and ratings serve only to provoke resentment.'
      },
      {
        alternative: 'Project-Based Post-Mortems',
        reason: 'For external management consultants and project contractors whose assignments conclude every 6–8 weeks.'
      }
    ],
    reflectionPrompts: [
      'If your company eliminated its appraisal system tomorrow, would actual team performance decline or improve?',
      'Which cognitive rater bias (Halo, Recency, Leniency) are you personally most susceptible to when assessing your team?',
      'Can your managers articulate the exact behavioral difference between a "3" (Fully Meeting) and a "4" (Exceeding)?'
    ],
    quickReferenceCard: [
      'Evaluation Split: 70% KRAs/KPIs (What was delivered) + 30% Competencies (How it was delivered)',
      'BARS Scale: 1 (Not Meeting), 2 (Partly), 3 (Fully), 4 (Exceeding), 5 (Exceptional)',
      'Calibration: Executive cross-review normalizing grading curves across harsh and lenient managers',
      'Continuous Cadence: Monthly 20-min check-ins eliminate end-of-year recency bias',
      'Merit Matrix: Links performance score and salary compa-ratio to annual pay raises'
    ],
    quiz: [
      {
        id: 'app-q1',
        question: 'A manager awards an employee top scores across all evaluation categories because the employee delivers outstanding public client presentations. This cognitive error is an example of:',
        options: ['Recency bias', 'Halo effect', 'Central tendency bias', 'Strictness bias'],
        correctAnswer: 1,
        explanation: 'The halo effect occurs when a single positive attribute (public presentation skill) colors the rater’s judgment across all unrelated performance areas.'
      },
      {
        id: 'app-q2',
        question: 'Which performance appraisal technique relies on specific, observable behavioral examples to define each numerical point on the rating scale?',
        options: ['Forced distribution stack ranking', 'Management by Objectives (MBO)', 'Behaviourally Anchored Rating Scales (BARS)', 'Graphic rating scale without definitions'],
        correctAnswer: 2,
        explanation: 'BARS (Behaviourally Anchored Rating Scales) replaces vague labels with concrete descriptions of actual workplace behaviors for every rating tier.'
      },
      {
        id: 'app-q3',
        question: 'What is the primary operational objective of conducting an executive "Calibration Meeting" during the appraisal cycle?',
        options: [
          'To finalize corporate sales budgets for the upcoming fiscal year',
          'To review, challenge, and normalize performance ratings across teams so identical performance receives equitable scores',
          'To replace employee self-assessments with executive scores',
          'To select exactly 10% of the workforce for mandatory termination'
        ],
        correctAnswer: 1,
        explanation: 'Calibration meetings align grading standards across managers, ensuring that lenient managers do not unfairly advantage their teams over harsh managers.'
      },
      {
        id: 'app-q4',
        question: 'Management by Objectives (MBO), the precursor to modern goal-setting frameworks, was first introduced in 1954 by:',
        options: ['Peter F. Drucker', 'Jack Welch', 'Robert Kaplan', 'William Kahn'],
        correctAnswer: 0,
        explanation: 'Peter Drucker introduced Management by Objectives (MBO) in his seminal 1954 work, "The Practice of Management".'
      },
      {
        id: 'app-q5',
        question: 'Which statement regarding 360-degree multi-rater feedback is supported by modern HR research?',
        options: [
          'It is most effective when used as the direct formula for determining salary bonuses',
          'It is most effective when utilized primarily for developmental coaching rather than compensation decisions',
          'It collects performance input exclusively from an employee’s immediate supervisor',
          'It replaces the need for objective quantitative KRAs and KPIs'
        ],
        correctAnswer: 1,
        explanation: '360-degree feedback generates honest, constructive insights when used for personal development; tying it to pay encourages peer collusion and defensive scoring.'
      }
    ]
  },
  {
    id: 'competency',
    name: 'Competency Mapping & Capability Modeling',
    shortName: 'Competency Mapping',
    category: 'HR & Organizational',
    tagline: 'Define the knowledge, skills, and behaviors each role requires and quantify capability gaps',
    origin: 'Initiated by David McClelland’s 1973 paper "Testing for Competence Rather Than for \'Intelligence\'"; elaborated by Richard Boyatzis (1982), Spencer & Spencer’s Iceberg Model (1993), and standardized through SFIA and India’s NSQF.',
    corePurpose: 'Establish an objective, shared standard of "what good looks like" across roles, driving consistency in hiring, targeted training, objective appraisal, and succession pipelines.',
    primaryUsers: ['L&D Directors & Training Heads', 'Talent Management Leads', 'Hiring Managers', 'Workforce Capability Planners', 'Educational Curriculum Designers'],
    difficulty: 'Advanced',
    horizon: 'Multi-Year Capability Architecture with Annual Assessment Cycles',
    scope: 'Job Families, Core Engineering/Operational Disciplines, or Entire Enterprise',
    timeToResult: '2–4 months to build, validate, and baseline a full functional framework',
    dataNeeds: 'Job analysis data, Behavioural Event Interviews (BEI) with top performers, competency dictionaries, and multi-source skill assessments',
    keyOutput: 'Organizational competency dictionary, role capability profiles, individual gap reports, and team skills heat maps',
    bestPairedWith: 'McKinsey 7S (Skills & Staff), RACI Matrix (role scoping), Performance Appraisal (behavioral anchors), L&D Training Academies',
    keyFeatures: [
      'Spencer & Spencer Iceberg Model: Visible knowledge/skills above the waterline; hidden self-concept, traits, and motives below',
      'Categorization across Technical/Functional, Transferable Behavioural, Leadership, and Core Organizational competencies',
      'Five standardized proficiency tiers (1: Basic, 2: Developing, 3: Proficient, 4: Advanced, 5: Expert) with behavioral indicators',
      'Behavioural Event Interview (BEI) methodology extracting critical incident behaviors distinguishing high from average performers',
      'Quantitative Gap Analysis: Assessed Level minus Required Role Level, instantly pinpointing organizational training deficits',
      'Team Capability Heat Map guiding project staffing, cross-training pairings, and external hiring prioritizations'
    ],
    howItWorks: 'Select critical job families to model. Conduct Behavioural Event Interviews (BEI) comparing high performers against average performers to identify the specific capabilities that differentiate superior performance. Build a standardized competency dictionary with 5 proficiency levels defined by observable indicators. Define Role Profiles specifying the required proficiency level (1–5) for each competency. Assess employees through triangulated evaluations (self-rating, manager evaluation, and practical tests). Calculate skill gaps (Gap = Assessed − Required) to generate individual development plans and aggregated team heat maps for targeted training.',
    coreConcepts: [
      {
        term: 'Competency',
        definition: 'An observable, measurable cluster of knowledge, skills, abilities, and behaviors directly linked to superior job performance.'
      },
      {
        term: 'The Iceberg Model',
        definition: 'Spencer & Spencer’s framework illustrating visible skills/knowledge above the waterline, and hidden traits/motives below the waterline.'
      },
      {
        term: 'Behavioural Event Interview (BEI)',
        definition: 'A structured interview protocol probing past critical incidents in depth to extract the actual behaviors driving successful outcomes.'
      },
      {
        term: 'Proficiency Levels (1–5)',
        definition: 'Graded capability standards: Level 1 (Basic/Assisted), Level 2 (Developing), Level 3 (Proficient/Independent), Level 4 (Advanced), Level 5 (Expert/Strategic).'
      },
      {
        term: 'Gap Analysis',
        definition: 'The mathematical difference between assessed capability and required role standard (Assessed − Required); negative scores identify training needs.'
      }
    ],
    strengths: [
      'Transforms vague opinions about employee competence into concrete, observable behavioral standards',
      'Replaces wasteful, generic training programs with laser-focused skill interventions addressing verified gaps',
      'Enables data-driven succession planning and transparent career progression pathways'
    ],
    limitations: [
      'Labor-intensive and time-consuming to build, validate, and maintain properly across multiple disciplines',
      'Can become bloated shelfware if departments draft dozens of overly academic, theoretical competencies',
      'Assessments can be subjective without rigorous calibration sessions and objective technical testing'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Corporate Strategy, McKinsey 7S capability needs, and RACI role definitions',
      downstream: 'Feeds Recruitment interview guides, Training Needs Analysis (TNA), Performance Appraisals, and Succession Ladders'
    },
    useCases: [
      {
        title: 'IT Trainer Capability Standardization',
        situation: 'Commercial skilling institute expanding across 6 cities experiencing inconsistent student classroom satisfaction.',
        problem: 'Trainers were recruited purely on academic degrees without assessing classroom engagement or lab pedagogical skills.',
        action: 'Constructed a Trainer Competency Profile (Technical Subject Expertise Level 4, Lab Design Level 3, Learner Engagement Level 4).',
        outcome: 'Rebuilt recruitment around live demo-class evaluations; student satisfaction improved to 92% across all branches.'
      },
      {
        title: 'Manufacturing Line Automation Reskilling',
        situation: 'Automotive tier-1 components plant installing automated robotic assembly and CNC cells.',
        problem: 'Uncertainty over which existing manual assembly workers could be reskilled versus needing external replacement.',
        action: 'Mapped current workforce against future automation competency profiles (CNC programming, diagnostics, PLC safety).',
        outcome: 'Assessed 60% of workers as reskillable through a 10-week academy, minimizing costly external recruitment.'
      },
      {
        title: 'Enterprise Leadership Succession Pipeline',
        situation: 'Founders of a 400-person firm unable to delegate strategic governance due to a lack of verified successor readiness.',
        problem: 'Past promotions were granted strictly on individual technical performance rather than leadership competence.',
        action: 'Established a Leadership Competency Model (Developing People, Strategic Agility, Stakeholder Diplomacy); assessed top 25 managers.',
        outcome: 'Formulated tailored 18-month executive development plans and successfully appointed three internal division heads.'
      }
    ],
    caseStudy: {
      company: 'Nila Embedded Systems (Coimbatore, Tamil Nadu)',
      revenue: '₹19 Crore ($2.3M)',
      staff: '95 Engineers + 30 Support Personnel',
      profile: 'Embedded systems engineering, firmware architecture, and industrial IoT hardware-software solutions developer.',
      challenge: 'The enterprise won high-margin industrial IoT contracts requiring integrated cloud, firmware, and telemetry analytics. However, project schedule delivery overruns rose from 12% to an alarming 22%. Project managers staffed contracts purely on staff availability without knowing individual skill depths. Crucially, two Tier-1 European automotive clients threatened contract cancellations unless the firm provided verifiable proof of engineering competency in Secure Firmware and Functional Safety.',
      whyChosen: 'Management needed comprehensive capability visibility across engineering disciplines to optimize staffing, modernize fresher onboarding, and furnish client-auditable competency proof.',
      steps: [
        'Scoped competency mapping across three engineering job families (Firmware, Hardware, Cloud/IoT) across four career bands (Associate, Engineer, Senior, Lead).',
        'Conducted Behavioural Event Interviews (BEIs) with 12 high-performing engineers and 6 average performers, analyzing 30 project incident transcripts.',
        'Codified a lean framework: 14 Technical Competencies (Embedded C, RTOS, Secure Firmware, PCB Review, etc.) and 6 Behavioural Competencies (Problem Solving, Ownership, Client Communication, etc.) with 5-tier behavioral anchors.',
        'Executed 360-degree capability assessments: employee self-rating, manager evaluation, and practical coding/hardware benchmarks.',
        'Held calibration sessions to resolve gaps greater than two levels, publishing individual gap reports and an interactive Team Skills Heat Map.',
        'Launched three targeted internal academies (Secure Firmware, Cloud Integration, Client Consulting) to systematically close identified gaps.'
      ],
      results: [
        'Engineers evaluated at Proficient (Level 3) or above in Secure Firmware expanded from 11 to 34 within one year.',
        'Average project schedule overruns plummeted from 22% down to 9%.',
        'Fresher engineer ramp-up time to billable project deployment fell from 5 months to 3 months.',
        'Successfully passed two stringent European client capability audits with zero non-conformances.',
        'Promotions to Technical Lead increased, grounded in objective capability thresholds rather than manager favoritism.'
      ],
      lessonsLearned: [
        'BEIs comparing high and average performers surface critical competencies that standard job descriptions omit (e.g. structured debugging and client diplomacy).',
        'Self-ratings consistently inflate technical skills and deflate behavioral skills; objective testing and manager calibration are essential.',
        'A team capability heat map is the highest-value deliverable for operations managers because it optimizes daily project allocation.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Executive sponsorship committed to utilizing competency outputs for recruitment, appraisals, and promotions',
        'Access to high-performing incumbents and subject-matter experts for behavioral event interviews',
        'Structured database or HRMS talent module capable of tracking competency dictionaries and role profiles'
      ],
      steps: [
        'Define strategic purpose (recruitment, L&D prioritization, promotion standards) and select target job families.',
        'Conduct Behavioural Event Interviews (BEI) with top and average performers to identify differentiating behaviors.',
        'Draft a lean competency dictionary (5–8 behavioral, 6–12 technical competencies per role family).',
        'Define 5 proficiency levels per competency with concrete, observable behavioral indicators.',
        'Build Role Profiles defining the target proficiency level required for every role and seniority band.',
        'Pilot the evaluation in one representative department to refine ambiguous definitions.',
        'Conduct workforce assessments combining self-ratings, manager evaluations, and objective technical assessments.',
        'Host calibration sessions to reconcile major assessment discrepancies and generate individual gap reports.',
        'Construct team capability heat maps and link gap resolutions directly to corporate training programs.'
      ],
      checklist: [
        'Competencies categorized clearly into Core, Behavioural, Technical, and Leadership buckets',
        'Every proficiency level (1–5) formulated with observable actions, avoiding vague adjectives like "good"',
        'Total competencies per role profile restricted to a manageable number (under 15–20)',
        'Assessment incorporates at least two independent data sources (self + manager + tests)',
        'Individual Development Plans (IDPs) generated for all negative gap scores (Assessed < Required)',
        'Framework review cycle established (every 12–24 months for fast-moving technical skills)'
      ],
      commonMistakes: [
        {
          mistake: 'Copying a generic 50-competency library from the internet without customizing for company reality',
          fix: 'Keep frameworks lean (under 15–20 competencies per role family) and ground them in your own high-performer data.'
        },
        {
          mistake: 'Relying exclusively on employee self-assessments without objective verification or calibration',
          fix: 'Always pair self-ratings with manager assessments and practical work samples or technical tests.'
        },
        {
          mistake: 'Drafting an elaborate competency dictionary and filing it away as unused HR shelfware',
          fix: 'Immediately wire the competency framework into at least two daily processes: hiring interview guides and appraisal criteria.'
        }
      ],
      plan306090: {
        d30: 'Select pilot job family, conduct 10 BEI interviews with high performers, and draft initial competency dictionary.',
        d60: 'Validate role profiles, establish 5-tier behavioral anchors, and execute pilot assessment across engineering squads.',
        d90: 'Publish team capability heat maps, link gaps to training catalogues, and update role hiring scorecards.'
      },
      proTips: [
        'Focus BEI interviews on critical incidents: "Tell me about a specific time when an assignment went exceptionally well because of what you did."',
        'Treat competencies below the waterline (values, motives, resilience) primarily as hiring criteria; they are exceedingly difficult to train.',
        'Publish transparent career capability ladders showing employees the exact competency levels needed for promotion.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Simple Technical Skills Inventory',
        reason: 'When you require an immediate, quick database of programming languages or tool certifications without behavioral modeling.'
      },
      {
        alternative: 'Basic Job Descriptions',
        reason: 'In very small early-stage teams (under 25–30 people) where roles are fluid, rapidly evolving, and formal frameworks add overhead.'
      },
      {
        alternative: 'Standard Industry Taxonomies (SFIA / NSQF)',
        reason: 'When standard off-the-shelf vocational frameworks can be adopted directly without spending capital on custom internal models.'
      }
    ],
    reflectionPrompts: [
      'If you asked three different managers in your organization what "excellent" looks like in the same role, would their answers match?',
      'Which emerging competency will be critical to your business strategy three years from now that nobody is currently tracking?',
      'What percentage of your corporate training budget is currently allocated to verified employee capability gaps?'
    ],
    quickReferenceCard: [
      'Iceberg Model: Visible knowledge/skills (above waterline); hidden traits/motives (below waterline)',
      'Proficiency Scale: 1 (Basic), 2 (Developing), 3 (Proficient - standard benchmark), 4 (Advanced), 5 (Expert)',
      'BEI Methodology: Probes past real-world critical incidents to extract high-performer differentiators',
      'Gap Calculation: Assessed Proficiency minus Required Proficiency (Negative score = Training Target)',
      'Core Deliverable: Team Skills Heat Map driving staffing allocations and targeted training academies'
    ],
    quiz: [
      {
        id: 'comp-q1',
        question: 'Which researcher’s seminal 1973 paper is widely recognized as inaugurating the modern competency movement in organizational management?',
        options: ['David C. McClelland', 'Peter F. Drucker', 'Michael E. Porter', 'Jack Welch'],
        correctAnswer: 0,
        explanation: 'David McClelland published "Testing for Competence Rather Than for \'Intelligence\'" in American Psychologist (1973).'
      },
      {
        id: 'comp-q2',
        question: 'In Lyle and Signe Spencer’s classic Iceberg Model of competencies, which elements reside "below the waterline" and are the hardest to develop through training?',
        options: [
          'Technical knowledge and software skills',
          'Academic degrees and university grades',
          'Self-concept, underlying personal traits, and core motives',
          'Professional industry certifications'
        ],
        correctAnswer: 2,
        explanation: 'The Iceberg Model positions visible skills and knowledge above the waterline, while deeper self-concept, social motives, and core traits sit below.'
      },
      {
        id: 'comp-q3',
        question: '"Embedded C micro-controller programming" is best classified under which competency category?',
        options: ['Behavioural competency', 'Leadership competency', 'Core organizational competency', 'Technical / functional competency'],
        correctAnswer: 3,
        explanation: 'Specific, role-dependent technical know-how like Embedded C programming is classified as a technical/functional competency.'
      },
      {
        id: 'comp-q4',
        question: 'What is the distinctive feature of the Behavioural Event Interview (BEI) methodology?',
        options: [
          'It asks candidates to complete an abstract cognitive aptitude test',
          'It asks interviewees to recount specific past real-world work situations and critical incidents in meticulous detail',
          'It asks employees to rate their own future career aspirations on a 1–5 scale',
          'It uses hypothetical future questions like "What would you do if..."'
        ],
        correctAnswer: 1,
        explanation: 'BEI focuses strictly on detailed behavioral narratives of actual past critical incidents to uncover what individuals actually thought, felt, and did.'
      },
      {
        id: 'comp-q5',
        question: 'An employee’s required role proficiency level for "Assessment Design" is 4, and their calibrated assessed level is 2. What is their capability gap?',
        options: ['+2', '−1', '−2', '0'],
        correctAnswer: 2,
        explanation: 'Gap = Assessed Level (2) minus Required Level (4) = −2. A negative score represents a capability deficit requiring targeted development.'
      }
    ]
  }
];

export const CATEGORY_7_STACKS: StrategyStack[] = [
  {
    id: 'stack-hr-a',
    name: 'Stack A — Startup & Small Business People Architecture',
    targetOrg: 'Startups & Small Businesses (Under 50 People, Fast Growth)',
    recommendedChain: ['raci', 'appraisal', 'engagement'],
    cadence: {
      quarterly: '10-question anonymous pulse survey (if 25+ staff) + RACI updates on high-confusion workflows',
      annually: 'Lightweight annual/half-yearly appraisal (4–5 goals, 5-point BARS, self-assessment, 45-min dialogue)',
      every23Years: 'Light 1-page 7S review during organizational restructuring'
    },
    whyItFits: 'Clarity of role ownership and perceived fairness matter far more than heavyweight corporate infrastructure at this stage. RACI resolves immediate cross-functional handoffs, a streamlined appraisal system establishes objective recognition, and lightweight pulses provide psychological safety.',
    whatToSkip: 'Skip full formal 7S workshops, complex 360-degree reviews, and elaborate multi-tier competency frameworks (use simple role profiles instead).'
  },
  {
    id: 'stack-hr-b',
    name: 'Stack B — Growing SME & Institutional Governance Stack',
    targetOrg: 'Growing SMEs & Educational Institutions (50–500 People, Expanding Management Tiers)',
    recommendedChain: ['mckinsey7s', 'raci', 'competency', 'appraisal', 'engagement'],
    cadence: {
      quarterly: 'Quarterly engagement pulse checks + monthly 20-minute performance check-ins',
      annually: 'Annual McKinsey 7S strategic alignment review -> update RACI for changed processes -> annual engagement census -> calibrated performance appraisals (70% KRAs / 30% Competencies)',
      every23Years: 'Refresh competency frameworks for critical engineering, sales, and operational job families'
    },
    whyItFits: 'Rapid organizational growth inevitably breeds structural misalignment, manager inconsistency, and role confusion. Competencies and peer calibration ensure performance standards remain fair across managers who no longer know every employee personally.',
    whatToSkip: 'Avoid bureaucratic 40-page appraisal dossiers and uncalibrated forced ranking quotas that damage teamwork.'
  },
  {
    id: 'stack-hr-c',
    name: 'Stack C — Enterprise & Multi-Entity Group Architecture',
    targetOrg: 'Large Enterprises, Industrial Conglomerates & Multi-Entity Groups (500+ People)',
    recommendedChain: ['mckinsey7s', 'competency', 'raci', 'appraisal', 'engagement'],
    cadence: {
      quarterly: 'Subsidiary-level engagement driver reviews + leadership succession pipeline reviews',
      annually: 'Group-level 7S audits for M&A and restructuring -> enterprise engagement census with entity cuts -> cross-entity appraisal calibration -> technical competency audits',
      every23Years: 'Comprehensive corporate culture, delegation-of-authority (DoA), and global competency framework modernizations'
    },
    whyItFits: 'Scale demands standardized organizational governance: group-level core values and leadership competencies enable talent mobility, while entity-specific technical maps and RACI matrices preserve business unit agility.',
    whatToSkip: 'Avoid monolithic one-size-fits-all technical competency models that ignore subsidiary industry realities.'
  }
];

export const CATEGORY_7_SCENARIOS: ScenarioMission[] = [
  {
    id: 'mission-hr-1',
    title: 'The Stalled Customer-Centric Reorganization at Titan Engineering',
    role: 'Chief Human Resources Officer (CHRO)',
    companyContext: 'Titan Engineering Solutions ($65M Revenue, 300 employees providing customized industrial infrastructure).',
    crisisPrompt: 'Your CEO has formally reorganized the company from traditional functional silos (Civil, Electrical, Mechanical) into three industry-focused Business Units (Energy, Automotive, Infrastructure) to improve client intimacy. Six months post-reorg, client satisfaction has not budged, project delivery remains late, and engineers complain that they still queue for weeks waiting for technical sign-offs from their former functional heads. What is your 7S diagnostic and intervention?',
    targetTools: ['mckinsey7s', 'raci'],
    options: [
      {
        id: 'opt-hr-1-1',
        label: 'Immediately revert the reorganization back to functional departments and issue an apology memo to clients',
        toolUsed: 'Premature Reorganization Surrender',
        explanation: 'Disastrous. Reverting after six months forfeits strategic client alignment, destabilizes executive credibility, and ignores the root cause of execution friction.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-hr-1-2',
        label: 'Execute focused 7S diagnostic: Realign Systems (shift budgeting/appraisals to BU heads), Style (redefine functional heads as Centers of Excellence), and mandate a RACI for project approvals',
        toolUsed: 'McKinsey 7S Alignment & RACI Decision Rights',
        explanation: 'Exemplary OD intervention. Structure was changed on paper, but Systems (budgets and appraisals still controlled by functional heads) and Style (functional heads behaving as decision bottlenecks) nullified the strategy. Transferring appraisal authority to BU heads, redefining functional heads as technical mentors, and embedding a RACI resolves the crisis.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-hr-1-3',
        label: 'Launch a company-wide motivational slogan campaign and install new digital collaboration screens in the cafeteria',
        toolUsed: 'Superficial Morale Panacea',
        explanation: 'Superficial and ineffective. Slogans do not solve misaligned approval authorities or conflicting compensation incentives.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'This is the classic "Structure Is Not Organization" trap. Changing the org chart into business units failed because the other six 7S elements remained anchored to the legacy functional model: 1) Systems: Approval workflows, project budgets, and annual appraisals were still routed through the old functional department heads. 2) Style: Functional heads continued acting as bureaucratic gatekeepers rather than strategic enablers. 3) Skills: Engineers lacked client management and commercial negotiation skills. 4) Shared Values: The cultural norm still worshipped technical perfectionism over on-time customer delivery. Action plan: Transfer P&L, budget signoff, and appraisal ownership directly to the Business Unit Heads (Systems). Redefine functional department heads as Centers of Excellence responsible for technical mentoring and standards (Style/Structure). Build an explicit project approval RACI matrix making the BU Lead the sole "Accountable" owner for client deliverables. Train engineers in commercial project management (Skills), and reformat leadership review agendas around customer Net Promoter Scores.',
    actionChecklist: [
      'Diagnose alignment across Systems, Style, and Skills rather than blaming the structural reorganization',
      'Transfer budget, project signoff, and appraisal authority directly to Business Unit Leaders',
      'Redefine legacy functional department heads as technical Centers of Excellence and coaches',
      'Implement an explicit RACI matrix making BU leads the single Accountable owners for project milestones',
      'Reformat executive dashboard agendas to track customer delivery metrics instead of internal functional utilization'
    ],
    reflectionKey: 'When a new org chart fails to deliver results, never assume the structure is wrong. Inspect whether your systems, incentives, and leadership habits are quietly sabotaging it.'
  },
  {
    id: 'mission-hr-2',
    title: 'The Chaotic Escalation Crossfire at Apex BPO Solutions',
    role: 'Vice President of Global Operations',
    companyContext: 'Apex Global BPO ($32M Revenue, 200 customer support associates across Tier-1 enterprise telecom contracts).',
    crisisPrompt: 'Client churn has reached an all-time high due to mishandled high-severity support tickets. In a recent crisis, a Tier-1 enterprise telecom client was promised a critical billing patch by the Client Relationship Manager, while the Quality Assurance Analyst simultaneously instructed developers to hold the release, and the Shift Team Lead issued an unauthorized service credit. The CEO demands an end to the finger-pointing. How do you resolve this using RACI?',
    targetTools: ['raci'],
    options: [
      {
        id: 'opt-hr-2-1',
        label: 'Mandate that all customer escalation decisions must be personally signed off by the Operations Vice President',
        toolUsed: 'Executive Bottleneck Creation',
        explanation: 'Counter-productive. Concentrating all escalation approvals in the VP creates a massive operational bottleneck, paralyzes 24/7 client response, and disempowers frontline leadership.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-hr-2-2',
        label: 'Map the end-to-end escalation lifecycle, enforce the single-A rule (CRM as A for client closure, TL as R for resolution), and embed RACI directly into the ticketing tool',
        toolUsed: 'RACI Governance & Workflow Integration',
        explanation: 'Masterful RACI application. Clarifies decision boundaries across the 6-stage lifecycle, enforces exactly one Accountable role per step, removes ambiguity, and hardcodes the rules into the ticketing software.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-hr-2-3',
        label: 'Issue formal written reprimands to all three managers and order them to collaborate better in weekly committee meetings',
        toolUsed: 'Punitive Bureaucratic Abdication',
        explanation: 'Fails to address structural ambiguity. Punishing individuals when the operating system has conflicting decision rights guarantees future failures.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Apply RACI to eliminate role ambiguity across the escalation lifecycle: 1) Map the 6 lifecycle phases: Ticket Intake, Severity Triaging, Technical Root-Cause Investigation, Corrective Fix Execution, Client Communication, and Final Closure. 2) Have the Client Relationship Manager (CRM), Team Lead (TL), and QA Analyst independently draft their understood RACI codes—the resulting divergence visually proves the crisis is systemic, not personal. 3) Enforce the Single-A rule: Designate the Client Relationship Manager as the sole "A" for Client Communication and Final Closure. Designate the Technical Team Lead as "R" for fix execution and "A" for technical deployment. Designate QA as "C" for validation testing. Designate the Operations VP as "I" on routine tickets and "A" strictly on escalations exceeding ₹5,00,000 in liability. 4) Hardcode the matrix into the CRM ticketing software so tickets automatically assign R, A, C, and I roles upon logging. 5) Review the first 30 escalations in a weekly 15-minute operational standup.',
    actionChecklist: [
      'Deconstruct the operational escalation lifecycle into discrete, unambiguous sequential activities',
      'Assign exactly one Accountable (A) role to each activity phase to eliminate diffusion of responsibility',
      'Designate the Client Relationship Manager as the sole owner for external communications and commercial promises',
      'Hardcode RACI roles directly into the ticketing software to automate role assignment',
      'Audit the first 30 live tickets against RACI protocols during weekly operational reviews'
    ],
    reflectionKey: 'When two managers both believe they own a decision, the customer always loses. Fix the matrix, publish single accountabilities, and eliminate committee approvals.'
  },
  {
    id: 'mission-hr-3',
    title: 'The "Few Unhappy People" Denial at Kalai Diagnostics',
    role: 'Director of Human Resources',
    companyContext: 'Kalai Diagnostic Healthcare Network ($45M Revenue, 520 healthcare professionals across 18 regional hubs).',
    crisisPrompt: 'Your annual employee engagement survey reveals a respectable 58% favorable score enterprise-wide. However, the Coimbatore imaging and pathology hub (22 employees) scored an alarming 31% favorable, with eNPS at −42. The hub director dismisses the data, furiously claiming the survey was "manipulated by 2 or 3 toxic malcontents" and threatens to identify and confront them. How do you intervene?',
    targetTools: ['engagement'],
    options: [
      {
        id: 'opt-hr-3-1',
        label: 'Release the raw individual survey spreadsheets to the hub director so he can address the specific employees personally',
        toolUsed: 'Breach of Anonymity & Psychological Safety',
        explanation: 'Catastrophic. Violates the core anonymity threshold, breaches the Digital Personal Data Protection Act, destroys workforce trust, and subjects employees to managerial retaliation.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-hr-3-2',
        label: 'Protect anonymity, verify hub participation rate, conduct driver regression, and deploy an HR facilitator to lead non-defensive action planning with leadership coaching',
        toolUsed: 'Engagement Driver Analytics & Facilitated Action Planning',
        explanation: 'Textbook people leadership. Protects confidentiality, demonstrates that an 86% response rate mathematically refutes the "few people" myth, isolates specific driver failures (supervisor respect and shift exhaustion), and coaches the manager constructively.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-hr-3-3',
        label: 'Immediately terminate the hub director without investigation to signal that low scores are not tolerated',
        toolUsed: 'Knee-Jerk Punitive Reaction',
        explanation: 'Unfair and counterproductive. Treating engagement scores as an automatic judicial verdict encourages other managers to intimidate their teams into giving fake positive scores.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'Treat the engagement survey score as an operational diagnostic signal, not an executive criminal trial: 1) Protect anonymity: Firmly refuse any disclosure of individual responses, upholding the strict ≥5 anonymity floor and statutory data-protection policies. 2) Rebut the "few malcontents" myth with arithmetic: Show the hub director that with 19 out of 22 staff responding (86% response rate), a 31% favorable score mathematically requires at least 14 employees expressing deep dissatisfaction across multiple drivers. 3) Dissect the driver data: Examine the specific driver scores for the hub. If "Manager Respect" scored 18% and "Shift Workload" scored 22% while "Company Pride" scored 65%, the issue is supervisory friction and roster burnout rather than disloyalty. 4) Neutral facilitation: Assign a seasoned HR facilitator—not the hub director—to lead a confidential team action-planning session where staff can safely voice process impediments. 5) Leadership support: Pair the hub director with an executive leadership coach focusing on empathetic communication and fair shift scheduling. 6) Verification: Deploy a focused 6-item pulse survey in 90 days to measure progress.',
    actionChecklist: [
      'Strictly enforce anonymity safeguards and prohibit any managerial hunting for individual respondents',
      'Demonstrate mathematically using response rates why low scores reflect broad consensus, not isolated outliers',
      'Isolate driver categories to pinpoint the root cause (supervisory respect vs workload vs compensation)',
      'Deploy an independent HR facilitator to guide non-defensive team action planning',
      'Schedule a targeted 90-day pulse survey to verify tangible improvement in the troubled hub'
    ],
    reflectionKey: 'When managers dismiss negative employee feedback as "a few toxic people," they are usually the primary reason people are unhappy. Protect anonymity and coach them with data.'
  },
  {
    id: 'mission-hr-4',
    title: 'The "They Worked Very Hard" Rating Inflation at Vanguard IT',
    role: 'Vice President of Talent & Performance',
    companyContext: 'Vanguard Enterprise Technologies ($50M Revenue, 120 software engineers and project managers).',
    crisisPrompt: 'During annual appraisal calibration, an engineering manager presents preliminary ratings for his 14-member squad: all 14 engineers are rated 4 ("Exceeding") or 5 ("Exceptional"). However, audit records confirm that this specific squad delivered only 72% of their planned sprint commitments and caused two severe production downtime incidents. The manager defensively argues: "My engineers worked 14-hour days and tried their best; giving them a 3 will destroy their morale!" How do you handle calibration?',
    targetTools: ['appraisal'],
    options: [
      {
        id: 'opt-hr-4-1',
        label: 'Accept all 14 ratings as submitted to protect the engineering manager’s rapport with his team',
        toolUsed: 'Calibration Abdication & Grade Inflation',
        explanation: 'Fatal to organizational equity. Rubber-stamping inflated ratings dilutes the value of true high-performance ratings across the firm and exhausts the compensation budget on underperforming units.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-hr-4-2',
        label: 'Separate effort from business results, benchmark against BARS anchors and KRA evidence, calibrate ratings in peer committee, and coach the manager on constructive feedback',
        toolUsed: 'Appraisal Calibration & Evidence-Based Governance',
        explanation: 'Exemplary performance governance. Acknowledges hard work while distinguishing effort from outcomes. Uses objective KRA completion data and BARS definitions to normalize ratings, maintaining equity across the entire company.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-hr-4-3',
        label: 'Unilaterally change all 14 ratings to a score of 2 ("Needs Improvement") without consulting the manager or team',
        toolUsed: 'Authoritarian Administrative Override',
        explanation: 'Arbitrary and demoralizing. Overriding ratings behind closed doors without peer calibration destroys the manager\'s authority and alienates the engineers.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'Performance calibration exists precisely to resolve this challenge: 1) Separate Effort from Results: Acknowledge the squad’s long hours and dedication, but reinforce the core appraisal principle that compensation and ratings evaluate business outcomes (KRAs) and observable competencies (BARS), not raw sweat equity. 2) Challenge with Evidence: In the peer calibration committee, compare the squad’s objective deliverables (72% on-time sprint completion, 2 major outages) against company-wide BARS standards. A score of 4 or 5 requires consistent delivery above target. 3) Peer Normalization: Have peer engineering managers challenge the ratings: "If this team receives 5s for missing milestones, what rating do we give the Cloud squad that delivered 100% with zero defects?" 4) Re-align Ratings Collaboratively: Guide the manager to adjust ratings based on individual contribution: recognize 1–2 standout engineers who mitigated outages with 4s, place solid contributors at 3 (Fully Meeting), and rate those responsible for recurring defect handoffs at 2 with concrete development plans. 5) Coach the Manager: Train the manager in delivering constructive feedback, and evaluate his own performance under "People Management & Evaluation Rigor."',
    actionChecklist: [
      'Uphold the clear distinction between employee effort and actual business delivery outcomes',
      'Require objective KRA documentation and BARS behavioral evidence for all top-tier ratings',
      'Leverage peer manager calibration challenge to establish horizontal fairness across departments',
      'Coach lenient managers on conducting constructive, difficult performance feedback conversations',
      'Incorporate calibration accuracy into the manager’s own annual performance evaluation'
    ],
    reflectionKey: 'When everyone receives a top rating, your best people receive the message that extraordinary achievement does not matter. Calibration protects your highest performers.'
  },
  {
    id: 'mission-hr-5',
    title: 'The Blanket Generative AI Training Dilemma at Cognizant Analytics',
    role: 'Global Head of Learning & Development (L&D)',
    companyContext: 'Cognizant Analytics Solutions ($80M Revenue, 400 technology consultants, data engineers, and functional analysts).',
    crisisPrompt: 'Following an executive board retreat, your CEO announces that all 400 employees must be "Enterprise AI Ready" within 9 months, and directs you to spend your entire ₹1.2 Crore annual L&D budget purchasing access to a generic 40-hour online generative AI video course for the entire staff. You know that past blanket video courses suffered an 8% completion rate and created zero measurable capability. How do you re-architect this using Competency Mapping?',
    targetTools: ['competency'],
    options: [
      {
        id: 'opt-hr-5-1',
        label: 'Purchase the generic video course immediately and mandate that HR withhold bonuses for any employee who fails to complete all 40 hours',
        toolUsed: 'Compliance-Driven Training Mandate',
        explanation: 'Wasteful and ineffective. Forcing employees through generic video content yields zero verified competence, generates widespread resentment, and squanders ₹1.2 Crore.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-hr-5-2',
        label: 'Model 3 AI competencies across 5 proficiency tiers, map role requirements (high for devs, practical for analysts, awareness for support), run baseline gap tests, and deliver tiered practical academies',
        toolUsed: 'Targeted Competency Mapping & Tiered Capability Modeling',
        explanation: 'Masterful capability engineering. Replaces spray-and-pray training with a structured competency framework. Tailors investments to actual role profiles, verifies baselines with practical tests, and deploys high-ROI hands-on labs.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-hr-5-3',
        label: 'Tell the CEO that artificial intelligence is an overhyped bubble and recommend spending the budget on traditional project management certifications',
        toolUsed: 'Obstinate Strategic Resistance',
        explanation: 'Fails to support the executive strategy and abdicates the L&D department’s role in future-proofing organizational capabilities.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Apply competency mapping to transform an abstract mandate into a high-ROI workforce transformation: 1) Codify AI Competency Standards: Define 3 distinct competencies with 5 proficiency levels: a) "Prompt Engineering & Task Automation", b) "AI Code Synthesis & Output Verification", c) "Responsible AI Ethics, Data Governance & Security". 2) Role-Profile Mapping: Establish required proficiency targets by job family: Software Developers and Data Engineers require Level 4 (Advanced); Business Analysts and Consultants require Level 3 (Proficient); HR, Finance, and Administrative Support require Level 2 (Developing/User). 3) Baseline Capability Assessment: Administer a 30-minute practical benchmarking test on work samples—not subjective self-ratings—to establish the actual enterprise gap. 4) Tiered L&D Architecture: Instead of buying a blanket 40-hour video, deploy a 3-tier program: Tier 1 (All Staff, 2 hours): Responsible AI use, prompt hygiene, and security policies (Internal cost ₹5 lakh); Tier 2 (200 Analysts/Consultants, 12 hours): Hands-on prompt engineering and business workflow automation labs; Tier 3 (80 Senior Developers, 40 hours): Advanced LLM fine-tuning, RAG architecture, and secure code generation hackathons. 5) Integrate with Appraisals: Embed the required AI competencies as 30% of the annual evaluation criteria, tracking capability expansion via a live Team Skills Heat Map.',
    actionChecklist: [
      'Deconstruct the broad executive mandate into specific, measurable competency definitions with 5-tier behavioral anchors',
      'Differentiate required proficiency targets across job families rather than imposing uniform expectations',
      'Assess baseline capabilities using practical work-sample testing rather than subjective self-ratings',
      'Deploy tiered learning programs: foundational awareness for all, intensive hands-on labs for technical roles',
      'Hardcode verified competency milestones into role profiles, promotion criteria, and appraisal scorecards'
    ],
    reflectionKey: 'Generic, one-size-fits-all training is the costliest way to build zero capability. Map the competencies, measure the actual gaps, and invest where depth matters.'
  }
];

export const CATEGORY_7_GLOSSARY: GlossaryItem[] = [
  { term: '360-Degree Feedback', definition: 'Performance and behavioral input collected from a circular cohort: managers, peers, direct reports, the individual, and occasionally external clients.', tool: 'Performance Appraisal' },
  { term: 'Accountable (A)', definition: 'In the RACI framework, the single individual who owns the final business outcome, holds decision veto, and signs off on deliverables.', tool: 'RACI Matrix' },
  { term: 'Action Planning (Engagement)', definition: 'The structured, decentralized process by which department managers and frontline teams convert survey findings into 1–3 concrete commitments.', tool: 'Engagement Surveys' },
  { term: 'Alignment / Fit (7S)', definition: 'The state in which an organization’s seven internal dimensions (Strategy, Structure, Systems, Values, Style, Staff, Skills) reinforce rather than contradict each other.', tool: 'McKinsey 7S' },
  { term: 'Anonymity Threshold', definition: 'The strict minimum group size (commonly 5 or more respondents) required before survey data is generated, preventing identification of individuals.', tool: 'Engagement Surveys' },
  { term: 'As-Is vs To-Be State', definition: 'In organizational design, contrasting the current observed operational reality against the required future configuration needed to achieve strategy.', tool: 'McKinsey 7S' },
  { term: 'Behaviourally Anchored Rating Scale (BARS)', definition: 'An objective appraisal methodology where each numerical rating tier (1 to 5) is defined by concrete, observable behavioral workplace examples.', tool: 'Performance Appraisal' },
  { term: 'Behavioural Competency', definition: 'Transferable, non-technical capabilities and interpersonal attributes (e.g. active collaboration, client diplomacy, problem solving) linked to superior performance.', tool: 'Competency Mapping' },
  { term: 'Behavioural Event Interview (BEI)', definition: 'A structured interview technique probing past critical workplace incidents in depth to identify behaviors that differentiate top from average performers.', tool: 'Competency Mapping' },
  { term: 'Calibration Meeting', definition: 'A structured executive session where managers review and normalize preliminary ratings to ensure equitable grading standards across teams.', tool: 'Performance Appraisal' },
  { term: 'Census Survey', definition: 'A comprehensive, organization-wide survey administered annually to the entire employee workforce to establish cultural baselines.', tool: 'Engagement Surveys' },
  { term: 'Competency', definition: 'An observable, measurable cluster of knowledge, skills, abilities, and behaviors that directly predicts high performance in a specific role.', tool: 'Competency Mapping' },
  { term: 'Competency Dictionary', definition: 'An organization’s standardized taxonomy of all functional, behavioral, and leadership competencies complete with definitions and proficiency tiers.', tool: 'Competency Mapping' },
  { term: 'Competency Gap Analysis', definition: 'The quantitative difference between assessed individual capability and required role standard: Gap = Assessed Level minus Required Level.', tool: 'Competency Mapping' },
  { term: 'Consulted (C)', definition: 'In the RACI framework, subject-matter experts whose two-way advice and technical input is sought prior to the completion of a deliverable.', tool: 'RACI Matrix' },
  { term: 'Continuous Performance Management', definition: 'A modern performance framework replacing annual-only reviews with frequent lightweight check-ins, evidence logging, and developmental feedback.', tool: 'Performance Appraisal' },
  { term: 'DACI Framework', definition: 'A decision-focused decision-rights variant of RACI: Driver (chores), Approver (single decision maker), Contributors (input), Informed (status).', tool: 'RACI Matrix' },
  { term: 'Delegation of Authority (DoA)', definition: 'A governance policy establishing financial and operational approval limits for specific roles, frequently coupled with RACI accountabilities.', tool: 'RACI Matrix' },
  { term: 'Driver Analysis (Engagement)', definition: 'Statistical correlation or multiple regression modeling identifying which workplace factors have the greatest mathematical impact on employee engagement.', tool: 'Engagement Surveys' },
  { term: 'Employee Net Promoter Score (eNPS)', definition: 'Workforce loyalty metric: % Promoters (scores 9–10) minus % Detractors (scores 0–6) on willingness to recommend the firm as a workplace.', tool: 'Engagement Surveys' },
  { term: 'Favourable Score', definition: 'The aggregated percentage of survey respondents who select the top two positive response choices (Agree or Strongly Agree) on a 5-point scale.', tool: 'Engagement Surveys' },
  { term: 'Forced Distribution (Stack Ranking)', definition: 'A rigid appraisal quota mandating fixed percentages of staff in each performance bucket; widely abandoned due to its toxic impact on collaboration.', tool: 'Performance Appraisal' },
  { term: 'Halo / Horns Effect', definition: 'Cognitive rater biases where a manager’s perception of a single positive attribute (Halo) or negative flaw (Horns) distorts evaluation across all areas.', tool: 'Performance Appraisal' },
  { term: 'Hard Elements (7S)', definition: 'The three tangible, easily documented dimensions in the McKinsey 7S Framework: Strategy, Structure, and Systems.', tool: 'McKinsey 7S' },
  { term: 'Iceberg Model', definition: 'Spencer & Spencer’s competency model showing visible skills and knowledge above the waterline, and hidden self-concept, traits, and motives below.', tool: 'Competency Mapping' },
  { term: 'Informed (I)', definition: 'In the RACI framework, stakeholders who receive one-way updates and notifications after decisions or milestones are finalized.', tool: 'RACI Matrix' },
  { term: 'Key Result Area (KRA)', definition: 'A core operational domain or accountability assigned to a role within which specific Key Performance Indicators (KPIs) are tracked.', tool: 'Performance Appraisal' },
  { term: 'Leniency / Strictness Bias', definition: 'Systematic rater error where a manager consistently grades all employees either unrealistically high (leniency) or unrealistically low (strictness).', tool: 'Performance Appraisal' },
  { term: 'Management by Objectives (MBO)', definition: 'A management model introduced by Peter Drucker in 1954 wherein performance is evaluated against specific objectives agreed upon in advance.', tool: 'Performance Appraisal' },
  { term: 'NSQF / QP-NOS', definition: 'India’s National Skills Qualification Framework and Sector Skill Councils’ Qualification Packs establishing competency standards for vocational roles.', tool: 'Competency Mapping' },
  { term: 'Performance Improvement Plan (PIP)', definition: 'A documented, time-bound (30–90 days) remedial support plan with explicit targets and coaching for underperforming staff.', tool: 'Performance Appraisal' },
  { term: 'Proficiency Level', definition: 'A standardized grading tier for a competency, commonly ranging from Level 1 (Basic/Assisted) to Level 5 (Expert/Strategic).', tool: 'Competency Mapping' },
  { term: 'Pulse Survey', definition: 'A frequent, concise survey (5–15 items) administered monthly or quarterly to track sentiment trends and monitor action-plan progress.', tool: 'Engagement Surveys' },
  { term: 'RACI Matrix', definition: 'A responsibility assignment grid listing activities in rows and roles in columns, designating R, A, C, or I to clarify operational governance.', tool: 'RACI Matrix' },
  { term: 'RAPID Framework', definition: 'Bain & Company’s decision-rights model: Recommend, Agree, Perform, Input, and Decide.', tool: 'RACI Matrix' },
  { term: 'RASCI Matrix', definition: 'An expanded version of RACI that includes "Support" (S) for roles providing dedicated assistance or tools to the Responsible worker.', tool: 'RACI Matrix' },
  { term: 'Recency Bias', definition: 'A rater cognitive bias wherein managers over-weight events that occurred in the 30–60 days preceding the evaluation while forgetting earlier contributions.', tool: 'Performance Appraisal' },
  { term: 'Responsible (R)', definition: 'In the RACI framework, the role or individuals who actually perform the operational work to complete the deliverable.', tool: 'RACI Matrix' },
  { term: 'Role Profile (Competency)', definition: 'The target capability specification establishing the precise competencies and required proficiency levels (1–5) for a given job title.', tool: 'Competency Mapping' },
  { term: 'SFIA (Skills Framework for the Information Age)', definition: 'The global standard framework defining technical skills and competency levels for information technology and digital engineering roles.', tool: 'Competency Mapping' },
  { term: 'Shared Values (Superordinate Goals)', definition: 'The foundational cultural beliefs and central guiding purpose positioned at the core of the McKinsey 7S Framework.', tool: 'McKinsey 7S' },
  { term: 'Soft Elements (7S)', definition: 'The four cultural and interpersonal dimensions in the McKinsey 7S model: Shared Values, Style, Staff, and Skills.', tool: 'McKinsey 7S' },
  { term: 'Style (7S)', definition: 'The observed behavioral patterns, leadership norms, and cultural environment fostered by senior executives within an organization.', tool: 'McKinsey 7S' },
  { term: 'Team Skills Heat Map', definition: 'A visual matrix mapping team members against required competencies, instantly exposing team skill deficiencies and training priorities.', tool: 'Competency Mapping' }
];
