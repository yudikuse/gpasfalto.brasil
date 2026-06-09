'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { site } from '@/data/content'

const nav = [
  { label: 'Início', href: '/' },
  { label: 'Obras', href: '#obras' },
  { label: 'Usinas', href: '#usinas' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '#contato' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trava o scroll do body enquanto o menu fullscreen está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Fecha no ESC
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[var(--z-header)] transition-all duration-500 ease-out-expo',
          scrolled
            ? 'bg-gp-navy/85 backdrop-blur-md border-b border-gp-steel/10'
            : 'bg-transparent'
        )}
      >
        <div className="container-gp flex h-[var(--header-h)] items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="GP Asfalto">
            <Image
              src="/images/logo-white.png"
              alt="GP Asfalto"
              width={320}
              height={96}
              priority
              className="h-14 w-auto md:h-16"
            />
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${site.company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden text-xs md:inline-flex"
            >
              Orçamento
              <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center border border-gp-steel/30 text-gp-bone transition-colors hover:border-gp-bone"
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* MENU FULLSCREEN — estilo gmining */}
      <div
        aria-hidden={!menuOpen}
        className={cn(
          'fixed inset-0 z-[var(--z-menu)] bg-gp-navy-deep transition-all duration-500 ease-out-expo',
          menuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <div className="container-gp flex h-[var(--header-h)] items-center justify-between">
          <Image
            src="/images/logo-white.png"
            alt="GP Asfalto"
            width={260}
            height={78}
            className="h-14 w-auto"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="grid h-10 w-10 place-items-center border border-gp-steel/30 text-gp-bone transition-colors hover:border-gp-bone"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="container-gp mt-[clamp(1.5rem,7vh,4rem)] flex flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${120 + i * 70}ms` : '0ms' }}
              className={cn(
                'group flex items-baseline gap-4 border-b border-gp-steel/15 py-4 transition-all duration-700 ease-out-expo md:py-5',
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              )}
            >
              <span className="font-mono text-xs text-gp-green-bright">
                0{i + 1}
              </span>
              <span className="font-display text-5xl uppercase leading-none text-gp-bone transition-colors duration-300 group-hover:text-gp-green-bright md:text-7xl">
                {item.label}
              </span>
              <ArrowUpRight
                size={28}
                className="ml-auto -translate-x-2 self-center text-gp-green-bright opacity-0 transition-all duration-400 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
              />
            </Link>
          ))}

          <a
            href={`https://wa.me/${site.company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transitionDelay: menuOpen ? `${120 + nav.length * 70}ms` : '0ms' }}
            className={cn(
              'btn-primary mt-10 w-fit transition-all duration-700 ease-out-expo',
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            )}
          >
            Solicitar Orçamento
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </>
  )
}
