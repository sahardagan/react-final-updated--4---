import React, { useEffect, useState } from "react";
import { getAllCards, Card } from "../api/cards";

const CardsList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const result = await getAllCards();
        setCards(result);
      } catch (err) {
        setError("Failed to fetch cards.");
      }
    };

    fetchCards();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Cards</h1>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>{card.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CardsList;
