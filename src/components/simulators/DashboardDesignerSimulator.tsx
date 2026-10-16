import { useState, useMemo } from 'react';
import { LayoutDashboard, Sliders, Eye, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, ShieldCheck, Flame, HelpCircle, Layers, Building2, TrendingUp, Filter, Lock } from 'lucide-react';

interface ShowroomData {
  id: string;
  name: string;
  city: string;
  revenue: number; // in Lakhs
  target: number;
  margin: number; // %
  otif: number; // %
  stockDays: number;
  status: 'Green' | 'Amber' | 'Red';
  topIssue?: string;
}

const SHOWROOMS: ShowroomData[] = [
  { id: 'sh-1', name: 'Madurai West Masi St', city: 'Madurai', revenue: 68.5, target: 65.0, margin: 24.2, otif: 96, stockDays: 38, status: 'Green' },
  { id: 'sh-2', name: 'Madurai KK Nagar', city: 'Madurai', revenue: 52.0, target: 50.0, margin: 23.5, otif: 94, stockDays: 42, status: 'Green' },
  { id: 'sh-3', name: 'Coimbatore RS Puram', city: 'Coimbatore', revenue: 84.0, target: 80.0, margin: 25.1, otif: 95, stockDays: 35, status: 'Green' },
  { id: 'sh-4', name: 'Coimbatore Cross Cut', city: 'Coimbatore', revenue: 61.0, target: 65.0, margin: 21.8, otif: 89, stockDays: 52, status: 'Amber', topIssue: 'Inventory aging in washing machines' },
  { id: 'sh-5', name: 'Tirunelveli Town', city: 'Tirunelveli', revenue: 44.5, target: 48.0, margin: 20.2, otif: 87, stockDays: 64, status: 'Amber', topIssue: 'Slow festive footfall conversion' },
  { id: 'sh-6', name: 'Trichy Thillai Nagar', city: 'Trichy', revenue: 38.0, target: 46.0, margin: 18.4, otif: 79, stockDays: 78, status: 'Red', topIssue: 'Severe stock-out on fast-moving refrigerators; ₹28L slow stock >120 days' }
];

