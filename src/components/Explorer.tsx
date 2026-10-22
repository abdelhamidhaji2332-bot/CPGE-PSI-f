"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Image as ImageIcon, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { CATEGORIES, SUBJECTS, subjectLabel } from "@/lib/data";
import { useUploads } from "@/hooks/useUploads";
import type { CategoryId, ResourceFile, SubjectId } from "@/types";
import { CommandPalette } from "./CommandPalette";
import { ReaderModal } from "./ReaderModal";
import { ThemeToggle } from "./ThemeToggle";
import { UploadPanel } from "./UploadPanel";

export function Explorer({ repoFiles, children }: { repoFiles: ResourceFile[]; children?: ReactNode }) {
  const { uploads, add, error } = useUploads();
  const [subject, setSubject] = useState<SubjectId | null>(null);
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [palette, setPalette] = useState(false), [drawer, setDrawer] = useState(false);
  const [reader, setReader] = useState<ResourceFile | null>(null);
  const all = useMemo(() => [...uploads, ...repoFiles], [uploads, repoFiles]);
  const shown = all.filter((f) => (!subject || f.subject === subject) && (!category || f.category === category));
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette((p) => !p); } };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  const pickSubject = useCallback((s: SubjectId) => { setSubject(s); setDrawer(false); }, []);
  const nav = (
    <nav aria-label="Matières" className="flex flex-col gap-1">
      {[{ id: null, label: "Tout le dépôt" }, ...SUBJECTS].map((s) => (
        <button key={s.id ?? "all"} onClick={() => { setSubject(s.id as SubjectId | null); setDrawer(false); }}
          className={`rounded-lg px-3 py-2.5 text-left font-medium transition-colors ${subject === s.id ? "bg-accent text-bg" : "hover:bg-surface"}`}>{s.label}</button>
      ))}
      <Link href="/tipe" className="mt-4 rounded-lg border border-accent px-3 py-2.5 font-semibold text-accent">TIPE</Link>
    </nav>
  );
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24">
      <header className="flex items-center gap-3 py-5">
        <button className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden" onClick={() => setDrawer(true)} aria-label="Ouvrir le menu"><Menu size={18} /></button>
        <h1 className="flex-1 text-lg font-extrabold tracking-tight">CPGE PSI Maroc</h1>
        <button onClick={() => setPalette(true)} className="flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted hover:bg-surface">
          <Search size={16} /> Rechercher <kbd className="hidden rounded bg-line px-1.5 font-mono text-xs sm:inline">⌘K</kbd>
        </button>
        <ThemeToggle />
      </header>
      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">{nav}</aside>
        <main className="min-w-0 space-y-10">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{subject ? subjectLabel(subject) : "Tout le programme PSI"}</h2>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Catégories">
              {[{ id: null, label: "Toutes" }, ...CATEGORIES].map((c) => (
                <button key={c.id ?? "all"} onClick={() => setCategory(c.id as CategoryId | null)} aria-pressed={category === c.id}
                  className={`rounded-full border px-4 py-1.5 text-sm ${category === c.id ? "border-accent bg-accent text-bg" : "border-line hover:bg-surface"}`}>{c.label}</button>
              ))}
            </div>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            <AnimatePresence initial={false}>
              {shown.map((f) => (
                <motion.li key={f.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <button onClick={() => setReader(f)} className="flex w-full items-center gap-4 py-4 text-left hover:bg-surface/60">
                    {f.mime === "application/pdf" ? <FileText className="text-accent" /> : <ImageIcon className="text-accent" />}
                    <span className="min-w-0 flex-1"><span className="block truncate font-semibold">{f.title}</span>
                      <span className="text-sm text-muted">{subjectLabel(f.subject)}, {CATEGORIES.find((c) => c.id === f.category)?.label}{f.source === "upload" && ", importé"}</span></span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
            {shown.length === 0 && <li className="py-12 text-muted">Aucun fichier ici. Déposez un document ci-dessous ou ajoutez-le dans <code className="font-mono">public/data/</code>.</li>}
          </ul>
          <UploadPanel onFiles={add} error={error} />
          {children}
        </main>
      </div>
      <AnimatePresence>
        {drawer && (
          <motion.div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={(e) => e.stopPropagation()} className="h-full w-72 bg-bg p-4" initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }} transition={{ type: "spring", damping: 30, stiffness: 320 }}>
              <button className="mb-4 grid h-10 w-10 place-items-center" onClick={() => setDrawer(false)} aria-label="Fermer le menu"><X size={18} /></button>{nav}
            </motion.div>
          </motion.div>
        )}
        {palette && <CommandPalette key="p" files={all} onClose={() => setPalette(false)} onSubject={pickSubject} onOpen={setReader} />}
        {reader && <ReaderModal key="r" file={reader} onClose={() => setReader(null)} />}
      </AnimatePresence>
    </div>
  );
}
