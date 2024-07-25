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

interface ICardComponentProps {
  card: CardType;
  onRemoveFavorite: (id: string) => void;
}

const CardComponent = ({ card, onRemoveFavorite }: ICardComponentProps) => {
  const { toggleCardLike } = useCardContext();

  const handleLikeClick = () => {
    toggleCardLike(card._id);
    onRemoveFavorite(card._id);
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
          <FavoriteIcon sx={{ color: "red" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
