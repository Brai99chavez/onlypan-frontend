import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DeleteProduct, getAllProducts } from '../../../redux/Actions/Actions';
import "../Tables.css"

export default function TableOfProducts() {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);


  const history = useHistory();
  if (!JSON.parse(localStorage.getItem("user")).user) {
      history.push('/')
  } else {
    if (JSON.parse(localStorage.getItem("user")).user.rol !== 'admin') { 
      history.push('/')
    }
  }

  const { products } = useSelector((state) => state);
  const token = JSON.parse(localStorage.getItem("user")).token

  function handleDelete(id,token) {
    Swal.fire({
      title: 'Eliminacion',
      text: "¿Estas seguro de eliminar este producto?", 
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteProduct(id, token))
        .then(window.location.reload())
      }
    })
  }

  return (
    <React.Fragment>
      <div className='table-container'>
        <table className='table'>
          <thead className="thead">
            <tr className="thead-row" >

              <th>Nombre</th>
              <th>Precio</th>
              <th>cantidad</th>
              <th>categoria</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody className='tbody'>

            {products && products.map((p, i) =>

              <tr className={`tbody-row ${p.quantity >= 1 ? 'text-black' : 'text-red-700'}`} key={i}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>{p.type}</td>
                <td><Link to={`/modificar-producto/${p.id}`}><i className="fa-solid fa-pen-to-square "></i></Link></td>
                <td><button onClick={() => handleDelete(p.id,token)} ><i className="fa-solid fa-trash-can"></i></button></td>
              </tr>

            )}
          </tbody>
        </table>
      </div>
      <div className='table-mobile'>
        {products && products.map((p, i) =>
          <div className='table-mobile-body' key={i}>
            <h1 className="table-mobile-tittle">#{p.id} {p.name}</h1>
            <div className='table-mobile-details'>
              <p><strong>precio:</strong> ${p.price}</p>
              <p><strong>cantidad:</strong> {p.quantity}</p>
              <p><strong>categoria:</strong> {p.type}</p>
              <p><strong>disponible:</strong> {p.quantity > 0 ? 'si' : 'no'}</p>
              <Link to={`/modificar-producto/${p.id}`}><i className="fa-solid fa-pen-to-square "></i></Link>
                <button><i className="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
