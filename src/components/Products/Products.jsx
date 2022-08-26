import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByType, getAllProducts } from '../../redux/Actions/Actions';
import swal from 'sweetalert2';
import './Products.css';
//components
import ProductCard from './ProductCard/ProductCard';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Pagination from '../Products/Pagination/Pagination';
import ShoppingCartDropdown from './ShoppingCartDropdown/ShoppingCartDropdown';
import { useLocation } from 'react-router-dom';

export default function Products() {
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const tipo = query.get('tipo');

  // redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    if (tipo) dispatch(filterByType(tipo));
  }, [dispatch]);
  const { products, filteredProducts, loading, error } = useSelector(
    (state) => state
  );
  let vista = filteredProducts.length ? filteredProducts : products;

  const itemsToRender = () => {
    const start = currentPage * 12 - 12;
    let end = start + 12;
    if (start + 12 > vista.length) end = vista.length;
    return vista.slice(start, end);
  };
  const pageNumbers = () => {
    let list = [];
    let done = Math.ceil(vista.length / 12);
    for (let i = 0; i < done; i++) {
      list.push(i + 1);
    }
    return list;
  };
  // funciones
  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="productsContainer">
      {addedToCart ? (
        <ShoppingCartDropdown setAddedToCart={setAddedToCart} />
      ) : (
        <></>
      )}
      <SearchBar setCurrentPage={setCurrentPage} />
      <div className="ProductCards">
        {vista &&
          itemsToRender().map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              image={p.image}
              description={p.description}
              type={p.type}
              setAddedToCart={setAddedToCart}
            />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsToRender={itemsToRender()}
        pageNumbers={pageNumbers()}
      />
    </div>
  );
}
