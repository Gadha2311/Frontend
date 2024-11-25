import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import Axios from "../axios";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleShortenUrl = async () => {
    if (!url) {
      alert("Please enter a URL to shorten.");
      return;
    }
  
    try {
      const response = await Axios.post("/auth/shorten",{longurl:url})
      if (response.status!== 200) {
        const errorData = await response.data;
        alert(errorData.error || "Failed to shorten URL");
        return;
      }
  
      const data = await response.data;
      setShortenedUrl(data.shortUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  const handleUrl = async () => {
    if (!shortenedUrl) {
      alert("Please enter a URL to shorten.");
      return;
    }
  
    try {
      const shortId:any= shortenedUrl.split("/").pop();
      const response = await Axios.get(`/auth/${shortId}`)
      if (response.status === 200) {
        setUrl(response.data.longUrl)
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
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
          marginBottom: "20px",
        }}
      >
        Logout
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleShortenUrl}>
          Shorten URL
        </Button>
        {shortenedUrl && (
          <Typography variant="body1" sx={{ marginTop: "10px", wordBreak: "break-all" }} onChange={handleUrl}>
            Shortened URL: <a href={url} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
