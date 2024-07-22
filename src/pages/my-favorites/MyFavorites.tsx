import React from "react";
import { useCardContext } from "../../context/CardContext";
import CardComponent from "../../components/card/CardComponent";
import { Container, Grid, Typography } from "@mui/material";

const MyFavorites = () => {
  const { favoriteCards } = useCardContext();

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        My Favorite Cards
      </Typography>
      <Grid container spacing={3}>
        {favoriteCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card._id}>
            <CardComponent card={card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyFavorites;
