// lib/evidence.ts
// Tiny store API for evidence logging

export type EvidenceItem = {
  id: string
  projectId: string
  type: 'validation' | 'deploy' | 'signup' | 'interview' | 'presale' | 'payment' | 'metric' | 'ab_test' | 'other'
  title: string
  detail?: string
  url?: string
  ts: number
  data?: any
}

// In-memory store (replace with DB later)
const EvidenceStore: Record<string, EvidenceItem[]> = {}

export function logEvidence(item: Omit<EvidenceItem, 'id' | 'ts'>): EvidenceItem {
  const id = `${item.type}:${Date.now()}:${Math.random().toString(36).substring(2, 8)}`
  const ts = Date.now()
  
  const evidenceItem: EvidenceItem = {
    ...item,
    id,
    ts
  }

  if (!EvidenceStore[item.projectId]) {
    EvidenceStore[item.projectId] = []
  }
  
  EvidenceStore[item.projectId].push(evidenceItem)
  
  // Keep only last 1000 items per project
  if (EvidenceStore[item.projectId].length > 1000) {
    EvidenceStore[item.projectId] = EvidenceStore[item.projectId].slice(-1000)
  }
  
  return evidenceItem
}

export function listEvidence(projectId: string, limit = 50): EvidenceItem[] {
  const items = EvidenceStore[projectId] || []
  return items
    .sort((a, b) => b.ts - a.ts) // newest first
    .slice(0, limit)
}

export function getAllEvidence(): Record<string, EvidenceItem[]> {
  return EvidenceStore
}
