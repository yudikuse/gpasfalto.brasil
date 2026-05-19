import { site } from '@/data/content'

export function SideTagline() {
  return (
    <div className="side-tagline pointer-events-none hidden md:block">
      <span className="whitespace-nowrap">
        {site.company.location}
        <span className="mx-3 text-gp-green-bright/70">·</span>
        EST. {site.company.founded}
      </span>
    </div>
  )
}
