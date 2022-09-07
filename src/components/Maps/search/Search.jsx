import React, { useRef, useState } from "react";
import "../search/searchs.css";
import { useDispatch } from "react-redux/";
import searchApi from "../serchApi";
import {
  delete_location_search,
  searchLocalitation,
} from "../../../redux/Actions/Actions";
import { useSelector } from "react-redux/";
import CardSearch from "./CardSearch";


export default function Search() {
  const se = useSelector((state) => state.locations);
  const dispatch = useDispatch();
  const serchPlacesByTerm = async (query) => {
    const resp = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: "-34.60727663740302, -58.44580964731406",
      },
    });

    let posibilitis = resp.data;
    if (posibilitis.features.length)
      dispatch(searchLocalitation(posibilitis.features));
  };
  const [value, setValue] = useState("");
  const debounceRef = useRef(null);
  const onQueryChanged = (e) => {
    setValue(e.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = serchPlacesByTerm(value);
  };

  // 0(pin):-58.3702555
  // 1(pin):-34.608121

  return (
    <React.Fragment>

    
    <div>
      <form className="text-black">
        <input
          autoComplete="shipping address-line1"
          value={value}
          onChange={onQueryChanged}
          type="text"
          style={{color:"black"}}
          className="w-64"
        />
      </form>
      
    </div>
    {value.length ? 
        se?.map((e) => (
          <CardSearch
            setValue= {setValue}
            id={e.id}
            texte_es={e.text_es}
            place_name={e.place_name}
          />
        )) :  null}
  </React.Fragment>
  );

}
