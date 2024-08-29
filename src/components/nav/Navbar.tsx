import React, { useContext, useState, useEffect, CSSProperties } from "react";
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
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext, UserContextType } from "../../context/UserContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

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
  const { user, fetchUserProfile, logout } = useContext(
    UserContext
  ) as UserContextType;
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    onSearch(query);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const linkStyles: CSSProperties = {
    padding: "0 25px",
    color: darkMode ? "#fff" : "#000",
    fontWeight: "bold",
    textDecoration: "none",
    textTransform: "none",
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          paddingLeft: { xs: "10px", md: "50px" },
          paddingRight: { xs: "10px", md: "50px" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            <Link to="/" style={linkStyles}>
              B-Card
            </Link>
          </Typography>
          {!isMobile && (
            <>
              <Typography
                variant="h6"
                sx={{
                  marginLeft: 2,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                <Link to="/about" style={linkStyles}>
                  About
                </Link>
              </Typography>
              {user && (
                <>
                  <Button
                    sx={{
                      ...linkStyles,
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    }}
                    component={Link}
                    to="/my-favorites"
                  >
                    Favourites
                  </Button>
                  <Button
                    sx={{
                      ...linkStyles,
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    }}
                    component={Link}
                    to="/mycards"
                  >
                    My Cards
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
        {!isMobile && (
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
              width: { xs: "150px", md: "200px" },
              input: { color: darkMode ? "#fff" : "#000" },
            }}
          />
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" onClick={onThemeToggle}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {user ? (
            <>
              {!isMobile ? (
                <>
                  <IconButton color="inherit" component={Link} to="/profile">
                    <Avatar alt={user.name?.first} src={profilePicture || ""} />
                  </IconButton>
                  <IconButton color="inherit" onClick={handleLogout}>
                    <LogoutIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton color="inherit" onClick={handleMenu}>
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem component={Link} to="/profile">
                      <ListItemIcon>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                    <Divider />
                    <MenuItem component={Link} to="/my-favorites">
                      Favourites
                    </MenuItem>
                    <MenuItem component={Link} to="/mycards">
                      My Cards
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          ) : (
            <>
              {!isMobile ? (
                <>
                  <Button sx={linkStyles} component={Link} to="/login">
                    Login
                  </Button>
                  <Button sx={linkStyles} component={Link} to="/signup">
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <IconButton color="inherit" onClick={handleMenu}>
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem component={Link} to="/login">
                      Login
                    </MenuItem>
                    <MenuItem component={Link} to="/signup">
                      Register
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
