import React, { createContext, useState, ReactNode, useContext } from "react";
import axios from "axios";
import { Card, FormData } from "../interfaces/cards";

export interface CardContextType {
  cards: Card[];
  myCards: Card[];
  addCard: (newCard: FormData) => Promise<void>;
  updateCard: (updatedCard: FormData, id: string) => Promise<void>;
  deleteCard: (cardId: string, bizNumber: number) => Promise<boolean>;
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
  const [myCards, setMyCards] = useState<Card[]>([]);
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

      setMyCards(myCards.filter((card) => card._id !== cardId));
      setError(null);
      return true;
    } catch (error) {
      console.error("Error deleting card:", error);
      setError("Error deleting card");
      return false;
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
      setMyCards(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Error fetching cards");
    }
  };

  const toggleCardLike = async (id: string) => {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "null");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {},
        {
          headers: {
            "X-Auth-Token": token,
          },
        }
      );

      setError(null);

      const updatedCard = await response.data;
      setCards((prevCards) =>
        prevCards.map((card) => (card._id === id ? updatedCard : card))
      );
    } catch (error) {
      console.error("Error toggling card like:", error);
      setError("Error toggling card like");
    }
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        addCard,
        updateCard,
        fetchCards,
        fetchCardById,
        error,
        fetchMyCards,
        deleteCard,
        toggleCardLike,
        myCards,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
