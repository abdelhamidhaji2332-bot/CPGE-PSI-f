"use client";
import { ChevronLeft, ChevronRight, Download, X, ZoomIn, ZoomOut } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ResourceFile } from "@/types";
export function ReaderModal({ file, onClose }: { file: ResourceFile; onClose: () => void }) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const pdf = file.mime === "application/pdf";
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const btn = "grid h-9 w-9 place-items-center rounded-full hover:bg-line disabled:opacity-30";
  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur" role="dialog" aria-modal="true" aria-label={file.title}
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}>
      <header className="flex items-center gap-2 border-b border-line px-4 py-2">
        <h2 className="min-w-0 flex-1 truncate font-semibold">{file.title}</h2>
        {pdf && <>
          <button className={btn} disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Page précédente"><ChevronLeft size={18} /></button>
          <span className="font-mono text-sm tabular-nums">{page}</span>
          <button className={btn} onClick={() => setPage(page + 1)} aria-label="Page suivante"><ChevronRight size={18} /></button>
        </>}
        <button className={btn} disabled={zoom <= 50} onClick={() => setZoom(zoom - 25)} aria-label="Dézoomer"><ZoomOut size={18} /></button>
        <span className="w-12 text-center font-mono text-sm">{zoom}%</span>
        <button className={btn} disabled={zoom >= 300} onClick={() => setZoom(zoom + 25)} aria-label="Zoomer"><ZoomIn size={18} /></button>
        <a className={btn} href={file.url} download={file.title} aria-label="Télécharger"><Download size={18} /></a>
        <button className={btn} onClick={onClose} aria-label="Fermer"><X size={18} /></button>
      </header>
      <div className="flex-1 overflow-auto p-4">
        {pdf
          ? <iframe key={`${page}-${zoom}`} title={file.title} src={`${file.url}#page=${page}&zoom=${zoom}`} className="h-full min-h-[70vh] w-full rounded-lg border border-line bg-surface" />
          // eslint-disable-next-line @next/next/no-img-element
          : <img src={file.url} alt={file.title} style={{ width: `${zoom}%`, maxWidth: "none" }} className="mx-auto rounded-lg" />}
      </div>
    </motion.div>
  );
}
