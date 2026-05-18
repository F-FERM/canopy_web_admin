export interface ListContactLandingResponse {
    _id: string;
    badgeText: string;
    heading: string;
    headingHighlight: string;
    description: string;
    backgroundImage: string;
    buttons: Button[];
    contactTitle: string;
    contactHighlight: string;
    contactCards: ContactCard[];
    featureCards: FeatureCard[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface FeatureCard {
    title: string;
    description: string;
    icon: string;
}

export interface ContactCard {
    title: string;
    icon: string;
    details: string[];
}

export interface Button {
    label: string;
    link: string;
    variant: "primary" | "outline";
    icon: string;
}