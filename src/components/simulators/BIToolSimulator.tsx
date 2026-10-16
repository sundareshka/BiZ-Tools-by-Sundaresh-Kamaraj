import { useState, useMemo } from 'react';
import { Database, Sliders, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, ShieldCheck, Sparkles, Building2, Eye, Lock, Layers, Code, DollarSign, Calculator } from 'lucide-react';

interface StarTable {
  name: string;
  type: 'Fact' | 'Dimension';
  key: string;
  columns: string[];
}

const STAR_TABLES: StarTable[] = [
  {
    name: 'Sales Lines',
    type: 'Fact',
    key: 'SalesLineID',
    columns: ['DateKey (FK)', 'CustomerKey (FK)', 'ProductKey (FK)', 'BranchKey (FK)', 'Quantity', 'NetAmount', 'Cost']
  },
  {
    name: 'Dim_Date',
    type: 'Dimension',
    key: 'DateKey',
    columns: ['Date', 'Month', 'Quarter', 'FiscalYear (April–March)', 'FestivalFlag']
  },
  {
    name: 'Dim_Customer',
    type: 'Dimension',
    key: 'CustomerKey',
    columns: ['CustomerType', 'City', 'State', 'AcquisitionSource']
  },
  {
    name: 'Dim_Product',
    type: 'Dimension',
    key: 'ProductKey',
    columns: ['ProductName', 'Category', 'Brand', 'PriceBand']
  },
  {
    name: 'Dim_Branch',
    type: 'Dimension',
    key: 'BranchKey',
    columns: ['BranchName', 'Region', 'BranchManagerEmail']
  }
];

