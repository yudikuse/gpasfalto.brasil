'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

/**
 * Banner de consentimento de cookies (LGPD).
 * Os cookies não-essenciais (Google Ads e YouTube) ficam NEGADOS por padrão
 * via Google Consent Mode (definido no layout, antes do gtag carregar). Este
 * banner só faz o "update" da escolha do usuário e guarda em localStorage.
 *
 * Reabrir: qualquer elemento pode disparar `window.dispatchEvent(new Event('gp:open-cookie-prefs'))`
 * (ver CookiePrefsButton) para o usuário rever a decisão.
 */

const KEY = 'gp-consent-v1'
type Choice = 'granted' | 'denied'

function applyConsent(choice: Choice) {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void }
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      ad_storage: choice,
      analytics_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
    })
  }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem(KEY)
    } catch {
      /* localStorage indisponível: mostra o banner */
    }
    if (saved === 'granted' || saved === 'denied') {
      applyConsent(saved)
    } else {
      setOpen(true)
    }
    const reopen = () => setOpen(true)
    window.addEventListener('gp:open-cookie-prefs', reopen)
    return () => window.removeEventListener('gp:open-cookie-prefs', reopen)
  }, [])

  function decide(choice: Choice) {
    try {
      localStorage.setItem(KEY, choice)
    } catch {
      /* ignora */
    }
    applyConsent(choice)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-5"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl border border-gp-green-bright/20 bg-gp-navy-deep/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-gp-bone/80">
          Usamos cookies essenciais para o site funcionar e, com a sua autorização,
          cookies de estatística e marketing (Google e YouTube). Você pode aceitar ou
          recusar os não-essenciais. Saiba mais na{' '}
          <Link href="/privacidade" className="text-gp-green-bright underline underline-offset-2 hover:opacity-80">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide('denied')}
            className="rounded-md border border-gp-steel/50 px-4 py-2 text-sm font-medium text-gp-bone/90 transition-colors hover:border-gp-bone"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className="rounded-md bg-gp-green-bright px-4 py-2 text-sm font-semibold text-gp-navy-deep transition-opacity hover:opacity-90"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
