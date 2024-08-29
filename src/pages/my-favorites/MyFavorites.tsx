import { useContext, useEffect, useState } from "react";
import CardComponent from "../../components/card/CardComponent";
import { Container, Grid, Typography } from "@mui/material";
import { CardContext, CardContextType } from "../../context/CardContext";
import { UserContext, UserContextType } from "../../context/UserContext";
import { Card } from "../../interfaces/cards";

const MyFavorites = () => {
  const { cards, fetchCards } = useContext(CardContext) as CardContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const [favoriteCards, setFavoriteCards] = useState<Card[]>([]);

  const onRemoveFavorite = (id: string) => {
    setFavoriteCards((prevFavorites) =>
      prevFavorites.filter((card) => card._id !== id)
    );
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    const filteredCards = cards.filter((card) =>
      card.likes?.some((stringId) => stringId === user?._id)
    );
    setFavoriteCards(filteredCards);
  }, [cards.length]);

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        My Favorite Cards
      </Typography>
      <Grid container spacing={3}>
        {favoriteCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card._id}>
            <CardComponent card={card} onRemoveFavorite={onRemoveFavorite} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyFavorites;
