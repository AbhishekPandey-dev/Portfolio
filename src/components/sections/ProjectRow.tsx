'use client'

import React, { useRef } from 'react'

export interface ProjectData {
  id: string
  title: string
  tags: string[]
  year: string
  category: string
}

interface ProjectRowProps {
  project: ProjectData
  onMouseEnter: (id: string, e: React.MouseEvent) => void
  onMouseLeave: () => void
}

export default function ProjectRow({ project, onMouseEnter, onMouseLeave }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={rowRef}
      className="project-row"
      data-cursor-text="View"
      onMouseEnter={(e) => onMouseEnter(project.id, e)}
      onMouseLeave={onMouseLeave}
      style={{
        width: '100%',
        borderBottom: '1px solid var(--color-border)',
        padding: '28px 24px',
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto auto',
        alignItems: 'center',
        gap: '24px',
        cursor: 'pointer',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Col 1: Index */}
      <div
        style={{
          fontFamily: 'var(--font-display, Syne), sans-serif',
          fontWeight: 800,
          fontSize: '48px',
          color: 'var(--color-border)',
          lineHeight: 1,
        }}
      >
        {project.id}
      </div>

      {/* Col 2: Title */}
      <div
        className="project-title"
        style={{
          fontFamily: 'var(--font-display, Syne), sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(22px, 3vw, 36px)',
          color: 'var(--color-text)',
          letterSpacing: '-0.02em',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', // portfolio ease
        }}
      >
        {project.title}
      </div>

      {/* Col 3: Tags */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          fontFamily: 'var(--font-body, Inter), sans-serif',
          fontSize: '12px',
          color: 'var(--color-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
        className="hidden md:flex"
      >
        {project.tags.map((tag, idx) => (
          <React.Fragment key={tag}>
            <span>{tag}</span>
            {idx < project.tags.length - 1 && <span>·</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Col 4: Year & Arrow */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '13px',
            color: 'var(--color-muted)',
          }}
          className="hidden md:block" // Hidden on mobile to save space
        >
          {project.year}
        </span>
        
        <span
          className="project-arrow"
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '24px',
            color: 'var(--color-muted)',
            transition: 'transform 0.3s ease, color 0.3s ease',
            display: 'inline-block',
          }}
        >
          →
        </span>
      </div>

      <style>{`
        .project-row:hover {
          background: linear-gradient(90deg, transparent 0%, #0D0D0D 50%, transparent 100%);
        }
        .project-row:hover .project-title {
          transform: translateX(12px);
        }
        .project-row:hover .project-arrow {
          transform: rotate(-45deg);
          color: var(--color-accent);
        }
        
        /* Mobile grid adjustment */
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 40px 1fr auto !important;
            padding: 24px 16px !important;
            gap: 16px !important;
          }
          .project-row > div:nth-child(1) {
            font-size: 32px !important;
          }
        }
      `}</style>
    </div>
  )
}
