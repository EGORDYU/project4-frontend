import React from 'react';
import { Card, CardContent, Typography, Avatar, IconButton, SvgIcon, ThemeProvider, createTheme, Link } from '@mui/material';
import { styled } from '@mui/system';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MailIcon from '@mui/icons-material/Mail';

const theme = createTheme();

const StyledCard = styled(Card)(({ theme }) => ({
  width: '330px',
  height: '500px',
  margin: '10px',
  overflow: 'auto',
  backgroundColor: theme.palette.grey[100], 
  boxShadow: theme.shadows[3],
  borderRadius: '8px',
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
          <Typography variant="body1" gutterBottom>
            Pricing: $20USD/hr or $80USD/5hr
          </Typography>
          <StyledAvatar alt="Egor" src="/egor.jpg" />
          <Link href="https://twitter.com/ProbablyIsEGOR">
          <IconButton color="primary" aria-label="Twitter link">
            <TwitterIcon /> Twitter
          </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/egordyuzhev/">
          <IconButton color="primary" aria-label="LinkedIn link">
            <LinkedInIcon /> LinkedIn
          </IconButton>
          </Link> 
          <IconButton color="primary" aria-label="LinkedIn link">
            <LocationSearchingIcon /> Calgary, Alberta
          </IconButton>
          <IconButton color="primary" aria-label="LinkedIn link">
            <MailIcon /> egordyuzhev@gmail.com
          </IconButton>
          
        </CardContent>
      </StyledCard>
    </ThemeProvider>
  );
}
