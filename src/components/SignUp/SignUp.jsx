import React from 'react';
import './SignUp.css';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/Actions/Actions';

function SignUp() {
  const dispatch = useDispatch();
  return (
    <div className="signup">
      <div className="signup-container">
        <Formik
          initialValues={{
            name: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) errors.name = 'Completa este campo';
            else if (!/^[a-z ,.'-]+$/i.test(values.name))
              errors.name = 'El nombre debe contener solo letras';

            if (!values.lastname) errors.lastname = 'Completa este campo';
            else if (!/^[a-z ,.'-]+$/i.test(values.lastname))
              errors.lastname = 'El apellido debe contener solo letras';

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
          onSubmit={(values) => {
            dispatch(signUp(values))
            console.log('exito');
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
                      name="lastname"
                      type="lastname"
                      placeholder="Perez"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  <div className="signupErrorContainer">
                    {errors.lastname && touched.lastname && (
                      <div className="error">{errors.lastname}</div>
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
                      type="confirmPassword"
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