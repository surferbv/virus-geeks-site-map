import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Alert from "@mui/material/Alert";
import * as turf from '@turf/turf';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


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

  // to looad and setup the map
  useEffect(() => {

    fetch(siteApiUrl)
    .then(res => res.json())
    .then(
      (response) => {
        setIsLoaded(true);
        const sites = response;

        // add unique id to each site
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

          // init new geocoder
          const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl, // set instance of mapboxgl
            marker: true, // geocoder default marker style TODO: REMOVE LATER?
            // bbox: [-77.210763, 38.803367, -76.853675, 39.052643] // set defaut bounding box in coords TODO: REMOVE LATER?
          });

          // save results of geocoder
          geocoder.on('result',({result})=>{
            const searchResult = result.geometry;

            // find dist from all locations in miles NOTE: This goes throught all the locs even if they are not displayed. 
            const options = {units: 'miles'};

            for(const site of sites.features){
              site.properties.distance = turf.distance( // call to turf to cal distance
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
            const listings = document.getElementById('listings');
            while (listings.firstChild) {
              listings.removeChild(listings.firstChild);
            }

            // rebuild the list of sites
            buildLocationList(sites);

            // highlight the nearest site item in the list
            const activeListing = document.getElementById( `listing-${sites.features[0].properties.id}`);
            activeListing.classList.add('active');

          });

          map.current.addControl(geocoder, 'top-left');

          buildLocationList(sites);
          addMarkers(sites);
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

      // show the distance in the list item if it is cacluated by the geocoder
      // if(properties.distance){ // TODO: REDUNDENT CODE SHOULD PUT THIS IN A FUNCTION
      //   const roundedDistance = Math.round(properties.distance * 100) / 100;
      //   link.innerHTML += `<div><strong>${roundedDistance} miles away </div></strong>`;
      // }

      // adding flyto and popup events to links
      link.addEventListener('click', function(){
        for (const feature of features) { // this might be improved by not iterating over n features
          if (link.id === `link-${feature.properties.id}`) {
            flyToSite(feature);
            createPopUp(feature);
          }
        }

        // setting active items css on sidebar
        const activeItem = document.getElementsByClassName('active');
        if(activeItem[0]){
          activeItem[0].classList.remove('active');
        }
        link.parentNode.classList.add('active');
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

  // event action to fly to location of site on map
  function flyToSite(currentFeature){
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  };

  // adds a popup given a current feature
  function createPopUp(currentFeature){
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    
    if(popUps[0]) popUps[0].remove();
    
    const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(`<h3>Virus Geeks</h3><h4>${currentFeature.properties.address}</h4>`)
    .addTo(map.current);
  };

  // adds markers
  function addMarkers( {features} ){

    for(const marker of features){
      const el = document.createElement('div');
      el.id = `marker-${marker.properties.id}`;
      el.className = 'marker';

      new mapboxgl.Marker(el, { offset:[0,-6] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);

      // adding flyto and popup events to links
      el.addEventListener('click', (e) =>{
        flyToSite(marker);
        createPopUp(marker);

        const activeItem = document.getElementsByClassName('active');
        e.stopPropagation();
        if(activeItem[0]){
          activeItem[0].classList.remove('active');
        }
        const listing = document.getElementById(`listing-${marker.properties.id}`);
        listing.classList.add('active');
      });

    }
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
