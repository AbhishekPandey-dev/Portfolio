'use client'

import React from 'react'

export type FilterCategory = 'all' | 'react' | 'shopify' | 'wordpress' | 'uiux'

interface ProjectFiltersProps {
  activeFilter: FilterCategory
  onFilterChange: (filter: FilterCategory) => void
}

const FILTERS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'react', label: 'React & Next.js' },
  { id: 'shopify', label: 'Shopify' },
  { id: 'wordpress', label: 'WordPress' },
  { id: 'uiux', label: 'UI/UX' },
]

export default function ProjectFilters({ activeFilter, onFilterChange }: ProjectFiltersProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0 0 4px 0',
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
              borderBottom: isActive ? '1px solid var(--color-text)' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.target as HTMLElement).style.color = 'var(--color-text)'
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.target as HTMLElement).style.color = 'var(--color-muted)'
            }}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
