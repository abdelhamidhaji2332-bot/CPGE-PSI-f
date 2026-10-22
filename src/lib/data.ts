import type { CategoryId, SubjectId } from "@/types";
export const SUBJECTS: { id: SubjectId; label: string }[] = [
  { id: "math", label: "Mathématiques" }, { id: "physique", label: "Physique" },
  { id: "sii", label: "Sciences de l'Ingénieur" }, { id: "chimie", label: "Chimie" },
  { id: "informatique", label: "Informatique" },
];
export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "cours", label: "Cours" }, { id: "td", label: "TD" }, { id: "exercices", label: "Exercices" },
  { id: "cnc", label: "Annales CNC" }, { id: "summit", label: "Summit" },
];
export const TIPE_LINKS = [
  { label: "SCEI Concours TIPE", href: "https://www.scei-concours.fr/tipe.html", note: "Thème officiel, calendrier et règlement du concours." },
  { label: "TIPE Share", href: "https://tipeshare.com/", note: "Travaux partagés par d'autres candidats." },
  { label: "CPGE Paradise : exemples TIPE", href: "https://cpge-paradise.com/TIPEex.php", note: "Exemples de dossiers et de présentations." },
  { label: "eLearning CPGE : exemples MCOT", href: "https://www.elearning-cpge.com/exemples-tipe-mcot-presentation/", note: "Présentations MCOT commentées." },
  { label: "Micro Planet Maroc", href: "https://www.micro-planet.ma/", note: "Matériel et capteurs pour la partie expérimentale." },
  { label: "ScienceDirect", href: "https://www.sciencedirect.com", note: "Articles scientifiques pour la bibliographie." },
];
export const subjectLabel = (id: string) => SUBJECTS.find((s) => s.id === id)?.label ?? id;
export const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;
