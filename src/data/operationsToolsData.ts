import { ToolDefinition, StrategyStack, ScenarioMission, GlossaryItem } from './toolsData.ts';

export const OPERATIONS_TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'lean',
    name: 'Lean Management',
    shortName: 'Lean Management',
    category: 'Operations & Process',
    tagline: 'Eliminate waste, create continuous flow, and deliver maximum customer value with fewer resources',
    origin: 'Toyota Production System (Taiichi Ohno, Shigeo Shingo, Eiji Toyoda, 1950s); coined by John Krafcik (1988) and popularized by Womack, Jones, and Roos in The Machine That Changed the World (1990).',
    corePurpose: 'Shorten the elapsed time between customer order and delivery of value by removing all non-value-adding activities (Muda).',
    primaryUsers: ['Operations managers', 'Plant heads', 'Service-delivery managers', 'Hospital administrators', 'Back-office & educational leaders'],
    difficulty: 'Intermediate',
    horizon: 'Ongoing operational system / 1–3 month improvement waves',
    scope: 'End-to-end value streams / Departments / Enterprises',
    timeToResult: '2–4 weeks for initial 5S & waste walk wins',
    dataNeeds: 'Process cycle times, queue delays, WIP levels, customer demand rate, rework percentages',
    keyOutput: 'Waste-free value stream, 5S workplace audit standards, takt-balanced workstations, standard work sheets, daily Gemba management boards',
    bestPairedWith: 'Value Stream Mapping (diagnostic), Kaizen (daily engine), Kanban (pull execution), Six Sigma (for persistent variation)',
    keyFeatures: [
      'Five core Lean principles: Define Value, Map Value Stream, Create Flow, Establish Pull, Pursue Perfection',
      'The Eight Wastes (TIMWOODS): Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects, Skills under-used',
      '5S Workplace Organisation: Sort (Seiri), Set in Order (Seiton), Shine (Seiso), Standardise (Seiketsu), Sustain (Shitsuke)',
      'Takt Time Calculation: Matching production cadence directly to customer demand rate',
      'Jidoka & Poka-Yoke: Built-in quality with line-stop authority and mistake-proofing devices',
      'Standard Work documentation: Best-known, safest, and most repeatable method for each task',
      'Daily Gemba Management Board: Safety, Quality, Delivery, Cost/People (SQDC) tracking'
    ],
    howItWorks: 'Identify value strictly from the customer perspective. Map every physical and information step in the stream and categorize as Value-Adding (VA), Necessary Non-Value-Adding (NNVA), or Pure Waste (NVA). Eliminate the 8 wastes, reorganize into continuous one-piece or small-batch flow, balance tasks to Takt time, let downstream pull demand, document standard work, and run daily 15-minute Gemba standups.',
    coreConcepts: [
      {
        term: 'Value vs. Waste (Muda)',
        definition: 'Value is any activity the customer willingly pays for that physically transforms the output correctly the first time; all else is waste.'
      },
      {
        term: 'TIMWOODS',
        definition: 'Acronym for the 8 wastes: Transport, Inventory, Motion, Waiting, Overproduction (the worst waste), Overprocessing, Defects, Skills under-utilized.'
      },
      {
        term: 'Takt Time',
        definition: 'Available working production time divided by customer demand. The drumbeat pace required to satisfy customer demand without over- or under-producing.'
      },
      {
        term: 'Gemba Walk',
        definition: 'Going to "the real place" where value is created to directly observe flow, listen to frontline operators, and identify real friction.'
      },
      {
        term: 'Standard Work',
        definition: 'The documented current best, safest, and easiest way to complete a task, serving as the required baseline before any Kaizen improvement.'
      }
    ],
    strengths: [
      'Delivers massive reductions in lead time (often 40–70%) and working capital tied up in inventory',
      'Engages and respects frontline workers by giving them tools to eliminate their daily frustrations',
      'Low cost to initiate—observation and common sense generate significant early wins without software spend'
    ],
    limitations: [
      'Can degrade into superficial "5S poster campaigns" if leadership lacks daily Gemba discipline',
      'Fails catastrophically if employees suspect Lean is a veiled excuse for workforce downsizing',
      'Does not provide complex statistical tools needed when quality defects stem from intricate multi-variable variation (Six Sigma required)'
    ],
    workflowPlacement: {
      upstream: 'Business strategy & OKRs, Value Stream Mapping diagnosis',
      downstream: 'Kanban pull systems, Kaizen blitz events, Six Sigma DMAIC projects, ISO 9001 standard work'
    },
    useCases: [
      {
        title: 'Pump Component Job Shop Flow Turnaround',
        industry: 'Precision Manufacturing',
        situation: 'Coimbatore shop quoted 15-day delivery but averaged 30 days due to machine queue bottlenecks and large batching.',
        action: 'Conducted Gemba waste walk, reduced batch sizes from 2,000 to 500 units, introduced line-side 5S tool shadowing, and instituted a daily SQDC whiteboard standup.',
        outcome: 'Lead time fell to 7.5 days, WIP inventory dropped 40%, and on-time shipment jumped to 96%.'
      },
      {
        title: 'Private Engineering College Admissions Streamlining',
        industry: 'Higher Education',
        situation: 'Admissions created a 14-day backlog with triplicate document verification across three separate buildings.',
        action: 'Defined applicant value, eliminated redundant approvals, co-located verification into a single-piece flow desk, and calculated hourly takt time during peak counseling weeks.',
        outcome: 'Application-to-offer turnaround plummeted from 14 days to under 4 hours with zero staff overtime.'
      }
    ],
    caseStudy: {
      company: 'Meenakshi Textile Processing',
      revenue: '₹18 crore turnover',
      staff: '180 employees',
      profile: 'Madurai-area fabric dyeing and finishing facility supplying high-spec woven textiles to garment exporters.',
      challenge: 'Exporters demanded a strict 7-day turnaround; actual plant delivery averaged 16 days. Rework from shade mismatches ran at 9% of total production volume. Dye inventory tied up ₹1.2 crore in working capital yet stockouts of critical pigments routinely halted the dyehouse.',
      whyChosen: 'The owner recognized classic symptoms of waiting, excessive inventory, and defect loops. The facility lacked statistical software or data infrastructure for Six Sigma, making Lean the ideal high-visibility, pragmatic methodology.',
      steps: [
        'Enrolled plant manager and two senior supervisors in a 5-day Lean practitioner training course.',
        'Conducted a value stream mapping walk on the core cotton-twill product family; uncovered 14 days of idle queue waiting versus just 1.6 days of machine processing time.',
        'Executed 5S in the dye weighing kitchen: color-coded formulation shelves, labeled measuring scoops, and purged obsolete chemical drums.',
        'Replaced bulk chemical procurement with a two-bin visual Kanban system for the top 30 dye chemicals.',
        'Cut dyeing batch sizes from 2,000 meters down to 500 meters to establish continuous flow into drying and finishing.',
        'Instituted a mandatory daily 15-minute Gemba standup around a whiteboard tracking lead time, shade rework, and blockers.',
        'Established formal Standard Work sheets for recipe formulation with mandatory first-meter shade approval.'
      ],
      results: [
        'Overall production lead time compressed from 16 days down to 7.5 days.',
        'Dye shade mismatch rework dropped from 9% to 3.5% of total batches.',
        'Raw dye inventory value was reduced by 35% while production-halting pigment stockouts dropped to zero.',
        'Overtime payroll dropped by 40% across finishing and packing departments.'
      ],
      lessonsLearned: [
        'The strongest initial resistance came from purchasing, which was evaluated on invoice unit price rather than total holding cost.',
        'The owner attending the daily Gemba whiteboard standup every morning proved far more critical than classroom training.',
        'Visible 5S wins in week two created the psychological safety needed to convince operators to accept smaller batch sizes.'
      ]
    },
    quiz: [
      {
        id: 'q-lean-1',
        question: 'Which of the following is NOT one of the five core Lean principles?',
        options: ['Define value from customer perspective', 'Create continuous flow', 'Maximize machine utilization at all costs', 'Establish customer pull'],
        correctAnswer: 2,
        explanation: 'Maximizing machine utilization regardless of customer demand creates massive overproduction and inventory waste. Lean prioritizes flow and pull over isolated utilization.'
      },
      {
        id: 'q-lean-2',
        question: 'How is Takt Time mathematically calculated?',
        options: ['Available production time ÷ Customer demand rate', 'Customer demand rate ÷ Available production time', 'Total cycle time × Number of workstations', 'Lead time − Hands-on processing time'],
        correctAnswer: 0,
        explanation: 'Takt Time = Net Available Operating Time ÷ Customer Demand. It establishes the heartbeat rhythm at which one unit must be completed.'
      },
      {
        id: 'q-lean-3',
        question: 'Generating a detailed weekly management report that no stakeholder ever reads is an example of which TIMWOODS waste?',
        options: ['Motion', 'Overproduction', 'Transport', 'Inventory'],
        correctAnswer: 1,
        explanation: 'Overproduction is producing goods, information, or services before they are needed or in quantities greater than required by downstream users.'
      },
      {
        id: 'q-lean-4',
        question: 'What does the Lean concept of "Jidoka" represent?',
        options: ['Leveling production volume and mix', 'Built-in quality with authority to stop the process when defects are spotted', 'Quick changeover of tooling (SMED)', 'Visual inventory scheduling'],
        correctAnswer: 1,
        explanation: 'Jidoka (autonomation) means designing processes with built-in quality inspection and granting frontline operators immediate authority to stop the line when a defect occurs.'
      },
      {
        id: 'q-lean-5',
        question: 'What is the primary reason why corporate Lean initiatives lose momentum over time?',
        options: ['Absence of expensive specialized software', 'Failure to document standard work and lack of visible leadership follow-up at the Gemba', 'Gathering too much operational data', 'Opposition from technical teams'],
        correctAnswer: 1,
        explanation: 'Without standard work as a bedrock and sustained leadership attendance at daily Gemba boards, operational gains evaporate and teams drift back to old habits.'
      }
    ]
  },
  {
    id: 'sixsigma',
    name: 'Six Sigma',
    shortName: 'Six Sigma',
    category: 'Operations & Process',
    tagline: 'Eliminate defects and suppress process variation using data, statistics, and the DMAIC roadmap',
    origin: 'Developed at Motorola in 1986 by engineer Bill Smith and CEO Bob Galvin; scaled into an enterprise operating system by Jack Welch at General Electric in 1995.',
    corePurpose: 'Identify the vital root causes of defect variation using rigorous statistical tools, permanently fix them, and statistically prove sustained control.',
    primaryUsers: ['Quality managers', 'Process engineers', 'Operations analysts', 'Hospital quality officers', 'Six Sigma Green/Black Belts'],
    difficulty: 'Advanced',
    horizon: '3–6 month data-driven breakthrough projects',
    scope: 'Critical process outputs, high-cost defect modes, customer CTQs',
    timeToResult: '12–24 weeks for full DMAIC validation',
    dataNeeds: 'Validated historical & real-time defect logs, continuous sensor data, Gage R&R measurement data, process parameters',
    keyOutput: 'DMAIC project tollgate report, verified root-cause equations Y = f(X), validated measurement system, statistical process control (SPC) charts, control plans',
    bestPairedWith: 'Lean Management (Lean Six Sigma), VSM (scoping), FMEA (risk ranking), ISO 9001 (systemic institutionalization)',
    keyFeatures: [
      '5-Stage DMAIC Roadmap: Define, Measure, Analyse, Improve, Control',
      'Defect metric: 3.4 Defects Per Million Opportunities (DPMO) at full 6-sigma capability (incorporating standard 1.5σ drift)',
      'Belt Certification hierarchy: White, Yellow, Green, Black, Master Black Belt, and Champion',
      'Y = f(X) transfer function modeling: linking critical output Y to vital few inputs X',
      'Measurement System Analysis (Gage R&R): verifying repeatability and reproducibility before trusting data',
      'FMEA (Failure Mode and Effects Analysis): calculating Risk Priority Number (RPN = Severity × Occurrence × Detection)',
      'Statistical Process Control (SPC): X-bar/R control charts with upper/lower statistical limits to detect special-cause variation'
    ],
    howItWorks: 'Define the high-cost problem and CTQs in a signed charter. Measure baseline capability (DPMO, Z-score) and conduct Gage R&R. Analyze data using Pareto charts, Ishikawa diagrams, ANOVA, regression, or hypothesis tests to isolate vital root causes. Improve the process by running Design of Experiments (DOE) or piloting mistake-proofing. Control gains by locking standard operating procedures, installing control charts, and having finance certify dollar savings.',
    coreConcepts: [
      {
        term: 'DMAIC Roadmap',
        definition: 'Define (charter & CTQs), Measure (Gage R&R & baseline), Analyse (vital root causes), Improve (piloted solutions), Control (SPC & standard work).'
      },
      {
        term: 'DPMO & Sigma Level',
        definition: 'Defects Per Million Opportunities. 3σ ≈ 66,807 DPMO; 4σ ≈ 6,210 DPMO; 5σ ≈ 233 DPMO; 6σ ≈ 3.4 DPMO.'
      },
      {
        term: 'Common vs. Special Cause Variation',
        definition: 'Common causes are inherent random system noise requiring process redesign; special causes are specific assignable events signaled by points outside control limits.'
      },
      {
        term: 'Gage R&R',
        definition: 'Measurement System Analysis measuring Repeatability (same operator, same gauge) and Reproducibility (different operators, same gauge).'
      },
      {
        term: 'Critical to Quality (CTQ)',
        definition: 'Specific, measurable performance thresholds demanded by the customer to consider the product or service acceptable.'
      }
    ],
    strengths: [
      'Delivers permanent fixes to elusive, expensive defects that defy intuition and trial-and-error',
      'Provides a disciplined common language and analytical toolkit recognized internationally',
      'Demands verified bottom-line financial savings signed off by corporate finance'
    ],
    limitations: [
      'Too heavyweight for obvious, common-sense problems (Kaizen blitz can solve in 3 days what DMAIC takes 4 months to analyze)',
      'Requires substantial reliable numerical data; unsuited for organizations with zero measurement discipline',
      'Risks becoming an academic "belt certification factory" detached from commercial impact if projects lack executive sponsorship'
    ],
    workflowPlacement: {
      upstream: 'Lean waste audits, VSM bottleneck diagnosis, customer warranty/return complaints',
      downstream: 'ISO 9001 QMS control plans, ongoing Kaizen refinement, automated sensor alarms'
    },
    useCases: [
      {
        title: 'Precision Foundry Casting Porosity Reduction',
        industry: 'Heavy Engineering & Foundry',
        situation: 'Madurai foundry suffered 7.8% OEM casting rejections costing ₹1.4 crore annually due to subsurface blowholes.',
        action: 'Executed DMAIC: calibrated radiographic inspectors via Gage R&R, analyzed 40 heat variables with ANOVA, discovered pouring temperature and sand moisture interaction, and installed interlocks.',
        outcome: 'OEM casting rejections plummeted to 2.3%, yielding ₹95 lakh in audited annual savings.'
      },
      {
        title: 'Hospital Insurance Claim First-Pass Acceptance',
        industry: 'Healthcare Operations',
        situation: '400-bed private hospital faced 18% insurance claim rejections on initial submission, delaying working capital by 60 days.',
        action: 'Mapped CTQ requirements from insurer adjudication rules, conducted Pareto analysis of denial codes, identified 3 documentation omissions causing 72% of rejections, and mistake-proofed the intake portal.',
        outcome: 'First-pass claim acceptance surged above 92%, accelerating cash flow by ₹2.4 crore within four months.'
      }
    ],
    caseStudy: {
      company: 'Vaigai Precision Castings',
      revenue: '₹42 crore annual turnover',
      staff: '350 employees',
      profile: 'Madurai-district iron and steel foundry manufacturing heavy-duty pump and industrial valve castings for global OEMs.',
      challenge: 'OEM machining reject rate averaged 7.8% due to internal porosity and slag inclusion defects, triggering ₹1.4 crore in scrap costs, air freight penalties, and OEM de-rating threats. A prior Lean project had sped up delivery but failed to reduce defect variability.',
      whyChosen: 'The defect causes were complex and interrelated (sand moisture, pour temperature, mold hardness, chemical metallurgy). Defect logs existed from customer CMM inspection, providing the necessary statistical foundation for Six Sigma.',
      steps: [
        'Define: MD signed a project charter setting a target to reduce OEM rejections from 7.8% to under 3.0% in 6 months with an estimated ₹80 lakh benefit.',
        'Measure: Gage R&R on the internal ultrasonic and radiographic inspections revealed 28% measurement error between inspectors. Calibrated testing protocols before capturing 8 weeks of clean baseline data (7.6% rejection rate).',
        'Analyse: Collected data on 40 heat and molding parameters across 220 consecutive pours. Regression and ANOVA confirmed that pouring temperature range (1,380°C–1,410°C) and sand green compression moisture together accounted for 68% of porosity variation; alloy composition was statistically insignificant.',
        'Improve: Conducted a factorial Design of Experiments (DOE) to lock the optimal sand moisture (3.2%–3.5%) and ladle pouring window. Installed automatic moisture dosers and digital pyrometer temperature interlocks on pouring ladles.',
        'Control: Deployed X-bar/R control charts at the line, updated ISO 9001 standard work, trained 18 pourers, and established a clear reaction plan.'
      ],
      results: [
        'OEM rejections dropped from 7.8% to 2.3% within seven months.',
        'Audited net annual cost savings reached ₹95 lakh in reduced scrap and penalty avoidance.',
        'The foundry was awarded "Grade A Preferred Supplier" status by its largest German OEM client.',
        'Spurred two follow-on Green Belt projects in core machining scrap and ladle furnace energy consumption.'
      ],
      lessonsLearned: [
        'The Gage R&R audit initially provoked friction with senior inspectors, but fixing measurement bias prevented the team from pursuing false root causes.',
        'Shop floor operators embraced SPC control charts once they saw the charts explained the mysterious "bad casting days" they previously attributed to humidity or bad luck.',
        'Executive sponsorship by the MD protecting weekly Green Belt analysis hours during high-volume production cycles was crucial.'
      ]
    },
    quiz: [
      {
        id: 'q-six-1',
        question: 'Under standard Six Sigma conventions (accounting for a 1.5-sigma long-term process shift), a 6-sigma process produces how many defects per million opportunities (DPMO)?',
        options: ['3.4 DPMO', '233 DPMO', '6,210 DPMO', '66,807 DPMO'],
        correctAnswer: 0,
        explanation: 'A 6-sigma quality level produces no more than 3.4 defects per million opportunities when accommodating the standard empirical 1.5σ drift.'
      },
      {
        id: 'q-six-2',
        question: 'In the DMAIC framework, Measurement System Analysis (Gage R&R) is conducted primarily in which phase?',
        options: ['Define', 'Measure', 'Improve', 'Control'],
        correctAnswer: 1,
        explanation: 'Gage R&R belongs to the Measure phase. You must validate that your measurement tools and inspectors are repeatable and reproducible before trusting baseline data.'
      },
      {
        id: 'q-six-3',
        question: 'Which tool ranks potential operational failure modes by calculating a Risk Priority Number (RPN) based on Severity, Occurrence, and Detection?',
        options: ['SIPOC Diagram', 'Failure Mode and Effects Analysis (FMEA)', 'Pareto Chart', 'Critical to Quality (CTQ) Tree'],
        correctAnswer: 1,
        explanation: 'FMEA evaluates each potential failure mode across Severity (S), Occurrence (O), and Detection (D), multiplying them to yield an RPN (1–1,000) for prioritization.'
      },
      {
        id: 'q-six-4',
        question: 'On an X-bar or Individuals control chart, a single data point plotted outside the Upper Control Limit (UCL) indicates:',
        options: ['Normal common-cause background variation', 'A special (assignable) cause requiring investigation', 'Gauge measurement error only', 'The process mean has permanently shifted'],
        correctAnswer: 1,
        explanation: 'Points falling outside statistical control limits (±3 sigma) signify special-cause variation—an assignable, non-random event that must be isolated and addressed.'
      },
      {
        id: 'q-six-5',
        question: 'What constitutes the best criteria for selecting an initial Six Sigma Green Belt project?',
        options: ['A massive corporate-wide cultural transformation goal', 'A well-bounded recurring defect with quantifiable data that can close within 3–4 months', 'An initiative requiring immediate software investment before data gathering', 'A problem with zero measurable financial impact'],
        correctAnswer: 1,
        explanation: 'First projects must be tightly scoped, backed by accessible data, tied to verified financial savings, and capable of completion within 3–4 months to demonstrate rapid ROI.'
      }
    ]
  },
  {
    id: 'kaizen',
    name: 'Kaizen',
    shortName: 'Kaizen',
    category: 'Operations & Process',
    tagline: 'Empower continuous, frontline-led small improvements every day through PDCA and focused Kaizen events',
    origin: 'Rooted in post-war Japanese industrial reconstruction guided by W. Edwards Deming and Joseph Juran; institutionalized within the Toyota Production System and popularized globally by Masaaki Imai in Kaizen (1986).',
    corePurpose: 'Make incremental problem-solving the daily habit of every employee so the entire organization continuously evolves rather than relying solely on sporadic executive projects.',
    primaryUsers: ['Frontline operators & supervisors', 'Operations managers', 'Continuous improvement facilitators', 'HR culture leads', 'School & hospital administrators'],
    difficulty: 'Beginner',
    horizon: 'Daily habit / 3–5 day intensive Kaizen blitz workshops',
    scope: 'Workstation / Local cell / Departmental hand-offs',
    timeToResult: 'Immediate for daily ideas; 3–5 days for Kaizen events',
    dataNeeds: 'Frontline observations, defect tallies, physical cycle time stops, before/after photos',
    keyOutput: 'Implemented visual improvements, Kaizen idea boards, A3 problem-solving sheets, updated standard work, Yokoten replication notes',
    bestPairedWith: 'Lean Management (philosophy), 5S (foundational baseline), VSM (identifies event bursts), Kanban (visual tracking)',
    keyFeatures: [
      'Dual-speed structure: Daily Kaizen (ongoing individual suggestions) and Kaizen Events (3–5 day cross-functional blitz)',
      'PDCA Thinking Cycle: Plan (hypothesize), Do (small-scale trial), Check (measure result), Act (standardize or adjust)',
      'Gemba Orientation: Real solutions are forged on the shop floor or frontline desk, not in executive conference rooms',
      'Creativity Before Capital: Prioritizing clever, low-cost/no-cost physical or procedural fixes over software or capital spend',
      'A3 One-Page Problem Solving: Standardized structured narrative containing background, current condition, root cause, and countermeasures',
      'Yokoten (Horizontal Deployment): Proactively copying proven local solutions to other machines, branches, or departments',
      'Guaranteed Rapid Response SLA: Mandatory 3–5 day supervisor feedback loop on every submitted frontline idea'
    ],
    howItWorks: 'Encourage workers to identify daily friction using simple idea cards. Supervisors review within 5 days, grant immediate budget approval up to a threshold (e.g., ₹2,000), and let the employee implement it. For complex cross-functional challenges, convene a 3–5 day Kaizen blitz: Day 1 trains and measures at the Gemba; Day 2 analyzes root causes (5 Whys); Day 3 trials prototypes; Day 4 writes new standard work; Day 5 presents verified outcomes to the sponsor.',
    coreConcepts: [
      {
        term: 'PDCA Cycle',
        definition: 'Plan (diagnose and plan test), Do (run small experiment), Check (evaluate data against target), Act (standardize as standard work or iterate).'
      },
      {
        term: 'Kaizen Blitz / Event',
        definition: 'A dedicated, full-time 3- to 5-day cross-functional team workshop chartered to solve a specific bottleneck or waste.'
      },
      {
        term: 'A3 Report',
        definition: 'A single 11×17 (A3) sheet structuring a problem from background, current condition, target, 5-Whys root cause, to countermeasures and 30-day review.'
      },
      {
        term: 'Yokoten',
        definition: 'The deliberate practice of copying and adapting a validated Kaizen countermeasure horizontally across all comparable operating areas.'
      },
      {
        term: 'Creativity Over Capital',
        definition: 'The foundational Kaizen principle that ingenuity, cardboard prototyping, and process re-sequencing must precede any request for capital expenditure.'
      }
    ],
    strengths: [
      'Near-zero capital requirement—generates immediate, compounding gains from frontline ingenuity',
      'Dramatically elevates workforce morale and retention by actively implementing employee ideas',
      'Universally adaptable to any work environment from machining cells to university laboratories and billing desks'
    ],
    limitations: [
      'Cannot solve broken systemic architectures or cross-organizational silo barriers (requires BPR)',
      'Suggestion schemes swiftly wither if supervisors fail to respond to submitted ideas within 5 working days',
      'Isolated Kaizen blitz gains erode within 60 days if updated standard work is not audited regularly'
    ],
    workflowPlacement: {
      upstream: 'VSM Kaizen bursts, daily Gemba observations, customer feedback',
      downstream: 'Updated standard work SOPs, Yokoten cross-department sharing, monthly Kaizen dashboards'
    },
    useCases: [
      {
        title: 'Two-Wheeler Press Shop Tool Changeover Blitz',
        industry: 'Automotive Component Manufacturing',
        situation: 'Madurai press shop took 3 hours to change stamping dies, forcing massive batching and slowing supply to OEM lines.',
        action: 'Chartered a 4-day SMED Kaizen event: videotaped changeover, separated external pre-staging tasks from internal die clamping, fabricated a mobile die cart, and standardized bolt torquing.',
        outcome: 'Die changeover plummeted from 180 minutes to 70 minutes, unlocking plant capacity and exceeding the 5% OEM annual cost-down target.'
      },
      {
        title: 'Engineering College Laboratory Setup Acceleration',
        industry: 'Higher Education',
        situation: 'Students lost 20 minutes of every 2-hour electrical lab session waiting for lab assistants to issue multimeters, breadboards, and patch cords.',
        action: 'Faculty and lab assistants ran a 1-day Kaizen workshop, building shadow-board storage at individual benches and pre-kitting lab trays.',
        outcome: 'Session preparation time dropped from 20 minutes to 5 minutes, boosting effective student teaching time by 12% across the semester.'
      }
    ],
    caseStudy: {
      company: 'Pandiyan Auto Components',
      revenue: '₹22 crore turnover',
      staff: '220 employees',
      profile: 'Madurai-based Tier-2 manufacturing supplier producing precision sheet-metal brackets and assemblies for major two-wheeler OEMs.',
      challenge: 'Morale was depressed following a disastrous ERP rollout. Supervisors managed through crisis firefighting. The primary OEM customer demanded an aggressive 5% annual cost reduction, which management feared would necessitate wage freezes or staff layoffs.',
      whyChosen: 'Management needed a low-cost, trust-building method that would deliver visible operational improvements without IT disruption. Six Sigma felt excessively academic, while BPR was deemed too hazardous after the ERP setback.',
      steps: [
        'Managing Director and HR lead completed a 2-day hands-on Kaizen facilitation course.',
        'Launched a simple "Kaizen Idea Card" board in the stamping division backed by an executive pledge: every card receives a response within 5 days, and no improvement will ever result in job termination.',
        'Empowered shop-floor shift supervisors with discretionary authority to approve any proposal under ₹2,000 on the spot.',
        'Established a monthly "Kaizen of the Month" celebration featuring a certificate, public photo on the canteen board, and a modest cash reward.',
        'After 90 days of daily Kaizen momentum, ran a structured 4-day Kaizen blitz targeting press-shop die changeovers (reducing 3-hour setups down to a 1-hour target).',
        'Organized monthly cross-department "Yokoten walks" where welding and assembly supervisors toured stamping to adapt successful ideas.',
        'Added live Kaizen submission and completion rates directly to the executive plant KPI dashboard.'
      ],
      results: [
        'Employees submitted 1,120 ideas across 12 months, with 820 approved and fully implemented (73% execution rate).',
        'Press-shop die changeover time was slashed from 3 hours to 70 minutes.',
        'Verified operational savings exceeded the OEM’s 5% cost-reduction requirement without any personnel cuts.',
        'Frontline absenteeism declined by 22%, and the plant utilized the established Kaizen discipline to clear its IATF 16949 certification audit.'
      ],
      lessonsLearned: [
        'Enforcing the strict 5-day response rule proved foundational; when one supervisor delayed replies, submissions in his section ground to a halt within a fortnight.',
        'Public recognition in front of peers in the cafeteria motivated frontline workers far more than monetary bonuses.',
        'The first Kaizen blitz succeeded because the plant head physically spent all four days on the shop floor with the team.'
      ]
    },
    quiz: [
      {
        id: 'q-kz-1',
        question: 'Which statement most accurately describes the essence of Kaizen?',
        options: ['A one-time radical organizational restructuring project', 'Continuous, frontline-led small improvements involving everyone', 'An advanced statistical regression methodology', 'A specialized enterprise software platform'],
        correctAnswer: 1,
        explanation: 'Kaizen (meaning "change for the better") centers on continuous, everyday incremental enhancements conceived and executed by frontline workers closest to the work.'
      },
      {
        id: 'q-kz-2',
        question: 'What is the standard duration for a focused Kaizen event (also known as a Kaizen blitz)?',
        options: ['1 hour', '3 to 5 days', '3 to 6 months', '1 full fiscal year'],
        correctAnswer: 1,
        explanation: 'A Kaizen event is a time-boxed, 3- to 5-day intensive workshop where a dedicated cross-functional team analyzes a process, trials changes, and establishes new standards.'
      },
      {
        id: 'q-kz-3',
        question: 'What do the letters in the Deming PDCA cycle represent?',
        options: ['Plan, Design, Check, Approve', 'Plan, Do, Check, Act', 'Prepare, Deliver, Control, Audit', 'Plan, Do, Confirm, Adjust'],
        correctAnswer: 1,
        explanation: 'PDCA stands for Plan (formulate the hypothesis and change), Do (execute a small test), Check (analyze results against expectations), and Act (standardize or iterate).'
      },
      {
        id: 'q-kz-4',
        question: 'In Japanese lean management terminology, what does "Yokoten" signify?',
        options: ['Stopping the manufacturing line upon defect detection', 'The horizontal deployment and sharing of proven ideas across other areas', 'A suggestion box on the wall', 'Statistical visual control of limits'],
        correctAnswer: 1,
        explanation: 'Yokoten refers to lateral/horizontal deployment: systematically taking a successful improvement from one workstation or plant and replicating it across all comparable processes.'
      },
      {
        id: 'q-kz-5',
        question: 'What is the single most common reason why employee suggestion schemes collapse in corporate settings?',
        options: ['Employees submit too many sophisticated ideas', 'Management is slow or fails to provide feedback on submitted proposals', 'Lack of digital workflow software', 'Over-involvement by company executives'],
        correctAnswer: 1,
        explanation: 'When frontline workers submit ideas into a bureaucratic vacuum without prompt feedback, cynicism sets in and submissions dry up within weeks. A strict response SLA (3–5 days) is essential.'
      }
    ]
  },
  {
    id: 'vsm',
    name: 'Value Stream Mapping (VSM)',
    shortName: 'Value Stream Mapping',
    category: 'Operations & Process',
    tagline: 'Visualize end-to-end material and information flow on a single page to expose queues, delays, and calculate PCE',
    origin: 'Developed at Toyota as "Material and Information Flow Diagrams"; codified for Western industry by Mike Rother and John Shook in Learning to See (1998) and extended to services by Martin & Osterling (2014).',
    corePurpose: 'Provide a shared, factual, single-page diagnostic of where lead time actually accumulates, quantify waste, and establish an actionable future-state plan.',
    primaryUsers: ['Lean champions', 'Operations directors', 'Process-improvement teams', 'Hospital flow teams', 'Service operations managers'],
    difficulty: 'Intermediate',
    horizon: '2–5 day mapping workshop / 90-day future-state execution',
    scope: 'Product family / Service delivery pathway / Cross-departmental stream',
    timeToResult: '1 week to complete map; 30–90 days to realize future state',
    dataNeeds: 'Customer demand volume, cycle times (PT), changeover times, batch sizes, queue sizes between steps, %Complete & Accurate (%C&A)',
    keyOutput: 'Current-state map, future-state map, timeline ladder (PT vs. Waiting Time), Process Cycle Efficiency (PCE), Kaizen burst action matrix',
    bestPairedWith: 'Lean Management (diagnostic tool), Kaizen (executes bursts), Kanban (future-state pull loops), BPR (when future state requires complete redesign)',
    keyFeatures: [
      'Single-page end-to-end visualization of both material/service flow AND upstream information/scheduling flows',
      'Process boxes paired with standard data boxes (Cycle Time, Changeover, Uptime, Batch Size, Operators, %C&A)',
      'Inventory Triangles capturing queue volumes converted directly into days/hours of customer waiting time',
      'Timeline Ladder calculating Total Lead Time (LT) on upper rungs and Value-Adding Processing Time (PT) on lower rungs',
      'Process Cycle Efficiency (PCE) benchmark metric: PCE = (Total PT ÷ Total Lead Time) × 100',
      '7 Future-State Design Questions: Takt Time, Continuous Flow, Pull Supermarkets, Pacemaker Step, Leveling (Heijunka), Kaizen Bursts',
      '%C&A (Percent Complete and Accurate): measuring input rework quality in transactional and office workflows'
    ],
    howItWorks: 'Select one representative product or service family. Walk the value stream backward from customer delivery to initial intake to observe true queue conditions. Record data boxes and count waiting batches. Draw the stepped timeline ladder and calculate PCE (typically <5%). Convene the team to answer the 7 future-state questions: locate the single pacemaker process, introduce pull supermarkets or FIFO lanes, eliminate hand-offs, place Kaizen burst icons, and translate them into a 90-day project roadmap.',
    coreConcepts: [
      {
        term: 'Process Cycle Efficiency (PCE)',
        definition: 'PCE = (Value-Adding Processing Time ÷ Total Lead Time) × 100. In un-optimized processes, PCE is frequently under 3%.'
      },
      {
        term: 'Pacemaker Process',
        definition: 'The single operational step in the value stream that receives the customer production schedule; all upstream processes pull from it.'
      },
      {
        term: 'Percent Complete & Accurate (%C&A)',
        definition: 'The percentage of times a process step receives information or materials from upstream that can be processed without needing clarification or correction.'
      },
      {
        term: 'Kaizen Burst',
        definition: 'A visual starburst symbol drawn on the future-state map pinpointing the exact location where a focused Kaizen event or project must take place.'
      },
      {
        term: 'Supermarket vs. FIFO Lane',
        definition: 'A Supermarket is a controlled buffer where downstream pulls parts as needed; a FIFO lane is a capped lane enforcing strict first-in-first-out sequencing.'
      }
    ],
    strengths: [
      'Obliterates departmental silos and inter-departmental blame games by visualizing the entire system on one shared page',
      'Strips away subjective opinions with undeniable mathematical ratios (e.g., 20 minutes of work buried in 18 days of waiting)',
      'Functions directly as an executive transformation blueprint rather than a passive diagram'
    ],
    limitations: [
      'Represents a static snapshot that can become obsolete within months if continuous improvement is not maintained',
      'Requires focus on a single product family; high-mix, low-volume job shops require multiple matrix maps',
      'Teams risk spending weeks over-polishing electronic diagrams instead of physically fixing shop-floor bottlenecks'
    ],
    workflowPlacement: {
      upstream: 'Organizational strategy, customer lead-time complaints',
      downstream: 'Kaizen blitz charters, Kanban pull implementation, Six Sigma scoping, ERP schedule realignment'
    },
    useCases: [
      {
        title: 'Corrugated Box Packaging Lead-Time Compression',
        industry: 'Industrial Packaging Manufacturing',
        situation: 'Tirunelveli corrugated-box maker faced customer defections due to 10-day lead times against 3-day competitor commitments.',
        action: 'Mapped the box-for-FMCG family from dispatch back to paper corrugation; revealed 9.6 days of lead time versus 7.2 hours of actual machine processing (PCE = 3.1%). Placed bursts on artwork approvals and printing batches.',
        outcome: 'Lead time fell to 4.1 days, raw board inventory dropped 40%, and on-time delivery reached 95%.'
      },
      {
        title: 'Diagnostic Lab Sample-to-Report Acceleration',
        industry: 'Healthcare Diagnostics',
        situation: 'Hospital pathology lab took 36 hours to deliver blood reports while commercial labs promised 12 hours, prompting lab heads to request ₹2 crore for new analyzers.',
        action: 'Conducted a service VSM: proved analyzers accounted for only 45 minutes of run time; 34 hours were squandered in transport batching, batch accessioning, and awaiting pathologist batch validation.',
        outcome: 'Reorganized courier runs, introduced continuous accessioning, and met the 12-hour turnaround target without purchasing new equipment.'
      }
    ],
    caseStudy: {
      company: 'Thamirabarani Packaging',
      revenue: '₹24 crore turnover',
      staff: '140 employees',
      profile: 'Tirunelveli-based packaging manufacturer producing high-volume corrugated boxes for food, FMCG, and agricultural exporters.',
      challenge: 'Quoted delivery was 10 working days, but clients increasingly required 3 to 4 days. Sales blamed production delays, while production blamed design artwork revisions and paper roll stockouts. A previous 5S campaign had improved housekeeping but had zero effect on customer delivery lead time.',
      whyChosen: 'Senior leadership was paralyzed by finger-pointing across departments. VSM offered a collaborative, fact-based methodology that forced all department heads to walk the same physical path together.',
      steps: [
        'Selected the FMCG box family representing 60% of plant revenue and 80% of customer delivery complaints.',
        'Assembled a 6-person cross-functional team (Sales, Graphic Design, Production Planning, Corrugation, Offset Printing, Dispatch) and walked the flow backward from shipping dock to raw material unloading.',
        'Constructed the Current-State Map: revealed a total lead time of 9.6 days against just 7.2 hours of hands-on processing time (PCE = 3.1%). Major queues: 3.0 days waiting for customer artwork sign-off, 2.5 days of corrugated sheet inventory, and 2.0 days waiting for minimum printing batch size.',
        'Facilitated a Future-State Design Workshop: instituted an online customer artwork portal with a 24-hour approval SLA; halved the printing batch size; established a visual FIFO lane between corrugation and printing; shifted dispatch from bi-weekly bulk shipments to daily milk-runs.',
        'Identified 4 Kaizen bursts and scheduled dedicated monthly events owned by respective department leads.',
        'Posted physical current and future state maps on the central corridor wall alongside a rolling lead-time trend chart.'
      ],
      results: [
        'Total order-to-delivery lead time fell from 9.6 days to 4.1 days within four months.',
        'Floor corrugated board inventory was cut by 40%, freeing up ₹65 lakh in working capital.',
        'On-time in-full (OTIF) delivery jumped from 71% to over 95%.',
        'Leveraged the verified 4-day delivery commitment to secure an exclusive export packaging contract worth ₹4.5 crore.'
      ],
      lessonsLearned: [
        'Walking the value stream backward physically dissolved departmental friction in a single morning.',
        'The single largest queue (3 days of artwork approval) was completely external to the factory floor and had never been addressed in previous operations meetings.',
        'Re-mapping after four months uncovered two newly emerging bottlenecks, proving that VSM must be an ongoing semi-annual review cadence.'
      ]
    },
    quiz: [
      {
        id: 'q-vsm-1',
        question: 'How is Process Cycle Efficiency (PCE) calculated in Value Stream Mapping?',
        options: ['Total Lead Time ÷ Value-Adding Processing Time', '(Value-Adding Processing Time ÷ Total Lead Time) × 100', 'Takt Time ÷ Machine Cycle Time', 'Uptime Percentage × Batch Size'],
        correctAnswer: 1,
        explanation: 'PCE (%) = (Total Value-Adding Processing Time ÷ Total Elapsed Lead Time) × 100. It quantifies the proportion of time a product or service is actually receiving value.'
      },
      {
        id: 'q-vsm-2',
        question: 'In standard Lean VSM symbology, an upside-down triangle placed between two process boxes represents:',
        options: ['A critical quality inspection gate', 'Inventory or work waiting in a queue', 'An executive decision gateway', 'A completed shipment to the customer'],
        correctAnswer: 1,
        explanation: 'The triangle icon represents inventory or waiting work-in-progress (WIP). In VSM, this quantity is converted into days or hours of customer delay.'
      },
      {
        id: 'q-vsm-3',
        question: 'In a future-state Value Stream Map, what is the role of the "Pacemaker Process"?',
        options: ['The machine running at the highest technical velocity', 'The single process step that receives the production schedule, setting the pace for all upstream pull loops', 'The supplier delivering raw materials', 'The final quality inspection desk'],
        correctAnswer: 1,
        explanation: 'The pacemaker is the dedicated point in the value stream where production is scheduled. Upstream processes are controlled via pull signals (supermarkets/FIFO) linked to this pacemaker.'
      },
      {
        id: 'q-vsm-4',
        question: 'In transactional, administrative, and service VSMs, what does the metric "%C&A" capture?',
        options: ['Percentage of total machine capacity currently allocated', 'Percent Complete and Accurate: the proportion of inputs received that need no downstream correction or clarification', 'Customer satisfaction rating upon ticket closure', 'Percentage of cost accounted for in ledger'],
        correctAnswer: 1,
        explanation: '%C&A (Percent Complete and Accurate) measures input quality in knowledge and service workflows. Incomplete forms and erroneous orders trigger massive hidden rework loops.'
      },
      {
        id: 'q-vsm-5',
        question: 'What is the universally recommended method for capturing current-state VSM operational data?',
        options: ['Extracting historical averages exclusively from ERP software databases', 'Relying on senior department heads memories in a boardroom meeting', 'Physically walking the Gemba in reverse from delivery to intake and directly observing counts and cycle times', 'Sending an email survey to front-office employees'],
        correctAnswer: 2,
        explanation: 'Data must be collected by physically walking the process from end to beginning at the Gemba. ERP reports and managerial memories almost invariably understate queue waiting times.'
      }
    ]
  },
  {
    id: 'bpr',
    name: 'Business Process Reengineering (BPR)',
    shortName: 'BPR',
    category: 'Operations & Process',
    tagline: 'Achieve order-of-magnitude breakthrough improvements through clean-sheet redesign and technology enablement',
    origin: 'Introduced by Michael Hammer in Harvard Business Review (1990) "Reengineering Work: Don’t Automate, Obliterate"; expanded by Hammer & Champy in Reengineering the Corporation (1993) and Davenport in Process Innovation (1993).',
    corePurpose: 'Deliver dramatic step-change performance (50%+ improvements in speed, cost, and service) by discarding outdated assumptions and redesigning processes from scratch around customer outcomes.',
    primaryUsers: ['CEOs & Managing Directors', 'Transformation & strategy executives', 'Enterprise architects', 'ERP programme directors', 'Management consultants'],
    difficulty: 'Advanced',
    horizon: '6–18 month enterprise transformation programme',
    scope: 'Core cross-functional business processes (Order-to-Cash, Procure-to-Pay, Citizen Service)',
    timeToResult: '3–6 months for pilot go-live; 9–18 months for enterprise-wide rollout',
    dataNeeds: 'High-level as-is cycle times, cost per transaction, customer pain points, digital architecture capabilities',
    keyOutput: 'Clean-sheet "To-Be" process models (BPMN), integrated case-worker roles, automated decision rules, change-management roadmap',
    bestPairedWith: 'Cloud ERP & workflow platforms, Lean/Kaizen (to refine after go-live), ADKAR Change Management, OKRs',
    keyFeatures: [
      '"Don’t Automate, Obliterate": Refusing to merely computerize broken manual steps ("paving the cowpaths")',
      'Outcome-Oriented Architecture: Organizing around end-to-end customer outcomes rather than fragmented departmental tasks',
      'Clean-Sheet ("Zero-Based") Design: Asking "If we founded this business today with modern cloud tools, how would we do this?"',
      'Case Worker / Case Team Model: Consolidating fragmented hand-offs into a single empowered owner or cross-functional cell',
      'Information Captured Once at Source: Eliminating duplicate data entry and manual reconciliation',
      'Rule-Based Automated Gateways: Auto-approving standard, low-risk requests and routing only exceptions to specialists',
      'Stretch Multiplier Targets: Setting targets in multiples (e.g., 9 days to 2 days) to force redesign over incremental tweaking'
    ],
    howItWorks: 'Mobilize leadership with an executive sponsor and release a full-time cross-functional team. Lightly diagnose the as-is flow to uncover core friction. Discard legacy procedures and apply clean-sheet design principles: build around the customer outcome, capture data once, replace serial hand-offs with case workers, and configure modern technology (ERP, APIs, self-service portals) to fit the new design. Pilot in one region, execute rigorous change management, retire the old process on a fixed cut-off date, and transition to Lean/Kaizen.',
    coreConcepts: [
      {
        term: 'As-Is vs. To-Be',
        definition: 'As-Is captures the current fragmented workflow; To-Be represents the radically simplified clean-sheet design organized around customer outcomes.'
      },
      {
        term: 'Case Worker / Case Team',
        definition: 'A single individual or compact multidisciplinary team given end-to-end responsibility for executing a customer case from intake to completion.'
      },
      {
        term: 'Paving the Cowpaths',
        definition: 'The fatal mistake of automating an inefficient legacy process with software, which merely speeds up dysfunction and entrenches bad design.'
      },
      {
        term: 'BPMN 2.0',
        definition: 'Business Process Model and Notation: the global visual standard for documenting executable business workflows, decision gateways, and swimlanes.'
      },
      {
        term: 'Stretch Target as a Catalyst',
        definition: 'Setting targets of 50–80% improvement (e.g., from 30 days to 3 days), which mathematically prevents teams from attempting minor incremental adjustments.'
      }
    ],
    strengths: [
      'The only management approach capable of delivering 10x order-of-magnitude leaps when current process architecture is broken',
      'Demolishes entrenched departmental fiefdoms and unifies the enterprise around seamless customer experiences',
      'Creates a clean, simplified operational foundation that unlocks the full value of cloud ERP and digital automation'
    ],
    limitations: [
      'High organizational risk and cost—historically, over 60% of 1990s BPR initiatives failed due to poor change management and cultural resistance',
      'Extremely disruptive to staff; can trigger widespread organizational panic if perceived as a cover for headcount cuts',
      'Demands relentless, hands-on CEO sponsorship over 6 to 18 months; quickly flounders if delegated to part-time committees'
    ],
    workflowPlacement: {
      upstream: 'Corporate strategy, ERP replacement initiatives, severe competitive disruption',
      downstream: 'Cloud software implementation, role re-profiling, Lean and Kaizen continuous improvement cycles'
    },
    useCases: [
      {
        title: 'Agricultural Input Distributor Order-to-Delivery Overhaul',
        industry: 'Agricultural Supply & Distribution',
        situation: 'Madurai distributor with 18 depots took 9 days from dealer phone order to delivery, losing market share to competitors delivering in 2 days.',
        action: 'Undertook BPR: replaced 7 hand-offs and 3 spreadsheets with a dealer mobile app, automated credit limit validation, routed orders straight to local depots, and redeployed depot clerks as dealer relationship executives.',
        outcome: 'Order-to-delivery dropped to 1.8 days for 85% of volume; order-processing costs plummeted by over 50%.'
      },
      {
        title: 'Private School Group Fee Collection & Reconciliation Reengineering',
        industry: 'K-12 Education',
        situation: '2,000-student school group processed fees via physical cash counters, paper receipts, and 30-day manual bank reconciliation, generating parent outrage and accounting overtime.',
        action: 'Reengineered from parent outcome: deployed unified digital parent portal with UPI auto-receipts, direct gateway auto-reconciliation, and automated WhatsApp reminder triggers, repurposing cashiers into parent counselors.',
        outcome: 'Fee reconciliation time plunged from 30 days to instant real-time settlement with zero staff layoffs.'
      }
    ],
    caseStudy: {
      company: 'Southern Agri Inputs',
      revenue: '₹120 crore turnover',
      staff: '420 employees across 18 regional depots',
      profile: 'Madurai-headquartered wholesale distributor of high-yield seeds, fertilizers, and agro-chemicals serving over 6,000 retail dealer stockists across Tamil Nadu.',
      challenge: 'Dealer orders took an average of 9 days from phone placement to truck delivery. Rapidly emerging regional competitors were delivering within 48 hours. The existing workflow required order clerks, regional sales managers, head-office credit managers, and warehouse dispatchers, juggling three distinct spreadsheets with manual double data-entry. Two previous Kaizen efforts had shaved only one day off the timeline.',
      whyChosen: 'The Managing Director concluded that incremental tuning was incapable of bridging the gap between 9 days and 2 days. The company was already planning to replace its obsolete accounting system, creating an ideal opening to reengineer the business process before buying new software.',
      steps: [
        'MD launched a 6-month BPR initiative with a non-negotiable stretch target: 2-day delivery for 90% of all standard dealer orders. Released a dedicated full-time team of five (Sales, Finance, Logistics, IT, and external consultant).',
        'Lightly diagnosed the As-Is journey: 1.5 days of physical warehouse picking and transit buried inside 7.5 days of administrative waiting (dominated by manual credit authorization and weekly dispatch route batching).',
        'Engineered the To-Be process around the dealer outcome: dealers order directly via mobile app; dealer credit limits are pre-approved annually and verified in real-time by an automated algorithm; approved orders flash immediately on warehouse picker terminals; dynamic daily dispatch routes replace weekly batching.',
        'Redeployed staff: head-office credit officers shifted to high-value dealer financial advisory; depot billing clerks were upskilled into proactive dealer-relationship executives.',
        'Selected a modern cloud ERP with an open API dealer frontend tailored specifically to the new process architecture.',
        'Conducted a 60-day pilot across three depots accompanied by interactive district onboarding camps for local dealers.',
        'Executed statewide rollout and officially retired the old phone-and-spreadsheet workflow on a strict sunset date.'
      ],
      results: [
        'Average order-to-delivery cycle time fell from 9.0 days to 1.8 days for over 85% of standard orders.',
        'Transaction processing cost per order dropped by more than 55%.',
        'Active retail dealer network expanded by 18% as rapid delivery earned dealer loyalty.',
        'Days Sales Outstanding (DSO) contracted significantly because digital invoices and GST e-way bills generated instantly upon truck departure.'
      ],
      lessonsLearned: [
        'Designing the new process BEFORE selecting the ERP software prevented the classic blunder of automating obsolete manual steps.',
        'An upfront public guarantee from the MD assuring zero job terminations and promising role upskilling eliminated workforce sabotage.',
        'The hardest operational hurdle was securing dealer adoption of the mobile ordering app; interactive district training camps were indispensable.'
      ]
    },
    quiz: [
      {
        id: 'q-bpr-1',
        question: 'What is the fundamental difference between Business Process Reengineering (BPR) and Kaizen?',
        options: ['BPR uses statistical variance tools, while Kaizen does not', 'BPR seeks radical clean-sheet redesign of whole processes, while Kaizen pursues continuous incremental improvement of existing processes', 'BPR is conducted exclusively on shop floors, while Kaizen is for executives', 'BPR requires no executive sponsorship'],
        correctAnswer: 1,
        explanation: 'BPR asks "If we started today, how would we design this from scratch?" seeking 50%+ step-change breakthroughs, whereas Kaizen refines existing workflows incrementally.'
      },
      {
        id: 'q-bpr-2',
        question: 'What did Michael Hammer warn against with his famous maxim "Don’t automate, obliterate"?',
        options: ['Using any computer hardware or enterprise software', 'Merely installing technology to automate inefficient, legacy steps without redesigning the underlying process', 'Eliminating operational departments', 'Outsourcing back-office IT services'],
        correctAnswer: 1,
        explanation: 'Hammer cautioned against "paving the cowpaths"—using software to speed up unnecessary, convoluted tasks rather than eliminating and redesigning the process around customer outcomes.'
      },
      {
        id: 'q-bpr-3',
        question: 'Which of the following represents a foundational BPR design principle?',
        options: ['Capture information once, directly at its source', 'Introduce multiple approval checkpoints for financial protection', 'Enforce strict vertical departmental separation', 'Sequence all cross-functional tasks in strict chronological order'],
        correctAnswer: 0,
        explanation: 'Capturing data once at source eliminates redundant data entry, reconciliation errors, and multi-department hand-offs.'
      },
      {
        id: 'q-bpr-4',
        question: 'Historically, what has been the primary cause behind the failure of large-scale BPR transformations?',
        options: ['Deploying excessively advanced software platforms', 'Neglecting human change management and suffering weak executive sponsorship', 'Allocating too much time to pilot phases', 'Over-reliance on BPMN diagram standards'],
        correctAnswer: 1,
        explanation: 'BPR failures stem overwhelmingly from underestimating cultural resistance, neglecting change management, and lacking persistent C-suite leadership throughout the transition.'
      },
      {
        id: 'q-bpr-5',
        question: 'Which of the following targets best exemplifies an effective BPR stretch target?',
        options: ['Improve customer response time by 4% next year', 'Compress loan processing time from 15 days down to 2 days', 'Hold 10% fewer weekly departmental meetings', 'Purchase new ergonomic office desks'],
        correctAnswer: 1,
        explanation: 'BPR requires radical stretch targets expressed in multiples (e.g., from 15 days to 2 days). Incremental targets (like 4%) encourage teams to tweak existing broken processes rather than reengineer them.'
      }
    ]
  },
  {
    id: 'kanban',
    name: 'Kanban',
    shortName: 'Kanban',
    category: 'Operations & Process',
    tagline: 'Visualize workflows, limit work-in-progress (WIP), and optimize pull-based throughput and cycle time',
    origin: 'Pioneered by Taiichi Ohno at Toyota in the 1950s for shop-floor parts replenishment; adapted for knowledge and technology work by David J. Anderson in Kanban (2010).',
    corePurpose: 'Deliver customer value predictably and quickly by making work visible, capping multitasking through WIP limits, and pulling work only when downstream capacity is available.',
    primaryUsers: ['Software & DevOps teams', 'IT service desks', 'Customer support teams', 'Marketing & content teams', 'HR recruitment & legal operations', 'Manufacturing material planners'],
    difficulty: 'Beginner',
    horizon: 'Immediate start / Continuous evolutionary workflow management',
    scope: 'Team workflow / Support queue / Production line replenishment',
    timeToResult: 'Same week to visualize board; 2–4 weeks to observe cycle-time stabilization',
    dataNeeds: 'Work item status, start dates, completion dates, WIP count per stage, blocker records',
    keyOutput: 'Visual Kanban board, WIP limit policies, Cumulative Flow Diagram (CFD), cycle time distribution (85th percentile), flow efficiency metrics',
    bestPairedWith: 'Lean Management (pull mechanism), Scrum (Scrumban), Kaizen (improving column policies), VSM (future-state pull loops)',
    keyFeatures: [
      'Visual Board with distinct columns reflecting the true end-to-end workflow stages',
      'Work-in-Progress (WIP) Limits: strict numerical caps on how many cards are permitted in active columns',
      'Pull System: new tasks are never pushed; they are pulled only when an active slot frees up downstream',
      'Explicit Policies: clear "Definition of Done" and exit criteria written visibly on each column',
      'Classes of Service: Expedite (urgent production incidents), Fixed-Date (contractual), Standard, Intangible (refactoring)',
      'Flow Metrics: Lead Time, Cycle Time, Throughput, and Work-Item Age (the leading indicator of delay)',
      'Cumulative Flow Diagram (CFD): stacked area chart revealing bottleneck buildup, widening WIP bands, and delivery trends',
      'Manufacturing Kanban formula: Number of Kanbans = (Daily Demand × Lead Time × (1 + Safety Factor)) ÷ Container Size'
    ],
    howItWorks: 'Map your actual existing workflow stages without reorganizing. Place every current task on the board as a card. Establish WIP limits on active columns—typically equal to or less than the number of active team members. Enforce the core rule: "Stop starting, start finishing." Hold a daily 10-minute standup walking the board right-to-left, focusing on blocked and aging cards. Track start and finish dates to calculate historical 85th percentile cycle times for accurate SLA forecasting.',
    coreConcepts: [
      {
        term: 'WIP Limit',
        definition: 'The maximum allowable number of work items permitted in a specific workflow state or column at any single point in time.'
      },
      {
        term: 'Pull vs. Push',
        definition: 'In a pull system, team members take on new work only when they finish an item; in a push system, work is assigned regardless of downstream capacity.'
      },
      {
        term: 'Work-Item Age',
        definition: 'The elapsed time since an in-progress work item was started. It is the most sensitive leading indicator of process delay.'
      },
      {
        term: 'Cumulative Flow Diagram (CFD)',
        definition: 'A visual chart plotting total items across each workflow stage over time; horizontal distance indicates cycle time, while vertical distance indicates WIP.'
      },
      {
        term: '85th Percentile SLA',
        definition: 'Forecasting delivery based on historical cycle time where 85% of past items closed in X days or less, rather than relying on subjective guesswork.'
      }
    ],
    strengths: [
      'Zero initial disruption—starts with what you do now and introduces evolutionary, stress-reducing improvements',
      'Instantly exposes systemic overload and provides teams with empirical backing to decline un-prioritized work',
      'Replaces contentious estimation meetings with robust probabilistic cycle-time forecasting'
    ],
    limitations: [
      'Without strictly enforced WIP limits, a Kanban board quickly degenerates into a glorified to-do list',
      'Requires team discipline to update card statuses and log blockers in real time',
      'Less suited for massive, single monolithic projects with zero divisible sub-deliverables'
    ],
    workflowPlacement: {
      upstream: 'Customer support tickets, product backlogs, recruitment requisitions',
      downstream: 'Sprint retrospectives, client SLA reporting, continuous deployment pipelines'
    },
    useCases: [
      {
        title: 'IT Support Desk SLA Stabilization',
        industry: 'IT Services & Managed Support',
        situation: 'Madurai software firm had 184 open client tickets with engineers juggling 8–12 tickets simultaneously, missing monthly SLAs.',
        action: 'Mapped support workflow on Jira, purged obsolete items, enforced a WIP limit of 10 for 14 engineers, created an Expedite class of service, and ran daily right-to-left standups.',
        outcome: 'Median ticket cycle time fell from 11 days to 3.5 days; SLA attainment soared from 70% to 95%.'
      },
      {
        title: 'Two-Wheeler Assembly Hardware Supply Kanban',
        industry: 'Automotive Manufacturing',
        situation: 'Assembly line frequently halted due to fastener stockouts while warehouse held 6 months of excess slow-moving bolts.',
        action: 'Calculated kanban bin quantities for 150 hardware line items using daily usage, lead time, and a 20% safety factor; deployed physical two-bin visual replenishment.',
        outcome: 'Fastener line stoppages ceased entirely while total line-side inventory holding dropped from 45 days to 4 days.'
      }
    ],
    caseStudy: {
      company: 'Kodai Digital Services',
      revenue: '₹14 crore turnover',
      staff: '95 employees',
      profile: 'Madurai-based IT services enterprise delivering custom mobile apps, web portals, and 24/7 post-deployment application support for international clients.',
      challenge: 'Support SLAs were breached every single month, resulting in painful client escalations and penalty clauses. Support engineers held 8 to 12 active tickets simultaneously, constantly context-switching. Sprints failed repeatedly because incoming support incidents disrupted scheduled feature development.',
      whyChosen: 'Support requests arrive in an unpredictable continuous stream. The delivery head recognized this was a flow problem rather than a project planning problem, making Kanban’s pull-based queue management the ideal fit.',
      steps: [
        'Delivery head and two team leads attended a 2-day certified Kanban foundation course.',
        'Mapped the real support workflow: Intake → Triage → Ready → In Progress → Client Validation → Done.',
        'Audited all 184 open tickets; closed 60 obsolete tickets immediately after consulting clients.',
        'Established strict WIP limits: "In Progress" capped at 10 (for 14 engineers, forcing swarming on blocked items); "Client Validation" capped at 15 with an automated 3-day close policy.',
        'Defined Classes of Service: Expedite (production outage, max 1, all-hands swarm), Fixed-Date (contractual updates), Standard, and Intangible (technical debt refactoring, minimum 15% guaranteed capacity).',
        'Instituted a daily 10-minute standup walking the board right-to-left, focusing on aging cards and resolving blockers.',
        'Held weekly replenishment meetings with account managers and shared monthly CFD cycle-time charts with clients.'
      ],
      results: [
        'Median ticket resolution cycle time dropped from 11 days down to 3.5 days within four months.',
        'Contractual SLA compliance rose from ~70% to above 95%.',
        'Total open ticket backlog stabilized from 184 down to 60 manageable items.',
        'Clients agreed to accept 85th percentile cycle-time SLAs (e.g., "85% of issues resolved in 4 days") in place of arbitrary fixed dates.'
      ],
      lessonsLearned: [
        'Enforcing WIP limits felt deeply uncomfortable during the initial three weeks; managers had to fiercely protect engineers from client demands to "just start my ticket".',
        'Reviewing Cumulative Flow Diagrams directly with clients transformed contentious monthly reviews into collaborative bottleneck-resolution sessions.',
        'Purging obsolete tickets right at the kickoff generated an immediate psychological boost across the engineering team.'
      ]
    },
    quiz: [
      {
        id: 'q-kan-1',
        question: 'What is the primary operational objective of setting Work-In-Progress (WIP) limits in Kanban?',
        options: ['To reduce payroll and headcount', 'To optimize flow and cycle time by preventing overload, context-switching, and multitasking', 'To accelerate isolated individual task speeds', 'To replace project estimation permanently'],
        correctAnswer: 1,
        explanation: 'WIP limits stop teams from starting more work than they can finish. By capping multitasking and context-switching, items flow faster from start to completion.'
      },
      {
        id: 'q-kan-2',
        question: 'In a true Kanban system, how does work transition from one column to the next?',
        options: ['It is pushed automatically by the project manager', 'It is pulled by team members only when downstream capacity frees up under the WIP limit', 'It is transferred in rigid two-week timeboxes', 'It is assigned randomly by algorithmic scheduling'],
        correctAnswer: 1,
        explanation: 'Kanban operates on a pull system: downstream stages pull work from upstream only when an open WIP slot becomes available.'
      },
      {
        id: 'q-kan-3',
        question: 'On a Cumulative Flow Diagram (CFD), what does a progressively widening "In Progress" band indicate?',
        options: ['Throughput is accelerating rapidly', 'WIP is accumulating, bottlenecks are forming, and cycle times are lengthening', 'Blockers have been successfully eliminated', 'The team is idle'],
        correctAnswer: 1,
        explanation: 'When the vertical distance between start and finish lines expands on a CFD, WIP is swelling. By Little’s Law, rising WIP directly inflates average cycle times.'
      },
      {
        id: 'q-kan-4',
        question: 'What statistical metric do modern Kanban practitioners recommend for setting client SLA commitments?',
        options: ['The arithmetic mean (average) cycle time', 'The best-case (fastest recorded) cycle time', 'A high historical percentile, such as the 85th or 95th percentile', 'Subjective consensus estimates from planning poker'],
        correctAnswer: 2,
        explanation: 'Cycle time data is skewed, not normally distributed. Using a high percentile (like the 85th percentile) ensures 85% of past items finished within that timeframe, providing an empirical commitment.'
      },
      {
        id: 'q-kan-5',
        question: 'In a manufacturing two-bin Kanban system, what event serves as the authorization signal to replenish stock?',
        options: ['A monthly procurement forecast update', 'An empty bin returned from the assembly line to the storeroom', 'A verbal request from the plant manager', 'The month-end accounting close'],
        correctAnswer: 1,
        explanation: 'In physical two-bin replenishment, an empty bin returned to the stockroom acts as the visual kanban card, authorizing the stockroom to refill exactly one bin of pre-calculated quantity.'
      }
    ]
  }
];

