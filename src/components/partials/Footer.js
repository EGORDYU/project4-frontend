import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        textAlign: 'center',
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; 2023 ZergCoach |{' '}
        <Link href="https:/www.github.com/EGORDYU" target="_blank" rel="noopener noreferrer">
          github
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
