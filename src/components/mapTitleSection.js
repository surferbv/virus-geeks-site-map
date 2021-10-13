import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

export default function titleSection() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Typography variant="h2" textAlign="center">
          Testing Sites
        </Typography>
      </ThemeProvider>
    </Container>
  );
}
