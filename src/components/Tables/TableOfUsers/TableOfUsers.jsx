import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DisableUser, getAllUsers, modifyRolByAdmin } from '../../../redux/Actions/Actions';


export default function TableOfUsers() {

  const token = JSON.parse(localStorage.getItem("user")).token
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [dispatch,token]);

  const { allUsers } = useSelector((state) => state);

  function handleBan(id,token) {
    Swal.fire({
      title: 'Ban',
      text: "¿Estas seguro de Banear este usuario?", 
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DisableUser(id,token) , window.location.reload())
      }
    })
  }
  function handleUnban(id,token) {
    Swal.fire({
      title: 'Unban',
      text: "¿Estas seguro de Desbanear a este usuario?", 
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activalo!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DisableUser(id,token) , window.location.reload())
      }
    })
  }
  function handleModifyRol(id,token) {
    
    
    Swal.fire({
      title: 'Cambio de Rol',
      text: "¿Estas seguro en cambiar de rol a este usuario?", 
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(modifyRolByAdmin(id, token),window.location.reload())
      }
    })
  }
  return (
    <React.Fragment>
      <div className='table-container'>
        <table className='table'>
          <thead className="thead">
            <tr className="thead-row" >
              <th>id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Rol</th>
              <th>Ban/Unban</th>
            </tr>
          </thead>
          <tbody className='tbody'>

            {allUsers && allUsers.map((p, i) =>
              <tr className={`tbody-row ${p.isAvailable === true ? "text-black" : "text-red-500"}`} key={i}>
                <td>#{p.id}</td>
                <td>{p.name}</td>
                <td>{p.lastName}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
                <td>{p.address}</td>
                <td>{p.id !== 1 ? <select name="" id="" value={p.rol} onChange={ ()=> handleModifyRol(p.id,token)}>
                  <option value="user">usuario</option>
                  <option value="admin">admin</option>
                </select> : p.rol}</td>
                { p.id !== 1 ? <td>{ p.isAvailable ?<button onClick={() => handleBan(p.id,token)}><i className="fa-solid fa-ban text-red-700"></i> </button>: <button onClick={() => handleUnban(p.id,token)}><i class="fa-regular fa-square-check text-green-700"></i></button>}</td>:null}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='table-mobile'>
        {allUsers && allUsers.map((p, i) => {
          console.log()
          return (<div className={`table-mobile-body ${p.isAvailable === true ? "text-black" : "text-red-700"}`} key={i}>
            <h1 className="table-mobile-tittle">{p.email} </h1>
            <div className='table-mobile-details'>
              <strong>name:</strong><p>{p.name} {p.lastName}</p>
              <strong>Rol:</strong> <p>{p.id !== 1 ? <select name="" id="" value={p.rol} onChange={ ()=> dispatch(modifyRolByAdmin(p.id,token),window.location.reload())}>
                  <option value="user">usuario</option>
                  <option value="admin">admin</option>
                </select> : p.rol}</p>
              <strong>telefono:</strong><p>{p.phone}</p>
                <strong>direccion:</strong><p>{p.address}</p>
              <Link to={`/modificar-usuario/${p.id}`}><i className="fa-solid fa-pen-to-square "></i></Link>
              { p.id !== 1 ? <td><button onClick={() => handleBan(p.id,token)}>{ p.isAvailable ?<i className="fa-solid fa-ban text-red-700"></i> : <i class="fa-regular fa-square-check text-green-700"></i>}</button></td>:null}
            </div>
          </div>
          )
        })}
      </div>

    </React.Fragment>
  )
}
