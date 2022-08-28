import React from 'react';
import { useHistory } from 'react-router-dom';

function UserAcount() {
  const history = useHistory();
  if (localStorage.getItem('user') === '{}') history.push('/');
  return (
    <div style={{ marginTop: '30rem', marginLeft: '50%' }}>
      UserAcount
      <br />
      <button
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
