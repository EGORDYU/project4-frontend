// YourFavs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteList from './FavoriteList';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
  <div>
    <h2>Your Favorite Build Orders:</h2>
    {favorites.map((favorite) => (
      <div key={favorite.id}>
        <h3>
          <Link to={`/buildorders/${favorite.id}`}>{favorite.title}</Link>
        </h3>
        <p>{favorite.description}</p>
      </div>
    ))}
  </div>
) : (
  <div>No favorites found.</div>
)}

    </div>
  );
};

export default YourFavs;
