import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize GoogleGenAI server-side client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Curated fallbacks in case of offline / rate limits
const FALLBACK_INSIGHTS = [
  {
    frameworkName: 'SWOT & TOWS Matrix',
    frameworkId: 'swot',
    category: 'Strategy & Market Positioning',
    headline: 'Pair internal strengths with external market shocks',
    tip: 'A standard SWOT is passive inventory; a TOWS matrix turns it actionable. Pair your strongest core capabilities with external disruptions (WT and SO strategies) to seize non-obvious white space before competitors react.',
    actionItem: 'Pick your top 2 organizational strengths and draft one specific offensive play against a rising macro trend.',
    quote: 'Strategy is about making choices, trade-offs; it’s about deliberately choosing to be different.',
  },
  {
    frameworkName: 'Blue Ocean Strategy',
    frameworkId: 'blueocean',
    category: 'Strategy & Market Positioning',
    headline: 'Eliminate industry sacred cows to unlock new value',
    tip: 'Value innovation occurs only when companies align innovation with utility, price, and cost positions. Use the Four Actions Framework (Eliminate, Reduce, Raise, Create) to stop competing on crowded industry factors.',
    actionItem: 'Identify one high-cost industry standard that your customers actually value the least and explore eliminating it.',
    quote: 'The only way to beat the competition is to stop trying to beat the competition.',
  },
  {
    frameworkName: 'Porter’s Five Forces',
    frameworkId: 'porter5',
    category: 'Strategy & Market Positioning',
    headline: 'Protect margin against asymmetric supplier and buyer leverage',
    tip: 'Industry profitability is not dictated by technology or market growth, but by structural bargaining power. Continually develop alternative suppliers and direct-to-consumer distribution to prevent margin squeeze.',
    actionItem: 'Map your top 3 vendor contracts and evaluate your switching cost if prices increase 15%.',
    quote: 'The essence of strategy is coping with competition, but competition is much wider than direct rivals.',
  },
  {
    frameworkName: 'Ansoff Matrix',
    frameworkId: 'ansoff',
    category: 'Strategy & Market Positioning',
    headline: 'Derisk expansion by balancing core penetration with diversification',
    tip: 'Market penetration carries 4x higher probability of success than radical diversification. Exhaust pricing power, customer retention, and usage frequency in your core before funding speculative new-product bets.',
    actionItem: 'Calculate what percentage of this quarters revenue came from existing customers versus new market tests.',
    quote: 'Master your core sandbox before spending capital to conquer someone else’s.',
  },
  {
    frameworkName: 'Business Model Canvas',
    frameworkId: 'bmc',
    category: 'Business Model Innovation',
    headline: 'Stress-test cost structure against recurring value propositions',
    tip: 'A business model fails when the value proposition is decoupled from repeatable distribution channels and unit margin. Always balance cost drivers on the left with revenue streams on the right.',
    actionItem: 'Inspect your key partner dependencies and determine if any single vendor poses an existential channel threat.',
    quote: 'Business models are perishable; treat them as evolving hypotheses rather than static monoliths.',
  },
  {
    frameworkName: 'Jobs-to-be-Done (JTBD)',
    frameworkId: 'jtbd',
    category: 'Business Model Innovation',
    headline: 'People do not buy products; they hire them to make progress',
    tip: 'When customers find a solution, they "fire" an incumbent alternative. Focus on the emotional and social anxieties of switching, not just feature checklists.',
    actionItem: 'Interview a recent customer and ask what they gave up or stopped doing the day they adopted your product.',
    quote: 'Upgrade your user, not your product. Value is the progress made, not the software delivered.',
  },
  {
    frameworkName: 'DuPont Analysis',
    frameworkId: 'dupont',
    category: 'Financial Performance',
    headline: 'Decompose ROE to reveal your true growth engine',
    tip: 'Return on Equity (ROE) can be driven by high profit margins, hyper-efficient asset turnover, or debt leverage. Never evaluate high ROE without dissecting whether it comes from operational brilliance or financial risk.',
    actionItem: 'Check your balance sheet asset turnover ratio to ensure revenue expansion is not lagging capital investment.',
    quote: 'Turnover without margin is vanity; margin without turnover is sluggish; leverage without either is risk.',
  },
  {
    frameworkName: 'Working Capital & Cash Conversion Cycle',
    frameworkId: 'workingcapital',
    category: 'Financial Performance',
    headline: 'Compress DSO and DIO to fund growth from customer cash flows',
    tip: 'A negative or compressed Cash Conversion Cycle (Days Sales Outstanding + Days Inventory Outstanding - Days Payable Outstanding) lets you scale without dilutive equity funding or expensive bank debt.',
    actionItem: 'Review receivable aging and offer a 2% discount for 10-day invoice settlements to accelerate cash velocity.',
    quote: 'Revenue is vanity, profit is sanity, but cash is reality.',
  },
  {
    frameworkName: 'Break-Even Analysis',
    frameworkId: 'breakeven',
    category: 'Financial Performance',
    headline: 'Elevate contribution margin to insulate against downturns',
    tip: 'Your Margin of Safety measures how far sales can drop before the business burns cash. Lowering fixed overhead or shifting fixed costs to variable commissions dramatically drops the break-even volume threshold.',
    actionItem: 'Calculate your unit contribution margin ratio and identify fixed commitments that can convert to usage-based.',
    quote: 'A lean cost structure creates strategic optionality that no marketing campaign can match.',
  },
  {
    frameworkName: 'Kanban & WIP Limits',
    frameworkId: 'kanban',
    category: 'Operations & Process',
    headline: 'Stop starting and start finishing with strict WIP limits',
    tip: 'Multitasking across strategic initiatives creates invisible queues and degrades team throughput. By setting hard Work-in-Progress (WIP) caps, cycle times drop and strategic deliverables ship faster.',
    actionItem: 'Audit current active team projects. Force rank them and freeze the bottom 30% until top priorities deploy.',
    quote: 'Efficiency is doing things right; effectiveness is doing the right things.',
  },
  {
    frameworkName: 'Six Sigma DMAIC',
    frameworkId: 'sixsigma',
    category: 'Operations & Process',
    headline: 'Root out operational variance before scaling delivery volume',
    tip: 'Speed amplifies error. Before investing capital to double capacity, standardize the process and eliminate root-cause variation using DMAIC (Define, Measure, Analyze, Improve, Control).',
    actionItem: 'Identify the step in your fulfillment or onboarding workflow with the widest time variance and measure its standard deviation.',
    quote: 'In God we trust; all others must bring data.',
  },
  {
    frameworkName: 'Pirate Metrics (AARRR)',
    frameworkId: 'growthhacking',
    category: 'Marketing & Growth',
    headline: 'Fix retention leaky buckets before opening acquisition spigots',
    tip: 'Pumping marketing dollars into top-of-funnel acquisition when customer retention is flat is the most expensive mistake in business. A 5% boost in retention yields up to a 95% increase in lifetime customer profit.',
    actionItem: 'Calculate Day 30 and Day 90 cohort retention rates before approving next month’s ad spend budget.',
    quote: 'Retention is the single best indicator of true product-market fit.',
  },
  {
    frameworkName: 'Risk Matrix (5x5 Probability & Severity)',
    frameworkId: 'riskmatrix',
    category: 'Risk & Decision-Making',
    headline: 'Pre-mortem catastrophic tail risks before they materialize',
    tip: 'Executives systematically underweight low-probability, catastrophic-impact risks. High-severity threats require active mitigation triggers and predefined failover plans, not just passive insurance policies.',
    actionItem: 'Conduct a 20-minute leadership pre-mortem: assume our next initiative failed catastrophically 6 months from now and identify the root cause.',
    quote: 'To survive in strategy, you must first avoid zero. Any non-zero multiplier eventually yields compounding.',
  },
  {
    frameworkName: 'Strategic KPIs & Driver Trees',
    frameworkId: 'kpis',
    category: 'Data & Analytics',
    headline: 'Deconstruct lagging financial results into leading behavioral inputs',
    tip: 'You cannot manage lagging revenue directly; you can only manage the operational leading indicators (qualification rate, pipeline velocity, feature activation) that feed into the mathematical driver tree.',
    actionItem: 'Map your North Star metric down two tiers into the specific weekly team activities that directly shift it.',
    quote: 'What gets measured gets managed, but what gets modeled gets optimized.',
  },
];

