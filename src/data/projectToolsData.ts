import { ToolDefinition, StrategyStack, ScenarioMission, GlossaryItem } from './toolsData.ts';

export const PROJECT_TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'gantt',
    name: 'Gantt Chart & Visual Milestone Scheduling',
    shortName: 'Gantt Chart',
    category: 'Project Management',
    tagline: 'Time-scaled horizontal bar chart linking tasks, dependencies, and milestones',
    origin: 'Developed by Henry L. Gantt (c. 1910–1915); earlier bar-chart schedules originated with Polish engineer Karol Adamiecki in 1896 as the harmonogram.',
    corePurpose: 'Make a project schedule visible so that sponsors, cross-functional teams, and external contractors share a unified, time-scaled model of task sequences, dependencies, and delivery gates.',
    primaryUsers: ['Project Managers', 'Program Directors', 'Operations Leaders', 'General Contractors', 'Executive Sponsors'],
    difficulty: 'Beginner',
    horizon: 'Weeks, Months, or Multi-Year Programs',
    scope: 'Single Initiative, Capital Program, or Cross-Department Project',
    timeToResult: '2–4 hours with defined task list and dependencies',
    dataNeeds: 'Work Breakdown Structure (WBS), task durations, named owners, predecessors, and calendar non-working days',
    keyOutput: 'Time-scaled visual schedule, critical milestones, baseline vs actual variance tracking, and dependency chain',
    bestPairedWith: 'Critical Path Method (CPM), Work Breakdown Structure (WBS), Scrum (for sprint roadmaps), RACI Matrix',
    keyFeatures: [
      'Hierarchical Work Breakdown Structure (WBS) decomposing scope into summary packages and 1–10 day work tasks',
      'Dependency linkages: Finish-to-Start (FS), Start-to-Start (SS), Finish-to-Finish (FF), and Start-to-Finish (SF)',
      'Lags (+delay e.g. concrete curing or legal review) and Leads (-overlap between tasks) on dependency links',
      'Zero-duration milestone diamonds marking major approvals, regulatory clearances, and payment triggers',
      'Baseline preservation: freezing the approved schedule to quantify schedule variance and slippage over time',
      'Percent complete tracking to visually contrast planned schedule progress against actual frontline completion'
    ],
    howItWorks: 'Begin with a one-sentence project charter and decompose project deliverables into bite-sized work packages (1–10 days). Enter each task with a single accountable owner and estimated duration. Connect tasks with logical dependency links (predominantly Finish-to-Start) and apply explicit lags for waiting times rather than creating artificial dummy tasks. Insert zero-duration milestone gates for executive approvals. Save the approved baseline before kickoff. During execution, update task percent-complete and actual dates weekly; the dependency engine automatically ripples upstream delays downstream to reflect the true forecast date.',
    coreConcepts: [
      {
        term: 'Work Breakdown Structure (WBS)',
        definition: 'Hierarchical decomposition of the total project scope into manageable summary packages and discrete deliverables.'
      },
      {
        term: 'Dependency Links (FS / SS / FF)',
        definition: 'Logical precedence rules between tasks: Finish-to-Start (default), Start-to-Start (parallel work), and Finish-to-Finish (synchronized close).'
      },
      {
        term: 'Lag & Lead Time',
        definition: 'Lag is an enforced delay on a link (e.g. +7 days paint curing); lead is an intentional overlap allowing successor work to start early.'
      },
      {
        term: 'Schedule Baseline',
        definition: 'The frozen, approved original plan against which actual progress, delays, and slippage are objectively measured.'
      },
      {
        term: 'Milestone (Zero Duration)',
        definition: 'A key transition event, client sign-off, or stage-gate with 0 days duration used for executive status reporting.'
      }
    ],
    strengths: [
      'Universally understood by non-technical stakeholders, clients, boards, and subcontractors',
      'Clearly exposes cross-team handoffs and sequencing constraints on a single visual timeline',
      'Enables rapid baseline variance analysis and early warning of downstream deadline threats'
    ],
    limitations: [
      'Can become unwieldy and hard to maintain if broken down into hundreds of micro-tasks',
      'Does not inherently communicate uncertainty or probabilistic duration ranges (unlike PERT)',
      'Static bar charts easily degenerate into decorative shelfware if not updated weekly'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Project Charter, Scope Statement, and Work Breakdown Structure (WBS)',
      downstream: 'Feeds Critical Path Method (CPM), resource allocation matrices, executive dashboards, and vendor contracts'
    },
    useCases: [
      {
        title: 'Manufacturing Line Commissioning',
        situation: 'Automotive tier-1 supplier installing a CNC machining cell with ₹2 lakh/week late delivery penalties.',
        problem: 'Past projects slipped 8 weeks because civil floor foundations, equipment shipping, and power sanctions were planned in silos.',
        action: 'Built a 38-task Gantt with FS links and a 14-day curing lag; escalated power substation approval in week 2.',
        outcome: 'Delivered in week 21 (only 1 week late vs 8 historically); avoided ₹14 lakh in penalty exposure.'
      },
      {
        title: 'ERP Software Rollout across 4 Plants',
        situation: 'Mid-market manufacturing group rolling out cloud ERP to finance, warehouse, and production units.',
        problem: 'Department heads were scheduling data migrations simultaneously without shared infrastructure readiness.',
        action: 'Created a multi-stream Gantt chart with staggered migration milestones and shared technical review gates.',
        outcome: 'Completed migration across all 4 plants in 9 months with zero factory downtime and 100% data audit compliance.'
      },
      {
        title: 'New Branch Retail Fit-out',
        situation: 'Commercial banking network opening 15 urban branches within a single fiscal quarter.',
        problem: 'Vendor handoffs between HVAC, civil drywall, and IT networking frequently collided on-site.',
        action: 'Standardized a 25-task branch fit-out Gantt template with mandatory milestone signoffs before subsequent trades entered.',
        outcome: 'Reduced average branch fit-out time from 48 days to 31 days, saving ₹18 lakh in early store lease costs.'
      }
    ],
    caseStudy: {
      company: 'Meenakshi Precision Tools (Madurai, Tamil Nadu)',
      revenue: '₹42 Crore ($5.1M)',
      staff: '90 Employees',
      profile: 'Tier-2 precision automotive component manufacturer producing transmission and braking parts for domestic OEMs.',
      challenge: 'Won a prestigious contract to install a robotic CNC machining cell within 20 weeks. A ₹2 lakh/week penalty applied for every week of delay. Previous line installations had slipped by 6 to 10 weeks due to uncoordinated vendor handoffs.',
      whyChosen: 'Gantt charting with linked dependencies was selected to synchronize civil work, machinery shipping from Germany, electrical power sanction, and customer PPAP audits.',
      steps: [
        'Conducted a joint WBS workshop with machine vendors, civil engineers, and internal operations to decompose the project into 38 discrete tasks.',
        'Established explicit Finish-to-Start dependency linkages, applying a mandatory 14-day chemical curing lag on heavy machine foundation pads.',
        'Flagged the state power utility substation sanction as a zero-duration critical milestone and assigned a dedicated liaison officer.',
        'Saved the approved 20-week baseline and instituted a weekly 30-minute Monday morning review with all task owners physically present.',
        'When electrical panel shipping slipped by 5 days, fast-tracked operator safety training concurrently via a Start-to-Start link.'
      ],
      results: [
        'Commissioned the CNC robotic cell in Week 21 (just 1 week late vs historical 8-week slips).',
        'Reduced penalty exposure from an expected ₹16 lakh to ₹2 lakh, preserving operating margins.',
        'OEM client certified the line on first audit and awarded an additional ₹8 Crore annual volume.'
      ],
      lessonsLearned: [
        'Never type hard dates into Gantt tasks; always link them so upstream shifts automatically highlight downstream impacts.',
        'Assign each task to a single named person rather than a generic department to prevent bystander apathy.',
        'Keep the executive leadership view limited to 8–10 milestones while frontline teams manage the detailed 38-task schedule.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Signed Project Charter with defined scope boundaries and agreed final delivery date',
        'Decomposed Work Breakdown Structure (WBS) with deliverables broken into 1–10 day packages',
        'Confirmed availability of named task leads and key supplier lead-time estimates'
      ],
      steps: [
        'Define the final milestone and work packages across phases (Planning, Procurement, Execution, Testing, Handover).',
        'Enter tasks, assign single owners, and apply estimated durations based on team consensus or historical data.',
        'Connect tasks with logical dependencies (predominantly Finish-to-Start) and insert curing/transit lags where necessary.',
        'Add zero-duration milestone gates for design freezes, regulatory approvals, and stage-gate payments.',
        'Audit the schedule calendar to account for weekends, public holidays, and maintenance shutdowns.',
        'Freeze the approved schedule as Baseline 1.0 and configure weekly tracking dashboards.'
      ],
      checklist: [
        'Every task has an individual owner (a name, not a generic team)',
        'All tasks except Start and Finish have at least one predecessor and successor',
        'No tasks contain hardcoded dates; dates derive dynamically from dependency links',
        'Lags are applied for chemical curing, shipping, and statutory notice periods',
        'Baseline snapshot is frozen and timestamped prior to project execution kickoff',
        'Weekly review cadence is scheduled and placed on all team leads calendars'
      ],
      commonMistakes: [
        {
          mistake: 'Drawing static bars in graphic software instead of linking dynamic dependencies',
          fix: 'Use a dynamic schedule engine where moving one task automatically shifts all downstream successors.'
        },
        {
          mistake: 'Silently re-baselining the schedule whenever tasks slip to keep the status green',
          fix: 'Never erase variance; re-baseline only through a formal, sponsor-approved change request.'
        },
        {
          mistake: 'Creating a 500-task monstrosity that requires full-time administrative maintenance',
          fix: 'Keep tasks between 1 and 10 days; collapse sub-tasks into summary packages for executive views.'
        }
      ],
      plan306090: {
        d30: 'Standardize WBS and Gantt template across the team; establish baseline for the highest-priority project.',
        d60: 'Enforce weekly Monday variance tracking; configure milestone-only view for senior executive steering committee.',
        d90: 'Integrate Gantt schedules with CPM float analysis and resource leveling across all simultaneous departmental initiatives.'
      },
      proTips: [
        'Never build a Gantt chart in isolation at a desk; frontline task owners must validate durations and handoffs.',
        'Use explicit lag on dependency links rather than creating artificial dummy tasks called "waiting".',
        'Create a one-page milestone view with 6–10 major diamonds for executive sponsors and board members.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Scrum or Kanban',
        reason: 'Exploratory software development or product discovery where requirements change weekly and fixed long-range sequencing is impractical.'
      },
      {
        alternative: 'Simple Checklist or Action Log',
        reason: 'Small tasks or quick operational initiatives with fewer than 8 steps where building and maintaining a Gantt chart is unnecessary overhead.'
      },
      {
        alternative: 'PERT Three-Point Estimation',
        reason: 'High-uncertainty research or novel prototype development where single-point duration estimates give false confidence.'
      }
    ],
    reflectionPrompts: [
      'If your project slipped by 10 days today, does your current Gantt chart automatically identify which future deliverables are threatened?',
      'Are task owners reviewing actual progress against the frozen original baseline, or are dates being silently shifted?',
      'Do you have zero-duration milestones positioned at critical cash payment gates and customer approvals?'
    ],
    quickReferenceCard: [
      'Default Link: Finish-to-Start (FS) — Successor starts only after predecessor completes',
      'Milestone: Duration = 0 days — Diamond marker for approvals, gates, and key deliveries',
      'Lag (+N days): Mandatory delay (curing, drying, shipping) built into dependency link',
      'Lead (-N days): Intentional overlap allowing successor to start before predecessor finishes',
      'Baseline: Frozen reference snapshot used to calculate schedule variance (SV = Planned − Actual)'
    ],
    quiz: [
      {
        id: 'gantt-q1',
        question: 'What is the default and most common dependency relationship between two tasks in a Gantt chart?',
        options: ['Start-to-Start (SS)', 'Finish-to-Start (FS)', 'Finish-to-Finish (FF)', 'Start-to-Finish (SF)'],
        correctAnswer: 1,
        explanation: 'Finish-to-Start (FS) is the default: the successor task cannot begin until its predecessor has finished.'
      },
      {
        id: 'gantt-q2',
        question: 'In standard project management practice, what is the duration of a project milestone?',
        options: ['1 working day', 'Half a working day', 'Zero duration', 'The average duration of preceding tasks'],
        correctAnswer: 2,
        explanation: 'A milestone is a zero-duration event marking an approval, decision, delivery, or major transition point in time.'
      },
      {
        id: 'gantt-q3',
        question: 'What is a project schedule "baseline"?',
        options: [
          'The very first task on the Gantt chart',
          'The approved original schedule snapshot preserved to measure variance against actual performance',
          'The critical path of the project',
          'The financial budget allocation for labor'
        ],
        correctAnswer: 1,
        explanation: 'The baseline is the frozen, approved original plan against which actual progress and variance are systematically tracked.'
      },
      {
        id: 'gantt-q4',
        question: 'A 7-day waiting period between "Wall Painting Complete" and "Furniture Delivery" is best modelled in a Gantt chart as:',
        options: [
          'A separate dummy task called "Waiting"',
          'A 7-day lag applied to the Finish-to-Start dependency link',
          'A milestone named "Paint Drying"',
          'A negative lead time of 7 days'
        ],
        correctAnswer: 1,
        explanation: 'Lag represents a mandatory delay or waiting period on a dependency link without cluttering the schedule with non-work dummy tasks.'
      },
      {
        id: 'gantt-q5',
        question: 'What is the single most common reason Gantt charts fail to deliver value in practice?',
        options: [
          'They use too many colors and visual bars',
          'They cannot represent task dependencies',
          'They are treated as a one-time launch artifact and never updated after publication',
          'They cannot be exported into PDF reports'
        ],
        correctAnswer: 2,
        explanation: 'Gantt charts that are not maintained weekly lose credibility within weeks and degenerate into decorative shelfware.'
      }
    ]
  },
  {
    id: 'cpm',
    name: 'Critical Path Method (CPM)',
    shortName: 'Critical Path (CPM)',
    category: 'Project Management',
    tagline: 'Deterministic mathematical algorithm identifying zero-slack tasks that dictate project completion date',
    origin: 'Developed in 1957 by Morgan R. Walker (DuPont) and James E. Kelley Jr. (Remington Rand) to manage plant maintenance shutdowns.',
    corePurpose: 'Identify the exact chain of dependent tasks with zero float that governs the project completion date, enabling precise schedule compression (crashing and fast-tracking).',
    primaryUsers: ['Project Managers', 'Operations Directors', 'Construction Engineers', 'PMO Leaders', 'Plant Turnaround Managers'],
    difficulty: 'Intermediate',
    horizon: 'Project Execution Lifecycle (Weeks to Multi-Year)',
    scope: 'Complex Capital Projects, Plant Overhauls, and Sequential Systems',
    timeToResult: '2–4 hours with activity duration and precedence network',
    dataNeeds: 'Activity list, discrete deterministic durations, and immediate predecessor dependencies',
    keyOutput: 'Earliest/latest start & finish dates, total float, free float, critical path identification, and crashing cost curve',
    bestPairedWith: 'Gantt Chart (visual timeline), PERT (for uncertainty), Earned Value Management (cost/schedule control)',
    keyFeatures: [
      'Activity-on-Node (AON) precedence network representation depicting topological work flows',
      'Forward Pass calculation computing Earliest Start (ES) and Earliest Finish (EF) times',
      'Backward Pass calculation computing Latest Start (LS) and Latest Finish (LF) times',
      'Total Float quantification (LS − ES = LF − EF): slack available without delaying final project delivery',
      'Free Float calculation: slack available without delaying the early start of any immediate successor',
      'Schedule compression engine: evaluating crashing (overtime/added crew cost) versus fast-tracking (parallel risk)'
    ],
    howItWorks: 'List all project activities with known deterministic durations and immediate predecessors. Carry out a Forward Pass from Start to Finish to calculate the Earliest Start (ES) and Earliest Finish (EF) for each node, establishing the minimum feasible project duration. Carry out a Backward Pass from Finish to Start to determine Latest Finish (LF) and Latest Start (LS). Calculate Total Float for each activity (Total Float = LS − ES). Any activity with Total Float = 0 lies on the Critical Path. If the project must be finished earlier, evaluate crashing the critical activity with the lowest marginal crash cost per day.',
    coreConcepts: [
      {
        term: 'Critical Path',
        definition: 'The longest continuous chain of dependent activities through a network; tasks on this path have zero total float and dictate the minimum total duration.'
      },
      {
        term: 'Total Float (Slack)',
        definition: 'The duration an activity can slip or be delayed without extending the final project completion date: Total Float = LS − ES = LF − EF.'
      },
      {
        term: 'Free Float',
        definition: 'The duration an activity can slip without delaying the Early Start of any immediately succeeding activity: Free Float = min(ES of successors) − EF.'
      },
      {
        term: 'Crashing',
        definition: 'Adding resources (overtime, extra shifts, expediting) to critical-path activities to shorten schedule duration at minimum marginal cost.'
      },
      {
        term: 'Fast-Tracking',
        definition: 'Converting sequential activities into parallel or overlapping streams to save time, accepting increased rework risk.'
      }
    ],
    strengths: [
      'Provides a deterministic, mathematically provable project completion date',
      'Directs 100% of executive scrutiny and resource acceleration to the true bottleneck tasks',
      'Prevents wasting overtime capital on high-float non-critical tasks that do not accelerate delivery'
    ],
    limitations: [
      'Assumes deterministic, exact task durations and ignores statistical variance',
      'Near-critical paths with low float can quickly turn critical and surprise managers',
      'Does not automatically account for shared resource bottlenecks without resource leveling'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Work Breakdown Structure (WBS) and engineering sequence estimates',
      downstream: 'Feeds Gantt schedules, crashing budget authorizations, procurement contracts, and weekly risk reviews'
    },
    useCases: [
      {
        title: 'Industrial Plant Shutdown Overhaul',
        situation: 'Chemical manufacturing facility undertaking a mandatory 14-day turnaround with ₹15 lakh/day lost production.',
        problem: 'Over 120 inspection and valve overhaul tasks competing for 2 crane crews and certified welders.',
        action: 'Built an AON network, mapped the 14-day critical path, and shifted non-critical vessel painting to high-float windows.',
        outcome: 'Completed shutdown in 12.5 days, returning the plant to service 36 hours ahead of schedule.'
      },
      {
        title: 'Automated Warehouse Commissioning',
        situation: 'Logistics operator deploying a 120,000 sq.ft. fulfillment center with a firm tenant move-in date.',
        problem: 'Racking assembly was falling behind; vendor offered a ₹3 lakh overtime crew to crash duration by 1 week.',
        action: 'Ran CPM analysis: confirmed racking had zero float while parallel IT setup had 2 weeks of float; crash yielded ₹5 lakh net lease savings.',
        outcome: 'Authorized the ₹3 lakh crash; saved 1 full week and preserved ₹5 lakh in early storage revenue.'
      },
      {
        title: 'Hospital Diagnostic Wing Expansion',
        situation: 'Tertiary hospital installing an advanced MRI and CT scanner suite within an active medical facility.',
        problem: 'Strict radiation shielding, municipal licensing, and clinical handover had to finish before medical staff onboarding.',
        action: 'Applied CPM backward pass from the licensing deadline; identified shielding inspection as the zero-float bottleneck.',
        outcome: 'Fast-tracked pre-inspections with the municipal nuclear safety board, preventing a 3-week clinical delay.'
      }
    ],
    caseStudy: {
      company: 'Vaigai Event Partners (Madurai, Tamil Nadu)',
      revenue: '₹18 Crore ($2.2M)',
      staff: '45 Full-Time + 120 Seasonal',
      profile: 'Commercial event management and trade exhibition infrastructure contractor specializing in large industrial expos.',
      challenge: 'Contracted to build a 2-day state-level EdTech expo with 80 exhibitor stalls, an air-conditioned auditorium, and VIP security gates within a strict 60-hour venue access window. Contracts carried severe delay penalties of ₹50,000 per hour of delay.',
      whyChosen: 'CPM was selected to identify the hourly critical path and allocate expensive night-shift overtime strictly to bottleneck tasks.',
      steps: [
        'Mapped 47 discrete venue fit-out tasks in hours, identifying predecessor dependencies and equipment availability.',
        'Ran the CPM forward pass: the initial network showed a 71-hour duration—11 hours late against the 60-hour deadline.',
        'Identified the critical path: Main Electrical Cabling → Auditorium Truss Rigging → Sound/Light Calibration → Fire Safety Inspection.',
        'Fast-tracked stall partitions into two parallel zones with an extra contractor team, cutting 6 hours at zero extra cost.',
        'Crashed auditorium lighting rigging by paying ₹15,000 for a certified rigger night crew, cutting 4 hours on the zero-float path.',
        'Pre-fabricated modular registration backdrops off-site at the workshop, shaving another 3 hours.'
      ],
      results: [
        'Delivered the completed venue in 57 hours, providing a 3-hour buffer before the official fire department inspection.',
        'Overtime payroll dropped by 40% because night shifts were eliminated on high-float non-critical tasks.',
        'Achieved a 100% on-time opening ceremony with state ministerial dignitaries present.'
      ],
      lessonsLearned: [
        'Never crash an activity that has float; crashing a non-critical task wastes capital without moving the project finish date.',
        'Explore zero-cost fast-tracking (parallel zoning) before authorizing expensive contractor overtime.',
        'Monitor near-critical tasks (float ≤ 2 hours) on an active watch list during rapid turnaround projects.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Exhaustive activity inventory derived from the project WBS',
        'Single-point deterministic duration estimates for each activity',
        'Clear predecessor and successor logical links with no circular loops'
      ],
      steps: [
        'Construct the Activity-on-Node (AON) network logic table with activity IDs, durations, and predecessors.',
        'Execute the Forward Pass: calculate Early Start (ES) and Early Finish (EF) left-to-right from Day 0.',
        'Determine minimum project duration at the final node; set Late Finish (LF) of project end equal to this date.',
        'Execute the Backward Pass: calculate Late Finish (LF) and Late Start (LS) right-to-left.',
        'Calculate Total Float (LS − ES) and Free Float; flag all zero-float activities as the Critical Path.',
        'If the target date is missed, identify crashing candidates ranked by lowest crash cost per unit time saved.'
      ],
      checklist: [
        'Every activity has at least one predecessor and successor (except Start and Finish nodes)',
        'No circular dependency loops exist within the network structure',
        'Forward and backward pass results reconcile mathematically at the final node',
        'Critical Path is continuous from the first node to the final project deliverable',
        'Near-critical activities with float ≤ 2 days are placed on a high-alert watch list',
        'Crashing cost table is calculated before committing overtime or extra shifts'
      ],
      commonMistakes: [
        {
          mistake: 'Crashing tasks with high float to "look productive"',
          fix: 'Only crash zero-float tasks on the active critical path; crashing float tasks yields zero project acceleration.'
        },
        {
          mistake: 'Ignoring near-critical paths that become critical after a 1-day slip',
          fix: 'Recalculate the critical path weekly; monitor secondary paths with float ≤ 3 days.'
        },
        {
          mistake: 'Failing to check if crashing one task causes multiple new paths to turn critical simultaneously',
          fix: 'Recalculate float after each incremental crash step before approving further overtime expenditure.'
        }
      ],
      plan306090: {
        d30: 'Build CPM network logic for current core project; identify zero-float bottleneck tasks.',
        d60: 'Implement weekly float-consumption tracking; train project team on fast-tracking versus crashing trade-offs.',
        d90: 'Institutionalize automated CPM calculations and crashing cost optimization across the PMO.'
      },
      proTips: [
        'Always use the Day-0 convention (ES=0, EF=Duration) to prevent off-by-one errors during hand calculations.',
        'If a critical task slips, look for fast-tracking opportunities (SS links) before paying vendor overtime.',
        'Present the critical path as a single-page flow diagram to executive sponsors to justify project investments.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'PERT (Program Evaluation & Review Technique)',
        reason: 'Research, advanced R&D, or novel software where durations are deeply unpredictable and three-point probabilistic modeling is essential.'
      },
      {
        alternative: 'Scrum / Agile Sprints',
        reason: 'Product discovery or software development where requirements are iteratively shaped and fixed sequential networks do not apply.'
      },
      {
        alternative: 'Simple Gantt or Kanban Board',
        reason: 'Small projects under ~10 tasks where precedence networks are obvious and formal CPM calculation adds unnecessary complexity.'
      }
    ],
    reflectionPrompts: [
      'Are you spending overtime and management attention on critical tasks, or are non-critical tasks consuming resources?',
      'How much total float exists on your near-critical paths before they replace your primary critical path?',
      'What is the marginal crash cost per day saved across your project’s critical path vendors?'
    ],
    quickReferenceCard: [
      'Early Start (ES): max(EF of all immediate predecessors)',
      'Early Finish (EF): ES + Duration',
      'Late Finish (LF): min(LS of all immediate successors)',
      'Late Start (LS): LF − Duration',
      'Total Float: LS − ES = LF − EF (slack before project finish slips)',
      'Critical Path: Continuous sequence of tasks where Total Float = 0'
    ],
    quiz: [
      {
        id: 'cpm-q1',
        question: 'By mathematical definition, what is the Total Float of an activity on the Critical Path?',
        options: ['Equal to its duration', 'Zero', 'Negative', 'Infinite'],
        correctAnswer: 1,
        explanation: 'Activities on the critical path have zero total float (slack); any delay on these activities immediately extends the project completion date.'
      },
      {
        id: 'cpm-q2',
        question: 'During the CPM Backward Pass, how is the Late Finish (LF) of an activity determined when it has multiple successors?',
        options: [
          'The maximum of the Late Starts of all immediate successors',
          'The minimum of the Late Starts of all immediate successors',
          'The average duration of all successors',
          'The Early Finish of the final project milestone'
        ],
        correctAnswer: 1,
        explanation: 'In the backward pass, Late Finish (LF) is the minimum (earliest) of the Late Starts (LS) of all immediate successors.'
      },
      {
        id: 'cpm-q3',
        question: 'What is the key operational difference between Total Float and Free Float?',
        options: [
          'Total Float delays the project finish; Free Float does not delay the early start of any successor',
          'Free Float applies only to milestones',
          'Total Float is calculated on the forward pass; Free Float on the backward pass',
          'There is no difference; they are interchangeable terms'
        ],
        correctAnswer: 0,
        explanation: 'Total Float is the delay possible without moving the overall project deadline; Free Float is the delay possible without affecting the Early Start of any succeeding task.'
      },
      {
        id: 'cpm-q4',
        question: 'What happens if a project manager spends budget crashing an activity that has 3 weeks of total float?',
        options: [
          'The overall project finish date is shortened by 3 weeks',
          'The project finish date does not change at all, wasting financial capital',
          'The critical path is doubled',
          'The project budget automatically decreases'
        ],
        correctAnswer: 1,
        explanation: 'Crashing an activity with float shortens a non-critical task; since it does not lie on the critical path, the project completion date remains unchanged.'
      },
      {
        id: 'cpm-q5',
        question: 'What is the schedule compression technique known as "Fast-Tracking"?',
        options: [
          'Paying workers overtime on critical path tasks',
          'Overlapping or performing in parallel activities that were originally planned in sequence',
          'Deleting scope deliverables from the project charter',
          'Hiring external consultants to write status reports'
        ],
        correctAnswer: 1,
        explanation: 'Fast-tracking compresses schedules by running sequential activities in parallel, saving time at the expense of higher coordination risk and potential rework.'
      }
    ]
  },
  {
    id: 'pert',
    name: 'Program Evaluation & Review Technique (PERT)',
    shortName: 'PERT Chart',
    category: 'Project Management',
    tagline: 'Probabilistic three-point estimation and Beta distribution model for high-uncertainty initiatives',
    origin: 'Developed in 1958 by the U.S. Navy Special Projects Office, Booz Allen Hamilton, and Lockheed for the Polaris missile project.',
    corePurpose: 'Incorporate schedule uncertainty into project planning by computing weighted expected durations (TE), project standard deviation (σ), and normal distribution Z-scores to quantify deadline completion probabilities.',
    primaryUsers: ['Program Managers', 'R&D Directors', 'Software Architects', 'Aerospace & Defense Engineers', 'Enterprise PMO Leads'],
    difficulty: 'Advanced',
    horizon: 'R&D, Clinical, or Complex Engineering Lifecycles (Months to Years)',
    scope: 'High-Uncertainty Programs, Pioneer Technology, and First-of-a-Kind Projects',
    timeToResult: '3–6 hours with cross-functional estimating panels',
    dataNeeds: 'Three-point duration estimates (Optimistic, Most Likely, Pessimistic) for all critical activities and precedence linkages',
    keyOutput: 'Expected duration (TE), activity variances (σ²), project standard deviation (σ_proj), and Z-score completion confidence curves',
    bestPairedWith: 'Critical Path Method (CPM), Monte Carlo Simulation, Risk Register, Gantt Chart',
    keyFeatures: [
      'Three-point duration estimation: Optimistic (O), Most Likely (M), and Pessimistic (P)',
      'Beta distribution weighted expected duration: TE = (O + 4M + P) ÷ 6',
      'Activity variance calculation: σ² = [(P − O) ÷ 6]² to isolate statistical uncertainty',
      'Project standard deviation: σ_proj = √[Σ(critical path activity variances)]',
      'Normal distribution Z-score calculator: Z = (Target Deadline − TE_project) ÷ σ_proj',
      'Top-variance risk ranking identifying which specific tasks contribute the most uncertainty to the delivery date'
    ],
    howItWorks: 'For every project task, gather three duration estimates from experienced domain practitioners: Optimistic (O, 1-in-100 best case), Most Likely (M, normal modal outcome), and Pessimistic (P, 1-in-100 worst case excluding catastrophes). Calculate the Expected Time TE = (O + 4M + P)/6 and variance σ² = ((P − O)/6)². Sum the expected times along the critical path to find the total project expected duration TE_proj. Sum the variances of all critical path activities and take the square root to calculate project standard deviation σ_proj. Calculate the Z-score for any contractual target date: Z = (Target − TE_proj)/σ_proj. Use standard normal distribution tables to convert Z into a probability (e.g. Z = 0 gives 50%, Z = 1.28 gives 90%, Z = 1.64 gives 95%). Focus risk mitigation on the activities with the largest variance values.',
    coreConcepts: [
      {
        term: 'Three-Point Estimating (O, M, P)',
        definition: 'Capturing duration uncertainty across three scenarios: Optimistic (O), Most Likely (M), and Pessimistic (P).'
      },
      {
        term: 'PERT Expected Time (TE)',
        definition: 'The statistically weighted mean duration using the Beta distribution: TE = (O + 4M + P) / 6.'
      },
      {
        term: 'Activity Variance (σ²)',
        definition: 'The mathematical dispersion of an activity duration: σ² = [(P − O) / 6]²; wide spreads indicate high uncertainty.'
      },
      {
        term: 'Project Standard Deviation (σ_proj)',
        definition: 'The overall schedule risk: σ_proj = √[Σ(critical path activity variances)]; variances add, standard deviations do not.'
      },
      {
        term: 'Z-Score & Probability',
        definition: 'The number of standard deviations a target date lies from the mean: Z = (Target − TE) / σ; maps directly to completion probability.'
      }
    ],
    strengths: [
      'Replaces single-point guesses with statistically defensible completion probability curves',
      'Protects teams from signing commercial contracts with low (<50%) probability of delivery',
      'Pinpoints the exact tasks driving 80% of schedule risk through variance contribution analysis'
    ],
    limitations: [
      'Requires experienced estimators; optimistic and pessimistic bounds can be biased or manipulated',
      'Assumes the critical path remains stable (can suffer from Merge Bias when parallel paths converge)',
      'More mathematically demanding than simple Gantt or CPM charts'
    ],
    workflowPlacement: {
      upstream: 'Takes input from R&D scoping, technical risk registers, and expert Delphi estimating panels',
      downstream: 'Feeds commercial contract negotiations, executive risk reserves, milestone roadmaps, and contingency budgets'
    },
    useCases: [
      {
        title: 'Payments Gateway Cloud Migration',
        situation: 'FinTech provider committing to an enterprise bank client for a complex core payments migration.',
        problem: 'Commercial sales promised 10-week delivery; engineering calculated TE = 11.5 weeks with σ = 1.5 weeks (Z = −1.0, only 16% probability!).',
        action: 'Used PERT curve to negotiate a 13.5-week contract (91% confidence) with an initial 10-week phased MVP for core UPI rails.',
        outcome: 'Delivered MVP in week 10 and full migration in week 13; avoided ₹12 lakh in contractual delay penalties.'
      },
      {
        title: 'New Medical Device Clinical Trials',
        situation: 'Biomedical startup conducting phase-2 clinical trials for a non-invasive glucose monitor.',
        problem: 'Patient recruitment and regulatory ethics board reviews exhibited extreme duration volatility.',
        action: 'Applied PERT three-point estimates; identified regulatory clearance (O=4w, M=12w, P=28w) as driving 72% of total project variance.',
        outcome: 'Co-located clinical documentation team with the ethics board, collapsing pessimistic estimate from 28 to 14 weeks.'
      },
      {
        title: 'Custom Defense Avionics Subsystem',
        situation: 'Aerospace supplier building an embedded radar signal processing board with new FPGA chipsets.',
        problem: 'Firm-fixed-price tender required committing to delivery dates before silicon prototypes were manufactured.',
        action: 'Ran PERT variance modeling across 18 critical path activities; added schedule contingency buffer based on 95% confidence level.',
        outcome: 'Won government tender with defensible milestone timeline and completed project with zero liquidated damages.'
      }
    ],
    caseStudy: {
      company: 'Pandiyan Digital Learning (Madurai, Tamil Nadu)',
      revenue: '₹22 Crore ($2.7M)',
      staff: '70 Employees',
      profile: 'EdTech software provider delivering enterprise online learning and proctored examination platforms to universities.',
      challenge: 'Contracted to build a custom AI-proctored examination module for a state university consortium within 16 weeks. The client contract imposed a ₹1 lakh per week penalty for late delivery. Past development projects had suffered 50% schedule overruns due to unforeseen API integration hurdles with legacy university databases.',
      whyChosen: 'PERT analysis was selected to replace subjective engineering estimates with probabilistic confidence curves and isolate the tasks contributing the highest variance.',
      steps: [
        'Conducted a 3-point estimating workshop with senior backend engineers, frontend leads, and database administrators across 12 critical activities.',
        'Calculated Expected Time (TE) and variance (σ²) for each task using the Beta distribution formulas.',
        'Summed critical path expected times to find TE_proj = 14.8 weeks, with a project standard deviation σ_proj = 1.8 weeks.',
        'Calculated Z-score for the 16-week client deadline: Z = (16 − 14.8) / 1.8 = 0.67, representing a 74.86% probability of on-time delivery.',
        'Conducted a top-variance audit: identified that "Legacy University SIS Data Connector" accounted for 58% of the total project variance (O=2w, M=4w, P=12w; variance = 2.78).',
        'Mitigated the top variance by licensing a pre-built commercial SIS connector for ₹2.5 lakh, collapsing the pessimistic duration to 5 weeks and boosting 16-week delivery probability to 93%.'
      ],
      results: [
        'Delivered the fully tested exam platform in Week 15.2, comfortably beating the 16-week contractual deadline.',
        'Avoided all penalty liabilities and earned a ₹3 lakh early-delivery bonus from the university syndicate.',
        'Adopted PERT three-point estimation as standard policy for all enterprise software proposals over ₹50 lakh.'
      ],
      lessonsLearned: [
        'Committing to a single-number deadline without knowing the confidence probability is an executive gamble.',
        'To reduce project delivery risk, focus mitigation capital on the single task with the highest variance, not just the longest task.',
        'Commercial contracts should never be signed at under 80% statistical probability without explicit executive risk acceptance.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Defined scope with established activity sequence and critical path',
        'Access to experienced technical leads capable of providing unbiased 3-point estimates',
        'Historical benchmarks or parametric data to guide optimistic and pessimistic bounds'
      ],
      steps: [
        'Identify the critical path activities using standard network logic.',
        'Collect Optimistic (O), Most Likely (M), and Pessimistic (P) estimates for each activity from estimating panels.',
        'Compute Expected Time TE = (O + 4M + P) / 6 and Variance σ² = ((P − O) / 6)² for each activity.',
        'Calculate Total Project Expected Duration (TE_proj = Σ TE) and Project Standard Deviation (σ_proj = √Σ σ²).',
        'Calculate Z-score for required target deadline: Z = (Target − TE_proj) / σ_proj.',
        'Look up Z on the standard normal distribution table to determine completion probability.',
        'Rank activities by variance contribution to identify top-priority risk mitigation candidates.'
      ],
      checklist: [
        'Optimistic estimate represents a true 1-in-100 best-case scenario (not average good luck)',
        'Pessimistic estimate represents a 1-in-100 worst case (excluding catastrophic force majeure)',
        'Only variances of activities on the critical path are summed to find project standard deviation',
        'Contractual commitments are benchmarked against 80%, 90%, and 95% confidence targets',
        'Top 3 variance-contributing activities have concrete risk mitigation plans assigned'
      ],
      commonMistakes: [
        {
          mistake: 'Adding standard deviations together directly instead of summing variances',
          fix: 'Variances are additive (σ²_proj = Σ σ²); project standard deviation is the square root of total variance.'
        },
        {
          mistake: 'Treating the Most Likely estimate (M) as the project commitment date',
          fix: 'M is just the mode; the Beta mean TE incorporates tail risks and provides a realistic baseline.'
        },
        {
          mistake: 'Committing to a 50% probability date (Z = 0) and treating it as a reliable plan',
          fix: 'A 50% probability means a 1-in-2 chance of failure; establish client commitments at ≥80% (Z ≥ 0.84).'
        }
      ],
      plan306090: {
        d30: 'Introduce 3-point estimating on top-uncertainty development streams; calculate baseline Z-scores.',
        d60: 'Enforce variance risk audits prior to submitting major commercial tenders; establish ≥80% probability rule.',
        d90: 'Integrate PERT analysis into PMO software and couple with Monte Carlo simulation for complex multi-path projects.'
      },
      proTips: [
        'Ask estimators: "If everything went miraculously right, what is the fastest possible time?" for O; "If everything hit operational snags, how long?" for P.',
        'Beware of Merge Bias: if two parallel paths both have high variance and converge on a milestone, the real probability is lower than either single path suggests.',
        'Reducing the spread (P − O) on the highest-variance task is often cheaper and safer than crashing already-tight tasks.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Critical Path Method (CPM) / Gantt Chart',
        reason: 'Routine, deterministic projects (e.g. standard civil construction or recurring manufacturing) where task durations are well known from past history.'
      },
      {
        alternative: 'Agile Velocity & Story Points',
        reason: 'Fast-paced product teams working in continuous flow or 1-2 week sprints where user stories are broken down into small units under 3 days.'
      },
      {
        alternative: 'Monte Carlo Simulation',
        reason: 'Extremely complex networks with hundreds of interdependent probabilistic paths where non-critical paths have a high probability of becoming critical.'
      }
    ],
    reflectionPrompts: [
      'What is the statistical probability that your team will meet its current committed deadline (is Z positive or negative)?',
      'Which single activity on your critical path has the widest spread between Optimistic and Pessimistic estimates?',
      'Are you promising clients a 50% coin-toss date or an 85%+ high-confidence commitment?'
    ],
    quickReferenceCard: [
      'Expected Time: TE = (O + 4M + P) / 6',
      'Activity Variance: σ² = [(P − O) / 6]²',
      'Project Standard Deviation: σ_proj = √[Σ(critical path activity variances)]',
      'Z-Score: Z = (Target Deadline − TE_proj) / σ_proj',
      'Confidence Benchmarks: Z=0.0 → 50%, Z=0.84 → 80%, Z=1.28 → 90%, Z=1.64 → 95%'
    ],
    quiz: [
      {
        id: 'pert-q1',
        question: 'What is the formula used in PERT to calculate the weighted Expected Time (TE) from three-point estimates?',
        options: [
          'TE = (O + M + P) / 3',
          'TE = (O + 4M + P) / 6',
          'TE = (O + 2M + P) / 4',
          'TE = (2O + 3M + P) / 6'
        ],
        correctAnswer: 1,
        explanation: 'PERT uses the Beta distribution approximation: TE = (O + 4M + P) / 6, weighting the Most Likely estimate fourfold.'
      },
      {
        id: 'pert-q2',
        question: 'How is the variance (σ²) of an individual activity calculated in PERT?',
        options: [
          'σ² = (P − O) / 6',
          'σ² = [(P − O) / 6]²',
          'σ² = (P + O) / 2',
          'σ² = [(P − M) / 4]²'
        ],
        correctAnswer: 1,
        explanation: 'Activity standard deviation is (P − O) / 6; squaring it gives the variance: σ² = [(P − O) / 6]².'
      },
      {
        id: 'pert-q3',
        question: 'How is the total Project Standard Deviation (σ_proj) correctly computed in PERT?',
        options: [
          'By adding together the standard deviations of all critical path activities directly',
          'By calculating the average variance across all project tasks',
          'By summing the variances of all critical path activities and taking the square root: √[Σ σ²]',
          'By subtracting the optimistic project duration from the pessimistic project duration'
        ],
        correctAnswer: 2,
        explanation: 'Standard deviations cannot be added directly. You must sum the variances along the critical path and take the square root of that sum.'
      },
      {
        id: 'pert-q4',
        question: 'If a project has an Expected Duration TE of 20 weeks and a target deadline of 20 weeks, what is the statistical probability of completing on or before that deadline?',
        options: ['100%', '84%', '50%', '16%'],
        correctAnswer: 2,
        explanation: 'When Target = TE, Z = (20 − 20) / σ = 0. Under a standard normal distribution, Z = 0 corresponds precisely to a 50% probability.'
      },
      {
        id: 'pert-q5',
        question: 'What does a negative Z-score indicate when evaluating a proposed project deadline?',
        options: [
          'The project will be completed with 100% certainty',
          'The target deadline is earlier than the expected duration, meaning completion probability is less than 50%',
          'The project variance is negative',
          'The critical path has no slack'
        ],
        correctAnswer: 1,
        explanation: 'A negative Z-score means the target deadline falls to the left of the mean expected duration, resulting in a completion probability below 50%.'
      }
    ]
  },
  {
    id: 'agile',
    name: 'Agile Methodology & Iterative Delivery',
    shortName: 'Agile Methodology',
    category: 'Project Management',
    tagline: 'Iterative, customer-centric framework prioritizing rapid feedback, working software, and responsive change',
    origin: 'Formulated in February 2001 by 17 software leaders at Snowbird, Utah, creating the Manifesto for Agile Software Development.',
    corePurpose: 'Deliver usable customer value in rapid, cadence-based iterations (sprints), adapting scope continuously based on real user feedback rather than adhering to rigid multi-year upfront plans.',
    primaryUsers: ['Product Managers', 'Engineering Leads', 'Agile Coaches', 'Scrum Masters', 'Cross-Functional Product Teams'],
    difficulty: 'Intermediate',
    horizon: '1 to 4 Week Iteration Cycles (Quarterly Releases)',
    scope: 'Software Engineering, Digital Products, Customer Experience, and Innovation Sprints',
    timeToResult: 'Continuous value delivery every 2-week iteration',
    dataNeeds: 'User stories with acceptance criteria, relative effort estimates (story points), team velocity, and prioritized backlog',
    keyOutput: 'Working tested increment, prioritized product backlog, burndown tracking, and rolling velocity forecasts',
    bestPairedWith: 'Scrum (execution framework), Kanban (flow control), Design Thinking (user empathy), OKRs (strategic alignment)',
    keyFeatures: [
      'Four Core Values: Individuals & interactions over processes; working software over documentation; customer collaboration over contracts; responding to change over following a plan',
      'User Story articulation: "As a [persona], I want [action] so that [benefit]" with unambiguous acceptance criteria',
      'Relative estimation using Story Points and Planning Poker (Fibonacci sequence: 1, 2, 3, 5, 8, 13, 21)',
      'Iteration / Sprint Burndown charts tracking remaining work day-by-day to detect early bottlenecks',
      'Measured historical Team Velocity for empirical capacity planning and release forecasting',
      'Value vs Effort prioritization matrix to sequence Quick Wins and High-Impact Strategic Bets'
    ],
    howItWorks: 'Capture business and customer requirements as user stories formatted from the user’s perspective. Size stories relatively using story points. The Product Owner orders the backlog based on business value, user risk, and technical dependency. In sprint planning, the cross-functional team pulls a batch of top stories matching their proven historical velocity. Over a 2-week time-box, the team builds, tests, and verifies the increment against strict acceptance criteria. Daily standups inspect immediate progress and remove blockers. At the end of the sprint, the team demonstrates working software to stakeholders and conducts a retrospective to refine their working process.',
    coreConcepts: [
      {
        term: 'User Story',
        definition: 'A short, simple description of a feature told from the perspective of the end user: "As a [user], I want [feature] so that [value]".'
      },
      {
        term: 'Story Points',
        definition: 'A relative unit of measure assessing the overall effort, complexity, and uncertainty of a work item, typically sized using Fibonacci numbers.'
      },
      {
        term: 'Velocity',
        definition: 'The average number of story points completed and verified as Done by a team during an iteration; used strictly for capacity forecasting.'
      },
      {
        term: 'Burndown Chart',
        definition: 'A visual graph showing remaining work against time within a sprint; flat lines signal blocked work or scope injection.'
      },
      {
        term: 'Acceptance Criteria',
        definition: 'The pre-agreed conditions and test boundaries that a user story must satisfy before the Product Owner accepts it as complete.'
      }
    ],
    strengths: [
      'Dramatically reduces time-to-market by shipping usable product increments every 2 to 4 weeks',
      'Prevents expensive multi-million-dollar failures by validating user demand continuously',
      'Empowers cross-functional teams with psychological safety, ownership, and high morale'
    ],
    limitations: [
      'Challenging in fixed-scope, fixed-price, fixed-date contracts with rigid regulatory specifications',
      'Can lead to architectural drift or technical debt if refactoring and documentation are neglected',
      'Requires active, daily customer and Product Owner engagement that many organizations struggle to sustain'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Design Thinking user research, Customer Journey Maps, and Product Strategy OKRs',
      downstream: 'Feeds CI/CD automated deployments, user analytics, sprint retrospectives, and customer release roadmaps'
    },
    useCases: [
      {
        title: 'B2B SaaS Platform Expansion',
        situation: 'Cloud analytics company needing to launch an automated reporting dashboard for enterprise clients.',
        problem: 'Traditional 9-month development cycle threatened to miss the market window before competitor launch.',
        action: 'Employed 2-week Agile sprints; shipped core CSV export in Sprint 2 and automated email digests in Sprint 4.',
        outcome: 'Achieved 42 paying enterprise customers by month 3; collected direct usage data that reshaped the roadmap.'
      },
      {
        title: 'Banking Mobile App Redesign',
        situation: 'Retail bank modernizing its mobile banking application to reduce branch foot traffic.',
        problem: 'Department heads submitted 200+ conflicting feature requests, paralyzing the engineering organization.',
        action: 'Introduced Value vs Effort backlog prioritization and relative story pointing with business stakeholders.',
        outcome: 'Shipped bi-weekly app updates; mobile transfer adoption increased by 65% within two quarters.'
      },
      {
        title: 'E-Commerce Checkout Optimization',
        situation: 'Online fashion retailer experiencing a 28% shopping cart abandonment rate on mobile devices.',
        problem: 'Uncertainty over whether payment gateway latency, UI friction, or shipping costs caused drop-offs.',
        action: 'Ran 1-week iterative experimental sprints testing one-click checkout, guest checkout, and UPI integration.',
        outcome: 'Reduced cart abandonment by 9.4% in 6 weeks, driving ₹45 lakh in incremental monthly sales.'
      }
    ],
    caseStudy: {
      company: 'Kestrel Cloud Solutions (Chennai, Tamil Nadu)',
      revenue: '₹35 Crore ($4.2M)',
      staff: '110 Employees',
      profile: 'B2B SaaS product engineering firm providing field service management automation to industrial equipment distributors.',
      challenge: 'Operating under traditional waterfall planning, product releases occurred every 9 to 12 months. Clients frequently rejected final releases because customer operational workflows had evolved during the long development cycle. Developer turnover was high due to end-of-cycle crunch overtime.',
      whyChosen: 'Agile iterative delivery was adopted to transition from monolithic annual releases to continuous 2-week value delivery with rapid client feedback loops.',
      steps: [
        'Trained developers, designers, and commercial product managers on Agile values, user story writing, and relative story pointing.',
        'Decomposed a 10-month product backlog into 140 modular user stories with explicit acceptance criteria.',
        'Formed three cross-functional delivery squads (developers, QA engineer, UX designer, and dedicated Product Owner).',
        'Instituted 2-week iteration cycles with sprint planning, 15-minute daily standups, and bi-weekly client live demonstrations.',
        'Tracked sprint burndown daily to detect scope creep and measured rolling velocity across 6 consecutive sprints.'
      ],
      results: [
        'Shipped functional product increments every 2 weeks with 96% sprint commitment predictability.',
        'Customer satisfaction (CSAT) rose from 62% to 89% as clients saw their feedback deployed within 14 days.',
        'Unplanned defect rework after release plummeted by 73% through continuous in-sprint testing.'
      ],
      lessonsLearned: [
        'Agile is an organizational culture of transparency and collaboration, not just a set of Jira ceremonies.',
        'Never compare story point velocity across different teams; velocity is a private capacity forecasting tool.',
        'A user story is only complete when it meets the agreed Definition of Done, including automated tests.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Dedicated Product Owner with authority to prioritize and make scope decisions',
        'Stable, cross-functional team (5–9 members) with engineering, design, and testing skills',
        'Co-located or digitally connected tooling for backlog management and continuous communication'
      ],
      steps: [
        'Establish the Product Goal and draft high-level features as an initial Product Backlog.',
        'Refine features into discrete user stories sized to be completed within 1 to 5 days of effort.',
        'Hold regular estimation sessions using Planning Poker (Fibonacci story points: 1, 2, 3, 5, 8, 13).',
        'Conduct Sprint Planning to commit to a focused Sprint Goal matching historical team velocity.',
        'Run 15-minute daily standups focused on inspection, impediment removal, and daily goal alignment.',
        'Demonstrate working software at the end of each iteration and capture actionable retrospective improvements.'
      ],
      checklist: [
        'User stories follow the format: "As a [persona], I want [action] so that [benefit]"',
        'Each story includes testable, unambiguous Acceptance Criteria before sprint entry',
        'Stories are estimated relatively in Story Points rather than individual hours',
        'Sprint time-box (1 to 4 weeks) is strictly maintained with no extensions',
        'Daily standup is kept under 15 minutes and focuses on blockers, not managerial interrogation',
        'Sprint retrospective produces 1–2 concrete, tracked process improvement actions'
      ],
      commonMistakes: [
        {
          mistake: 'Using Story Points as a management productivity quota to evaluate individual developers',
          fix: 'Story points measure team capacity for forecasting; weaponizing points causes artificial inflation (gaming).'
        },
        {
          mistake: 'Treating the daily standup as a status report to a manager rather than peer-to-peer coordination',
          fix: 'Developers speak to each other about progress toward the Sprint Goal and remove blockers.'
        },
        {
          mistake: 'Allowing mid-sprint scope additions from stakeholders without swapping out equal effort',
          fix: 'Protect the Sprint Goal; new requests go to the Product Backlog for the next sprint planning.'
        }
      ],
      plan306090: {
        d30: 'Transition pilot squad to 2-week iterations; write backlog in user story format with acceptance criteria.',
        d60: 'Measure baseline velocity; introduce automated burndown tracking and disciplined retrospectives.',
        d90: 'Scale Agile practices across all product teams; align sprint goals with quarterly corporate OKRs.'
      },
      proTips: [
        'Write acceptance criteria in "Given-When-Then" format to make automated test scripting seamless.',
        'Split any story larger than 8 points into smaller, independently shippable user journeys.',
        'Celebrate completed increments at the sprint review; working software is the primary measure of progress.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Gantt Chart / Waterfall / CPM',
        reason: 'Heavy civil infrastructure, chemical plant construction, or hardware fabrication with physical dependencies and fixed regulatory specs.'
      },
      {
        alternative: 'Kanban Flow System',
        reason: 'Production support, IT operations, or continuous ticketing environments with unpredictable ad-hoc work and no fixed iteration goals.'
      },
      {
        alternative: 'Linear Stage-Gate Process',
        reason: 'Pharma drug discovery or clinical approvals where strict sequential legal milestones dictate progress.'
      }
    ],
    reflectionPrompts: [
      'Are your user stories written from the perspective of the customer, or are they technical task assignments?',
      'Does your team regularly demo working, tested software to real users at the end of every iteration?',
      'Is your daily standup a quick 15-minute synchronization, or has it degenerated into a status interrogation?'
    ],
    quickReferenceCard: [
      'User Story: As a [persona], I want [capability] so that [benefit]',
      'Fibonacci Sizing: 1, 2, 3, 5, 8, 13 (Relative effort, complexity, and risk)',
      'Velocity: Sum of story points completed and verified as Done within a sprint',
      'Sprint Time-Box: Fixed duration (1–4 weeks) that never shifts to accommodate incomplete work',
      'Primary Progress Metric: Working, tested software delivered to users'
    ],
    quiz: [
      {
        id: 'agile-q1',
        question: 'Which of the following is one of the four foundational core values of the Agile Manifesto?',
        options: [
          'Comprehensive documentation over working software',
          'Contract negotiation over customer collaboration',
          'Responding to change over following a plan',
          'Strict processes and tools over individual interactions'
        ],
        correctAnswer: 2,
        explanation: 'The Agile Manifesto values "Responding to change over following a plan" (while valuing the plan, adaptability is valued more).'
      },
      {
        id: 'agile-q2',
        question: 'What is the primary purpose of using relative "Story Points" instead of estimating work directly in calendar hours?',
        options: [
          'To hide work effort from executive leadership',
          'To account for complexity, uncertainty, and effort independent of individual developer seniority',
          'Because software tools do not support hours',
          'To make sprint planning take longer'
        ],
        correctAnswer: 1,
        explanation: 'Story points evaluate relative size, complexity, and uncertainty, avoiding the biases and differences between junior and senior developer speeds.'
      },
      {
        id: 'agile-q3',
        question: 'What is indicated on a sprint burndown chart when the remaining work line remains completely horizontal for 5 consecutive days?',
        options: [
          'The team is completing work faster than planned',
          'Work is blocked, tasks are improperly sized, or completed work has not met the Definition of Done',
          'The sprint has successfully finished early',
          'The team velocity has doubled'
        ],
        correctAnswer: 1,
        explanation: 'A flat burndown line signals a blockage: work is not being completed and closed against the Definition of Done, creating severe end-of-sprint delivery risk.'
      },
      {
        id: 'agile-q4',
        question: 'In standard Agile product management, who is responsible for ordering the Product Backlog items to maximize value?',
        options: ['The Scrum Master', 'The Lead Software Architect', 'The Product Owner', 'The Quality Assurance Lead'],
        correctAnswer: 2,
        explanation: 'The Product Owner holds singular accountability for the content, ordering, and prioritization of the Product Backlog.'
      },
      {
        id: 'agile-q5',
        question: 'Why is comparing Story Point velocity between two different engineering teams considered a serious management mistake?',
        options: [
          'Because teams work in different time zones',
          'Because story point scales are relative and calibrated internally within each unique team',
          'Because velocity can only be measured once a year',
          'Because executives are not permitted to view velocity metrics'
        ],
        correctAnswer: 1,
        explanation: 'Story points are a team-specific relative currency. Comparing velocity across teams causes artificial point inflation and destroys honest estimation.'
      }
    ]
  },
  {
    id: 'scrum',
    name: 'Scrum Framework (3-5-3 Structure)',
    shortName: 'Scrum Framework',
    category: 'Project Management',
    tagline: 'Lightweight management framework organized around 3 accountabilities, 5 events, and 3 artifacts',
    origin: 'Created in the early 1990s by Ken Schwaber and Jeff Sutherland; codified in the official Scrum Guide (2020 revision).',
    corePurpose: 'Help teams generate value through adaptive solutions for complex problems using empirical process control: Transparency, Inspection, and Adaptation.',
    primaryUsers: ['Scrum Masters', 'Product Owners', 'Developers', 'Agile Delivery Managers', 'Engineering Directors'],
    difficulty: 'Intermediate',
    horizon: 'Fixed Sprints of 1 to 4 Weeks (Continuous Cadence)',
    scope: 'Product Development Teams, Software Engineering, Cross-Functional Innovation Squads',
    timeToResult: 'First usable increment delivered at the end of Sprint 1 (2 weeks)',
    dataNeeds: 'Product Goal, prioritized Product Backlog, Definition of Done, team capacity, and Sprint Goal',
    keyOutput: 'Done Increment of value, Sprint Backlog, Sprint Goal, and retrospective actionable process improvements',
    bestPairedWith: 'Kanban (Scrumban flow), OKRs (connecting strategic goals to sprint goals), User Story Mapping, Extreme Programming (XP)',
    keyFeatures: [
      'The 3 Accountabilities: Product Owner (maximizes value), Scrum Master (team effectiveness & servant-leader), Developers (creates usable increment)',
      'The 5 Events: The Sprint (container), Sprint Planning, Daily Scrum (15 min), Sprint Review (demo), Sprint Retrospective',
      'The 3 Artifacts: Product Backlog (Product Goal), Sprint Backlog (Sprint Goal), Increment (Definition of Done)',
      'Strict Definition of Done (DoD) preventing un-reviewed or buggy code from contaminating releases',
      'Empirical pillars: Transparency (visible work), Inspection (frequent checks), Adaptation (rapid adjustment)',
      'Scrum Values: Commitment, Focus, Openness, Respect, and Courage'
    ],
    howItWorks: 'A Scrum Team consists of 1 Product Owner, 1 Scrum Master, and Developers (typically ≤ 10 people total). The Product Owner manages the Product Backlog against a clear Product Goal. The team works in fixed-length Sprints of one month or less. In Sprint Planning, the team selects backlog items and crafts a cohesive Sprint Goal. Each day, the Developers meet for the 15-minute Daily Scrum to inspect progress and adapt their daily plan. During the Sprint, Developers build an increment that meets the Definition of Done. At the Sprint Review, the team and stakeholders inspect the working increment and adapt the Product Backlog. At the Sprint Retrospective, the team identifies actionable process improvements for the next sprint.',
    coreConcepts: [
      {
        term: 'The 3 Accountabilities',
        definition: 'Product Owner (value & backlog), Scrum Master (effectiveness & process coaching), and Developers (quality & execution).'
      },
      {
        term: 'The 5 Events',
        definition: 'Sprint (container time-box), Sprint Planning, Daily Scrum (15 min), Sprint Review (stakeholder demo), and Sprint Retrospective (team adaptation).'
      },
      {
        term: 'The 3 Artifacts & Commitments',
        definition: 'Product Backlog (Product Goal), Sprint Backlog (Sprint Goal), and Increment (Definition of Done).'
      },
      {
        term: 'Definition of Done (DoD)',
        definition: 'A formal, shared checklist of quality criteria (code review, testing, staging deployment, documentation) that an increment must satisfy to be deemed complete.'
      },
      {
        term: 'Sprint Goal',
        definition: 'The single overarching business objective established during Sprint Planning that gives the Developers focus throughout the Sprint.'
      }
    ],
    strengths: [
      'Enforces disciplined cadences that eliminate analysis-paralysis and long feedback delays',
      'Clear accountabilities eliminate ambiguous role confusion and executive micro-management',
      'Continuous empirical inspection ensures the team builds what customers actually need'
    ],
    limitations: [
      'Fails when organizational leadership refuses to grant the Product Owner real decision-making authority',
      'Can feel mechanical or dogmatic if ceremonies are followed without understanding empirical principles',
      'Not designed for single-person projects or organizations with constantly shifting hourly priorities'
    ],
    workflowPlacement: {
      upstream: 'Takes input from quarterly company OKRs, Product Discovery research, and stakeholder feature requests',
      downstream: 'Feeds production releases, CI/CD automated deployment pipelines, customer telemetry, and sprint retrospectives'
    },
    useCases: [
      {
        title: 'EdTech Examination Portal Stabilization',
        situation: 'Online university learning provider with 9 developers overwhelmed by ad-hoc phone calls and WhatsApp requests.',
        problem: 'Frequent server crashes during live exams because untested emergency bug fixes were pushed straight to production.',
        action: 'Implemented 2-week Scrum sprints, named one Product Owner with sole backlog authority, and enforced a strict Definition of Done.',
        outcome: 'Live platform exam incidents fell to zero; achieved 100% release predictability for 6 consecutive months.'
      },
      {
        title: 'FinTech Mobile Banking Overhaul',
        situation: 'Regional cooperative bank launching a UPI payments mobile app to compete with national digital wallets.',
        problem: 'Traditional project managers were micro-assigning daily tasks, causing developer disengagement and missed target dates.',
        action: 'Transitioned to self-organizing Developers, trained an internal Scrum Master, and instituted 15-minute daily standups.',
        outcome: 'Delivery cycle time dropped by 45%; launched the UPI payment app 3 weeks ahead of the festive season.'
      },
      {
        title: 'Hospital Management System Modernization',
        situation: 'Healthcare software vendor updating patient electronic medical records (EMR) for NABH accreditation.',
        problem: 'Stakeholders repeatedly interrupted sprints to inject pet features, derailing compliance milestones.',
        action: 'Scrum Master shielded developers, routing all feature requests through the Product Owner for the next sprint backlog.',
        outcome: 'Achieved 100% NABH compliance sprint goals and maintained team velocity across 8 consecutive sprints.'
      }
    ],
    caseStudy: {
      company: 'Pandiyan Digital Learning (Madurai, Tamil Nadu)',
      revenue: '₹22 Crore ($2.7M)',
      staff: '70 Employees',
      profile: 'EdTech firm providing customized online examination and student assessment portals for partner colleges across South India.',
      challenge: 'The 9-person development team was inundated with ad-hoc requests via WhatsApp and phone calls from university deans. Developers were constantly context-switching, causing releases to break live exam portals during peak semester testing. Stakeholders had lost trust in delivery dates.',
      whyChosen: 'The official Scrum framework (3-5-3 structure) was instituted to establish clear accountabilities, protect developer focus, and enforce a non-negotiable Definition of Done.',
      steps: [
        'Named the Head of Product as the sole Product Owner, establishing the Product Goal: "A zero-downtime platform during exam months that onboards partner colleges in under 24 hours."',
        'Consolidated all 300+ legacy requests into a single, visible Product Backlog and shut down informal WhatsApp request channels.',
        'Appointed a senior engineer as Scrum Master to coach the team and facilitate ceremonies.',
        'Established 2-week Sprints with a strict Definition of Done: peer code review, automated unit tests passing, staging verification, and zero critical bugs.',
        'Held Daily Scrums strictly capped at 15 minutes, led by Developers to inspect progress toward the Sprint Goal.'
      ],
      results: [
        'Live exam platform downtime incidents fell from 3 per week to zero during exam season.',
        'Partner college onboarding time dropped from 12 days to under 24 hours by Sprint 9.',
        'Sprint completion predictability reached 94% across 12 consecutive sprints.'
      ],
      lessonsLearned: [
        'The Product Owner must be a single individual with authority, not a steering committee.',
        'Protecting the Sprint Goal from mid-sprint stakeholder interruptions is essential for quality and velocity.',
        'A Definition of Done is meaningless unless the team has the courage to refuse shipping work that fails the checklist.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Clear organizational mandate empowering the Product Owner as the single decision-maker for scope',
        'Cross-functional team of Developers (typically 3–9 people) dedicated to the product',
        'Scrum Master committed to removing organizational impediments and facilitating ceremonies'
      ],
      steps: [
        'Define the overarching Product Goal and populate the initial Product Backlog with ordered user stories.',
        'Hold Sprint Planning (max 2 hours for a 2-week sprint) to establish a clear, compelling Sprint Goal.',
        'Developers pull backlog items into the Sprint Backlog and formulate a tactical plan for execution.',
        'Conduct the 15-minute Daily Scrum every morning at the same time and place.',
        'Build, test, and package an Increment that satisfies every criterion in the Definition of Done.',
        'Demonstrate the working Increment at the Sprint Review and adapt the Product Backlog.',
        'Conduct the Sprint Retrospective to identify and commit to 1–2 actionable process improvements.'
      ],
      checklist: [
        'The Product Owner is a single individual with decision-making authority (not a committee)',
        'The Scrum Master acts as a coach and servant-leader, not a task-assigning manager',
        'Developers self-organize and decide how much work they can pull into the Sprint Backlog',
        'Every Sprint has a single, clear, business-focused Sprint Goal',
        'The Daily Scrum is kept strictly to 15 minutes and run by Developers',
        'Definition of Done is visibly displayed and rigorously enforced for every increment'
      ],
      commonMistakes: [
        {
          mistake: 'Allowing stakeholders or managers to bypass the Product Owner and assign tasks directly to developers',
          fix: 'Route 100% of feature requests through the Product Backlog; shield developers during active sprints.'
        },
        {
          mistake: 'Treating the Daily Scrum as a status interrogation where developers report to the Scrum Master',
          fix: 'The Daily Scrum is by developers, for developers, to inspect progress toward the Sprint Goal.'
        },
        {
          mistake: 'Skipping the Sprint Retrospective when deadlines are tight to save time',
          fix: 'The retrospective is the primary mechanism of continuous process improvement; never skip it.'
        }
      ],
      plan306090: {
        d30: 'Form pilot Scrum team; train on 3-5-3 structure and create agreed Definition of Done.',
        d60: 'Achieve stable 2-week sprint cadence; eliminate mid-sprint scope hijacking through Product Owner authority.',
        d90: 'Refine estimation and velocity forecasting; link sprint goals directly to corporate quarterly OKRs.'
      },
      proTips: [
        'Keep the Sprint Goal simple enough to fit on a single post-it note at the top of the team board.',
        'The Scrum Master should track blockers (impediments) and resolve at least one organizational blocker every week.',
        'At the Sprint Review, never present static slides; demonstrate actual working software or live systems.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Kanban Framework',
        reason: 'IT support, DevOps incident management, or continuous customer support where work is reactive and cannot be batched into fixed 2-week sprint goals.'
      },
      {
        alternative: 'Gantt Chart / Waterfall / CPM',
        reason: 'Civil engineering, industrial factory construction, or physical tooling where tasks must be sequentially constructed over months.'
      },
      {
        alternative: 'Personal Productivity System',
        reason: 'Individual solo work where the coordination mechanics of 3 accountabilities and 5 ceremonies add unnecessary overhead.'
      }
    ],
    reflectionPrompts: [
      'Does your team have a single, empowered Product Owner, or are multiple managers giving conflicting instructions?',
      'Is your Definition of Done strictly audited, or are incomplete features being released to make sprints look green?',
      'Does your team craft a meaningful Sprint Goal in planning, or is your sprint just an arbitrary bucket of disconnected tasks?'
    ],
    quickReferenceCard: [
      '3 Accountabilities: Product Owner (Value), Scrum Master (Effectiveness), Developers (Quality)',
      '5 Events: Sprint (Container), Planning, Daily Scrum (15m), Review (Demo), Retrospective',
      '3 Artifacts: Product Backlog (Product Goal), Sprint Backlog (Sprint Goal), Increment (DoD)',
      '3 Empirical Pillars: Transparency, Inspection, Adaptation',
      '5 Scrum Values: Commitment, Focus, Openness, Respect, Courage'
    ],
    quiz: [
      {
        id: 'scrum-q1',
        question: 'In the Scrum framework, who is singularly accountable for ordering the Product Backlog to maximize value?',
        options: ['The Scrum Master', 'The Product Owner', 'The Lead Developer', 'The Project Manager'],
        correctAnswer: 1,
        explanation: 'The Product Owner is solely accountable for the content and ordering of the Product Backlog.'
      },
      {
        id: 'scrum-q2',
        question: 'According to the official Scrum Guide, what is the maximum duration of a Sprint?',
        options: ['One week', 'Two weeks', 'One calendar month', 'One business quarter'],
        correctAnswer: 2,
        explanation: 'Sprints are fixed time-boxes of one calendar month or less to maintain predictability and limit risk.'
      },
      {
        id: 'scrum-q3',
        question: 'What is the time-box limit for the Daily Scrum meeting?',
        options: ['5 minutes', '15 minutes', '30 minutes', '45 minutes'],
        correctAnswer: 1,
        explanation: 'The Daily Scrum is strictly a 15-minute event for the Developers to inspect progress toward the Sprint Goal and plan the next 24 hours.'
      },
      {
        id: 'scrum-q4',
        question: 'Which formal commitment belongs to the Sprint Backlog artifact in Scrum?',
        options: ['The Product Goal', 'The Sprint Goal', 'The Definition of Done', 'The Velocity Metric'],
        correctAnswer: 1,
        explanation: 'The Sprint Goal is the commitment for the Sprint Backlog. (The Product Goal belongs to the Product Backlog, and the Definition of Done belongs to the Increment).'
      },
      {
        id: 'scrum-q5',
        question: 'What is the primary purpose of the Sprint Retrospective event?',
        options: [
          'To demonstrate the newly built Increment to external customers and stakeholders',
          'To estimate story points for the upcoming sprint items',
          'To plan ways to increase the quality and effectiveness of the Scrum Team',
          'To re-baseline the overall corporate budget'
        ],
        correctAnswer: 2,
        explanation: 'The Sprint Retrospective is an internal event where the Scrum Team inspects its process, tools, relationships, and Definition of Done, identifying actionable improvements.'
      }
    ]
  }
];

