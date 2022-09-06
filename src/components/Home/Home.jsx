import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllProducts, getTypes } from '../../redux/Actions/Actions';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import SearchBar from '../SearchBar/SearchBar';
import Slideshow from '../Slideshow/Slideshow';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { types, loading, error } = useSelector((state) => state);
  const controlCart = JSON.parse(localStorage.getItem('cartSelectProducts'));

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getTypes());

    if (!controlCart)
      localStorage.setItem('cartSelectProducts', JSON.stringify([]));
  }, [dispatch]);

  const handleOnClick = (t) => {
    history.push(`/productos?tipo=${t}`);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="homeContainer">
      <SearchBar />
      <div className="categories">
        {types &&
          types.map((t, i) => (
            <button
              className="categoryButton"
              key={i}
              onClick={() => handleOnClick(t)}
            >
              {t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()}
            </button>
          ))}
      </div>
      <Slideshow />
    </div>
  );
}
