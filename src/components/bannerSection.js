import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function BannerSection() {
  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      <AppBar position="fixed" sx={{ pl: 1, pr: 4, background: "white" }}>
        <Container>
          <Toolbar>
            <img src="/vg_logo.png" alt="virus geeks" width="40" height="40" />
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, color: "black", pl: 2 }}
            >
              Virus Geeks
            </Typography>
            <Button>Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
