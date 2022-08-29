import React from 'react';
import './SignUp.css';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignUp() {
  const { loading } = useSelector((state) => state);

  const history = useHistory();
  if (localStorage.getItem('user') !== '{}') history.push('/');

  if (loading) return <Loading />;
  return (
    <div className="signup">
      <div className="signup-container">
        <Formik
          initialValues={{
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) errors.name = 'Completa este campo';
            else if (!/^[a-z ,.'-]+$/i.test(values.name))
              errors.name = 'El nombre debe contener solo letras';

            if (!values.lastName) errors.lastName = 'Completa este campo';
            else if (!/^[a-z ,.'-]+$/i.test(values.lastName))
              errors.lastName = 'El apellido debe contener solo letras';

            if (!values.email) errors.email = 'Completa este campo';
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            )
              errors.email = 'Email inválido';

            if (!values.password) errors.password = 'Completa este campo';
            else if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
                values.password
              )
            )
              errors.password =
                'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un número';
            if (!values.confirmPassword)
              errors.confirmPassword = 'Completa este campo';
            else if (values.confirmPassword !== values.password)
              errors.confirmPassword = 'Las contraseñas no coinciden';
            return errors;
          }}
          onSubmit={async (values) => {
            await axios
              .post('/user/signUp', values)
              .then((user) => {
                localStorage.setItem('user', JSON.stringify(user.data));
              })
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  title: `Bienvenido/a ${values.name}!`,
                  text: `Usuario ${values.email} creado exitosamente`,
                  showConfirmButton: false,
                  timer: 2000,
                });
              })
              .then(() => history.push('/'))
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo crear el usuario',
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
              <div className="formContainer">
                <div className="col">
                  <h3 className="signup-tittle">Información personal</h3>
                  <label className="signup-detail">
                    <span>Nombre</span>
                    <input
                      name="name"
                      type="name"
                      placeholder="Juan"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  <div className="signupErrorContainer">
                    {errors.name && touched.name && (
                      <div className="error">{errors.name}</div>
                    )}
                  </div>
                  <label className="signup-detail">
                    <span>Apellido:</span>
                    <input
                      name="lastName"
                      type="lastName"
                      placeholder="Perez"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  <div className="signupErrorContainer">
                    {errors.lastName && touched.lastName && (
                      <div className="error">{errors.lastName}</div>
                    )}
                  </div>
                </div>
                <div className="col2">
                  <h3 className="signup-tittle">
                    Información de inicio de sesión
                  </h3>
                  <label className="signup-detail">
                    <span>Email</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="juan.perez@ejemplo.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  <div className="signupErrorContainer">
                    {errors.email && touched.email && (
                      <div className="error">{errors.email}</div>
                    )}
                  </div>
                  <label className="signup-detail">
                    <span>Contraseña:</span>
                    <input
                      name="password"
                      type="password"
                      placeholder="*********"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  <div className="signupErrorContainer">
                    {errors.password && touched.password && (
                      <div className="error">{errors.password}</div>
                    )}
                  </div>
                  <label className="signup-detail">
                    <span>Confirmar contraseña:</span>
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="*********"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  <div className="signupErrorContainer">
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="error">{errors.confirmPassword}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="signup-button">
                <button type="submit" className="btn">
                  Registrarse
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
