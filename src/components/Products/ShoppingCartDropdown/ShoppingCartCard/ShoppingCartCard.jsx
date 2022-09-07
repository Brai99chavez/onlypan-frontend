import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductInCart } from '../../../../redux/Actions/Actions';
import './ShoppingCartCard.css';

export default function ShoppingCartCard({
  user,
  loggedUser,
  id,
  name,
  setUserCart,
  quantitySelectedCartSh,
}) {
  const dispatch = useDispatch();

  const handlerDeleteProduct = (name) => {
    if (!loggedUser) {
      const copyStateProductCart = JSON.parse(
        localStorage.getItem('cartSelectProducts')
      );
      const cleared = copyStateProductCart.filter((e) => e.name !== name);
      localStorage.setItem('cartSelectProducts', JSON.stringify(cleared));
      setUserCart(cleared);
    } else {
      dispatch(deleteProductInCart(user.user.id, id, user.token));
    }
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
