import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllUsers, modifyRolByAdmin } from '../../../redux/Actions/Actions';


export default function TableOfUsers() {

  const token = JSON.parse(localStorage.getItem("user")).token
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [dispatch]);

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
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody className='tbody'>

            {allUsers && allUsers.map((p, i) =>

              <tr className="tbody-row" key={i}>
                <td>#{p.id}</td>
                <td>{p.name}</td>
                <td>{p.lastName}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
                <td>{p.address}</td>
                <td><select name="" id="" value={p.rol} onChange={ ()=> dispatch(modifyRolByAdmin(p.id,token))}>
                  <option value="user">usuario</option>
                  <option value="admin">admin</option>
                </select></td>
                <td><button><i className="fa-solid fa-trash-can"></i></button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='table-mobile'>
        {allUsers && allUsers.map((p, i) => {
          console.log()
          return (<div className='table-mobile-body' key={i}>
            <h1 className="table-mobile-tittle">{p.email} </h1>
            <div className='table-mobile-details'>
              <strong>name:</strong><p>{p.name} {p.lastName}</p>
              <strong>Rol:</strong> <p>{p.rol}</p>
              <Link to={`/modificar-usuario/${p.id}`}><i className="fa-solid fa-pen-to-square "></i></Link>
              <button><i className="fa-solid fa-trash-can"></i></button>
            </div>
          </div>

          )
        })}
      </div>

    </React.Fragment>
  )
}
