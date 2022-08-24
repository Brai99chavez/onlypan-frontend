import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/Actions/Actions';
import "./Products.css"
//components
import ProductCard from "./ProductCard/ProductCard"
import SearchBar from '../SearchBar/SearchBar';

export default function Products() {
  // redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  const { products , filteredProducts} = useSelector((state) => state);
  let vista = filteredProducts.length ? filteredProducts : products;
// funciones
  return (
    <React.Fragment>
      <SearchBar/>
      <div className="ProductCards">
      {vista && vista.map(p => (
        <ProductCard
        key={p.id}
        id={p.id}
        name={p.name}
        price={p.price}
        image={p.image}
        description={p.description}
        type={p.type}
      />
      ))
        }
    </div>
    </React.Fragment>
  )

}
