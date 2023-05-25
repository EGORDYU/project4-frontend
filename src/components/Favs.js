// YourFavs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteList from './FavoriteList';

const YourFavs = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await axios.get(`http://localhost:8000/api/favorites/list/${userId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      console.log(response.data);
  
      const favoriteBuilds = await Promise.all(response.data.map((favorite) => fetchBuild(favorite.build_order)));
  
      setFavorites(favoriteBuilds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };
  
  

  const fetchBuild = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/builds/${id}/`); // Use the correct URL with the build id
      console.log(id)
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching build:', error);
    }
  };
  
  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <FavoriteList favorites={favorites} />
      ) : (
        <div>No favorites found.</div>
      )}
    </div>
  );
};

export default YourFavs;
