import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ArtistSignin = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const Navigation = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        artistData: {
            homeAddress: "",
            city: "",
            state: "",
            contact: "",
            profile_image: "",
            adhar_card: "",
            socialMediaHandles: [{ platform: "Facebook", link: "" }],
        },
    });

    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split(".");
        if (keys.length > 1) {
            setFormData((prev) => ({
                ...prev,
                artistData: {
                    ...prev.artistData,
                    [keys[1]]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSocialMediaChange = (index, field, value) => {
        const updatedHandles = [...formData.artistData.socialMediaHandles];
        updatedHandles[index][field] = value;
        setFormData((prev) => ({
            ...prev,
            artistData: { ...prev.artistData, socialMediaHandles: updatedHandles },
        }));
    };

    const handleSendOtp = async () => {
        try {
            const res = await axios.post(`${Backend_url}/sendmail`, { email: formData.email });
            if (res.status === 200) {
                setOtpDialogOpen(true);
            }
        } catch (error) {
            setError("Failed to send OTP");
            console.error("Error sending OTP:", error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await axios.post(`${Backend_url}/verifyotp`, {
                email: formData.email,
                randomCode: otp,
            });
            if (res.status === 200) {
                setIsOtpVerified(true);
                setOtpDialogOpen(false); // Close the dialog after successful verification
            }
        } catch (error) {
            setError("Invalid OTP or OTP expired");
            console.error("Error verifying OTP:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isOtpVerified) {
            setError("Please verify OTP before registering.");
            return;
        }

        const fullAddress = `${formData.artistData.homeAddress}, ${formData.artistData.city}, ${formData.artistData.state}`;
        const dataToSend = {
            ...formData,
            artistData: {
                ...formData.artistData,
                address: fullAddress,
            },
        };

        try {
            console.log(dataToSend);
            const res = await axios.post(`${Backend_url}/artist_signin`, dataToSend);
            console.log("Artist Registration Data:", res.data);

            if (res.status === 200) {
                Navigation("/login");
            }
        } catch (error) {
            console.error("Error registering artist:", error.response?.data?.message);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
                padding: 4,
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    borderRadius: 4,
                    boxShadow: 3,
                    p: 3,
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ textAlign: "center", color: "#343a40" }}
                    >
                        Artist Registration
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
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
                            {/* Other input fields for artist details */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Home Address"
                                    name="artistData.homeAddress"
                                    value={formData.artistData.homeAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="artistData.city"
                                    value={formData.artistData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    name="artistData.state"
                                    value={formData.artistData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Contact"
                                    name="artistData.contact"
                                    value={formData.artistData.contact}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Adhar Card"
                                    name="artistData.adhar_card"
                                    value={formData.artistData.adhar_card}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Social Media (Facebook)"
                                    name="artistData.socialMediaHandles[0].link"
                                    value={formData.artistData.socialMediaHandles[0].link}
                                    onChange={(e) =>
                                        handleSocialMediaChange(0, "link", e.target.value)
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    sx={{ py: 1.5, fontSize: 16, fontWeight: "bold" }}
                                    onClick={handleSendOtp}
                                >
                                    Send OTP
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    sx={{ py: 1.5, fontSize: 16, fontWeight: "bold" }}
                                    disabled={!isOtpVerified}  // Disable button if OTP is not verified
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
                <DialogTitle>Enter OTP</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOtpDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleVerifyOtp} color="primary">
                        Verify OTP
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ArtistSignin;
