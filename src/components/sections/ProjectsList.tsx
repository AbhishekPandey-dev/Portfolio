'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

import HeadingReveal from '@/components/ui/HeadingReveal'
import ProjectFilters, { FilterCategory } from '@/components/sections/ProjectFilters'
import ProjectRow, { ProjectData } from '@/components/sections/ProjectRow'
import HoverImagePreview from '@/components/ui/HoverImagePreview'

interface ProjectsListProps {
  initialProjects: ProjectData[]
}

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [displayProjects, setDisplayProjects] = useState<ProjectData[]>(initialProjects)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isHoverVisible, setIsHoverVisible] = useState(false)
  
  // Is desktop checking for hover feature
  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Initial Stagger on Mount
  useGSAP(() => {
    if (!listRef.current) return
    const rows = listRef.current.querySelectorAll('.project-row')
    if (rows.length === 0) return

    gsap.from(rows, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power3.out',
      delay: 0.2, // let header reveal first
    })
  }, { scope: containerRef })

  // Handle Filter Change via GSAP
  const handleFilterChange = (newFilter: FilterCategory) => {
    if (newFilter === activeFilter || isTransitioning) return
    
    setIsTransitioning(true)
    
    // 1. Animate out current rows
    const rows = listRef.current?.querySelectorAll('.project-row')
    
    if (rows && rows.length > 0) {
      gsap.to(rows, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power2.in',
        onComplete: () => {
          // 2. Change state
          setActiveFilter(newFilter)
          const newProjects = newFilter === 'all' 
            ? initialProjects 
            : initialProjects.filter(p => p.category === newFilter)
          
          setDisplayProjects(newProjects)
          
          // 3. Request animation frame to let React render, then animate in
          requestAnimationFrame(() => {
            const newRows = listRef.current?.querySelectorAll('.project-row')
            if (newRows && newRows.length > 0) {
              gsap.fromTo(newRows, 
                { y: 20, opacity: 0 },
                { 
                  y: 0, 
                  opacity: 1, 
                  duration: 0.4, 
                  stagger: 0.04, 
                  ease: 'power3.out',
                  onComplete: () => setIsTransitioning(false)
                }
              )
            } else {
              setIsTransitioning(false)
            }
          })
        }
      })
    } else {
      setActiveFilter(newFilter)
      const newProjects = newFilter === 'all' 
        ? initialProjects 
        : initialProjects.filter(p => p.category === newFilter)
      setDisplayProjects(newProjects)
      setIsTransitioning(false)
    }
  }

  // Hover handlers
  const handleRowEnter = (id: string) => {
    if (!isDesktop) return
    setHoveredId(id)
    setIsHoverVisible(true)
  }
  
  const handleRowLeave = () => {
    if (!isDesktop) return
    setIsHoverVisible(false)
  }

  return (
    <section 
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 0 120px 0'
      }}
    >
      <HoverImagePreview isVisible={isHoverVisible} activeImageId={hoveredId} />

      {/* Header */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          margin: '0 24px 64px 24px',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ 
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontSize: '14px',
            color: 'var(--color-muted)',
            fontWeight: 700 
          }}>
            02
          </span>
          <HeadingReveal 
            tag="h1" 
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 800,
              color: 'var(--color-text)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              margin: 0
            }}
          >
            Recent Work
          </HeadingReveal>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-end' }}>
          {/* Badge */}
          <div style={{
            padding: '8px 16px',
            borderRadius: '100px',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '13px',
          }}>
            {initialProjects.length.toString().padStart(2, '0')} Projects
          </div>
          
          {/* Filters */}
          <ProjectFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* List */}
      <div 
        ref={listRef}
        style={{
          borderTop: '1px solid var(--color-border)'
        }}
      >
        {displayProjects.map(project => (
          <ProjectRow 
            key={project.id} 
            project={project} 
            onMouseEnter={handleRowEnter}
            onMouseLeave={handleRowLeave}
          />
        ))}
        {displayProjects.length === 0 && (
          <div style={{ padding: '64px 24px', textAlign: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-body, Inter), sans-serif' }}>
            No projects found for this category.
          </div>
        )}
      </div>
    </section>
  )
}
