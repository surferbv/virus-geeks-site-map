import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import {
  styled,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import personMask1 from "../assets/mask-person-medium.jpg";
import personMask2 from "../assets/masked-person1-medium.jpg";
import maskedPeople from "../assets/masked-ppl.webp";
import Box from "@mui/material/Box";

import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";

const InnerItem = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

let responsiveFontTheme = createTheme();
responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

export default function GetTestedSection() {
  return (
    <Container sx={{ mb: 4 }}>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {/* main section */}
        <Grid item xs={12} md={6}>
          <InnerItem>
            <ThemeProvider theme={responsiveFontTheme}>
              <Typography variant="h1" color="primary" gutterBottom>
                COVID-19 Testing
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Virus Geeks are here for you to provide all of your COVID-19
                testing needs, fast!
              </Typography>

              <Typography variant="h3" gutterBottom>
                You. Me. Us.
              </Typography>
            </ThemeProvider>
          </InnerItem>
        </Grid>
        <Grid item xs={12} md={6}>
          <InnerItem>
            <Box component="img" sx={{ maxWidth: "100%" }} src={personMask2} />
          </InnerItem>
        </Grid>
        <Grid item xs={12}>
          <InnerItem>
            <ThemeProvider theme={responsiveFontTheme}>
              <Typography variant="body1">
                Virus Geeks, recently rated the "Preferred testing company and
                top test site in the Bay Area" by the City of San Francisco, is
                your number one choice for COVID-19 virus testing. Virus Geeks
                is partnering with public health departments and organizations,
                as well as on its own, to provide you with COVID-19 testing
                services.
              </Typography>
            </ThemeProvider>
          </InnerItem>
        </Grid>
        {/* button section */}
        <Grid item xs={12}>
          <InnerItem>
            <ThemeProvider theme={responsiveFontTheme}>
              <Typography variant="h3" color="primary" gutterBottom>
                Getting tested is as easy as 1-2-3
              </Typography>
            </ThemeProvider>
          </InnerItem>
        </Grid>
        {/* icon section */}
        <Grid item xs={12} sm={4}>
          <Stack direction="column" spacing={1}>
            <InnerItem>
              <RoomRoundedIcon style={{ fontSize: 80 }} />
            </InnerItem>
            <InnerItem>
              <ThemeProvider theme={responsiveFontTheme}>
                <Typography variant="h5">Find a Location</Typography>
              </ThemeProvider>
            </InnerItem>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack direction="column" spacing={1}>
            <InnerItem>
              <NoteAltRoundedIcon style={{ fontSize: 80 }} />
            </InnerItem>
            <InnerItem>
              <ThemeProvider theme={responsiveFontTheme}>
                <Typography variant="h5">
                  Register For Testing
                </Typography>
              </ThemeProvider>
            </InnerItem>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack direction="column" spacing={1}>
            <InnerItem>
              <BiotechRoundedIcon style={{ fontSize: 80 }} />
            </InnerItem>
            <InnerItem>
              <ThemeProvider theme={responsiveFontTheme}>
                <Typography variant="h5">Get Tested </Typography>
              </ThemeProvider>
            </InnerItem>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
