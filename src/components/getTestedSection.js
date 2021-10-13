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

export default function GetTestedSection() {
  return (
    <Container sx={{mb: 4}}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 2, sm: 2, md: 2 }}
      >
        {/* main section */}
        <Grid item xs={12} md={6} >
          <InnerItem>Title Get Tested Section</InnerItem>
        </Grid>
        <Grid item xs={12} md={6} >
          <InnerItem>Img</InnerItem>
        </Grid>
        <Grid item xs={12} >
          <InnerItem>Paragraph Text</InnerItem>
        </Grid>

        {/* icon section */}
        <Grid item xs={12} sm={4}>
          <Stack direction="column" spacing={1}>
            <InnerItem>Icon1</InnerItem>
            <InnerItem>Text</InnerItem>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack direction="column" spacing={1}>
            <InnerItem>Icon2</InnerItem>
            <InnerItem>Text</InnerItem>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack direction="column" spacing={1}>
            <InnerItem>Icon3</InnerItem>
            <InnerItem>Text</InnerItem>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
