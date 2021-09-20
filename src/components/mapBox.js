import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Alert from "@mui/material/Alert";


mapboxgl.accessToken =
  "pk.eyJ1IjoiYnZhcmdhcyIsImEiOiJja3RuajM5YXYwM2EyMzBwOXg1eWhyZHN6In0.rxrzHoPOPsxAbmBd1qsDgg";

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
  const [items, setItems] = useState([]);
  const [apiUrl, setApiUrl] = useState("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"); // now anytime the data changes it updates the view automaticlaly

  useEffect(() => {

    fetch(apiUrl)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
        console.log("SUCCESS!");
        console.log(result);
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [lng, lat],
          zoom: zoom,
        }); 

      },
      (error) =>{
        setIsLoaded(true);
        setError(error);
        console.log("We had an error!");
        console.log(error);
      }
    )
    
  }, [apiUrl]); // sine we are passing an empty array this will only run once eslint will give warnings

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

  });


  // useEffect(()=>{
  //   if (!map.current) return;
  //   map.current.addLayer({
  //     id: 'locations',
  //     type: 'circle',
  //     /* Add a GeoJSON source containing place coordinates and information. */
  //     source: {
  //       type: 'geojson',
  //       data: stores
  //     }
  //   });
  // });

  

  return (
    <div>
      {/* For deubug of lng and lat */}
      {/* <div className="locsidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}

      {/* <div class="sidebar">
        <div class="heading">
        </div>
        <div id="listings" class="listings"></div>
      </div> */}

      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
