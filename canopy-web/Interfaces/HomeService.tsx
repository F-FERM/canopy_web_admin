export interface ListHomeServiceResponse {
  _id: string;
  badgeText: string;
  heading: string;
  headingHighlight: string;
  description: string;
  services: Service[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}
