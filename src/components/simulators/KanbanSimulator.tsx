import { useState } from 'react';
import { Kanban, Sparkles, RotateCcw, Plus, AlertTriangle, ArrowRight, CheckCircle2, Sliders, Activity } from 'lucide-react';

interface KanbanCard {
  id: string;
  title: string;
  serviceClass: 'Expedite' | 'Fixed-Date' | 'Standard';
  assignee: string;
  cycleDays: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  wipLimit: number;
  cards: KanbanCard[];
}

export function KanbanSimulator() {
  const [activeTab, setActiveTab] = useState<'board' | 'littleslaw' | 'cfd'>('board');

  // Board State
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'backlog',
      title: 'Prioritized Backlog',
      wipLimit: 12,
      cards: [
        { id: 'c-1', title: 'Export PDF invoices module', serviceClass: 'Standard', assignee: 'Karthik', cycleDays: 0 },
        { id: 'c-2', title: 'Payment gateway webhook retry', serviceClass: 'Standard', assignee: 'Priya', cycleDays: 0 },
        { id: 'c-3', title: 'Audit log indexing optimization', serviceClass: 'Standard', assignee: 'Suresh', cycleDays: 0 }
      ]
    },
    {
      id: 'ready',
      title: 'Ready for Dev',
      wipLimit: 4,
      cards: [
        { id: 'c-4', title: 'GST e-invoicing schema upgrade', serviceClass: 'Fixed-Date', assignee: 'Karthik', cycleDays: 1 },
        { id: 'c-5', title: 'Biometric device USB SDK integration', serviceClass: 'Standard', assignee: 'Priya', cycleDays: 2 }
      ]
    },
    {
      id: 'active',
      title: 'In Progress (Active Work)',
      wipLimit: 3,
      cards: [
        { id: 'c-6', title: 'Server CPU spike on batch payroll', serviceClass: 'Expedite', assignee: 'Senior Architect', cycleDays: 4 },
        { id: 'c-7', title: 'Multi-branch stock transfer approval', serviceClass: 'Standard', assignee: 'Anand', cycleDays: 6 }
      ]
    },
    {
      id: 'verify',
      title: 'Quality Verification & Peer Review',
      wipLimit: 2,
      cards: [
        { id: 'c-8', title: 'Student admission fee receipt printing', serviceClass: 'Standard', assignee: 'QA Lead', cycleDays: 3 }
      ]
    },
    {
      id: 'done',
      title: 'Done / Deployed',
      wipLimit: 999,
      cards: [
        { id: 'c-9', title: 'WhatsApp template notification API', serviceClass: 'Standard', assignee: 'Priya', cycleDays: 4 },
        { id: 'c-10', title: 'Mobile responsive navbar fix', serviceClass: 'Standard', assignee: 'Karthik', cycleDays: 2 }
      ]
    }
  ]);

  // Little's Law State
  const [wipItems, setWipItems] = useState<number>(24);
  const [throughputPerWeek, setThroughputPerWeek] = useState<number>(6); // items per week

  const handleMoveCard = (cardId: string, currentColId: string, direction: 'forward' | 'backward') => {
    const colOrder = ['backlog', 'ready', 'active', 'verify', 'done'];
    const currentIdx = colOrder.indexOf(currentColId);
    const targetIdx = direction === 'forward' ? currentIdx + 1 : currentIdx - 1;

    if (targetIdx < 0 || targetIdx >= colOrder.length) return;
    const targetColId = colOrder[targetIdx];

    setColumns(prev => {
      let cardToMove: KanbanCard | null = null;
      const newCols = prev.map(c => {
        if (c.id === currentColId) {
          cardToMove = c.cards.find(item => item.id === cardId) || null;
          return { ...c, cards: c.cards.filter(item => item.id !== cardId) };
        }
        return c;
      });

      if (!cardToMove) return prev;

      return newCols.map(c => {
        if (c.id === targetColId) {
          return { ...c, cards: [...c.cards, cardToMove!] };
        }
        return c;
      });
    });
  };

  const handleUpdateWipLimit = (colId: string, newLimit: number) => {
    setColumns(prev => prev.map(c => c.id === colId ? { ...c, wipLimit: Math.max(1, newLimit) } : c));
  };

  const handleLoadKodaiCase = () => {
    setWipItems(12); // Reduced from 38
    setThroughputPerWeek(8);
    setColumns(prev => prev.map(c => {
      if (c.id === 'active') return { ...c, wipLimit: 3 };
      if (c.id === 'ready') return { ...c, wipLimit: 3 };
      if (c.id === 'verify') return { ...c, wipLimit: 2 };
      return c;
    }));
  };

  const handleReset = () => {
    setWipItems(25);
    setThroughputPerWeek(5);
  };

  // Little's Law Calculation: Cycle Time = WIP / Throughput (in weeks)
  const averageCycleTimeWeeks = (wipItems / Math.max(1, throughputPerWeek)).toFixed(1);
  const averageCycleTimeDays = (parseFloat(averageCycleTimeWeeks) * 5).toFixed(1); // 5 working days/week

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 mb-2">
              <Kanban className="w-3.5 h-3.5" />
              <span>Operations & Process Framework #6</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Kanban Flow & Pull System Simulator</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Visualize work in progress, enforce strict WIP limits to prevent multitasking burnout, and optimize cycle time using Little's Law.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleLoadKodaiCase}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-300 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Case Study: Kodai Digital (WIP Limit 3)</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('board')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ${
              activeTab === 'board'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Interactive Kanban Board & WIP Limits
          </button>
          <button
            onClick={() => setActiveTab('littleslaw')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              activeTab === 'littleslaw'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Little's Law Cycle Time Calculator
          </button>
          <button
            onClick={() => setActiveTab('cfd')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              activeTab === 'cfd'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Cumulative Flow Diagram (CFD) Visualizer
          </button>
        </div>
      </div>

      {/* TAB 1: KANBAN BOARD */}
      {activeTab === 'board' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-800">
              Rule of Pull: Never push work downstream. Move cards forward only when downstream column has an open WIP slot.
            </span>
            <span className="text-2xs text-slate-400">Use arrow buttons on cards to transition states</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {columns.map(col => {
              const isOverWip = col.id !== 'done' && col.cards.length > col.wipLimit;
              const isAtCapacity = col.id !== 'done' && col.cards.length === col.wipLimit;

              return (
                <div
                  key={col.id}
                  className={`rounded-xl border flex flex-col transition-all ${
                    isOverWip
                      ? 'bg-red-50/60 border-red-300 ring-2 ring-red-400/30'
                      : isAtCapacity
                      ? 'bg-amber-50/40 border-amber-300'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  {/* Column Header */}
                  <div className="p-3 border-b border-slate-200/80">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{col.title}</h4>
                      {col.id !== 'done' && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdateWipLimit(col.id, col.wipLimit - 1)}
                            className="w-4 h-4 rounded bg-slate-200 text-slate-700 text-3xs font-bold flex items-center justify-center hover:bg-slate-300"
                          >
                            -
                          </button>
                          <span className="text-3xs font-mono font-bold text-slate-600">Limit: {col.wipLimit}</span>
                          <button
                            onClick={() => handleUpdateWipLimit(col.id, col.wipLimit + 1)}
                            className="w-4 h-4 rounded bg-slate-200 text-slate-700 text-3xs font-bold flex items-center justify-center hover:bg-slate-300"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-2xs font-mono font-bold px-2 py-0.5 rounded ${
                        isOverWip
                          ? 'bg-red-600 text-white'
                          : isAtCapacity
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {col.cards.length} {col.id !== 'done' ? `/ ${col.wipLimit} WIP` : 'Items'}
                      </span>
                      {isOverWip && (
                        <span className="text-3xs font-bold uppercase text-red-700 flex items-center gap-0.5">
                          <AlertTriangle className="w-3 h-3" /> Over WIP!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cards List */}
                  <div className="p-2 space-y-2 flex-1 min-h-[220px]">
                    {col.cards.map(card => (
                      <div
                        key={card.id}
                        className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-violet-300 transition-colors space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-3xs font-extrabold uppercase px-1.5 py-0.5 rounded ${
                            card.serviceClass === 'Expedite'
                              ? 'bg-red-100 text-red-700'
                              : card.serviceClass === 'Fixed-Date'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {card.serviceClass}
                          </span>
                          <span className="text-3xs font-mono text-slate-400">{card.assignee}</span>
                        </div>

                        <h5 className="text-xs font-semibold text-slate-900 leading-snug">{card.title}</h5>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <span className="text-3xs text-slate-400 font-mono">
                            {card.cycleDays > 0 ? `${card.cycleDays}d in stage` : 'New'}
                          </span>

                          <div className="flex items-center gap-1">
                            {col.id !== 'backlog' && (
                              <button
                                onClick={() => handleMoveCard(card.id, col.id, 'backward')}
                                className="px-1.5 py-0.5 text-3xs font-bold bg-slate-100 text-slate-600 rounded hover:bg-slate-200"
                                title="Move backward"
                              >
                                ←
                              </button>
                            )}
                            {col.id !== 'done' && (
                              <button
                                onClick={() => handleMoveCard(card.id, col.id, 'forward')}
                                className="px-1.5 py-0.5 text-3xs font-bold bg-violet-600 text-white rounded hover:bg-violet-700"
                                title="Pull forward"
                              >
                                →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {col.cards.length === 0 && (
                      <div className="h-full flex items-center justify-center p-4 text-center">
                        <span className="text-2xs text-slate-400 italic">Open capacity available under WIP limit</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LITTLE'S LAW */}
      {activeTab === 'littleslaw' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-violet-600" />
                <span>Queuing Variables</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Total Work-in-Progress (WIP)</label>
                    <span className="text-xs font-mono font-bold text-violet-700">{wipItems} tasks</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={wipItems}
                    onChange={(e) => setWipItems(parseInt(e.target.value))}
                    className="w-full accent-violet-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-2xs text-slate-400">Total active uncompleted mandates across all workers</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Team Throughput (TH)</label>
                    <span className="text-xs font-mono font-bold text-emerald-700">{throughputPerWeek} completed/week</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="1"
                    value={throughputPerWeek}
                    onChange={(e) => setThroughputPerWeek(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-2xs text-slate-400">Number of tasks finished and shipped per 5-day week</span>
                </div>
              </div>

              <div className="p-3 bg-violet-50 rounded-lg border border-violet-200 text-2xs text-violet-900">
                <strong>Little's Law Formula:</strong> Cycle Time = WIP ÷ Throughput. If you double WIP without changing throughput, cycle time strictly doubles!
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Predicted Lead & Cycle Time</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold font-mono text-violet-700">{averageCycleTimeDays}</span>
                  <span className="text-base font-semibold text-slate-600">Working Days ({averageCycleTimeWeeks} Weeks)</span>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Operational Insight:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When employees juggle <strong className="text-slate-900">{wipItems} concurrent tasks</strong>, each ticket must wait in line for attention, stretching customer wait time to <strong className="text-slate-900">{averageCycleTimeDays} days</strong>.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    By lowering WIP to 12 items via strict WIP limits, average cycle time automatically drops to <strong>{(12 / throughputPerWeek * 5).toFixed(1)} days</strong> with zero added payroll or working hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CFD VISUALIZER */}
      {activeTab === 'cfd' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-violet-600" />
                  <span>Cumulative Flow Diagram (CFD) Anatomy</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">The primary Kanban diagnostic chart tracking stability, bottlenecks, and lead time trends.</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-violet-50 text-violet-700 border border-violet-200">
                Flow Metric
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-2xs font-bold text-violet-700 uppercase">1. Vertical Distance</span>
                <h4 className="text-sm font-bold text-slate-900">Total Work-in-Progress (WIP)</h4>
                <p className="text-xs text-slate-600">
                  The vertical gap between the top arrival line and bottom completion line shows exactly how many tasks are trapped in the pipeline at any given date.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-2xs font-bold text-amber-700 uppercase">2. Horizontal Distance</span>
                <h4 className="text-sm font-bold text-slate-900">Average Approximate Cycle Time</h4>
                <p className="text-xs text-slate-600">
                  The horizontal line from when a task entered "In Progress" to when it crosses "Done" reveals actual elapsed customer delivery time.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-2xs font-bold text-red-700 uppercase">3. Band Widening</span>
                <h4 className="text-sm font-bold text-slate-900">Bottleneck Alarm Signal</h4>
                <p className="text-xs text-slate-600">
                  If an individual color band expands over time, work is piling up in front of that stage faster than downstream workers can pull it.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
