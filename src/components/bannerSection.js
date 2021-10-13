import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";


export default function BannerSection() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);


  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      <AppBar position="fixed" sx={{background: "white" }}>
        <Container>
          <Toolbar>
            <img src="/vg_logo.png" alt="virus geeks" width="40" height="40" />
            <ThemeProvider theme={theme}> 
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, color: "black", pl: 1 }}
              >
                Virus Geeks
              </Typography>
            <Button href="https://my.virusgeeks.com/login" >Login</Button>
            </ThemeProvider>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
