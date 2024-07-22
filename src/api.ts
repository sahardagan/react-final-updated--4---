// src/api.ts
import axios, { AxiosInstance } from "axios";
import { Card } from "./api/cards"; // ייבוא של Card

// הגדרת ה-URL הבסיסי
const API_URL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

// קבלת הטוקן מאחסון מקומי
const getToken = (): string | null => localStorage.getItem("authToken");

// יצירת מופע של axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "x-auth-token":
      getToken() ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQyNGFlOWE4ZDFlYWUxMmQzMWUzNjAiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjk4ODQzNDQyfQ.znXbzyxMKeNrKf3dA8jXQ5CFptM8-iXjeFtqx3XfHD0", // הוספת הטוקן ל-Headers
    "Content-Type": "application/json",
  },
});

// פונקציות API
export const getMyCards = async (): Promise<Card[]> => {
  try {
    const response = await axiosInstance.get<Card[]>("/my-cards");
    return response.data;
  } catch (error) {
    console.error("Error fetching my cards", error);
    throw error;
  }
};
