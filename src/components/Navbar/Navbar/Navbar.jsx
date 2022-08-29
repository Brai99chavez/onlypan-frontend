import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import img from '../../../img/logo.jpg';
import '../Navbar.css';

export default function NavbarViewer() {
  const [loggedUser, setLoggedUser] = useState(
    localStorage.getItem('user') && localStorage.getItem('user') !== '{}'
  );
  const controlUser = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!controlUser) {
      localStorage.setItem('user', JSON.stringify({}));
    }
    setLoggedUser(localStorage.getItem('user') !== '{}');
  }, [controlUser]);
  return (
    <nav className="navbar">
      <NavLink to={'/'} className="nav-logo">
        <img src={img} alt="onlypan" />
        <h2>OnlyPan</h2>
      </NavLink>
      <div className="nav-buttons">
        <NavLink className="nav-btn" to={'/productos'}>
          productos
        </NavLink>
        <NavLink className="nav-btn" to={'/contacto'}>
          contacto
        </NavLink>
        {/* <NavLink className="nav-btn" to={'/favoritos'}>
          favoritos
        </NavLink> */}
        <NavLink className="nav-btn" to={'/crear-producto'}>
          crear producto
        </NavLink>
      </div>
      <div className="nav-login">
        <NavLink className="nav-btn" to={'/carrito'}>
          <i className="fa-solid fa-basket-shopping" />
        </NavLink>
        {loggedUser ? (
          <NavLink className="nav-login-btn" to={'/user'}>
            <i className="fa-solid fa-user" />{' '}
            {controlUser.user && controlUser.user.name}
          </NavLink>
        ) : (
          <NavLink className="nav-login-btn" to={'/ingreso'}>
            <i className="fa-solid fa-user" /> Ingresar
          </NavLink>
        )}
      </div>
    </nav>
  );
}
