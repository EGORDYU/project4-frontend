import React, { useState, useEffect } from 'react';
import { buildOrdersApi } from './API.js';

export default function BuildOrderDetails(props) {
  const [buildOrder, setBuildOrder] = useState(null);

  useEffect(() => {
    const buildOrderId = props.match.params.id;
    fetchBuildOrder(buildOrderId);
  }, [props.match.params.id]);

  const fetchBuildOrder = (buildOrderId) => {
    buildOrdersApi
      .get(`/${buildOrderId}`)
      .then((res) => {
        setBuildOrder(res.data);
      })
      .catch(console.error);
  };

  if (!buildOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{buildOrder.title}</h2>
      <p>{buildOrder.description}</p>
      {/* Other build order details */}
    </div>
  );
}