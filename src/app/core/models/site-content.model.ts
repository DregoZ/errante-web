export interface FeatureBlock {
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  specialty: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  event: string;
  date: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    location: string;
    hours: string;
    instagram: string;
    whatsapp: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  features: FeatureBlock[];
  steps: StepItem[];
  team: TeamMember[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  faqs: FaqItem[];
}
