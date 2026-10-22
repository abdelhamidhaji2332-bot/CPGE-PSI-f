import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TipeHub } from "@/components/TipeHub";
export default function TipePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-8 flex items-center justify-between"><Link href="/" className="font-semibold text-accent">Retour au dépôt</Link><ThemeToggle /></div>
      <TipeHub full />
    </main>
  );
}
