import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "./App.css"
import Home from './components/Home/Home';
//componentes
import NavbarAdmin from './components/Navbar/NavbarAdmin/NavbarAdmin';
import NavbarUser from './components/Navbar/NavbarUser/NavbarUser';
import NavbarEmployee from './components/Navbar/NavbarEmployee/NavbarEmployee';
import NavbarViewer from './components/Navbar/NavbarViewer/NavbarViewer';
import Login from './components/Login/Login';
import Products from './components/Products/Products';

let rol = 4

function App() {
  return (
    <div >
      {rol === 1 ? // admin
        <Route path="/*" component={NavbarAdmin} /> :
        rol === 2 ? // empleado
          <Route path="/*" component={NavbarEmployee} /> :
          rol === 3 ? //
            <Route path="/*" component={NavbarUser} /> :
            <Route path="/*" component={NavbarViewer} />
      }

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/productos" exact component={Products} />
        <Route path="/ingreso" exact component={Login} />
      </Switch>
      
    </div>
  );
}

export default App;
