import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import img from '../../../img/logo.jpg';
import { useAuth0 } from '@auth0/auth0-react';
import '../Navbar.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createUserCart, getUserCart } from '../../../redux/Actions/Actions';

export default function NavbarViewer() {
  const dispatch = useDispatch();
  const [isUserLogged, setIsUserLogged] = useState(
    localStorage.getItem('user') && localStorage.getItem('user') !== '{}'
  );

  const selfRol =
    JSON.parse(localStorage.getItem('user')) &&
    JSON.parse(localStorage.getItem('user')).user &&
    JSON.parse(localStorage.getItem('user')).user.rol;

  const controlUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!controlUser) {
      localStorage.setItem('user', JSON.stringify({}));
    }
    setIsUserLogged(localStorage.getItem('user') !== '{}');
  }, [controlUser, isUserLogged]);

  useEffect(() => {
    if (isUserLogged)
      dispatch(getUserCart(JSON.parse(localStorage.getItem('user')).user.id));
  }, [dispatch]);

  const { isAuthenticated, user } = useAuth0();
  if (isAuthenticated && !isUserLogged) {
    const { given_name, family_name, email, picture } = user;
    axios
      .post('/user/google', {
        name: given_name,
        lastName: family_name,
        email: email,
        image: picture,
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        const copyCart = JSON.parse(localStorage.getItem('cartSelectProducts'));
        dispatch(createUserCart(response.data.user.id, copyCart));
      })
      .then(() =>
        localStorage.setItem('cartSelectProducts', JSON.stringify([]))
      )
      .then(() => setIsUserLogged(true));
  }
  return (
    <nav className="navbar">
      <NavLink to={'/'} className="nav-logo">
        <img src={img} alt="onlypan" />
        <h2>OnlyPan</h2>
      </NavLink>
      <div className="nav-buttons">
        <NavLink className="nav-btn" to={'/productos'}>
          Productos
        </NavLink>
        {selfRol !== 'admin' ? (
          <NavLink className="nav-btn" to={'/contacto'}>
            Contacto
          </NavLink>
        ) : null}
        {/* <NavLink className="nav-btn" to={'/favoritos'}>
          favoritos
        </NavLink> */}
        {selfRol === 'admin' ? (
          <>
            <NavLink className="nav-btn" to={'/crear-producto'}>
              Crear producto
            </NavLink>
            <NavLink className="nav-btn" to={'/lista-de-usuarios'}>
              Tabla usuarios
            </NavLink>
            <NavLink className="nav-btn" to={'/lista-de-productos'}>
              Tabla Productos
            </NavLink>
          </>
        ) : null}
        <NavLink className="nav-btn" to={'/maps'}>
          estado del pedido
        </NavLink>
      </div>
      <div className="nav-login">
        <NavLink className="nav-btn" to={'/carrito'}>
          <i className="fa-solid fa-basket-shopping" />
        </NavLink>
        {isUserLogged ? (
          <NavLink className="nav-login-btn" to={'/usuario'}>
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
