export interface ServiceDetailResponse {
  heroSection: HeroSection;
  whySection: WhySection;
  responsibilities: Responsibilities;
  industries: Industries;
}

export interface HeroSection {
  firstHeading: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

export interface WhySection {
  title: string;
  highlightedText: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export interface Responsibilities {
  title: string;
  items: ResponsibilityItem[];
}

export interface ResponsibilityItem {
  heading: string;
  description: string;
}

export interface Industries {
  title: string;
  description: string;
  items: IndustryItem[];
}

export interface IndustryItem {
  name: string;
  details: string;
}
