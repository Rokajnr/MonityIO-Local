import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsChartColumn extends Struct.ComponentSchema {
  collectionName: 'components_sections_chart_columns';
  info: {
    displayName: 'Chart Column';
    icon: 'chart-bar';
  };
  attributes: {
    height: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
  };
}

export interface SectionsContact extends Struct.ComponentSchema {
  collectionName: 'components_sections_contacts';
  info: {
    displayName: 'Contact';
    icon: 'phone-alt';
  };
  attributes: {
    email: Schema.Attribute.String;
    location: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    primaryCtaLink: Schema.Attribute.String;
    primaryCtaText: Schema.Attribute.String;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsDashboard extends Struct.ComponentSchema {
  collectionName: 'components_sections_dashboards';
  info: {
    displayName: 'Dashboard';
    icon: 'desktop';
  };
  attributes: {
    alertsCount: Schema.Attribute.Integer;
    chartHeights: Schema.Attribute.Component<'sections.chart-column', true>;
    complianceRate: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String;
    projectsActiveCount: Schema.Attribute.Integer;
    tasksCount: Schema.Attribute.Integer;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
    uptimeRate: Schema.Attribute.String;
  };
}

export interface SectionsFaq extends Struct.ComponentSchema {
  collectionName: 'components_sections_faqs';
  info: {
    displayName: 'Faq';
    icon: 'question-circle';
  };
  attributes: {
    faqs: Schema.Attribute.Component<'sections.faq-item', true>;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_items';
  info: {
    displayName: 'Faq Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_items';
  info: {
    displayName: 'Feature Item';
    icon: 'gem';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['red', 'orange', 'gold', 'blue']> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFeatures extends Struct.ComponentSchema {
  collectionName: 'components_sections_features';
  info: {
    displayName: 'Features';
    icon: 'list';
  };
  attributes: {
    items: Schema.Attribute.Component<'sections.feature-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    icon: 'heading';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCtaLink: Schema.Attribute.String;
    primaryCtaText: Schema.Attribute.String;
    secondaryCtaLink: Schema.Attribute.String;
    secondaryCtaText: Schema.Attribute.String;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsIndustries extends Struct.ComponentSchema {
  collectionName: 'components_sections_industries';
  info: {
    displayName: 'Industries';
    icon: 'industry';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    sectors: Schema.Attribute.Component<'sections.sector', true>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsProcess extends Struct.ComponentSchema {
  collectionName: 'components_sections_processes';
  info: {
    displayName: 'Process';
    icon: 'list-ol';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'sections.process-step', true>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_sections_process_steps';
  info: {
    displayName: 'Process Step';
    icon: 'step-forward';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['red', 'orange', 'gold', 'blue']> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    num: Schema.Attribute.String & Schema.Attribute.Required;
    tag: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSector extends Struct.ComponentSchema {
  collectionName: 'components_sections_sectors';
  info: {
    displayName: 'Sector';
    icon: 'globe';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    tag: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStandardStat extends Struct.ComponentSchema {
  collectionName: 'components_sections_standard_stats';
  info: {
    displayName: 'Standard Stat';
    icon: 'percent';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['red', 'blue', 'yellow']> &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStandards extends Struct.ComponentSchema {
  collectionName: 'components_sections_standards';
  info: {
    displayName: 'Standards';
    icon: 'shield-alt';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    stats: Schema.Attribute.Component<'sections.standard-stat', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    visualDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    visualTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTicker extends Struct.ComponentSchema {
  collectionName: 'components_sections_tickers';
  info: {
    displayName: 'Ticker';
    icon: 'align-justify';
  };
  attributes: {
    items: Schema.Attribute.Component<'sections.ticker-item', true>;
  };
}

export interface SectionsTickerItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_ticker_items';
  info: {
    displayName: 'Ticker Item';
    icon: 'circle';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.chart-column': SectionsChartColumn;
      'sections.contact': SectionsContact;
      'sections.dashboard': SectionsDashboard;
      'sections.faq': SectionsFaq;
      'sections.faq-item': SectionsFaqItem;
      'sections.feature-item': SectionsFeatureItem;
      'sections.features': SectionsFeatures;
      'sections.hero': SectionsHero;
      'sections.industries': SectionsIndustries;
      'sections.process': SectionsProcess;
      'sections.process-step': SectionsProcessStep;
      'sections.sector': SectionsSector;
      'sections.standard-stat': SectionsStandardStat;
      'sections.standards': SectionsStandards;
      'sections.ticker': SectionsTicker;
      'sections.ticker-item': SectionsTickerItem;
      'shared.link': SharedLink;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
