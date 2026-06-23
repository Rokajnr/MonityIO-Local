export interface HeroSection {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface TickerItemComponent {
  id: number;
  text: string;
}

export interface TickerSection {
  id: number;
  items?: TickerItemComponent[];
}

export interface ProcessStepComponent {
  id: number;
  num: string;
  title: string;
  description: string;
  tag: string;
  color: "red" | "orange" | "gold" | "blue";
}

export interface ProcessSection {
  id: number;
  eyebrow?: string;
  title: string;
  steps?: ProcessStepComponent[];
}

export interface ChartColumnComponent {
  id: number;
  height: number;
}

export interface DashboardSection {
  id: number;
  eyebrow?: string;
  title: string;
  description: string;
  projectsActiveCount?: number;
  complianceRate?: string;
  uptimeRate?: string;
  alertsCount?: number;
  tasksCount?: number;
  chartHeights?: ChartColumnComponent[];
}

export interface FeatureItemComponent {
  id: number;
  title: string;
  icon: string;
  color: "red" | "orange" | "gold" | "blue";
  description: string;
}

export interface FeaturesSection {
  id: number;
  title: string;
  items?: FeatureItemComponent[];
}

export interface StandardStatComponent {
  id: number;
  value: string;
  label: string;
  color: "red" | "blue" | "yellow";
}

export interface StandardsSection {
  id: number;
  visualTitle: string;
  visualDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  stats?: StandardStatComponent[];
}

export interface SectorComponent {
  id: number;
  icon: string;
  title: string;
  tag: string;
}

export interface IndustriesSection {
  id: number;
  title: string;
  description: string;
  sectors?: SectorComponent[];
}

export interface FaqItemComponent {
  id: number;
  question: string;
  answer: string;
}

export interface FaqSection {
  id: number;
  title: string;
  subtitle: string;
  faqs?: FaqItemComponent[];
}

export interface ContactSection {
  id: number;
  title: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  phone?: string;
  email?: string;
  location?: string;
}

export interface Homepage {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  hero?: HeroSection;
  ticker?: TickerSection;
  process?: ProcessSection;
  dashboard?: DashboardSection;
  features?: FeaturesSection;
  standards?: StandardsSection;
  industries?: IndustriesSection;
  faq?: FaqSection;
  contact?: ContactSection;
}
