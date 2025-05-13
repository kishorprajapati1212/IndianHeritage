import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, RadioGroup, FormControlLabel, Radio, Button, Grid, Paper, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import jsPDF from 'jspdf';

const CampaignForm = () => {
  const location = useLocation();
  const { campaign } = location.state || {};

  if (!campaign) {
    return <div>No campaign data available!</div>;
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    playerType: 'single',  // Default to single
    danceStyle: '',
    danceName: '',
    danceClothes: '',
    danceSong: '',
    danceType: 'solo', // Default to solo dance
    isDanceSelected: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDanceSelection = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      danceStyle: value,
      isDanceSelected: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for generating PDF
    generatePDF();
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Campaign Registration Ticket", 20, 20);

    // Campaign Details
    doc.setFontSize(12);
    doc.text(`Campaign: ${campaign.name}`, 20, 40);
    doc.text(`Location: ${campaign.location}`, 20, 50);
    doc.text(`Date: ${campaign.date}`, 20, 60);

    // User Details
    doc.text(`Name: ${formData.name}`, 20, 90);
    doc.text(`Profession: ${formData.profession}`, 20, 110);
    doc.text(`Player Type: ${formData.playerType}`, 20, 120);

    // Dance Details
    if (formData.isDanceSelected) {
      doc.text(`Dance Style: ${formData.danceStyle}`, 20, 140);
      doc.text(`Dance Name: ${formData.danceName}`, 20, 150);
      doc.text(`Dance Clothes: ${formData.danceClothes}`, 20, 160);
      doc.text(`Dance Song: ${formData.danceSong}`, 20, 170);
      doc.text(`Dance Type: ${formData.danceType}`, 20, 180);
    }

    // Save PDF
    doc.save('registration-ticket.pdf');
  };

  return (
    <Box sx={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper sx={{ padding: '20px', boxShadow: 3, borderRadius: 2, maxWidth: 600, margin: '0 auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>
          Campaign Registration Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Name Input */}
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>

            {/* Email Input */}
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>

            {/* Profession Radio Buttons */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Profession</strong>
              </Typography>
              <RadioGroup
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                sx={{ flexDirection: 'row' }}
              >
                <FormControlLabel value="student" control={<Radio />} label="Student" />
                <FormControlLabel value="employee" control={<Radio />} label="Employee" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </Grid>

            {/* Player Type Radio Buttons */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Player Type</strong>
              </Typography>
              <RadioGroup
                name="playerType"
                value={formData.playerType}
                onChange={handleChange}
                sx={{ flexDirection: 'row' }}
              >
                <FormControlLabel value="single" control={<Radio />} label="Single Player" />
                <FormControlLabel value="multiple" control={<Radio />} label="Multiple Players" />
              </RadioGroup>
            </Grid>

            {/* Dance Style Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Dance Style</InputLabel>
                <Select
                  name="danceStyle"
                  value={formData.danceStyle}
                  onChange={handleDanceSelection}
                  label="Dance Style"
                >
                  <MenuItem value="Classical">Classical</MenuItem>
                  <MenuItem value="Folk">Folk</MenuItem>
                  <MenuItem value="Modern">Modern</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Dance Details Inputs */}
            {formData.isDanceSelected && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Dance Name"
                    variant="outlined"
                    fullWidth
                    name="danceName"
                    value={formData.danceName}
                    onChange={handleChange}
                    sx={{ backgroundColor: 'white' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Dance Clothes"
                    variant="outlined"
                    fullWidth
                    name="danceClothes"
                    value={formData.danceClothes}
                    onChange={handleChange}
                    sx={{ backgroundColor: 'white' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Dance Song"
                    variant="outlined"
                    fullWidth
                    name="danceSong"
                    value={formData.danceSong}
                    onChange={handleChange}
                    sx={{ backgroundColor: 'white' }}
                  />
                </Grid>

                {/* Dance Type Radio Buttons */}
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Dance Type</strong>
                  </Typography>
                  <RadioGroup
                    name="danceType"
                    value={formData.danceType}
                    onChange={handleChange}
                    sx={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="solo" control={<Radio />} label="Solo" />
                    <FormControlLabel value="multiple" control={<Radio />} label="Multiple" />
                  </RadioGroup>
                </Grid>
              </>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{
                  padding: '12px',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  backgroundColor: '#3f51b5',
                  '&:hover': {
                    backgroundColor: '#303f9f',
                  },
                }}
              >
                Generate Ticket (PDF)
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CampaignForm;