export const CATEGORY_4_STACKS: StrategyStack[] = [
  {
    id: 'stack-ops-a',
    name: 'Stack A — Startup / Small Business (<50 People)',
    targetOrg: 'Seed/Early-Stage Startups & Small Businesses (Under 50 employees)',
    recommendedChain: ['kanban', 'kaizen', 'vsm'],
    cadence: {
      quarterly: 'Quarterly single-process VSM review and bottleneck check',
      annually: 'Annual end-to-end flow evaluation and Kanban board reconfiguration',
      every23Years: 'Core operational system overhaul'
    },
    whyItFits: 'Kanban provides immediate visual flow and prevents overload without heavy bureaucracy. Weekly Kaizen review empowers frontline staff to fix daily friction, and a single lightweight VSM maps the core order-to-delivery flow.',
    whatToSkip: 'Skip statistical Six Sigma belts and radical BPR clean-sheets until basic operational processes are stable and standardized.'
  },
  {
    id: 'stack-ops-b',
    name: 'Stack B — Growing SME (50–500 People)',
    targetOrg: 'Mid-Sized Manufacturers, Healthcare Centers, IT Services, Regional Colleges',
    recommendedChain: ['lean', 'vsm', 'kaizen', 'kanban', 'sixsigma', 'bpr'],
    cadence: {
      quarterly: 'Semi-annual VSM refresh, monthly Kaizen blitzes, and 1–2 focused Green Belt DMAIC projects',
      annually: 'Comprehensive Lean operational audit, takt time re-balancing, and 5S plant-wide certification',
      every23Years: 'Radical Clean-Sheet BPR on one legacy process that has reached diminishing returns'
    },
    whyItFits: 'Lean provides the daily operating baseline (5S, standard work, Gemba standups). VSM targets where to intervene, Kaizen provides rapid 5-day blitzes, Kanban stabilizes knowledge work, and Six Sigma tackles persistent defect variation.',
    whatToSkip: 'Avoid launching massive corporate transformation offices or full-time Black Belt armies; 2–4 trained Green Belts deliver maximum ROI.'
  },
  {
    id: 'stack-ops-c',
    name: 'Stack C — Enterprise & Large Institutions (500+ People)',
    targetOrg: 'Enterprises, Multi-Plant Manufacturers, Healthcare Chains, Universities',
    recommendedChain: ['lean', 'sixsigma', 'vsm', 'kaizen', 'kanban', 'bpr'],
    cadence: {
      quarterly: 'Hoshin Kanri policy deployment reviews, portfolio Black Belt tollgate audits, and enterprise VSM updates',
      annually: 'Full Lean Six Sigma program review with finance-validated cost savings and supplier Kanban integration',
      every23Years: 'Enterprise digital BPR platform transformation with executive change management'
    },
    whyItFits: 'Combines Lean speed and flow with Six Sigma statistical rigor to drive millions in bottom-line savings and near-zero defect rates across complex multi-site operations.',
    whatToSkip: 'Beware of belt inflation and bureaucratic certification factories; tie all belt certifications strictly to verified financial and operational impact.'
  }
];

