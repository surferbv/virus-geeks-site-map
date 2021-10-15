import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const InnerItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  height: 300,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
  background: theme.palette.primary.light,
}));

export default function AppFooterSection() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container sx={{p: 0}}>
        <Box sx={{ bgcolor: "#cfe8fc", height: "20vh", pl: "24px", pr: "24px" }}>
            Stuff
        </Box>
      </Container>
    </React.Fragment>
    <Container maxWidth="xl" sx={{ pt:12, pb: 4, bgcolor: 'secondary.main.light' }} >
        <Divider variant="middle"/>
      <Grid container rowSpacing={2} columnSpacing={2} direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="#" underline="always" variant="button" sx={{ fontSize: {sm: 10, md: 16} }} gutterBottom>
              Virus Geeks
            </Link>
          </InnerItem>
        </Grid>
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="#" underline="always" variant="button" sx={{ fontSize: {sm: 10, md: 16} }} gutterBottom>
              Contact us
            </Link>
          </InnerItem>
        </Grid>
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="#" underline="always" variant="button" sx={{ fontSize: {sm: 10, md: 16} }} gutterBottom>
              Terms of service
            </Link>
          </InnerItem>
        </Grid>
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="#" underline="always" variant="button" sx={{ fontSize: {sm: 10, md: 16} }} gutterBottom>
              Notice of privacy practices
            </Link>
          </InnerItem>
        </Grid>
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="#" underline="always" variant="button" sx={{ fontSize: {sm: 10, md: 16} }} gutterBottom>
              Covide-19 informed consent
            </Link>
          </InnerItem>
        </Grid>
      </Grid>
      <InnerItem>
        <ThemeProvider theme={responsiveFontTheme}>
          <Typography variant="subtitle1">
            © 2021 Copyright Virus Geeks Inc.
          </Typography>
        </ThemeProvider>
      </InnerItem>
    </Container>
  );
}
