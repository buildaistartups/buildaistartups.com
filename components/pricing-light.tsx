'use client'

import { useState } from 'react'
import styles from './pricing-light.module.css'

/* -------------------- Table Model ------------------------------------ */
/** One normalized sequence of rows for labels + plan cards */
type Row =
  | { kind: 'section'; title: string }
  | { kind: 'item'; key: string; label: string }

const ROWS: Row[] = [
  { kind: 'section', title: 'Usage' },
  { kind: 'item', key: 'social', label: 'Social Connections' },
  { kind: 'item', key: 'domains', label: 'Custom Domains' },
  { kind: 'item', key: 'roles', label: 'User Role Management' },
  { kind: 'item', key: 'db', label: 'External Databases' },

  { kind: 'section', title: 'Features' },
  { kind: 'item', key: 'custom_connection', label: 'Custom Connection' },
  { kind: 'item', key: 'deploy', label: 'Advanced Deployment Options' },
  { kind: 'item', key: 'addons', label: 'Extra Add-ons' },
  { kind: 'item', key: 'admin_roles', label: 'Admin Roles' },

  { kind: 'section', title: 'Support' },
  { kind: 'item', key: 'premium_support', label: 'Premium Support' },
]

/** What each plan shows in each row (string renders value; true renders ✓; false renders empty) */
type PlanKey = 'Pro' | 'Team' | 'Enterprise'
type CellMap = Record<PlanKey, Record<string, string | boolean>>

const CELLS: CellMap = {
  Pro: {
    social: '100',
    domains: '4',
    roles: 'Unlimited',
    db: '1',

    custom_connection: true,
    deploy: true,
    addons: true,
    admin_roles: true,

    premium_support: false,
  },
  Team: {
    social: '250',
    domains: 'Unlimited',
    roles: 'Unlimited',
    db: '5',

    custom_connection: true,
    deploy: true,
    addons: true,
    admin_roles: true,

    premium_support: true,
  },
  Enterprise: {
    social: 'Unlimited',
    domains: 'Unlimited',
    roles: 'Unlimited',
    db: 'Unlimited',

    custom_connection: true,
    deploy: true,
    addons: true,
    admin_roles: true,

    premium_support: true,
  },
}

/* -------------------- Plans (price + CTA style) ---------------------- */
type PlanMeta = {
  name: PlanKey
  price: { monthly: number; yearly: number }
  ctaStyle: 'primary' | 'neutral'
  featured?: boolean
}
const PLANS: PlanMeta[] = [
  { name: 'Pro',        price: { monthly: 29, yearly: 24 }, ctaStyle: 'neutral' },
  { name: 'Team',       price: { monthly: 54, yearly: 49 }, ctaStyle: 'primary', featured: true },
  { name: 'Enterprise', price: { monthly: 85, yearly: 79 }, ctaStyle: 'neutral' },
]

/* ========================== Component ================================= */
export default function PricingLight() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className={`${styles.vars} ${styles.forceText}`}>
      <div className={styles.wrap}>
        {/* Left labels column (drives alignment) */}
        <aside className={styles.labelsCol}>
          {/* Toggle */}
          <div className={styles.toggleLine} style={{ marginBottom: 14 }}>
            <span>Monthly</span>
            <span
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((s) => !s)}
              style={{
                width: 42, height: 22, borderRadius: 9999,
                background: annual ? 'var(--purple)' : 'var(--btn-neutral)',
                position: 'relative', display: 'inline-block', cursor: 'pointer',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)',
              }}
            >
              <span
                style={{
                  position: 'absolute', top: 2, left: annual ? 22 : 2,
                  width: 18, height: 18, borderRadius: '9999px',
                  background: '#fff', transition: 'left .15s ease',
                }}
              />
            </span>
            <span>Yearly</span>
            <span className={styles.discount}>(-20%)</span>
          </div>

          {/* Sectioned labels */}
          {grouped(ROWS).map((group, gi) => (
            <div key={gi} style={{ marginTop: gi === 0 ? 4 : 16 }}>
              <div className={styles.sectionTitle}>{group.title}</div>
              <div className={styles.rows}>
                {group.items.map((r) => (
                  <div key={r.key} className={styles.row}>
                    {/* small decorative check like the dark layout */}
                    <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                    <span className={styles.cellLabel}>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Plan cards — render the exact same sequence of rows */}
        {PLANS.map((p) => (
          <PlanCard key={p.name} meta={p} cells={CELLS[p.name]} annual={annual} />
        ))}
      </div>
    </div>
  )
}

/* -------------------- Subcomponents ---------------------------------- */
function PlanCard({
  meta,
  cells,
  annual,
}: {
  meta: PlanMeta
  cells: Record<string, string | boolean>
  annual: boolean
}) {
  const price = annual ? meta.price.yearly : meta.price.monthly
  const btnClass =
    meta.ctaStyle === 'primary'
      ? `${styles.btn} ${styles.btnPrimary}`
      : `${styles.btn} ${styles.btnNeutral}`

  return (
    <section className={`${styles.card} ${meta.featured ? styles.featured : ''}`}>
      <div className={styles.h3}>{meta.name}</div>

      <div className={styles.priceRow}>
        <span className={styles.curr}>$</span>
        <span className={styles.value}>{price}</span>
        <span className={styles.per}>/mo</span>
      </div>

      <p className={styles.blurb}>Everything at your fingertips.</p>
      <button className={btnClass} type="button">Get Started →</button>

      {/* Render rows in the exact order; add section spacers to align with labels */}
      {grouped(ROWS).map((group, gi) => (
        <div key={gi} style={{ marginTop: 10 }}>
          {/* top divider for the section inside cards */}
          <div className={styles.rowSpacer} />
          {group.items.map((r) => (
            <div key={r.key} className={styles.row}>
              {renderCell(cells[r.key])}
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

/* Cell renderer: string -> check + text; true -> check only; false -> blank */
function renderCell(v: string | boolean | undefined) {
  if (typeof v === 'string') {
    return (
      <>
        <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
        </svg>
        <span className={styles.cellValue}>{v}</span>
      </>
    )
  }
  if (v === true) {
    return (
      <>
        <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
        </svg>
        <span className={styles.cellValue}></span>
      </>
    )
  }
  return (
    <>
      <span className={styles.blank} />
      <span className={styles.cellValue}></span>
    </>
  )
}

/* Utility to split ROWS into sections with items */
function grouped(rows: Row[]) {
  const out: { title: string; items: Extract<Row, { kind: 'item' }>[] }[] = []
  let current: { title: string; items: Extract<Row, { kind: 'item' }>[] } | null = null
  for (const r of rows) {
    if (r.kind === 'section') {
      current = { title: r.title, items: [] }
      out.push(current)
    } else {
      if (!current) { current = { title: '', items: [] }; out.push(current) }
      current.items.push(r)
    }
  }
  return out
}
