import React from 'react';
import { Card, CardContent, Typography, Avatar, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';

const theme = createTheme();

const StyledCard = styled(Card)(({ theme }) => ({
  width: '300px',
  height: '600px',
  margin: '10px',
  overflow: 'auto',
  backgroundColor: theme.palette.grey[100], // Customize the background color
  boxShadow: theme.shadows[3], // Add a box shadow for a raised effect
  borderRadius: '8px', // Add some border radius
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(16),
  height: theme.spacing(16),
  marginBottom: theme.spacing(2),
}));

export default function AboutMe() {
  return (
    <ThemeProvider theme={theme}>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            About Me
          </Typography>
          <Typography variant="h6" gutterBottom>
            EGOR
          </Typography>
          <Typography variant="body1" gutterBottom>
            I'm a GM Zerg
          </Typography>
          <Typography variant="body1" gutterBottom>
            2000+ Hours of Coaching Experience
          </Typography>
          <StyledAvatar alt="Egor" src="/egor.jpg" />
        </CardContent>
      </StyledCard>
    </ThemeProvider>
  );
}
