import React from 'react';
import Card from '@mui/material/Card';

export default function Listing(props){

    // note that listing is a card div 
    return(
        <Card sx={{ borderRadius: 5 }} elevation={7}>
            <p> Site information goes here </p>
        </Card>
    )
}
