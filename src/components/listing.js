import React from 'react';
import Card from '@mui/material/Card';

// a listing item to go into the side bar component 
export default function Listing(props){
    return(
        <Card sx={{ borderRadius: 5 }} elevation={7} id={props.myID} >
            <p> Site information goes here </p>
        </Card>
    )
}
