import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  combinedFilter,
  getTypes,
  resetFilteredProducts,
} from '../../../redux/Actions/Actions';

export default function Filters({ setCurrentPage, tipo }) {
  // redux
  const { products } = useSelector((state) => state);
  const maxPrice = Math.max(...products.map((p) => p.price));
  const [changes, setChanges] = useState({
    type: '',
    sort: '',
    min: '',
    max: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  const { types } = useSelector((state) => state);

  // funciones
  const onChange = (e) => {
    setCurrentPage(1);
    if (tipo) changes.type = tipo;
    changes[e.target.name] = e.target.value;

    if (
      changes.sort !== '' ||
      changes.type !== '' ||
      changes.min > 0 ||
      (changes.max < maxPrice && changes.max > 0)
    ) {
      dispatch(combinedFilter(changes));
    }
    if (!changes.sort && !changes.type && !changes.min && !changes.max) {
      dispatch(resetFilteredProducts());
    }
  };

  // componente
  return (
    <div className="filtersContainer">
      <select
        id="type"
        className="selectAttribute"
        name="type"
        defaultValue={`${tipo || 'categoria'}`}
        onChange={onChange}
      >
        <option value="">Categorías</option>
        {types.length &&
          types.map((t, i) => (
            <option key={i} value={t}>
              {t[0].toUpperCase() + t.substring(1).toLowerCase()}
            </option>
          ))}
      </select>
      <select
        id="sortPrice"
        className="selectAttribute"
        name="sort"
        onChange={onChange}
      >
        <option value="">Precios</option>
        <option value="min">Min</option>
        <option value="max">Max</option>
      </select>
      <label className="text-sky-700  text-sm">Min:</label>
      <input
        className="w-12 mx-2 text-sky-700  text-sm"
        id="minPrice"
        name="min"
        value={changes.min < 0 ? 0 : changes.min}
        placeholder="0"
        type="number"
        onChange={onChange}
      />
      <label className="text-sky-700  text-sm">Max:</label>
      <input
        className="w-12 mx-2 text-sky-700  text-sm"
        id="maxPrice"
        name="max"
        value={changes.max > maxPrice ? maxPrice : changes.max}
        placeholder={maxPrice}
        type="number"
        onChange={onChange}
      />
    </div>
  );
}
