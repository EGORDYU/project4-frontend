import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildOrdersApi } from '../API.js';
import axios from "axios";
import AboutMe from './partials/AboutMe.js';
import { List, ListItem, ListItemText, ListItemIcon, Card, CardContent } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const BuildOrderList = () => {
  const [buildOrders, setBuildOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // number of build orders per page


  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const response = await axios.get('/api/user/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log('user_id:', response.data.user_id); 
      localStorage.setItem('user_id', response.data.user_id);
    } catch (error) {
      console.error('Error fetching user id:', error);
    }
  };
  
  

  useEffect(() => {
    fetchBuildOrders();
  }, []);

  const fetchBuildOrders = async () => {
    try {
      const response = await buildOrdersApi.get('/');
      setBuildOrders(response.data);
    } catch (error) {
      console.error('Error fetching build orders:', error);
    }
  };

  const addToFavorites = async (buildOrderId) => {
    try {
      const user_id = localStorage.getItem('user_id');
      const payload = {
        user_id: parseInt(user_id),
        build_order: buildOrderId
      };
      await axios.post('/api/favorites/', payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      });
      alert("Build Order added to favorites"); // You can handle the success case however you prefer
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
  
  
  
  
  
  
  

  // Get current posts
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentBuildOrders = buildOrders.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'auto' , backgroundColor:'#ffeecc'}}>
      <div style={{ width: '60%', marginLeft: '1rem', height: '100vh', backgroundColor: '#ffeecc'}}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  <h1 style={{ color: '#4a5d23' }}>Build Order List</h1>
</div>


{currentBuildOrders.map((buildOrder) => (
  <Card key={buildOrder.id} style={{ width: '100%', marginBottom: '1rem', backgroundColor: '#d1bea8', height: 180 }}>
    <CardContent>
      <ListItem button component={Link} to={`/buildorders/${buildOrder.id}`}>
        <ListItemText primary={<h1 style={{ marginTop: '-15px', color:"#4a5d23"}}>{buildOrder.title}</h1>} secondary={<p>{buildOrder.description}</p>} />
        {buildOrder.imgur_link && <img src={buildOrder.imgur_link} alt="Build Order Image" height="100px" width="100px" />}
      </ListItem>
      <button onClick={() => addToFavorites(buildOrder.id)} style={{border: 'none', background: 'transparent'}}>
        <StarBorderIcon />
      </button>
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
