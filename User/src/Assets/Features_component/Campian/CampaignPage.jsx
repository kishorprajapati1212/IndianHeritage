import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';
import { Link } from "react-router-dom";

const CampaignPage = () => {
  const campaigns = [
    {
      name: 'Heritage Trail for Students',
      location: 'Red Fort, Delhi',
      description: `A group of school children are gathered at the`,
      date: '1 December 2024',
      image: '/Campaign/c1.jpeg',
    },
    {
      name: 'Preserve the Legacy',
      location: 'Red Fort, Delhi',
      description: 'A hands-on activity to help restore and clean up the Old Fort.',
      date: '20 January 2025',
      image: '/Campaign/c2.jpeg',
    },
    {
      name: 'Heritage Trail for Students',
      location: 'Adi-kadi-vav',
      description: `Adi-Kadi Vav is a historic stepwell located within the Uparkot Fort complex in Junagadh, Gujarat. Unlike Gujarat's ornate stepwells, it is a simple rock-cut structure, attracting fewer visitors due to its minimal design and lesser-known significance. Its relative obscurity makes it a hidden gem for history enthusiasts exploring the fort.`,
      date: '15 December 2024',
      image: '/Campaign//vav.jpg',
    },
    {
      name: 'Heritage Trail for Students',
      location: 'Martand Sun Temple, Jammu & Kashmir',
      description: `The Martand Sun Temple, located near Anantnag in Jammu & Kashmir, is an ancient temple dedicated to the Sun God, built in the 8th century by Lalitaditya Muktapida of the Karkota dynasty. It showcases grand Kashmiri stone architecture, blending Gandhara, Gupta, and local styles. Although in ruins, it remains a symbol of Kashmir's rich cultural heritage and attracts history enthusiasts despite its remote location.`,
      date: '19 December 2024',
      image: '/Campaign//sun.jpg',
    },
    {
      name: 'Heritage Trail for Students',
      location: 'Hampi Karnatak',
      description: 'Hampi, a UNESCO World Heritage Site, was once the glorious capital of the Vijayanagara Empire. Its ruins offer a glimpse into a bygone era of grandeur and architectural brilliance. The city is renowned for its intricate temples, massive fortifications, and sprawling palaces. Today, Hampi stands as a testament to the rich history and cultural heritage of India.',
      date: '16 December 2024',
      image: '/Campaign/hampi.jpg',
    },{
      name: 'Heritage Trail for Students',
      location: 'Sundarban, westbengal',
      description: 'The Sundarbans, a UNESCO World Heritage Site, is the worlds largest mangrove forest, straddling India and Bangladesh. Its renowned for its unique biodiversity, including the iconic Royal Bengal Tiger. However, this delicate ecosystem faces threats like climate change, human activities, and pollution. Conservation efforts are crucial to protect this natural wonder and its diverse wildlife.',
      date: '22 December 2024',
      image: '/Campaign/sindarban.jpg',
    },
  ];

  // Helper function to check if the date is in the past
  const isPastDate = (dateString) => {
    const campaignDate = new Date(dateString);
    const today = new Date();
    return campaignDate < today;
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ textAlign: 'center', marginBottom: '30px' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Discover and Preserve Heritage
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          Explore our campaigns to promote heritage and cultural awareness.
        </Typography>
      </Box>

      <Box>
        {campaigns.map((campaign, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: '20px',
              boxShadow: 3,
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: isPastDate(campaign.date) ? '#f8d7da' : '#ffffff', // Light red for past campaigns
              border: isPastDate(campaign.date) ? '1px solid #f5c6cb' : 'none',
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={12} md={4}>
                <CardMedia
                  component="img"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  image={campaign.image}
                  alt={`${campaign.name} Image`}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      color: isPastDate(campaign.date) ? '#721c24' : '#333', // Dark red for past campaigns
                    }}
                  >
                    {campaign.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', marginBottom: '10px' }}>
                    Location: {campaign.location}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#444', marginBottom: '10px' }}>
                    {campaign.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isPastDate(campaign.date) ? '#721c24' : '#888', // Dark red for past dates
                      marginBottom: '10px',
                    }}
                  >
                    Date: {campaign.date}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ padding: '10px 20px', fontSize: '14px' }}
                      component={Link}
                      to="/campaign_form"
                      state={{ campaign }}
                      disabled={isPastDate(campaign.date)} // Disable button for past campaigns
                    >
                      Register Now
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        padding: '12px 25px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor: '#FF9800', // Orange shade
                        color: '#FFFFFF',
                        ':hover': {
                          backgroundColor: '#FFB74D',
                        },
                      }}
                      component={Link}
                      to="/campaign_details"
                      state={{ campaign }}
                    >
                      Show More
                    </Button>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CampaignPage;