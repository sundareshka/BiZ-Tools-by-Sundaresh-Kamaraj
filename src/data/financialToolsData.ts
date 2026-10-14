import { ToolDefinition, StrategyStack, ScenarioMission, GlossaryItem } from './toolsData.ts';

export const FINANCIAL_TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'breakeven',
    name: 'Break-Even & Cost-Volume-Profit (CVP) Analysis',
    shortName: 'Break-Even Analysis',
    category: 'Financial & Performance',
    tagline: 'Determine the exact sales volume needed to cover all costs and model profit sensitivity',
    origin: 'Developed by Scottish-American engineer Walter Rautenstrauch in the 1930s as the graphic break-even chart; standard managerial accounting staple for cost-volume-profit modeling.',
    corePurpose: 'Establish the operational baseline where Total Revenues equal Total Costs (zero economic profit or loss) and quantify margin of safety and operating leverage.',
    primaryUsers: ['Chief Financial Officers', 'Founders & Entrepreneurs', 'Pricing Strategists', 'Commercial Heads', 'Investment Analysts'],
    difficulty: 'Beginner',
    horizon: 'Monthly, Quarterly, and Annual Planning Cycles',
    scope: 'Single Product, Product Line, Business Unit, or Whole Enterprise',
    timeToResult: '1–2 hours with clear cost segregation',
    dataNeeds: 'Segregated fixed overhead costs, unit variable costs, and target unit selling prices',
    keyOutput: 'Break-even point in units & revenue, contribution margin ratio, margin of safety buffer, degree of operating leverage',
    bestPairedWith: 'Activity-Based Costing (for accurate cost segregation), Marketing Mix / Pricing (for price elasticity), Zero-Based Budgeting',
    keyFeatures: [
      'Segregates all operating expenditures into strict Fixed Costs (rent, salaries, depreciation) vs Variable Costs (materials, sales commissions, packaging)',
      'Calculates Unit Contribution Margin (Price − Unit Variable Cost) and Contribution Margin Ratio (CM ÷ Price)',
      'Calculates Break-Even Point in Units (Fixed Costs ÷ Unit CM) and Break-Even Revenue (Fixed Costs ÷ CM Ratio)',
      'Measures Margin of Safety: the buffer between actual or forecasted sales and the break-even threshold',
      'Determines Target Profit Volume: (Fixed Costs + Target Profit) ÷ Unit Contribution Margin',
      'Calculates Degree of Operating Leverage (DOL = Total Contribution Margin ÷ Operating Profit) to quantify profit volatility from revenue swings'
    ],
    howItWorks: 'Classify every cost element as either fixed (unchanging with volume within the relevant range) or variable (varying directly in proportion to output). Compute the Unit Contribution Margin, which represents the money each unit sale contributes toward paying down fixed overhead. Once fixed overhead is covered, 100% of subsequent contribution margin flows straight to operating profit (EBIT). Model what-if scenarios for price changes, supplier cost inflation, and capital automation investments.',
    coreConcepts: [
      {
        term: 'Contribution Margin (CM)',
        definition: 'Sales revenue minus all variable costs. It represents the residual funds available to cover fixed costs and then generate operating profit.'
      },
      {
        term: 'Contribution Margin Ratio (CMR)',
        definition: 'Contribution margin expressed as a percentage of total sales revenue (CM ÷ Revenue). Indicates cents of profit contribution per dollar of sales.'
      },
      {
        term: 'Margin of Safety (MoS)',
        definition: 'The buffer by which expected or current sales exceed the break-even sales volume: (Current Sales − Break-Even Sales) ÷ Current Sales × 100%.'
      },
      {
        term: 'Operating Leverage',
        definition: 'The proportion of fixed costs versus variable costs in a firm’s cost structure. High fixed costs create high operating leverage, multiplying profit gains in booms and losses in downturns.'
      },
      {
        term: 'Relevant Range',
        definition: 'The specific boundary of sales volume and activity over which fixed costs remain truly constant and variable costs per unit do not fluctuate.'
      }
    ],
    strengths: [
      'Provides an unambiguous minimum sales quota required for organizational survival',
      'Empowers executives to instantly evaluate the profit impact of price changes, discounts, and supplier cost shocks',
      'Visual and intuitive for non-financial founders, sales leaders, and board members'
    ],
    limitations: [
      'Assumes linear cost and revenue functions that rarely hold under bulk purchase discounts or stepped labor capacity',
      'Becomes complex in multi-product enterprises with shared overhead without using weighted average contribution margins',
      'Static model that ignores inventory stockpiling changes under absorption costing rules'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Activity-Based Costing, pricing strategy, and supplier procurement contracts',
      downstream: 'Feeds Working Capital targets, sales quota planning, budgeting, and capital expenditure decisions'
    },
    useCases: [
      {
        title: 'New SaaS Product Pricing & Quota Setting',
        situation: 'Cloud software firm launching an enterprise tier with $350k fixed cloud and developer costs.',
        problem: 'Leadership needs to know how many subscription seats at $150/mo are required to turn cash-flow positive.',
        action: 'Conducted CVP analysis factoring in $25/mo per-seat third-party API variable costs.',
        outcome: 'Established break-even at 2,800 annual user-months ($420k revenue); informed sales team compensation tiers.'
      },
      {
        title: 'Factory Automation Capex Decision',
        situation: 'Metal fabrication plant evaluating a $600k robotics cell that raises fixed depreciation but slashes unit labor costs.',
        problem: 'Fear that higher fixed overhead increases downside vulnerability if macro demand falls.',
        action: 'Modeled break-even shift: break-even volume rose by 18%, but unit CM doubled from $40 to $80.',
        outcome: 'Approved automation after confirming current order backlog provides a 42% margin of safety even at higher BEP.'
      },
      {
        title: 'Restaurant Franchise Menu Rationalization',
        situation: 'Multi-unit casual dining franchise with stagnant net margins despite rising table counts.',
        problem: 'Several popular entrees had razor-thin contribution margins that failed to cover kitchen labor overhead.',
        action: 'Calculated contribution margins and break-even covers per dish category across weekdays and weekends.',
        outcome: 'Repriced low-CM high-volume items, boosted average check by $3.40, and reduced break-even covers by 14%.'
      }
    ],
    caseStudy: {
      company: 'Aura Fitness & Wellness Equipment',
      revenue: '$14.2 Million',
      staff: '68 Employees',
      profile: 'Direct-to-consumer and boutique gym connected fitness equipment manufacturer.',
      challenge: 'During a supply-chain crunch, ocean shipping and component costs spiked, turning historical profits into a $65,000 monthly operating loss despite 12% revenue growth.',
      whyChosen: 'Break-Even and CVP modeling was selected to rapidly diagnose which product lines were underwater and determine the exact price hikes and volume targets needed to restore profitability.',
      steps: [
        'Segregated all overhead into fixed ($310,000/mo including factory lease, software, core engineering) and variable (aluminum, electronics, shipping packaging, sales commission).',
        'Calculated unit contribution margins across their 3 SKUs: Studio Bike ($420 CM), Smart Rower ($510 CM), and Recovery Pod ($180 CM).',
        'Identified that the Recovery Pod’s CM ratio had collapsed from 35% to 8% due to air-freight surcharges, requiring 1,722 units to break even alone.',
        'Swapped Recovery Pod suppliers to domestic assembly, saving $190 in variable freight, and raised the retail price by $100.',
        'Recalculated the company-wide composite break-even point with the updated weighted average contribution margin.'
      ],
      results: [
        'Company break-even monthly revenue decreased from $1.38M to $1.05M.',
        'Recovery Pod contribution margin expanded from $180 to $470 per unit.',
        'Operating margin rebounded from −4.5% to +11.8% within two operating quarters.',
        'Margin of safety widened from −3% to +26%, protecting the business against seasonal dips.'
      ],
      lessonsLearned: [
        'Revenue growth without contribution margin vigilance is an accelerated route to corporate insolvency.',
        'Multi-product companies must continuously monitor sales mix weights, as shifting towards low-CM products quietly inflates the company-wide break-even dollar threshold.',
        'Operating leverage is a double-edged sword: keeping fixed costs lean during uncertain market conditions maintains survival flexibility.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Detailed trial balance and general ledger categorizing all costs',
        'Direct manufacturing or service delivery bills of materials (BOM)',
        'Sales transaction logs with unit volumes and realised net prices'
      ],
      steps: [
        'Step 1: Segregate all costs into Fixed, Variable, and Semi-Variable using high-low method or account classification.',
        'Step 2: Determine unit selling price and average unit variable cost for each product line.',
        'Step 3: Calculate Unit Contribution Margin (Price − Unit Variable Cost) and CM Ratio.',
        'Step 4: Compute Break-Even in units (Fixed Costs ÷ Unit CM) and in sales dollars (Fixed Costs ÷ CM Ratio).',
        'Step 5: Calculate Margin of Safety and model sensitivity to ±10% changes in volume, price, and variable cost.'
      ],
      checklist: [
        'Are sales commissions and packaging properly classified as variable?',
        'Is factory supervisor salary treated as fixed within the current operational shift range?',
        'Have customer payment processing fees (e.g. 2.9% + $0.30) been incorporated into variable costs?',
        'Has the weighted average CM ratio been calculated using current sales mix percentages?'
      ],
      commonMistakes: [
        {
          mistake: 'Treating semi-variable costs (like electricity or customer support) as 100% fixed or 100% variable.',
          fix: 'Use the high-low method or scatter-plot regression to split costs into fixed base capacity vs variable usage.'
        },
        {
          mistake: 'Ignoring sales discounts and volume rebates, resulting in overstated unit revenue.',
          fix: 'Use Net Realized Selling Price after deducting all promotions, channel margins, and returns.'
        }
      ],
      plan306090: {
        d30: 'Audit cost ledger, classify all operating expenses, and compute baseline product contribution margins.',
        d60: 'Build automated dynamic CVP model, establish product break-even thresholds, and set minimum acceptable pricing rules.',
        d90: 'Integrate CVP dashboard into monthly board packs; run quarterly stress tests against inflation and sales volume shocks.'
      },
      proTips: [
        'Always calculate Break-Even in both units and revenue to give operational and commercial teams their respective targets.',
        'A margin of safety below 15% indicates urgent vulnerability to macro downturns—trigger immediate fixed cost containment.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Activity-Based Costing (ABC)',
        reason: 'When overhead costs are driven by multiple complex activities (setups, inspections) rather than pure volume.'
      },
      {
        alternative: 'Discounted Cash Flow (DCF / NPV)',
        reason: 'When evaluating multi-year capital projects where time-value of money and working capital delays dominate.'
      }
    ],
    reflectionPrompts: [
      'If our sales drop by 20% next quarter, by what percentage will our net operating profit drop under our current operating leverage?',
      'Which of our product lines delivers the highest contribution margin dollars per constraint hour on our primary bottleneck?'
    ],
    quickReferenceCard: [
      'BEP (Units) = Fixed Costs ÷ (Price − Unit Variable Cost)',
      'BEP (Dollars) = Fixed Costs ÷ Contribution Margin Ratio',
      'Target Volume = (Fixed Costs + Target Profit) ÷ Unit CM',
      'Margin of Safety = (Actual Sales − Break-Even Sales) ÷ Actual Sales',
      'DOL = Total Contribution Margin ÷ Operating Income (EBIT)'
    ],
    quiz: [
      {
        id: 'q-be-1',
        question: 'If a company has $120,000 in monthly fixed costs, sells a product for $50, and incurs $20 in variable costs per unit, what is its monthly break-even volume?',
        options: ['2,400 units', '4,000 units', '6,000 units', '8,000 units'],
        correctAnswer: 1,
        explanation: 'Unit Contribution Margin = $50 − $20 = $30. Break-Even Volume = Fixed Costs ÷ Unit CM = $120,000 ÷ $30 = 4,000 units.'
      },
      {
        id: 'q-be-2',
        question: 'What happens to the break-even point when a company automates production, causing fixed depreciation costs to rise while unit variable labor costs fall?',
        options: [
          'The break-even point in units always decreases immediately',
          'The break-even point in units rises, but the contribution margin per unit increases, allowing higher profit at high volumes',
          'The break-even point remains unchanged because total costs are constant',
          'The margin of safety automatically doubles'
        ],
        correctAnswer: 1,
        explanation: 'Higher fixed costs push the break-even threshold higher, requiring more units to cover baseline overhead; however, the higher unit contribution margin accelerates profitability once past break-even.'
      },
      {
        id: 'q-be-3',
        question: 'A business forecasts annual sales of $1,000,000. Its break-even sales revenue is calculated at $750,000. What is its Margin of Safety percentage?',
        options: ['15%', '25%', '33.3%', '75%'],
        correctAnswer: 1,
        explanation: 'Margin of Safety % = (Forecasted Sales − Break-Even Sales) ÷ Forecasted Sales = ($1,000,000 − $750,000) ÷ $1,000,000 = 25%.'
      },
      {
        id: 'q-be-4',
        question: 'What does a Degree of Operating Leverage (DOL) of 4.0 signify for an executive team?',
        options: [
          'The company has 4 times more debt than equity',
          'A 10% increase in sales revenue will result in a 40% increase in operating profit (EBIT)',
          'The company takes 4 years to recover its initial capital investment',
          'Variable costs are 4 times greater than fixed overhead'
        ],
        correctAnswer: 1,
        explanation: 'DOL measures profit elasticity: % Change in EBIT = DOL × % Change in Revenue. A DOL of 4.0 means a 10% revenue lift increases operating profit by 40% (and conversely, a 10% revenue drop cuts EBIT by 40%).'
      },
      {
        id: 'q-be-5',
        question: 'Which of the following would NOT decrease a company’s break-even point in units?',
        options: [
          'Negotiating a 10% price reduction on raw materials (lowering variable cost)',
          'Increasing the unit sales price without losing customer volume',
          'Downsizing executive office rent (reducing fixed costs)',
          'Increasing marketing spend by $50,000 to stimulate customer awareness'
        ],
        correctAnswer: 3,
        explanation: 'Increasing fixed marketing expenses raises total fixed costs, which directly increases the break-even volume required to cover overhead.'
      }
    ]
  },
  {
    id: 'costbenefit',
    name: 'Cost-Benefit Analysis (CBA) & Capital Budgeting',
    shortName: 'Cost-Benefit Analysis',
    category: 'Financial & Performance',
    tagline: 'Evaluate major capital investments using Net Present Value, Internal Rate of Return, and Payback periods',
    origin: 'Pioneered by French engineer Jules Dupuit (1848) and codified in federal public policy via the US Flood Control Act of 1936; formalized into modern corporate finance and DCF methods in the 1950s.',
    corePurpose: 'Provide a rigorous, quantitative framework to evaluate whether the multi-year incremental cash inflows of a strategic project justify the initial capital expenditure and ongoing operational costs.',
    primaryUsers: ['Investment Committees', 'CFOs & Treasurers', 'Corporate Development VPs', 'Project Directors', 'Public Sector Policy Planners'],
    difficulty: 'Intermediate',
    horizon: 'Multi-year strategic appraisal (3–10 Year Planning Horizons)',
    scope: 'Strategic Capital Expenditures (Capex), M&A, IT Systems, Facility Expansions',
    timeToResult: '1–3 days depending on cash flow forecasting fidelity',
    dataNeeds: 'Initial capital outlay, 5–10 year cash inflow/outflow schedules, terminal salvage values, Weighted Average Cost of Capital (WACC)',
    keyOutput: 'Net Present Value (NPV), Internal Rate of Return (IRR), Benefit-Cost Ratio (BCR), Simple & Discounted Payback Periods',
    bestPairedWith: 'Break-Even Analysis, Zero-Based Budgeting, VRIO Framework, Scenario Planning',
    keyFeatures: [
      'Discounts multi-year future cash flows back to present value using a risk-adjusted discount rate (Cost of Capital / WACC)',
      'Calculates Net Present Value (NPV = PV of Inflows − Initial Capex): the net dollar value created for shareholders',
      'Determines Internal Rate of Return (IRR): the exact discount rate where project NPV equals zero',
      'Computes Benefit-Cost Ratio (BCR = PV of Benefits ÷ PV of Costs), where BCR > 1.0 indicates economic viability',
      'Tracks Simple Payback Period and Discounted Payback Period (factoring in the time value of money)',
      'Enables Monte Carlo risk simulation and sensitivity testing against revenue shortfall or cost overruns'
    ],
    howItWorks: 'Identify all incremental cash outlays (Capex, training, implementation) and incremental cash inflows (new revenue, operating cost reductions, working capital recovery). Select an appropriate discount rate reflecting the company’s WACC plus a project risk premium. Discount all cash flows across the asset lifecycle. If NPV > 0 and IRR > Hurdle Rate, the project creates economic value and should be approved over the baseline status quo.',
    coreConcepts: [
      {
        term: 'Time Value of Money (TVM)',
        definition: 'The fundamental principle that a dollar received today is worth more than a dollar received in the future due to its earning capacity and inflation risk.'
      },
      {
        term: 'Net Present Value (NPV)',
        definition: 'The sum of all discounted future cash inflows minus the initial cash outlay. The gold standard capital budgeting metric: positive NPV projects increase firm equity value.'
      },
      {
        term: 'Internal Rate of Return (IRR)',
        definition: 'The annualized compound rate of return earned on invested capital. A project is acceptable if its IRR exceeds the company’s cost of capital (hurdle rate).'
      },
      {
        term: 'Benefit-Cost Ratio (BCR)',
        definition: 'The present value of all expected project benefits divided by the present value of all costs. A BCR above 1.0 means benefits outweigh costs in present terms.'
      },
      {
        term: 'Hurdle Rate / WACC',
        definition: 'The minimum rate of return a company must earn on an investment to satisfy its debt holders and equity investors (Weighted Average Cost of Capital).'
      }
    ],
    strengths: [
      'Prevents emotional and politically driven capital squandering by enforcing objective return thresholds',
      'Explicitly accounts for the time value of money and opportunity cost of corporate capital',
      'Allows standardized, apples-to-apples comparison between disparate capital proposals (e.g. ERP software vs new fleet)'
    ],
    limitations: [
      'Highly sensitive to the chosen discount rate—understating WACC can make unprofitable projects appear viable',
      'IRR can produce multiple rates of return or rank mutually exclusive projects incorrectly compared to NPV',
      'Struggles to capture intangible benefits (brand reputation, employee morale, strategic agility) unless quantified with rigor'
    ],
    workflowPlacement: {
      upstream: 'Takes input from strategic roadmaps, operational capacity diagnostics, and vendor price proposals',
      downstream: 'Feeds Annual Capital Allocation Budgets, Treasury financing plans, and Post-Implementation Project Audits'
    },
    useCases: [
      {
        title: 'Enterprise ERP Modernization',
        situation: 'Logistics conglomerate running legacy on-premise billing software with high maintenance and error rates.',
        problem: 'Cloud ERP vendor quotes $2.4M upfront implementation with $350k annual licensing.',
        action: 'Conducted 5-year CBA incorporating labor hours saved, billing error reductions, and WACC of 9%.',
        outcome: 'Project demonstrated an NPV of $1.15M, an IRR of 24.5%, and a discounted payback of 3.2 years, gaining board sign-off.'
      },
      {
        title: 'Cold Storage Warehouse Solar Array',
        situation: 'Refrigerated distribution center facing soaring commercial utility rates.',
        problem: 'Solar installation costs $850k upfront with federal tax credits and 25-year panel degradation.',
        action: 'Built multi-year discounted cash flow model comparing grid electricity inflation against solar generation curves.',
        outcome: 'NPV was $640k with an IRR of 17.2% and BCR of 1.75; investment shielded operating margins from energy shocks.'
      },
      {
        title: 'Hospitality Chain In-House Laundry vs Outsourcing',
        situation: 'A 14-hotel regional group evaluating whether to construct a centralized commercial laundry facility.',
        problem: 'Current third-party linen vendors charge $1.8M/year with intermittent delivery delays.',
        action: 'Modeled $4M central plant capex, water/energy utilities, and delivery logistics over a 10-year horizon at 10% discount.',
        outcome: 'NPV was negative (−$320k) due to transport driver wages and fleet maintenance; project rejected in favor of renegotiating 3P SLAs.'
      }
    ],
    caseStudy: {
      company: 'Vanguard Medical Devices',
      revenue: '$48 Million',
      staff: '210 Employees',
      profile: 'Surgical instrument and orthopedic implant manufacturer.',
      challenge: 'The machining division faced a 22% scrap rate on titanium knee implants due to aging 3-axis CNC equipment, resulting in $1.1M in wasted raw stock and delayed hospital fulfillment.',
      whyChosen: 'Capital Budgeting and CBA was mandated to evaluate whether to invest $3.2M into four high-precision 5-axis robotic machining centers versus refurbishing existing machinery for $700k.',
      steps: [
        'Established Vanguard’s corporate hurdle rate at 10.5% (WACC of 8.5% plus 2.0% manufacturing project risk premium).',
        'Forecasted incremental cash inflows over a 7-year useful life: $880k annual scrap reduction, $240k machine operator labor redeployment, and $450k new revenue from higher throughput.',
        'Accounted for cash outflows: $3.2M initial purchase, $180k technician training, and $65k annual preventive maintenance contracts.',
        'Calculated financial metrics: NPV was +$2,140,000; IRR reached 28.4%; BCR was 1.62; Discounted Payback occurred in 3.4 years.',
        'Compared against machine refurbishment option: Refurbishment showed low Capex ($700k) but only +$180k NPV and scrap rate remained at 14%.'
      ],
      results: [
        'Board unanimously approved the $3.2M 5-axis robotic cell purchase based on superior NPV.',
        'Post-commissioning scrap rate collapsed from 22% to 1.8%, beating initial projections.',
        'Net cash flow generation exceeded internal budget targets by $135k in year two.',
        'Audit verified the project achieved an actual realized IRR of 29.8% over the first 36 months.'
      ],
      lessonsLearned: [
        'Never pick the lowest-cost capital option simply because the upfront sticker price is lower; always evaluate total lifecycle NPV.',
        'Include training, installation downtime, and software integration costs in year-zero cash outflows to avoid capital surprises.',
        'Conduct formal post-completion audits at 12 and 24 months to hold operating managers accountable to their projected CBA benefits.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Detailed vendor proposals and fixed-bid construction/implementation estimates',
        'Historical operational cost baselines and engineering throughput estimates',
        'Verified corporate cost of capital (WACC) from finance or treasury'
      ],
      steps: [
        'Step 1: Define baseline scope (Do-Nothing status quo) and alternative project investment configurations.',
        'Step 2: Estimate all Year 0 capital outlays including equipment, shipping, installation, and disruption costs.',
        'Step 3: Build 5-to-10 year incremental cash flow projections (revenues gained, costs saved, working capital changes).',
        'Step 4: Discount annual net cash flows using the approved risk-adjusted discount rate.',
        'Step 5: Compute NPV, IRR, BCR, and payback periods; run sensitivity analysis on key assumptions before submission.'
      ],
      checklist: [
        'Are cash flows incremental (strictly cash that would not occur without the project)?',
        'Have sunk costs (past feasibility studies, historical R&D) been properly excluded?',
        'Are tax impacts, depreciation tax shields, and salvage recovery values included?',
        'Has working capital investment (spares, inventory buffer) been accounted for and recovered at project end?'
      ],
      commonMistakes: [
        {
          mistake: 'Including sunk costs (money already spent in the past) in the capital decision equation.',
          fix: 'Treat sunk costs as irrecoverable; base decisions solely on future incremental cash flows.'
        },
        {
          mistake: 'Using accounting net income instead of actual cash flow timing.',
          fix: 'Add back non-cash depreciation and deduct capital expenditures to model true cash movements.'
        }
      ],
      plan306090: {
        d30: 'Standardize capital expenditure proposal templates across all business units with mandatory NPV and IRR models.',
        d60: 'Establish project governance threshold (e.g. Capex > $100k requires dual-signoff with sensitivity analysis).',
        d90: 'Implement 12-month post-investment review cadence to track actual versus projected cash flow performance.'
      },
      proTips: [
        'When competing projects have different lifespans, use the Equivalent Annual Annuity (EAA) method to compare them fairly.',
        'Never approve a project based on simple payback alone; projects that look attractive with quick payback often have catastrophic negative NPV thereafter.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Real Options Analysis',
        reason: 'When high technological or market uncertainty makes phased, staged decision trees more realistic than fixed cash flows.'
      },
      {
        alternative: 'Regulatory Compliance Mandatory Checklist',
        reason: 'When an investment is legally required for safety or compliance (e.g. fire sprinklers, EPA scrubbers) regardless of financial return.'
      }
    ],
    reflectionPrompts: [
      'What critical assumption in our project model, if off by 20%, causes the project Net Present Value to turn negative?',
      'Are we rejecting long-term transformative investments because our hurdle rate is arbitrarily set too high for internal divisions?'
    ],
    quickReferenceCard: [
      'NPV = ∑ [CF_t ÷ (1 + r)^t] − Initial Investment (Accept if NPV > 0)',
      'IRR = Discount rate r where NPV = 0 (Accept if IRR > Hurdle Rate)',
      'BCR = PV of Cash Inflows ÷ PV of Cash Outflows (Accept if BCR > 1.0)',
      'Discount Factor = 1 ÷ (1 + r)^t',
      'Rule of Thumb: When NPV and IRR conflict in ranking, always follow NPV'
    ],
    quiz: [
      {
        id: 'q-cb-1',
        question: 'An executive is evaluating a $500,000 technology project that yields an NPV of +$85,000 at a 10% discount rate and an IRR of 16%. What is the correct decision?',
        options: [
          'Reject the project because the IRR is higher than the discount rate',
          'Accept the project because NPV > 0 and the IRR exceeds the 10% cost of capital',
          'Delay the project until payback is under 12 months',
          'Reject the project because NPV is less than 20% of initial outlay'
        ],
        correctAnswer: 1,
        explanation: 'In capital budgeting, projects with a positive Net Present Value (NPV > 0) create shareholder value and should be accepted whenever the IRR exceeds the required hurdle rate.'
      },
      {
        id: 'q-cb-2',
        question: 'Why is Net Present Value (NPV) considered superior to the Simple Payback Period method for capital allocation decisions?',
        options: [
          'Simple Payback requires complex calculus equations',
          'Simple Payback completely ignores the time value of money and all cash flows occurring after the payback cutoff',
          'NPV is only used for government infrastructure projects',
          'Payback period overvalues long-term projects'
        ],
        correctAnswer: 1,
        explanation: 'Simple Payback ignores the time value of money and treats dollars in Year 5 the same as Year 1; crucially, it ignores all lucrative cash flows earned after the arbitrary payback threshold is met.'
      },
      {
        id: 'q-cb-3',
        question: 'If a project has a Benefit-Cost Ratio (BCR) of 1.45, what does this indicate to the investment committee?',
        options: [
          'The project loses 45 cents on every dollar invested',
          'The present value of expected benefits is 45% greater than the present value of all costs',
          'The project requires 1.45 years to break even',
          'Operating expenses will increase by 45%'
        ],
        correctAnswer: 1,
        explanation: 'BCR = PV of Benefits ÷ PV of Costs. A BCR of 1.45 means the investment generates $1.45 in present value benefits for every $1.00 of discounted cost incurred.'
      },
      {
        id: 'q-cb-4',
        question: 'A company spent $150,000 last year on a market research study to evaluate launching a new product line. How should this $150,000 be treated in the upcoming project CBA?',
        options: [
          'Added to Year 0 cash outflows as an essential capital cost',
          'Excluded completely as a sunk cost that cannot be altered by future decisions',
          'Amortized over 5 years as an ongoing administrative operating cost',
          'Compounded at the WACC to increase the required hurdle rate'
        ],
        correctAnswer: 1,
        explanation: 'Sunk costs represent historical expenditures that cannot be recovered regardless of whether the project is approved or killed. Rational capital budgeting considers only incremental future cash flows.'
      },
      {
        id: 'q-cb-5',
        question: 'When two mutually exclusive projects have conflicting rankings (Project A has a higher IRR, but Project B has a higher dollar NPV), which project should leadership choose?',
        options: [
          'Project A because percentage return is always more important than dollar scale',
          'Project B because NPV directly measures the absolute dollar increase in shareholder wealth',
          'Neither project until both IRR and NPV produce identical ordinal rankings',
          'The project with the shortest simple payback period'
        ],
        correctAnswer: 1,
        explanation: 'The NPV criterion is the definitive decision rule because it measures total dollar wealth added to the company. IRR can favor small, high-percentage projects over large projects that create vastly more absolute value.'
      }
    ]
  },
  {
    id: 'budgeting',
    name: 'Budgeting & Variance Analysis (Zero-Based Budgeting)',
    shortName: 'Budgeting & Variance Analysis',
    category: 'Financial & Performance',
    tagline: 'Build disciplined operational budgets from zero and systematically isolate price, volume, and efficiency variances',
    origin: 'Pioneered by Peter Pyhrr at Texas Instruments in 1969 (popularized by Jimmy Carter); standard modern managerial control mechanism across corporate finance.',
    corePurpose: 'Eliminate historical spending entitlement through Zero-Based Budgeting (ZBB) and decompose operational deviations between actual results and flexed standards into actionable root causes.',
    primaryUsers: ['Financial Controllers', 'FP&A Directors', 'Department General Managers', 'Cost Center Owners', 'Executive Committees'],
    difficulty: 'Intermediate',
    horizon: 'Monthly reporting, Quarterly reviews, and Annual Budget Planning',
    scope: 'Cost Centers, Operating Departments, Business Divisions, or Entire Enterprise',
    timeToResult: 'Monthly variance close in 3–5 days; annual ZBB cycle in 4–6 weeks',
    dataNeeds: 'General ledger actuals, standard unit cost sheets, volume activity drivers, and budget baseline justifications',
    keyOutput: 'Zero-based decision packages, Flexible budget model, Price/Rate and Quantity/Efficiency variance decomposition',
    bestPairedWith: 'Break-Even Analysis, Activity-Based Costing, OKRs, Balanced Scorecard',
    keyFeatures: [
      'Replaces lazy incremental budgeting ("last year + 5%") with Zero-Based Budgeting (ZBB), forcing cost owners to justify every expense from ground zero',
      'Constructs Flexible Budgets that dynamically adjust allowed expenditures based on the actual output volume achieved',
      'Decomposes total budget variance into Sales Price Variance, Sales Volume Variance, and Cost Variances',
      'Isolates Material Price Variance ((Actual Price − Standard Price) × Actual Quantity) versus Material Quantity Variance ((Actual Quantity − Standard Quantity) × Standard Price)',
      'Isolates Labor Rate Variance versus Labor Efficiency Variance to prevent cross-functional finger-pointing',
      'Assigns clear managerial accountability: purchasing owns price variances; plant/service heads own efficiency variances'
    ],
    howItWorks: 'During planning, build budgets using ZBB decision packages ranked by strategic priority rather than historical spending inertia. During operational execution, compare monthly actuals against both the Static Master Budget and a Flexed Budget (recalculated using actual units sold/produced multiplied by budgeted standard rates). Isolate volume variance (the effect of missing sales targets) from operational spending efficiency variances (price paid vs waste incurred).',
    coreConcepts: [
      {
        term: 'Zero-Based Budgeting (ZBB)',
        definition: 'A budgeting method where every department budget starts at zero each cycle and every expense line item must be re-justified based on strategic necessity and ROI.'
      },
      {
        term: 'Static vs. Flexible Budget',
        definition: 'A static budget assumes one fixed activity volume; a flexible budget adjusts allowable revenues and variable costs to match the actual activity level realized.'
      },
      {
        term: 'Favorable (F) vs Unfavorable (U) Variance',
        definition: 'A variance is favorable if it increases operating profit (higher revenue or lower cost than standard) and unfavorable if it reduces profit.'
      },
      {
        term: 'Price / Rate Variance',
        definition: 'The difference between actual price paid per unit of input and the standard budgeted price, multiplied by actual quantity purchased.'
      },
      {
        term: 'Quantity / Efficiency Variance',
        definition: 'The difference between actual quantity of inputs used and standard inputs allowed for actual output, valued at the standard price.'
      }
    ],
    strengths: [
      'Roots out accumulated organizational "budget padding" and chronic bureaucratic bloat',
      'Pinpoints exact operational accountability, distinguishing external market pricing shifts from internal factory waste',
      'Enables rapid mid-year reforecasting when market demand swings unexpectedly'
    ],
    limitations: [
      'Full Zero-Based Budgeting is time and resource intensive, risking organizational fatigue if executed annually across all accounts',
      'Can incentivize short-term cost slashing that compromises long-term R&D, brand building, or employee retention',
      'Requires clean, timely cost-accounting ERP feeds to avoid delayed monthly post-mortems'
    ],
    workflowPlacement: {
      upstream: 'Takes input from Corporate Strategy, Sales Capacity Forecasts, and Supplier Procurement Contracts',
      downstream: 'Feeds Monthly Executive Management Reviews, Bonus Performance Scorecards, and Cash Flow Reforecasting'
    },
    useCases: [
      {
        title: 'Post-Merger SG&A Cost Rationalization',
        situation: 'Private equity firm acquires two competing beverage distributors with overlapping back-office functions.',
        problem: 'Combined SG&A stood at 28% of revenue, suffocating EBITDA margins.',
        action: 'Deployed Zero-Based Budgeting across travel, consulting, software subscriptions, and administrative overhead.',
        outcome: 'Uncovered $4.2M in redundant vendor licenses and duplicate travel spend; lowered SG&A to 19% within 9 months.'
      },
      {
        title: 'Manufacturing Direct Material Cost Spike',
        situation: 'Automotive stamping plant reports a $420k unfavorable variance in direct steel costs.',
        problem: 'Plant manager blamed the purchasing team for buying expensive steel; purchasing blamed the plant for running scrap.',
        action: 'Conducted standard two-way variance decomposition.',
        outcome: 'Showed Material Price Variance was $80k favorable (cheap steel purchased), but Material Efficiency Variance was $500k unfavorable (substandard steel jammed presses and generated 30% scrap); renegotiated spec.'
      },
      {
        title: 'Hospital Operating Room Staffing Control',
        situation: 'Regional hospital network experiencing persistent overtime budget overruns across surgical suites.',
        problem: 'Department heads claimed surgical cases were over budget; leadership suspected inefficient turnover scheduling.',
        action: 'Implemented monthly flexible budgeting based on actual surgical hours performed.',
        outcome: 'Proved volume had only risen 3% while labor hours per case had risen 19%; redesigned pre-op prep workflows.'
      }
    ],
    caseStudy: {
      company: 'OmniPack Global Packaging',
      revenue: '$86 Million',
      staff: '340 Employees',
      profile: 'Corrugated carton and sustainable packaging converter operating 4 manufacturing plants.',
      challenge: 'Annual EBITDA dropped by $2.8M despite beating revenue targets by 8%. Departmental heads consistently reported their budgets were "on track," obscuring where cash was leaking.',
      whyChosen: 'Zero-Based Budgeting and Flexible Variance Analysis was implemented to untangle volume effects from operational execution and dismantle historical budget padding.',
      steps: [
        'Scrapped traditional "prior year + 3%" budgeting and instituted ZBB across all non-direct operational categories (maintenance, consumables, freight, marketing).',
        'Built a dynamic Flexed Budget model that automatically scaled allowed material and machine labor hours to actual carton tonnage converted.',
        'Decomposed quarterly variance: revealed a $1.2M favorable sales volume variance had masked a $2.4M unfavorable direct material usage variance (excess trim scrap) and $1.6M in emergency freight.',
        'Discovered that Plant #2 was ordering unapproved specialty kraft paper at a $140/ton premium to meet rush orders caused by poor scheduling.',
        'Established weekly plant floor variance reviews where line superintendents reviewed scrap metrics on Friday afternoons.'
      ],
      results: [
        'ZBB eliminated $1.4M in non-essential contractor and administrative spend in year one.',
        'Direct material trim scrap fell from 9.2% to 4.1%, delivering $1.8M in annual savings.',
        'Monthly variance close was compressed from 18 days to 4 business days.',
        'Company EBITDA recovered by $3.6M, expanding operating margin from 6.8% to 11.2%.'
      ],
      lessonsLearned: [
        'A static budget is useless for performance appraisal when actual volume diverges from forecast; flexible budgeting is non-negotiable.',
        'Never allow favorable sales volume to mask worsening operational efficiency or unit cost creep.',
        'Accountability requires clear ownership: purchasing must own input purchase prices, while operations must own input usage quantities.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Standard cost sheets for all major products and bill of materials (BOM)',
        'Chart of accounts separating fixed overhead from volume-variable costs',
        'ERP or accounting software capable of capturing actual quantities and actual prices'
      ],
      steps: [
        'Step 1: Build Zero-Based decision packages for discretionary and fixed departmental expenses with clear justification.',
        'Step 2: Establish baseline standard prices for inputs and standard physical quantities allowed per unit of finished output.',
        'Step 3: At month-end close, generate the Flexed Budget by applying standard rates to actual volumes achieved.',
        'Step 4: Compute Sales Price, Sales Volume, Material Price/Usage, and Labor Rate/Efficiency variances.',
        'Step 5: Convene monthly variance review meetings with cost owners to agree on corrective action plans for variances exceeding 5%.'
      ],
      checklist: [
        'Are variances calculated against the flexed budget rather than the static budget?',
        'Is responsibility clearly divided between purchasing (price) and production (quantity)?',
        'Have one-off non-recurring events been separated from systemic operational trends?',
        'Are favorable variances audited with the same skepticism as unfavorable ones (e.g. buying cheap materials that wreck machinery)?'
      ],
      commonMistakes: [
        {
          mistake: 'Congratulating purchasing on a favorable material price variance when they bought substandard inputs that doubled factory scrap.',
          fix: 'Always evaluate material price variance jointly with material efficiency variance.'
        },
        {
          mistake: 'Comparing actual costs directly to a static master budget when actual volume was 25% higher or lower than planned.',
          fix: 'Always flex the budget to the actual volume before judging cost control performance.'
        }
      ],
      plan306090: {
        d30: 'Implement flexible budget template in FP&A models and run historical variance autopsy on the prior quarter.',
        d60: 'Conduct ZBB workshops for all departmental heads across indirect and discretionary spending categories.',
        d90: 'Establish monthly operational variance dashboards with root-cause attribution and automated red-flag alerts.'
      },
      proTips: [
        'Adopt the "management by exception" principle: focus executive scrutiny only on variances exceeding a predetermined dollar and percentage materiality threshold.',
        'In ZBB, categorize spending into "Keep-the-Lights-On" mandatory baseline versus "Growth/Discretionary" packages to facilitate surgical cost trimming.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Rolling Forecasts with Driver-Based Modeling',
        reason: 'In hyper-growth startups where business models evolve too rapidly for rigid annual zero-based budgeting cycles.'
      },
      {
        alternative: 'Lean Agile Budget Allocations',
        reason: 'For software product engineering squads where fixed capacity is funded and prioritization happens at the sprint backlog level.'
      }
    ],
    reflectionPrompts: [
      'If our company was wiped clean today and had to justify every single employee and software tool from scratch, what 20% of our current budget would we immediately cut?',
      'Are our department heads managing to the static budget number or proactively adapting their cost structure as market volume fluctuates?'
    ],
    quickReferenceCard: [
      'Material Price Variance = (Actual Price − Standard Price) × Actual Quantity Purchased',
      'Material Quantity Variance = (Actual Quantity Used − Standard Quantity Allowed) × Standard Price',
      'Labor Rate Variance = (Actual Hourly Rate − Standard Hourly Rate) × Actual Hours Worked',
      'Labor Efficiency Variance = (Actual Hours Worked − Standard Hours Allowed) × Standard Rate',
      'Sales Volume Variance = (Actual Units Sold − Budgeted Units) × Standard Contribution Margin'
    ],
    quiz: [
      {
        id: 'q-bg-1',
        question: 'What is the primary operational distinction between a Static Master Budget and a Flexible Budget?',
        options: [
          'A static budget is updated daily while a flexible budget is set once per decade',
          'A static budget is based solely on one planned activity volume, whereas a flexible budget recalculates allowable revenues and variable costs based on actual volume achieved',
          'A flexible budget only tracks capital expenditures while a static budget tracks operating expenses',
          'A static budget eliminates all fixed overhead expenses'
        ],
        correctAnswer: 1,
        explanation: 'A flexible budget adjusts the budgeted variable revenues and expenses to the actual volume of activity realized, enabling managers to isolate genuine operational cost efficiency from volume swings.'
      },
      {
        id: 'q-bg-2',
        question: 'A factory’s standard direct labor rate is $20/hour. To produce 1,000 units, the standard allows 500 hours. The factory actually used 600 hours at an average wage of $22/hour. What is the Direct Labor Efficiency Variance?',
        options: [
          '$1,200 Unfavorable',
          '$2,000 Unfavorable',
          '$2,200 Unfavorable',
          '$1,000 Favorable'
        ],
        correctAnswer: 1,
        explanation: 'Labor Efficiency Variance = (Actual Hours − Standard Hours Allowed) × Standard Rate = (600 − 500) × $20 = 100 hours × $20 = $2,000 Unfavorable (since more hours were used than standard).'
      },
      {
        id: 'q-bg-3',
        question: 'Under Zero-Based Budgeting (ZBB), how is an annual department budget created?',
        options: [
          'By taking the prior year’s actual expenditure and adding an inflation percentage',
          'By assuming all expenditures start at zero and requiring managers to justify every line item based on strategic value and operational necessity',
          'By capping all department budgets at zero profit',
          'By delegating budget approval to the purchasing department exclusively'
        ],
        correctAnswer: 1,
        explanation: 'ZBB rejects historical spending entitlement; every department begins with a baseline of zero and must justify every dollar of proposed expenditure based on strategic necessity and expected ROI.'
      },
      {
        id: 'q-bg-4',
        question: 'The purchasing department celebrates an $80,000 Favorable Material Price Variance by buying cheaper raw alloy. However, the plant experiences a $120,000 Unfavorable Material Quantity Variance due to high scrap. What is the net impact on business profit?',
        options: [
          'Profit increased by $80,000 because procurement achieved its bonus KPI',
          'Profit decreased by a net $40,000 because the scrap waste exceeded the purchase savings',
          'Profit was unaffected because the variances cancel out',
          'Profit increased by $200,000'
        ],
        correctAnswer: 1,
        explanation: 'Net Impact = +$80,000 (price savings) − $120,000 (scrap waste) = −$40,000. Purchasing cheap, low-grade materials resulted in a net $40,000 profit erosion for the business.'
      },
      {
        id: 'q-bg-5',
        question: 'Which managerial variance is directly attributable to the Sales and Commercial team rather than the plant production team?',
        options: [
          'Direct Material Quantity Variance',
          'Direct Labor Efficiency Variance',
          'Sales Volume Contribution Margin Variance',
          'Machine Maintenance Spending Variance'
        ],
        correctAnswer: 2,
        explanation: 'Sales Volume Variance measures the profit impact of selling more or fewer units than planned in the master budget, which is the direct responsibility of the commercial and sales leadership.'
      }
    ]
  },
  {
    id: 'workingcapital',
    name: 'Working Capital Management & Cash Conversion Cycle (CCC)',
    shortName: 'Working Capital & CCC',
    category: 'Financial & Performance',
    tagline: 'Optimize operational liquidity, accelerate cash flow, and shorten the Cash Conversion Cycle',
    origin: 'Developed through classical corporate treasury practice and formalized by Richard & Laughlin (1980); central focus of modern supply chain finance and corporate turnaround management.',
    corePurpose: 'Manage the balance between current assets and current liabilities to ensure liquidity survival while unlocking trapped cash from receivables, inventory, and payables.',
    primaryUsers: ['Treasurers & CFOs', 'Supply Chain Directors', 'Credit & Collections Managers', 'Turnaround Executives', 'Commercial Bankers'],
    difficulty: 'Intermediate',
    horizon: 'Daily liquidity monitoring, Monthly cash cycle reviews, Annual cash runway planning',
    scope: 'Enterprise-wide Operating Working Capital and Liquidity Governance',
    timeToResult: 'Initial CCC diagnostic in 1 day; cash unlocking initiatives in 30–90 days',
    dataNeeds: 'Balance sheet receivables, inventory, payables; income statement revenue and cost of goods sold (COGS)',
    keyOutput: 'Cash Conversion Cycle (days), Net Working Capital ($), Days Sales Outstanding (DSO), Days Inventory Outstanding (DIO), Days Payables Outstanding (DPO), Liquidity Ratios (Current & Quick)',
    bestPairedWith: 'Break-Even Analysis, Value Stream Mapping, Kanban / Just-In-Time, DuPont Analysis',
    keyFeatures: [
      'Calculates the Cash Conversion Cycle: CCC = DSO + DIO − DPO (the net elapsed days cash remains tied up in operations)',
      'Measures Days Sales Outstanding (DSO = (Accounts Receivable ÷ Revenue) × 365) to assess customer collection efficiency',
      'Measures Days Inventory Outstanding (DIO = (Inventory ÷ COGS) × 365) to gauge inventory turnover and obsolescence risk',
      'Measures Days Payables Outstanding (DPO = (Accounts Payable ÷ COGS) × 365) to monitor supplier payment terms and trade credit leverage',
      'Evaluates Net Working Capital (Current Assets − Current Liabilities) and Operating Working Capital',
      'Calculates Current Ratio and Quick (Acid-Test) Ratio to test short-term solvency under creditor stress',
      'Simulates cash unlocked ($) into treasury from targeted 5-to-15 day improvements in DSO, DIO, and DPO'
    ],
    howItWorks: 'Map the complete timeline from when cash leaves the company to pay suppliers for raw materials or labor, through the duration inventory sits in warehouses, until customer invoices are finally collected as cash. Benchmark DSO, DIO, and DPO against industry peers. A shorter or even negative CCC (like Amazon or Apple) means the business is funded by supplier capital rather than costly bank debt or equity dilution.',
    coreConcepts: [
      {
        term: 'Cash Conversion Cycle (CCC)',
        definition: 'The net number of days it takes for a company to convert its investments in inventory and operational resources into actual cash inflows from customer sales (DSO + DIO − DPO).'
      },
      {
        term: 'Days Sales Outstanding (DSO)',
        definition: 'The average number of days it takes to collect cash payment from credit customers after a sale is completed.'
      },
      {
        term: 'Days Inventory Outstanding (DIO)',
        definition: 'The average number of days inventory sits on shelves or in production before being sold to a customer.'
      },
      {
        term: 'Days Payables Outstanding (DPO)',
        definition: 'The average number of days a company takes to pay its trade suppliers and vendors for raw materials and services.'
      },
      {
        term: 'Negative Working Capital',
        definition: 'When DPO exceeds DSO + DIO, customers pay before suppliers must be paid; operations generate instant free cash float that finances company growth.'
      }
    ],
    strengths: [
      'Unlocks millions of dollars in free cash flow without taking on debt, selling equity, or cutting headcount',
      'Provides early warning of impending insolvency—many profitable companies go bankrupt purely from cash timing crises',
      'Directly links commercial sales terms, supply chain inventory, and procurement policies to balance sheet health'
    ],
    limitations: [
      'Stretching DPO too aggressively can destroy supplier goodwill, forfeit early-payment discounts, and risk supply cutoffs',
      'Slashing DIO excessively risks stockouts, lost sales, and customer churn if demand spikes unexpectedly',
      'Overly aggressive credit tightening on DSO may drive customers to competitors with more generous payment terms'
    ],
    workflowPlacement: {
      upstream: 'Takes input from sales contract terms, supply chain lead times, and procurement vendor negotiations',
      downstream: 'Feeds Treasury cash forecasting, line-of-credit interest management, and capital allocation budgets'
    },
    useCases: [
      {
        title: 'Rapid-Growth E-Commerce Cash Crunch',
        situation: 'D2C apparel brand growing 70% year-over-year suddenly cannot pay supplier invoices despite strong book profits.',
        problem: 'Inventory pre-orders tied up cash for 110 days (DIO = 110) while credit cards took 3 days (DSO = 3) and suppliers gave 30 days (DPO = 30), creating an 83-day cash deficit.',
        action: 'Negotiated 60-day terms with tier-1 apparel factories and adopted JIT batch replenishment.',
        outcome: 'Reduced DIO to 65 days and expanded DPO to 60 days; shortened CCC from 83 days to 8 days, unlocking $1.8M in liquid cash.'
      },
      {
        title: 'B2B Wholesale Distributor Overdue Collections',
        situation: 'Industrial distributor with $40M revenue facing high interest on its revolving credit line.',
        problem: 'Average DSO had drifted out to 74 days because sales reps offered loose informal terms to close deals.',
        action: 'Implemented automated dunning, customer credit scoring, and a 2/10 net 30 prompt-payment discount.',
        outcome: 'DSO dropped from 74 days to 46 days, accelerating $3.07M in collections and saving $215k in annual interest expense.'
      },
      {
        title: 'Contract Manufacturer Lean Inventory Overhaul',
        situation: 'Electronics EMS provider sitting on $8.5M of raw surface-mount components.',
        problem: 'Obsolete parts write-offs were eating 3.5% of annual operating margins.',
        action: 'Audited inventory turnover by SKU; partnered with key IC distributors for consignment vendor-managed inventory (VMI).',
        outcome: 'Shifted $3.2M of component inventory onto supplier balance sheets; boosted current ratio from 1.1 to 1.6.'
      }
    ],
    caseStudy: {
      company: 'Solis Logistics & Distribution',
      revenue: '$62 Million',
      staff: '185 Employees',
      profile: 'Third-party temperature-controlled logistics, freight forwarding, and warehousing provider.',
      challenge: 'During a rapid expansion into three new regional hubs, revenue surged 35%, but the company maxed out its $6M bank credit line. Checks began bouncing because operating cash was choked in working capital.',
      whyChosen: 'Working Capital Management and Cash Conversion Cycle analysis was engaged as an emergency treasury intervention to stop an impending liquidity default.',
      steps: [
        'Calculated initial baseline working capital metrics: DSO was 68 days ($11.5M in unpaid freight invoices), DIO was 28 days (warehouse packaging and diesel reserves), and DPO was 32 days ($4.2M payables).',
        'Calculated Cash Conversion Cycle: CCC = 68 + 28 − 32 = 64 days. For every dollar of new growth, 64 cents of cash was frozen.',
        'Created a dedicated Collections Strike Team that contacted the top 50 delinquent enterprise accounts, offering a 1.5% discount for 7-day wire settlements.',
        'Renegotiated Master Service Agreements with national diesel and fleet maintenance providers to standardize on net-60 terms.',
        'Swapped packaging supplies to local just-in-time delivery, reducing warehouse holding from 28 days to 12 days.'
      ],
      results: [
        'DSO compressed from 68 days to 41 days (a 27-day acceleration).',
        'DPO extended responsibly from 32 days to 54 days (a 22-day extension).',
        'DIO reduced from 28 days to 12 days (a 16-day inventory velocity gain).',
        'Cash Conversion Cycle collapsed from 64 days down to −1 day (a 65-day net swing!).',
        'Freed up $5.4M in hard liquid cash, entirely paying off the $6M bank revolver without selling equity.'
      ],
      lessonsLearned: [
        'Growth absorbs cash: without disciplined working capital controls, rapid revenue expansion will bankrupt a profitable company.',
        'Sales commissions must be tied to cash collected rather than invoices issued to ensure sales teams enforce credit terms.',
        'Working capital management is not merely an accounting exercise; it is an executive operational weapon that directly impacts enterprise survival.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Accurate aged accounts receivable (A/R) schedule with aging buckets (Current, 30, 60, 90+ days)',
        'Aged accounts payable (A/P) report with supplier credit terms and discount structures',
        'Inventory valuation report categorizing raw materials, WIP, finished goods, and slow-moving items'
      ],
      steps: [
        'Step 1: Compute historical DSO, DIO, and DPO for the past 12 months to establish the baseline Cash Conversion Cycle.',
        'Step 2: Benchmark each metric against direct industry competitors and quartiles.',
        'Step 3: Conduct an A/R audit to identify root causes of payment delays (disputed invoices, missing POs, loose sales terms).',
        'Step 4: Rationalize slow-moving inventory and explore vendor-managed inventory (VMI) or consignment arrangements.',
        'Step 5: Consolidate purchasing volume with top suppliers to negotiate extended 45-to-60 day terms without price surcharges.'
      ],
      checklist: [
        'Are credit limits systematically enforced before dispatching new shipments to past-due accounts?',
        'Do invoices go out immediately upon delivery or are they delayed by billing processing lag?',
        'Are early payment supplier discounts (e.g. 2/10 net 30) evaluated against corporate cost of capital?',
        'Is slow-moving or obsolete inventory (SLOB) reviewed and written down quarterly?'
      ],
      commonMistakes: [
        {
          mistake: 'Delaying supplier payments arbitrarily without communication, prompting credit holds and shipping stops.',
          fix: 'Formally negotiate extended terms during annual contract reviews in exchange for higher volume commitment.'
        },
        {
          mistake: 'Failing to invoice promptly; billing 10 days after service delivery artificially inflates DSO.',
          fix: 'Automate electronic invoicing triggered immediately upon proof of delivery or milestone sign-off.'
        }
      ],
      plan306090: {
        d30: 'Calculate baseline CCC, identify top 20 overdue receivables, and establish daily cash positioning discipline.',
        d60: 'Tighten customer credit policies, automate invoice reminders, and initiate supplier payment term renegotiations.',
        d90: 'Implement lean inventory buffers, tie commercial incentives to cash collections, and report CCC at every board meeting.'
      },
      proTips: [
        'Calculate cash unlocked with this formula: (Annual Revenue ÷ 365) × Days DSO Reduced = Cash Added to Bank Balance.',
        'Aim to achieve negative working capital in consumer or subscription businesses—letting customers finance your inventory creates an unmatched competitive moat.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Pure Cash Flow Forecasting & Treasury Sweep Management',
        reason: 'In distressed pre-bankruptcy insolvency scenarios where daily cash survival overrides 90-day working capital cycle metrics.'
      },
      {
        alternative: 'Customer Success / Retention Optimization',
        reason: 'When aggressive collection tactics would destroy fragile high-LTV enterprise relationships during sensitive renewals.'
      }
    ],
    reflectionPrompts: [
      'How many dollars of interest is our company paying on revolving credit facilities just to finance overdue customer invoices?',
      'If our key suppliers demanded payment in 15 days instead of 60 days, would our business survive the immediate liquidity shock?'
    ],
    quickReferenceCard: [
      'Cash Conversion Cycle (CCC) = DSO + DIO − DPO',
      'Days Sales Outstanding (DSO) = (Accounts Receivable ÷ Annual Revenue) × 365',
      'Days Inventory Outstanding (DIO) = (Inventory ÷ Annual COGS) × 365',
      'Days Payables Outstanding (DPO) = (Accounts Payable ÷ Annual COGS) × 365',
      'Net Working Capital = Current Assets − Current Liabilities',
      'Quick Ratio = (Cash + Marketable Securities + A/R) ÷ Current Liabilities'
    ],
    quiz: [
      {
        id: 'q-wc-1',
        question: 'A company has a DSO of 50 days, a DIO of 40 days, and a DPO of 35 days. What is its Cash Conversion Cycle (CCC)?',
        options: ['125 days', '55 days', '45 days', '25 days'],
        correctAnswer: 1,
        explanation: 'Cash Conversion Cycle = DSO + DIO − DPO = 50 + 40 − 35 = 55 days. Cash is tied up in the operational pipeline for 55 days.'
      },
      {
        id: 'q-wc-2',
        question: 'What does a negative Cash Conversion Cycle indicate about a firm’s business model (such as Amazon or Dell)?',
        options: [
          'The company is on the brink of bankruptcy due to negative assets',
          'The company collects cash from customers before it has to pay its suppliers, effectively funding its operations and growth using supplier capital',
          'The company has zero accounts receivable and zero inventory',
          'The company is violating GAAP accounting standards'
        ],
        correctAnswer: 1,
        explanation: 'A negative CCC means DPO is longer than DSO + DIO; customers pay for goods before the company pays suppliers, generating free operational cash float.'
      },
      {
        id: 'q-wc-3',
        question: 'If a company generating $73 Million in annual revenue successfully accelerates collections and reduces its DSO by 10 days, how much liquid cash is released into its bank account?',
        options: ['$200,000', '$730,000', '$2,000,000', '$7,300,000'],
        correctAnswer: 2,
        explanation: 'Daily Revenue = $73,000,000 ÷ 365 days = $200,000/day. A 10-day reduction in DSO permanently unlocks: 10 days × $200,000/day = $2,000,000 in free liquid cash.'
      },
      {
        id: 'q-wc-4',
        question: 'Why is the Quick Ratio (Acid-Test) considered a more conservative gauge of short-term liquidity than the standard Current Ratio?',
        options: [
          'It ignores long-term debt liabilities',
          'It excludes inventory and prepaid expenses from current assets because inventory cannot be liquidated instantly at book value during a crisis',
          'It only measures cash held in foreign currencies',
          'It includes projected future sales revenue'
        ],
        correctAnswer: 1,
        explanation: 'The Quick Ratio = (Cash + Short-term Investments + A/R) ÷ Current Liabilities. It strips out inventory because selling off inventory during a sudden liquidity crisis takes time and often requires steep fire-sale markdowns.'
      },
      {
        id: 'q-wc-5',
        question: 'What is the danger of attempting to shorten the Cash Conversion Cycle by unilaterally extending Days Payables Outstanding (DPO) to 120 days?',
        options: [
          'Customers will stop purchasing products immediately',
          'Suppliers may put deliveries on credit hold, inflate future pricing to offset financing costs, or terminate supply contracts during shortages',
          'Direct labor overtime will surge',
          'Depreciation expense will accelerate on the balance sheet'
        ],
        correctAnswer: 1,
        explanation: 'Abusing trade credit damages supplier trust. Vendors respond by prioritizing other customers, charging higher unit prices to cover working capital carrying costs, or refusing to ship critical components.'
      }
    ]
  },
  {
    id: 'dupont',
    name: 'DuPont Analysis (3-Stage & 5-Stage ROE Model)',
    shortName: 'DuPont Analysis',
    category: 'Financial & Performance',
    tagline: 'Deconstruct Return on Equity into operating efficiency, asset productivity, and financial leverage',
    origin: 'Invented by DuPont Corporation chemical engineer and financial executive Donaldson Brown in 1914; widely adopted across Wall Street and corporate boards as the preeminent framework for decomposing shareholder value creation.',
    corePurpose: 'Break down aggregate Return on Equity (ROE) into distinct operational, productivity, and financing drivers to uncover the true source of corporate returns and detect disguised financial engineering.',
    primaryUsers: ['Chief Executive Officers', 'Equity Research Analysts', 'Board Audit Committees', 'Strategic Planners', 'M&A Valuation Specialists'],
    difficulty: 'Advanced',
    horizon: 'Quarterly financial reviews, Multi-year benchmarking, M&A due diligence',
    scope: 'Whole Enterprise, Corporate Subsidiaries, Public Competitor Peer Groups',
    timeToResult: '2–4 hours from standardized audited financial statements',
    dataNeeds: 'Income statement (Revenues, EBIT, EBT, Net Income, Interest, Taxes) and Balance Sheet (Total Assets, Shareholders’ Equity)',
    keyOutput: '3-stage decomposition (Net Profit Margin × Asset Turnover × Equity Multiplier), 5-stage decomposition (Tax Burden × Interest Burden × Operating Margin × Asset Turnover × Leverage)',
    bestPairedWith: 'Balanced Scorecard, Break-Even Analysis, Working Capital Management, VRIO Framework',
    keyFeatures: [
      'Deconstructs Return on Equity (ROE = Net Income ÷ Equity) into three foundational pillars of management performance',
      'Pillar 1: Net Profit Margin (Net Income ÷ Sales) — reflects operating efficiency and pricing power',
      'Pillar 2: Total Asset Turnover (Sales ÷ Total Assets) — reflects asset utilization and operational productivity',
      'Pillar 3: Equity Multiplier (Total Assets ÷ Shareholders’ Equity) — reflects financial leverage and debt utilization',
      'Expands into 5-Stage Model: isolating Tax Burden (Net Income ÷ EBT), Interest Burden (EBT ÷ EBIT), and Operating EBIT Margin (EBIT ÷ Sales)',
      'Reveals whether high ROE is earned through high operational excellence versus reckless balance sheet debt',
      'Enables cross-industry benchmarking across distinct business models (e.g. high-margin tech vs high-velocity retail)'
    ],
    howItWorks: 'Extract the five key line items from the annual 10-K or internal P&L and Balance Sheet. Calculate Net Margin, Asset Turnover, and Equity Multiplier. Multiply the three components: their product equals ROE exactly. If ROE is increasing, diagnose which factor drove the gain. If ROE is driven by higher debt (Equity Multiplier) while margins and turnover decline, the business is artificially inflating returns while escalating bankruptcy risk.',
    coreConcepts: [
      {
        term: 'Return on Equity (ROE)',
        definition: 'The net return generated on every dollar of shareholder equity capital invested in the business (Net Income ÷ Shareholders’ Equity).'
      },
      {
        term: 'Operating Efficiency (Net Margin)',
        definition: 'How much profit the company wrings out of each dollar of revenue after paying all operational, interest, and tax expenses.'
      },
      {
        term: 'Asset Productivity (Asset Turnover)',
        definition: 'How many dollars of sales revenue the company generates for each dollar of physical and intangible assets deployed on the balance sheet.'
      },
      {
        term: 'Financial Leverage (Equity Multiplier)',
        definition: 'Total Assets divided by Shareholders’ Equity. Measures the extent to which a firm uses debt financing rather than equity to acquire assets.'
      },
      {
        term: 'Interest & Tax Burden (5-Stage)',
        definition: 'The proportion of operating profits retained after paying interest on bank debt (Interest Burden) and corporate income taxes (Tax Burden).'
      }
    ],
    strengths: [
      'Strips away superficial financial illusions to expose what management is actually executing well',
      'Directly links frontline operational initiatives (pricing, inventory velocity) to top-level Wall Street shareholder metrics',
      'Provides a balanced scorecard uniting commercial marketing, manufacturing operations, and corporate treasury'
    ],
    limitations: [
      'Subject to accounting distortions from share buybacks, which depress equity and artificially inflate ROE',
      'Does not capture off-balance-sheet operating liabilities or intangible brand assets not recognized under GAAP',
      'Static historical lens that reflects past results rather than forward-looking strategic pipeline value'
    ],
    workflowPlacement: {
      upstream: 'Takes input from audited financial statements, tax strategy, and debt capital structure policies',
      downstream: 'Feeds Executive Long-Term Incentive Plans (LTIP), Investor Relations presentations, and Strategic Divestiture reviews'
    },
    useCases: [
      {
        title: 'Competitor Peer Group Benchmarking',
        situation: 'Industrial pump manufacturer with 16% ROE benchmarked against rival boasting 22% ROE.',
        problem: 'Board questioned why management was underperforming the competitor by 600 basis points.',
        action: 'Applied 3-stage DuPont decomposition across both competitors.',
        outcome: 'Showed the client had higher net margins (11% vs 7%) and higher asset turnover (1.2x vs 0.9x), but the rival had an Equity Multiplier of 3.5x vs 1.2x (carrying 4x more debt); board recognized the client’s superior operational health.'
      },
      {
        title: 'Retail Chain Asset Turn Turnaround',
        situation: 'Department store chain experiencing stagnant 8% ROE despite stable 5% net margins.',
        problem: 'New equity cannot be attracted without boosting ROE past 14%.',
        action: 'Analyzed asset turnover; discovered massive owned real estate and bloated central distribution inventory.',
        outcome: 'Executed sale-and-leaseback on flagship stores and shifted to JIT replenishment; Asset Turnover rose from 0.8x to 1.5x, propelling ROE to 15.2%.'
      },
      {
        title: 'M&A Target Quality-of-Earnings Audit',
        situation: 'Private equity sponsor evaluating an acquisition target reporting a stellar 28% ROE.',
        problem: 'Due diligence needed to verify whether returns were sustainable post-acquisition.',
        action: 'Decomposed ROE over a 5-year trend line using the 5-stage DuPont model.',
        outcome: 'Revealed operating margin had shrunk from 14% to 8%, but ROE had been propped up by taking on $45M in mezzanine debt; deal price was renegotiated down by $12M.'
      }
    ],
    caseStudy: {
      company: 'Zenith Advanced Precision Parts',
      revenue: '$110 Million',
      staff: '420 Employees',
      profile: 'Aerospace and defense precision fastener and valve component supplier.',
      challenge: 'Zenith’s ROE slipped from 21.4% to 12.8% over three years. The executive committee debated whether the problem was price competition, unutilized factory machinery, or capital structure.',
      whyChosen: 'DuPont Analysis was selected to conduct a forensic diagnostic across P&L and Balance Sheet drivers to isolate the exact cause of shareholder return erosion.',
      steps: [
        'Deconstructed Year 1 financial statements: Net Profit Margin was 8.2%, Asset Turnover was 1.30x, Equity Multiplier was 2.0x (ROE = 8.2% × 1.30 × 2.0 = 21.32%).',
        'Deconstructed Year 3 financial statements: Net Profit Margin had dropped to 7.1%, Asset Turnover collapsed to 0.90x, and Equity Multiplier was 2.0x (ROE = 7.1% × 0.90 × 2.0 = 12.78%).',
        'Isolated the primary culprit: Asset Turnover had plunged by 31%, while Net Profit Margin had only dropped 13%.',
        'Drilled down into assets: Discovered that two years prior, Zenith had spent $28M constructing an advanced titanium forge that was operating at only 34% capacity utilization.',
        'Action plan formulated: Divested non-core aluminum extrusions, leased excess forge capacity to medical device clients, and rationalized $6M in obsolete raw inventory.'
      ],
      results: [
        'Asset base was streamlined by $14M while revenues grew from tolling agreements.',
        'Asset Turnover rebounded from 0.90x to 1.25x over the subsequent 18 months.',
        'Net Profit Margin strengthened to 8.8% through higher absorption of forge fixed overhead.',
        'ROE climbed back to 22.0% (8.8% × 1.25 × 2.0) with zero additional debt leverage.'
      ],
      lessonsLearned: [
        'Never look at ROE in isolation; aggregate ratios conceal severe underlying operational or balance-sheet decay.',
        'Underutilized capital assets act as a heavy anchor on shareholder value by depressing Asset Turnover.',
        'DuPont creates cross-departmental accountability: sales owns margins, operations owns asset velocity, and treasury owns capital structure.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Audited balance sheets and income statements for at least 3 consecutive operating years',
        'Detailed breakdown of operating assets (fixed plant vs working capital vs intangibles)',
        'Competitor peer group financials (from SEC EDGAR or proprietary industry benchmarks)'
      ],
      steps: [
        'Step 1: Compute baseline Return on Equity (Net Income ÷ Average Shareholders’ Equity).',
        'Step 2: Calculate the 3 components: Net Profit Margin (NI ÷ Sales), Asset Turnover (Sales ÷ Assets), and Equity Multiplier (Assets ÷ Equity).',
        'Step 3: Verify the mathematical identity: Net Margin × Asset Turnover × Equity Multiplier = ROE.',
        'Step 4: Expand into the 5-Stage model to isolate Tax Burden, Interest Burden, and Operating EBIT Margin.',
        'Step 5: Perform cross-sectional competitor benchmarking and longitudinal 5-year trend analysis to pinpoint strategic levers.'
      ],
      checklist: [
        'Is average balance sheet equity used rather than year-end equity if significant equity was raised or repurchased?',
        'Have non-recurring discontinued operations and one-off asset write-downs been normalized?',
        'Is the Equity Multiplier benchmarked against credit rating covenants to avoid insolvency risk?',
        'Has the asset turnover trend been checked against warehouse and factory capacity utilization logs?'
      ],
      commonMistakes: [
        {
          mistake: 'Assuming a company with higher ROE is automatically better managed than a rival with lower ROE.',
          fix: 'Always check the Equity Multiplier; a weak company loaded with dangerous debt can easily produce a high ROE before collapsing.'
        },
        {
          mistake: 'Ignoring the impact of massive stock buybacks that reduce book equity near zero or negative.',
          fix: 'Use Return on Invested Capital (ROIC) alongside DuPont ROE when equity balances are distorted.'
        }
      ],
      plan306090: {
        d30: 'Build DuPont 3-stage and 5-stage models for the company and top 4 industry competitors over the past 3 years.',
        d60: 'Present DuPont findings to executive team, identifying whether current strategic priorities should target margin or asset turn.',
        d90: 'Incorporate DuPont component targets into executive annual KPI scorecards and capital allocation hurdles.'
      },
      proTips: [
        'Companies competing on cost leadership (like Walmart or Costco) win via high Asset Turnover; companies competing on differentiation (like Ferrari or Apple) win via high Net Profit Margins.',
        'If Interest Burden (EBT ÷ EBIT) drops below 0.70, debt service is consuming over 30% of operating profit—trigger debt paydown.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Return on Invested Capital (ROIC) / Economic Value Added (EVA)',
        reason: 'When analyzing capital-intensive businesses where capital structure (debt vs equity choice) needs to be completely neutralized.'
      },
      {
        alternative: 'Customer Lifetime Value (LTV) / CAC Unit Economics',
        reason: 'For early-stage tech startups with negative net income where accounting book equity and profits are not yet meaningful.'
      }
    ],
    reflectionPrompts: [
      'Is our company’s ROE driven by superior operational product margins, rapid asset utilization, or simply aggressive balance-sheet debt?',
      'If interest rates rise by 200 basis points on our floating debt, how severely will our Interest Burden degrade our final ROE?'
    ],
    quickReferenceCard: [
      '3-Stage ROE = Net Profit Margin × Asset Turnover × Equity Multiplier',
      'Net Profit Margin = Net Income ÷ Sales',
      'Asset Turnover = Sales ÷ Total Assets',
      'Equity Multiplier = Total Assets ÷ Shareholders’ Equity',
      '5-Stage ROE = (Net Income ÷ EBT) × (EBT ÷ EBIT) × (EBIT ÷ Sales) × (Sales ÷ Assets) × (Assets ÷ Equity)',
      'Identity Check: Always ensure components multiply exactly to ROE'
    ],
    quiz: [
      {
        id: 'q-dp-1',
        question: 'Under the 3-stage DuPont model, what are the three mathematical components that multiply together to equal Return on Equity (ROE)?',
        options: [
          'Gross Margin × EBITDA × Debt Ratio',
          'Net Profit Margin × Asset Turnover × Equity Multiplier',
          'Price-to-Earnings × Dividend Yield × Payout Ratio',
          'Operating Cash Flow × Working Capital × Discount Rate'
        ],
        correctAnswer: 1,
        explanation: 'DuPont 3-Stage: ROE = (Net Income ÷ Sales) × (Sales ÷ Total Assets) × (Total Assets ÷ Equity) = Net Profit Margin × Asset Turnover × Equity Multiplier.'
      },
      {
        id: 'q-dp-2',
        question: 'Company Alpha and Company Beta both achieve an 18% ROE. Alpha has a Net Margin of 12%, Asset Turnover of 1.0x, and Equity Multiplier of 1.5x. Beta has a Net Margin of 3%, Asset Turnover of 1.2x, and Equity Multiplier of 5.0x. Which company is in a safer operational position?',
        options: [
          'Company Beta because it has higher asset turnover',
          'Company Alpha because its returns stem from robust product margins and conservative leverage, whereas Beta relies on dangerous debt leverage',
          'Both companies are identical in risk profile because their ROE is 18%',
          'Company Beta because high debt provides a tax shield that eliminates all business risk'
        ],
        correctAnswer: 1,
        explanation: 'Company Alpha has strong operational pricing power (12% margin) and low financial leverage (1.5x). Company Beta generates razor-thin margins (3%) and uses extreme debt (5.0x multiplier) to artificially manufacture an 18% ROE, making it highly vulnerable to rate hikes or downturns.'
      },
      {
        id: 'q-dp-3',
        question: 'If a company has $100 Million in total assets and $40 Million in shareholders’ equity, what is its Equity Multiplier?',
        options: ['0.40x', '1.40x', '2.50x', '4.00x'],
        correctAnswer: 2,
        explanation: 'Equity Multiplier = Total Assets ÷ Shareholders’ Equity = $100M ÷ $40M = 2.50x.'
      },
      {
        id: 'q-dp-4',
        question: 'In the 5-stage DuPont framework, what does the ratio (EBT ÷ EBIT) measure?',
        options: [
          'The Tax Burden',
          'The Operating Margin',
          'The Interest Burden (the percentage of operating profits remaining after paying interest expenses)',
          'The Asset Turnover ratio'
        ],
        correctAnswer: 2,
        explanation: 'The ratio of Earnings Before Taxes (EBT) to Earnings Before Interest & Taxes (EBIT) is the Interest Burden. If a firm has no debt interest, this ratio equals 1.0; heavy debt burdens push this ratio down toward zero.'
      },
      {
        id: 'q-dp-5',
        question: 'A retail discounter wants to increase its ROE without raising prices or taking on more debt. According to DuPont Analysis, which strategic lever must it pull?',
        options: [
          'Increase Days Sales Outstanding to extend credit',
          'Accelerate Asset Turnover by improving inventory turns and divesting idle real estate',
          'Increase executive administrative salaries',
          'Decrease sales volume while keeping inventory levels constant'
        ],
        correctAnswer: 1,
        explanation: 'If pricing (Net Margin) cannot be increased and leverage (Equity Multiplier) cannot be expanded, the only way to boost ROE is to improve Asset Turnover (Sales ÷ Assets) through faster inventory velocity and leaner asset deployment.'
      }
    ]
  },
  {
    id: 'abc',
    name: 'Activity-Based Costing (ABC) & Margin Analysis',
    shortName: 'Activity-Based Costing',
    category: 'Financial & Performance',
    tagline: 'Assign overhead costs based on actual activity consumption to expose hidden product cross-subsidies',
    origin: 'Pioneered by Harvard Business School professors Robin Cooper and Robert S. Kaplan in the late 1980s; revolutionised managerial accounting across modern manufacturing and service enterprises.',
    corePurpose: 'Eliminate the distortions of traditional volume-based overhead allocation by tracing indirect costs directly to the specific business activities and products that consume them.',
    primaryUsers: ['Chief Financial Officers', 'Cost Accountants', 'Product Line Managers', 'Commercial Pricing Committees', 'Operations Directors'],
    difficulty: 'Advanced',
    horizon: 'Strategic product portfolio reviews, Annual pricing overhauls, Customer profitability audits',
    scope: 'Multi-Product, Multi-Channel, and Multi-Service Business Portfolios',
    timeToResult: '3–6 weeks for activity dictionary, cost pool mapping, and first profitability run',
    dataNeeds: 'General ledger indirect costs, activity dictionaries, resource driver data (labor hours, machine hours), and activity driver counts (setups, orders, inspections)',
    keyOutput: 'Activity cost pools & driver rates, true fully loaded product unit costs, customer profitability rankings, cross-subsidization matrix',
    bestPairedWith: 'Break-Even Analysis, Value Stream Mapping, 80/20 Pareto Analysis, Balanced Scorecard',
    keyFeatures: [
      'Two-stage cost assignment: Stage 1 assigns overhead costs to distinct Activity Pools; Stage 2 assigns pool costs to Cost Objects (products/customers) via Activity Drivers',
      'Exposes the "Cross-Subsidization Trap": high-volume, simple standard products secretly subsidize low-volume, complex custom products',
      'Identifies four hierarchical activity levels: Unit-level, Batch-level, Product-sustaining, and Facility-sustaining',
      'Calculates Activity Driver Rates (Total Pool Cost ÷ Total Driver Volume, e.g. $450 per machine setup or $75 per customer invoice)',
      'Provides actionable customer profitability analysis (Cost-to-Serve modeling)',
      'Enables surgical commercial repricing, minimum order quantity (MOQ) enforcement, and product simplification'
    ],
    howItWorks: 'Identify key operational activities (e.g., machine setups, quality inspections, order handling, customer support). Group indirect overhead into homogenous Cost Pools. Identify the cost driver that causes costs in each pool (e.g., number of setups, inspection hours). Calculate the activity rate per driver. Trace costs to individual products based on their actual consumption of activities. Compare true ABC cost against traditional direct-labor absorption cost to uncover mispriced products.',
    coreConcepts: [
      {
        term: 'Cost Pool',
        definition: 'A distinct grouping of individual overhead cost line items that are driven by the same underlying operational activity (e.g., Machine Setup Pool, Quality Testing Pool).'
      },
      {
        term: 'Cost Driver',
        definition: 'A measurable factor or causal event that directly influences the volume of work and cost incurred in an activity (e.g., number of production runs, number of customer returns).'
      },
      {
        term: 'Cross-Subsidization',
        definition: 'A pervasive accounting distortion where high-volume standard products are over-costed and appear less profitable, while low-volume custom products consume massive overhead but appear falsely lucrative.'
      },
      {
        term: 'Batch-Level Activity',
        definition: 'An activity performed each time a batch of goods is handled or processed, regardless of how many units are in the batch (e.g. setting up a printing press, moving a pallet).'
      },
      {
        term: 'Cost-to-Serve',
        definition: 'The total indirect cost required to service a specific customer account, including order frequency, expedited shipping, custom packaging, and customer service inquiries.'
      }
    ],
    strengths: [
      'Unmasks the true profitability of individual products, services, and customer accounts',
      'Prevents disastrous strategic errors, such as killing high-volume "cash cow" products that were falsely branded unprofitable by outdated accounting systems',
      'Provides actionable engineering data for process improvement by quantifying the exact dollar cost of operational complexity'
    ],
    limitations: [
      'High implementation and maintenance cost: building and updating activity dictionaries requires substantial time and employee surveys',
      'Facility-sustaining overhead (factory roof, CEO salary) must still be allocated arbitrarily if forced into product costs',
      'Can encounter fierce internal political resistance from product managers whose pet lines are revealed to be deeply loss-making'
    ],
    workflowPlacement: {
      upstream: 'Takes input from General Ledger operating expenses, time-tracking studies, and ERP manufacturing routing sheets',
      downstream: 'Feeds Product Line Rationalization, Commercial Pricing Schedules, Minimum Order Quantity Rules, and Lean Value Stream Mapping'
    },
    useCases: [
      {
        title: 'Precision Machining Product Rationalization',
        situation: 'CNC machine shop manufacturing 1,200 different aerospace fittings with 15% overall gross margins.',
        problem: 'Traditional accounting allocated overhead based on direct machine hours; all products showed a comfortable 14–16% gross margin.',
        action: 'Implemented ABC mapping setups, tool changes, and coordinate-measuring machine (CMM) quality inspections.',
        outcome: 'Discovered the top 80 standard parts had a true 34% margin, while 400 low-volume custom parts generated negative 45% margins; repriced custom orders and boosted gross margin to 24%.'
      },
      {
        title: 'Commercial Bank Customer Profitability Audit',
        situation: 'Regional commercial bank offering corporate checking, wire services, and loan facilities.',
        problem: 'High-revenue corporate clients demanded heavy personal relationship manager time and custom manual wire processing.',
        action: 'Mapped Cost-to-Serve across branch visits, wire exception handling, and compliance audits.',
        outcome: 'Found that 15 of the bank’s top 100 revenue clients were deeply unprofitable due to massive transaction handling costs; instituted transaction fee schedules.'
      },
      {
        title: 'Food & Beverage Packaging Line Complexity',
        situation: 'Snack manufacturer producing large standard retail boxes and small seasonal promotional pouches.',
        problem: 'Seasonal pouches appeared highly lucrative on paper, but total factory throughput kept missing quarterly targets.',
        action: 'Quantified press washdown and allergen changeover costs under ABC.',
        outcome: 'Revealed seasonal pouch line changeovers cost $4,800 each in lost production and sanitation labor; raised pouch pricing by 30% and enforced a 10,000-unit minimum run.'
      }
    ],
    caseStudy: {
      company: 'Apex Precision Hydraulics',
      revenue: '$54 Million',
      staff: '190 Employees',
      profile: 'Hydraulic cylinder and manifold block manufacturer for agricultural and mining machinery.',
      challenge: 'Despite record sales order volume, operating profit collapsed from $4.2M to $900k. Competitors were winning bids on Apex’s high-volume standard cylinders, while Apex was flooded with complex, custom low-volume orders.',
      whyChosen: 'Activity-Based Costing was implemented to expose whether traditional plant-wide direct labor overhead allocation was mispricing products and creating adverse selection.',
      steps: [
        'Audited the $14M manufacturing overhead: abandoned the single plant-wide direct labor hour allocation rate of $85/hour.',
        'Established 4 distinct activity cost pools: Machine Setups ($3.8M), Precision CMM Inspections ($2.4M), Engineering Change Orders ($2.2M), and Material Movement ($1.6M).',
        'Calculated activity rates: Machine Setup = $950/setup; Inspection = $320/inspection hour; ECO = $1,800/order; Material Move = $45/pallet.',
        'Re-costed Product A (Standard Cylinder, 20,000 units/year) and Product B (Custom Mining Manifold, 200 units/year).',
        'The shocking reveal: Product A consumed only 4 setups all year; its true cost under ABC was $210 (vs $310 under traditional accounting). Product B consumed 18 setups and 40 inspection hours; its true cost under ABC was $1,420 (vs $480 under traditional accounting!).'
      ],
      results: [
        'Apex was selling Product B for $600 while it actually cost $1,420 to manufacture—losing $820 on every unit sold!',
        'Apex was charging $360 for Product A while competitors charged $260, driving away their most profitable high-volume customers.',
        'Slashed Product A price to $275, regaining $8M in high-volume OEM contracts at a healthy 23% true margin.',
        'Repriced Product B to $1,650 and instituted a $1,500 custom engineering setup charge; 40% of unprofitable SKUs were either repriced or dropped.',
        'Operating profit rebounded from $900k to $5.1M in the subsequent fiscal year.'
      ],
      lessonsLearned: [
        'Traditional overhead allocation acts as an invisible corporate suicide pill: you systematically overprice simple high-volume products and underprice complex custom products.',
        'Competitors will eagerly cherry-pick your over-costed standard products while happily leaving you to choke on complex, unprofitable custom work.',
        'Complexity must have an explicit price tag: if customers want customized low-volume runs, they must pay for the setups, inspections, and changeovers they consume.'
      ]
    },
    implementationGuide: {
      prerequisites: [
        'Detailed general ledger expense reports with departmental cost center breakdowns',
        'Production logs tracking machine setups, quality inspection hours, and engineering changes',
        'Cross-functional willingness from sales and manufacturing to confront uncomfortable profitability truths'
      ],
      steps: [
        'Step 1: Identify the top 5 to 8 major overhead activities that consume significant indirect labor and equipment resources.',
        'Step 2: Assign general ledger overhead dollars to each activity pool using direct tracing or interview-based time estimates.',
        'Step 3: Select a practical, measurable cost driver for each activity pool (e.g. setups, orders, machine hours).',
        'Step 4: Compute the Activity Driver Rate: Pool Cost ÷ Total Annual Driver Volume.',
        'Step 5: Multiply driver rates by each product’s actual activity consumption to calculate fully loaded ABC unit costs and net margins.'
      ],
      checklist: [
        'Are activity drivers truly causal (does an increase in the driver directly increase the cost pool)?',
        'Are batch-level costs (setups) separated from unit-level costs (materials, machining)?',
        'Have customer-specific costs (sales calls, custom packaging, rush freight) been traced to customer profitability models?',
        'Is the model practical enough to maintain annually without requiring a dedicated army of full-time consultants?'
      ],
      commonMistakes: [
        {
          mistake: 'Creating 80 different micro-activity pools, making the ABC system so complex that nobody maintains it.',
          fix: 'Follow the 80/20 rule: 5 to 8 well-chosen activity pools typically capture 85% of overhead cost behavior accurately.'
        },
        {
          mistake: 'Using direct labor hours as an overhead allocation driver when labor represents only 5% of modern automated factory costs.',
          fix: 'Use machine hours, setup events, and automated test cycles as drivers in modern automated environments.'
        }
      ],
      plan306090: {
        d30: 'Conduct overhead activity mapping workshops with engineering, plant operations, and logistics to define the 6 primary cost pools.',
        d60: 'Gather driver volume data and run initial ABC model on the top 20 revenue products and top 20 custom products.',
        d90: 'Convene executive pricing committee to implement new minimum order quantities, custom setup surcharges, and catalog pruning.'
      },
      proTips: [
        'Look for the "Whale Curve" of customer profitability: typically, 20% of customers generate 150% to 200% of profits, while the middle 60% break even and the bottom 20% destroy 50% to 100% of profit.',
        'Use ABC not to fire customers, but to negotiate behavior changes: educate high-cost customers to place larger, less frequent orders to reduce shared overhead.'
      ]
    },
    whenNotToUse: [
      {
        alternative: 'Simple Direct Costing / Contribution Margin Modeling',
        reason: 'In single-product companies or businesses where overhead is tiny compared to direct materials and labor.'
      },
      {
        alternative: 'Time-Driven Activity-Based Costing (TDABC)',
        reason: 'In high-velocity service operations (like healthcare clinics or call centers) where estimating unit time per transaction is much faster than running full survey-based ABC.'
      }
    ],
    reflectionPrompts: [
      'Are our high-volume standard customers quietly paying higher prices to subsidize our most demanding, high-maintenance boutique accounts?',
      'How much would our plant throughput increase if we eliminated the bottom 20% of our most complex, lowest-volume SKUs?'
    ],
    quickReferenceCard: [
      'Activity Rate = Total Cost Pool ($) ÷ Total Driver Quantity',
      'ABC Product Overhead = ∑ (Units of Driver Consumed × Activity Rate)',
      'Four Activity Levels: Unit, Batch, Product-Sustaining, Facility-Sustaining',
      'The Cross-Subsidization Rule: High-volume standard products always subsidize low-volume complex custom products under traditional accounting',
      'Cost-to-Serve = Direct Product Cost + Indirect Customer Support Activities'
    ],
    quiz: [
      {
        id: 'q-abc-1',
        question: 'What is the fundamental distortion caused by traditional volume-based overhead allocation (such as direct labor hours or machine hours)?',
        options: [
          'It causes all products to appear identical in cost',
          'It systematically over-costs high-volume standard products and under-costs low-volume, complex custom products that consume excessive setups and inspections',
          'It violates corporate tax codes',
          'It understates direct material costs'
        ],
        correctAnswer: 1,
        explanation: 'Traditional accounting spreads overhead proportionally based on unit volume. Because simple high-volume products produce many units, they absorb massive overhead they never consume, while complex custom products that require dozens of setups and inspections absorb very little overhead, hiding massive losses.'
      },
      {
        id: 'q-abc-2',
        question: 'A company has an annual Machine Setup Cost Pool of $300,000. Across all manufacturing lines, exactly 600 machine setups are performed annually. What is the Activity Driver Rate for machine setups?',
        options: ['$50 per setup', '$500 per setup', '$1,800 per setup', '$5,000 per setup'],
        correctAnswer: 1,
        explanation: 'Activity Driver Rate = Total Cost Pool ÷ Total Activity Driver Volume = $300,000 ÷ 600 setups = $500 per setup.'
      },
      {
        id: 'q-abc-3',
        question: 'In the Activity-Based Costing hierarchy, how is the activity of calibrating a machine before running a batch of 500 units classified?',
        options: [
          'Unit-level activity',
          'Batch-level activity',
          'Product-sustaining activity',
          'Facility-sustaining activity'
        ],
        correctAnswer: 1,
        explanation: 'Calibrating or setting up equipment is a Batch-level activity: it is performed once for the entire batch of 500 units, regardless of whether the batch contains 10 units or 1,000 units.'
      },
      {
        id: 'q-abc-4',
        question: 'What is a "Customer Whale Curve" in Activity-Based Costing and Cost-to-Serve analysis?',
        options: [
          'A graph showing that the largest marine biology customers always pay on time',
          'A cumulative profitability curve showing that the top 20% of customers generate up to 200% of profits, while the bottom 20% destroy substantial profit through excessive service demands',
          'A plot of customer lifetime duration versus sales price elasticity',
          'A chart proving that all customers are equally profitable'
        ],
        correctAnswer: 1,
        explanation: 'The Whale Curve plots cumulative customer profitability. Typically, the most profitable 20% generate up to 200% of net profits; the middle 60% break even; and the bottom 20% erode massive wealth through rush orders, customization, and constant support demands.'
      },
      {
        id: 'q-abc-5',
        question: 'After an ABC audit reveals that a custom product line is losing money, which of the following is the most constructive initial strategic action?',
        options: [
          'Immediately fire the production staff',
          'Discontinue all custom manufacturing without notifying customers',
          'Enforce minimum order quantities (MOQ), charge explicit engineering setup fees, and reprice the custom line to reflect true activity consumption',
          'Revert to traditional labor-hour accounting so the product appears profitable again'
        ],
        correctAnswer: 2,
        explanation: 'ABC gives management pricing power and commercial clarity. Rather than immediately dropping products, executives should price custom complexity explicitly, enforce minimum order quantities to reduce setup frequency, and incentivize customers toward standardized alternatives.'
      }
    ]
  }
];