export function BIToolSimulator() {
  const [activeTab, setActiveTab] = useState<'starSchema' | 'dax' | 'rls' | 'tco'>('starSchema');

  // DAX measure tester state
  const [salesGross, setSalesGross] = useState<number>(5800000); // ₹58 Lakh
  const [salesCost, setSalesCost] = useState<number>(4400000); // ₹44 Lakh
  const [salesLY, setSalesLY] = useState<number>(4900000); // ₹49 Lakh last year

  // RLS active user simulation
  const [activeUserRole, setActiveUserRole] = useState<'Leadership' | 'MaduraiManager' | 'CoimbatoreManager'>('Leadership');

  // TCO Calculator State (Page 48 Example 4)
  const [userHeadcount, setUserHeadcount] = useState<number>(60);
  const [creatorCount, setCreatorCount] = useState<number>(3);

  // DAX measures calculation
  const daxMetrics = useMemo(() => {
    const revenue = salesGross;
    const cost = salesCost;
    const grossMarginRupees = revenue - cost;
    const grossMarginPct = revenue > 0 ? ((grossMarginRupees / revenue) * 100).toFixed(1) : '0.0';
    const growthPct = salesLY > 0 ? (((revenue - salesLY) / salesLY) * 100).toFixed(1) : '0.0';

    return { revenue, cost, grossMarginRupees, grossMarginPct, growthPct };
  }, [salesGross, salesCost, salesLY]);

  // RLS simulated rows
  const simulatedRows = [
    { branch: 'Madurai West Masi St', region: 'South', sales: '₹14.2L', manager: 'madurai.mgr@firm.com' },
    { branch: 'Madurai KK Nagar', region: 'South', sales: '₹11.8L', manager: 'madurai.mgr@firm.com' },
    { branch: 'Coimbatore RS Puram', region: 'West', sales: '₹18.5L', manager: 'coimbatore.mgr@firm.com' },
    { branch: 'Coimbatore Cross Cut', region: 'West', sales: '₹13.5L', manager: 'coimbatore.mgr@firm.com' }
  ];

  const visibleRows = useMemo(() => {
    if (activeUserRole === 'Leadership') return simulatedRows;
    if (activeUserRole === 'MaduraiManager') return simulatedRows.filter(r => r.manager === 'madurai.mgr@firm.com');
    if (activeUserRole === 'CoimbatoreManager') return simulatedRows.filter(r => r.manager === 'coimbatore.mgr@firm.com');
    return simulatedRows;
  }, [activeUserRole]);

  // TCO Calculations
  const tcoCosts = useMemo(() => {
    const viewerCount = Math.max(0, userHeadcount - creatorCount);

    // Power BI: Creator ($14) + Viewer ($14) in Pro
    const powerBiAnnualUSD = (creatorCount * 14 + viewerCount * 14) * 12;
    const powerBiINR = (powerBiAnnualUSD * 86).toLocaleString();

    // Zoho Analytics: Organization tier (e.g. ₹4,000/mo base for up to 50 users + add-ons)
    const zohoAnalyticsINR = (6500 * 12).toLocaleString();

    // Metabase Open Source: Self-hosted server ($50/mo VM)
    const metabaseINR = (50 * 12 * 86).toLocaleString();

    return { powerBiINR, zohoAnalyticsINR, metabaseINR, viewerCount };
  }, [userHeadcount, creatorCount]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-violet-700 uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>Pillar 10 · Enterprise BI Data Modeling Studio</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Star-Schema Architecture, DAX & Row-Level Security
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Model relational fact & dimension tables, test certified DAX measures, simulate Row-Level Security (RLS), and audit BI Total Cost of Ownership.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0 flex-wrap">
          <button
            onClick={() => setActiveTab('starSchema')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'starSchema' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Star Schema Model
          </button>
          <button
            onClick={() => setActiveTab('dax')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'dax' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            DAX Measures
          </button>
          <button
            onClick={() => setActiveTab('rls')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'rls' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Row-Level Security (RLS)
          </button>
          <button
            onClick={() => setActiveTab('tco')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'tco' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            TCO Calculator
          </button>
        </div>
      </div>

      {/* TAB 1: STAR SCHEMA ARCHITECTURE */}
      {activeTab === 'starSchema' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-violet-700" />
              <span>Dimensional Data Modeling: Star Schema Architecture (Page 48 Example 1)</span>
            </span>
            <p>
              A central quantitative <strong>Fact Table</strong> (recording business events) is connected via one-to-many foreign keys to surrounding descriptive <strong>Dimension Tables</strong>. Note the dedicated Date dimension supporting India’s April–March financial year.
            </p>
          </div>

          {/* Visual Star Schema Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Left Dimension Tables */}
            <div className="space-y-4">
              <div className="p-3.5 bg-white border-2 border-violet-200 rounded-xl shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-violet-950">
                  <span>Dim_Customer</span>
                  <span className="text-3xs bg-violet-100 text-violet-800 px-1.5 py-0.2 rounded font-mono">PK: CustomerKey</span>
                </div>
                <div className="text-3xs font-mono text-slate-500 space-y-0.5">
                  <div>· CustomerType (Retail / B2B)</div>
                  <div>· City & State</div>
                  <div>· AcquisitionSource</div>
                </div>
              </div>

              <div className="p-3.5 bg-white border-2 border-violet-200 rounded-xl shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-violet-950">
                  <span>Dim_Product</span>
                  <span className="text-3xs bg-violet-100 text-violet-800 px-1.5 py-0.2 rounded font-mono">PK: ProductKey</span>
                </div>
                <div className="text-3xs font-mono text-slate-500 space-y-0.5">
                  <div>· Category (Silk, Cotton, Synthetics)</div>
                  <div>· Brand & DesignCode</div>
                  <div>· PriceBand</div>
                </div>
              </div>
            </div>

            {/* Central Fact Table */}
            <div className="p-5 bg-violet-900 text-white rounded-2xl shadow-md border-2 border-violet-950 space-y-3 text-center">
              <div className="inline-block bg-violet-800 text-violet-200 text-3xs font-extrabold uppercase px-2 py-0.5 rounded">
                Central Fact Table (1-to-Many)
              </div>
              <h3 className="text-base font-extrabold tracking-tight">Fact_SalesLines</h3>
              <p className="text-3xs text-violet-200">
                Holds granular transaction line items with numeric metrics for aggregation.
              </p>
              <div className="text-2xs font-mono bg-violet-950/60 p-2.5 rounded-lg text-left space-y-1 text-violet-200">
                <div>🔑 SalesLineID (PK)</div>
                <div>🔗 DateKey (FK)</div>
                <div>🔗 CustomerKey (FK)</div>
                <div>🔗 ProductKey (FK)</div>
                <div>🔗 BranchKey (FK)</div>
                <div className="text-amber-300 font-bold">∑ Quantity, NetAmount, Cost</div>
              </div>
            </div>

            {/* Right Dimension Tables */}
            <div className="space-y-4">
              <div className="p-3.5 bg-white border-2 border-violet-200 rounded-xl shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-violet-950">
                  <span>Dim_Date</span>
                  <span className="text-3xs bg-violet-100 text-violet-800 px-1.5 py-0.2 rounded font-mono">PK: DateKey</span>
                </div>
                <div className="text-3xs font-mono text-slate-500 space-y-0.5">
                  <div>· Date, Month, Quarter</div>
                  <div className="text-emerald-700 font-bold">· FiscalYear (April–March)</div>
                  <div>· FestivalFlag (Deepavali, Pongal)</div>
                </div>
              </div>

              <div className="p-3.5 bg-white border-2 border-violet-200 rounded-xl shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-violet-950">
                  <span>Dim_Branch</span>
                  <span className="text-3xs bg-violet-100 text-violet-800 px-1.5 py-0.2 rounded font-mono">PK: BranchKey</span>
                </div>
                <div className="text-3xs font-mono text-slate-500 space-y-0.5">
                  <div>· BranchName & Region</div>
                  <div className="text-violet-800 font-bold">· BranchManagerEmail (for RLS)</div>
                  <div>· SquareFootage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DAX MEASURES TESTER */}
      {activeTab === 'dax' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-violet-700" />
              <span>Certified Reusable Measures (Power BI DAX from Guide Example 2)</span>
            </span>
            <p>
              Measures are authored once in the central semantic data model using defensive formulas like <code>DIVIDE()</code> to avoid #DIV/0! application crashes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Simulate Financial Inputs</h4>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Total Net Sales (SUM(Sales[NetAmount])):</span>
                  <span className="font-mono text-violet-900">₹{(salesGross / 100000).toFixed(1)}L</span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="10000000"
                  step="200000"
                  value={salesGross}
                  onChange={(e) => setSalesGross(parseInt(e.target.value))}
                  className="w-full accent-violet-700"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Cost of Goods Sold (SUM(Sales[Cost])):</span>
                  <span className="font-mono text-violet-900">₹{(salesCost / 100000).toFixed(1)}L</span>
                </div>
                <input
                  type="range"
                  min="1500000"
                  max="8000000"
                  step="200000"
                  value={salesCost}
                  onChange={(e) => setSalesCost(parseInt(e.target.value))}
                  className="w-full accent-violet-700"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Prior Year Revenue (Revenue LY):</span>
                  <span className="font-mono text-violet-900">₹{(salesLY / 100000).toFixed(1)}L</span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="8000000"
                  step="200000"
                  value={salesLY}
                  onChange={(e) => setSalesLY(parseInt(e.target.value))}
                  className="w-full accent-violet-700"
                />
              </div>
            </div>

            <div className="bg-slate-900 text-white p-5 rounded-xl space-y-3 font-mono text-xs">
              <h4 className="text-3xs font-extrabold uppercase text-violet-400 tracking-wider font-sans">
                Live DAX Measure Evaluation Output
              </h4>

              <div className="p-3 bg-slate-800 rounded-lg space-y-1 border border-slate-700">
                <span className="text-3xs text-slate-400 font-sans block">Gross Margin % = DIVIDE([Revenue] - [Cost], [Revenue])</span>
                <span className="text-xl font-extrabold text-emerald-400">{daxMetrics.grossMarginPct}%</span>
                <span className="text-3xs text-slate-400 block font-sans">
                  Margin: ₹{(daxMetrics.grossMarginRupees / 100000).toFixed(2)} Lakhs
                </span>
              </div>

              <div className="p-3 bg-slate-800 rounded-lg space-y-1 border border-slate-700">
                <span className="text-3xs text-slate-400 font-sans block">Revenue Growth % = DIVIDE([Revenue] - [Revenue LY], [Revenue LY])</span>
                <span className={`text-xl font-extrabold ${parseFloat(daxMetrics.growthPct) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {parseFloat(daxMetrics.growthPct) >= 0 ? `+${daxMetrics.growthPct}%` : `${daxMetrics.growthPct}%`}
                </span>
                <span className="text-3xs text-slate-400 block font-sans">
                  YoY growth calculated using SAMEPERIODLASTYEAR
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ROW-LEVEL SECURITY SIMULATOR (PAGE 48 EXAMPLE 3) */}
      {activeTab === 'rls' && (
        <div className="space-y-6">
          <div className="p-4 bg-violet-50/60 border border-violet-200 rounded-xl text-xs text-violet-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-violet-700" />
              <span>Row-Level Security (RLS) Filter Engine</span>
            </span>
            <p>
              A single central report can serve hundreds of users safely. RLS filters database rows dynamically using the signed-in user's credentials (<code>Branch[ManagerEmail] = USERPRINCIPALNAME()</code>).
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-700">Simulate Signed-In User Role:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveUserRole('Leadership')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  activeUserRole === 'Leadership' ? 'bg-violet-900 text-white font-bold' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Leadership (No Filter - All 4 Showrooms)
              </button>
              <button
                onClick={() => setActiveUserRole('MaduraiManager')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  activeUserRole === 'MaduraiManager' ? 'bg-violet-900 text-white font-bold' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Madurai Manager (South Region Only)
              </button>
              <button
                onClick={() => setActiveUserRole('CoimbatoreManager')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  activeUserRole === 'CoimbatoreManager' ? 'bg-violet-900 text-white font-bold' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Coimbatore Manager (West Region Only)
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-3xs font-extrabold text-slate-500 uppercase">
                <tr>
                  <th className="py-2.5 px-4">Showroom Branch</th>
                  <th className="py-2.5 px-4">Region</th>
                  <th className="py-2.5 px-4">Assigned Manager Email</th>
                  <th className="py-2.5 px-4">Weekly Sales</th>
                  <th className="py-2.5 px-4">RLS Filter Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-3xs">
                {visibleRows.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{r.branch}</td>
                    <td className="py-2.5 px-4 text-slate-600">{r.region}</td>
                    <td className="py-2.5 px-4 font-mono text-violet-800">{r.manager}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{r.sales}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold">
                        Authorized & Visible
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: TCO CALCULATOR (PAGE 48–49) */}
      {activeTab === 'tco' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-violet-700" />
              <span>Total Cost of Ownership (TCO) Calculator</span>
            </span>
            <p>
              Sundaresh Kamaraj's Golden Rule: <em>"In per-user models, every person who views shared content needs a license. Count viewers, not just report builders."</em>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Organization Scale Parameters</h4>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Total Report Consumers (Viewers + Creators):</span>
                  <span className="font-mono text-violet-900">{userHeadcount} Users</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={userHeadcount}
                  onChange={(e) => setUserHeadcount(parseInt(e.target.value))}
                  className="w-full accent-violet-700"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Report Builders / Creators:</span>
                  <span className="font-mono text-violet-900">{creatorCount} Analysts</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={creatorCount}
                  onChange={(e) => setCreatorCount(parseInt(e.target.value))}
                  className="w-full accent-violet-700"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-3xs text-slate-600">
                View-Only Consumers: <strong>{tcoCosts.viewerCount} managers</strong> requiring shared access.
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Estimated Annual Software Licensing TCO</h4>

              <div className="p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900">Microsoft Power BI Pro ($14/user/mo)</span>
                  <span className="font-mono text-violet-900">₹{tcoCosts.powerBiINR} / yr</span>
                </div>
                <p className="text-3xs text-slate-500">Requires paid license for all {userHeadcount} users (creators and viewers).</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900">Zoho Analytics (Organization Tier)</span>
                  <span className="font-mono text-emerald-800">₹{tcoCosts.zohoAnalyticsINR} / yr</span>
                </div>
                <p className="text-3xs text-slate-500">Priced per organization with user tiers; economical for high viewer ratios.</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900">Metabase (Self-Hosted Open Source)</span>
                  <span className="font-mono text-slate-800">₹{tcoCosts.metabaseINR} / yr</span>
                </div>
                <p className="text-3xs text-slate-500">Zero license fee for unlimited viewers; cost represents cloud VM server hosting.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