// API Route: Get randomized Daily Business Strategy Insight
app.post('/api/gemini/daily-insight', async (req, res) => {
  const { topic, requestedCategory } = req.body || {};
  try {

    const prompt = `You are the executive strategy architect and curriculum mentor for BizTools (by Sundaresh Kamaraj).
Generate one randomized, highly relevant, and concise business strategy tip for an executive, founder, or strategist starting their workday.

The insight must be grounded in real-world business frameworks across the 10 core disciplines:
1. Strategy & Market Positioning (e.g. SWOT/TOWS, Porter's 5 Forces, Blue Ocean, Ansoff, VRIO, OKRs)
2. Business Model Innovation (e.g. Business Model Canvas, Lean Canvas, Value Proposition Canvas, Design Thinking, Jobs-to-be-Done)
3. Marketing & Growth (e.g. Marketing Mix 4Ps/7Ps, STP Segmentation, AIDA, Customer Journey, Growth Hacking Pirate Metrics, NPS)
4. Operations & Process Excellence (e.g. Lean 7 Wastes, Six Sigma DMAIC, Kaizen, VSM, Kanban WIP limits, Theory of Constraints)
5. Financial Performance (e.g. Break-Even, Cost-Benefit, Budget Variance, Working Capital Cash Conversion Cycle, DuPont ROE, ABC Costing)
6. Project Management (e.g. Gantt, CPM Critical Path, PERT, Agile Scrum)
7. HR & Organization (e.g. McKinsey 7S, RACI Matrix, Employee Net Promoter, Performance Appraisals)
8. Risk & Decision-Making (e.g. Risk Matrix 5x5, Decision Trees, Monte Carlo, Scenario Planning, Pareto 80/20)
9. Product & Startup (e.g. MVP Validation, Product Roadmaps, User Story Mapping, A/B Testing, Churn Cohorts)
10. Data & Analytics (e.g. Strategic KPIs & Driver Trees, Dashboard Design, Cohort Retention, Predictive Modeling)

${requestedCategory ? `Focus specifically on the category: "${requestedCategory}".` : 'Select a random inspiring framework.'}
${topic ? `Incorporate the context or theme: "${topic}".` : ''}

Ensure the tip is punchy, high-leverage, practical, and avoids generic platitudes or AI jargon.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an executive business strategy coach. You provide concise, high-impact business strategy insights with concrete actionable takeaways. Return valid JSON only.',
        temperature: 0.9,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            frameworkName: {
              type: Type.STRING,
              description: 'The exact business framework name (e.g., SWOT & TOWS Matrix, Blue Ocean Strategy, DuPont Analysis)',
            },
            frameworkId: {
              type: Type.STRING,
              description: 'Normalized identifier (e.g., swot, porter5, blueocean, ansoff, bmc, dupont, kanban, okr, riskmatrix, kpis)',
            },
            category: {
              type: Type.STRING,
              description: 'The strategy discipline (e.g., Strategy & Planning, Financial Performance, Operations)',
            },
            headline: {
              type: Type.STRING,
              description: 'Catchy, provocative executive insight headline (5-10 words)',
            },
            tip: {
              type: Type.STRING,
              description: 'Concise, practical explanation of the insight mechanism (2-3 sentences)',
            },
            actionItem: {
              type: Type.STRING,
              description: 'A concrete, actionable step the executive can take today (1 sentence)',
            },
            quote: {
              type: Type.STRING,
              description: 'A memorable strategic axiom or quote',
            },
          },
          required: ['frameworkName', 'frameworkId', 'category', 'headline', 'tip', 'actionItem', 'quote'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    const parsed = JSON.parse(text);
    return res.json({ success: true, insight: parsed, source: 'gemini-3.8-flash' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    // Return a random curated fallback, prioritizing requestedCategory if provided
    let pool = FALLBACK_INSIGHTS;
    if (requestedCategory) {
      const reqClean = requestedCategory.toLowerCase().trim().slice(0, 5);
      const filtered = FALLBACK_INSIGHTS.filter(item =>
        item.category.toLowerCase().includes(reqClean) ||
        item.category.toLowerCase().includes(requestedCategory.toLowerCase())
      );
      if (filtered.length > 0) pool = filtered;
    }
    const fallback = pool[Math.floor(Math.random() * pool.length)];
    return res.json({
      success: true,
      insight: fallback,
      source: 'curated-fallback',
      notice: 'Served curated executive insight',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In development mode, mount Vite dev server as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BizTools server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
