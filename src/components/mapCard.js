import React from "react";
import Card from "@mui/material/Card";
import MapBox from "./mapBox";

export default function MapCard() {
  return (
        <Card sx={{ borderRadius: 0 }} elevation={14}>
            <MapBox />
        </Card>
  );
}
