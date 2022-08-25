import React from 'react';
import './ShoppingCartCard.css';

export default function ShoppingCartCard({
  name,
  setState,
  quantitySelectedCartSh,
}) {
  const handlerDeleteProduct = (name) => {
    const copyStateProductCart = JSON.parse(
      localStorage.getItem('cartSelectProducts')
    );
    const cleared = copyStateProductCart.filter((e) => e.name !== name);
    localStorage.setItem('cartSelectProducts', JSON.stringify(cleared));
    setState(cleared);
  };
  return (
    <div className="productCart">
      <h1 className="shoppingCardTitle">{name}: </h1>
      <p className="shoppingCardQuantity">Cantidad: {quantitySelectedCartSh}</p>
      <button
        onClick={() => handlerDeleteProduct(name)}
        className="trashButton"
      >
        <i className="fa-solid fa-trash-can " style={{ color: 'Tomato' }} />
      </button>
    </div>
  );
}
