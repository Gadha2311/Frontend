import React from "react";
import { Button, Box } from "@mui/material";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const{logout}=useAuth()
  const navigate=useNavigate()
  const handleLogout = () => {
    logout()
    navigate("/login")
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width:"100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", 
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
