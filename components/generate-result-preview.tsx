// components/generate-result-preview.tsx

export default function GenerateResultPreview({ prd }: { prd: string }) {
  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        Spec preview
      </div>
      <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-900/60 p-3 text-xs text-slate-200">
        {prd}
      </pre>
    </div>
  )
}
