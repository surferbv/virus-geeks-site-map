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
  );
}
