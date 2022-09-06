import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ProductCard.css';

export default function ProductCard({
  name,
  price,
  image,
  type,
  id,
  setAddedToCart,
  quantity
}) {
  const { products } = useSelector((state) => state);

  const copyLocalStorage = JSON.parse(
    localStorage.getItem('cartSelectProducts')
  );

  const getAmountInCart = () => {
    const indexInCart = copyLocalStorage.findIndex((p) => p.name === name);
    let amountInCart = 0;
    if (indexInCart !== -1) {
      amountInCart = copyLocalStorage[indexInCart].quantitySelectedCartSh;
    }
    return amountInCart;
  };

  const [amountToAdd, setAmountToAdd] = useState(getAmountInCart());
  // const [favoriteHeart, setFavoriteHeart] = useState(false);

  const handleSumButon = () => {
    setAmountToAdd(amountToAdd + 1);
  };

  const handleResButon = () => {
    amountToAdd <= 1 ? setAmountToAdd(0) : setAmountToAdd(amountToAdd - 1);
  };

  const handleAddProductToCart = (nameCard, quantity) => {
    const productAddShoppingCart = products.filter((e) => e.name === nameCard);
    const duplicate = copyLocalStorage.filter((e) => e.name === nameCard);
    if (quantity > 0) {
      if (!duplicate.length) {
        productAddShoppingCart[0].quantitySelectedCartSh = quantity;
        localStorage.setItem(
          'cartSelectProducts',
          JSON.stringify(copyLocalStorage.concat(productAddShoppingCart))
        );
      } else {
        const prodIndex = copyLocalStorage.findIndex(
          (p) => p.name === nameCard
        );
        copyLocalStorage[prodIndex].quantitySelectedCartSh = quantity;
        localStorage.setItem(
          'cartSelectProducts',
          JSON.stringify(copyLocalStorage)
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

  // const handleAddFavorites = (nameCard) => {
  //   setFavoriteHeart(!favoriteHeart);
  //   const copyLocalStorage = JSON.parse(
  //     localStorage.getItem('favoritesSelected')
  //   );
  //   const duplicate = copyLocalStorage.filter((e) => e.name === nameCard);
  //   if (!duplicate.length) {
  //     const productAddFavorites = products.filter((e) => e.name === nameCard);

  //     localStorage.setItem(
  //       'favoritesSelected',
  //       JSON.stringify(copyLocalStorage.concat(productAddFavorites))
  //     );
  //   } else {
  //     alert('ya tienes este producto en tus favoritos');
  //   }
  // };
  return (
    <div className="ProductCard">
      <div className="ProductCardImage">
        <img src={image} alt="Sunset in the mountains" />
      </div>
      <div className="ProductCardDetails">
        <p className="ProductCardTittle">{name}</p>
        {/* <button className="favorite">
          <i
            onClick={() => handleAddFavorites(name)}
            className={`fa-heart butonAddFav ${
              favoriteHeart ? 'fa-solid' : 'fa-regular'
            }`}
          />
        </button> */}

        <div className="ProductCardDescription">
          <p>${price}</p>
          <span className="ProductCardtype">Categoría: {type}</span>
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
          <button className="ProductCardSeeMoreButton">Ver más</button>
        </Link>
      </div>
    </div>
  );
}
