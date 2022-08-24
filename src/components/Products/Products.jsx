import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/Actions/Actions';
import "./Products.css"
//components
import ProductCard from "./ProductCard/ProductCard"

export default function Products() {
  // redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  const { Products } = useSelector((state) => state);

// funciones
  return (
    <div className="ProductCards">
      {Products && Products.map(p => (
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
  )

}
