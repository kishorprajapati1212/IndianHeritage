import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";

import {useRouter} from "next/router"
import styles from "./css/SemiStateCard.module.css"; // Import your custom styles
import dynamic from "next/dynamic";
const BackButton  = dynamic(() => import("../../../../Home_pages/BackButton")) ;


const Semi_State_Detail_Card = () => {
  const { stateId, cardTitle } = useRouter().query;
  const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [cardTitleData, setcardTitleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${Backend_url}/state/${stateId}/${cardTitle}`);
      setcardTitleData(res.data);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if(!stateId || !cardTitle) return;
    fetchData();
  }, [stateId, cardTitle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cardTitleData || cardTitleData.length === 0) {
    return <div>No data found for this cardTitle.</div>;
  }

  const renderCard = (item, index) => {
    const descriptionClass = cardTitle === 'food' || cardTitle === 'festival' || cardTitle === 'place' ? 'card-description-left' : 'card-description-right';

    const itemId = item._id;
    const detailRoute = `/state/${stateId}/${cardTitle}/${itemId}`;

    return (
      <Link href={detailRoute} key={index} className={styles.card_link} style={{ textDecoration: "none" }}>
        <Card className={styles.flip_card} sx={{
          width: 345,
          height: 460,
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'transform 0.3s ease',
          "&:hover": { transform: "scale(1.05)" },
          marginBottom: 2
        }}>
          {/* Flip Card Inner to apply 3D flip */}
          <div className={styles.flip_card_inner}>
            {/* Front side: Image and Name */}
            <div className={styles.flip_card_front}>
              <CardMedia
                component="img"
                height="200"
                image={cardTitle === "food" ? item.food_image[0]
                  : cardTitle === "festival" ? item.Festival_image[0]
                    : cardTitle === "place" ? item.place_image[0]
                      : cardTitle === "war_history" ? item.war_image
                        : cardTitle === "origin_history" ? item.origin_image[0]
                          : cardTitle === "product" ? item.product_images[0]
                            : cardTitle === "dance" ? item.dance_image[0]
                              : ""}
                alt={item.food_name || item.festival_name || item.place_name || item.war_name || item.origin_name || item.product_name || item.dance_name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                paddingBottom: 2
              }}>
                <Typography variant="h6" sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "1.1rem",
                  color: "#333"
                }}>
                  {cardTitle === "food" && item.food_name}
                  {cardTitle === "festival" && item.festival_name}
                  {cardTitle === "place" && item.place_name}
                  {cardTitle === "war_history" && item.war_name.slice(0, 15)}
                  {cardTitle === "origin_history" && item.origin_name}
                  {cardTitle === "product" && item.product_name}
                  {cardTitle === "dance" && item.dance_name}
                </Typography>
              </CardContent>
            </div>

            {/* Back side: Description */}
            <div className={styles.flip_card_back}>
              <CardContent sx={{ color: "white", padding: 2, textAlign: "center" }}>
                <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                  {cardTitle === "food" && item.origi_story.slice(0, 100)}
                  {cardTitle === "festival" && item.festivalSignificance.slice(0, 100)}
                  {cardTitle === "place" && item.Period.slice(0, 100)}
                  {cardTitle === "war_history" && item.war_description.slice(0, 100)}
                  {cardTitle === "origin_history" && item.origin_description.slice(0, 250)}
                  {cardTitle === "product" && item.product_description.slice(0, 100)}
                  {cardTitle === "dance" && item.dance_description.slice(0, 100)}
                </Typography>
              </CardContent>
            </div>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <div>
      <BackButton />
      <h1 align="center" style={{
        fontSize: "2rem",
        // fontWeight: "600",
        // fontSize: "5rem",
        fontWeight: "800",
        textTransform: "uppercase",
        color: "black",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {`${cardTitle.charAt(0).toUpperCase() + cardTitle.slice(1)}`}
      </h1>

      {/* Grid Layout */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 3,
        padding: 2
      }}>
        {cardTitleData.map((item, index) => renderCard(item, index))}
      </Box>
    </div >
  );
};

export default Semi_State_Detail_Card;
