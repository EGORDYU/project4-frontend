import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BuildOrderList = () => {
  const [buildOrders, setBuildOrders] = useState([]);

  useEffect(() => {
    fetchBuildOrders();
  }, []);

  const fetchBuildOrders = async () => {
    try {
      const response = await axios.get('/api/buildorders');
      setBuildOrders(response.data);
    } catch (error) {
      console.error('Error fetching build orders:', error);
    }
  };

  return (
    <div>
      <h1>Build Order List</h1>
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
