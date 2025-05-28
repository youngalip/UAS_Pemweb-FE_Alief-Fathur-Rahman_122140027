import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'primary', fullPage = false }) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  // Color classes
  const colorClasses = {
    primary: 'border-primary',
    white: 'border-white',
    gray: 'border-gray-600',
  };

  const spinnerClasses = `
    inline-block rounded-full 
    ${sizeClasses[size]} 
    border-t-transparent 
    ${colorClasses[color]}
    animate-spin
  `;

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className={spinnerClasses}></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className={spinnerClasses}></div>
    </div>
  );
};

export default LoadingSpinner;
