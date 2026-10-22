import { ArrowUpRight } from "lucide-react";
import { TIPE_LINKS } from "@/lib/data";
export function TipeHub({ full = false }: { full?: boolean }) {
  return (
    <section id="tipe" className="rounded-3xl bg-accent p-6 text-bg sm:p-10">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Préparer son TIPE</h2>
      <p className="mt-2 max-w-prose opacity-80">Règlement, exemples de dossiers, matériel et articles : six adresses pour mener le projet du thème à l'oral.</p>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-bg/20 sm:grid-cols-2">
        {TIPE_LINKS.map((l) => (
          <li key={l.href} className="bg-accent">
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-4 p-5 hover:bg-bg/10">
              <span><span className="block font-semibold">{l.label}</span>
                {full && <span className="mt-1 block text-sm opacity-80">{l.note}</span>}</span>
              <ArrowUpRight size={18} className="mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
