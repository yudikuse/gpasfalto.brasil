'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { site } from '@/data/content'

const nav = [
  { label: 'Início',   href: '/' },
  { label: 'Obras',    href: '#obras' },
  { label: 'Usinas',   href: '#usinas' },
  { label: 'Sobre',    href: '/sobre' },
  { label: 'Contato',  href: '#contato' },
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
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="GP Asfalto">
            <Image
              src="/images/logo-white.png"
              alt="GP Asfalto"
              width={280}
              height={84}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-wider text-gp-bone/70 transition-colors hover:text-gp-bone"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Menu hamburger */}
          <div className="flex items-center gap-3">
            
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
              className="grid h-10 w-10 place-items-center border border-gp-steel/30 text-gp-bone lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu fullscreen */}
      <div
        className={cn(
          'fixed inset-0 z-[var(--z-menu)] bg-gp-navy transition-opacity duration-500 ease-out-expo lg:hidden',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="container-gp flex h-[var(--header-h)] items-center justify-between">
          <Image
            src="/images/logo-white.png"
            alt="GP Asfalto"
            width={220}
            height={66}
            className="h-12 w-auto"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="grid h-10 w-10 place-items-center border border-gp-steel/30 text-gp-bone"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="container-gp mt-20 flex flex-col gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl uppercase text-gp-bone transition-colors hover:text-gp-green-bright"
            >
              {item.label}
            </Link>
          ))}
          
            href={`https://wa.me/${site.company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 w-fit"
          >
            Solicitar Orçamento
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </>
  )
}
