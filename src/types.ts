export type User = {
  _id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
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

export type RegistrationStatus =
  | "afventer"
  | "modtaget (afvent bekræftelse)"
  | "bekræftet"
  | "annulleret";

export type Registration = {
  _id: string;
  event: MyEvent;
  user: User;
  cartItems: {
    eventItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    phone: string;
  };
  totalAmount: number;
  status: RegistrationStatus;
  createdAt: string;
  eventId: string;
};

export type EventSearchResponse = {
  data: MyEvent[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
