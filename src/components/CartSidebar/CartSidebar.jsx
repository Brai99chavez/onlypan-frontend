import React from 'react';
import './CartSideBar.css';

function CartSidebar({ setAddedToCart }) {
  return (
    <div className="sidebarContainer">
      <button onClick={() => setAddedToCart(false)}>X</button>
      <div>Agregaste algo al carrito! :)</div>
    </div>
  );
}

export default CartSidebar;
