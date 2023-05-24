// Import the react JS packages 
import axios from "axios";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Define the Login function.
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Create the submit method.
    const submit = async e => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        // Create the POST request
        const { data } = await
            axios.post('http://localhost:8000/token/',
                user, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

        // Initialize the access & refresh token in localstorage.      
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] =
            `Bearer ${data['access']}`;
        window.location.href = '/'
    }
    return (
        <Box
            component="form"
            onSubmit={submit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '300px',
                margin: '0 auto',
            }}
        >
            <Typography variant="h3" gutterBottom>
                Sign In
            </Typography>
            <TextField
                label="Username"
                value={username}
                required
                onChange={e => setUsername(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    )
}

export default Login;
