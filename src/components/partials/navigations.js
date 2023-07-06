import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

export function Navigation() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AppBar position="static" sx={{ justifyContent: 'center', backgroundColor: '#4b5320' }}>
            <Toolbar>

                <Button color="inherit" component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
                    Build Orders
                </Button>
                {!isAuth && (
                    <Button color="inherit" component={RouterLink} to="/users/create" sx={{ textDecoration: 'none' }}>
                        Make Account
                    </Button>
                )}

                {isAuth ? (
                    <Button color="inherit" component={RouterLink} to="/logout" sx={{ textDecoration: 'none' }}>
                        Logout
                    </Button>
                ) : (
                    <Button color="inherit" component={RouterLink} to="/login" sx={{ textDecoration: 'none' }}>
                        Login
                    </Button>
                )}
                {isAuth && (
                    <Button color="inherit" component={RouterLink} to="/faves" sx={{ textDecoration: 'none' }}>
                        Favourites
                    </Button>
                )}

            </Toolbar>
        </AppBar>
    );
}