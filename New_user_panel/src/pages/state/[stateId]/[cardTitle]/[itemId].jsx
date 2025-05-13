import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import {CircularProgress, Grid, Card, CardContent, Typography} from "@mui/material";
import { useRouter } from "next/router";

const BackButton  = dynamic(() => import("../../../../Home_pages/BackButton")) ;
const FoodDetail = dynamic(() => import("../../../../pages_components/Section_detail/FoodDetail"));
const FestivalDetail = dynamic(() => import("../../../../pages_components/Section_detail/FestivalDetail"));
const PlaceDetail = dynamic(() => import("../../../../pages_components/Section_detail/PlaceDetail"));
const ProductDetail = dynamic(() => import("../../../../pages_components/Section_detail/ProductDetail"));
const WarHistoryDetail = dynamic(() => import("../../../../pages_components/Section_detail/WarHistoryDetail "));
const OriginHistoryDetail = dynamic(() => import("../../../../pages_components/Section_detail/OriginHistoryDetail"));
const DanceDetail = dynamic(() => import("../../../../pages_components/Section_detail/DanceDetail"));
 
const Carddetail = () => {
    const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { stateId, cardTitle, itemId } = useRouter().query;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data based on cardTitle and itemId
    useEffect(() => {
        if(!itemId) return;
        
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`${Backend_url}/state_detail/${stateId}/${cardTitle}/${itemId}`);
                setData(response.data);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [stateId, cardTitle, itemId]);

    // Render loading state
    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                <CircularProgress />
            </Grid>
        );
    }

    // Render error state
    if (error) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Grid>
        );
    }

    // Render the cardTitle-specific details
    const renderDetailcardTitle = () => {
        switch (cardTitle) {
            case "food":
                return <FoodDetail data={data} />;
            case "festival":
                return <FestivalDetail data={data} />;
            case "place":
                return <PlaceDetail data={data} />;
            case "product":
                return <ProductDetail data={data} />;
            case "war_history":
                return <WarHistoryDetail data={data} />;
            case "origin_history":
                return <OriginHistoryDetail data={data} />;
            case "dance":
                return <DanceDetail data={data} />;



            //   case "war_history":
            //     return <WarHistoryDetail data={data} />;
            //   // Add other cardTitles as needed
            default:
                return <Typography>No details available for this cardTitle.</Typography>;
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <BackButton />
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {`${cardTitle.charAt(0).toUpperCase() + cardTitle.slice(1)} Details`}
                    </Typography>
                    {renderDetailcardTitle()}
                </CardContent>
            </Card>
        </div>
    );
};

export default Carddetail;
