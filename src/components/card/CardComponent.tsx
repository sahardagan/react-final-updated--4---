import React from "react";
import { useCardContext } from "../../context/CardContext";
import { Card as CardType } from "../../interfaces/cards";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CardComponent = ({ card }: { card: CardType }) => {
  const { toggleCardLike, favoriteCards } = useCardContext();

  const isFavorite = favoriteCards.some((favCard) => favCard._id === card._id);

  const handleLikeClick = () => {
    toggleCardLike(card._id);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={card.image.url}
        alt={card.image.alt}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.subtitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like" onClick={handleLikeClick}>
          <FavoriteIcon sx={{ color: isFavorite ? "red" : "gray" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