export const CATEGORY_6_STACKS: StrategyStack[] = [
  {
    id: 'stack-pm-a',
    name: 'Stack A — Startup & Small Agency Delivery Rhythm',
    targetOrg: 'Startups & Small Agencies (3–15 People, Fast Iteration)',
    recommendedChain: ['scrum', 'gantt', 'pert'],
    cadence: {
      quarterly: 'Quarterly milestone roadmap (Gantt) + Retrospective process refresh',
      annually: 'Annual capability and tooling review; customer contract SLA alignment',
      every23Years: 'Core architecture overhaul and delivery framework evaluation'
    },
    whyItFits: 'Provides immediate daily velocity and clear prioritization via Scrum 2-week sprints with WIP limits, paired with a lightweight milestone Gantt (10–20 rows) for client expectations, and PERT three-point estimates on the top 5 uncertainty items.',
    whatToSkip: 'Skip complex enterprise scheduling software, deep multi-level CPM forward/backward passes, and heavyweight bureaucratic change control boards.'
  },
  {
    id: 'stack-pm-b',
    name: 'Stack B — Growing SME & Institutional Governance Stack',
    targetOrg: 'Growing SMEs & Educational Institutions (15–150 People, Multiple Departments)',
    recommendedChain: ['gantt', 'cpm', 'scrum', 'pert'],
    cadence: {
      quarterly: 'Programme Gantt & CPM baseline review; quarterly roadmap alignment across Scrum teams',
      annually: 'Annual capital expansion network planning; three-point risk audit on tenders and major procurements',
      every23Years: 'Institutional delivery maturity audit (PMP / Agile accreditation)'
    },
    whyItFits: 'Combines plan-driven rigour (Gantt with CPM baseline and weekly variance reporting) for capital and regulatory commitments with agile Scrum cadences inside product, software, and marketing squads.',
    whatToSkip: 'Avoid forced single-method orthodoxy (forcing construction crews into Scrum, or forcing software squads into rigid waterfall).'
  },
  {
    id: 'stack-pm-c',
    name: 'Stack C — Enterprise & Multi-Site Portfolio Delivery',
    targetOrg: 'Large Enterprises, Industrial Plants & Multi-Site Operations (150+ People)',
    recommendedChain: ['cpm', 'pert', 'scrum', 'gantt'],
    cadence: {
      quarterly: 'Multi-team Scaled Scrum PI Planning; portfolio critical-path and float-consumption reviews',
      annually: 'Enterprise capital project Monte Carlo risk distribution simulations and cross-vendor resource leveling',
      every23Years: 'Corporate delivery operating model and PMO institutional modernization'
    },
    whyItFits: 'Scales from large infrastructure and industrial shutdown maintenance using CPM resource leveling and PERT/Monte Carlo schedule risk, down to synchronized cross-team product delivery via scaled Agile frameworks.',
    whatToSkip: 'Avoid uncoordinated departmental spreadsheets and un-monitored near-critical paths.'
  }
];

