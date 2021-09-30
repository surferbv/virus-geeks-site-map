import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function BannerSection(){
    return(
        <Container maxWidth='xl'>

            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <Grid item>
                    <img src="/vg_logo.png" alt="virus geeks" width="80" height="80"/>
                </Grid>
                <Grid item>
                    <Typography variant="h5" noWrap>
                        Virus Geeks
                    </Typography>
                </Grid>

            </Grid>
        </Container>
    )
}