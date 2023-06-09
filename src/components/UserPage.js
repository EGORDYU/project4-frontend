import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
const response = await axios.post('https://zergcoach-d7f65394356e.herokuapp.com/users/create/', user);

      console.log(response.data); // handle success
      navigate('/login'); // navigate to login
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
      <Typography variant="p" gutterBottom>
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
        label="Email"
        name="email"
        value={user.email}
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
