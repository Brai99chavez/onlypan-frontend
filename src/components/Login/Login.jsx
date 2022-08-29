import { Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Login() {
  const history = useHistory();
  if (localStorage.getItem('user') !== '{}') history.push('/');

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { loading } = useSelector((state) => state);

  if (loading) return <Loading />;
  return (
    <div className="login">
      <div className="login-container">
        <button onClick={() => loginWithRedirect()}>
          Continuar con Google
        </button>
        <button onClick={() => logout()}>salir</button>

        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Completa este campo';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Email inválido';
            }
            if (!values.password) errors.password = 'Completa este campo';
            return errors;
          }}
          onSubmit={async (values) => {
            await axios
              .post('/user/signIn', values)
              .then((user) => {
                localStorage.setItem('user', JSON.stringify(user.data));
              })
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  title: `Bienvenido/a de vuelta, ${values.email}!`,
                  showConfirmButton: false,
                  timer: 2000,
                });
              })
              .then(() => history.push('/'))
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo iniciar sesión.',
                  text: error.response.data.msg,
                });
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form action="" method="post" onSubmit={handleSubmit}>
              <h3 className="login-tittle">Iniciar Sesion</h3>
              <label className="login-detail">
                <span>Email:</span>
                <input
                  name="email"
                  type="email"
                  placeholder="juan.perez@ejemplo.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <div className="errorContainer">
                {errors.email && touched.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>
              <label className="login-detail">
                <span>Contraseña</span>
                <input
                  name="password"
                  type="password"
                  placeholder="*********"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <div className="errorContainer">
                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>

              <div className="login-button">
                <button type="submit" className="btn">
                  Ingresar
                </button>
              </div>
            </form>
          )}
        </Formik>
        <p className="login-footer">
          Si no tenés cuenta, registrate{' '}
          <Link className="login-footer-link" to={'/registro'}>
            aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
