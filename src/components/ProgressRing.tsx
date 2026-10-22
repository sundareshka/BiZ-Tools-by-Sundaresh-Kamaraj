import React from 'react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  trackColor?: string;
  progressColor?: string;
  isActive?: boolean;
  showCompletedCheck?: boolean;
  showPercentageText?: boolean;
}

/**
 * Visual circular SVG progress ring that dynamically fills up based on tool completion percentage.
 * Ensures clean rendering at 0%, smooth transitions as tools are completed, and visual feedback at 100%.
 */
export function ProgressRing({
  percentage,
  size = 18,
  strokeWidth = 2.4,
  className = '',
  trackColor,
  progressColor,
  isActive = false,
  showCompletedCheck = false,
  showPercentageText = false
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage || 0)));
  const radius = Math.max(1, (size - strokeWidth) / 2);
  const circumference = 2 * Math.PI * radius;
  // Offset moves from circumference (0% fill) down to 0 (100% fill)
  const strokeDashoffset = circumference - (clamped / 100) * circumference;
  const isComplete = clamped === 100;

  // Adaptive track and progress colors based on active selection and completion
  const resolvedTrackColor = trackColor || (
    isActive
      ? 'rgba(255, 255, 255, 0.28)'
      : 'rgba(148, 163, 184, 0.35)'
  );

  const resolvedProgressColor = progressColor || (
    isComplete
      ? (isActive ? '#34d399' : '#10b981') // vibrant emerald on completion
      : (isActive ? '#ffffff' : '#4f46e5') // white when tab is active, indigo when inactive
  );

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title={`${clamped}% completed`}
      aria-label={`${clamped}% completed`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 origin-center overflow-visible"
      >
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={resolvedTrackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Dynamic animated progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={resolvedProgressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap={clamped > 0 ? 'round' : 'butt'}
          opacity={clamped > 0 ? 1 : 0}
          fill="none"
          className="transition-[stroke-dashoffset,stroke,opacity] duration-500 ease-out"
        />
      </svg>

      {/* Center percentage text if requested for larger display variants */}
      {showPercentageText && size >= 28 && (
        <span
          className={`absolute text-3xs font-mono font-bold leading-none ${
            isActive ? 'text-white' : 'text-slate-700'
          }`}
        >
          {clamped}%
        </span>
      )}

      {/* Micro checkmark when 100% complete and size permits */}
      {showCompletedCheck && isComplete && size >= 20 && !showPercentageText && (
        <span
          className={`absolute text-3xs font-black leading-none ${
            isActive ? 'text-emerald-300' : 'text-emerald-600'
          }`}
          aria-hidden="true"
        >
          ✓
        </span>
      )}
    </div>
  );
}
