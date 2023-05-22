import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buildOrdersApi, commentsApi } from '../API.js';
import axios from 'axios';

const BuildOrderDetails = () => {
  const { id } = useParams();
  const [buildOrder, setBuildOrder] = useState(null);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchBuildOrder();
    fetchComments();
  }, []);

  const fetchBuildOrder = async () => {
    try {
      const response = await buildOrdersApi.get(`/${id}/`);
      setBuildOrder(response.data);
    } catch (error) {
      console.error('Error fetching build order:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentsApi.get(`?build_order=${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    if (buildOrder) {
      fetchUsername();
    }
  }, [buildOrder]);

  const fetchUsername = async () => {
    try {
      const response = await axios.get(`/api/users/${buildOrder.user}/`);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
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
      <h3>Comments</h3>
     {comments.map((comment) => (
  <div key={comment.id}>
    <p>Username: {comment.username}</p>
    <p>{comment.content}</p>
  </div>
))}
    </div>
  );
};

export default BuildOrderDetails;
