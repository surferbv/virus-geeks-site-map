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
  const [siteApiUrl, setSiteApiUrl] = useState("https://temp-tank.s3.us-west-1.amazonaws.com/sitedata.geojson");

  useEffect(() => {

    fetch(siteApiUrl)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        const sites = result;

        // add unique ids to sites
        sites.features.forEach((site, i)=>{
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
        map.current.on('load', () =>{
          
          // add data
          map.current.addSource('sites', {
            type: 'geojson',
            data: sites
          });

          // add layer
          map.current.addLayer({
            'id': 'sites-layer',
            'type': 'circle',
            'source': 'sites',
            'paint': {
              'circle-radius': 8,
              'circle-stroke-width': 2,
              'circle-color': 'red',
              'circle-stroke-color': 'white'
            }
          });
          buildLocationList(result );
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
  
  function buildLocationList( {features} ){ // placeing a var in {} makes it an object
    
    for ( const { properties } of features ){

      // new listing section for side bar
      const listings = document.getElementById('listings'); 
      const listing = listings.appendChild(document.createElement('div'));

      // assign a unique id to the listing
      listing.id = `listing-${properties.id}`;
      // give each item class name 
      listing.className = 'item';

      // create and add a link to the individual listing above
      const link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.id = `link-${properties.id}`;
      link.innerHTML = `${properties.address}`;

      // adding flyto event
      link.addEventListener('click', (e) =>{
        console.log(features);
        //  flytToSite(properties)
      });

      // add details to each listing
      const details = listing.appendChild(document.createElement('div'));
      details.innerHTML = `${properties.city}`;
      if(properties.phone){
        details.innerHTML += `. ${properties.phoneFormatted}`;
      }
      if(properties.distance){
        const roundedDistance = Math.round(properties.distance * 100) / 100;
        details.innerHTML += `<div><string> ${roundedDistance} </div></string>`;
      }
    }
  };
  

  function flytToSite(currentFeature){
    console.log(currentFeature);
    // map.current.flytTo({
    //   center: currentFeature.geometry.coordinates,
    //   zoom: 15
    // });
  };

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
        <div className="sidebar">
          <div className="heading">
          </div>
          <div id="listings" className="listings"></div>
        </div>
  
        {/* For map map container  */}
        <div ref={mapContainer} className="map-container" />
      </div>
    );
  }
}
