// ─── Design Token Re-exports ──────────────────────────────────────────────────
export { DESIGN_TOKENS } from './tokens'



// ─── Data Interfaces ──────────────────────────────────────────────────────────
export interface Project {
  id: string
  index: string
  title: string
  tags: string[]
  year: string
  image?: string
  url?: string
}

export interface NavItem {
  label: string
  href: string
  index: string
}