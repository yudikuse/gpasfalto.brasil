'use client'

import { useEffect, useState } from 'react'
import { site } from '@/data/content'

/**
 * Vídeo de fundo do Hero.
 * Carrega só o vídeo do dispositivo atual (não baixa os dois):
 *  - Desktop (>= 768px): 0608_wbqp6m (16:9 paisagem)
 *  - Mobile  (<  768px): 0608-vertical_ukeq9g (9:16 vertical)
 * Troca em tempo real ao girar a tela / redimensionar via matchMedia.
 */
export function HeroVideo() {
  // Começa em desktop pra casar com o SSR e evitar mismatch de hidratação;
  // corrige no cliente logo após montar.
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const mobileSrc = site.hero.videoLocalMobile
  const src = isMobile && mobileSrc ? mobileSrc : site.hero.videoLocal

  return (
    <video
      // key força remontar (e recarregar) quando a fonte muda de viewport
      key={src}
      autoPlay
      loop
      muted
      playsInline
      poster="/images/hero-cbuq.jpg"
      className="h-full w-full object-cover object-center"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
