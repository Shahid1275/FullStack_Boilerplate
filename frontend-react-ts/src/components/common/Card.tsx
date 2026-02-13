import React from 'react'

interface CardProps {
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
}) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className={`border-b border-gray-200 pb-4 mb-4 ${headerClassName}`}>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      
      <div className={bodyClassName}>
        {children}
      </div>
      
      {footer && (
        <div className={`border-t border-gray-200 pt-4 mt-4 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card
