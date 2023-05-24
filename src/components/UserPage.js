import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

const UserPage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/create/', user);
      console.log(response.data); // handle success
    } catch (error) {
      console.error(error); // handle error
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Create User
      </Typography>
      <TextField
        label="Username"
        name="username"
        value={user.username}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default UserPage;