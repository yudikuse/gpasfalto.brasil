'use client'

import { useEffect, useState } from 'react'
import { Play, X } from 'lucide-react'
import { site } from '@/data/content'
import { cn } from '@/lib/cn'

export function VideosGallery() {
  const [activeId, setActiveId] = useState<string | null>(null)

  // Fecha modal com ESC + trava scroll do body
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null)
    }
    if (activeId) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeId])

  return (
    <section id="videos" className="relative py-32">
      <div className="container-gp">
        {/* Heading */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-12 bg-gp-green-bright" />
              <span className="eyebrow">Em vídeo</span>
            </div>
            <h2 className="font-display text-display-xl uppercase text-gp-bone">
              Obras
              <br />
              <span className="text-gp-green-bright">documentadas.</span>
            </h2>
          </div>
          <p className="max-w-md text-gp-bone/65">
            Imagens reais de execução em campo. Cada vídeo mostra o controle técnico,
            a equipe própria e o cronograma da GP Asfalto.
          </p>
        </div>

        {/* Grid de vídeos */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setActiveId(video.id)}
              className="group relative aspect-video overflow-hidden bg-gp-navy-deep text-left"
              aria-label={`Reproduzir ${video.title}`}
            >
              {/* Thumbnail YouTube */}
              <img
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay escurece no hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-gp-navy-deep via-gp-navy-deep/40 to-transparent transition-opacity duration-400 group-hover:from-gp-navy-deep/95 group-hover:via-gp-navy-deep/60" />

              {/* Play button central */}
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-gp-bone/50 bg-gp-navy-deep/40 backdrop-blur-sm transition-all duration-400 ease-out-expo group-hover:scale-110 group-hover:border-gp-green-bright group-hover:bg-gp-green-bright">
                  <Play
                    size={22}
                    className="ml-1 fill-gp-bone text-gp-bone transition-colors group-hover:fill-gp-navy-deep group-hover:text-gp-navy-deep"
                  />
                </span>
              </div>

              {/* Tag */}
              <div className="absolute left-4 top-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gp-green-bright">
                  {video.tag}
                </span>
              </div>

              {/* Title bottom */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-base uppercase leading-tight text-gp-bone group-hover:text-gp-green-bright">
                  {video.title}
                </h3>
                <p className="mt-1 text-xs text-gp-bone/70">{video.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal player */}
      <div
        className={cn(
          'fixed inset-0 z-[var(--z-modal)] grid place-items-center bg-gp-navy-deep/95 backdrop-blur-md transition-opacity duration-300',
          activeId ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setActiveId(null)}
      >
        <button
          onClick={() => setActiveId(null)}
          className="absolute right-6 top-6 z-10 grid h-12 w-12 place-items-center border border-gp-bone/30 text-gp-bone transition-colors hover:border-gp-green-bright hover:text-gp-green-bright"
          aria-label="Fechar vídeo"
        >
          <X size={20} />
        </button>

        <div
          className="relative w-full max-w-6xl px-[var(--gutter)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aspect-video w-full overflow-hidden bg-black shadow-2xl">
            {activeId && (
              <iframe
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0`}
                title="Vídeo GP Asfalto"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
