import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useRouter } from "next/router";

const State_Slide = () => {
  const router = useRouter();
  const { stateId } = router.query;

  const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [sliderData, setSliderData] = useState([]);
  const [stateName, setStateName] = useState("");

  useEffect(() => {
    if (!stateId) return; // Prevent running before router is ready

    const fetchData = async () => {
      try {
        const res = await axios.get(`${Backend_url}/State_Home_Slider_Content/${stateId}`);
        // console.log(res)
        setStateName(res.data.state_name?.state_name || "State");
        setSliderData(res.data.food || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [stateId]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
    pauseOnHover: true,
  };

  return (
    <Box sx={{ py: 6, background: "#f9fafc" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 4,
          color: "#222",
          textTransform: "capitalize",
          fontSize: { xs: "1.8rem", md: "2.2rem" },
        }}
      >
        {stateName && `Explore The ${stateName}`}
      </Typography>
      <Box>
        <Slider {...sliderSettings}>
          {sliderData.length > 0 ? (
            sliderData.map((item, index) => (
              <Box key={index} sx={{ position: "relative", width: "100%" }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "400px",
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover .description-overlay": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <img
                    src={item.food_image?.[0] || "default-image-url"}
                    alt={item.food_name}
                    loading="lazy"
                    preload="none"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <Box
                    className="description-overlay"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      opacity: 0,
                      backdropFilter: "blur(8px)",
                      transform: "translateY(100%)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {item.food_name}
                    </Typography>
                    <Typography variant="body1">
                      {item.origi_story || "No origin story available."}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ color: "#555" }}>
              Loading...
            </Typography>
          )}
        </Slider>
      </Box>
    </Box>
  );
};

export default State_Slide;
