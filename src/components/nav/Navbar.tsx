// src/components/nav/Navbar.tsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
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
  const { user } = useContext(UserContext) as UserContextType;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Update the search query in the parent component
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            MyApp
          </Link>
        </Typography>
        <TextField
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginRight: "16px" }}
        />
        {user ? (
          <>
            <Logout />
            <Button color="inherit" component={Link} to="/mycards">
              My Cards
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              {user.name?.first || "Profile"}
            </Button>
            <Button color="inherit" component={Link} to="/my-favorites">
              My Favorites
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
        <IconButton color="inherit" onClick={onThemeToggle}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