export const CATEGORY_6_SCENARIOS: ScenarioMission[] = [
  {
    id: 'mission-pm-1',
    title: 'The 12-Week Branch Launch Crisis at Apex Coaching',
    role: 'Head of Operations',
    companyContext: 'Apex Professional Coaching Academy ($12M Revenue, expanding with a new multi-floor campus in Coimbatore).',
    crisisPrompt: 'You are opening a new competitive exam coaching branch in 12 weeks. In Week 5, your schedule shows the interior fit-out contractor has fallen 8 working days behind schedule. The problem: high-profile newspaper and billboard launch advertisements have already been booked and paid for Week 12. Student enrollment opens on launch morning. What is your sequence of recovery decisions?',
    targetTools: ['gantt', 'cpm'],
    options: [
      {
        id: 'opt-pm-1-1',
        label: 'Immediately cancel the Week 12 advertising blitz and postpone the public branch launch by 3 weeks',
        toolUsed: 'Premature Launch Surrender',
        explanation: 'Disastrous. Cancelling non-refundable ad spends destroys ₹8 lakh in paid media, surrenders student admissions to competitors, and damages company credibility before even investigating schedule float.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-pm-1-2',
        label: 'Verify critical path: Fast-track electrical & IT cabling in parallel with civil work, crash critical tasks with a night shift, or re-scope to open ground-floor classrooms first',
        toolUsed: 'Gantt & CPM Schedule Recovery Sequence',
        explanation: 'Optimal textbook governance. First, determine if the interior contractor is on the zero-float critical path. If critical: 1) Fast-track electrical/IT cabling in parallel via SS dependency with lag; 2) Crash critical tasks by funding a 2nd contractor shift; 3) Re-scope to open ground-floor lecture halls first for Day 1 classes; keeping the public launch intact.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-pm-1-3',
        label: 'Quietly re-baseline the Gantt chart in the software to erase the 8-day slippage so the weekly dashboard stays green',
        toolUsed: 'Decorative Schedule Falsification',
        explanation: 'Unethical and destructive. Silently re-baselining hides operational reality from executive leadership until launch morning when students arrive to wet paint and incomplete classrooms.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Apply the standard project schedule recovery protocol: 1) Confirm criticality: Inspect whether interior fit-out sits on the zero-float critical path. If parallel activities carry float, the 8-day delay might be partially buffered. 2) Fast-track (Zero Cost): Convert Finish-to-Start dependencies to Start-to-Start with lag. Have electrical, networking, and air-conditioning contractors begin work floor-by-floor immediately after civil masonry instead of waiting for full building completion. 3) Crash (Controlled Cost): Pay the contractor for a second evening shift on specific critical activities (drywall and lighting). 4) Re-scope: Prepare a fallback to certify and open the ground-floor classrooms and admissions counter on Week 12, leaving upper-floor faculty lounges for Week 14. 5) Preserve the baseline: Log the variance honestly, document the recovery plan via change control, and protect the public marketing launch date.',
    actionChecklist: [
      'Verify whether the lagging task is currently on the zero-float critical path',
      'Exhaust free fast-tracking (parallel work) options before authorizing costly overtime crashing',
      'Deploy two-shift crews targeted strictly on zero-float critical activities',
      'Formulate phased physical re-scoping (ground-floor opening first) as a secondary buffer',
      'Retain the original approved baseline and record variance honestly in weekly executive reporting'
    ],
    reflectionKey: 'When a project slips, explore fast-tracking first, then targeted crashing, then partial re-scoping. Moving the launch date is the costliest last resort.'
  },
  {
    id: 'mission-pm-2',
    title: 'The ₹3 Lakh Racking Overtime Dilemma at Deccan Logistics',
    role: 'Vice President of Supply Chain Infrastructure',
    companyContext: 'Deccan Regional Logistics & Warehousing ($45M Revenue, commissioning a 120,000 sq.ft. automated distribution hub).',
    crisisPrompt: 'With 6 weeks left before opening, your CPM network shows the critical path runs directly through "Heavy-Duty Racking Installation" (vendor quote: 3 weeks duration). The racking vendor offers to crash their schedule to 2 weeks by bringing in an additional installation team for an extra ₹3 lakh. A parallel activity, "Warehouse Management System (WMS) Configuration & RF Scanning Setup", has 2 weeks of total float. Should you pay the ₹3 lakh to crash the racking?',
    targetTools: ['cpm'],
    options: [
      {
        id: 'opt-pm-2-1',
        label: 'Pay the ₹3 lakh immediately without checking financial benefit or parallel network paths',
        toolUsed: 'Knee-Jerk Schedule Crashing',
        explanation: 'Premature. Crashing without quantifying the economic value of an early finish or verifying whether parallel paths will become critical wastes shareholder capital.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-pm-2-2',
        label: 'Quantify financial payoff (early revenue + saved lease on old depot) vs ₹3L, verify WMS float remains ≥1 week, or fast-track racking by zone at zero extra cost',
        toolUsed: 'CPM Crashing & Cost-Benefit Verification',
        explanation: 'Masterful application of CPM. Check if gaining 1 week saves more than ₹3 lakh in lease overlap and customer storage revenue. Verify that crashing racking by 1 week still leaves WMS with 1 week of float (preventing a secondary bottleneck). Negotiate zone-by-zone fast-tracking before approving cash.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-pm-2-3',
        label: 'Crash the WMS Configuration software team instead because software engineers are cheaper than heavy racking installers',
        toolUsed: 'Crashing Non-Critical Float Activities',
        explanation: 'Fundamental CPM error! Crashing WMS configuration spends money on a task that already has 2 weeks of float, resulting in zero reduction of the overall project duration.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'In CPM governance, you only crash an activity if: 1) It sits on the critical path (Float = 0); 2) The commercial benefit of shortening the schedule exceeds the crash cost; and 3) Parallel paths do not immediately negate the time saved. Here, racking is critical. Crashing it by 1 week shortens the critical path from 3 to 2 weeks. WMS configuration has 2 weeks of float, so after crashing racking, WMS still retains 1 week of float and will not become critical. Next, quantify the economic value: Will opening the warehouse 1 week earlier save more than ₹3 lakh in lease extension at the old facility plus early customer fulfillment revenue? If the benefit is ₹5 lakh, approve the ₹3 lakh crash. If the benefit is only ₹1 lakh, reject the fee and negotiate zone-based fast-tracking (handing over Racks 1–20 to IT while Racks 21–40 are assembled).',
    actionChecklist: [
      'Confirm the activity to be crashed has zero float and lies on the critical path',
      'Inspect all parallel paths to ensure crashing does not create an immediate unmanageable new critical path',
      'Quantify the economic payoff of early delivery (lease savings, avoided penalties, accelerated revenue)',
      'Compare marginal crash cost against total financial payoff before authorizing vendor payments',
      'Explore zero-cost zoned fast-tracking handoffs before paying for vendor overtime'
    ],
    reflectionKey: 'Never spend money crashing an activity that has float. Spend crash capital only where it shortens the ultimate project finish date for a net positive ROI.'
  },
  {
    id: 'mission-pm-3',
    title: 'The 16% Probability Trap: Over-Promised Delivery at Kestrel Software',
    role: 'Director of Delivery & Client Services',
    companyContext: 'Kestrel Cloud Engineering ($18M Revenue, delivering enterprise financial SaaS integration for Tier-1 banks).',
    crisisPrompt: 'Your commercial sales vice-president has verbally promised an enterprise client a hard 10-week delivery for a mission-critical payments gateway integration. Your engineering team just ran a rigorous PERT analysis on the critical path, yielding an Expected Duration (TE) of 11.5 weeks with a Project Standard Deviation (σ_proj) of 1.5 weeks. The client contract includes a 5%-of-contract-value penalty per week of delay. What is your executive action?',
    targetTools: ['pert'],
    options: [
      {
        id: 'opt-pm-3-1',
        label: 'Accept the 10-week contract quietly and urge the developers to work unpaid overtime weekends',
        toolUsed: 'Silent Acceptance of High-Failure Plan',
        explanation: 'Dangerous and reckless. Z = (10 - 11.5)/1.5 = -1.0, representing an 84% probability of failure and contract penalties. Exhausting engineers will lead to defects and burnout.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-pm-3-2',
        label: 'Present PERT statistical reality to executive leadership: 10 weeks has only a 16% probability. Counter with 13.5 weeks (91% confidence) or a 10-week MVP, or buy down variance on the highest-risk task',
        toolUsed: 'PERT Probabilistic Governance & Variance Reduction',
        explanation: 'Exemplary executive governance. Demonstrates with arithmetic that 10 weeks is a 1-in-6 gamble. Offers defensible alternatives: 1) Commit to 13.5 weeks at 91% confidence; 2) Deliver a scoped MVP at 10 weeks with core payment flows; 3) Isolate the highest-variance task (e.g. bank API sandbox approval) and buy certainty.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-pm-3-3',
        label: 'Artificially edit the Optimistic and Pessimistic numbers in the PERT sheet until TE mathematically equals 9.5 weeks',
        toolUsed: 'Cooking the Statistical Books',
        explanation: 'Falsifying statistical data hides real project risk from stakeholders and guarantees contractual default and financial penalties.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'A 10-week commitment with TE = 11.5w and σ = 1.5w has a Z-score of (10 - 11.5) / 1.5 = -1.0. Looking up -1.0 on a normal distribution curve reveals a 15.87% probability (roughly a 1-in-6 chance). Silently signing this contract guarantees an 84% chance of triggering penalties and damaging client trust. Executive steps: 1) Educate commercial leadership on Z-scores: commit at ≥80% (Z=0.84, 12.8 weeks) or 90% (Z=1.28, 13.4 weeks) confidence. 2) Propose a phased release: Deliver core UPI payments in Week 10 (achieving the client’s public marketing demo) and international wire features in Week 13. 3) Attack variance: Audit which critical activity contributes the largest variance σ² (e.g., third-party bank sandbox authorization). If that task has O=1w, M=3w, P=8w (variance = 1.36), co-locate an engineer at the partner bank to freeze specifications and collapse the pessimistic estimate. 4) If sales insists on committing to 10 weeks, require executive sign-off explicitly accepting the ₹12 lakh expected penalty liability.',
    actionChecklist: [
      'Calculate Z-score and exact completion probability for any proposed commercial deadline',
      'Refuse to sign contractual commitments with less than 80% statistical probability of delivery',
      'Identify the critical path activity contributing the highest percentage of total schedule variance',
      'Offer phased MVP scope delivery when market or executive deadlines cannot be moved',
      'Quantify the mathematical expected monetary value (EMV) of delay penalties for executive decision-makers'
    ],
    reflectionKey: 'Giving a single-number date without a confidence probability is a gamble disguised as a schedule. Never silently accept a 16% plan.'
  },
  {
    id: 'mission-pm-4',
    title: 'The Mid-Sprint Scope Hijack at Valo Cloud Solutions',
    role: 'Scrum Master & Agile Delivery Coach',
    companyContext: 'Valo Cloud Solutions ($22M ARR, B2B enterprise software provider with 8 cross-functional Scrum teams).',
    crisisPrompt: 'Three days into a 2-week Sprint, the enterprise sales VP bursts into the team room demanding that developers immediately drop their current work to build a custom single sign-on (SSO) integration for a prospective ₹1.5 crore client. The sales VP warns that without this feature by Friday, the deal will be lost. The team’s committed Sprint Goal is to deploy a mandatory RBI regulatory compliance patch to prevent operating license revocation. What is your course of action?',
    targetTools: ['scrum', 'agile'],
    options: [
      {
        id: 'opt-pm-4-1',
        label: 'Instruct developers to immediately halt the compliance patch and build the custom SSO feature to win the revenue',
        toolUsed: 'Abrupt Sprint Goal Abandonment',
        explanation: 'Fatal governance failure. Aborting an RBI regulatory compliance deadline exposes the entire company to legal license revocation, while teaching sales that sprint commitments can be trampled at will.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-pm-4-2',
        label: 'Protect the Sprint Goal: Enforce that all scope changes route through the Product Owner; place the SSO feature at top of next Sprint Backlog (starting in 7 days); or have the PO cancel the sprint only if compliance can be legally deferred',
        toolUsed: 'Scrum Framework Sprint Goal Defense & Backlog Governance',
        explanation: 'Exemplary Scrum governance. The Sprint Goal is sacred. Protect developers from direct sales disruption. The Product Owner alone negotiates with the VP: if the compliance goal is non-negotiable, the SSO feature is scheduled for Sprint Planning starting next Monday (7 days away). If the revenue deal genuinely supersedes compliance, the PO alone has the authority to officially cancel and re-plan the sprint.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-pm-4-3',
        label: 'Tell the developers to work 16-hour days and weekends to build both the compliance patch and the SSO feature simultaneously',
        toolUsed: 'Heroics & Quality Destruction',
        explanation: 'Destructive. Heroic overtime produces un-reviewed, buggy code that breaks both the compliance patch and the enterprise SSO, burning out developers and violating the Definition of Done.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'In the Scrum framework, the Sprint Goal is the binding commitment for the Sprint Backlog. Allowing work to enter through the "side door" directly to developers destroys empiricism, quality, and velocity. The Scrum Master must intervene to protect the Developers: 1) Enforce accountabilities: Direct the sales VP to the Product Owner. Developers do not accept tasks directly from sales. 2) Protect the Sprint Goal: The Product Owner reminds leadership that missing the RBI compliance deadline invalidates the company’s operating license, destroying more enterprise value than any single client deal. 3) Provide a firm near-term commitment: Place the enterprise SSO feature at the very top of the Product Backlog for the upcoming sprint, which begins in just 7 days. Give the sales VP a written commitment that SSO work will begin next Monday with delivery 10 days later. Most enterprise deals can wait 7 days when given a reliable commitment. 4) The nuclear option: If executive leadership determines the enterprise deal is paramount and compliance can be granted an extension, the Product Owner officially cancels the sprint, clears the board, and initiates emergency Sprint Planning.',
    actionChecklist: [
      'Shield developers from direct stakeholder task injection during an active sprint',
      'Require all incoming feature requests to be evaluated and ordered exclusively by the Product Owner',
      'Protect the committed Sprint Goal against scope dilution unless the sprint is formally cancelled',
      'Offer stakeholders top-priority placement in the next sprint as a disciplined alternative to mid-sprint disruption',
      'Conduct a root-cause retrospective to determine why major enterprise sales requirements were not identified during product backlog refinement'
    ],
    reflectionKey: 'A sprint without a protected goal is just a chaotic to-do list. Say "no" through the Product Owner to protect team focus and quality.'
  }
];

