import React, { useEffect, useState, useContext } from "react";
import { Typography, Container, Paper, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from "../../context/UserContext";
import { UserProfile as UserProfileType } from "../../interfaces/users";

const ProfilePage: React.FC = () => {
  const { user, fetchUserProfile } = useContext(UserContext) as UserContextType;
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?._id) {
        try {
          const userProfile = await fetchUserProfile(user._id);
          if (userProfile) {
            setProfile(userProfile);
          } else {
            console.log("User profile not found");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        console.log("User does not have an _id");
      }
    };

    fetchProfile();
  }, [user, fetchUserProfile]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "24px", marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <img
              alt={profile.image.alt}
              src={profile.image.url}
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <b>Name:</b> {profile.name.first} {profile.name.last}
            </Typography>
            <Typography variant="h6">
              <b>Email:</b> {profile.email}
            </Typography>
            <Typography variant="h6">
              <b>Phone:</b> {profile.phone}
            </Typography>
            <Typography variant="h6">
              <b>Auth Level:</b> {profile.isBusiness ? "Business" : "Personal"}
            </Typography>
            <Typography variant="h6">
              <b>Address:</b> {profile.address.street}{" "}
              {profile.address.houseNumber}, {profile.address.city},{" "}
              {profile.address.state}, {profile.address.country}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <iframe
              src={`https://www.google.com/maps?q=${profile.address.street}%20${profile.address.houseNumber}%20${profile.address.city}%20${profile.address.state}%20${profile.address.country}&output=embed`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/profile/edit")}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
