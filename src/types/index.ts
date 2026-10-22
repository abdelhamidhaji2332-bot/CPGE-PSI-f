export type SubjectId = "math" | "physique" | "sii" | "chimie" | "informatique";
export type CategoryId = "cours" | "td" | "exercices" | "cnc" | "summit";
export interface ResourceFile {
  id: string; title: string; subject: SubjectId; category: CategoryId;
  url: string; mime: string; source: "repo" | "upload"; size?: number;
}
export interface UploadMeta { title: string; subject: SubjectId; category: CategoryId }
