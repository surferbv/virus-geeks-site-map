import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



export default function MapCard(){
    return(
        <Card sx={{ minWidth: 300, height: 800 }} elevation={12} >
            <CardMedia
                component="img"
                height="800"
                src="/map_img.png"
                alt="Static map"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    San Mateo County
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    San Mateo is a city in San Mateo County, California, about 
                    20 miles south of San Francisco and 31 miles northwest of San Jose. 
                    San Mateo had an estimated 2019 population of 104,430. It has a Mediterranean climate, and is known for its rich history
                </Typography>
            </CardContent>
        </Card>
    )
}