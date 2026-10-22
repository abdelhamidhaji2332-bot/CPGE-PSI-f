import { NextResponse } from "next/server";
import { MAX_BYTES, cleanTitle, sniffMime } from "@/lib/validate";
import { CATEGORIES, SUBJECTS } from "@/lib/data";
// Server-side gate. To persist, stream `file` to S3/R2 here and return the object key.
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file"), title = String(form.get("title") ?? "");
  const subject = String(form.get("subject")), category = String(form.get("category"));
  if (!(file instanceof File)) return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Fichier supérieur à 25 Mo." }, { status: 413 });
  if (!SUBJECTS.some((s) => s.id === subject) || !CATEGORIES.some((c) => c.id === category))
    return NextResponse.json({ error: "Matière ou catégorie invalide." }, { status: 400 });
  const mime = await sniffMime(file);
  if (!mime) return NextResponse.json({ error: "Format refusé : PDF, PNG ou JPG uniquement." }, { status: 415 });
  return NextResponse.json({ ok: true, mime, title: cleanTitle(title) || "Sans titre" });
}
