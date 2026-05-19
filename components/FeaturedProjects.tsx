'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/data/content'

export function FeaturedProjects() {
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
          {site.projects.map((project) => (
            <article
              key={project.slug}
              className="project-card group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gp-navy-deep">
                {/* Imagem ou placeholder colorido */}
                <Image
                  src={project.photo}
                  alt={project.title.replace('\n', ' ')}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="project-image object-cover"
                  // Se imagem não existe, fica fundo navy-deep (graceful degradation)
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gp-navy-deep via-gp-navy-deep/30 to-transparent" />

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

                  <div className="mt-6 flex items-center gap-3 text-gp-bone/60 transition-colors group-hover:text-gp-green-bright">
                    <span className="text-xs uppercase tracking-wider">Detalhes</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
