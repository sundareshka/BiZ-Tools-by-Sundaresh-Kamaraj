import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  Printer,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  Building,
  Check
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';

interface PillarMasteryCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  pillarName: string;
  pillarNumber: string;
  completionPercentage: number;
  completedCount: number;
  totalCount: number;
  userEmail?: string;
}

export function PillarMasteryCertificateModal({
  isOpen,
  onClose,
  pillarName,
  pillarNumber,
  completionPercentage,
  completedCount,
  totalCount,
  userEmail = 'ka.sundaresh@gmail.com'
}: PillarMasteryCertificateModalProps) {
  const [recipientName, setRecipientName] = useState<string>('Sundaresh Kamaraj');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isMastered = completionPercentage === 100;
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = `I just earned Executive Mastery in ${pillarName} on BizTools (${completedCount}/${totalCount} simulators completed)! Verified at: https://sundaresh.blog`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-title"
      >
        {/* Controls Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-xs sm:text-sm">
              {isMastered ? 'Executive Certificate of Mastery' : 'Certification In Progress'}
            </span>
            <span className={`text-3xs font-mono font-bold px-2 py-0.5 rounded ${
              isMastered ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'
            }`}>
              {completionPercentage}% Complete
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Surface (Styled for Screen & Print) */}
        <div className="p-6 sm:p-10 bg-slate-50 print:p-8">
          <div className="relative bg-white border-8 border-double border-slate-300 p-8 sm:p-12 rounded-2xl shadow-md text-center overflow-hidden">
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <div className="w-96 h-96 rounded-full border-16 border-slate-900 flex items-center justify-center font-black text-9xl font-display">
                57
              </div>
            </div>

            {/* Top Seal & Heading */}
            <div className="relative z-10 space-y-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center mx-auto shadow-md ring-4 ring-amber-100">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-3xs uppercase font-mono font-bold tracking-widest text-slate-400">
                BizTools Executive Certificate of Mastery
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                Certificate of Executive Competency
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full my-2" />
            </div>

            {/* Recipient & Body */}
            <div className="relative z-10 my-6 space-y-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                This verified credential is proud to certify that
              </p>

              {/* Editable Name */}
              <div className="inline-block border-b-2 border-slate-300 px-6 py-1">
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="text-xl sm:text-2xl font-bold text-slate-900 text-center font-display bg-transparent focus:outline-none"
                  placeholder="Enter Your Name"
                  title="Click to edit certificate recipient name"
                />
              </div>

              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                has systematically completed interactive simulation scenarios, risk audits, and methodological modeling across all core executive frameworks within:
              </p>

              <div className="py-2">
                <span className="text-base sm:text-lg font-black text-indigo-950 uppercase tracking-wide bg-indigo-50 border border-indigo-200 px-4 py-1.5 rounded-xl font-display shadow-2xs">
                  {pillarNumber}: {pillarName}
                </span>
              </div>

              <div className="text-2xs text-slate-500 font-mono">
                {completedCount} of {totalCount} Simulation Modules Completed ({completionPercentage}%) · Grade: {isMastered ? 'Executive Distinction (100%)' : 'In Progress'}
              </div>
            </div>

            {/* Signatures & Verification Seal */}
            <div className="relative z-10 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end text-xs">
              <div className="text-left space-y-1">
                <div className="font-mono text-3xs text-slate-400 uppercase">Issue Date</div>
                <div className="font-semibold text-slate-800 text-xs">{issueDate}</div>
                <div className="text-3xs text-slate-500 font-mono">Verified ID: BZ-{Date.now().toString(36).toUpperCase()}</div>
              </div>

              <div className="hidden sm:flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500/40 bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono font-bold text-3xs uppercase tracking-tighter">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-3xs text-emerald-700 font-bold mt-1">VERIFIED CERT</span>
              </div>

              <div className="text-right space-y-1">
                <div className="font-display font-bold text-indigo-950 text-sm italic">Sundaresh Kamaraj</div>
                <div className="font-mono text-3xs text-slate-500">Creator, BizTools Suite</div>
                <a
                  href="https://sundaresh.blog"
                  target="_blank"
                  rel="noreferrer"
                  className="text-3xs text-indigo-600 font-semibold hover:underline"
                >
                  sundaresh.blog
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
