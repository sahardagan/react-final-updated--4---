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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src={card.image.url}
            alt={card.image.alt}
            style={{
              maxHeight: "250px",
              objectFit: "cover",
            }}
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="body1">{card.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">{card.subtitle}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">{card.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body1">{card.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">{card.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Web</Typography>
              <Typography variant="body1">{card.web}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Address</Typography>
              <Typography variant="body1">
                {card.address.street}, {card.address.city}, {card.address.state}
                , {card.address.country}, {card.address.zip}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDetailsDialog;
