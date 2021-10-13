import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Stack } from "@mui/material";

const InnerItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
  background: theme.palette.primary.light,
}));

export default function GetTestedQuestionSection() {
  return (
    <Container sx={{ mb: 4 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        {/* main section */}
        <Grid item xs={12}>
          <InnerItem>Title Get Test Question</InnerItem>
        </Grid>
        <Grid item xs={12}>
          <InnerItem>Paragraph Text</InnerItem>
        </Grid>

        {/* secondary section */}
        <Grid item xs={12} sm={6}>
          <InnerItem>Title</InnerItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InnerItem>Img</InnerItem>
        </Grid>
      </Grid>
    </Container>
  );
}
