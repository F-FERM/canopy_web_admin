export interface ListEventLandingResponse {
    _id: string;
    badgeText: string;
    heading: string;
    headingHighlight: string;
    headingEnd: string;
    description: string;
    buttons: Button[];
    images: Image[];
    featuredEvent: FeaturedEvent;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface FeaturedEvent {
    badgeText: string;
    title: string;
    date: string;
    location: string;
    description: string;
    backgroundImage: string;
    button: Button;
}

export interface Image {
    image: string;
}

export interface Button {
    label: string;
    link: string;
    variant: "primary" | "outline";
}