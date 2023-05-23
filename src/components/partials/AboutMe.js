import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function AboutMe() {
    return (
        <Card style={{ width: '300px', height: '600px', margin: '10px', overflow: 'auto' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    About Me
                </Typography>
                EGOR
                I'm a GM Zerg
                <br/>
                2000+ Hours of Coaching Experience
                <img src="/egor.jpg" alt="Egor" width={200}/>
            </CardContent>
        </Card>
    );
}
