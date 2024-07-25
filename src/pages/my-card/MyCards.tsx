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
import { styled } from "@mui/material/styles";
import CreateCardForm from "../create-card/CreateCard";
import { useCardContext } from "../../context/CardContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCardForm from "../../components/editCard/EditCardForm";
import CardDetailsDialog from "../../components/card-details/CardDetails";
import { Card } from "../../interfaces/cards";
import { toast } from "react-toastify";

const StyledCard = styled(MuiCard)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[4],
  },
}));

const MyCards: React.FC = () => {
  const { fetchMyCards, deleteCard, myCards } = useCardContext();
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

  const handleDelete = async (cardId: string, bizNumber: number) => {
    try {
      const deletedCard = await deleteCard(cardId, bizNumber);
      console.log(deleteCard);
      if (deletedCard) toast.success("Card deleted successfully!");
      if (!deletedCard) return toast.error("Card not deleted,failed");
    } catch (error) {
      toast.error("Failed to delete the card.");
    }
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
          {myCards &&
            myCards.map((data, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.image.url}
                    alt={data.image.alt}
                    sx={{ objectFit: "cover", cursor: "pointer" }}
                    onClick={() => handleDetailsOpen(data._id)}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.subtitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditOpen(data)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(data._id, data.bizNumber)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </StyledCard>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            minWidth: 0,
          }}
        >
          +
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
