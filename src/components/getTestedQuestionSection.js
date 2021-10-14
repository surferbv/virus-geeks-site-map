import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import {
  styled,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import familyMasked from "../assets/masked-mom-child-medium.jpg";

const InnerItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

let responsiveFontTheme = createTheme();
responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

export default function GetTestedQuestionSection() {
  return (
    <Container sx={{ mb: 4 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        {/* main section */}
        <Grid item xs={12}>
          <InnerItem>
            <ThemeProvider theme={responsiveFontTheme}>
              <Typography variant="h3" color="primary" gutterBottom>
                Should I Get Tested Even If I Have Been Vaccinated?
              </Typography>
            </ThemeProvider>
          </InnerItem>
        </Grid>
        <Grid item xs={12}>
          <InnerItem>
            <ThemeProvider theme={responsiveFontTheme}>
              <Typography variant="body1">
                Did you receive a vaccination but still have concerns? If so,
                you are like thousands of others who want to protect themselves,
                their children, elderly parents, friends and family.
              </Typography>
            </ThemeProvider>
          </InnerItem>
        </Grid>

        {/* secondary section */}
        <Grid item xs={12} sm={6}>
          <InnerItem>
            <ThemeProvider theme={responsiveFontTheme}>
              <Typography variant="h4" gutterBottom>
                Getting tested can protect you and your family from unknowingly
                spreading COVID-19. Visit a test site today to learn more.
              </Typography>
            </ThemeProvider>
          </InnerItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InnerItem>
            <Box component="img" sx={{ maxWidth: "100%" }} src={familyMasked} />
          </InnerItem>
        </Grid>
      </Grid>
    </Container>
  );
}
