import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Card, CardContent, Button } from '@mui/material';

const YourFavs = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await axios.get(`http://localhost:8000/api/favorites/list/${userId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
      });
      const favoriteBuilds = await Promise.all(
        response.data.map(async (favorite) => {
          const buildResponse = await axios.get(`http://localhost:8000/api/builds/${favorite.build_order}/`);
          return buildResponse.data;
        })
      );
      setFavorites(favoriteBuilds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const deleteFavorite = async (buildOrderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/favorites/${buildOrderId}/delete/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
      });
      fetchFavorites();
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'auto', backgroundColor: '#ffeecc' }}>
      <div style={{ width: '60%', marginLeft: '1rem', height: '100vh', backgroundColor: '#ffeecc' }}>
        <div style={{ display: 'flex', width: '100%', margin: 'auto', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
          <h1>Your Favorites</h1>
        </div>
        {favorites.length > 0 ? (
          <List>
            {favorites.map((favorite) => (
              <ListItem key={favorite.id}>
                <Card style={{ width: '100%', marginBottom: '1rem', backgroundColor: '#d1bea8', height: 180 }}>
                  <CardContent>
                    <Link to={`/buildorders/${favorite.id}`} style={{ textDecoration: 'none', color: '#d1bea8' }}>
                      <ListItemText primary={<h2>{favorite.title}</h2>} secondary={<p>{favorite.description}</p>} />
                    </Link>
                    {/* {favorite.imgur_link && <img src={favorite.imgur_link} alt="Build Order Image" height="100px" width="100px" />} */}
                    <Button style={{color: 'red'}}onClick={() => deleteFavorite(favorite.id)} color="secondary">Delete</Button>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        ) : (
          <div>No favorites found.</div>
        )}
      </div>
    </div>
  );
};

export default YourFavs;
