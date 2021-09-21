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
  const [earthquakeApiUrl, setEarthquakeApiUrl] = useState("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"); // now anytime the data changes it updates the view automaticlaly
  const [siteApiUrl, setSiteApiUrl] = useState("https://temp-tank.s3.us-west-1.amazonaws.com/sitedata.geojson");

  useEffect(() => {

    fetch(siteApiUrl)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result); // TODO: remove please not needed. 
        
        // init map
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [lng, lat],
          zoom: zoom,
        }); 

        // will fire once the map has loaded
        map.current.on('load', () =>{
          
          // add data
          map.current.addSource('earthquakes', {
            type: 'geojson',
            data: result
          });

          // add layer
          map.current.addLayer({
            'id': 'earthquakes-layer',
            'type': 'circle',
            'source': 'earthquakes',
            'paint': {
              'circle-radius': 8,
              'circle-stroke-width': 2,
              'circle-color': 'red',
              'circle-stroke-color': 'white'
            }
          });

        });

      },
      (error) =>{
        setIsLoaded(true);
        setError(error);
        console.log("We had an error!");
        console.log(error);
      }
    )
    
  }, [siteApiUrl]); // this will allow to update automatically for any state changes

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

  });
  
  // displaying fetch error to the ui
  if (error) {
    return( 
      <div>
        <Alert severity="error">Error: {error.message}</Alert>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>      
        <Alert severity="info">Loading...</Alert>
      </div>
    );
  } else {
    return (
      <div>
        {/* For deubug of lng and lat */}
        {/* <div className="locsidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div> */}
  
        {/* For site listing side bar */}
        {/* <div class="sidebar">
          <div class="heading">
          </div>
          <div id="listings" class="listings"></div>
        </div> */}
  
        {/* For map map container  */}
        <div ref={mapContainer} className="map-container" />
      </div>
    );
  }
}
