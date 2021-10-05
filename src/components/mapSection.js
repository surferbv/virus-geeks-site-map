import React from "react";
import Container from "@mui/material/Container";
import MapCard from "./mapCard";

export default function MapSection() {
  return (
    <Container maxWidth="lg" sx={{ p: 4 }}>
      <MapCard />
    </Container>
  );
}
