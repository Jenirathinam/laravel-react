import styled from '@emotion/styled';
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material';
import axios from "axios";
import React from 'react';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://127.0.0.1:8000";

const CompactTextField = styled(TextField)({
    width: "300px",
    "& .MuiInputBase-root": {
        height: "40px",
    },
    "& .MuiOutlinedInput-input": {
        padding: "8px",
        fontSize: "0.75rem",
    },
});

const Label = styled(Typography)({
    width: "300px",
    textAlign: "left",
    fontSize: "0.85rem",
});

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const register = async (e) => {
        e.preventDefault();

      

        try {
            const res = await axios.post("/api/register", {
                name,
                email,
                password
            });

            console.log(res.data);

            navigate("/login");

        } catch (error) {
            console.log(error.response?.data);
            setError("Invalid data or server not found");
        }
    };

    return (
        <Container sx={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
            <Box
                component="form"      
                onSubmit={register}    
                sx={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: 'center',
                    gap: "10px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: 2
                }}
            >
                <Typography variant="h5">Register</Typography>

                {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

                <Label>User Name</Label>
                <CompactTextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Label>Email</Label>
                <CompactTextField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Label>Password</Label>
                <CompactTextField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

               
                <Box sx={{ display: 'flex', justifyContent: "flex-end", width: '100%' }}>
                    <Typography fontSize={12}>Already have an account?</Typography>
                    <Button onClick={() => navigate("/login")}>Login</Button>
                </Box>

                <Divider sx={{ width: "70%" }} />

                <Button
                    type="submit"        
                    sx={{ width: "300px" }}
                    variant="contained"
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
