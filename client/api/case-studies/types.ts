export interface CaseStudyStat {
  id: number;
  label: string;
  value: string;
}

export interface CaseStudyOutcome {
  id: number;
  text: string;
}

export interface CaseStudy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  industry: string;
  intro: string;
  challenge: string;
  solution: string;
  accentColor: "red" | "orange" | "blue";
  tags: string[];
  image?: { url: string; alternativeText?: string };
  stats: CaseStudyStat[];
  outcomes: CaseStudyOutcome[];
  createdAt: string;
  publishedAt: string;
}