import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/Actions/Actions';
import SearchBar from '../SearchBar/SearchBar';
import Slideshow from '../Slideshow/Slideshow';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  return (
    <div className="homeContainer">
      <SearchBar />
      <button>Panes</button>
      <button>Facturas</button>
      <button>Galletas</button>
      <button>Repostería</button>
      <button>Sandwiches</button>
      <button>Café</button>
      <button>Bebidas</button>
      <Slideshow />
    </div>
  );
}
