import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartCard from './ShoppingCartCard/ShoppingCartCard';
import './ShoppingCartDropdown.css';

function ShoppingCartDropdown({ setAddedToCart, cart }) {
  let loggedUser =
    localStorage.getItem('user') !== '{}'
      ? JSON.parse(localStorage.getItem('user'))
      : false;

  const user = JSON.parse(localStorage.getItem('user'));

  const [userCart, setUserCart] = useState(() => {
    if (!loggedUser) {
      return JSON.parse(localStorage.getItem('cartSelectProducts'));
    }
  });

  const sumTotal = () => {
    if (!loggedUser) {
      return userCart.reduce((a, b) => {
        return a + b.price * b.quantitySelectedCartSh;
      }, 0);
    }
  };

  return (
    <div className="dropdownBackground">
      <div className="containerDropdown">
        <button onClick={() => setAddedToCart(false)} className="closeButton">
          X
        </button>
        <div className="content">
          <h1 className="cartTitle">Mi Carrito</h1>

          {loggedUser
            ? cart.id &&
              cart.products.map((e) => (
                <ShoppingCartCard
                  user={user}
                  loggedUser={loggedUser}
                  setUserCart={setUserCart}
                  key={e.id}
                  id={e.id}
                  isAvailable={e.isAvailable}
                  name={e.name}
                  price={e.price}
                  type={e.type}
                  quantitySelectedCartSh={e.productCart.quantity}
                />
              ))
            : userCart.map((e) => (
                <ShoppingCartCard
                  user={user}
                  loggedUser={loggedUser}
                  setUserCart={setUserCart}
                  key={e.id}
                  id={e.id}
                  isAvailable={e.isAvailable}
                  name={e.name}
                  price={e.price}
                  type={e.type}
                  quantitySelectedCartSh={e.quantitySelectedCartSh}
                />
              ))}

          <div className="cartTotal">
            Total: $
            {loggedUser
              ? !Object.keys(cart).length
                ? 0
                : cart.products.reduce((a, b) => {
                    return a + b.price * b.productCart.quantity;
                  }, 0)
              : sumTotal()}
          </div>
          <div className="cartButtonsContainer">
            <Link className="cartButtons" to="/carrito">
              <div>Finalizar compra</div>
            </Link>

            <button
              className="cartButtons"
              onClick={() => setAddedToCart(false)}
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartDropdown;
