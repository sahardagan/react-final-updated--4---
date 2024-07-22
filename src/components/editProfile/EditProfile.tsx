import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { UserContext, UserContextType } from "../../context/UserContext";
import { UserProfile as UserProfileType } from "../../interfaces/users";

const EditProfilePage: React.FC = () => {
  const { user, fetchUserProfile } = useContext(UserContext) as UserContextType;
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [form, setForm] = useState<UserProfileType | null>(null);
  const navigate = useNavigate();

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
    navigate("/profile");
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "24px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="first"
                value={form.name.first}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: { ...form.name, first: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="last"
                value={form.name.last}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: { ...form.name, last: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
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
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
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
                value={form.address.street}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, street: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="House Number"
                name="houseNumber"
                value={form.address.houseNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, houseNumber: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={form.address.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, city: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={form.address.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, state: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={form.address.country}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, country: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ZIP"
                name="zip"
                value={form.address.zip}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, zip: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProfilePage;
