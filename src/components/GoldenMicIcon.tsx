import React from 'react';

interface GoldenMicIconProps {
  className?: string;
  size?: number;
}

/**
 * Golden line vintage studio microphone with transparent background (no background)
 * Features metallic golden lines, soundwave resonance rings, and studio broadcast details.
 */
export const GoldenMicIcon: React.FC<GoldenMicIconProps> = ({
  className = 'w-14 h-14',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform hover:scale-105`}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        {/* Golden Linear Gradient */}
        <linearGradient id="goldLinesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>

        {/* Soft Golden Glow Filter */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Acoustic Resonance Rings (Soundwaves) */}
      <path
        d="M26 44C26 28 38 18 60 18C82 18 94 28 94 44"
        stroke="url(#goldLinesGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.6"
      />
      <path
        d="M18 46C18 24 34 10 60 10C86 10 102 24 102 46"
        stroke="url(#goldLinesGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.4"
      />

      {/* Main Microphone Capsule Outline */}
      <rect
        x="42"
        y="22"
        width="36"
        height="50"
        rx="18"
        stroke="url(#goldLinesGrad)"
        strokeWidth="2.5"
        filter="url(#goldGlow)"
      />

      {/* Inner Grille Mesh Lines */}
      <line
        x1="45"
        y1="34"
        x2="75"
        y2="34"
        stroke="url(#goldLinesGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="43"
        y1="42"
        x2="77"
        y2="42"
        stroke="url(#goldLinesGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="45"
        y1="50"
        x2="75"
        y2="50"
        stroke="url(#goldLinesGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="48"
        y1="58"
        x2="72"
        y2="58"
        stroke="url(#goldLinesGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Vertical Grille Ribs */}
      <line
        x1="52"
        y1="25"
        x2="52"
        y2="69"
        stroke="url(#goldLinesGrad)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />
      <line
        x1="60"
        y1="23"
        x2="60"
        y2="71"
        stroke="url(#goldLinesGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="68"
        y1="25"
        x2="68"
        y2="69"
        stroke="url(#goldLinesGrad)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Mid Band Gold Collar */}
      <path
        d="M42 46H78"
        stroke="#FDE68A"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* U-Shape Mount Bracket (Suspension Arm) */}
      <path
        d="M34 50V56C34 70.3594 45.6406 82 60 82C74.3594 82 86 70.3594 86 56V50"
        stroke="url(#goldLinesGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#goldGlow)"
      />

      {/* Joint Swivels */}
      <circle cx="34" cy="50" r="2.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
      <circle cx="86" cy="50" r="2.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />

      {/* Vertical Stem */}
      <line
        x1="60"
        y1="82"
        x2="60"
        y2="100"
        stroke="url(#goldLinesGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Metallic Base Stand */}
      <path
        d="M40 102C40 99.5 49 98 60 98C71 98 80 99.5 80 102V106C80 108.5 71 110 60 110C49 110 40 108.5 40 106V102Z"
        stroke="url(#goldLinesGrad)"
        strokeWidth="2"
      />
      <line
        x1="36"
        y1="106"
        x2="84"
        y2="106"
        stroke="url(#goldLinesGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Delicate Golden Sparkles / Sound Pulses */}
      <circle cx="28" cy="32" r="1.5" fill="#FDE68A" />
      <circle cx="92" cy="34" r="1.5" fill="#FDE68A" />
      <circle cx="60" cy="14" r="1.2" fill="#FBBF24" />
    </svg>
  );
};
