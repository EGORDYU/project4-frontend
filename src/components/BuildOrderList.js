import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import AboutMe from './partials/AboutMe.js';
import { ListItem, ListItemText, Card, CardContent, Button } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const BuildOrderList = () => {
  const [buildOrders, setBuildOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // number of build orders per page
  
  

  useEffect(() => {
    fetchBuildOrders();
  }, []);

  const fetchBuildOrders = async () => {
    try {
      const response = await axios.get('https://zergcoach-d7f65394356e.herokuapp.com/api/buildorders/');
      setBuildOrders(response.data);
    } catch (error) {
      console.error('Error fetching build orders:', error);
    }
  };

  const addToFavorites = async (buildOrderId, userId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'https://zergcoach-d7f65394356e.herokuapp.com/favorites/',
        { build_order: buildOrderId, user: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Favorite added:', response.data);
    } catch (error) {
      console.error('Error adding to favorites:', error);
      if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      } else if (error.request) {
          console.log(error.request);
      } else {
          console.log('Error', error.message);
      }
    }
  };
  
  
  

  // Get current posts
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentBuildOrders = buildOrders.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'auto', backgroundColor: '#ffeecc' }}>
      <div style={{ width: '60%', marginLeft: '1rem', height: '100vh', backgroundColor: '#ffeecc' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <h1 style={{ color: 'rgb(0, 130, 255)' }}>Build Order List</h1>
        </div>

        {currentBuildOrders.map((buildOrder) => (
          <Card key={buildOrder.id} style={{ width: '100%', marginBottom: '1rem', backgroundColor: '#d1bea8', height: 260 }}>
            <CardContent>
              <ListItem button component={Link} to={`/buildorders/${buildOrder.id}`}>
                <ListItemText primary={<h1 style={{ marginTop: '-15px', color: "rgb(0, 130, 255)", height:140 }}>{buildOrder.title}</h1>} secondary={<p>{buildOrder.description}</p>} />
                {buildOrder.imgur_link && <img src={buildOrder.imgur_link} alt="Build Order" height="100px" width="100px" />}
              </ListItem>
              <Button onClick={() => addToFavorites(buildOrder.id)} style={{ border: 'none', background: 'transparent' }}>
                <StarBorderIcon />
              </Button>
            </CardContent>
          </Card>
        ))}

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {[...Array(Math.ceil(buildOrders.length / itemsPerPage))].map((_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <AboutMe />
    </div>
  );
}

export default BuildOrderList;
