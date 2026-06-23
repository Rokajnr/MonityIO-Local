export interface LinkComponent {
  id: number;
  text: string;
  url: string;
}

export interface SeoComponent {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage?: any;
}

export interface Global {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  defaultSeo?: SeoComponent;
  favicon?: any;
  navbarLinks?: LinkComponent[];
  navbarCtaText?: string;
  navbarCtaLink?: string;
  footerLinks?: LinkComponent[];
  copyrightText?: string;
}
