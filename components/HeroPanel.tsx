'use client'

import { site } from '@/data/content'

export default function HeroPanel() {
  const { hero, company } = site

  return (
    <section className="panel bg-[#080808]" id="p1">

      {/* VIDEO BG */}
      {hero.videoLocal ? (
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={hero.videoLocal} type="video/mp4" />
        </video>
      ) : (
        <div className="yt-bg-wrap">
          <iframe
            className="yt-bg-iframe"
            src={`https://www.youtube.com/embed/${hero.videoYoutubeId}?autoplay=1&mute=1&loop=1&playlist=${hero.videoYoutubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=3`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}

      {/* GRAIN */}
      <div className="grain z-[1]" />

      {/* OVERLAY */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,.1) 35%, rgba(0,0,0,.1) 55%, rgba(0,0,0,.88) 100%),
            linear-gradient(to right, rgba(0,0,0,.55) 0%, transparent 60%)
          `,
        }}
      />

      {/* LOCATION VERTICAL */}
      <div
        className="absolute top-20 right-12 z-[3] hidden md:block
          text-[9px] font-medium tracking-[.28em] uppercase text-white/20"
        style={{ writingMode: 'vertical-rl' }}
      >
        {company.location}
      </div>

      {/* CONTENT */}
      <div className="absolute inset-0 z-[3] flex flex-col justify-end px-10 pb-14 md:px-12">

        {/* eyebrow */}
        <div className="anim-1 flex items-center gap-3 mb-5">
          <span className="w-5 h-px bg-green block" />
          <span className="text-[10px] font-medium tracking-[.26em] uppercase text-green">
            {hero.eyebrow}
          </span>
        </div>

        {/* H1 */}
        <h1 className="anim-2 font-display font-black leading-[.88] tracking-[-0.01em]
          text-white"
          style={{ fontSize: 'clamp(64px, 11vw, 148px)' }}
        >
          {hero.line1}
          <span className="block"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,.2)', color: 'transparent' }}>
            {hero.line2}
          </span>
          <span className="block text-green">{hero.line3}</span>
        </h1>

        {/* FOOT */}
        <div className="anim-3 flex flex-wrap items-end justify-between gap-5 mt-8">
          <p className="text-[13px] font-light leading-[1.85] text-white/45 max-w-[340px]">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-end sm:items-center">
            <a
              href="#p7"
              onClick={e => { e.preventDefault(); document.getElementById('p7')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="text-[11px] font-medium tracking-[.14em] uppercase
                text-white bg-green px-8 py-3.5 hover:bg-green2 transition-colors whitespace-nowrap"
            >
              Solicitar Orçamento
            </a>
            <a
              href="#p3"
              onClick={e => { e.preventDefault(); document.getElementById('p3')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="text-[11px] font-light tracking-[.12em] uppercase
                text-white/30 hover:text-white/80 transition-colors"
            >
              Ver obras executadas →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
