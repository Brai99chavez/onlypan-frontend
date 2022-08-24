import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "./App.css"
import Home from './components/Home/Home';
//componentes
import Navbar from './components/Navbar/Navbar/Navbar';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Contact from './components/Contact/Contact';

function App() {
  return (
      <div >
      <Route path="/*" component={Navbar} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/productos" exact component={Products} />
        <Route path="/contacto" exact component={Contact} />
        <Route path="/ingreso" exact component={Login} />
        <Route path="/carrito" exact component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
