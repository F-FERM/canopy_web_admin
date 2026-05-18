export interface ListHomeHeroSection {
  _id: string;
  badgeText: string;
  badgeIcon: string;
  heading: string;
  headingHighlight: string;
  subtext: string;
  buttons: HeroButton[];
  slides: HeroSlide[];
  slideInterval: number;
  patternImage: string;
  accentColor: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface HeroSlide {
  image: string;
  galleryImages?: string[];
  title: string;
  description: string;
  isActive: boolean;
}

export interface HeroButton {
  label: string;
  href: string;
  variant: "primary" | "outline" | "ghost";
}