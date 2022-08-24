import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getAllProducts, getByName ,resetFilteredProducts} from '../../redux/Actions/Actions'

import "./SearchBar.css"
function SearchBar() {

  //redux
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const history = useHistory()

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push("/productos");
    dispatch(getByName(value));
    setValue('')
  };


  return (
  <div className="SearchBar">
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Buscar en la tienda"
        className="input"
      />
      <button><i className="fa-solid fa-magnifying-glass buttons" /></button>
    </form>
    <button onClick={() => dispatch(resetFilteredProducts())}><i className="fa-solid fa-arrow-rotate-right buttons"></i></button>
  </div>)
}

export default SearchBar;
