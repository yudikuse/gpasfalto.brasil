'use client'

import { site } from '@/data/content'
import { useCounter } from '@/hooks/useCounter'

function StatItem({ stat }: { stat: (typeof site.numbers)[number] }) {
  const { ref, value } = useCounter(stat.value)

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="font-display text-stat tabular-nums leading-none text-gp-bone">
        {value.toLocaleString('pt-BR')}
        {stat.suffix && <span className="text-gp-green-bright">{stat.suffix}</span>}
      </div>
      <div className="mt-3 whitespace-pre-line font-mono text-xs uppercase tracking-[0.2em] text-gp-steel">
        {stat.label}
      </div>
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="relative border-y border-gp-steel/10 bg-gp-navy-deep py-24">
      <div className="container-gp">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-px w-12 bg-gp-green-bright" />
          <span className="eyebrow">Em números</span>
        </div>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {site.numbers.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
