'use client'

import { useEffect, useRef } from 'react'

/**
 * Cursor customizado estilo gmining: um ponto verde que segue o mouse exato
 * (pra clicar com precisão) e um anel que segue com leve atraso e cresce ao
 * passar sobre links/botões. Só liga em dispositivo com mouse (pointer:fine);
 * no touch não renderiza nada. Respeita prefers-reduced-motion (sem o atraso).
 * Inputs mantêm o cursor nativo (I-beam) — ver globals.css.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('has-custom-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let hovering = false
    let raf = 0

    const setPos = (el: HTMLDivElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      setPos(dot, mx, my)
      if (reduce) setPos(ring, mx, my)

      const target = e.target as Element | null
      const isHover = !!target?.closest?.(
        'a, button, [role="button"], label, input[type="submit"], .cursor-grow'
      )
      if (isHover !== hovering) {
        hovering = isHover
        ring.classList.toggle('is-hover', hovering)
      }
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = ''
      ring.style.opacity = ''
    }

    const tick = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      setPos(ring, rx, ry)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    if (!reduce) raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  )
}
