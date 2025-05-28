import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  href, 
  to, 
  disabled = false, 
  fullWidth = false, 
  className = '', 
  onClick, 
  ...props 
}) => {
  // Style classes based on variant
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-white border border-primary text-primary hover:bg-gray-50',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Base classes
  const baseClasses = `inline-flex justify-center items-center font-medium rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${fullWidth ? 'w-full' : ''} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  // Render as Link if "to" prop is provided (for internal links)
  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  // Render as anchor if "href" prop is provided (for external links)
  if (href) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={baseClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
