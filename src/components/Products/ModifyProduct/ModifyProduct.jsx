import React, { useEffect } from 'react'
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { clearDetailProduct, getProductForId, getTypes, ModifyProductById } from '../../../redux/Actions/Actions';
import "./ModifyProduct.css"
import { faSortAlphaDownAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ModifyProduct({ match }) {
  const { id } = match.params
  const token = JSON.parse(localStorage.getItem("user")).token
  // redux
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getProductForId(id));
    dispatch(getTypes());
    return dispatch(clearDetailProduct())
  }, [dispatch, id]);

  const { detailProduct, types } = useSelector((state) => state);
  // componente

  return (
    <div className=" w-full mt-40">
      {detailProduct.name &&
        <Formik
          initialValues={{
            name: detailProduct.name,
            price: detailProduct.price,
            description: detailProduct.description,
            type: detailProduct.type,
            image: detailProduct.image,
            quantity: detailProduct.quantity,
          }}
          validate={(values) => {
            const expresiones = {
              numeros: / *([.0-9])*\d/g,
              caracteresEs: /[\[\\\^\$\.\|\?\*\+\(\)\{\}]/g, //eslint-disable-line
              url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, //eslint-disable-line
              instru: /^[a-zA-Z0-9_-\s]{4,200}$/, //eslint-disable-line
              numPosi: /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/gm, //eslint-disable-line
            };
            const errors = {};
            if (!values.name) errors.name = 'Completa este campo';
            if (values.name.length <= 4 || values.name.length >= 50)
              errors.name = 'El nombre debe tener entre 5 y 50 caracteres';

            if (
              expresiones.caracteresEs.test(values.name) ||
              expresiones.numeros.test(values.name)
            )
              errors.name =
                'El nombre no puede tener caracteres especiales ni números';

            if (!expresiones.url.test(values.image))
              errors.image = 'Ingrese un link valido para la imagen';

            if (values.price <= 0) errors.price = 'El precio debe ser mayor a 0';
            if (!values.description) errors.description = 'Completa este campo';
            if (values.description.length < 5 || values.description.length >= 1000)
              errors.description =
                'La descripción debe tener entre 5 y 600 caracteres';
            if (!values.type) errors.type = 'Debe seleccionar una categoría';
            if (!types.includes(values.type))
              errors.type = 'Seleccione una categoría existente.';
            return errors;
          }}
          onSubmit={(values, actions) => {
            
            dispatch(ModifyProductById(detailProduct.id, token, values));
            history.push('/lista-de-productos')
            Swal.fire({
              icon: 'success',
              title: 'Producto Modificado',
              showConfirmButton: false,
              timer: 1500,
            });
          }}
        >
          {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
            <div className="create">
              <div className="create-container">
                <form method="post" onSubmit={handleSubmit}>
                  <h3 className="create-tittle">Modificar {detailProduct.name}</h3>
                  <div className="form-container">
                    <div className="createCol">
                      <label className="create-detail">
                        <span>Nombre:</span>
                        <input
                          name="name"
                          value={values.name}
                          type="text"
                          placeholder="Pan"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </label>
                      <div className="createErrorContainer">
                        {errors.name && touched.name && (
                          <div className="error">{errors.name}</div>
                        )}
                      </div>
                      <label className="create-detail">
                        <span>Precio:</span>
                        <input
                          name="price"
                          value={values.price}
                          type="number"
                          placeholder="20"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="createErrorContainer">
                          {errors.price && touched.price && (
                            <div className="createError">{errors.price}</div>
                          )}
                        </div>
                      </label>
                      <label className="create-detail">
                        <span>Imagen:</span>
                        <input
                          name="image"
                          value={values.image}
                          type="text"
                          placeholder="Link..."
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </label>
                      <div className="createErrorContainer">
                        {errors.image && touched.image && (
                          <div className="error">{errors.image}</div>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="createCol">
                      <label className="create-detail">
                        <span>Stock Agregado:</span>
                        <input
                          name="quantity"
                          type="number"
                          placeholder={values.quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </label>
                      <label className="create-detail">
                        <span>Descripción:</span>
                        <br />
                        <textarea
                          rows="5"
                          name="description"
                          value={values.description}
                          type="text"
                          placeholder="Harina, agua, sal, levadura..."
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="createErrorContainer">
                          {errors.description && touched.description && (
                            <div className="error">{errors.description}</div>
                          )}
                        </div>
                      </label>
                      <label className="create-detail">
                        <span>Categoría:</span>
                        <select
                          value={values.type}
                          name="type"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <option disabled value="">
                            Seleccione una categoría
                          </option>
                          {types.length &&
                            types.map((t, i) => (
                              <option value={t} key={i}>
                                {t.charAt(0).toUpperCase() +
                                  t.substring(1).toLowerCase()}
                              </option>
                            ))}
                        </select>
                      </label>
                      <div className="createErrorContainer">
                        {errors.type && touched.type && (
                          <div className="error">{errors.type}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="create-button">
                    <button type="submit" className="btn">
                      Modificar producto
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Formik>}
    </div>
  )
}
