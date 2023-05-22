import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildOrdersApi } from '../API.js';
import axios from "axios";

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
    <div>
      <h1>Build Order List</h1>
      <h3>Hi {message}</h3>
      {buildOrders.map((buildOrder) => (
        <div key={buildOrder.id}>
          <Link to={`/buildorders/${buildOrder.id}`}>
            <h2>{buildOrder.title}</h2>
          </Link>
          <p>{buildOrder.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BuildOrderList;
