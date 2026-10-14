import { ToolDefinition, StrategyStack, ScenarioMission, GlossaryItem } from './toolsData.ts';

export const PROJECT_TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'gantt',
    name: 'Gantt Chart & Visual Milestone Scheduling',
    shortName: 'Gantt Chart',
    category: 'Project Management — Scheduling & Visualisation',
    difficulty: 'Beginner',
    tagline: 'Time-scaled horizontal bar chart linking tasks, dependencies, and milestones',
    corePurpose: 'Make a project plan visible so that everyone — sponsors, cross-functional teams, and external vendors — shares an identical, time-scaled picture of what happens when.',
    creator: 'Henry L. Gantt (c. 1910–1915); earlier bar-chart schedules originated with Karol Adamiecki (1890s)',
    whenToUse: [
      'Projects with clear deliverables, known sequential steps, and multiple interdependent contractors or departments',
      'Reporting overall schedule progress, milestones, and commitments to executive sponsors and boards',
      'Coordinating cross-functional handoffs (e.g. civil construction, IT infrastructure, equipment deliveries)',
      'Tracking baseline vs actual progress and identifying schedule slippage before deadlines pass'
    ],
    whenNotToUse: [
      'Pure exploratory research where each next step is discovered based on the previous outcome',
      'Small projects under ~8 tasks where a simple checklist or board suffices',
      'Fast-changing software products where requirements evolve weekly (use Scrum or Kanban instead)'
    ],
    keyComponents: [
      {
        name: 'Work Breakdown Structure (WBS) & Summary Tasks',
        description: 'Hierarchical decomposition of project deliverables into bite-sized tasks (1–10 working days each) grouped under clear summary work packages.',
        proTip: 'Never build the WBS alone at a desk. Build it directly with the frontline people doing the actual work.'
      },
      {
        name: 'Dependencies & Link Types',
        description: 'Logical constraints connecting tasks: Finish-to-Start (FS, most common), Start-to-Start (SS), Finish-to-Finish (FF), and Start-to-Finish (SF).',
        proTip: 'Never type hard start and finish dates into tasks. Link them with dependencies so upstream delays automatically ripple downstream.'
      },
      {
        name: 'Lags and Leads',
        description: 'Delays (lag, e.g. +7 days concrete curing or paint drying) or overlaps (lead, e.g. starting review 2 days before draft completion) on dependencies.',
        proTip: 'Use explicit lag on dependency links rather than creating artificial dummy tasks called "waiting".'
      },
      {
        name: 'Milestones (Zero-Duration Gates)',
        description: 'Significant decision points, external regulatory approvals, payment triggers, or handover dates marked with zero duration diamonds.',
        proTip: 'Create a milestone-only leadership view; executive sponsors need to see 5–10 critical dates, not 150 tactical sub-tasks.'
      },
      {
        name: 'Baselines & Variance Tracking',
        description: 'Freezing an approved snapshot of the initial schedule to measure actual start/finish dates, percent complete, and days of slippage.',
        proTip: 'Never silently re-baseline to hide slippage. Re-baseline only through a formal approved change request.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Project Charter & Deliverable Definition',
        action: 'Write the project objective and final deliverable in a single crisp sentence at the top of the chart.',
        deliverable: 'One-sentence charter with agreed completion milestone'
      },
      {
        step: 2,
        title: 'Decompose Scope into WBS',
        action: 'Break the project into summary packages and tasks sized between 1 and 10 working days with named individual owners.',
        deliverable: 'Hierarchical task inventory with single owners (no department names)'
      },
      {
        step: 3,
        title: 'Estimate Durations & Assign Dependencies',
        action: 'Estimate working days using historical records or vendor quotes, and link every task with its predecessor (defaulting to FS).',
        deliverable: 'Fully linked activity network with lag/lead for curing, transport, and approvals'
      },
      {
        step: 4,
        title: 'Insert Milestones & Verify Calendar',
        action: 'Add zero-duration milestones for client approvals and payment triggers, and configure the calendar for holidays and non-working days.',
        deliverable: 'Calendar-adjusted schedule with key milestones highlighted'
      },
      {
        step: 5,
        title: 'Baseline & Institute Weekly Update Cadence',
        action: 'Freeze the approved baseline, generate a one-page summary view for leadership, and establish a weekly live review with task owners.',
        deliverable: 'Saved baseline and scheduled Monday update rhythm'
      }
    ],
    caseStudy: {
      company: 'Meenakshi Precision Tools (Madurai, Tamil Nadu)',
      context: 'A 90-employee automotive component manufacturer won a contract to install a new CNC line for braking components within 20 weeks, subject to a ₹2 lakh/week penalty for late delivery. Past projects slipped 6–10 weeks because machinery procurement and civil foundations were planned in silos.',
      application: 'The founder built a 38-task WBS across Procurement, Civil & Utilities, Installation, Trials, and Customer PPAP Approval. Tasks were linked with explicit dependencies, including a 14-day curing lag on foundations. External power sanction was flagged as critical in week 2 and escalated immediately to the state utility.',
      outcome: 'Completed in week 21 (just one week late vs 8 weeks historically), reducing penalty exposure from an expected ₹16 lakh to ₹2 lakh. The Gantt template was adopted as company standard across all capital projects.'
    },
    executiveChecklist: [
      'Every task has an individual owner (a name, not a generic team)',
      'All tasks (except project start and finish) have at least one predecessor and successor',
      'No tasks have hardcoded dates; all dates derive from dependency links and calendars',
      'Lags are applied for chemical curing, shipping, legal notice periods, and inspections',
      'Baseline was saved and dated before project execution began',
      'Weekly update rhythm is scheduled with task owners physically or virtually present'
    ],
    pitfalls: [
      'Drawing static bars by hand in drawing tools instead of using calculated dependency links',
      'Assigning tasks to generic departments ("Marketing") leading to bystander apathy',
      'Neglecting government and customer review times, which secretly sit on the critical path',
      'Silently re-baselining whenever slippage occurs to make reports appear green',
      'Creating a massive 300-row monolithic chart that executives cannot digest'
    ],
    pairingRecommendations: [
      'Critical Path Method (CPM): Identify the zero-float chain of tasks that directly controls the project finish date',
      'PERT Chart: Apply three-point estimates (O, M, P) to high-variance tasks on the Gantt timeline',
      'Scrum Framework: Use a high-level Gantt chart for external client milestone commitments while development sprints run underneath'
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
    category: 'Project Management — Scheduling & Analysis',
    difficulty: 'Intermediate',
    tagline: 'Deterministic mathematical algorithm identifying zero-slack tasks that dictate the project completion date',
    corePurpose: 'Answer three executive questions with pure arithmetic rather than subjective opinion: When is the earliest we can finish? Which specific tasks cannot slip by even one day? Which tasks have float to absorb delays?',
    creator: 'Morgan R. Walker (DuPont) and James E. Kelley Jr. (Remington Rand), 1957',
    whenToUse: [
      'Complex projects with hard fixed deadlines, tight contractual penalties, and dozens of interdependent activities',
      'Evaluating schedule compression options: crashing (paying for extra labor/shifts) vs fast-tracking (overlapping sequential tasks)',
      'Allocating management focus and inspection rigor to the vital few zero-float tasks that directly control project delivery',
      'Resource reallocation: safely shifting staff and budget from high-float non-critical tasks to critical activities'
    ],
    whenNotToUse: [
      'Projects with fewer than ~10 activities where critical paths can be visually observed',
      'Research and development where durations are deeply uncertain (PERT is designed for this)',
      'Agile iterative environments where scope is intentionally flexible and delivered in fixed sprints'
    ],
    keyComponents: [
      {
        name: 'Activity-on-Node (AON) Network Logic',
        description: 'Directed graph where boxes represent discrete activities with known durations and arrows indicate mandatory precedence relationships.',
        proTip: 'Validate network logic with frontline engineers. A single missing dependency creates an erroneous critical path with complete false confidence.'
      },
      {
        name: 'Forward Pass (Earliest Dates)',
        description: 'Moving left-to-right from Start: Early Start (ES) of task = max(EF of predecessors); Early Finish (EF) = ES + Duration. Sets minimum project duration.',
        proTip: 'Use the Day-0 convention (ES=0, EF=Duration) to prevent off-by-one errors during hand calculations.'
      },
      {
        name: 'Backward Pass (Latest Dates)',
        description: 'Moving right-to-left from Project Finish: Late Finish (LF) = min(LS of successors); Late Start (LS) = LF - Duration.',
        proTip: 'If project finish date is fixed by contract, set LF of the final task to the required contractual deadline.'
      },
      {
        name: 'Total Float & Free Float Calculation',
        description: 'Total Float = LS - ES = LF - EF (how much an activity can slip without delaying project end). Free Float = min(ES of successors) - EF (slip without delaying next task).',
        proTip: 'Activities with zero total float constitute the Critical Path. Near-critical activities (float ≤ 2 days) must be monitored on a weekly watchlist.'
      },
      {
        name: 'Schedule Compression: Crashing vs Fast-Tracking',
        description: 'Crashing adds resources/cost to critical activities to shorten duration. Fast-tracking overlaps sequential activities, increasing coordination risk.',
        proTip: 'Always calculate cost per day saved when crashing. Crash the cheapest zero-float activity first, and recalculate after every step.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Inventory Activities & Durations',
        action: 'List all project tasks from the WBS with estimated working durations in uniform units (hours, days, or weeks).',
        deliverable: 'Activity table with IDs, descriptions, and durations'
      },
      {
        step: 2,
        title: 'Define Precedence Logic',
        action: 'Specify the immediate predecessors for every task and inspect for circular loops or orphan tasks.',
        deliverable: 'Precedence table showing dependency linkages'
      },
      {
        step: 3,
        title: 'Execute Forward Pass',
        action: 'Compute Early Start (ES) and Early Finish (EF) from left to right; determine total project duration at the Finish node.',
        deliverable: 'Earliest schedule timeline and minimum feasible duration'
      },
      {
        step: 4,
        title: 'Execute Backward Pass & Compute Float',
        action: 'Set LF of final node equal to project duration; compute Late Finish (LF), Late Start (LS), and Total Float (LS - ES).',
        deliverable: 'Complete table of Float values identifying the Critical Path (Float = 0)'
      },
      {
        step: 5,
        title: 'Formulate Compression & Monitoring Strategy',
        action: 'Evaluate crashing and fast-tracking options if project finish date is late; create a weekly watch list for near-critical tasks.',
        deliverable: 'Crashing cost table and weekly float consumption tracker'
      }
    ],
    caseStudy: {
      company: 'Vaigai Event Partners (Madurai, Tamil Nadu)',
      context: 'Contracted to execute a 2-day state-level EdTech expo with 80 exhibitor stalls, a 1,200-seat auditorium, and ministerial VIPs. The venue fit-out window was strictly 60 hours prior to opening, with heavy penalty clauses for late delivery.',
      application: 'Planners networked 47 fit-out tasks in hours. The initial CPM forward pass revealed a 71-hour critical path (11 hours late!). Management fast-tracked stall partitions into two parallel zones (saving 6 hours) and crashed audio-visual rigging by adding an extra technician (saving 4 hours at ₹15,000). Off-site backdrop pre-fabrication cut another 3 hours.',
      outcome: 'The fit-out completed in 57 hours with a 3-hour buffer before the fire inspection. Overtime costs fell by 40% because night-shift overtime was restricted strictly to zero-float critical crews.'
    },
    executiveChecklist: [
      'Every activity has at least one predecessor and successor (except Start and Finish)',
      'No circular dependency loops exist in the network logic',
      'Forward pass and backward pass are mathematically reconciled (Project Duration matches EF of final task)',
      'Critical path (Total Float = 0) is visibly highlighted and communicated to the team',
      'Near-critical tasks (Float ≤ 10% of total project length) are tracked on a weekly watch list',
      'Crashing candidates are ranked by marginal cost per day saved before committing capital'
    ],
    pitfalls: [
      'Treating the critical path as permanent; any slippage in a near-critical task can instantly shift the critical path',
      'Crashing non-critical activities that have float, spending money without advancing the project completion date',
      'Ignoring resource constraints: two simultaneous critical tasks that require the same specialist will fail unless leveled',
      'Relying on percent-complete alone instead of monitoring float consumption',
      'Fast-tracking without adding quality gates, leading to massive downstream rework'
    ],
    pairingRecommendations: [
      'Gantt Chart: Convert CPM network math into an executive horizontal bar chart with critical path highlighting',
      'PERT Chart: Substitute CPM deterministic durations with three-point estimates when task durations are uncertain',
      'Earned Value Management (EVM): Correlate critical path float consumption with Schedule Performance Index (SPI)'
    ],
    quiz: [
      {
        id: 'cpm-q1',
        question: 'By definition, what constitutes the Critical Path in an activity network?',
        options: [
          'The path containing the greatest number of individual tasks',
          'The path with the highest monetary budget',
          'The longest path through the network, composed of activities with zero total float',
          'The path that requires the most senior technical specialists'
        ],
        correctAnswer: 2,
        explanation: 'The critical path is the longest sequence of dependent activities through the network; any delay on these zero-float tasks directly delays the project completion.'
      },
      {
        id: 'cpm-q2',
        question: 'How is Total Float (slack) mathematically computed for any activity in CPM?',
        options: [
          'Early Finish (EF) minus Early Start (ES)',
          'Late Start (LS) minus Early Start (ES), or Late Finish (LF) minus Early Finish (EF)',
          'Late Finish (LF) minus Late Start (LS)',
          'Task Duration minus dependency Lag'
        ],
        correctAnswer: 1,
        explanation: 'Total Float = LS - ES = LF - EF. It represents the amount of time an activity can slip without delaying the project finish date.'
      },
      {
        id: 'cpm-q3',
        question: 'During the CPM forward pass, if Activity D has two predecessors (B with EF = 7 days, and C with EF = 11 days), what is the Early Start (ES) of Activity D?',
        options: ['7 days', '11 days', '9 days (the average)', '18 days (the sum)'],
        correctAnswer: 1,
        explanation: 'In the forward pass, an activity cannot start until all its predecessors have finished, so its Early Start equals the maximum Early Finish among its predecessors (11 days).'
      },
      {
        id: 'cpm-q4',
        question: 'What is the key operational distinction between "Fast-Tracking" and "Crashing" in CPM schedule compression?',
        options: [
          'Crashing overlaps sequential tasks; Fast-Tracking adds extra workers',
          'Fast-Tracking overlaps activities planned in sequence (increasing risk); Crashing adds resources/cost to critical activities',
          'Fast-Tracking cancels low-priority deliverables; Crashing extends work hours',
          'Fast-Tracking applies only to software; Crashing applies only to civil construction'
        ],
        correctAnswer: 1,
        explanation: 'Fast-tracking involves running previously sequential activities in parallel (adds coordination and rework risk without cost); crashing injects resources (overtime, extra crews) to reduce duration for money.'
      },
      {
        id: 'cpm-q5',
        question: 'After successfully crashing a critical activity by 4 days, what must the project scheduler immediately do next?',
        options: [
          'Freeze the schedule permanently',
          'Immediately crash that same activity by another 4 days',
          'Recalculate the entire network, because a different parallel path may now have become critical',
          'Delete the project baseline'
        ],
        correctAnswer: 2,
        explanation: 'Shortening the critical path reduces its total length, which frequently causes another parallel path with small float to become the new (or co-) critical path.'
      }
    ]
  },
  {
    id: 'pert',
    name: 'PERT Chart (Program Evaluation & Review Technique)',
    shortName: 'PERT Chart',
    category: 'Project Management — Scheduling under Uncertainty',
    difficulty: 'Intermediate',
    tagline: 'Probabilistic three-point estimating and normal distribution modeling for deadline confidence',
    corePurpose: 'Make honest estimates under uncertainty, quantify variance, and replace misleading single-date guesses with defensible confidence probabilities (e.g. "There is an 85% probability we finish by June 15").',
    creator: 'U.S. Navy Special Projects Office, Booz Allen Hamilton & Lockheed (1957–1958) for the Polaris Missile Program',
    whenToUse: [
      'R&D, custom software, pioneering engineering, and first-of-a-kind projects with high duration uncertainty',
      'Preparing competitive bids, tenders, and client commitments where late penalties demand quantified contingency buffers',
      'Identifying which specific tasks drive the majority of project schedule variance to target research and de-risking',
      'Reporting probability distributions and confidence bands (50%, 80%, 95%) to boards and investment committees'
    ],
    whenNotToUse: [
      'Routine, repetitive projects with historical standardized duration data (CPM is simpler and sufficient)',
      'Teams unwilling to engage in honest three-point estimation discussions who just guess numbers',
      'Tiny projects under ~8 tasks where estimating overhead exceeds the value of statistical analysis'
    ],
    keyComponents: [
      {
        name: 'Three-Point Estimating (O, M, P)',
        description: 'Gathering three distinct estimates per task: Optimistic (O, 1-in-100 best case), Most Likely (M, modal normal outcome), and Pessimistic (P, 1-in-100 worst case excluding catastrophes).',
        proTip: 'Ask for the worst-case scenario (P) first during estimation sessions. This breaks optimistic anchoring on the hopeful number.'
      },
      {
        name: 'Weighted Expected Duration (TE)',
        description: 'Formula based on the Beta distribution weighting Most Likely four times: TE = (O + 4M + P) / 6.',
        proTip: 'Expected duration (TE) corresponds to the 50% probability mark on a symmetric distribution, not an 80% or 95% commercial commitment.'
      },
      {
        name: 'Activity Variance & Standard Deviation',
        description: 'Standard deviation σ = (P - O) / 6; Activity Variance σ² = ((P - O) / 6)². Quantifies the degree of uncertainty in each task.',
        proTip: 'Variances are mathematically additive along a critical path; standard deviations cannot simply be added together.'
      },
      {
        name: 'Project Critical Path Variance & Standard Deviation',
        description: 'Sum of variances along the critical path: Project Variance = Σ(σ²_critical); Project Standard Deviation σ_proj = √(Σ(σ²_critical)).',
        proTip: 'The activity with the largest variance on the critical path is your #1 schedule risk, regardless of whether it has the longest duration.'
      },
      {
        name: 'Z-Score & Probability of Meeting Deadline',
        description: 'Formula Z = (Target Date - Expected Project Duration TE) / σ_proj. Maps to standard normal distribution table for completion probability.',
        proTip: 'Never commit commercially at 50% confidence (Z=0). Healthy organizations commit at 80% (Z=0.84) to 95% (Z=1.65) confidence.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Define Confidence Objectives',
        action: 'Agree with leadership on the required commitment confidence level (e.g. 80% for internal milestones, 95% for penalty contracts).',
        deliverable: 'Target confidence standard documented in project charter'
      },
      {
        step: 2,
        title: 'Facilitate Three-Point Estimation',
        action: 'Conduct structured interviews with task owners to collect O, M, and P estimates, challenging narrow ranges where P < 1.5 × O.',
        deliverable: 'Three-point estimation worksheet with rationale notes'
      },
      {
        step: 3,
        title: 'Calculate TE, Standard Deviation, and Variance',
        action: 'Compute TE = (O + 4M + P)/6 and variance = ((P - O)/6)² for every activity.',
        deliverable: 'Activity table populated with statistical metrics'
      },
      {
        step: 4,
        title: 'Identify Critical Path & Project Variance',
        action: 'Run CPM network pass using TE values to identify the critical path, and compute project standard deviation σ_proj = √(Σ σ²_critical).',
        deliverable: 'Expected project duration (50% point) and project standard deviation'
      },
      {
        step: 5,
        title: 'Size Contingency Buffer & Mitigate Top Variance',
        action: 'Calculate Z-score for requested deadlines, compute contingency days required for target confidence, and create mitigations for top 3 variance tasks.',
        deliverable: 'Commitment date with stated confidence % and variance mitigation action plan'
      }
    ],
    caseStudy: {
      company: 'Thamirabarani Labs (Tirunelveli, Tamil Nadu)',
      context: 'A 40-person embedded IoT product company developing a smart energy-meter module for a state utility. The utility demanded a firm delivery date for 500 pilot units. Past hardware projects ran 30–50% late due to semiconductor shortages and BIS/EMC certification cycles.',
      application: 'The team networked 24 activities across 5 phases. Three-point estimating revealed an expected critical path of 26.5 weeks with σ = 3.1 weeks. Component procurement (O: 3w, M: 6w, P: 14w) and EMC certification (O: 2w, M: 4w, P: 9w) accounted for over 70% of total schedule variance! The team pre-ordered components in week 1 and performed pre-compliance EMC scans, shrinking the critical path to 25 weeks with σ = 2.2 weeks.',
      outcome: 'Offered the utility a committed delivery date of 29 weeks (96% confidence) with an early bonus tier under 26 weeks. Pilot units were delivered in week 27 — within the committed window for the first time in company history.'
    },
    executiveChecklist: [
      'Every critical task has recorded O, M, and P estimates backed by reasoning',
      'Pessimistic estimates reflect genuine worst-case operational obstacles, not wishful thinking',
      'Expected duration TE and project standard deviation σ_proj are calculated using the Beta distribution',
      'Target client completion dates are stated alongside an explicit statistical confidence percentage',
      'Contingency buffer is visible in the project schedule rather than padded into individual tasks',
      'Top-variance activities have concrete proactive mitigation plans in place'
    ],
    pitfalls: [
      'Presenting the expected duration TE (50% coin-flip probability) to clients as a firm commitment date',
      'Adding standard deviations instead of summing variances before taking the square root',
      'Anchoring: estimators giving O = M - 1 and P = M + 1, defeating the purpose of uncertainty modeling',
      'Ignoring merge bias: when multiple near-critical paths converge, the probability of finishing on time drops significantly',
      'Failing to log actual durations against O/M/P to calibrate team estimating accuracy over time'
    ],
    pairingRecommendations: [
      'Critical Path Method (CPM): PERT provides the probabilistic duration inputs that power CPM network analysis',
      'Monte Carlo Simulation: Run 1,000+ randomized iterations on the PERT network to eliminate merge bias',
      'Risk Register: Map the highest-variance PERT activities directly into corporate risk mitigation protocols'
    ],
    quiz: [
      {
        id: 'pert-q1',
        question: 'What is the standard PERT formula for calculating the expected duration (TE) of an activity from its three-point estimates?',
        options: [
          '(Optimistic + Most Likely + Pessimistic) / 3',
          '(Optimistic + 4 × Most Likely + Pessimistic) / 6',
          '(Optimistic + 2 × Most Likely + Pessimistic) / 4',
          '(Optimistic + Pessimistic) / 2'
        ],
        correctAnswer: 1,
        explanation: 'PERT uses the Beta distribution weighting: TE = (O + 4M + P) / 6, placing four times as much mathematical weight on the most likely outcome.'
      },
      {
        id: 'pert-q2',
        question: 'What is the formula for the standard deviation (σ) of a single activity in PERT?',
        options: ['(Pessimistic − Optimistic) / 6', '(Pessimistic − Optimistic) / 3', '(Most Likely − Optimistic) / 2', '(Pessimistic + Optimistic) / 6'],
        correctAnswer: 0,
        explanation: 'Assuming the range (P - O) spans approximately 6 standard deviations (±3σ) of a Beta distribution, σ = (P - O) / 6.'
      },
      {
        id: 'pert-q3',
        question: 'How is the total standard deviation of the project calculated along the critical path?',
        options: [
          'By simply adding together the standard deviations of all critical activities',
          'By summing the variances (σ²) of all critical path activities and then taking the square root',
          'By taking the largest standard deviation found on the critical path',
          'By averaging all the standard deviations along the path'
        ],
        correctAnswer: 1,
        explanation: 'Variances are statistically additive along independent series of activities, whereas standard deviations are not. Project σ = √(Σ σ²_critical).'
      },
      {
        id: 'pert-q4',
        question: 'If a project has an expected duration (TE) of 30 days and a project standard deviation (σ_proj) of 4 days, what is the statistical probability of finishing within 30 days?',
        options: ['100%', '84%', '50%', '16%'],
        correctAnswer: 2,
        explanation: 'At Target = TE (30 days), Z = (30 - 30)/4 = 0. On a standard normal curve, Z = 0 corresponds exactly to the 50th percentile (50% probability).'
      },
      {
        id: 'pert-q5',
        question: 'Which activity on the critical path most urgently deserves executive risk-mitigation effort and resources?',
        options: [
          'The activity with the longest expected duration TE',
          'The activity with the largest variance (highest σ²)',
          'The activity with the greatest number of predecessor tasks',
          'The activity with the lowest labor cost'
        ],
        correctAnswer: 1,
        explanation: 'Variance represents unpredictability and schedule risk. A 5-day task with huge variance (P-O = 20 days) contributes far more schedule risk than a predictable 30-day task with zero variance.'
      }
    ]
  },
  {
    id: 'agile',
    name: 'Agile Methodology & Iterative Delivery',
    shortName: 'Agile Methodology',
    category: 'Project Management — Delivery Approach',
    difficulty: 'Intermediate',
    tagline: 'Value-driven delivery in short feedback loops with empirical backlog prioritization',
    corePurpose: 'Deliver customer value early and continuously, minimize the cost of changing direction, and keep schedules honest by replacing speculative forecasts with evidence from working increments.',
    creator: '17 software practitioners at Snowbird, Utah (February 2001) — The Agile Manifesto',
    whenToUse: [
      'Complex digital products, software, UX design, marketing, and curriculum where customer requirements evolve with market feedback',
      'Situations where fast time-to-market with a Minimum Viable Product (MVP) delivers early cash flow and learning',
      'High-uncertainty domains where initial specification documents are likely to become obsolete within months',
      'Cross-functional teams that have the autonomy to self-organize around customer outcomes'
    ],
    whenNotToUse: [
      'Physical infrastructure or civil construction where pouring concrete and tearing down walls has immense physical rework costs',
      'Fixed-price, rigid-scope contracts where client procurement rules strictly forbid iterative scope adjustments',
      'Environments lacking an engaged Product Owner who has the authority to make real-time prioritization decisions'
    ],
    keyComponents: [
      {
        name: 'The Four Core Values',
        description: 'Individuals and interactions over processes and tools; Working software/output over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan.',
        proTip: 'The items on the right still have value, but Agile teams value the items on the left more.'
      },
      {
        name: 'Prioritized Product Backlog & User Stories',
        description: 'Single ordered list of all desired features and improvements phrased as user stories: "As a [persona], I want [action] so that [benefit]" with explicit acceptance criteria.',
        proTip: 'Always slice stories vertically across database, logic, and UI so each story delivers a testable slice of user value.'
      },
      {
        name: 'Definition of Done (DoD)',
        description: 'A formal, shared quality checklist that every work item must satisfy before it can be considered complete (e.g. peer-reviewed, tested, deployed, documented).',
        proTip: 'Never compromise on the Definition of Done to hit a deadline; that creates hidden technical debt that cripples future iterations.'
      },
      {
        name: 'Velocity & Empirical Forecasting',
        description: 'The measured amount of backlog story points completed per iteration used strictly for forecasting future completion ranges, not team evaluation.',
        proTip: 'Forecast with ranges based on trailing 3-iteration rolling velocity (e.g. 28–34 points), never a single speculative number.'
      },
      {
        name: 'Continuous Improvement (Retrospectives)',
        description: 'Regular cadence meetings (e.g. Start/Stop/Continue, 4Ls) where the team inspects its own processes, tooling, and communication to execute 1–2 actionable improvements.',
        proTip: 'Never skip the retrospective when busy. Being busy is the clearest symptom that process improvement is desperately needed.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Appoint Empowered Product Owner',
        action: 'Designate a single product owner with full decision-making authority to prioritize the backlog and accept completed work.',
        deliverable: 'Named Product Owner with signed charter authority'
      },
      {
        step: 2,
        title: 'Draft Product Vision & Initial Backlog',
        action: 'Formulate a one-page product vision and break requirements into user stories with clear acceptance criteria.',
        deliverable: 'Ordered Product Backlog of top 20–30 user stories'
      },
      {
        step: 3,
        title: 'Establish Definition of Done (DoD)',
        action: 'Collaboratively define the strict quality and testing criteria that an increment must satisfy to be deemed "done".',
        deliverable: 'Visible Definition of Done checklist'
      },
      {
        step: 4,
        title: 'Run Iteration Cycle (Plan, Build, Review)',
        action: 'Commit to a 2-week timebox; execute daily syncs; demonstrate working increments to stakeholders at iteration end.',
        deliverable: 'Potentially shippable working increment demonstrated live'
      },
      {
        step: 5,
        title: 'Inspect & Adapt (Retrospective & Forecast)',
        action: 'Hold a retrospective to improve ways of working; measure velocity and update range-based roadmaps for stakeholders.',
        deliverable: 'Process improvement action items and updated velocity forecast'
      }
    ],
    caseStudy: {
      company: 'Kaveri Software Services (Madurai, Tamil Nadu)',
      context: 'A 120-person IT services firm undertook a 12-month e-commerce rebuild for a UK retailer. Six months in, the traditional waterfall plan was 40% behind schedule, 60 contentious change requests had been raised, and client relations were fracturing.',
      application: 'The delivery head persuaded the client CTO to act as Product Owner and switch to 2-week Agile iterations. The remaining scope was converted into 180 user stories. The contract was amended to a time-and-materials model with capped spend and a 2-week termination clause. Automated regression testing was instituted in iteration 4, and releases went live every two iterations.',
      outcome: 'The first production release deployed in 8 weeks (compared to zero in the prior 6 months). Change requests disappeared as a contractual dispute because changes were simply reprioritized into the backlog. The contract was delivered in 12 iterations and extended for two additional years.'
    },
    executiveChecklist: [
      'A single Product Owner is actively available and holds final prioritization authority',
      'The Product Backlog is ordered by customer value, technical risk, and learning return',
      'Every user story includes clear, measurable acceptance criteria before being pulled into an iteration',
      'The Definition of Done is visible, shared, and enforced without exceptions',
      'Time-boxes are strictly respected; unfinished work returns to the backlog rather than extending the iteration',
      'Stakeholders inspect working product increments live rather than viewing status slide decks'
    ],
    pitfalls: [
      'Agile in name only (Dark Agile): holding standups and ceremonies while enforcing rigid fixed-scope waterfall plans',
      'Product Owner by committee, forcing the delivery team to wait weeks for consensus',
      'Treating velocity as an individual performance metric, prompting story point inflation and gaming',
      'Creating "mini-waterfalls" inside iterations (week 1 coding, week 2 testing) rather than cross-functional swarming',
      'Accumulating technical debt by skipping automated testing to meet artificial sprint deadlines'
    ],
    pairingRecommendations: [
      'Scrum Framework: Implement Agile principles using Scrum accountabilities, events, and artifacts',
      'Gantt Chart: Maintain a high-level programme Gantt for external partner milestones while Agile teams iterate underneath',
      'Jobs to Be Done (JTBD): Anchor user stories in functional, emotional, and social customer job dimensions'
    ],
    quiz: [
      {
        id: 'agile-q1',
        question: 'According to the Agile Manifesto, what is the primary measure of project progress?',
        options: [
          'Comprehensive completed documentation',
          'Working software and usable output',
          'Billable engineering hours logged',
          'Predefined milestone checklist completion'
        ],
        correctAnswer: 1,
        explanation: 'Principle #7 of the Agile Manifesto states that "Working software is the primary measure of progress."'
      },
      {
        id: 'agile-q2',
        question: 'What is the strict rule governing a "time-box" in Agile methodology?',
        options: [
          'The iteration is extended until all committed tasks are 100% finished',
          'The iteration ends strictly on its scheduled calendar date regardless of whether all work is completed',
          'The time-box can be extended if approved by the Scrum Master',
          'A time-box refers to the total billable budget of the project'
        ],
        correctAnswer: 1,
        explanation: 'In Agile, time and quality are fixed; scope flexes. When a time-box ends, incomplete work returns to the backlog.'
      },
      {
        id: 'agile-q3',
        question: 'In an Agile environment, which individual or role must possess the sole authority to prioritize and accept work?',
        options: ['The Project Sponsor', 'The Product Owner', 'The Scrum Master', 'The QA Lead'],
        correctAnswer: 1,
        explanation: 'The Product Owner is uniquely accountable for maximizing product value and ordering the Product Backlog.'
      },
      {
        id: 'agile-q4',
        question: 'What is the appropriate managerial use of team "Velocity" in Agile development?',
        options: [
          'Ranking and comparing the performance of different engineering teams',
          'Internal forecasting of approximately how much backlog can be completed in future iterations',
          'Billing clients a fixed monetary fee per story point delivered',
          'Setting individual annual employee compensation bonuses'
        ],
        correctAnswer: 1,
        explanation: 'Velocity is a team-internal calibration metric used for forecasting delivery capacity over time; using it as a performance target distorts estimates.'
      },
      {
        id: 'agile-q5',
        question: 'What is the primary objective of holding an Iteration Retrospective?',
        options: [
          'Demonstrate the working increment to executive stakeholders',
          'Assign blame for user stories that were not completed',
          'Inspect the team’s interpersonal, technical, and process practices to identify concrete improvements',
          'Update the master Gantt chart'
        ],
        correctAnswer: 2,
        explanation: 'Retrospectives are designed for continuous self-improvement, allowing the team to inspect how it works and commit to actionable process enhancements.'
      }
    ]
  },
  {
    id: 'scrum',
    name: 'Scrum Framework',
    shortName: 'Scrum Framework',
    category: 'Project Management — Agile Framework',
    difficulty: 'Intermediate',
    tagline: 'Lightweight empirical framework with 3 accountabilities, 5 events, and 3 artefacts',
    corePurpose: 'Help self-organizing cross-functional teams deliver complex products incrementally through empiricism (transparency, inspection, and adaptation) in fixed-length sprints.',
    creator: 'Ken Schwaber and Jeff Sutherland (early 1990s); inspired by Takeuchi and Nonaka’s 1986 HBR rugby scrum concept',
    whenToUse: [
      'Stable cross-functional teams of 3–9 developers building complex software or digital products',
      'Environments requiring a predictable, rhythmic release cadence (e.g. 2-week sprints) for stakeholder coordination',
      'Teams transitioning away from command-and-control project management toward empowered self-organization',
      'Projects requiring continuous stakeholder validation and backlog reprioritization based on empirical feedback'
    ],
    whenNotToUse: [
      'Organizations where an empowered Product Owner cannot be dedicated to the team',
      'Operations teams handling continuous flow with wildly variable ticket sizes (Kanban is a better fit)',
      'Projects with fixed-scope, fixed-price legal contracts where change is legally prohibited'
    ],
    keyComponents: [
      {
        name: 'The 3 Accountabilities',
        description: 'Product Owner (maximizes product value and manages Product Backlog); Scrum Master (fosters team effectiveness and removes impediments); Developers (committed to creating usable Increments each Sprint).',
        proTip: 'There is no Project Manager in Scrum. Project management responsibilities are distributed across the PO, SM, and Developers.'
      },
      {
        name: 'The 5 Events',
        description: 'The Sprint (container timebox ≤ 1 month); Sprint Planning (defines Sprint Goal and selected backlog); Daily Scrum (15-min daily sync for Developers); Sprint Review (inspect increment with stakeholders); Sprint Retrospective (team process improvement).',
        proTip: 'The Daily Scrum is for the Developers to inspect progress toward the Sprint Goal, not a status report to a manager.'
      },
      {
        name: 'The 3 Artefacts & Commitments',
        description: 'Product Backlog (committed to Product Goal); Sprint Backlog (committed to Sprint Goal); Increment (committed to Definition of Done).',
        proTip: 'A Sprint Backlog must have a clear, unifying Sprint Goal; a sprint without a goal is merely a disconnected to-do list.'
      },
      {
        name: 'Sprint Goal Protection',
        description: 'During the sprint, no changes are made that would endanger the Sprint Goal. Scope can be clarified and renegotiated with the Product Owner as more is learned.',
        proTip: 'If urgent external work arrives mid-sprint, route it to the Product Owner to place into the backlog for the next sprint.'
      },
      {
        name: 'Empirical Process Control: Transparency, Inspection, Adaptation',
        description: 'The philosophical core of Scrum. Work must be transparent; inspected frequently against goals; and adapted immediately when variances occur.',
        proTip: 'Ceremonies without empiricism are merely theater. Every event must result in concrete adaptation.'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Establish Accountabilities & Team',
        action: 'Appoint an empowered Product Owner, train a servant-leader Scrum Master, and assemble a cross-functional team of 3–9 Developers.',
        deliverable: 'Staffed Scrum Team charter with confirmed executive backing'
      },
      {
        step: 2,
        title: 'Define Product Goal & Build Backlog',
        action: 'Formulate an overarching Product Goal and order the Product Backlog by value, risk, and dependencies.',
        deliverable: 'Ordered Product Backlog aligned to the Product Goal'
      },
      {
        step: 3,
        title: 'Establish Sprint Cadence & DoD',
        action: 'Fix sprint length (2 weeks recommended) and publish the recurring event calendar; author a strict Definition of Done.',
        deliverable: 'Published event calendar and agreed Definition of Done'
      },
      {
        step: 4,
        title: 'Execute Sprint Cycle',
        action: 'Conduct Sprint Planning to set the Sprint Goal; hold 15-minute Daily Scrums; focus Developers on completing the Increment.',
        deliverable: 'Usable Increment satisfying the Definition of Done'
      },
      {
        step: 5,
        title: 'Review Increment & Adapt Process',
        action: 'Demonstrate the Increment live at the Sprint Review; hold the Sprint Retrospective to commit to process improvements; immediately start next sprint.',
        deliverable: 'Adapted Product Backlog and retrospective action items'
      }
    ],
    caseStudy: {
      company: 'Pandiyan Digital Learning (Madurai, Tamil Nadu)',
      context: 'A 70-person EdTech firm offering online certification platforms for partner universities across Tamil Nadu. The 9-person development team was inundated with ad-hoc requests via WhatsApp and phone calls, causing releases to break live exam portals.',
      application: 'The company instituted 2-week Scrum sprints. The Head of Product was named sole Product Owner, establishing the Product Goal: "A zero-downtime platform during exam months that onboards partner colleges in under 24 hours." All 300+ legacy requests were funneled into a single backlog. A strict Definition of Done was enforced (peer-reviewed, automated tests passing, staging verified).',
      outcome: 'Live platform incidents during exam weeks fell from 3 per week to zero. The release cadence achieved 100% predictability every two weeks for six consecutive months. Partner onboarding dropped to under one day, hitting the strategic goal in Sprint 9.'
    },
    executiveChecklist: [
      'The Product Owner is a single individual with authority, not a committee',
      'The Scrum Master acts as a coach and facilitator, not a task-assigning project manager',
      'Developers self-organize and determine how much work they pull into the Sprint Backlog',
      'Every Sprint has a clear, business-focused Sprint Goal that guides trade-offs',
      'The Daily Scrum is kept strictly to 15 minutes and run by the Developers',
      'Stakeholders attend the Sprint Review to interact with the working Increment, not review status slides'
    ],
    pitfalls: [
      'Treating the Daily Scrum as a status interrogation where developers report to the Scrum Master or manager',
      'Allowing stakeholders or managers to bypass the Product Owner and assign tasks directly to developers',
      'Changing the Sprint Goal mid-sprint, destroying developer focus and psychological safety',
      'Omitting the Definition of Done or allowing unverified code into production to "make the sprint look good"',
      'Skipping retrospectives or treating them as venting sessions without tracking concrete action items'
    ],
    pairingRecommendations: [
      'Agile Methodology: Scrum provides the concrete roles, artifacts, and cadences that enact Agile principles',
      'Kanban: Integrate WIP limits and flow metrics onto the Scrum team’s Sprint Backlog board (Scrumban)',
      'OKR Framework: Connect Quarterly Strategic Objectives to Sprint Goals across 6 consecutive two-week sprints'
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
    crisisPrompt: 'Your commercial sales vice-president has verbally promised a enterprise client a hard 10-week delivery for a mission-critical payments gateway integration. Your engineering team just ran a rigorous PERT analysis on the critical path, yielding an Expected Duration (TE) of 11.5 weeks with a Project Standard Deviation (σ_proj) of 1.5 weeks. The client contract includes a 5%-of-contract-value penalty per week of delay. What is your executive action?',
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
