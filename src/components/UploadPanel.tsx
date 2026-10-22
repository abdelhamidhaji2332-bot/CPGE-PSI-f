"use client";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, SUBJECTS } from "@/lib/data";
import type { CategoryId, SubjectId } from "@/types";
interface Props { onFiles: (f: File[], m: { title: string; subject: SubjectId; category: CategoryId }) => Promise<void>; error: string | null }
export function UploadPanel({ onFiles, error }: Props) {
  const [subject, setSubject] = useState<SubjectId>("math");
  const [category, setCategory] = useState<CategoryId>("cours");
  const [title, setTitle] = useState(""), [over, setOver] = useState(false), [busy, setBusy] = useState(false);
  const go = async (list: FileList | null) => {
    if (!list?.length) return;
    setBusy(true); await onFiles([...list], { title, subject, category }); setBusy(false); setTitle("");
  };
  const field = "h-10 rounded-lg border border-line bg-surface px-3 text-sm";
  return (
    <section aria-label="Importer un document" className="rounded-2xl border border-line bg-surface p-4">
      <div className="grid gap-2 sm:grid-cols-3">
        <input className={field} placeholder="Titre (facultatif)" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Titre" />
        <select className={field} value={subject} onChange={(e) => setSubject(e.target.value as SubjectId)} aria-label="Matière">{SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
        <select className={field} value={category} onChange={(e) => setCategory(e.target.value as CategoryId)} aria-label="Catégorie">{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select>
      </div>
      <label onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); go(e.dataTransfer.files); }}
        className={`mt-3 flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${over ? "border-accent bg-accent/5" : "border-line"}`}>
        <UploadCloud className="text-accent" />
        <span className="font-medium">{busy ? "Vérification du fichier…" : "Déposez un PDF, PNG ou JPG ici, ou cliquez pour choisir"}</span>
        <span className="text-xs text-muted">25 Mo maximum par fichier</span>
        <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg" className="sr-only" onChange={(e) => go(e.target.files)} />
      </label>
      {error && <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </section>
  );
}
