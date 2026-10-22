// Shared by client and server: trust magic bytes, never the file extension or declared MIME.
export const MAX_BYTES = 25 * 1024 * 1024;
export async function sniffMime(f: Blob): Promise<string | null> {
  const b = new Uint8Array(await f.slice(0, 4).arrayBuffer());
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return "application/pdf";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  return null;
}
export const cleanTitle = (t: string) => t.replace(/[<>"'`]/g, "").trim().slice(0, 120);
