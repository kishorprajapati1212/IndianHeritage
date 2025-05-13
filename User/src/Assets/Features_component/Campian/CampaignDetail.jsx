import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

const CampaignDetail = () => {
  const games = [
    {
      name: "Buzzer Game",
      description: "A fast-paced quiz game where participants compete to answer questions quickly.",
      totalPeople: 20,
      winner: "Team A",
      date: "15th Dec 2024",
      typeOfPeople: "Students",
      task: "Answer questions quickly to earn points.",
      image: "/Campaign/RedFort_Buzz.jpg",
    },
    {
      name: "Treasure Hunt",
      description: "Solve riddles and find clues to uncover hidden treasures in a fun and interactive way.",
      totalPeople: 15,
      winner: "Team B",
      date: "16th Dec 2024",
      typeOfPeople: "Explorers",
      task: "Find all the hidden treasures.",
      image: "/Campaign/RedFort_TresureH.jpg",
    },
    {
      name: "Debate",
      description: "Engage in a thought-provoking discussion and present your views on cultural topics.",
      totalPeople: 10,
      winner: "Participant X",
      date: "17th Dec 2024",
      typeOfPeople: "Academicians",
      task: "Argue and present strong points.",
      image: "/Campaign/redFort_debate2.jpg",
    },
  ];

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5", mb:"100px" }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "10px", color: "#333" }}
      >
        Campaign Activities
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", color: "#555", marginBottom: "20px" }}
      >
        Experience fun and engaging activities to explore heritage and culture!
      </Typography>
      <Grid container spacing={3}>
        {games.map((game, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                position: "relative",
                overflow: "hidden",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "center",
                "&:hover .overlay": {
                  opacity: 1,
                  visibility: "visible",
                  cursor: "pointer",
                },
              }}
            >
              <CardMedia
                component="img"
                image={game.image}
                alt={game.name}
                sx={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: "10px" }}
                >
                  {game.name}
                </Typography>
              </CardContent>
              {/* Overlay Content */}
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  opacity: 0,
                  visibility: "hidden",
                  transition: "opacity 0.3s ease, visibility 0.3s ease",
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Total People: {game.totalPeople}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                  Winner: {game.winner}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                  Date: {game.date}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                  Type of People: {game.typeOfPeople}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                  Task: {game.task}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CampaignDetail;
