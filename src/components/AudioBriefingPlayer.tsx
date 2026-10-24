import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Headphones, Gauge } from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';

interface AudioBriefingPlayerProps {
  tool: ToolDefinition;
  compact?: boolean;
}

export function AudioBriefingPlayer({ tool, compact = false }: AudioBriefingPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1.15); // Slightly brisk executive tempo
  const [isSupported, setIsSupported] = useState(true);
  const [progressPct, setProgressPct] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<any>(null);

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  // Stop playback when tool changes
  useEffect(() => {
    stopAudio();
  }, [tool.id]);

  const generateExecutiveScript = (t: ToolDefinition): string => {
    const originClean = t.origin.replace(/\([^)]*\)/g, '').trim();
    const caseSummary = t.caseStudy
      ? `In the real world, ${t.caseStudy.company} applied this during their challenge: ${t.caseStudy.challenge}. Key outcome: ${t.caseStudy.results?.[0] || 'measurable strategic transformation'}.`
      : '';
    const mistakeWarning = t.implementationGuide?.commonMistakes?.[0]
      ? `A critical failure mode to avoid: ${t.implementationGuide.commonMistakes[0].mistake}. The leadership fix is: ${t.implementationGuide.commonMistakes[0].fix}.`
      : '';

    return `Executive briefing for ${t.name}. Originating from ${originClean}. ${t.tagline}. ` +
      `Core Thesis: ${t.corePurpose}. ` +
      `How it works: ${t.howItWorks} ` +
      `${caseSummary} ` +
      `${mistakeWarning} ` +
      `Strategic planning horizon: ${t.horizon}. Deliverable: ${t.keyOutput}. End of briefing.`;
  };

  const startAudio = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();

    const script = generateExecutiveScript(tool);
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Premium')) && v.lang.startsWith('en')) ||
      voices.find(v => v.lang.startsWith('en')) || null;
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Estimate duration for progress bar (~140 wpm at 1.0x)
    const wordCount = script.split(/\s+/).length;
    const estSeconds = Math.max(15, (wordCount / (145 * rate)) * 60);
    const startTime = Date.now();

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const pct = Math.min(99, Math.round((elapsed / estSeconds) * 100));
      setProgressPct(pct);
    }, 250);

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgressPct(100);
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeout(() => setProgressPct(0), 1200);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseAudio = () => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeAudio = () => {
    if (!isSupported) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgressPct(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      pauseAudio();
    } else if (isPaused) {
      resumeAudio();
    } else {
      startAudio();
    }
  };

  const cycleSpeed = () => {
    const rates = [1.0, 1.2, 1.4];
    const nextIdx = (rates.indexOf(rate) + 1) % rates.length;
    const newRate = rates[nextIdx !== -1 ? nextIdx : 0];
    setRate(newRate);
    if (isPlaying) {
      stopAudio();
      setTimeout(startAudio, 100);
    }
  };

  if (!isSupported) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 text-white rounded-lg border border-slate-800 text-xs shadow-2xs">
        <button
          onClick={togglePlayback}
          className="p-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-colors"
          title={isPlaying ? 'Pause 60s Briefing' : 'Listen to 60s Executive Briefing'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <span className="text-3xs font-medium text-slate-300 pr-1">60s Audio Brief</span>
        {isPlaying && (
          <div className="flex items-center gap-0.5 px-1">
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-3.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl border border-indigo-900/60 shadow-xs relative overflow-hidden">
      {/* Background Accent Waves */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-6">
        <Headphones className="w-28 h-28 text-indigo-300" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Headphones className="w-3.5 h-3.5" />
            </div>
            <span className="text-2xs font-extrabold uppercase tracking-wider text-indigo-300">
              Executive Audio Briefing
            </span>
            <span className="text-3xs font-mono bg-indigo-900/80 text-indigo-200 px-1.5 py-0.2 rounded border border-indigo-700/50">
              ~60 sec
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-200">
            {tool.name} Strategic Overview & Executive Pitfalls
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Animated sound bars when playing */}
          {isPlaying && (
            <div className="flex items-end gap-1 h-5 px-2 bg-slate-800/80 rounded-md border border-slate-700">
              <span className="w-1 bg-indigo-400 rounded-full animate-bounce" style={{ height: '60%', animationDelay: '0ms' }} />
              <span className="w-1 bg-emerald-400 rounded-full animate-bounce" style={{ height: '90%', animationDelay: '120ms' }} />
              <span className="w-1 bg-indigo-300 rounded-full animate-bounce" style={{ height: '40%', animationDelay: '240ms' }} />
              <span className="w-1 bg-emerald-300 rounded-full animate-bounce" style={{ height: '100%', animationDelay: '360ms' }} />
              <span className="w-1 bg-indigo-400 rounded-full animate-bounce" style={{ height: '70%', animationDelay: '480ms' }} />
            </div>
          )}

          {/* Speed Toggle */}
          <button
            onClick={cycleSpeed}
            className="px-2 py-1 text-3xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
            title="Adjust narration speed"
          >
            <Gauge className="w-3 h-3 text-indigo-400" />
            <span>{rate}x</span>
          </button>

          {/* Play / Pause Toggle Button */}
          <button
            onClick={togglePlayback}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-emerald-300" />
                <span>{isPaused ? 'Resume' : 'Listen Now'}</span>
              </>
            )}
          </button>

          {(isPlaying || isPaused) && (
            <button
              onClick={stopAudio}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Stop audio"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {(isPlaying || isPaused || progressPct > 0) && (
        <div className="mt-3 pt-2 border-t border-slate-800/80">
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
