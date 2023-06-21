import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { buildOrdersApi, commentsApi } from '../API.js';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import './details.css';

const BuildOrderDetails = () => {
  const { id } = useParams();
  const [buildOrder, setBuildOrder] = useState(null);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
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

    fetchBuildOrder();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (buildOrder) {
      fetchUsername();
    }
  }, [buildOrder]);

  const fetchUsername = async () => {
    try {
      const response = await axios.get('https://zergcoach-d7f65394356e.herokuapp.com/api/user/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
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
      user: username,
    };
  
    try {
      const response = await commentsApi.post('/', commentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
      console.log('Error details:', error.response.data);
    }
  };
  
  

  const handleDeleteComment = async (commentId) => {
    try {
      await commentsApi.delete(`/${commentId}/`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!buildOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: '#ffeecc' }}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h2">{buildOrder.title}</Typography>
          <Typography variant="h5">{buildOrder.matchup}</Typography>
        </Grid>
        <Grid item>
          <Markdown className="markdown-table">{buildOrder.description}</Markdown>
          <Markdown className="markdown-table">{buildOrder.buildorder}</Markdown>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Typography variant="h6">Comments</Typography>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '50%' }}>
            {comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', alignSelf: 'stretch', wordWrap: 'break-word' }}>
                <Typography variant="body1">Username: {comment.username}</Typography>
                <Typography variant="body1">Comment: {comment.content}</Typography>
                {comment.username === username && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Grid>
        <Grid item style={{ width: '100%', maxWidth: '400px' }}>
          <form onSubmit={handleCommentSubmit}>
            <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', paddingBottom: '1rem' }}>
              <TextField
                label="New Comment"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                value={newComment}
                onChange={handleNewCommentChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default BuildOrderDetails;
