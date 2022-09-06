import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { DisableUser, getAllUsers, modifyRolByAdmin } from '../../../redux/Actions/Actions';


export default function TableOfUsers() {

  const token = JSON.parse(localStorage.getItem("user")).token
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [dispatch,token]);

  const { allUsers } = useSelector((state) => state);


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
                <td>{p.id !== 1 ? <select name="" id="" value={p.rol} onChange={ ()=> dispatch(modifyRolByAdmin(p.id,token),window.location.reload())}>
                  <option value="user">usuario</option>
                  <option value="admin">admin</option>
                </select> : p.rol}</td>
                { p.id !== 1 ? <td><button onClick={() => dispatch(DisableUser(p.id,token) , window.location.reload())}>{ p.isAvailable ?<i className="fa-solid fa-ban text-red-700"></i> : <i class="fa-regular fa-square-check text-green-700"></i>}</button></td>:null}
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
              { p.id !== 1 ? <td><button onClick={() => dispatch(DisableUser(p.id,token) , window.location.reload())}>{ p.isAvailable ?<i className="fa-solid fa-ban text-red-700"></i> : <i class="fa-regular fa-square-check text-green-700"></i>}</button></td>:null}
            </div>
          </div>
          )
        })}
      </div>

    </React.Fragment>
  )
}
