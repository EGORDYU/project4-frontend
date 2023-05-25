// FavoriteList.js
import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const FavoriteList = ({ favorites }) => {
  return (
    <div>
      {favorites.length > 0 ? (
        <List>
          {favorites.map((favorite) => (
            <ListItem key={favorite.id}>
              <Card>
                <CardContent>
                  <ListItemText primary={favorite.build_order} secondary={favorite.description} />
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        <div>No favorites found.</div>
      )}
    </div>
  );
};

export default FavoriteList;
