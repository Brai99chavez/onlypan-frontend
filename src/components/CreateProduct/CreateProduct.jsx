import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getAllProducts } from '../../redux/Actions/Actions';
import "./CreateProduct.css"

export default function CreateProduct() {

  const [state, setState] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
    type: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // VALIDACIONES
  const expresiones = {
    numeros: / *([.0-9])*\d/g, //eslint-disable-line
    caracteresEs: /[\[\\\^\$\.\|\?\*\+\(\)\{\}]/g, //eslint-disable-line
    url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, //eslint-disable-line
    instru: /^[a-zA-Z0-9_-\s]{4,200}$/, //eslint-disable-line
    numPosi: /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/gm,
  };
  const { products } = useSelector((state) => state);

  const validationName = (name) => {
    if (name.length <= 4) {
      return "Por lo menos debe ingresar 5 letras";
    }
    if (name.length >= 50) {
      return "Nombre muy largo, resumelo un poco";
    }
    if (expresiones.caracteresEs.test(name)) {
      return "no pueden haber caracteres especiales";
    }
    if (expresiones.numeros.test(name)) {
      return "no pueden ser numeros";
    }
    if (
      products.filter((p) => p.name.toLowerCase() === name.toLowerCase())
        .length > 0
    ) {
      return "el nombre ya existe";
    }
  };

  const validationImage = (image) => {
    if (!expresiones.url.test(image)) {
      return "ingrese un link valido para la imagen";
    }
  };

  const validationPrice = (price) => {
    if (price <= 0) {
      return "el precio debe ser mayor a 0";
    }
  };

  const validationType = (type) => {
    if (type.length <= 4) {
      return "Por lo menos debe ingresar 3 letras";
    }
    if (type.length >= 50) {
      return "Nombre muy largo, resumelo un poco";
    }
    if (expresiones.caracteresEs.test(type)) {
      return "no pueden haber caracteres especiales";
    }
    if (expresiones.numeros.test(type)) {
      return "no pueden ser numeros";
    }
  };

  const validationDesc = (desc) => {
    if (desc.length === 0) {
      return "No puede estar vacio";
    }
    if (expresiones.caracteresEs.test(desc)) {
      return "no pueden haber caracteres especiales";
    }
    if (desc.length >= 200) {
      return "Descripcion muy larga, resumela un poco";
    }
  };

  const errorMsgName = validationName(state.name);
  const errorMsgImage = validationImage(state.image);
  const errorMsgPrice = validationPrice(state.price);
  const errorMsgType = validationType(state.type);
  const errorMsgDesc = validationDesc(state.description);

  function onChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const validacion = (errorName, errorImg, errorPrice, errorType, errorDesc) => {
    if (errorName === undefined && errorImg === undefined && errorPrice === undefined && errorType === undefined && errorDesc === undefined) {
      return undefined;
    } else {
      return null;
    }
  };

  const validacionBoton = validacion(errorMsgName, errorMsgImage, errorMsgPrice, errorMsgType, errorMsgDesc);

  const onSumbit = (e) => {
    e.preventDefault();

    if (validacionBoton !== undefined) {
      return alert("no no, crea bien");
    } else {
      dispatch(createProduct(state));
      alert("creado");
      setState({
        name: "",
        price: 0,
        image: "",
        description: "",
        type: "",
      });
    }
  };


  return (
    <div className="create">
      <div className="create-container">
        <form action="" method="post" onSubmit={e => onSumbit(e)}>
          <h3 className="create-tittle">Crear Producto</h3>
          <div className='form-container'>
            <div>

              <label className='create-detail'>
                <span>Nombre:</span>
                <input
                  name="name"
                  value={state.name}
                  type="text"
                  placeholder="pan"
                  required
                  onChange={e => onChange(e)}
                />

              </label>
              {errorMsgName ? <small className='text-red-700'>{errorMsgName}</small> : null}
              <br />
              <label className='create-detail'>
                <span>Precio:</span>
                <input
                  name="price"
                  value={state.price}
                  type="number"
                  placeholder="20"
                  required
                  onChange={e => onChange(e)}
                />
                {errorMsgPrice ? <small className='text-red-700'>{errorMsgPrice}</small> : null}
                <br />
              </label>
              <label className='create-detail'>
                <span>Imagen:</span>
                <input
                  name="image"
                  value={state.image}
                  type="text"
                  placeholder="link....."
                  required
                  onChange={e => onChange(e)}
                />
              </label>
              {errorMsgImage ? <small className='text-red-700'>{errorMsgImage}</small> : null}
            </div>
            <br />
            <div>
              <label className='create-detail'>
                <span>descripcion:</span><br />
                <textarea
                  rows='5'
                  name="description"
                  value={state.description}
                  type="text"
                  placeholder="soy un pan uwu..."
                  required
                  onChange={e => onChange(e)}
                />
                {errorMsgDesc ? <small className='text-red-700'>{errorMsgDesc}</small> : null}
                <br />
              </label>
              <label className='create-detail'>
                <span>categoria:</span><br />
                <input
                  name="type"
                  value={state.type}
                  type="text"
                  placeholder="factura..."
                  required
                  onChange={e => onChange(e)}
                />
              </label>
              {errorMsgType ? <small className='text-red-700'>{errorMsgType}</small> : null}
            </div>
          </div>
          <div className='create-button'>
                <button className='btn'>crear</button>
              </div>
        </form>

      </div>
    </div>
  )
}
