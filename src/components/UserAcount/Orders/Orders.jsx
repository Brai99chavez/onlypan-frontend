import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../../redux/Actions/Actions';
import './Orders.css';

function Orders() {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem('user')).user.id;
  useEffect(() => {
    dispatch(getUserOrders(userId));
  }, [dispatch]);

  const { userOrders } = useSelector((state) => state);
  console.log(userOrders);
  return (
    <div className="ordersContainer">
      <h1 className="ordersTitle">Mis compras</h1>
      {!userOrders.length ? (
        <p className="text-center">No tienes ninguna compra! </p>
      ) : (
        userOrders.map((o, i) => (
          <div className="orderContainer" key={i}>
            <div className="font-bold text-lg">
              {o.createdAt.substring(8, 10) +
                '/' +
                o.createdAt.substring(5, 7) +
                '/' +
                o.createdAt.substring(0, 4)}
            </div>
            {o.products.map((p, i) => (
              <div className="flex" key={i}>
                <h3 className="mr-5">{p.name}</h3>
                <div>x {p.orderProducts.quantity}</div>
              </div>
            ))}
            <div className="font-bold text-lg">Total: ${o.totalPrice}</div>
            <div className="pt-3">
              <i class="fa-solid fa-circle fa-2xs px-2" />
              <span className="underline underline-offset-1 mr-2">
                Método de entrega:
              </span>
              {`${o.delivery === 'takeAway' ? 'Take Away' : 'Delivery'}`}
            </div>
            <div>
              <i class="fa-solid fa-circle fa-2xs px-2" />
              <span className="underline underline-offset-1 mr-2">
                Estado del pedido:
              </span>
              {o.status.charAt(0).toUpperCase() + o.status.substring(1)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
