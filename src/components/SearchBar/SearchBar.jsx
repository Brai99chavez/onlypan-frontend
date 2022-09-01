import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getByName, resetFilteredProducts } from '../../redux/Actions/Actions';
import Filters from './Filters/Filters';

import './SearchBar.css';
function SearchBar({ setCurrentPage, tipo }) {
  //redux
  const [value, setValue] = useState('');
  const [changes, setChanges] = useState({
    type: '',
    sort: '',
    min: '',
    max: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const location = useLocation();

  // funciones
  const resetSelectFilters = () => {
    const type = document.querySelector('#type');
    const sortPrice = document.querySelector('#sortPrice');
    type.value = '';
    sortPrice.value = '';

    setChanges({ type: '', sort: '', min: '', max: '' });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push('/productos');
    dispatch(getByName(value));
    setValue('');
    setCurrentPage(1);
    resetSelectFilters();
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-container">
        {location.pathname === '/productos' ? (
          <Filters
            setCurrentPage={setCurrentPage}
            tipo={tipo}
            changes={changes}
          />
        ) : null}
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Buscar en la tienda"
            className="input"
          />
          <button>
            <i className="fa-solid fa-magnifying-glass buttons" />
          </button>
        </form>
        <Link to="/productos">
          <button
            onClick={() => {
              dispatch(resetFilteredProducts());
              resetSelectFilters();
            }}
          >
            <i className="fa-solid fa-arrow-rotate-right buttons"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
