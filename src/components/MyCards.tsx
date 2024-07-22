import React, { useEffect, useState } from "react";
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CreateCardForm from "../pages/create-card/CreateCard";
import { useCardContext } from "../context/CardContext";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCardForm from "./editCard/EditCardForm";
import CardDetailsDialog from "../components/card-details/CardDetails";
import { Card } from "../interfaces/cards";

const MyCards: React.FC = () => {
  const { fetchMyCards, cards, deleteCard } = useCardContext();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDetailsClose = () => setDetailsOpen(false);

  const handleEditOpen = (card: Card) => {
    setCurrentCard(card);
    setEditOpen(true);
  };

  const handleEditClose = () => setEditOpen(false);

  const handleDetailsOpen = (cardId: string) => {
    setCurrentCardId(cardId);
    setDetailsOpen(true);
  };

  useEffect(() => {
    fetchMyCards();
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Typography variant="h4">My Cards</Typography>
      </Box>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {cards &&
            cards.map((data, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MuiCard sx={{ maxWidth: 345, margin: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.image.url}
                    alt={data.image.alt}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      aria-label="info"
                      onClick={() => handleDetailsOpen(data._id)}
                    >
                      <InfoIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditOpen(data)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        data._id && deleteCard(data._id, data.bizNumber)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </MuiCard>
              </Grid>
            ))}
        </Grid>
      </Container>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Card +
        </Button>
      </Box>
      <CreateCardForm open={open} handleClose={handleClose} />
      {currentCard && (
        <EditCardForm
          open={editOpen}
          handleClose={handleEditClose}
          defaultValues={currentCard}
        />
      )}
      {currentCardId && (
        <CardDetailsDialog
          cardId={currentCardId}
          open={detailsOpen}
          handleClose={handleDetailsClose}
        />
      )}
    </div>
  );
};

export default MyCards;