export const CATEGORY_4_SCENARIOS: ScenarioMission[] = [
  {
    id: 'scen-pharma-sixsigma',
    title: 'Pharma Packaging Line Label Mismatch Crisis',
    role: 'Quality Head',
    companyContext: 'Mid-sized pharmaceutical packaging facility producing blister packs under CDSCO/FDA compliance.',
    crisisPrompt: 'In the past six months, label mismatches have occurred three times on the blister packaging line. While caught before dispatch, this is a critical regulatory violation. The Managing Director demands immediate mandatory classroom retraining of all 60 operators and supervisors this weekend. Historical data shows retraining was conducted after each previous incident, with zero permanent effect. How do you intervene?',
    targetTools: ['sixsigma', 'lean'],
    options: [
      {
        id: 'opt-pharma-1',
        label: 'Comply with the MD: conduct 2-day mandatory classroom retraining on GMP rules & issue warning letters',
        toolUsed: 'Retraining reflex',
        explanation: 'Poor choice. Retraining addresses lack of knowledge, but label mismatches in high-speed packaging are driven by human eye fatigue, look-alike label reels, and manual changeovers. Retraining alone will not prevent recurrence and wastes team credibility.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-pharma-2',
        label: 'Launch a focused DMAIC project with Gage R&R, FMEA, and install automated 2D barcode scanner Poka-Yoke interlocks',
        toolUsed: 'Six Sigma DMAIC & Lean Poka-Yoke',
        explanation: 'Exemplary. Poka-yoke mistake-proofing (barcode interlocks) physically prevents human error from reaching production by cutting power if a wrong reel is loaded. Backing it with an FMEA and CAPA documentation satisfies drug inspectors and provides verifiable control.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-pharma-3',
        label: 'Replace the shift supervisors and add two extra manual inspectors at the end of the line',
        toolUsed: 'Inspection bloating',
        explanation: 'Ineffective. Manual inspection is statistically proven to catch only 70–80% of visual defects. Adding inspectors inflates payroll and inspection fatigue without addressing the root cause at the label reel loading station.',
        isOptimal: false,
        rubricPoints: 10
      }
    ],
    modelAnswer: 'Persuade the Managing Director to pivot from punitive retraining to a focused DMAIC quality project. Retraining treats human error as a moral failing rather than a system design defect. Use Define-Measure-Analyze to trace the reel loading procedure. Implement an immediate Poka-Yoke engineering countermeasure: install fixed 2D barcode scanner interlocks directly on the blister machine reel spindle that compare scanned reel barcodes against the digital batch manufacturing order (BMR), cutting power to the motor if an invalid code is scanned. Run a Gage R&R on the line camera verification system, document the Corrective and Preventive Action (CAPA), and update standard work.',
    actionChecklist: [
      'Stop relying on retraining when the root cause is system vulnerability',
      'Implement mechanical/digital Poka-Yoke interlocks to prevent human error',
      'Perform Failure Mode and Effects Analysis (FMEA) on changeover sequences',
      'Lock in continuous verification via Statistical Process Control and CAPA logs'
    ],
    reflectionKey: 'Mistake-proofing (Poka-Yoke) beats human vigilance every time in high-speed operations.'
  },
  {
    id: 'scen-diagnostics-vsm',
    title: 'Diagnostic Chain 36-Hour Turnaround vs Competitor 12-Hour Guarantee',
    role: 'Chief Operating Officer',
    companyContext: '12-center clinical diagnostics laboratory chain facing a new venture-backed entrant offering guaranteed 12-hour report turnaround.',
    crisisPrompt: 'Average turnaround from sample collection to WhatsApp report is 36 hours. Footfall has plunged 20% in two months. Your Chief Pathologist insists automated biochemical analyzers are overwhelmed and demands ₹2 crore in emergency capital expenditure for two high-throughput analyzers. Do you authorize the purchase or investigate the value stream?',
    targetTools: ['vsm', 'lean'],
    options: [
      {
        id: 'opt-diag-1',
        label: 'Authorize the ₹2 crore emergency purchase of high-throughput German analyzers immediately',
        toolUsed: 'Premature CapEx spending',
        explanation: 'Dangerous capital allocation. In clinical diagnostics, actual machine analysis time is rarely the bottleneck—it typically takes under 45 minutes. Buying faster machines will simply cause specimens to pile up faster in front of or behind the analyzer.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-diag-2',
        label: 'Execute a Value Stream Map of the sample-to-report stream and re-engineer waiting queues & courier batches',
        toolUsed: 'Value Stream Mapping (VSM) & Flow Optimization',
        explanation: 'Spot-on. A VSM almost always reveals that 32 of the 36 hours are squandered in courier batching (waiting for evening pickup), manual specimen accessioning queues, and reports sitting in a pathologist validation batch. Reorganizing courier routes and continuous digital validation unlocks 12-hour turnaround with near-zero capital spend.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-diag-3',
        label: 'Offer patients an immediate 30% discount to compensate for the 36-hour delivery time',
        toolUsed: 'Margin destruction',
        explanation: 'Destructive. Price cuts destroy diagnostic margins without solving the patient need for rapid clinical diagnosis, and doctors will continue referring patients to the 12-hour laboratory.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Reject the ₹2 crore analyzer expenditure and lead a Value Stream Mapping exercise from patient phlebotomy to WhatsApp report dispatch. You will discover that touch time (centrifuging, pipetting, analyzer run) is barely 65 minutes out of 36 hours (a Process Cycle Efficiency under 3.5%). 32+ hours are squandered in waiting: samples gathered across 12 centers sit in iceboxes until the 7:00 PM evening courier van, accessioning staff work in an overnight batch avalanche, and completed test results wait 14 hours for pathologist signature batches. Re-engineer the logistics into 3 daily micro-courier runs, introduce barcode pre-accessioning at collection points, and implement digital auto-verification for normal ranges with mobile push notification for urgent abnormal reviews.',
    actionChecklist: [
      'Map the entire value stream before spending capital on faster machinery',
      'Calculate Process Cycle Efficiency (PCE) to expose waiting muda',
      'Replace once-a-day bulk courier runs with frequent small-batch runs',
      'Automate normal-result sign-offs to free pathologists for critical reviews'
    ],
    reflectionKey: 'The bottleneck in modern services is almost never the machine; it is the queue between machines.'
  },
  {
    id: 'scen-school-bpr',
    title: 'School Group 30-Day Fee Collection & Reconciliation Nightmare',
    role: 'Administrative Director',
    companyContext: 'Private school educational trust with 3 campuses, 2,500 students, and an overburdened administrative office.',
    crisisPrompt: 'Term fee collection involves manual cash and check deposits at school counters, hand-written carbon receipts, manual bank slip deposits, and reconciliation by accounts across three spreadsheets. The process takes 30 days per term, parents wait in 2-hour queues, receipts are frequently mislaid, and the School Board is demanding a 40% reduction in back-office administrative overhead. The accounts head suggests hiring 4 temporary clerks.',
    targetTools: ['bpr'],
    options: [
      {
        id: 'opt-school-1',
        label: 'Hire 4 temporary clerks during admission season to speed up physical counter queues',
        toolUsed: 'Staffing band-aid',
        explanation: 'Palliative fix that increases administrative payroll and does nothing to solve the root problem: fragmented manual reconciliation across three spreadsheets.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-school-2',
        label: 'Execute Clean-Sheet BPR: deploy automated parent portal with UPI auto-reconciliation and redeploy cashiers',
        toolUsed: 'Business Process Reengineering (Clean-Sheet Redesign)',
        explanation: 'Masterful application of BPR. Organizes around the customer outcome, captures data once at source, eliminates manual reconciliation entirely, and protects employee morale with proactive redeployment into student counseling.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-school-3',
        label: 'Mandate that parents only pay by Demand Draft (DD) mailed to head office',
        toolUsed: 'Customer burden shifting',
        explanation: 'Transfers the operational burden onto the customer, worsening parent dissatisfaction while still requiring manual ledger entry.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'Apply Clean-Sheet Business Process Reengineering (Hammer & Champy). Refuse to pave the cowpath by hiring clerks or buying faster receipt printers. Redesign the fee collection flow around the parent outcome: eliminate physical cash counters entirely. Launch a parent mobile portal with UPI, net banking, and virtual account numbers. When a payment completes, the payment gateway webhook immediately marks the student fee record as paid, issues a cryptographically signed GST/school receipt via WhatsApp and SMS, and updates the ERP ledger with zero human intervention. The 30-day reconciliation cycle drops to real-time (0 days). Give the 4 cashier staff a zero-layoff pledge and redeploy them into student career counseling, admissions outreach, and parent concierge services.',
    actionChecklist: [
      'Organize around the outcome (fee settlement) rather than tasks (counter receipts)',
      'Capture information once directly at the source via parent digital payment',
      'Subsume reconciliation into transaction processing via automated webhooks',
      'Provide a zero-layoff pledge to eliminate employee resistance to automation'
    ],
    reflectionKey: 'Do not automate an obsolete manual procedure; obliterate it and redesign from the clean sheet.'
  },
  {
    id: 'scen-recruitment-kanban',
    title: 'Recruitment Firm Multi-Tasking Overload Crisis',
    role: 'Head of Operations',
    companyContext: 'Specialized executive recruitment firm with 15 talent acquisition recruiters handling technology and engineering mandates.',
    crisisPrompt: 'Each recruiter is currently juggling 18–25 open client job positions at once. Clients are complaining about delayed candidate shortlists (averaging 24 days), while recruiters complain of severe burnout and claim they need double the headcount. Candidate interview conversion rates remain under 8%. The CEO wants to recruit 8 additional recruiters immediately.',
    targetTools: ['kanban', 'lean'],
    options: [
      {
        id: 'opt-recruit-1',
        label: 'Agree with the CEO and recruit 8 additional junior recruiters to absorb the mandates',
        toolUsed: 'Capacity delusion',
        explanation: 'Premature expansion. Adding recruiters without controlling work-in-progress simply increases total pipeline chaos, communication overhead, and company payroll.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-recruit-2',
        label: 'Implement a Visual Kanban Board with strict WIP limits of 5 active requisitions per recruiter',
        toolUsed: 'Kanban Flow & WIP Limit Discipline',
        explanation: 'Textbook Kanban implementation. Enforcing a WIP limit stops chronic context-switching, accelerates candidate shortlisting, and exposes true recruitment throughput.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-recruit-3',
        label: 'Mandate 12-hour workdays and Saturday shifts for current recruiters until the backlog clears',
        toolUsed: 'Muri (Overburden) abuse',
        explanation: 'Catastrophic. Overburden (Muri) causes recruiter resignations, worsens candidate screening quality, and damages employer reputation.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Decline the 8-headcount hire and implement a Kanban workflow operating model with strict Work-in-Progress (WIP) limits. Under Little’s Law (Cycle Time = WIP ÷ Throughput), when each recruiter juggles 25 open requisitions, average completion time stretches to 24+ days because recruiters spend 80% of their workday switching context between disparate job descriptions. Establish a visual physical/digital Kanban board with stages: Requisition Briefing, Sourcing, Screening, Client Shortlist, Interviewing, and Offer. Enforce a strict WIP limit of 5 active mandates per recruiter. Excess client mandates remain in a prioritized "Ready" backlog queue. Recruiters only pull a new job order when a candidate is successfully placed or the role is closed. Average cycle time will drop from 24 days to under 8 days, and recruiter morale will surge.',
    actionChecklist: [
      'Stop starting, start finishing: cap active work in progress per person',
      'Visualize all work items on a shared Kanban board to expose hidden bottlenecks',
      'Use Little’s Law to demonstrate that high WIP directly inflates lead times',
      'Commit to client turnaround based on 85th percentile historical cycle time'
    ],
    reflectionKey: 'Multitasking is an operational illusion; limiting WIP is the only proven accelerator of flow.'
  }
];

export const CATEGORY_4_GLOSSARY: GlossaryItem[] = [
  { term: '5S', definition: 'Workplace organization methodology: Sort (Seiri), Set in order (Seiton), Shine (Seiso), Standardise (Seiketsu), and Sustain (Shitsuke).', tool: 'Lean Management' },
  { term: 'A3 Report', definition: 'A single 11×17-inch structured problem-solving report containing background, current condition, target, root-cause analysis (5-Whys), countermeasures, and follow-up.', tool: 'Kaizen' },
  { term: 'As-Is / To-Be', definition: 'The documented current operating state (As-Is) versus the radically reimagined outcome-driven future design (To-Be) in Business Process Reengineering.', tool: 'Business Process Reengineering' },
  { term: 'BPMN 2.0', definition: 'Business Process Model and Notation: the international standardized graphical notation for modeling executable business workflows, decision gateways, and swimlanes.', tool: 'Business Process Reengineering' },
  { term: 'Cumulative Flow Diagram (CFD)', definition: 'A stacked area chart plotting total work items across each workflow stage over time; horizontal distance reveals cycle time, while band width represents WIP.', tool: 'Kanban System' },
  { term: 'Class of Service', definition: 'A policy categorization in Kanban (Expedite, Fixed-Date, Standard, Intangible) dictating how different categories of work items are prioritized and handled.', tool: 'Kanban System' },
  { term: 'Control Chart (SPC)', definition: 'A time-ordered statistical plot with Upper and Lower Control Limits (±3 sigma) used in Six Sigma to distinguish common-cause noise from assignable special-cause variation.', tool: 'Six Sigma' },
  { term: 'Critical to Quality (CTQ)', definition: 'A quantifiable, measurable performance attribute demanded by the customer for an output to be considered defect-free.', tool: 'Six Sigma' },
  { term: 'DMAIC', definition: 'Define, Measure, Analyse, Improve, Control: the standard 5-stage data-driven problem-solving roadmap used in Six Sigma projects.', tool: 'Six Sigma' },
  { term: 'DPMO', definition: 'Defects Per Million Opportunities: standard Six Sigma metric calculated as (Total Defects ÷ (Total Units × Defect Opportunities per Unit)) × 1,000,000.', tool: 'Six Sigma' },
  { term: 'FIFO Lane', definition: 'A capped, physical or digital buffer maintaining strict First-In-First-Out sequencing between two decoupled process steps in Value Stream Mapping.', tool: 'Value Stream Mapping' },
  { term: 'FMEA', definition: 'Failure Mode and Effects Analysis: a systematic risk-ranking tool calculating Risk Priority Number (RPN = Severity × Occurrence × Detection).', tool: 'Six Sigma' },
  { term: 'Gage R&R', definition: 'Measurement System Analysis evaluating Repeatability (gauge precision) and Reproducibility (appraiser consistency) to prove data integrity before analysis.', tool: 'Six Sigma' },
  { term: 'Gemba', definition: 'Japanese term for "the real place" where value is created (the factory floor, the customer service desk, the surgical theatre).', tool: 'Lean Management' },
  { term: 'Hoshin Kanri', definition: 'Strategic deployment methodology that systematically cascades breakthrough organizational goals down into departmental daily Kaizen targets.', tool: 'Lean Management' },
  { term: 'Jidoka', definition: 'Built-in quality with autonomation: granting machines or frontline human operators full authority to immediately stop the process upon spotting a defect.', tool: 'Lean Management' },
  { term: 'Kaizen Burst', definition: 'A starburst symbol placed on a Value Stream Map highlighting the exact location and scope where a focused Kaizen blitz event is required.', tool: 'Value Stream Mapping' },
  { term: 'Muda, Mura, Muri', definition: 'The three enemies of Lean flow: Muda (waste), Mura (unevenness or variability), and Muri (overburden of people or equipment).', tool: 'Lean Management' },
  { term: 'Pacemaker Process', definition: 'The single dedicated step in a value stream that receives the customer production schedule, with all upstream operations pulling from its pace.', tool: 'Value Stream Mapping' },
  { term: 'Process Cycle Efficiency (PCE)', definition: 'Benchmark Lean metric equal to (Total Value-Adding Processing Time ÷ Total Elapsed Lead Time) × 100. Frequently under 5% in un-optimized workflows.', tool: 'Value Stream Mapping' },
  { term: 'PDCA Cycle', definition: 'Plan, Do, Check, Act: the iterative four-stage management loop for continuous testing, learning, and standardizing improvements.', tool: 'Kaizen' },
  { term: 'Percent Complete & Accurate (%C&A)', definition: 'The percentage of times a process step receives inputs from upstream that can be completed without rework, clarification, or correction.', tool: 'Value Stream Mapping' },
  { term: 'Poka-Yoke', definition: 'Mistake-proofing mechanism or design (such as a physical guide pin or software validation check) that makes it impossible to commit an error.', tool: 'Lean Management' },
  { term: 'Pull System', definition: 'A manufacturing or service operating model where production or work initiation is triggered strictly in response to downstream customer signals.', tool: 'Kanban System' },
  { term: 'SIPOC', definition: 'Suppliers, Inputs, Process, Outputs, Customers: high-level process mapping tool used in the Define stage of Six Sigma projects.', tool: 'Six Sigma' },
  { term: 'SMED', definition: 'Single-Minute Exchange of Die: Lean rapid changeover methodology that reduces machine setup times to under 10 minutes (single digits of minutes).', tool: 'Lean Management' },
  { term: 'Standard Work', definition: 'The agreed, documented, and visually displayed current best and safest way to perform a specific task, providing the baseline for future Kaizen.', tool: 'Lean Management' },
  { term: 'Supermarket', definition: 'A controlled inventory buffer between decoupled processes in a Value Stream Map from which downstream operations withdraw parts as needed.', tool: 'Value Stream Mapping' },
  { term: 'Takt Time', definition: 'Available working production time divided by customer demand rate; the operational cadence required to satisfy demand without inventory buildup.', tool: 'Lean Management' },
  { term: 'TIMWOODS', definition: 'The Eight Wastes of Lean: Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects, and Skills under-utilized.', tool: 'Lean Management' },
  { term: 'WIP Limit', definition: 'A strict numeric ceiling on the maximum number of work items permitted in an active column or process state on a Kanban board.', tool: 'Kanban System' },
  { term: 'Yokoten', definition: 'The proactive practice of horizontally deploying and copying a validated Kaizen improvement across other departments, machines, or branches.', tool: 'Kaizen' }
];
