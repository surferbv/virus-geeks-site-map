import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import {
  styled,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

import Divider from '@mui/material/Divider';

const InnerItem = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

let responsiveFontTheme = createTheme();
responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

export default function AppFooterSection() {
  return (
    <Container sx={{ pt:12, pb: 4 }} >
        <Divider variant="middle"/>
      <Grid container rowSpacing={2} columnSpacing={2} direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="https://virusgeeks.com/" underline="always" variant="button" sx={{ fontSize: {sm: 11, md: 16} }} target="_blank" rel="noopener" gutterBottom>
              Virus Geeks
            </Link>
          </InnerItem>
        </Grid>
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="https://virusgeeks.com/contact" underline="always" variant="button" sx={{ fontSize: {sm: 11, md: 16} }} target="_blank" rel="noopener" gutterBottom>
              Contact us
            </Link>
          </InnerItem>
        </Grid>
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="https://my.virusgeeks.com/footerModals/footerTos" underline="always" variant="button" sx={{ fontSize: {sm: 11, md: 16} }} target="_blank" rel="noopener" gutterBottom>
              Terms of service
            </Link>
          </InnerItem>
        </Grid>
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="https://my.virusgeeks.com/footerModals/footerNopp" underline="always" variant="button" sx={{ fontSize: {sm: 11, md: 16} }} target="_blank" rel="noopener" gutterBottom>
              Notice of privacy practices
            </Link>
          </InnerItem>
        </Grid>
        <Grid item xs={12} sm >
          <InnerItem>
            <Link href="https://my.virusgeeks.com/footerModals/footerConsent" underline="always" variant="button" sx={{ fontSize: {sm: 10, md: 16} }} target="_blank" rel="noopener" gutterBottom>
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
