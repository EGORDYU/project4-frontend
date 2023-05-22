import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buildOrdersApi } from '../API.js';

const BuildOrderDetails = () => {
  const { id } = useParams();
  const [buildOrder, setBuildOrder] = useState(null);

  useEffect(() => {
    fetchBuildOrder();
  }, []);

  const fetchBuildOrder = async () => {
    try {
      const response = await buildOrdersApi.get(`/${id}`);
      setBuildOrder(response.data);
    } catch (error) {
      console.error('Error fetching build order:', error);
    }
  };

  if (!buildOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Build Order Details</h1>
      <h2>{buildOrder.title}</h2>
      <p>{buildOrder.description}</p>
    </div>
  );
};

export default BuildOrderDetails;
