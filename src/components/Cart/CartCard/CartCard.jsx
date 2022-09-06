import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeAmountInCart,
  deleteProductInCart,
} from '../../../redux/Actions/Actions';

function CartCard({
  user,
  cart,
  loggedUser,
  id,
  image,
  name,
  price,
  setUserCart,
  sumTotal,
  setTotal,
}) {
  const dispatch = useDispatch();

  const copyLocalStorageCart = JSON.parse(
    localStorage.getItem('cartSelectProducts')
  );
  const getAmountInCart = () => {
    let amountInCart = 0;
    if (!loggedUser) {
      const indexInCart = copyLocalStorageCart.findIndex(
        (p) => p.name === name
      );
      if (indexInCart !== -1) {
        amountInCart = copyLocalStorageCart[indexInCart].quantitySelectedCartSh;
      }
    } else {
      const indexInCart = cart.products.findIndex((p) => p.name === name);
      if (indexInCart !== -1) {
        amountInCart = cart.products[indexInCart].productCart.quantity;
      }
    }
    return amountInCart;
  };
  const [amountInCart, setAmountInCart] = useState(getAmountInCart());

  const handlerDeleteProduct = (name) => {
    if (!loggedUser) {
      const cleared = copyLocalStorageCart.filter((e) => e.name !== name);
      localStorage.setItem('cartSelectProducts', JSON.stringify(cleared));
      setUserCart(cleared);
      setTotal(sumTotal());
    } else {
      dispatch(deleteProductInCart(user.user.id, id, user.token));
    }
  };

  const handleChangeAmount = (op) => {
    let quantity = amountInCart;
    op === 'suma' ? (quantity += 1) : (quantity -= 1);

    if (quantity > 0) {
      if (!loggedUser) {
        const prodIndex = copyLocalStorageCart.findIndex(
          (p) => p.name === name
        );
        copyLocalStorageCart[prodIndex].quantitySelectedCartSh = quantity;
        localStorage.setItem(
          'cartSelectProducts',
          JSON.stringify(copyLocalStorageCart)
        );
        setAmountInCart(getAmountInCart());
        setTotal(sumTotal());
      } else {
        const totalPrice = price * quantity;
        dispatch(
          changeAmountInCart(user.user.id, { id, quantity, totalPrice }, user.token)
        );
        setAmountInCart(() => quantity);
      }
    }
  };
  return (
    <div className="flex justify-between items-center mt-6 pt-6">
      <div className="flex  items-center">
        <img src={image} width="80" alt="product" className="rounded-xl" />
        <div className="flex flex-col ml-3">
          <span className="md:text-md font-medium">{name}</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="pr-8 flex ">
          <button
            onClick={() => handleChangeAmount('rest')}
            className="font-semibold cursor-pointer"
          >
            -
          </button>
            <p className="mx-4">{amountInCart}</p>
          <button
            onClick={() => handleChangeAmount('suma')}
            className="font-semibold cursor-pointer"
          >
            +
          </button>
        </div>
        <div className="pr-8 ">
          <span className="text-xs font-medium">${price}</span>
        </div>
        <div>
          <i
            onClick={() => handlerDeleteProduct(name)}
            className="fa-solid fa-trash-can text-xs font-medium cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default CartCard;
