import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MapCard from './mapCard';

export default function MapSection(){
    return(
        <Container maxWidth="lg">

        <MapCard/>

            {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                Map content goes here.
            </Box> */}

        </Container>
    )
}