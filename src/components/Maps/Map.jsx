import mapboxgl, { Map , Marker} from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Search from "../Maps/search/Search";
import "../Maps/serch.css";

export default function Maps() {
  // const [lng, setLng] = useState(-58.41988740079648);
  // const [lat, setLat] = useState(-34.56609373429821);
  // const [zoom, setZoom] = useState(9);

  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // useEffect(() => {
  //   if (map.current) return;
  //   map.current = new Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [ -58.36990782529691, -34.60798097821002],
  //     zoom: zoom
  //   });
  // });


  // var limpieza
  // const newMarker = useSelector(state=> state.ubicationUserDeliver)
  // if(newMarker.length){
  //    limpieza = newMarker.shift()
  //   console.log(limpieza);
  // }

  // if(limpieza){
  //   const [ lng, lat] = limpieza.center
  //   new Marker()
  //  .setLngLat([ lng, lat ])
  //  .addTo(map.current) 
  
  // }

  // new Marker()
  // .setLngLat([lng, lat])
  // .addTo(map.current) 
 

 
    
 





  return (
    <div>
      {/* <div ref={mapContainer} className="map-container"></div>
       */}
      <Search />
    </div>
  );
}
