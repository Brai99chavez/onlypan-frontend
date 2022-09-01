import {Map}from "mapbox-gl";
import React from "react"; 
import "../Maps/serch.css"
let map = new Map({
   // container: "map",
    style: "mapbox:..styles/mapbox/satellite-streets-v11",
    center: [-34.596926,-58.4622128,17],
    zoom: 9
})
export default function Serch (){
  
    return (
        <div>
            <h1>
                soy el serch del mapbox
            </h1>
            <div >{map}</div>
            
        </div>
    )
}