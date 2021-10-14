import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from "@turf/turf";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import SideBar from "./sidebar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Paper, Typography } from "@mui/material";

import DirectionsWalkRoundedIcon from "@mui/icons-material/DirectionsWalkRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CardTravelIcon from "@mui/icons-material/CardTravel";

import {
  styled,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnZhcmdhcyIsImEiOiJja3RuajM5YXYwM2EyMzBwOXg1eWhyZHN6In0.rxrzHoPOPsxAbmBd1qsDgg";

const InnerItem = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

let responsiveFontTheme = createTheme();
responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

export default function MapBox() {
  // mapbox
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.3);
  const [lat, setLat] = useState(37.6);
  const [zoom, setZoom] = useState(9);

  // used by fetch
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [siteApiUrl, setSiteApiUrl] = useState(
    "https://temp-tank.s3.us-west-1.amazonaws.com/sitedata.geojson"
  );
  // const vgSite = "https://my.virusgeeks.com/";

  // operation big nose!
  // useEffect(() =>{
  //   fetch(vgSite).then(function (response) {
  //     // The API call was successful!
  //     return response.text().querySelector('#__NEXT_DATA__');
  //     // return response.text();
  //   }).then(function (data) {
  //     // This is the JSON from our response
  //     console.log(data);
  //   }).catch(function (err) {
  //     // There was an error
  //     console.warn('Operation big nose did not succeed', err);
  //   });
  // });

  // to looad and setup the map
  useEffect(() => {
    fetch(siteApiUrl)
      .then((res) => res.json())
      .then(
        (response) => {
          setIsLoaded(true);
          const sites = response;

          // add unique id to each site
          sites.features.forEach((site, i) => {
            site.properties.id = i;
          });

          // init map
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
          });

          // will fire once the map has loaded
          map.current.on("load", () => {
            // add data
            map.current.addSource("sites", {
              type: "geojson",
              data: sites,
            });

            // init new geocoder
            const geocoder = new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl: mapboxgl, // set instance of mapboxgl
              marker: true,
              bbox: [-125.0011, 24.9493, -66.9326, 49.5904], // set defaut bounding box in coords based on North America
              placeholder: "Enter your location here",
            });

            // create new control
            const nav = new mapboxgl.NavigationControl({
              showCompass: false,
              showZoom: true,
            });

            // save results of geocoder
            geocoder.on("result", ({ result }) => {
              const searchResult = result.geometry;

              // add marker of search location
              const marker = new mapboxgl.Marker()
                .setLngLat(searchResult.coordinates)
                .addTo(map.current);
              // find dist from all locations in miles NOTE: This goes throught all the locs even if they are not displayed.
              const options = { units: "miles" };

              // calculating distance of each site from the search result geocoder
              for (const site of sites.features) {
                site.properties.distance = turf.distance(
                  // call to turf to cal distance
                  searchResult,
                  site.geometry,
                  options
                );
              }

              // sorting sites by distance
              sites.features.sort((a, b) => {
                if (a.properties.distance > b.properties.distance) {
                  return 1;
                }
                if (a.properties.distance < b.properties.distance) {
                  return -1;
                }
                return 0; // a must be equal to b
              });

              // remove current list of sites, rebuild, and reorder
              // const listings = document.getElementById('listings');
              // while (listings.firstChild) {
              //   listings.removeChild(listings.firstChild);
              // }

              // rebuild the list of sites sorted by distance from searched results
              buildLocationList(sites);

              // highlight the nearest site item in the list
              const activeListing = document.getElementById(
                `listing-${sites.features[0].properties.id}`
              );

              activeListing.classList.add("active");

              // sets a bouding box with the search result and the nearest site in it
              const bbox = getBbox(sites, 0, searchResult);
              map.current.fitBounds(bbox, { padding: 100 });
              createPopUp(sites.features[0]);
            });

            // add geocoder i.e. search bar
            geocoder.addTo("#geocoder-container");

            // for debut TODO: not being used might delete
            // map.current.addControl(geocoder, 'top-left');

            // add zoom control
            map.current.addControl(nav, "top-right");

            // build the location list
            buildLocationList(sites);

            // add map markers
            addMarkers(sites);
          });
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log("We had an error!");
          console.log(error);
        }
      );

    // cleanup map when it unmounts
    return () => map.current.remove();
  }, [siteApiUrl]); // this will allow to update automatically for any state changes

  // for troubleshooting and showing coordinates sidebar TODO: NOT BEING USED REMOVE LATER.
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // build location list, create items, links, popups, and add event listeners
  function buildLocationList({ features }) {
    // placeing a var in {} makes it an object
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const site_cards = features.map(({ properties }) => {
      return (
        <Card
          key={`listing-${properties.id}`}
          id={`listing-${properties.id}`}
          className="item"
          elevation={8}
          sx={{ m: 1 }}
        >
          <CardContent>
            <ThemeProvider theme={theme}>
              <Typography>
                <Link
                  href="#"
                  color="primary"
                  underline="hover"
                  className="title"
                  variant="subtitle1"
                  id={`link-${properties.id}`}
                  onClick={() => {
                    for (const feature of features) {
                      // this might be improved by not iterating over n features
                      if (
                        `link-${properties.id}` ===
                        `link-${feature.properties.id}`
                      ) {
                        flyToSite(feature);
                        createPopUp(feature);
                      }
                    }

                    const activeItem =
                      document.getElementsByClassName("active");
                    if (activeItem[0]) {
                      activeItem[0].classList.remove("active");
                    }
                    // this.Link.parentNode.classList.add('active');
                  }}
                >
                  <strong>{properties.name}</strong>
                </Link>
              </Typography>
            </ThemeProvider>

            <Stack direction="row" spacing={1} sx={{ mb: 1, mt: 1 }}>
              <LocationOnRoundedIcon />
              <ThemeProvider theme={theme}>
                <Typography variant="body1">
                  {properties.address} <br />
                  {properties.city}, {properties.state}
                  {properties.postalCode}
                </Typography>
              </ThemeProvider>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <AccessTimeRoundedIcon color="action" />
              <ThemeProvider theme={theme}>
                <Typography
                  color="text.secondary"
                  variant="body1"
                  sx={{ fontSize: 14 }}
                >
                  {returnTimeSlots(properties)}
                </Typography>
              </ThemeProvider>
            </Stack>

            <Stack direction="row" spacing={1}>
              {roundDistance(properties.distance) ? <CardTravelIcon /> : ""}
              <ThemeProvider theme={theme}>
                <Typography variant="body2">
                  {roundDistance(properties.distance)}
                </Typography>
              </ThemeProvider>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="small"
              href={properties.testRegisterationUrl}
            >
              {" "}
              Book at this location{" "}
            </Button>
          </CardActions>
        </Card>
      );
    });

    ReactDOM.render(
      <Stack id="location-list-stack"> {site_cards} </Stack>,
      document.getElementById("listings")
    );
  }

  // parses, check the time slot, and returns a properly formatted time slot of boxes
  function returnTimeSlots(properties) {
    const slotArray = properties.timeSlots;

    const my_slots = slotArray.map((slot, index) => {
      let startDayAbbr = "";
      let endDayAbbr = "";

      // abbrivate the days and check if they exist
      if (slot.startDay) {
        startDayAbbr = (
          slot.startDay.charAt(0).toUpperCase() + slot.startDay.slice(1)
        ).substring(0, 3);
      }
      if (slot.endDay) {
        endDayAbbr = (
          slot.endDay.charAt(0).toUpperCase() + slot.endDay.slice(1)
        ).substring(0, 3);
        endDayAbbr = "-" + endDayAbbr;
      }

      return (
        <Box key={`slot-${index}${slot.length}`}>
          {startDayAbbr}
          {endDayAbbr}: {slot.startTime} - {slot.endTime}
        </Box>
      );
    });

    // Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>.
    return my_slots;
  }

  // rounds the distnace calcualted from search to nearest site
  function roundDistance(distance) {
    const roundedDistance = Math.round(distance * 100) / 100;
    if (!roundedDistance) return;
    return `${roundedDistance} miles away`;
  }

  // event action to fly to location of site on map
  function flyToSite(currentFeature) {
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 12,
    });
  }

  // adds a popup but using react and material components
  function createPopUpComp(jsxElement, currentFeature) {
    // if a popup exists already
    const popUps = document.getElementsByClassName("mapboxgl-popup");

    // then remove it
    if (popUps[0]) popUps[0].remove();

    // create a placeholder to add the component and renders it to the dom
    const placeholder = document.createElement("div");

    // render to dom
    ReactDOM.render(jsxElement, placeholder);

    new mapboxgl.Popup({ closeOnClick: false })
      .setDOMContent(placeholder) // this sets the control on the jsx component
      .setLngLat(currentFeature.geometry.coordinates)
      .addTo(map.current);
  }

  // adds a popup given a current feature
  function createPopUp(currentFeature) {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    // google link directions
    const lng = currentFeature.geometry.coordinates[0];
    const lat = currentFeature.geometry.coordinates[1];
    const googleLink = `https://www.google.com/maps/?q=${lat},${lng}`;

    // the component to add to the popup
    const myJsxObj = (
      <Stack spacing={1}>
        <ThemeProvider theme={theme}>
          <Typography variant="subtitle1" component="div">
            <strong>{currentFeature.properties.name}</strong>
          </Typography>
          <Stack direction="row" spacing={1}>
            <LocationOnRoundedIcon />
            <Typography variant="body1" component="div">
              {currentFeature.properties.address}
              <br />
              {currentFeature.properties.city},{" "}
              {currentFeature.properties.state}{" "}
              {currentFeature.properties.postalCode}
            </Typography>
          </Stack>
        </ThemeProvider>
        {/* <Typography variant="body1" component='div'>
          {currentFeature.properties.phoneFormatted}
        </Typography> */}
        {currentFeature.properties.walkIn ? (
          <Stack direction="row" spacing={1}>
            <DirectionsWalkRoundedIcon />
            <Typography>Walk-ins welcome! </Typography>
          </Stack>
        ) : (
          false
        )}
        {currentFeature.properties.driveThru ? (
          <Stack direction="row" spacing={1}>
            <DirectionsCarRoundedIcon />
            <Typography>Drive-thrus welcome!</Typography>
          </Stack>
        ) : (
          false
        )}
        <Button
          variant="contained"
          size="small"
          href={currentFeature.properties.testRegisterationUrl}
        >
          {" "}
          Book at this location{" "}
        </Button>
        <Button
          variant="contained"
          size="small"
          href={googleLink}
          target="_blank"
          rel="noopener"
        >
          {" "}
          Directions{" "}
        </Button>
      </Stack>
    );

    createPopUpComp(myJsxObj, currentFeature); //TODO: Could remove this and add all it's functionality here
  }

  // adds markers
  function addMarkers({ features }) {
    for (const marker of features) {
      const el = document.createElement("div");
      el.id = `marker-${marker.properties.id}`;
      el.className = "marker";

      new mapboxgl.Marker(el, { offset: [0, -6] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);

      // adding flyto and popup events to links
      el.addEventListener("click", (e) => {
        flyToSite(marker);
        createPopUp(marker);

        const activeItem = document.getElementsByClassName("active");
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        const listing = document.getElementById(
          `listing-${marker.properties.id}`
        );
        listing.classList.add("active");
      });
    }
  }

  // geocoder bounding box results
  function getBbox(sortedSites, siteIdentifier, searchResult) {
    const lats = [
      sortedSites.features[siteIdentifier].geometry.coordinates[1],
      searchResult.coordinates[1],
    ];

    const lons = [
      sortedSites.features[siteIdentifier].geometry.coordinates[0],
      searchResult.coordinates[0],
    ];

    const sortedLons = lons.sort((a, b) => sortCoords(a, b));
    const sortedLats = lats.sort((a, b) => sortCoords(a, b));

    // returns the lower left and the upper right corners of the bounding box
    return [
      [sortedLons[0], sortedLats[0]],
      [sortedLons[1], sortedLats[1]],
    ];
  }

  // defining how to sort lats and longs
  function sortCoords(a, b) {
    if (a > b) {
      return 1;
    }
    if (a.distance < b.distance) {
      return -1;
    }
    return 0;
  }

  // displaying fetch error to the ui
  if (error) {
    return (
      <Container spacing={2} sx={{ mb: 4 }}>
        <Alert severity="error">Error: {error.message}</Alert>
      </Container>
    );
  } else if (!isLoaded) {
    return (
      <Container spacing={2} sx={{ mb: 4 }}>
        <Alert severity="info">Loading...</Alert>
      </Container>
    );
  } else {
    return (
      <Container>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {/* title */}
          <Grid item xs={12}>
            <InnerItem>
              <ThemeProvider theme={responsiveFontTheme}>
                <Typography variant="h3" color="primary" gutterBottom>
                  Find a Test Site Near You
                </Typography>
              </ThemeProvider>
            </InnerItem>
          </Grid>

          {/* geocoder */}
          <Grid item xs={12} align="center">
            <div id="geocoder-container" />
          </Grid>

          {/* sidebar for locations */}
          <Grid item xs order={{ xs: 3, sm: 2 }}>
            <SideBar />
          </Grid>

          {/* map  */}
          <Grid item xs={12} sm={7} md={8} lg={9} order={{ xs: 2, sm: 3 }}>
            <Card elevation={8}>
              <div ref={mapContainer} className="map-container" />
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
