'use client'

import { useCounter } from '@/hooks/useCounter'
import { site } from '@/data/content'

interface CounterItemProps {
  value: number
  suffix: string
  label: string
  index: number
}

function CounterItem({ value, suffix, label, index }: CounterItemProps) {
  const { ref, value: animated } = useCounter(value, {
    duration: 1600 + index * 200, // stagger leve entre os números
  })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col items-start border-l border-gp-steel/20 pl-6"
    >
      <div className="font-display text-5xl font-bold text-gp-bone md:text-6xl lg:text-7xl">
        {animated}
        <span className="text-gp-green-bright">{suffix}</span>
      </div>
      <div className="mt-3 whitespace-pre-line font-mono text-xs uppercase tracking-widest text-gp-steel">
        {label}
      </div>
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="relative border-y border-gp-steel/10 bg-gp-navy-deep py-20">
      <div className="container-gp">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-px w-12 bg-gp-green-bright" />
          <span className="eyebrow">Em números</span>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {site.numbers.map((n, i) => (
            <CounterItem
              key={n.label}
              value={n.value}
              suffix={n.suffix}
              label={n.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
