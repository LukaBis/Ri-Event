import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AttendeeCard(props) {
    return (
        <Card sx={{ maxWidth: 180, ml: 2 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                width="150"
                image={props.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Attendee
                </Typography>
            </CardContent>
        </Card>
    );
}