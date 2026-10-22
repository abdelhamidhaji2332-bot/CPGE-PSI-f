import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { CATEGORIES, SUBJECTS } from "./data";
import type { ResourceFile } from "@/types";
const MIME: Record<string, string> = { ".pdf": "application/pdf", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };
const ROOT = path.join(process.cwd(), "public", "data");
export async function getRepoFiles(): Promise<ResourceFile[]> {
  const out: ResourceFile[] = [];
  for (const s of SUBJECTS) for (const c of CATEGORIES) {
    let names: string[] = [];
    try { names = await fs.readdir(path.join(ROOT, s.id, c.id)); } catch { continue; }
    for (const n of names) {
      const ext = path.extname(n).toLowerCase();
      if (!MIME[ext]) continue;
      out.push({ id: `${s.id}/${c.id}/${n}`, title: n.slice(0, -ext.length).replace(/[-_]+/g, " "),
        subject: s.id, category: c.id, url: `/data/${s.id}/${c.id}/${encodeURIComponent(n)}`, mime: MIME[ext], source: "repo" });
    }
  }
  return out;
}
