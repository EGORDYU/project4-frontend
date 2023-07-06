import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, ListItem, Card, CardContent, Button } from '@mui/material';

const YourFavs = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('https://zergcoach-d7f65394356e.herokuapp.com/api/favorites/list/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

const favoriteBuilds = await Promise.all(
  response.data.map(async (favorite) => {
    const buildResponse = await axios.get(`https://zergcoach-d7f65394356e.herokuapp.com/api/builds/${favorite.build_order_id}/`);
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
      await axios.delete(`https://zergcoach-d7f65394356e.herokuapp.com/api/favorites/${buildOrderId}/delete/`, {
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
                   <div>
                     <h2>{favorite.title}</h2>
                     {favorite.description}
                   </div>
                 </Link>
                 <Button style={{ color: 'red' }} onClick={() => deleteFavorite(favorite.id)} color="secondary">
                   Delete
                 </Button>
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
