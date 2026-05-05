'use client'
import { useEffect, useRef, useState } from 'react'
import { site } from '@/data/content'

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true
        const duration = 1600
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          setVal(Math.round((1 - (1 - p) ** 3) * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref} className="counter-value">
      {val}{suffix}
    </span>
  )
}

export default function NumbersPanel() {
  const { numbers, company } = site

  return (
    <section className="panel bg-cream" id="p2">
      <div className="h-full flex flex-col justify-center px-6 md:px-12 relative">

        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-medium tracking-[.28em] uppercase text-navy/40">
            {company.name}
          </span>
          <div className="flex-1 h-px bg-navy/12" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {numbers.map((n, i) => (
            <div
              key={i}
              className="flex flex-col justify-center py-8 px-4 md:px-8
                border-r border-navy/10 last:border-r-0
                [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r"
            >
              <span
                className="font-display font-black text-navy leading-none"
                style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}
              >
                <Counter target={n.value} suffix={n.suffix} />
              </span>
              <span className="text-[13px] font-normal tracking-[.04em] text-navy/50 mt-2 whitespace-pre-line leading-snug">
                {n.label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12
          flex justify-between items-center border-t border-navy/10 pt-4">
          <span className="text-[10px] font-medium tracking-[.16em] uppercase text-navy/30">
            {company.address}
          </span>
          <span className="text-[10px] font-medium tracking-[.12em] uppercase
            text-green border border-green/35 px-4 py-1.5 flex-shrink-0">
            Est. {company.founded}
          </span>
        </div>

      </div>
    </section>
  )
}
