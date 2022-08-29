import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  getAllProducts,
  getTypes,
} from '../../redux/Actions/Actions';
import './CreateProduct.css';
import { Formik } from 'formik';
import Swal from 'sweetalert2';

export default function CreateProduct() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getTypes());
  }, [dispatch]);
  const { products, types } = useSelector((state) => state);

  return (
    <Formik
      initialValues={{
        name: '',
        price: 0,
        image: '',
        description: '',
        type: '',
      }}
      validate={(values) => {
        const expresiones = {
          numeros: / *([.0-9])*\d/g,
          caracteresEs: /[\[\\\^\$\.\|\?\*\+\(\)\{\}]/g,
          url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
          instru: /^[a-zA-Z0-9_-\s]{4,200}$/,
          numPosi: /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/gm,
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

        if (
          products.filter(
            (p) => p.name.toLowerCase() === values.name.toLowerCase()
          ).length > 0
        )
          errors.name = 'Ya existe un producto con ese nombre';

        if (!expresiones.url.test(values.image))
          errors.image = 'Ingrese un link valido para la imagen';

        if (values.price <= 0) errors.price = 'El precio debe ser mayor a 0';
        if (!values.description) errors.description = 'Completa este campo';
        if (expresiones.caracteresEs.test(values.description))
          errors.description = 'No puede contener caracteres especiales';
        if (values.description.length < 5 || values.description.length >= 200)
          errors.description =
            'La descripción debe tener entre 5 y 200 caracteres';
        if (!values.type) errors.type = 'Debe seleccionar una categoría';
        if (!types.includes(values.type))
          errors.type = 'Seleccione una categoría existente.';
        return errors;
      }}
      onSubmit={(values, actions) => {
        dispatch(createProduct(values));
        Swal.fire({
          icon: 'success',
          title: 'Producto creado',
          showConfirmButton: false,
          timer: 1500,
        });
        actions.resetForm({
          values: {
            name: '',
            price: 0,
            image: '',
            description: '',
            type: '',
          },
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
        <div className="create">
          <div className="create-container">
            <form method="post" onSubmit={handleSubmit}>
              <h3 className="create-tittle">Crear Producto</h3>
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
                  Crear producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
