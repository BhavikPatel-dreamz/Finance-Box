"use client";

import { useState } from "react";
import type { HomeContent } from "@/content/home";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Leadership({ leadership }: { leadership: HomeContent["leadership"] }) {
  const people = leadership.people;
  const [start, setStart] = useState(0);
  const visibleCount = Math.min(2, people.length);
  const visible = Array.from({ length: visibleCount }, (_, offset) => people[(start + offset) % Math.max(people.length, 1)]);

  function move(direction: number) {
    if (people.length < 2) return;
    setStart((current) => (current + direction + people.length) % people.length);
  }

  return (
    <section id="team" className="px-6 py-20">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow variant="dark">{leadership.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-md text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">{leadership.title}</h2>
          <div className="mt-5 max-w-md space-y-4 text-sm leading-6 text-white/70">
            {leadership.text.split(/\n\n+/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <ArrowButton label="Previous people" onClick={() => move(-1)} direction="left" />
            <ArrowButton label="Next people" onClick={() => move(1)} direction="right" />
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {visible.filter(Boolean).map((person) => (
            <li key={person.name}>
              <article className="relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#1a4a34] via-[#123026] to-[#0c1218]">
                {person.image ? (
                  <img src={person.image.url} alt={person.image.alt || person.name} className="absolute inset-0 h-full w-full object-cover" />
                ) : null}
                <div className="relative bg-gradient-to-t from-black/75 via-black/30 to-transparent px-5 pt-20 pb-6 text-center">
                  <h3 className="text-lg font-semibold">{person.name}</h3>
                  <p className="mt-1 text-[11px] font-medium tracking-[0.14em] text-white/70 uppercase">{person.role}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArrowButton({ label, onClick, direction }: { label: string; onClick: () => void; direction: "left" | "right" }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
    >
      <svg viewBox="0 0 16 16" className={`h-4 w-4 ${direction === "left" ? "rotate-180" : ""}`} aria-hidden="true">
        <path d="M4 8h8M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
