import slugify from 'slugify'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(text: string): string {
  return slugify(text, { lower: true, strict: true })
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** 45 -> "45m", 120 -> "2h", 75 -> "1h 15m". */
export function formatMins(mins: number) {
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `${h}h ${m}m` : `${h}h`
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

/** "Quantity Surveyor" → "Quantity Surveyors"; leaves function names like "Document Control" alone. */
export function pluralRole(name: string) {
  return /(Manager|Surveyor|Estimator|Director|Engineer|Controller|Planner|Coordinator|Buyer|Subcontractor)$/i.test(name)
    ? `${name}s`
    : name
}
