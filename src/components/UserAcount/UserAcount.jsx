import React from 'react';
import { useHistory } from 'react-router-dom';
import Orders from './Orders/Orders';
import './UserAcount.css';

function UserAcount() {
  const history = useHistory();
  if (localStorage.getItem('user') === '{}') history.push('/');
  const user = JSON.parse(localStorage.getItem('user')).user;

  return (
    <div className="userContainer">
      <div className="userTop">
        <img src={user.image} alt="profile" />
        <h1 className="userName">{user.name + ' ' + user.lastName}</h1>
      </div>
      <br />
      <Orders />
      <button
        className="logOutButton"
        onClick={() => {
          localStorage.setItem('user', JSON.stringify({}));
          history.push('/');
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default UserAcount;
