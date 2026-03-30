import { useRef, memo } from 'react'
import { useStaggerReveal } from '../../hooks/useGSAP'
import { PROJECTS } from '../../utils/data'
import SectionHeader from '../shared/SectionHeader'

const ProjectCard = memo(({ title, tags, desc }) => (
  <div
    data-stagger
    className="proj-bar relative bg-[#1a1a1a] border border-[#2a2a2a] p-7 cursor-pointer overflow-hidden
      transition-all duration-250 hover:-translate-y-1 hover:border-yellow group"
  >
    {/* Tags */}
    <div className="flex gap-1.5 flex-wrap mb-4">
      {tags.map(t => (
        <span key={t} className="bg-yellow text-dark text-[8px] font-extrabold px-2 py-0.5 tracking-[1px] uppercase">
          {t}
        </span>
      ))}
    </div>

    {/* Title */}
    <h3 className="font-bebas text-offwhite tracking-wide mb-2" style={{ fontSize: 22 }}>
      {title}
    </h3>

    {/* Desc */}
    <p className="text-[11px] text-[#888] leading-[1.7] mb-5">{desc}</p>

    {/* Link */}
    <a
      href="#"
      className="text-[10px] font-bold tracking-[2px] uppercase text-yellow flex items-center gap-1.5
        transition-all duration-200 group-hover:gap-3 no-underline"
    >
      View Project →
    </a>
  </div>
))
ProjectCard.displayName = 'ProjectCard'

export default function ProjectsSection() {
  const gridRef = useRef(null)
  useStaggerReveal(gridRef, '[data-stagger]')

  return (
    <section id="projects" className="bg-dark">
      <SectionHeader label="Projects" light />

      <div
        ref={gridRef}
        className="grid gap-5 px-20 py-8 pb-20"
        style={{ gridTemplateColumns: 'repeat(3,1fr)' }}
      >
        {PROJECTS.map(p => <ProjectCard key={p.title} {...p} />)}
      </div>
    </section>
  )
}
