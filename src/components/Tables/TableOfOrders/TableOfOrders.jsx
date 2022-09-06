import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../../redux/Actions/Actions';


export default function TableOfOrders() {

    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("user")).token
    useEffect(() => { dispatch(getOrders(token)) }, [dispatch,token])
    const { orders } = useSelector((state) => state);
    
    console.log(orders)
  return (
    <React.Fragment>
      <div className='table-container'>
        <table className='table'>
          <thead className="thead">
            <tr className="thead-row" >
              <th>Id</th>
              <th>Fecha</th>
              <th>Precio total</th>
              <th>Estado</th>
              <th>Cantidad</th>


            </tr>
          </thead>
          <tbody className='tbody'>

            {orders && orders.map((o, i) =>

              <tr className="tbody-row" key={i}>
                <td>#{i+1}</td>
                <td>{o.createdAt.substring(8, 10) +
                '/' +
                o.createdAt.substring(5, 7) +
                '/' +
                o.createdAt.substring(0, 4)}</td>
                <td>{o.totalPrice}</td>
                <td>{o.status}</td>
                <td>{o.products.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='table-mobile'>
        {orders && orders.map((o, i) =>
          <div className='table-mobile-body' key={i}>
            <h1 className="table-mobile-tittle">#{o.i+1}</h1>
            <div className='table-mobile-details'>
              <p><strong>Fecha:</strong> {o.createdAt.substring(8, 10) +
                '/' +
                o.createdAt.substring(5, 7) +
                '/' +
                o.createdAt.substring(0, 4)}</p>
              <p><strong>Precio Total:</strong> {o.totalPrice}</p>
              <p><strong>Estado:</strong> {o.status}</p>
              <p><strong>Cantidad:</strong><br />{o.products.length}</p>
              
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  
  )
}
