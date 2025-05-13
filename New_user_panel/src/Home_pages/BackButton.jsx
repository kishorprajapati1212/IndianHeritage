import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const BackButton = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back(); // Navigate to the previous page in Next.js
    };

    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            color="default"
            variant="text"
            sx={{
                margin: "2px 2px",
                fontWeight: "normal",
                textTransform: "none",
                padding: "8px 16px",
                backgroundColor: "black",
                color: "#fff",
                borderRadius: "4px",
                boxShadow: "none",
                "&:hover": {
                    backgroundColor: "#333",
                    boxShadow: "none",
                },
            }}
        >
            Back
        </Button>
    );
};

export default BackButton;
