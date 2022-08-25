import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"

export default function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <form action="" method="post">
          <h3 className="login-tittle">Iniciar Sesion</h3>
          <label className='login-detail'>
            <span>email:</span>
            <input
              name="email"
              type="email"
              placeholder="juan.perez@ejemplo.com"
              required
            />
          </label>

          <label className='login-detail'>
            <span>contraseña</span>
            <input
              name="password"
              type="password"
              placeholder="*********"
              required
            />
          </label>
          <div className='login-button'>
              <button className='btn'>Ingresar</button>
          </div>
        </form>
        <p className='login-footer'>si no tenes cuenta, registrate <Link className='login-footer-link' to={'/registro'}>aqui</Link> </p>
      </div>
    </div>
  )
}
