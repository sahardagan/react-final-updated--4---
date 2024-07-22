// src/components/nav/Navbar.tsx
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext, UserContextType } from "../../context/UserContext";
import Logout from "../logout/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface NavbarProps {
  onSearch: (query: string) => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  darkMode,
  onThemeToggle,
}) => {
  const { user, fetchUserProfile } = useContext(UserContext) as UserContextType;
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?._id) {
        try {
          const userProfile = await fetchUserProfile(user._id);
          if (userProfile) {
            setProfilePicture(userProfile.image.url);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Update the search query in the parent component
  };

  const linkStyles = {
    color: darkMode ? "#fff" : "#000",
    fontWeight: "bold",
    textDecoration: "none",
  };

  return (
    <AppBar position="static" sx={{ height: 80 }}>
      <Toolbar sx={{ minHeight: 80, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">
            <Link to="/" style={linkStyles}>
              MyApp
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {user && (
            <>
              <Button sx={linkStyles} component={Link} to="/my-favorites">
                Favourites
              </Button>
              <Button sx={linkStyles} component={Link} to="/mycards">
                My Cards
              </Button>
            </>
          )}
          <TextField
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              marginX: 2,
              width: 200,
              input: { color: darkMode ? "#fff" : "#000" },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" onClick={onThemeToggle}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {user ? (
            <>
              <IconButton color="inherit" component={Link} to="/profile">
                <Avatar alt={user.name?.first} src={profilePicture || ""} />
              </IconButton>
              <Logout />
            </>
          ) : (
            <>
              <Button sx={linkStyles} component={Link} to="/login">
                Login
              </Button>
              <Button sx={linkStyles} component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
