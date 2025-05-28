import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  footer,
  className = '', 
  bodyClassName = '', 
  headerClassName = '', 
  footerClassName = '',
  noPadding = false,
  bordered = false,
  shadow = true,
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg overflow-hidden
        ${bordered ? 'border border-gray-200' : ''}
        ${shadow ? 'shadow-md' : ''}
        ${className}
      `}
      {...props}
    >
      {(title || subtitle) && (
        <div className={`px-6 py-4 border-b border-gray-200 ${headerClassName}`}>
          {title && (
            typeof title === 'string' 
              ? <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              : title
          )}
          {subtitle && (
            typeof subtitle === 'string'
              ? <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
              : subtitle
          )}
        </div>
      )}
      
      <div className={`${noPadding ? '' : 'p-6'} ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`px-6 py-4 border-t border-gray-200 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
