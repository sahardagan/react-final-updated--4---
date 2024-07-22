export interface IUserForm {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  image?: {
    url: string;
    alt: string;
  };
  address?: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isAdmin?: boolean;
  isBusiness?: boolean;
  classCode?: string;
}

export interface JwtPayload {
  name: any;
  _id: string;
  email: string;
  exp: number;
  iat: number;
}

export interface UserProfile {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  email: string;
  phone: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    street: string;
    houseNumber: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  isBusiness: boolean;
  isAdmin: boolean;
  classCode: string;
  createdAt: string; // Or Date, depending on your backend response
}

export type UserProfileType = UserProfile;
