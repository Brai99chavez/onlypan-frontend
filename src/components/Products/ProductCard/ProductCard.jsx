import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import {
  addFavorite,
  changeAmountInCart,
  deleteFavorite,
} from '../../../redux/Actions/Actions';
import './ProductCard.css';

export default function ProductCard({
  userFavorites,
  cart,
  user,
  loggedUser,
  name,
  price,
  image,
  type,
  id,
  setAddedToCart,
  quantity,
}) {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

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
      if (cart && cart.products && cart.products.length) {
        const indexInCart = cart.products.findIndex((p) => p.name === name);
        if (indexInCart !== -1) {
          amountInCart = cart.products[indexInCart].productCart.quantity;
        }
      } else {
        amountInCart = 0;
      }
    }
    return amountInCart;
  };


  const [amountToAdd, setAmountToAdd] = useState(getAmountInCart());

  const [favoriteHeart, setFavoriteHeart] = useState(
    userFavorites.length && userFavorites.filter((x) => x.name === name).length
  );


  const handleSumButon = () => {
    if(quantity > amountToAdd){
    setAmountToAdd(amountToAdd + 1);
    }else{
      Swal.fire({
        icon: 'error',
        text: 'No puedes agregar mas productos al carrito',
      });
    }
  };

  const handleResButon = () => {
    amountToAdd <= 1 ? setAmountToAdd(0) : setAmountToAdd(amountToAdd - 1);
  };
  const handleAddProductToCart = (nameCard, quantity) => {
    if (quantity > 0) {
      const productAddShoppingCart = products.filter(
        (e) => e.name === nameCard
      );
      if (!loggedUser) {
        const duplicate = copyLocalStorageCart.filter(
          (e) => e.name === nameCard
        );

        if (!duplicate.length) {
          productAddShoppingCart[0].quantitySelectedCartSh = quantity;
          localStorage.setItem(
            'cartSelectProducts',
            JSON.stringify(copyLocalStorageCart.concat(productAddShoppingCart))
          );
        } else {
          const prodIndex = copyLocalStorageCart.findIndex(
            (p) => p.name === nameCard
          );
          copyLocalStorageCart[prodIndex].quantitySelectedCartSh = quantity;
          localStorage.setItem(
            'cartSelectProducts',
            JSON.stringify(copyLocalStorageCart)
          );
        }
      } else {
        const totalPrice = price * quantity;

        dispatch(
          changeAmountInCart(
            user.user.id,
            {
              id: productAddShoppingCart[0].id,
              quantity,
              totalPrice,
            },
            user.token
          )
        );
      }
      setAddedToCart(true);
    } else {
      return Swal.fire({
        icon: 'error',
        text: 'Debe selecccionar por lo menos uno',
      });
    }
  };

  const handleClickOnHeart = (nameCard) => {
    if (!loggedUser) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe registrarse para agregar a favoritos',
        confirmButtonText: 'Iniciar sesi??n',
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) history.push('/ingreso');
      });
    } else {
      setFavoriteHeart(!favoriteHeart);
      if (!favoriteHeart) {
        dispatch(addFavorite({ userId: user.user.id, productId: id }));
      } else {
        dispatch(deleteFavorite({ userId: user.user.id, id }));
      }
    }
  };

  return (
    <div className="ProductCard">
      <div className="ProductCardImage">
        <img src={image} alt="Sunset in the mountains" />
      </div>
      <div className="ProductCardDetails">
        <p className="ProductCardTittle">{name}</p>
        <button className="favorite">
          <i
            onClick={() => handleClickOnHeart(name)}
            className={`fa-heart butonAddFav ${
              favoriteHeart ? 'fa-solid' : 'fa-regular'
            }`}
          />

        </button>


        <div className="ProductCardDescription">
          <p>${price}</p>
          <span className="ProductCardtype">Categor??a: {type}</span>
          <br />
          <span className="ProductCardtype">stock: {quantity}</span>
        </div>
      </div>
      <div className="ProductCardButtons">
        <div className="ProductCardQuantity">
          <button
            onClick={handleResButon}
            className="ProductCardQuantityButton"
          >
            -
          </button>
          <p>{amountToAdd}</p>
          <button
            onClick={handleSumButon}
            className="ProductCardQuantityButton"
          >
            +
          </button>
        </div>
        <button
          onClick={() => handleAddProductToCart(name, amountToAdd)}
          className="ProductCardButton"
        >
          <i className="fa-solid fa-cart-plus" />
        </button>
      </div>
      <div className="ProductCardSeeMore">
        <Link to={`/detail/${id}`}>
          <button className="ProductCardSeeMoreButton">Ver m??s</button>
        </Link>
      </div>
    </div>
  );
}
