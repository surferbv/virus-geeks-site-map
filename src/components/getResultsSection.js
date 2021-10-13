import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";


const InnerItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2, 
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    background: theme.palette.primary.light,
  }));

export default function GetResultsSection() {
  return (
    <Container sx={{mb: 4}}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 2, sm: 2, md: 2 }}
      >
        {/* main section */}
        <Grid item xs={12}>
          <InnerItem>Title Get Results Section</InnerItem>
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
        
        {/* button section */}
        <Grid item xs={12}>
          <InnerItem>
              <Button variant="contained"> Get my results </Button>
          </InnerItem>
        </Grid>

        <Grid item xs={12}>
          <InnerItem>Text</InnerItem>
        </Grid>
      </Grid>
    </Container>
  );
}
