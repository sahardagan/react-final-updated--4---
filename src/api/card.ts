import axios from "axios";

// הגדר את ה-API URL שלך
const API_URL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck"; // הטוקן שהוחלף

// הגדרת האינטרפייסים
export interface Card {
  _id: string;
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

// פונקציות API
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

// הוסף את הפונקציה createCard כאן
export const createCard = async (card: Card): Promise<void> => {
  try {
    await axios.post<Card>(`${API_URL}`, card, {
      headers: { "x-auth-token": token },
    });
  } catch (error) {
    console.error("Error creating card", error);
    throw error;
  }
};
