import React from 'react'
import "./TableOfUsers.css"

export default function TableOfUsers() {
  return (
    <div className="table">
      <div className='table-body'>
        <table>
          <thead className='table-header'>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>editar</th>
              <th>eliminar</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            <tr>
              <td>1</td>
              <td>braian</td>
              <td>chavez</td>
              <td>braian@gmail.com</td>
              <td>2213141464</td>
              <td><i className="fa-solid fa-pen-to-square"></i></td>
              <td><i className="fa-solid fa-trash-can"></i></td>
            </tr>
            <tr>
              <td>1</td>
              <td>braian</td>
              <td>chavez</td>
              <td>braian@gmail.com</td>
              <td>2213141464</td>
              <td><i className="fa-solid fa-pen-to-square"></i></td>
              <td><i className="fa-solid fa-trash-can"></i></td>
            </tr>
            <tr>
              <td>1</td>
              <td>braian</td>
              <td>chavez</td>
              <td>braian@gmail.com</td>
              <td>2213141464</td>
              <td><i className="fa-solid fa-pen-to-square"></i></td>
              <td><i className="fa-solid fa-trash-can"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
