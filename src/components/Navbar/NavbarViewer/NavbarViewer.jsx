import React from "react";
import { Link, NavLink } from "react-router-dom";
import img from "../../../img/logo.jpg"
import "../Navbar.css";

export default function NavbarViewer() {
  return (
    <nav className="navbar">
        <NavLink to={"/"} className="nav-logo">
          <img src={img} alt="onlypan" />
          <h2>Onlypan</h2>
        </NavLink>
        <div className="nav-buttons">
          <NavLink className="nav-btn" to={"/producto"}>
            producto
          </NavLink>
          <NavLink className="nav-btn" to={"/carrito"}>
            carrito
          </NavLink>
          <NavLink className="nav-btn" to={"/contacto"}>
            contacto
          </NavLink>
          <NavLink className="nav-btn" to={"/favoritos"}>
            favorito
          </NavLink>
      </div>
      <div className="nav-login">
          <NavLink className="nav-login-btn" to={"/ingreso"}><i class="fa-solid fa-user"></i></NavLink>
      </div>
    </nav>
  );
}
