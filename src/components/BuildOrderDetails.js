import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { buildOrdersApi, commentsApi } from '../API.js';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import './markdownTable.css';


const MarkdownTable = ({ children }) => (
    <table>
      {children}
    </table>
  );
  


const BuildOrderDetails = () => {
  const { id } = useParams();
  const [buildOrder, setBuildOrder] = useState(null);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [newComment, setNewComment] = useState('');

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
      const response = await axios.get('/api/user/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log(response.data);
      localStorage.setItem('user_id', response.data.user_id);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const commentData = {
      build_order: id,
      content: newComment,
      user: localStorage.getItem('user_id'),
    };

    try {
      const response = await commentsApi.post('/', commentData);
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
      console.log('Error details:', error.response.data);
    }
  };

  if (!buildOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">Build Order Details</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">{buildOrder.title}</Typography>
          <Typography variant="h5">{buildOrder.matchup}</Typography>
        </Grid>
        <Grid item>
          <Markdown className="markdown-table">{buildOrder.description}</Markdown>
          <Markdown className="markdown-table">{buildOrder.buildorder}</Markdown>
        </Grid>
        <Grid item>
          <Typography variant="h6">Comments</Typography>
          <div style={{ marginTop: '1rem', width: '100%', maxWidth: '400px', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            {comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '4px' }}>
                <Typography variant="body1">Username: {comment.username}</Typography>
                <Typography variant="body1">{comment.content}</Typography>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item style={{ marginTop: '1rem', width: '100%', maxWidth: '400px' }}>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="New Comment"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={newComment}
              onChange={handleNewCommentChange}
              style={{ marginBottom: '1rem' }}
            />
            <Button type="submit" variant="contained" color="primary" style={{ alignSelf: 'flex-end' }}>
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default BuildOrderDetails;