export const CATEGORY_6_GLOSSARY: GlossaryItem[] = [
  { term: 'Acceptance Criteria', definition: 'The explicit conditions and boundaries that a user story or backlog work item must satisfy to be accepted as complete by the Product Owner.', tool: 'Agile Methodology' },
  { term: 'Activity-on-Node (AON)', definition: 'A standard project network diagram convention where discrete activities are represented as rectangular boxes (nodes) and dependencies are depicted as arrows.', tool: 'Critical Path (CPM)' },
  { term: 'Backlog', definition: 'A centralized, dynamically prioritized list of features, enhancements, user stories, and bug fixes that represents the single source of work for an Agile team.', tool: 'Agile Methodology' },
  { term: 'Baseline', definition: 'The frozen, formally approved version of a project scope, schedule, or budget against which actual performance and variance are measured.', tool: 'Gantt Chart' },
  { term: 'Burndown Chart', definition: 'A visual graph showing the remaining quantity of work (story points or hours) versus elapsed time within an iteration or across an entire release.', tool: 'Agile Methodology' },
  { term: 'Crashing', definition: 'A schedule compression technique where additional resources, overtime, or equipment are added to critical-path activities to shorten duration at the lowest marginal cost.', tool: 'Critical Path (CPM)' },
  { term: 'Critical Path', definition: 'The longest continuous sequence of dependent activities through a project network; tasks on this path have zero total float and dictate the minimum total project duration.', tool: 'Critical Path (CPM)' },
  { term: 'Daily Scrum', definition: 'A 15-minute daily time-boxed event for Developers to inspect progress toward the Sprint Goal and adapt the daily plan for the next 24 hours.', tool: 'Scrum Framework' },
  { term: 'Definition of Done (DoD)', definition: 'A formal, shared checklist of quality criteria (code review, testing, staging deployment, documentation) that an increment must satisfy to be deemed complete.', tool: 'Scrum Framework' },
  { term: 'Dependency (Link)', definition: 'A logical relationship between two activities determining when one can start or finish relative to another: FS (Finish-to-Start), SS (Start-to-Start), FF (Finish-to-Finish), SF (Start-to-Finish).', tool: 'Gantt Chart' },
  { term: 'Early Start / Early Finish (ES / EF)', definition: 'The earliest possible calendar dates an activity can begin and end, calculated during the forward pass based on predecessor completions.', tool: 'Critical Path (CPM)' },
  { term: 'Fast-Tracking', definition: 'A schedule compression technique where activities that were originally planned in sequence are overlapped or performed in parallel, increasing coordination risk.', tool: 'Critical Path (CPM)' },
  { term: 'Finish-to-Start (FS)', definition: 'The most common dependency relationship where a successor activity cannot begin until its immediate predecessor activity has completely finished.', tool: 'Gantt Chart' },
  { term: 'Float (Total Slack)', definition: 'The total duration an activity can be delayed or extended without delaying the final project completion date: Total Float = LS − ES = LF − EF.', tool: 'Critical Path (CPM)' },
  { term: 'Free Float', definition: 'The duration an activity can slip without delaying the Early Start of any immediately succeeding activity: Free Float = min(ES of successors) − EF.', tool: 'Critical Path (CPM)' },
  { term: 'Increment', definition: 'A concrete, usable stepping stone toward the Product Goal produced during a Sprint; must meet the Definition of Done to be acceptable.', tool: 'Scrum Framework' },
  { term: 'Iteration', definition: 'A fixed-length time-box (typically 1 to 4 weeks) during which an Agile team builds and delivers a usable, tested increment of work; called a Sprint in Scrum.', tool: 'Agile Methodology' },
  { term: 'Lag', definition: 'A mandatory waiting period or delay inserted into a dependency link (e.g. +7 days for concrete curing) before the successor activity can begin.', tool: 'Gantt Chart' },
  { term: 'Late Start / Late Finish (LS / LF)', definition: 'The latest possible calendar dates an activity can begin and end without delaying the final project completion date, calculated during the backward pass.', tool: 'Critical Path (CPM)' },
  { term: 'Lead Time', definition: 'An overlap inserted into a dependency link allowing a successor activity to begin before its predecessor has completely finished.', tool: 'Gantt Chart' },
  { term: 'Merge Bias', definition: 'The statistical tendency of project completion dates to be overly optimistic when several parallel near-critical paths converge on a common successor node.', tool: 'PERT Chart' },
  { term: 'Milestone', definition: 'A zero-duration marker in a schedule highlighting a major project event, external regulatory approval, decision gate, or client payment trigger.', tool: 'Gantt Chart' },
  { term: 'Minimum Viable Product (MVP)', definition: 'The earliest release of a product that contains just enough features to satisfy early adopters and generate validated learning from user feedback.', tool: 'Agile Methodology' },
  { term: 'Most Likely Duration (M)', definition: 'In PERT estimation, the duration expected to occur under normal operating conditions with typical delays and resources; the modal outcome.', tool: 'PERT Chart' },
  { term: 'Optimistic Duration (O)', definition: 'In PERT estimation, the shortest feasible duration if everything proceeds exceptionally well with zero complications; a 1-in-100 best case.', tool: 'PERT Chart' },
  { term: 'PERT Expected Time (TE)', definition: 'The statistically weighted duration of an activity derived from three-point estimates using the Beta distribution: TE = (O + 4M + P) / 6.', tool: 'PERT Chart' },
  { term: 'Pessimistic Duration (P)', definition: 'In PERT estimation, the worst-case duration if significant operational obstacles arise (excluding unprecedented catastrophes); a 1-in-100 worst case.', tool: 'PERT Chart' },
  { term: 'Product Backlog Refinement', definition: 'The ongoing activity of progressively decomposing, detailing, estimating, and ordering product backlog items so they are ready for future sprints.', tool: 'Scrum Framework' },
  { term: 'Product Owner', definition: 'The Scrum accountability uniquely responsible for maximizing product value and managing the prioritized Product Backlog.', tool: 'Scrum Framework' },
  { term: 'Resource Levelling', definition: 'An optimization technique that shifts activity schedules within available float so that no individual team member or equipment is over-allocated.', tool: 'Gantt Chart' },
  { term: 'Scrum Master', definition: 'The Scrum accountability dedicated to the team’s effectiveness, removing organizational blockers, and coaching Scrum principles as a servant-leader.', tool: 'Scrum Framework' },
  { term: 'Sprint Backlog', definition: 'The set of Product Backlog items selected for the Sprint, accompanied by the actionable execution plan and guided by the Sprint Goal.', tool: 'Scrum Framework' },
  { term: 'Sprint Goal', definition: 'The single overarching business objective established during Sprint Planning that gives the Developers focus and purpose throughout the Sprint.', tool: 'Scrum Framework' },
  { term: 'Three-Point Estimating', definition: 'An estimation technique that incorporates uncertainty by collecting Optimistic, Most Likely, and Pessimistic values for each activity.', tool: 'PERT Chart' },
  { term: 'Time-box', definition: 'A fixed, non-negotiable period of time within which activities or events must be completed, ending precisely on schedule regardless of completion.', tool: 'Agile Methodology' },
  { term: 'User Story', definition: 'A concise expression of customer need written from the end-user perspective: "As a [persona], I want [action] so that [benefit]".', tool: 'Agile Methodology' },
  { term: 'Velocity', definition: 'The measured amount of story points or backlog items completed by a Scrum team during an iteration; used exclusively for capacity forecasting.', tool: 'Agile Methodology' },
  { term: 'Work Breakdown Structure (WBS)', definition: 'A hierarchical, deliverable-oriented decomposition of the total scope of work to be carried out by the project team.', tool: 'Gantt Chart' },
  { term: 'Z-Score (Normal Distribution)', definition: 'The number of standard deviations a target date lies away from the expected project duration: Z = (Target Date − TE) / σ_proj; maps to completion probability.', tool: 'PERT Chart' }
];
