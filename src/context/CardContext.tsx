import React, { createContext, useState, ReactNode, useContext } from "react";
import axios from "axios";
import { Card, FormData } from "../interfaces/cards";

export interface CardContextType {
  cards: Card[];
  favoriteCards: Card[];
  addCard: (newCard: FormData) => Promise<void>;
  updateCard: (updatedCard: FormData, id: string) => Promise<void>;
  deleteCard: (cardId: string, bizNumber: number) => void;
  fetchCards: () => void;
  fetchCardById: (id: string) => Promise<Card | null>;
  error: string | null;
  fetchMyCards: () => Promise<void>;
  toggleCardLike: (id: string) => Promise<void>;
}

export const CardContext = createContext<CardContextType | undefined>(
  undefined
);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};

export const CardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [favoriteCards, setFavoriteCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      const response = await axios.get<Card[]>(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
      );
      setCards(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Error fetching cards");
    }
  };

  const fetchCardById = async (id: string) => {
    try {
      const response = await axios.get<Card>(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {
          headers: {
            "X-Auth-Token": JSON.parse(localStorage.getItem("token") || "null"),
          },
        }
      );
      setError(null);
      return response.data;
    } catch (error) {
      console.error("Error fetching card by ID:", error);
      setError("Error fetching card by ID");
      return null;
    }
  };

  const addCard = async (newCard: FormData) => {
    try {
      const response = await axios.post<Card>(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        newCard,
        {
          headers: {
            "X-Auth-Token": JSON.parse(localStorage.getItem("token") || "null"),
          },
        }
      );
      setCards([...cards, response.data]);
      setError(null);
    } catch (error) {
      console.error("Error adding card:", error);
      setError("Error adding card");
    }
  };

  const updateCard = async (updatedCard: FormData, id: string) => {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "null");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        updatedCard,
        {
          headers: {
            "X-Auth-Token": token,
          },
        }
      );

      setCards(
        cards.map((card) =>
          card._id === updatedCard._id ? response.data : card
        )
      );
      setError(null);
    } catch (error) {
      console.error("Error updating card:", error);
      setError("Error updating card");
    }
  };

  const deleteCard = async (cardId: string, bizNumber: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {
          headers: {
            "X-Auth-Token": JSON.parse(token || "null"),
          },
          data: {
            bizNumber: bizNumber,
          },
        }
      );

      setCards(cards.filter((card) => card._id !== cardId));
      setError(null);
    } catch (error) {
      console.error("Error deleting card:", error);
      setError("Error deleting card");
    }
  };

  const fetchMyCards = async () => {
    try {
      const response = await axios.get<Card[]>(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
        {
          headers: {
            "X-Auth-Token": JSON.parse(localStorage.getItem("token") || "null"),
          },
        }
      );
      setCards(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Error fetching cards");
    }
  };

  const toggleCardLike = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    const cleanedToken = token.replace(/^"|"$/g, "");

    try {
      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {},
        {
          headers: {
            "x-auth-token": cleanedToken,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedCard = response.data;
      setCards((prevCards) =>
        prevCards.map((card) => (card._id === id ? updatedCard : card))
      );

      setFavoriteCards((prevFavorites) => {
        if (prevFavorites.some((card) => card._id === id)) {
          return prevFavorites.filter((card) => card._id !== id);
        } else {
          return [...prevFavorites, updatedCard];
        }
      });

      setError(null);
    } catch (error) {
      // @ts-ignore
      console.error("Error response:", error.response?.data);
      setError("Authentication Error: Please Login");
    }
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        favoriteCards,
        addCard,
        updateCard,
        fetchCards,
        fetchCardById, // הוספת הפונקציה החדשה ל-Context
        error,
        fetchMyCards,
        deleteCard,
        toggleCardLike,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
