"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { MAX_BYTES, sniffMime } from "@/lib/validate";
import type { ResourceFile, UploadMeta } from "@/types";
export function useUploads() {
  const [uploads, setUploads] = useState<ResourceFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const urls = useRef<string[]>([]);
  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);
  const add = useCallback(async (files: File[], meta: UploadMeta) => {
    setError(null);
    for (const f of files) {
      if (f.size > MAX_BYTES) return setError(`${f.name} dépasse 25 Mo.`);
      if (!(await sniffMime(f))) return setError(`${f.name} : format non pris en charge (PDF, PNG, JPG).`);
      const fd = new FormData();
      fd.set("file", f); fd.set("subject", meta.subject); fd.set("category", meta.category);
      fd.set("title", meta.title || f.name.replace(/\.[^.]+$/, ""));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) return setError(json.error);
      const url = URL.createObjectURL(f); urls.current.push(url);
      setUploads((u) => [{ id: crypto.randomUUID(), title: json.title, subject: meta.subject, category: meta.category,
        url, mime: json.mime, source: "upload", size: f.size }, ...u]);
    }
  }, []);
  return { uploads, add, error };
}
