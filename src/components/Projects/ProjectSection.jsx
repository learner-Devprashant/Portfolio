import { useRef } from "react";
import { PROJECTS } from "../../utils/data"; // <-- FIX THIS PATH
import SectionHeader from "../shared/SectionHeader";

function ProjectCard({ title, tags, desc }) {
  return (
    <div className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-700">
      <div className="flex gap-2 flex-wrap mb-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-yellow  text-black font-semibold px-2 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <p className="text-gray-400 text-sm mt-2">{desc}</p>
    </div>
  );
}

export default function ProjectsSection() {
  const gridRef = useRef(null);

  console.log(PROJECTS); // 🔍 DEBUG

  return (
    <section className="bg-black p-5">
      <SectionHeader label="Projects" light />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {PROJECTS && PROJECTS.length > 0 ? (
          PROJECTS.map((p, i) => <ProjectCard key={i} {...p} />)
        ) : (
          <p className="text-white">No projects found</p>
        )}
      </div>
    </section>
  );
}