export const CATEGORY_5_STACKS: StrategyStack[] = [
  {
    id: 'stack-fin-a',
    name: 'Stack A — Startup & Seed Stage Financial Runway & Unit Economics',
    targetOrg: 'Startups & Early Ventures (<$3M Revenue, 1–25 People)',
    recommendedChain: ['breakeven', 'workingcapital'],
    cadence: {
      quarterly: 'Monthly Break-Even review -> Daily cash collection burn rate -> 12-month runway defense',
      annually: 'Recalculate unit contribution margins and pricing tiers for new product launches',
      every23Years: 'Re-evaluate operating leverage and fixed cloud/headcount infrastructure commitments'
    },
    whyItFits: 'When capital is scarce, the fundamental executive survival test is proving positive unit contribution economics and defending cash runway. Break-Even Analysis establishes the exact monthly sales volume needed to cover baseline fixed overhead, while Working Capital Management ensures cash collections occur before vendor bills drain treasury.',
    whatToSkip: 'Skip complex multi-stage DuPont models and granular activity surveys until basic positive contribution margin and liquidity are proven.'
  },
  {
    id: 'stack-fin-b',
    name: 'Stack B — Growing SME Profitability & Capital Allocation',
    targetOrg: 'Established Mid-Sized Businesses ($3M–$50M Revenue, 25–250 People)',
    recommendedChain: ['costbenefit', 'budgeting', 'workingcapital'],
    cadence: {
      quarterly: 'Monthly flexible variance reviews, CCC working capital scorecards, and cash unlock tracking',
      annually: 'Annual Zero-Based Budgeting (ZBB) decision package cycle and Capex CBA evaluations',
      every23Years: 'Comprehensive capital allocation review of hurdle rates (WACC) and enterprise banking facilities'
    },
    whyItFits: 'Mid-sized growth companies frequently hit the "growth paradox" where revenue accelerates but operating cash collapses. This stack provides rigorous capital budgeting (CBA/NPV) to evaluate expansion investments, Zero-Based Budgeting and flexible variance control to prevent bureaucratic overhead creep, and Cash Conversion Cycle optimization to self-fund scaling.',
    whatToSkip: 'Avoid rigid static budgets that punish teams for exceeding volume targets; always use flexed budgets.'
  },
  {
    id: 'stack-fin-c',
    name: 'Stack C — Mid-Market & Enterprise Margin Defense & Value Creation',
    targetOrg: 'Mid-Market & Multi-Division Corporations ($50M+ Revenue, 250+ People)',
    recommendedChain: ['dupont', 'abc', 'budgeting'],
    cadence: {
      quarterly: 'DuPont ROE decomposition across peer groups, activity driver rate updates, and variance audits',
      annually: 'Full Activity-Based Costing customer profitability audit and ZBB SG&A restructuring',
      every23Years: 'Enterprise product catalog rationalization (pruning unprofitable SKUs) and capital structure review'
    },
    whyItFits: 'Large diversified enterprises struggle with hidden product complexity and obscured return drivers. This stack uses DuPont Analysis to deconstruct Return on Equity into operating efficiency, asset velocity, and leverage, deploys Activity-Based Costing to unmask unprofitable products and customer accounts, and enforces Zero-Based Budgeting to keep corporate SG&A lean.',
    whatToSkip: 'Do not create 100+ micro-activity pools; 5 to 8 major cost pools capture over 85% of complexity cost behavior.'
  }
];