export function DashboardDesignerSimulator() {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [viewDesignMode, setViewDesignMode] = useState<'clean' | 'cluttered'>('clean');
  const [simulatedDateRange, setSimulatedDateRange] = useState<string>('W42 (Festival Peak)');
  const [userRole, setUserRole] = useState<'Owner' | 'ShowroomManager'>('Owner');

  // Filtered dataset based on role and branch
  const displayedShowrooms = useMemo(() => {
    if (userRole === 'ShowroomManager') {
      // restricted via RLS to Trichy
      return SHOWROOMS.filter(s => s.id === 'sh-6');
    }
    if (selectedBranch === 'all') return SHOWROOMS;
    return SHOWROOMS.filter(s => s.id === selectedBranch);
  }, [selectedBranch, userRole]);

  // Aggregate metrics
  const totals = useMemo(() => {
    const rev = displayedShowrooms.reduce((acc, s) => acc + s.revenue, 0);
    const tgt = displayedShowrooms.reduce((acc, s) => acc + s.target, 0);
    const avgMargin = (displayedShowrooms.reduce((acc, s) => acc + s.margin, 0) / displayedShowrooms.length).toFixed(1);
    const avgOtif = Math.round(displayedShowrooms.reduce((acc, s) => acc + s.otif, 0) / displayedShowrooms.length);
    const avgStockDays = Math.round(displayedShowrooms.reduce((acc, s) => acc + s.stockDays, 0) / displayedShowrooms.length);
    const variance = rev - tgt;

    return { rev, tgt, avgMargin, avgOtif, avgStockDays, variance };
  }, [displayedShowrooms]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-violet-700 uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>Pillar 10 · Executive Dashboard Studio (Stephen Few Principles)</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            One-Screen Executive Dashboard & Design Lab
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Compare Stephen Few’s high data-ink design against cluttered 3D anti-patterns. Toggle Row-Level Security and branch slicers.
          </p>
        </div>

        {/* Design Toggle & Role Switcher */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Design Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewDesignMode('clean')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewDesignMode === 'clean' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Clean Tufte Design
            </button>
            <button
              onClick={() => setViewDesignMode('cluttered')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewDesignMode === 'cluttered' ? 'bg-rose-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cluttered 3D Anti-Pattern
            </button>
          </div>

          {/* Role Switcher */}
          <button
            onClick={() => setUserRole(prev => prev === 'Owner' ? 'ShowroomManager' : 'Owner')}
            className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors border border-slate-200"
          >
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Role: {userRole === 'Owner' ? 'Owner (All)' : 'Manager (Trichy RLS)'}</span>
          </button>
        </div>
      </div>

      {/* Slicers & Context Header */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Showroom Slicer:</span>
          </div>
          {userRole === 'Owner' ? (
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold outline-none focus:ring-1 focus:ring-violet-600"
            >
              <option value="all">All Showrooms (6)</option>
              {SHOWROOMS.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.city})</option>
              ))}
            </select>
          ) : (
            <span className="font-mono text-3xs font-bold px-2 py-0.5 rounded bg-violet-100 text-violet-900">
              Restricted by RLS: Trichy Thillai Nagar
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-3xs text-slate-500 font-medium">
          <span>Reporting Period: <strong>{simulatedDateRange}</strong></span>
          <span>·</span>
          <span>Data Refreshed: <strong>Today, 06:00 AM (POS Nightly Sync)</strong></span>
        </div>
      </div>

      {/* VIEW MODE 1: CLEAN TUFTE / STEPHEN FEW ONE-SCREEN DESIGN */}
      {viewDesignMode === 'clean' ? (
        <div className="space-y-6">
          {/* Top Scorecard Row: 5 KPI Tiles (Z-Pattern Top-Left Priority) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Weekly Revenue</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 font-mono">₹{totals.rev.toFixed(1)}L</span>
                <span className={`text-3xs font-bold ${totals.variance >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {totals.variance >= 0 ? `+₹${totals.variance.toFixed(1)}L` : `-₹${Math.abs(totals.variance).toFixed(1)}L`}
                </span>
              </div>
              <span className="text-3xs text-slate-500 block mt-0.5">Target: ₹{totals.tgt.toFixed(1)}L</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Gross Margin %</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 font-mono">{totals.avgMargin}%</span>
                <span className="text-3xs font-bold text-emerald-700">Target ≥ 22%</span>
              </div>
              <span className="text-3xs text-slate-500 block mt-0.5">Prior Week: 21.4%</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">OTIF Delivery %</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className={`text-xl font-extrabold font-mono ${totals.avgOtif >= 90 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {totals.avgOtif}%
                </span>
                <span className="text-3xs font-bold text-slate-500">Target ≥ 95%</span>
              </div>
              <span className="text-3xs text-slate-500 block mt-0.5">Confirmed delivery lines</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Average Stock Days</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className={`text-xl font-extrabold font-mono ${totals.avgStockDays <= 45 ? 'text-slate-900' : 'text-amber-700'}`}>
                  {totals.avgStockDays}d
                </span>
                <span className="text-3xs font-bold text-slate-500">Target &lt; 45d</span>
              </div>
              <span className="text-3xs text-slate-500 block mt-0.5">Turnover velocity</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs col-span-2 sm:col-span-1">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Finance Penetration</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-violet-900 font-mono">38%</span>
                <span className="text-3xs font-bold text-emerald-700">+7% YoY</span>
              </div>
              <span className="text-3xs text-slate-500 block mt-0.5">NBFC consumer loans</span>
            </div>
          </div>

          {/* Middle Row: Trend Curve + Sorted Horizontal Bar Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 13-Week Trend Line (Tufte Clean Line) */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Weekly Sales Trajectory (Last 8 Weeks vs. Target)</h4>
                  <span className="text-3xs text-slate-500">Clean line chart without heavy gridlines or 3D decoration</span>
                </div>
                <span className="text-3xs font-mono font-bold text-slate-400">Values in ₹ Lakhs</span>
              </div>

              {/* Visual SVG line chart */}
              <div className="h-44 w-full flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-200">
                {[
                  { w: 'W35', rev: 42, tgt: 45 },
                  { w: 'W36', rev: 44, tgt: 45 },
                  { w: 'W37', rev: 46, tgt: 45 },
                  { w: 'W38', rev: 45, tgt: 46 },
                  { w: 'W39', rev: 49, tgt: 48 },
                  { w: 'W40', rev: 54, tgt: 50 },
                  { w: 'W41', rev: 61, tgt: 55 },
                  { w: 'W42', rev: Math.round(totals.rev), tgt: Math.round(totals.tgt) }
                ].map((item, idx) => {
                  const maxVal = 75;
                  const revHeight = (item.rev / maxVal) * 100;
                  const tgtHeight = (item.tgt / maxVal) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                      {/* Target dot marker */}
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 absolute z-10"
                        style={{ bottom: `${tgtHeight}%` }}
                        title={`Target: ₹${item.tgt}L`}
                      />
                      {/* Actual bar */}
                      <div
                        className={`w-full rounded-t transition-all ${
                          item.rev >= item.tgt ? 'bg-slate-800 group-hover:bg-violet-900' : 'bg-rose-600'
                        }`}
                        style={{ height: `${revHeight}%` }}
                      />
                      <span className="text-3xs text-slate-500 mt-2 font-mono">{item.w}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-3xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-slate-800 rounded-sm inline-block" /> Actual Sales (Grey = On/Above Target, Red = Below)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full inline-block" /> Target Marker
                </span>
              </div>
            </div>

            {/* Sorted Horizontal Bar Chart (Stephen Few Best Practice) */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Showroom Revenue Ranking (Sorted Descending)</h4>
                  <span className="text-3xs text-slate-500">Horizontal bars enable easy label reading without tilted fonts</span>
                </div>
                <span className="text-3xs font-mono font-bold text-slate-400">Target Marker: |</span>
              </div>

              <div className="space-y-2.5 pt-1">
                {[...displayedShowrooms].sort((a, b) => b.revenue - a.revenue).map((s) => {
                  const maxBar = 90;
                  const barPct = (s.revenue / maxBar) * 100;
                  const tgtPct = (s.target / maxBar) * 100;
                  const isRed = s.revenue < s.target;
                  return (
                    <div key={s.id} className="space-y-1">
                      <div className="flex justify-between text-3xs font-bold">
                        <span className="text-slate-800 truncate">{s.name}</span>
                        <span className="font-mono text-slate-700">₹{s.revenue}L / ₹{s.target}L</span>
                      </div>
                      <div className="w-full h-3.5 bg-slate-100 rounded relative overflow-hidden">
                        <div
                          className={`h-full rounded ${isRed ? 'bg-rose-500' : 'bg-slate-700'}`}
                          style={{ width: `${barPct}%` }}
                        />
                        {/* Target Marker */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                          style={{ left: `${tgtPct}%` }}
                          title={`Target: ₹${s.target}L`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Row: Exceptions Table (Top Issues Triggering Action) */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold text-slate-900">Exception & Stock Bottlenecks (Action Items Only)</h4>
              </div>
              <span className="text-3xs text-slate-500">Showing locations requiring management intervention</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-3xs font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="py-2">Showroom</th>
                    <th className="py-2">City</th>
                    <th className="py-2">Revenue Var.</th>
                    <th className="py-2">OTIF</th>
                    <th className="py-2">Stock Days</th>
                    <th className="py-2">Critical Bottleneck Issue</th>
                    <th className="py-2">Action Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-3xs">
                  {displayedShowrooms.filter(s => s.status !== 'Green').map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-bold text-slate-900">{s.name}</td>
                      <td className="py-2.5 text-slate-600">{s.city}</td>
                      <td className="py-2.5 font-bold text-rose-700">₹{(s.revenue - s.target).toFixed(1)}L</td>
                      <td className="py-2.5 font-mono">{s.otif}%</td>
                      <td className="py-2.5 font-mono font-bold text-amber-800">{s.stockDays}d</td>
                      <td className="py-2.5 text-slate-700 font-medium">{s.topIssue}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-900 border border-rose-200 font-bold">
                          {s.id === 'sh-6' ? 'Trigger Inter-Store Transfer' : 'Audit Onboarding'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {displayedShowrooms.every(s => s.status === 'Green') && (
                    <tr>
                      <td colSpan={7} className="py-4 text-center text-slate-500">
                        All selected showrooms are currently operating within green thresholds.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: CLUTTERED 3D ANTI-PATTERN (WHAT TO AVOID) */
        <div className="p-6 bg-rose-50/30 border-2 border-dashed border-rose-300 rounded-xl space-y-5">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>Anti-Pattern Warning: Common Dashboard Design Mistakes (Example 3 from Training Guide)</span>
          </div>
          <p className="text-xs text-rose-800">
            This demonstrates what many SMEs build: rainbow colors, decorative gauges, 3D slices, and raw unprioritized counts. The human eye cannot determine what is urgent in under 60 seconds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-md text-center space-y-2">
              <span className="text-3xs font-extrabold uppercase text-slate-600">3D Rainbow Pie Chart</span>
              <div className="w-28 h-28 mx-auto rounded-full border-8 border-t-amber-400 border-r-rose-400 border-b-cyan-400 border-l-emerald-400 shadow-lg transform rotate-45" />
              <p className="text-3xs text-rose-700 font-semibold">14 categories in rainbow slices with legend at bottom: impossible to compare!</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-md text-center space-y-2">
              <span className="text-3xs font-extrabold uppercase text-slate-600">Decorative Speedometer Gauge</span>
              <div className="w-32 h-16 mx-auto border-t-8 border-x-8 border-b-0 border-indigo-600 rounded-t-full shadow-inner relative flex items-center justify-center">
                <div className="w-1 h-12 bg-rose-600 transform rotate-12 origin-bottom" />
              </div>
              <p className="text-3xs text-rose-700 font-semibold">Consumes 25% of the screen to communicate only one static number without trend.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-md text-center space-y-2">
              <span className="text-3xs font-extrabold uppercase text-slate-600">Unfiltered 40-Tab Grid</span>
              <div className="text-2xs font-mono text-slate-400 border p-2 rounded bg-slate-50 space-y-1 text-left">
                <div>Row 1: 49302 ... NULL</div>
                <div>Row 2: 29482 ... ₹12,940</div>
                <div>Row 3: Error: #DIV/0!</div>
              </div>
              <p className="text-3xs text-rose-700 font-semibold">Dumps raw tables without targets or variance comparisons.</p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setViewDesignMode('clean')}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Switch Back to Clean Tufte / Stephen Few Design
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
