import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

function Error() {
  return (
    <div className="errorContainer">
      <div>Error</div>
      <Link to="/">
        <button>Volver a Home</button>
      </Link>
    </div>
  );
}

export default Error;
