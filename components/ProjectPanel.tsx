import Image from 'next/image'

interface Project {
  slug:        string
  segment:     string
  title:       string
  description: string
  photo:       string
  index:       string
}

export default function ProjectPanel({ project, panelId }: { project: Project; panelId: string }) {
  return (
    <section className="panel group bg-navy" id={panelId}>

      {/* PHOTO BG */}
      <div className="proj-bg absolute inset-0 z-0">
        {project.photo ? (
          <Image
            src={project.photo}
            alt={project.title.replace('\n', ' ')}
            fill
            className="object-cover"
            priority={panelId === 'p3'}
            sizes="100vw"
          />
        ) : (
          /* Placeholder gradient até ter a foto real */
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(155deg,#0a1606,#162510,#0a1806)' }} />
        )}
      </div>

      {/* OVERLAY */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(6,14,26,.96) 0%, rgba(6,14,26,.2) 45%, rgba(12,29,56,.4) 100%)',
        }}
      />

      {/* INDEX WATERMARK */}
      <div className="absolute right-12 top-20 z-[2] select-none pointer-events-none
        font-display font-black text-white/[.04]"
        style={{ fontSize: 'clamp(100px,16vw,180px)', lineHeight: 1 }}>
        {project.index}
      </div>

      {/* CONTENT */}
      <div className="absolute inset-0 z-[2] flex flex-col justify-end px-10 pb-14 md:px-12">
        <p className="text-[9px] font-medium tracking-[.3em] uppercase text-green mb-3">
          {project.segment}
        </p>
        <h2
          className="font-display font-black text-white leading-[.9] tracking-[-0.01em] whitespace-pre-line"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
        >
          {project.title}
        </h2>
        <p className="text-[12px] font-light tracking-[.04em] text-white/45 mt-4 max-w-[480px] leading-[1.7]">
          {project.description}
        </p>
      </div>
    </section>
  )
}
