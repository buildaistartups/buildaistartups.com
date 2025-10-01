// components/generate-result-types.ts
export type GenerateResult = {
  id?: string
  name: string
  oneLiner: string
  description?: string
  niche?: string
  tags?: string[]
  stack?: string
  image?: string // optional cover/thumbnail url
  prd?: string   // optional Spec DSL / PRD text
}
