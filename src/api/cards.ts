import axios from "axios";

const API_URL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQyNGFlOWE4ZDFlYWUxMmQzMWUzNjAiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjk4ODQzNDQyfQ.znXbzyxMKeNrKf3dA8jXQ5CFptM8-iXjeFtqx3XfHD0";

export interface Card {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
}

export const getAllCards = async (): Promise<Card[]> => {
  const response = await axios.get<Card[]>(`${API_URL}`, {
    headers: { "x-auth-token": token },
  });
  return response.data;
};

export const getMyCards = async (): Promise<Card[]> => {
  const response = await axios.get<Card[]>(`${API_URL}/my-cards`, {
    headers: { "x-auth-token": token },
  });
  return response.data;
};

export const createCard = async (card: Card): Promise<void> => {
  try {
    await axios.post<Card>(`${API_URL}`, card, {
      headers: { "x-auth-token": token, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating card", error);
    throw error;
  }
};
