import React, { useContext, useEffect, useState } from "react";
import {
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardContext, CardContextType } from "../../context/CardContext";
import { UserContext, UserContextType } from "../../context/UserContext";
import CardDetailsDialog from "../../components/card-details/CardDetails";

interface HomeProps {
  searchQuery: string;
}

const StyledCard = styled(MuiCard)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 3,
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[6],
  },
}));

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const { cards, fetchCards, toggleCardLike } = useContext(
    CardContext
  ) as CardContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const shouldDisplayActions = user?.isAdmin || user?.isBusiness;

  const [currentPage, setCurrentPage] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchCards();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleDetailsOpen = (cardId: string) => {
    setCurrentCardId(cardId);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => setDetailsOpen(false);

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const pageCount = Math.ceil(filteredCards.length / itemsPerPage);

  return (
    <div style={{ marginTop: "60px" }}>
      <Container>
        <Grid container spacing={3}>
          {currentCards &&
            currentCards.map((data, index) => {
              const isFavorite =
                data.likes &&
                data.likes.some((stringId) => stringId === user?._id);

              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StyledCard>
                    <CardMedia
                      component="img"
                      height="180"
                      image={data.image.url}
                      alt={data.image.alt}
                      sx={{ objectFit: "cover", cursor: "pointer" }}
                      onClick={() => handleDetailsOpen(data._id)}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {data.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {data.description}
                      </Typography>
                    </CardContent>
                    {shouldDisplayActions && (
                      <CardActions>
                        <IconButton
                          aria-label="phone"
                          onClick={() =>
                            window.open(`tel:${data.phone}`, "_self")
                          }
                        >
                          <PhoneIcon />
                        </IconButton>
                        <IconButton
                          aria-label="like"
                          onClick={() => toggleCardLike(data._id)}
                        >
                          <FavoriteIcon
                            sx={{ color: isFavorite ? "red" : "gray" }}
                          />
                        </IconButton>
                      </CardActions>
                    )}
                  </StyledCard>
                </Grid>
              );
            })}
        </Grid>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          sx={{
            marginTop: 4,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              width: "70px",
              backgroundColor: "#fff",
              color: "green",
              fontSize: 22, // כאן הגדרת הצבע תעבוד עבור הפריטים הפנימיים של ה-Pagination
            },
          }}
        />
      </Container>
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

export default Home;
