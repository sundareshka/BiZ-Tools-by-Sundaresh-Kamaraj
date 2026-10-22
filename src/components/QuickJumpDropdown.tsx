import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  CheckCircle2,
  X,
  Compass,
  Check
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { getToolIcon } from '../data/toolIcons.ts';

interface QuickJumpDropdownProps {
  tools: ToolDefinition[];
  selectedToolId: string;
  onSelectTool: (toolId: string) => void;
  isSimulatorDone?: (toolId: string) => boolean;
  isQuizDone?: (toolId: string) => boolean;
}

export function QuickJumpDropdown({
  tools,
  selectedToolId,
  onSelectTool,
  isSimulatorDone = () => false,
  isQuizDone = () => false,
}: QuickJumpDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentTool = tools.find((t) => t.id === selectedToolId) || tools[0];
  const CurrentIcon = currentTool?.icon || getToolIcon(currentTool?.id || 'swot');
  const currentIdx = tools.findIndex((t) => t.id === selectedToolId) + 1;

  // Close on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Pillar groupings for clean structured navigation
  const pillarGroups = useMemo(() => {
    const pillars = [
      { name: '1. Strategy & Market Positioning', key: 'Strategy' },
      { name: '2. Business Model Innovation', key: 'Innovation' },
      { name: '3. Marketing & Growth', key: 'Marketing' },
      { name: '4. Operations & Process Excellence', key: 'Operations' },
      { name: '5. Financial Performance', key: 'Financial' },
      { name: '6. Project Management', key: 'Project' },
      { name: '7. HR & Organization', key: 'HR' },
      { name: '8. Risk & Decision Architecture', key: 'Risk' },
      { name: '9. Product Strategy & Startup', key: 'Product' },
      { name: '10. Data & Advanced Analytics', key: 'Analytics' },
    ];

    return pillars.map((p) => ({
      name: p.name,
      tools: tools.filter((t) => t.category.toLowerCase().includes(p.key.toLowerCase())),
    }));
  }, [tools]);

  // Filtered tools when searching
  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.shortName.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
    );
  }, [tools, searchQuery]);

  const handleSelect = (id: string) => {
    onSelectTool(id);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative min-w-0 flex-1 sm:flex-initial" ref={dropdownRef}>
      {/* Trigger Button with Active Framework Icon */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full max-w-[220px] sm:max-w-[280px] bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-900 text-xs font-semibold rounded-lg pl-2.5 pr-7 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none cursor-pointer transition-all flex items-center gap-2 truncate shadow-2xs group"
        title={`Quick Jump: #${currentIdx} ${currentTool?.shortName} — ${currentTool?.name}`}
      >
        <div className="w-5 h-5 rounded-md bg-white border border-slate-200/80 shadow-3xs flex items-center justify-center shrink-0 group-hover:border-indigo-300 transition-colors">
          <CurrentIcon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
        </div>
        <span className="text-3xs font-mono font-bold text-slate-400 shrink-0">
          #{currentIdx}
        </span>
        <span className="font-bold text-slate-900 truncate">
          {currentTool?.shortName}
        </span>
        <span className="text-slate-500 font-normal truncate hidden sm:inline">
          — {currentTool?.name}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-700' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-72 sm:w-80 max-h-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 flex flex-col overflow-hidden text-xs animate-in fade-in zoom-in-95 duration-100">
          {/* Search Header */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/80 flex items-center gap-1.5 sticky top-0 z-10">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search 57 frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* List Content */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100/60 p-1">
            {searchQuery ? (
              // Search Results List
              filteredTools.length > 0 ? (
                <div className="space-y-0.5">
                  <div className="px-2 py-1 text-3xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {filteredTools.length} Matching Frameworks
                  </div>
                  {filteredTools.map((t) => {
                    const isSelected = t.id === selectedToolId;
                    const IconComp = t.icon || getToolIcon(t.id);
                    const globalIdx = tools.findIndex((x) => x.id === t.id) + 1;
                    const isSimDone = isSimulatorDone(t.id);

                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleSelect(t.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white font-bold'
                            : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <span
                            className={`text-3xs font-mono ${
                              isSelected ? 'text-slate-400' : 'text-slate-400'
                            }`}
                          >
                            #{globalIdx}
                          </span>
                          <span className="font-semibold truncate">{t.shortName}</span>
                          <span
                            className={`text-2xs truncate ${
                              isSelected ? 'text-slate-300' : 'text-slate-400'
                            }`}
                          >
                            · {t.name}
                          </span>
                        </div>
                        {isSimDone && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  No framework matching "{searchQuery}"
                </div>
              )
            ) : (
              // Grouped by Pillar List
              pillarGroups.map((group) => (
                <div key={group.name} className="py-1">
                  <div className="px-2 py-1 text-3xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {group.name}
                  </div>
                  <div className="space-y-0.5">
                    {group.tools.map((t) => {
                      const isSelected = t.id === selectedToolId;
                      const IconComp = t.icon || getToolIcon(t.id);
                      const globalIdx = tools.findIndex((x) => x.id === t.id) + 1;
                      const isSimDone = isSimulatorDone(t.id);

                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleSelect(t.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white font-bold shadow-2xs'
                              : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <span
                              className={`text-3xs font-mono ${
                                isSelected ? 'text-slate-400' : 'text-slate-400'
                              }`}
                            >
                              #{globalIdx}
                            </span>
                            <span className="font-semibold truncate">{t.shortName}</span>
                            <span
                              className={`text-2xs truncate ${
                                isSelected ? 'text-slate-300' : 'text-slate-400'
                              }`}
                            >
                              · {t.name}
                            </span>
                          </div>
                          {isSimDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          ) : isSelected ? (
                            <Check className="w-3 h-3 text-white shrink-0" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
