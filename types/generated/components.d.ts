import type { Schema, Struct } from '@strapi/strapi';

export interface AudiencePersona extends Struct.ComponentSchema {
  collectionName: 'components_audience_personas';
  info: {
    displayName: 'Persona';
  };
  attributes: {
    description: Schema.Attribute.Text;
    showcaseImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ColorsColorSlide extends Struct.ComponentSchema {
  collectionName: 'components_colors_color_slides';
  info: {
    displayName: 'Color Slide';
  };
  attributes: {
    gradientBottom: Schema.Attribute.String;
    gradientMiddle: Schema.Attribute.String;
    gradientTop: Schema.Attribute.String;
    leftText: Schema.Attribute.String;
    penImage: Schema.Attribute.Media<'images' | 'files'>;
    rightText: Schema.Attribute.String;
    textColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#ffffff'>;
  };
}

export interface DetailsDetailsSection extends Struct.ComponentSchema {
  collectionName: 'components_details_details_sections';
  info: {
    displayName: 'Details Section';
  };
  attributes: {
    hoverImage: Schema.Attribute.Media<'images' | 'files'>;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface DetailsGalleryTile extends Struct.ComponentSchema {
  collectionName: 'components_details_gallery_tiles';
  info: {
    displayName: 'Gallery Tile';
  };
  attributes: {
    label: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface FooterFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_links';
  info: {
    displayName: 'Footer Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SmartPaperSlide extends Struct.ComponentSchema {
  collectionName: 'components_smart_paper_slides';
  info: {
    displayName: 'Slide';
  };
  attributes: {
    cardText: Schema.Attribute.Text;
    cardTitle: Schema.Attribute.String;
    heading: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageLayout: Schema.Attribute.Enumeration<['centered', 'fullscreen']>;
  };
}

export interface SpecsSpecGroup extends Struct.ComponentSchema {
  collectionName: 'components_specs_spec_groups';
  info: {
    displayName: 'Spec Group';
  };
  attributes: {
    items: Schema.Attribute.Component<'specs.spec-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SpecsSpecItem extends Struct.ComponentSchema {
  collectionName: 'components_specs_spec_items';
  info: {
    displayName: 'Spec Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'audience.persona': AudiencePersona;
      'colors.color-slide': ColorsColorSlide;
      'details.details-section': DetailsDetailsSection;
      'details.gallery-tile': DetailsGalleryTile;
      'footer.footer-link': FooterFooterLink;
      'smart-paper.slide': SmartPaperSlide;
      'specs.spec-group': SpecsSpecGroup;
      'specs.spec-item': SpecsSpecItem;
    }
  }
}
