"use client";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryLabel, SUBJECTS, subjectLabel } from "@/lib/data";
import { fuzzyScore } from "@/lib/fuzzy";
import type { ResourceFile, SubjectId } from "@/types";
type Item = { key: string; label: string; hint: string; run: () => void };
interface Props { files: ResourceFile[]; onClose: () => void; onSubject: (s: SubjectId) => void; onOpen: (f: ResourceFile) => void }
export function CommandPalette({ files, onClose, onSubject, onOpen }: Props) {
  const [q, setQ] = useState(""), [idx, setIdx] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const items = useMemo(() => {
    const all: Item[] = [
      ...SUBJECTS.map((s) => ({ key: s.id, label: s.label, hint: "Matière", run: () => onSubject(s.id) })),
      ...files.map((f) => ({ key: f.id, label: f.title, hint: `${subjectLabel(f.subject)} · ${categoryLabel(f.category)}${f.source === "upload" ? " · importé" : ""}`, run: () => onOpen(f) })),
    ];
    return all.map((i) => ({ i, s: fuzzyScore(q, `${i.label} ${i.hint}`) })).filter((x) => x.s).sort((a, b) => b.s - a.s).slice(0, 8).map((x) => x.i);
  }, [q, files, onSubject, onOpen]);
  const pick = (i?: Item) => { if (i) { i.run(); onClose(); } };
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-start bg-black/40 p-4 pt-[12vh]" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.97 }} animate={{ scale: 1 }}
        className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl" role="dialog" aria-label="Recherche">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} className="text-muted" />
          <input ref={ref} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} placeholder="Chercher une matière, un cours, un fichier importé"
            className="h-14 flex-1 bg-transparent outline-none placeholder:text-muted"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((idx + 1) % Math.max(items.length, 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setIdx((idx - 1 + items.length) % Math.max(items.length, 1)); }
              if (e.key === "Enter") pick(items[idx]);
              if (e.key === "Escape") onClose();
            }} />
        </div>
        <ul role="listbox" className="max-h-80 overflow-auto p-2">
          {items.length === 0 && <li className="p-4 text-sm text-muted">Aucun résultat pour « {q} ». Essayez un mot plus court.</li>}
          {items.map((it, n) => (
            <li key={it.key} role="option" aria-selected={n === idx} onMouseEnter={() => setIdx(n)} onClick={() => pick(it)}
              className={`flex cursor-pointer items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 ${n === idx ? "bg-accent/10" : ""}`}>
              <span className="truncate font-medium">{it.label}</span><span className="shrink-0 text-xs text-muted">{it.hint}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
