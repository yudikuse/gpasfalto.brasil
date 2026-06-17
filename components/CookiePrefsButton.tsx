'use client'

/** Link/botão que reabre o banner de cookies para o usuário rever a escolha. */
export function CookiePrefsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('gp:open-cookie-prefs'))}
      className={
        className ??
        'font-mono text-xs uppercase tracking-widest text-gp-steel transition-colors hover:text-gp-green-bright'
      }
    >
      Preferências de cookies
    </button>
  )
}
