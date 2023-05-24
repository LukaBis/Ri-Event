import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function EventItem(props) {

    const navigate = useNavigate('');

    return (
        <Card sx={{ width: 345, m: 1 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={props.image}
                title="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.description}
            </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={() => { navigate(`/event/${props.id}`) }}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
