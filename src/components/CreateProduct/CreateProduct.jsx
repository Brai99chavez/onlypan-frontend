import React, { useEffect, useState } from 'react';
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
  const [imagen, setImage] = useState("")
    const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getTypes());
  }, [dispatch]);
  const { products, types } = useSelector((state) => state);
  const token = JSON.parse(localStorage.getItem("user")).token
  //funciones
  // cloudinary
  let ownErrors = {}
  const uploading = async (e) => {
        try {
          const files = e.target.files
          const data = new FormData()
          let a = files[0].type?.split("/").pop()
          console.log(a ==="png" , "filese[0].size>2000000");
            if (files[0]===undefined) return ownErrors.errors = "insert"
            if(a !=="png") return ownErrors.errors = "valid"
            console.log(ownErrors.errors, "errors")
            if(a ==="png") ownErrors.errors = ""
          if(true){data.append("file", files[0])
          data.append("upload_preset", "images")
          setLoading(true)
          const response = await fetch("https://api.cloudinary.com/v1_1/onlypan/upload", { method: "POST", body: data })
          const file = await response.json()
          setImage(file.secure_url)
          setLoading(false)}
        } catch (error) {
          console.log(error);
        }
    }
  
  return (
    <Formik
      initialValues={{
        name: '',
        price: 0,
        image: '',
        description: '',
        type: '',
        quantity: 0,
      }}
      validate={(values) => {
        const expresiones = {
          numeros: / *([.0-9])*\d/g,
          caracteresEs: /[\[\\\^\$\.\|\?\*\+\(\)\{\}]/g, //eslint-disable-line

          // url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, //eslint-disable-line

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

        if (
          products.filter(
            (p) => p.name.toLowerCase() === values.name.toLowerCase()
          ).length > 0
        )
          errors.name = 'Ya existe un producto con ese nombre';

        if (ownErrors.errors === "insert") errors.image = "Ingrese una imagen"
        if (ownErrors.errors === "valid") errors.image = "Ingrese un una imagen de formato png"
        //   errors.image = 'Ingrese un link valido para la imagen';

        if (values.price <= 0) errors.price = 'El precio debe ser mayor a 0';
        if (!values.description) errors.description = 'Completa este campo';
        if (expresiones.caracteresEs.test(values.description))
          errors.description = 'No puede contener caracteres especiales';
        if (values.description.length < 5 || values.description.length >= 200)
          errors.description =
            'La descripción debe tener entre 5 y 200 caracteres';
        if (values.quantity < 0)
          errors.quantity = 'el stock debe ser mayor o igual a 0';
        if (!values.type) errors.type = 'Debe seleccionar una categoría';
        if (!types.includes(values.type))
          errors.type = 'Seleccione una categoría existente.';
        console.log(errors);
        return errors;
      }}
      onSubmit={(values, actions) => {

        values.image = imagen

        dispatch(createProduct(values,token));
        setTimeout(() => {
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
  
              quantity: 0,
            },
          });
        },1000)


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
                      // value={values.image}
                      type="file"
                      placeholder="Link..."
                      // onChange={handleChange}
                      onChange={e => uploading(e)}
                      onBlur={handleBlur}
                    />
                    {loading?<h3>Loading...</h3>: <img src={imagen}  style={{width: "100px"}} /> }
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
                    <span>Stock:</span>
                    <input
                      name="quantity"
                      value={values.quantity}
                      type="number"
                      placeholder="20"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="createErrorContainer">
                      {errors.quantity && touched.quantity && (
                        <div className="createError">{errors.quantity}</div>
                      )}
                    </div>
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