export const CATEGORY_5_SCENARIOS: ScenarioMission[] = [
  {
    id: 'mission-fin-1',
    title: 'The Margin Illusion & Adverse Selection Trap at Apex Hydraulics',
    role: 'Chief Financial Officer (CFO)',
    companyContext: 'Apex Precision Hydraulics ($54M Revenue, 190 Employees), manufacturing cylinders and manifold blocks.',
    crisisPrompt: 'Despite record sales orders, annual operating profit collapsed from $4.2M to $900k. Competitors are aggressively undercutting Apex on simple high-volume cylinders with 25% lower prices, while Apex is inundated with custom, low-volume orders. The company uses a single plant-wide direct labor overhead rate ($85/hour), which makes all products appear comfortably profitable at 15% margins. Factory scrap has doubled and changeovers are bottlenecking capacity. What is your strategic turnaround move?',
    targetTools: ['abc', 'breakeven'],
    options: [
      {
        id: 'opt-fin-1-1',
        label: 'Mandate an immediate across-the-board 10% price increase on all catalog products to offset rising scrap',
        toolUsed: 'Blind Across-the-Board Pricing',
        explanation: 'Disastrous. Raising prices on already over-costed high-volume products will drive the remaining profitable OEM customers straight to competitors, accelerating corporate insolvency.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-fin-1-2',
        label: 'Deploy Activity-Based Costing (ABC) to isolate Setup, Inspection, and Engineering cost pools and reprice products based on true activity consumption',
        toolUsed: 'Activity-Based Costing & Strategic Repricing',
        explanation: 'Optimal textbook response. ABC exposes that high-volume standard cylinders are over-costed and custom cylinders are deeply loss-making. It enables Apex to lower prices on standard products to win back volume while charging setup surcharges on custom work.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-fin-1-3',
        label: 'Double down on custom manufacturing and hire 15 additional quality inspectors to handle custom inspection bottlenecks',
        toolUsed: 'Chasing Unprofitable Volume',
        explanation: 'Severely flawed. Custom products are already losing money under true fully loaded overhead; adding fixed inspection salaries compounds the structural loss.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'Apex is caught in the classic "Cross-Subsidization & Adverse Selection Trap." Under traditional direct-labor overhead allocation, simple high-volume products absorb massive overhead they never consume, making them appear artificially expensive. Meanwhile, complex custom products consume dozens of machine setups, engineering change orders, and CMM quality inspections while absorbing almost zero overhead on paper. Competitors cherry-picked Apex’s over-costed standard lines, leaving Apex with a factory choked on unprofitable custom work. Management must implement Activity-Based Costing (ABC), establishing cost pools for Machine Setups, Inspections, and Engineering Changes. Reprice custom work with explicit setup charges and minimum order quantities, and lower standard cylinder prices to reclaim profitable OEM volume.',
    actionChecklist: [
      'Stop using a single direct-labor overhead rate in multi-product environments with varying complexity',
      'Build activity cost pools for Setups, Inspections, and Engineering Changes',
      'Calculate true fully loaded ABC product margins and identify negative-margin SKUs',
      'Reprice or enforce minimum order quantities on complex, short-run custom orders'
    ],
    reflectionKey: 'When competitors consistently undercut your standard products while avoiding your custom products, your accounting system is subsidizing the wrong work.'
  },
  {
    id: 'mission-fin-2',
    title: 'The Rapid-Growth Cash Crunch at Solis Logistics',
    role: 'Managing Director & Treasurer',
    companyContext: 'Solis Logistics & Distribution ($62M Revenue, 185 Employees), providing temperature-controlled freight.',
    crisisPrompt: 'Driven by regional expansion, annual revenue jumped 35% with $4.5M in reported net accounting profit. However, Solis has maxed out its $6M bank credit line, payroll is due in 10 days, and cash is down to $140,000. Days Sales Outstanding (DSO) has stretched to 68 days due to aggressive sales terms, while Days Payables Outstanding (DPO) is 32 days and DIO is 28 days, creating an acute 64-day Cash Conversion Cycle. How do you resolve this liquidity crisis without crippling the company?',
    targetTools: ['workingcapital', 'budgeting'],
    options: [
      {
        id: 'opt-fin-2-1',
        label: 'Immediately halt all warehouse operations and lay off 30% of drivers to conserve cash',
        toolUsed: 'Panic Workforce Slashing',
        explanation: 'Destructive. Firing drivers paralyzes customer fulfillment, breaches logistics SLAs, triggers customer cancellations, and destroys the business.',
        isOptimal: false,
        rubricPoints: 0
      },
      {
        id: 'opt-fin-2-2',
        label: 'Execute an emergency Working Capital intervention: launch an A/R collections strike team with prompt-payment discounts, extend DPO via negotiated supplier terms, and compress DIO',
        toolUsed: 'Working Capital Management & Cash Conversion Cycle Optimization',
        explanation: 'Optimal execution. Every day of DSO reduced releases $170k in hard cash. Accelerating collections by 25 days and extending vendor terms releases over $4.5M in liquid cash, resolving the payroll crisis without debt or dilution.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-fin-2-3',
        label: 'Offer an emergency 50% equity stake to a predatory private debt fund at a distressed valuation',
        toolUsed: 'Premature Dilutive Capitulation',
        explanation: 'Unnecessary and highly dilutive. The company is inherently profitable; its crisis is purely operational cash timing that can be solved by working capital management.',
        isOptimal: false,
        rubricPoints: 5
      }
    ],
    modelAnswer: 'Solis is suffering from rapid-growth working capital starvation. Growth absorbs cash: when DSO is 68 days and DPO is 32 days, Solis must fund 64 days of operational costs out of pocket before customer revenue arrives. To avert payroll default, leadership must immediately deploy an emergency Working Capital War Room. 1) Identify the top 50 overdue enterprise receivables and offer a 2% discount for electronic wire payment within 5 business days, bringing in immediate liquidity. 2) Negotiate with key fuel and fleet maintenance suppliers to move from net-30 to net-60 terms in exchange for volume exclusivity. 3) Adopt just-in-time warehouse packaging delivery to cut DIO from 28 to 14 days. These actions will collapse the CCC and unlock over $5M in free cash flow, extinguishing the credit line emergency.',
    actionChecklist: [
      'Calculate the Cash Conversion Cycle (DSO + DIO − DPO) weekly during rapid expansion',
      'Audit accounts receivable aging daily and enforce strict credit hold policies on past-due accounts',
      'Tie commercial sales commission payments to cash collected rather than invoices generated',
      'Align supplier payment terms (DPO) to mirror or exceed customer collection terms (DSO)'
    ],
    reflectionKey: 'Profits are an accounting opinion; cash is an economic fact. Unmanaged working capital will bankrupt a booming enterprise.'
  },
  {
    id: 'mission-fin-3',
    title: 'The $4.5M Automation Capex Dilemma at Vanguard Medical',
    role: 'VP of Strategy & Capital Allocation',
    companyContext: 'Vanguard Medical Devices ($48M Revenue, 210 Employees), high-precision surgical implant manufacturer.',
    crisisPrompt: 'Vanguard’s surgical implant division is experiencing a 22% scrap rate on titanium orthopedic implants, costing $1.1M annually in wasted raw stock and delayed hospital surgeries. The VP of Operations wants to invest $3.2M in four 5-axis robotic machining cells. The conservative CFO opposes the spend, arguing that machine refurbishment for $700k has a much faster simple payback period of 1.2 years versus 3.4 years for the robotic cells. The Board is deadlocked. What capital budgeting framework resolves this dilemma?',
    targetTools: ['costbenefit'],
    options: [
      {
        id: 'opt-fin-3-1',
        label: 'Select the $700k refurbishment solely because its simple payback period (1.2 years) is the shortest',
        toolUsed: 'Simple Payback Bias',
        explanation: 'Flawed decision-making. Simple payback ignores total project lifecycle cash flows and the time value of money. Refurbishment leaves scrap at 14% and misses $8M in lifetime automated value creation.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-fin-3-2',
        label: 'Perform a comprehensive Cost-Benefit Analysis (CBA) discounting multi-year cash flows at Vanguard’s WACC, evaluating Net Present Value (NPV) and IRR over a 7-year asset lifecycle',
        toolUsed: 'Discounted Cash Flow & Net Present Value Governance',
        explanation: 'Optimal capital budgeting practice. NPV accounts for total cash flow generation and the time value of money, demonstrating that the $3.2M robotic investment creates $2.1M in incremental shareholder value compared to only $180k for refurbishment.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-fin-3-3',
        label: 'Outsource all surgical implant machining to an overseas low-cost supplier without conducting intellectual property due diligence',
        toolUsed: 'Shortsighted Outsourcing',
        explanation: 'Dangerous. Outsourcing precision medical implants risks catastrophic FDA regulatory non-compliance, supply chain disruptions, and theft of proprietary surgical design IP.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Relying on simple payback period to choose between competing capital proposals is a classic corporate finance blunder. Simple payback ignores all cash flows earned after the payback threshold and fails to discount cash for the time value of money. When Vanguard builds a rigorous 7-year Cost-Benefit Analysis using a risk-adjusted 10.5% hurdle rate (WACC), the truth emerges: The $700k refurbishment yields an NPV of only +$180,000 because scrap remains stubbornly high at 14%. In contrast, the $3.2M 5-axis robotic cells collapse scrap to 1.8%, expand surgical throughput by 30%, and yield an NPV of +$2,140,000 with an IRR of 28.4%. The board must approve the $3.2M robotic acquisition because it maximizes long-term shareholder wealth.',
    actionChecklist: [
      'Reject simple payback period as the primary capital budgeting decision criterion',
      'Use Net Present Value (NPV) as the definitive arbiter for mutually exclusive capital investments',
      'Verify that project IRR comfortably exceeds the corporate risk-adjusted WACC hurdle rate',
      'Factor in all implementation downtime, staff retraining, and scrap reduction savings into multi-year DCF models'
    ],
    reflectionKey: 'Cheapest upfront is rarely cheapest over the asset lifecycle. NPV measures wealth created; payback measures only impatience.'
  },
  {
    id: 'mission-fin-4',
    title: 'The Runaway SG&A Burn & Budget Padding at Valo SaaS',
    role: 'Chief Executive Officer (CEO)',
    companyContext: 'Valo Enterprise Cloud ($38M ARR, 160 Employees), B2B workflow software provider.',
    crisisPrompt: 'Valo expanded rapidly during a tech boom, but annual ARR growth has cooled to 12% while operating expenditures have skyrocketed, causing cash burn of $450k per month. Department heads routinely submitted their annual budgets by taking last year’s spending and adding 8% to 15%. Over 40 enterprise software subscriptions are duplicate, senior managers spend lavishly on luxury conferences, and middle managers hide extra budget padding. The venture board demands operating cash-flow break-even within two quarters or face emergency down-round recapitalization. What budgeting strategy should you mandate?',
    targetTools: ['budgeting', 'dupont'],
    options: [
      {
        id: 'opt-fin-4-1',
        label: 'Deploy an across-the-board 15% budget cut across all engineering, sales, and administrative departments uniformly',
        toolUsed: 'Equal-Misery Blanket Slicing',
        explanation: 'Ineffective and demoralizing. Blanket percentage cuts penalize lean, high-performing engineering squads while letting bloated administrative cost centers keep 85% of their fat.',
        isOptimal: false,
        rubricPoints: 5
      },
      {
        id: 'opt-fin-4-2',
        label: 'Institute Zero-Based Budgeting (ZBB) with structured Decision Packages, forcing every department head to justify all expenditures from ground zero, paired with monthly flexible variance reviews',
        toolUsed: 'Zero-Based Budgeting & Variance Control',
        explanation: 'Optimal strategic turnaround. ZBB systematically dismantles budget padding, terminates redundant software licenses, eliminates non-essential discretionary burn, and establishes disciplined monthly variance reviews.',
        isOptimal: true,
        rubricPoints: 25
      },
      {
        id: 'opt-fin-4-3',
        label: 'Double annual marketing spend to attempt to grow out of the deficit before examining internal cost structures',
        toolUsed: 'Growth Addiction Gamble',
        explanation: 'Catastrophic. Throwing marketing dollars into an undisciplined, cash-bleeding cost structure accelerates insolvency and guarantees the company runs out of cash in 4 months.',
        isOptimal: false,
        rubricPoints: 0
      }
    ],
    modelAnswer: 'Incremental budgeting ("last year + X%") is an institutional engine for organizational bloat. When growth moderates, companies with padded budgets rapidly run out of cash. Management must mandate Zero-Based Budgeting (ZBB). Every department budget must be reset to zero. Cost owners must build "Decision Packages" categorized into: 1) Minimum operational survival baseline, 2) Core growth drivers, and 3) Discretionary expansion. Leadership ranks and funds packages strictly by strategic ROI. In addition, FP&A must implement monthly flexible variance tracking to immediately isolate spending slippage. At Valo, this will eradicate $2.8M in redundant SaaS seats, lavish travel, and unused contractor retainers, returning the company to cash-flow positive within 90 days.',
    actionChecklist: [
      'Eliminate incremental "prior year + percentage" budget submissions across all cost centers',
      'Require department heads to justify every software subscription, headcount, and vendor contract from zero',
      'Implement monthly flexible variance reviews comparing actuals to flexed activity standards',
      'Enforce management by exception on spending variances exceeding $10,000 or 5%'
    ],
    reflectionKey: 'Budget padding is the tax that stagnant organizations pay for avoiding hard operational prioritization.'
  }
];

export const CATEGORY_5_GLOSSARY: GlossaryItem[] = [
  { term: 'Activity-Based Costing (ABC)', definition: 'A managerial costing methodology that identifies operational activities in an organization and assigns indirect costs to products and services based on their actual consumption of those activities.', tool: 'Activity-Based Costing' },
  { term: 'Activity Driver', definition: 'A measurable quantitative unit that causes activity costs to occur, such as the number of machine setups, purchase orders, or quality inspections.', tool: 'Activity-Based Costing' },
  { term: 'Asset Turnover', definition: 'A core DuPont financial efficiency ratio equal to Total Sales Revenue divided by Total Assets, measuring how many dollars of sales are generated per dollar of assets.', tool: 'DuPont Analysis' },
  { term: 'Batch-Level Activity', definition: 'An activity performed each time a batch of products is run or handled (e.g. equipment setup, shipment palletizing), regardless of the number of units in the batch.', tool: 'Activity-Based Costing' },
  { term: 'Benefit-Cost Ratio (BCR)', definition: 'The ratio of the present value of all expected project benefits to the present value of all costs; an investment is economically viable if BCR > 1.0.', tool: 'Cost-Benefit Analysis' },
  { term: 'Break-Even Point (BEP)', definition: 'The unique sales volume (in units or dollars) at which Total Revenues exactly equal Total Costs, resulting in zero net economic profit or loss.', tool: 'Break-Even Analysis' },
  { term: 'Cash Conversion Cycle (CCC)', definition: 'The net elapsed time (in days) required for a firm to convert its investments in inventory and operating resources into cash inflows from customers: DSO + DIO − DPO.', tool: 'Working Capital & CCC' },
  { term: 'Contribution Margin (CM)', definition: 'The dollar amount remaining from sales revenue after deducting all unit variable costs, representing the funds available to cover fixed overhead and generate operating profit.', tool: 'Break-Even Analysis' },
  { term: 'Contribution Margin Ratio (CMR)', definition: 'Contribution margin expressed as a percentage of sales revenue (CM ÷ Revenue), indicating the cents of profit contribution per dollar of sales.', tool: 'Break-Even Analysis' },
  { term: 'Cost of Capital (WACC)', definition: 'The Weighted Average Cost of Capital representing the average minimum rate of return a company must earn on its existing asset base to satisfy debt creditors and equity shareholders.', tool: 'Cost-Benefit Analysis' },
  { term: 'Cost Pool', definition: 'A grouping of individual indirect cost line items that are accumulated and allocated together based on a common cost driver.', tool: 'Activity-Based Costing' },
  { term: 'Cost-to-Serve', definition: 'The total indirect operational cost required to deliver goods and support to a specific customer account, capturing order frequency, custom packaging, and customer service.', tool: 'Activity-Based Costing' },
  { term: 'Cross-Subsidization', definition: 'An accounting distortion under traditional volume-based costing where high-volume standard products absorb excessive overhead and falsely subsidize low-volume, complex custom products.', tool: 'Activity-Based Costing' },
  { term: 'Current Ratio', definition: 'A standard balance sheet liquidity ratio calculated as Total Current Assets divided by Total Current Liabilities, assessing short-term solvency.', tool: 'Working Capital & CCC' },
  { term: 'Days Inventory Outstanding (DIO)', definition: 'The average number of days inventory sits in warehouses or manufacturing stages before being sold to a customer: (Inventory ÷ Annual COGS) × 365.', tool: 'Working Capital & CCC' },
  { term: 'Days Payables Outstanding (DPO)', definition: 'The average number of days a company takes to pay its commercial trade suppliers and vendors for raw materials and services: (Accounts Payable ÷ Annual COGS) × 365.', tool: 'Working Capital & CCC' },
  { term: 'Days Sales Outstanding (DSO)', definition: 'The average number of days it takes for a business to collect payment from credit customers after a sale is completed: (Accounts Receivable ÷ Annual Revenue) × 365.', tool: 'Working Capital & CCC' },
  { term: 'Decision Package', definition: 'In Zero-Based Budgeting (ZBB), a discrete document detailing a specific operational activity, its strategic justification, required funding, and the consequences of not funding it.', tool: 'Budgeting & Variance Analysis' },
  { term: 'Degree of Operating Leverage (DOL)', definition: 'A measure of profit sensitivity to sales volume changes: Total Contribution Margin divided by Operating Income (EBIT). High DOL magnifies profit gains and losses.', tool: 'Break-Even Analysis' },
  { term: 'Discounted Payback Period', definition: 'The time required for cumulative discounted future cash inflows to equal the initial capital outlay of an investment, incorporating the time value of money.', tool: 'Cost-Benefit Analysis' },
  { term: 'DuPont 3-Stage Model', definition: 'A classic financial decomposition expressing Return on Equity as the mathematical product of Net Profit Margin × Asset Turnover × Equity Multiplier.', tool: 'DuPont Analysis' },
  { term: 'Equity Multiplier', definition: 'The leverage component of the DuPont model equal to Total Assets divided by Shareholders’ Equity, quantifying the degree of debt financing used to acquire assets.', tool: 'DuPont Analysis' },
  { term: 'Flexible Budget', definition: 'A dynamic budget model that adjusts allowable variable costs and revenues to reflect the actual volume of activity achieved during the reporting period.', tool: 'Budgeting & Variance Analysis' },
  { term: 'Hurdle Rate', definition: 'The minimum rate of return (cost of capital plus project risk premium) that an investment proposal must meet or exceed to be approved by an investment committee.', tool: 'Cost-Benefit Analysis' },
  { term: 'Internal Rate of Return (IRR)', definition: 'The annualized compound discount rate at which the Net Present Value (NPV) of all project cash inflows and outflows exactly equals zero.', tool: 'Cost-Benefit Analysis' },
  { term: 'Margin of Safety (MoS)', definition: 'The percentage buffer by which actual or forecasted sales exceed the break-even sales volume: (Current Sales − Break-Even Sales) ÷ Current Sales × 100%.', tool: 'Break-Even Analysis' },
  { term: 'Material Efficiency Variance', definition: 'The difference between actual quantity of physical materials used and standard materials allowed for actual production, valued at standard price: (AQ − SQ) × SP.', tool: 'Budgeting & Variance Analysis' },
  { term: 'Material Price Variance', definition: 'The difference between actual unit price paid for raw materials and the standard budgeted price, multiplied by actual quantity purchased: (AP − SP) × AQ.', tool: 'Budgeting & Variance Analysis' },
  { term: 'Negative Working Capital', definition: 'An operational state where Days Payables Outstanding exceeds DSO + DIO, allowing a firm to fund growth and day-to-day operations using supplier capital float.', tool: 'Working Capital & CCC' },
  { term: 'Net Present Value (NPV)', definition: 'The present value of all incremental future cash inflows minus the initial capital investment outlay, discounted at the project hurdle rate.', tool: 'Cost-Benefit Analysis' },
  { term: 'Quick Ratio (Acid-Test)', definition: 'A strict liquidity ratio equal to (Cash + Marketable Securities + Accounts Receivable) divided by Current Liabilities, explicitly excluding illiquid inventory.', tool: 'Working Capital & CCC' },
  { term: 'Zero-Based Budgeting (ZBB)', definition: 'A rigorous budgeting method where every department budget begins at zero each period, requiring managers to justify every expenditure line item from scratch based on strategic ROI.', tool: 'Budgeting & Variance Analysis' }
];
