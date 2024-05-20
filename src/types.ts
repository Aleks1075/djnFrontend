export type User = {
    _id: string;
    email: string;
    name: string;
    phone: string;
};

export type EventItem = {
    _id: string;
    name: string;
    price: number;
};

export type MyEvent = {
    _id: string;
    user: string;
    type: string;
    city: string;
    description: string;
    numberOfParticipants: number;
    facilities: string[];
    eventItems: EventItem[];
    imageUrls: string[];
    lastUpdated: string;
};