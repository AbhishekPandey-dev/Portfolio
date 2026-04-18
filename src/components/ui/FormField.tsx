'use client'

/**
 * src/components/ui/FormField.tsx
 * -----------------------------------------------------------------------
 * Minimal border-bottom only input, select, and textarea fields.
 * Includes error states and label integration.
 */

import React from 'react'

interface FormFieldProps {
  label: string
  type?: 'text' | 'email' | 'textarea' | 'select'
  value: string
  onChange: (val: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  options?: string[] // For select
  rows?: number
  maxLength?: number
}

export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  options = [],
  rows = 5,
  maxLength
}: FormFieldProps) {
  
  const borderColor = error ? 'var(--color-error)' : 'var(--color-border)'
  const hoverBorderColor = error ? 'var(--color-error)' : 'var(--color-muted)'
  const focusBorderColor = error ? 'var(--color-error)' : 'var(--color-text)'

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${borderColor}`,
    fontFamily: 'var(--font-body, Inter), sans-serif',
    fontSize: '16px',
    color: 'var(--color-text)',
    padding: '12px 0',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    resize: 'none',
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }} className="form-field-wrapper">
      <label 
        style={{
          fontFamily: 'var(--font-body, Inter), sans-serif',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--color-muted)',
          marginBottom: '8px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>
          {label} {required && '*'}
        </span>
        {type === 'textarea' && maxLength && (
          <span style={{ fontSize: '11px', color: 'var(--color-muted)', letterSpacing: 'normal' }}>
            {value.length} / {maxLength}
          </span>
        )}
      </label>

      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className="custom-field"
          style={inputStyle}
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={handleInput}
          className="custom-field custom-select"
          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
        >
          <option value="" disabled style={{ color: 'var(--color-muted)' }}>
            {placeholder || 'Select an option'}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          className="custom-field"
          style={inputStyle}
        />
      )}

      <div style={{ minHeight: '20px', marginTop: '4px' }}>
        {error && (
          <span style={{ fontFamily: 'var(--font-body, Inter), sans-serif', fontSize: '12px', color: 'var(--color-error)' }}>
            {error}
          </span>
        )}
      </div>

      <style>{`
        .custom-field::placeholder {
          color: #444444;
        }
        .custom-field:hover:not(:focus) {
          border-bottom-color: ${hoverBorderColor} !important;
        }
        .custom-field:focus {
          border-bottom-color: ${focusBorderColor} !important;
        }
        .custom-select {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right center;
          background-size: 16px;
        }
      `}</style>
    </div>
  )
}
