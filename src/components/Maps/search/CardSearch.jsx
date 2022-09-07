import { stringify } from "postcss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search_ubication } from "../../../redux/Actions/Actions";
import "../search/cardSearch.css";
export default function CardSearch({ id, texte_es, place_name, setValue , setStateAddress}) {
  
  const dispatch = useDispatch();
  const sendInfoLocation = (info, texte_es) => {
    dispatch(search_ubication(info));
    const copyLocalStorage = JSON.parse(localStorage.getItem('user'))
   copyLocalStorage.user.address= place_name
   localStorage.setItem('user', JSON.stringify(copyLocalStorage))
   setValue('')
  setStateAddress(false)
  };

  return (
    <div > 
<ul className="item-location" >
      <li key={id} className="fondoLi">
        <h6 style={{color: "black"}}>{texte_es}</h6>
        <p>
          {place_name}
        </p>
        <button key={id} onClick={() => sendInfoLocation(id, place_name)} className="botonLocalitation">
          {" "}
          estoy aqui
        </button>
       
      </li>
    </ul>
    </div>
    
  );
}
