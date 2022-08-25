import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByType,
  getTypes,
  mixedSort,
  resetFilteredProducts,
  sortByPrice,
} from '../../../redux/Actions/Actions';

export default function Filters() {
  // redux
  const [changes, setChanges] = useState({
    type: '',
    sort: '',
    min: 0,
    max: 9999,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  const { types } = useSelector((state) => state);

  // funciones

  const onChange = (e) => {
    // setCurrentPage(1);

        changes[e.target.name]= e.target.value
        
        console.log(changes)
        if (changes.sort !== '' && changes.type !== '') {
            dispatch(mixedSort(changes))
        }else
        if (changes.sort !== '') {
            dispatch(sortByPrice(changes.sort))
        }else
        if (changes.type !== '') {
            dispatch(filterByType(changes.type))
        }

        if (changes.sort === '' && changes.type === '') {
            dispatch(resetFilteredProducts())
        }
    };
    
    // componente
    return (
        <div className="filtersContainer"  >
                <select id='type' className="selectAttribute" name="type" defaultValue="categoria" onChange={(e) => onChange(e)}>
                        <option  value="">
                            categorias
                        </option>
                    {types.length && types.map((t,i) => (
                        <option key={i} value={t}>  
                            {t}
                        </option>
                    ))}
                </select>           
                <select id='sortPrice' className="selectAttribute" name="sort" onChange={(e) => onChange(e)}>
                    <option  value= ''>
                        precios
                    </option>
                    <option  value="min">
                        Min
                    </option>
                    <option  value="max">
                        Max
                    </option>
                </select>
        </div>
    )
}