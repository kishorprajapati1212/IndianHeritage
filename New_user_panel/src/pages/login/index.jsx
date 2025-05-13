"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation"; // ✅ useRouter for Next.js

const Login = () => {
  const router = useRouter(); // ✅ Replaces useNavigate

  const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL; // ✅ Environment variable for Next.js

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${Backend_url}/login_user`, {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        localStorage.setItem("Cultrual", JSON.stringify(response.data.user));
        router.push("/"); // ✅ Navigate to home in Next.js
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 12,
        mb: 12,
        p: 3,
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        Login
      </Typography>

      {message && (
        <Alert
          severity={message === "User Login Successfully" ? "success" : "error"}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            required
            size="small"
            sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px" }}
          />
        </Box>

        <Box mb={3}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            required
            size="small"
            sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px" }}
          />
        </Box>

        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ p: "10px", borderRadius: "8px", fontWeight: "bold" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
