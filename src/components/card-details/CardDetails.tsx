import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import { CardContext, CardContextType } from "../../context/CardContext";
import { Card } from "../../interfaces/cards";

interface CardDetailsDialogProps {
  cardId: string;
  open: boolean;
  handleClose: () => void;
}

const CardDetailsDialog: React.FC<CardDetailsDialogProps> = ({
  cardId,
  open,
  handleClose,
}) => {
  const { fetchCardById } = useContext(CardContext) as CardContextType;
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    const getCard = async () => {
      const fetchedCard = await fetchCardById(cardId);
      setCard(fetchedCard);
    };
    if (cardId) {
      getCard();
    }
  }, [cardId, fetchCardById]);

  if (!card) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Card Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={card.image.url}
              alt={card.image.alt}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "250px",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">{card.title}</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {card.subtitle}
            </Typography>
            <Typography variant="body1" paragraph>
              {card.description}
            </Typography>
            <Typography variant="h6">Phone</Typography>
            <Typography variant="body1" paragraph>
              {card.phone}
            </Typography>
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1" paragraph>
              {card.email}
            </Typography>
            <Typography variant="h6">Web</Typography>
            <Typography variant="body1" paragraph>
              {card.web}
            </Typography>
            <Typography variant="h6">Address</Typography>
            <Typography variant="body1" paragraph>
              {card.address.street}, {card.address.city}, {card.address.state},{" "}
              {card.address.country}, {card.address.zip}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDetailsDialog;
