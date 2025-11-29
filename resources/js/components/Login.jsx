import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Box, Alert } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000"; // IMPORTANT

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/login", { email, password });
      console.log(res, "res");

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid login or server not found");
    }
  };
  return (
    <Box
      sx={{
        width: 400,
        margin: "100px auto",
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      component="form"
      onSubmit={submit}
    >
      <Typography variant="h4" align="center">
        Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
}
