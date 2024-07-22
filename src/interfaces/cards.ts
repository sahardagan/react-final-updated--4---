// interfaces.ts
export interface Address {
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip: number;
  _id?: string;
}

export interface Image {
  _id?: string;
  url: string;
  alt: string;
}

export interface Card {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: Image;
  address: Address;
  bizNumber: number;
  createdAt?: string;
  likes?: string[];
  user_id?: string;
  __v?: number;
}

export interface FormData {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: Image;
  address: Address;
}
