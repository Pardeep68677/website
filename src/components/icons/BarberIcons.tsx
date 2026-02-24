
import React from 'react';

export const ScissorsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

export const RazorBladeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="8" width="18" height="8" rx="1" />
    <circle cx="12" cy="12" r="1.5" />
    <line x1="7" y1="12" x2="9" y2="12" />
    <line x1="15" y1="12" x2="17" y2="12" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);

export const ShavingCreamIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 21h10a2 2 0 002-2v-9H5v9a2 2 0 002 2z" />
    <path d="M8 10V7a4 4 0 018 0v3" />
    <path d="M11 3v2" />
    <path d="M13 3v2" />
    <circle cx="12" cy="15" r="2" />
  </svg>
);
