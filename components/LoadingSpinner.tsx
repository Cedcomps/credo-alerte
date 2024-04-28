// components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-4 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;