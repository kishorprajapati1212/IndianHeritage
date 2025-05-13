'use client';

import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Card,
    Alert,
    CardContent,
} from "@mui/material";
// import AlertPopup from "../components/AlertPopup"; // Adjust this path as per your folder structure
import axios from "axios";
import { useRouter } from "next/navigation";

const UserSignin = () => {
    const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.email.includes("@gmail.com")) {
            setAlert({ open: true, message: "Please enter a valid Gmail address!", severity: "error" });
            return;
        }

        if (formData.password.length < 8) {
            setAlert({ open: true, message: "Password must be at least 8 characters long!", severity: "error" });
            return;
        }

        try {
            const res = await axios.post(`${Backend_url}/regular_user_sigin`, formData);

            if (res.status === 200) {
                setAlert({ open: true, message: "Registration successful!", severity: "success" });
                router.push("/login");
            }
        } catch (error) {
            setAlert({
                open: true,
                message: error.response?.data?.message || "An error occurred. Please try again.",
                severity: "error",
            });
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
                padding: "0 16px",
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    margin: "auto",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ textAlign: "center", color: "#343a40" }}
                    >
                        User Registration
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: "center",
                            marginBottom: "16px",
                            color: "#6c757d",
                        }}
                    >
                        Create your account to access our services.
                    </Typography>
                    {alert.open && (
                        <Alert
                            severity={alert.message === "User Login Successfully" ? "success" : "error"}
                            sx={{ mb: 2 }}
                        >
                            {alert.message}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit} >
                        <Grid container spacing={2} >
                            <Grid item sx={{ width: "100%" }}>
                                <TextField
                                    fullWidth
                                    label="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ width: "100%" }}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ width: "100%" }}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ width: "100%" }}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            {/* AlertPopup Component */}
            {/* {alert.open && (
            <AlertPopup message={alert.message} severity={alert.severity} open={alert.open} setOpen={setAlert} />
        )} */}
        </Box>
    );
};

export default UserSignin;
