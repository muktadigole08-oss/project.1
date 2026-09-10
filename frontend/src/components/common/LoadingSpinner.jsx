import React from 'react';

export const LoadingSpinner = ({ text = 'Loading medical data...' }) => {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center gap-space-sm text-secondary">
      <div className="w-12 h-12 border-4 border-surface-container-high border-t-secondary rounded-full animate-spin"></div>
      <p className="font-label-md text-label-md text-on-surface-variant animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
