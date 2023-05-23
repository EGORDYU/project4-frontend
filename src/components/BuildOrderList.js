import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildOrdersApi } from '../API.js';
import axios from "axios";
import AboutMe from './partials/AboutMe.js';
import { List, ListItem, ListItemText, ListItemIcon, Card, CardContent } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const BuildOrderList = () => {
  const [buildOrders, setBuildOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBuildOrders();
    checkAuthentication();
  }, []);

  const fetchBuildOrders = async () => {
    try {
      const response = await buildOrdersApi.get('/');
      setBuildOrders(response.data);
    } catch (error) {
      console.error('Error fetching build orders:', error);
    }
  };

  const checkAuthentication = async () => {
    if(localStorage.getItem('access_token') === null){                   
      window.location.href = '/login'
    }
    else{
      try {
        const {data} = await axios.get('http://localhost:8000/home/', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setMessage(data.message);
      } catch (e) {
        console.log('not auth')
      }
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', margin: 'auto' }}>
      <div style={{ width: '60%' }}>
        <div style={{ display: 'flex', width: '100%', margin: 'auto' }}>
          <h1>BuildOrder List</h1>
        </div>
        {buildOrders.map((buildOrder) => (
          <Card key={buildOrder.id} style={{ width: '100%', marginBottom: '1rem' }}>
            <CardContent>
              <ListItem button component={Link} to={`/buildorders/${buildOrder.id}`}>
                <ListItemText primary={buildOrder.title} secondary={buildOrder.description} />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </div>
      <AboutMe />
    </div>
  );
  
  
}



export default BuildOrderList;
