'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Play, X } from 'lucide-react'
import { site } from '@/data/content'
import { cn } from '@/lib/cn'

export function FeaturedProjects() {
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
    <section id="obras" className="relative py-32">
      <div className="container-gp">
        {/* Heading */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-12 bg-gp-green-bright" />
              <span className="eyebrow">Obras em destaque</span>
            </div>
            <h2 className="font-display text-display-xl uppercase text-gp-bone">
              Projetos que
              <br />
              <span className="text-gp-green-bright">conectam</span> o Centro-Oeste.
            </h2>
          </div>
          <a
            href={`https://wa.me/${site.company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Solicitar Portfólio
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.projects.map((project) => {
            // Se tiver vídeo, usa thumbnail do YouTube; senão usa a foto local
            const thumbSrc = project.videoId
              ? `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`
              : project.photo
            const hasVideo = Boolean(project.videoId)

            return (
              <article key={project.slug} className="project-card group">
                <button
                  type="button"
                  onClick={() => hasVideo && setActiveId(project.videoId!)}
                  disabled={!hasVideo}
                  className={cn(
                    'relative block aspect-[4/5] w-full overflow-hidden bg-gp-navy-deep text-left',
                    hasVideo ? 'cursor-pointer' : 'cursor-default'
                  )}
                  aria-label={hasVideo ? `Reproduzir vídeo de ${project.title.replace('\n', ' ')}` : project.title.replace('\n', ' ')}
                >
                  {/* Imagem ou thumbnail YouTube */}
                  {hasVideo ? (
                    // Pra thumbnail do YouTube usa <img> normal (URL externa não otimizada)
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbSrc}
                      alt={project.title.replace('\n', ' ')}
                      className="project-image absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={project.photo}
                      alt={project.title.replace('\n', ' ')}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="project-image object-cover"
                    />
                  )}

                  {/* Gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gp-navy-deep via-gp-navy-deep/40 to-transparent transition-opacity duration-400 group-hover:from-gp-navy-deep/95 group-hover:via-gp-navy-deep/60" />

                  {/* Play button (só se tiver vídeo) */}
                  {hasVideo && (
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-gp-bone/40 bg-gp-navy-deep/40 backdrop-blur-sm transition-all duration-400 ease-out-expo group-hover:scale-110 group-hover:border-gp-green-bright group-hover:bg-gp-green-bright">
                        <Play
                          size={22}
                          className="ml-1 fill-gp-bone text-gp-bone transition-colors group-hover:fill-gp-navy-deep group-hover:text-gp-navy-deep"
                        />
                      </span>
                    </div>
                  )}

                  {/* Index number */}
                  <div className="absolute right-6 top-6">
                    <span className="font-display text-3xl text-gp-green-bright/80">
                      {project.index}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-gp-green-bright">
                      {project.segment}
                    </div>
                    <h3 className="mt-2 whitespace-pre-line font-display text-2xl uppercase leading-tight text-gp-bone group-hover:text-gp-green-bright">
                      {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm text-gp-bone/70">
                      {project.description}
                    </p>

                    {hasVideo && (
                      <div className="mt-6 flex items-center gap-3 text-gp-bone/60 transition-colors group-hover:text-gp-green-bright">
                        <span className="text-xs uppercase tracking-wider">Ver obra em vídeo</span>
                        <Play size={14} className="fill-current" />
                      </div>
                    )}
                  </div>
                </button>
              </article>
            )
          })}
        </div>
      </div>

      {/* Modal player YouTube */}
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
