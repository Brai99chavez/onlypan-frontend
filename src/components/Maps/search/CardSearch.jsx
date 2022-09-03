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
    <ul>
      <li key={id} className="item-location">
        <h6>{texte_es}</h6>
        <p>
          <h6>{place_name}</h6>
        </p>
        <button key={id} onClick={() => sendInfoLocation(id)}>
          {" "}
          estoy aqui
        </button>
      </li>
    </ul>
  );
}
