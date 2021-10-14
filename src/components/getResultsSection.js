import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import {
  styled,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const InnerItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

let responsiveFontTheme = createTheme();
responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

export default function GetResultsSection() {
  return (
    <Container sx={{ mb: 4 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        {/* main section */}
        <Grid item xs={12}>
          <InnerItem>
            <ThemeProvider theme={responsiveFontTheme}>
              <Typography variant="h3" color="primary" gutterBottom>
                Get Your Results in 1-2 Business Days
              </Typography>
            </ThemeProvider>
          </InnerItem>
        </Grid>

        {/* icon section */}
        <Grid item xs={12} sm={4}>
          <Stack direction="column" spacing={1}>
            <InnerItem>
              <AssignmentRoundedIcon fontSize="large" />
            </InnerItem>
            <InnerItem>
              <ThemeProvider theme={responsiveFontTheme}>
                <Typography variant="subtitle1">Your Results</Typography>
              </ThemeProvider>
            </InnerItem>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack direction="column" spacing={1}>
            <InnerItem>
              <MailOutlineRoundedIcon fontSize="large" />
            </InnerItem>
            <InnerItem>
              <ThemeProvider theme={responsiveFontTheme}>
                <Typography variant="subtitle1">Sent To You</Typography>
              </ThemeProvider>
            </InnerItem>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack direction="column" spacing={1}>
            <InnerItem>
              <AccessTimeRoundedIcon fontSize="large" />
            </InnerItem>
            <InnerItem>
              <ThemeProvider theme={responsiveFontTheme}>
                <Typography variant="subtitle1">48Hrs! </Typography>
              </ThemeProvider>
            </InnerItem>
          </Stack>
        </Grid>

        {/* button section */}
        <Grid item xs={12}>
          <InnerItem>
            <Button variant="contained"> Get my results </Button>
          </InnerItem>
        </Grid>

        <Grid item xs={12}>
          <InnerItem>
            <ThemeProvider theme={responsiveFontTheme}>
              <Typography variant="body1">
                In most cases, your results will be ready within 1-2 business
                days. You will receive an email or text notification when your
                results are ready. In some instances, Virus Geeks can get your
                results to you in less than 48-hours. *Fees apply.
              </Typography>
            </ThemeProvider>
          </InnerItem>
        </Grid>
      </Grid>
    </Container>
  );
}
