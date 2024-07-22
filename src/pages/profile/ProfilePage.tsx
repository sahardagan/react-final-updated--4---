/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/profile/ProfilePage.tsx
import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { UserContext, UserContextType } from "../../context/UserContext";
import { UserProfile as UserProfileType } from "../../interfaces/users";
import { toast } from "react-toastify";

const ProfilePage: React.FC = () => {
  const { user, fetchUserProfile } = useContext(UserContext) as UserContextType;
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<UserProfileType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?._id) {
        try {
          const userProfile = await fetchUserProfile(user._id);
          if (userProfile) {
            setProfile(userProfile);
            setForm(userProfile);
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (form) {
      setForm((prevForm) => ({
        ...prevForm!,
        [name]: value,
        address: {
          ...prevForm!.address,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save the updated profile
    console.log("Profile updated:", form);
    handleClose();
    toast.success("Profile updated successfully!");
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "24px", marginTop: "10px" }}>
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
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first"
                  value={form?.name.first}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      name: { ...form!.name, first: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last"
                  value={form?.name.last}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      name: { ...form!.name, last: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form?.email}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={form?.phone}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      phone: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  value={form?.address.street}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      address: { ...form!.address, street: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="House Number"
                  name="houseNumber"
                  value={form?.address.houseNumber}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      address: {
                        ...form!.address,
                        houseNumber: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={form?.address.city}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      address: { ...form!.address, city: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={form?.address.state}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      address: { ...form!.address, state: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={form?.address.country}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      address: { ...form!.address, country: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ZIP"
                  name="zip"
                  value={form?.address.zip}
                  onChange={(e) =>
                    setForm({
                      ...form!,
                      address: { ...form!.address, zip: e.target.value },
                    })
                  }
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
