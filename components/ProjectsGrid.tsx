"use client";

import Link from "next/link";
import { useState } from "react";
import {
  type Project,
  type ProjectCategory,
  projectFilters,
} from "@/lib/content/projects";

type Filter = "all" | ProjectCategory;

export function ProjectsGrid({ items }: { items: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? items : items.filter((p) => p.category === filter);

  return (
    <>
      <div className="filters">
        {projectFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`chip${filter === f.id ? " active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {visible.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="pc">
            <div className="pc-media">
              <div className="ph">
                <span className="ph-tag">[ {p.name} ]</span>
              </div>
            </div>
            <div className="pc-body">
              <div className="pc-tag">{p.tag}</div>
              <div className="pc-name">{p.name}</div>
              <div className="pc-desc">{p.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
