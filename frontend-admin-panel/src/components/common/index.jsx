import React from 'react'

export function Card({ children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}

export function Button({ children, variant = 'primary', ...props }) {
  const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}

export default { Card, Button }
