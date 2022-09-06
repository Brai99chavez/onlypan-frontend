import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { search_ubication } from "../../../redux/Actions/Actions";
import "../search/cardSearch.css";
export default function CardSearch({ id, texte_es, place_name }) {
  const dispatch = useDispatch();

  const sendInfoLocation = (info) => {
    dispatch(search_ubication(info));
  };
  return (
    <div > 
<ul className="item-location" >
      <li key={id} className="fondoLi">
        <h6>{texte_es}</h6>
        <p>
          {place_name}
        </p>
        <button key={id} onClick={() => sendInfoLocation(id)} className="botonLocalitation">
          {" "}
          estoy aqui
        </button>
      </li>
    </ul>
    </div>
    
  );
}
