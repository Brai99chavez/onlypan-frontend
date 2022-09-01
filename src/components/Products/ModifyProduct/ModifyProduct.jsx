import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { clearDetailProduct, getProductForId, getTypes } from '../../../redux/Actions/Actions';
import "./ModifyProduct.css"

export default function ModifyProduct({ match }) {
  const { id } = match.params;

  // redux
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductForId(id));
    dispatch(getTypes());
    return dispatch(clearDetailProduct())
  }, [dispatch, id]);

  const { detailProduct,types } = useSelector((state) => state);
  // componente
  return (
    <div className=" w-full mt-40">
      {detailProduct.name && <Formik
        
        validate={(values) => {
          let errors = {}
          if (!values.name) {
            console.log('no puede estar vacio')
          }
        }}

        initialValues={{
          nombre: detailProduct.name,
          precio: detailProduct.price,
          descripcion: detailProduct.description,
          cantidad: detailProduct.quantity,
          categoria: detailProduct.type
        }}
        onSubmit={(values) => {
          console.log('funca')
        }}
      >
        {({values, handleSubmit, handleChange }) => (
          <form className='w-80 m-auto' onSubmit={handleSubmit}>
            <div className='form-inputs'>
              <label htmlFor="nombre">nombre</label>
              <input
                type="text"
                id='nombre'
                name='nombre'
                placeholder="Nombre"
                value={values.nombre}
                onChange={handleChange}
              />
            </div>
            <div className='form-inputs'>
              <label htmlFor="precio">precio</label>
              <input
                type="text"
                id='precio'
                name='precio'
                placeholder="precio"
                value={values.precio}
                onChange={handleChange} />
            </div>
            <div className='form-inputs'> 
              <label htmlFor="precio">descripcion</label>
              <textarea
                rows={5}
                id='descripcion'
                name='descripcion'
                placeholder="descripcion"
                value={values.descripcion}
                onChange={handleChange} />
            </div>
            <div className='form-inputs'>
              <label htmlFor="precio">categoria</label>
              <select onChange={handleChange} id='categoria' name='categoria' value={values.categoria}>

                {types.length && types.map((t,i) => (
                  <option key={i} value={t}>{ t}</option>
                ))}
              </select>

            </div>
            <div className='form-inputs'>
              <label htmlFor="precio">cantidad</label>
              <input
                type="text"
                id='cantidad'
                name='cantidad'
                placeholder="cantidad"
                value={values.cantidad}
                onChange={handleChange} />
            </div>
            <button>modificar</button>
          </form>
        )}
      </Formik>}
    </div>
  )
}
