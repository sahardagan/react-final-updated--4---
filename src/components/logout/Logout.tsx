import React, { useContext } from "react";
import { UserContext, UserContextType } from "../../context/UserContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const { logout } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
