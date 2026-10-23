import React, { useState } from 'react';
import { DownloadCloud, Smartphone, X, Check, Laptop } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA in standalone mode, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-2 py-1.5 2xl:px-2.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all cursor-pointer shadow-xs shrink-0"
        title="Install BizTools app on your device for offline strategy simulations"
      >
        <DownloadCloud className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="hidden 2xl:inline">Install App</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-2 py-1.5 2xl:px-2.5 text-xs font-semibold rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-all cursor-pointer shadow-2xs shrink-0"
          title="Install BizTools on iPhone or iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="hidden 2xl:inline">Install PWA</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Install on iOS</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-2.5">
                <p className="font-medium text-slate-800">
                  Follow these 2 steps in Safari to add BizTools to your home screen:
                </p>
                <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-3xs flex items-center justify-center shrink-0">1</span>
                  <p>Tap the <strong>Share</strong> icon (box with upward arrow) in the Safari bottom bar.</p>
                </div>
                <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-3xs flex items-center justify-center shrink-0">2</span>
                  <p>Scroll down and select <strong>"Add to Home Screen"</strong>.</p>
                </div>
                <p className="text-3xs text-slate-400 pt-1">
                  Once installed, BizTools launches full-screen and works 100% offline.
                </p>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop indicator button
  return (
    <button
      onClick={() => {
        // Trigger ambient instructions modal
        setShowIOSGuide(true);
      }}
      className="flex items-center gap-1.5 px-2 py-1.5 2xl:px-2.5 text-xs font-semibold rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 transition-all cursor-pointer shadow-2xs shrink-0"
      title="Install BizTools PWA on your device for offline strategy simulations"
    >
      <Laptop className="w-3.5 h-3.5 text-slate-500 shrink-0" />
      <span className="hidden 2xl:inline">Offline App</span>
    </button>
  );
};
