import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartCard from './ShoppingCartCard/ShoppingCartCard';
import './ShoppingCartDropdown.css';

function ShoppingCartDropdown({ setAddedToCart }) {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem('cartSelectProducts'))
  );

  const sumTotal = () => {
    return state.reduce((a, b) => {
      return a + b.price * b.quantitySelectedCartSh;
    }, 0);
  };

  return (
    <div className="dropdownBackground">
      <div className="containerDropdown">
        <button onClick={() => setAddedToCart(false)} className="closeButton">
          X
        </button>
        <div className="content">
          <h1 className="cartTitle">Mi Carrito</h1>

          {state.map((e) => {
            return (
              <ShoppingCartCard
                setState={setState}
                key={e.id}
                id={e.id}
                isAvailable={e.isAvailable}
                name={e.name}
                price={e.price}
                type={e.type}
                quantitySelectedCartSh={e.quantitySelectedCartSh}
              />
            );
          })}

          <div className="cartTotal">Total: ${sumTotal()}</div>
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
