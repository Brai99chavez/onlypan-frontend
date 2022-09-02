import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { clearDetailProduct, getProductForId, getTypes,ModifyProductById } from '../../../redux/Actions/Actions';
import "./ModifyProduct.css"

export default function ModifyProduct({ match }) {
  const {id} = match.params
  const token = JSON.parse(localStorage.getItem("user")).token
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
      {detailProduct.name &&
      <Formik
        validate={(values) => {
          let errors = {}
          if (!values.name) {
            console.log('no puede estar vacio')
          }
        }}

        initialValues={{
          name: detailProduct.name,
          price: detailProduct.price,
          description: detailProduct.description,
          quantity: detailProduct.quantity,
          type: detailProduct.type
        }}
          onSubmit={(values) => {
            console.log(values)
          dispatch(ModifyProductById(detailProduct.id,token,values))
        }}
      >
        {({values, handleSubmit, handleChange }) => (
          <form className='w-80 m-auto' onSubmit={handleSubmit}>
            <div className='form-inputs'>
              <label htmlFor="nombre">nombre</label>
              <input
                type="text"
                id='name'
                name='name'
                placeholder="Nombre"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className='form-inputs'>
              <label htmlFor="precio">precio</label>
              <input
                type="text"
                id='price'
                name='price'
                placeholder="precio"
                value={values.price}
                onChange={handleChange} />
            </div>
            <div className='form-inputs'> 
              <label htmlFor="precio">descripcion</label>
              <textarea
                rows={5}
                id='description'
                name='description'
                placeholder="descripcion"
                value={values.description}
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
                id='quantity'
                name='quantity'
                placeholder="cantidad"
                value={values.quantity}
                onChange={handleChange} />
            </div>
            <button type='submit'>modificar</button>
          </form>
        )}
      </Formik>}
    </div>
  )
}
