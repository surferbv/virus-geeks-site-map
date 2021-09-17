import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MapBox from './mapBox';



export default function MapCard(){
    return(
        <Card sx={{ minWidth: 300, height: 800 }} elevation={14} >
            <MapBox/>
        </Card>
    )
}