import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
//componentes
import Navbar from './components/Navbar/Navbar/Navbar';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import ProductDetail from './components/Products/ProductDetail/ProductDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Contact from './components/Contact/Contact';
import CreateProduct from './components/CreateProduct/CreateProduct';
import SignUp from './components/SignUp/SignUp';

function App() {
  const stripePromise = loadStripe(
    'pk_test_51LaJmxF13fYbs0BsX1wFBN5ewQU5qWqBUdJx3DykrwIcy8D93ZK8Y1bmFQxMGnzDdEpfFwCE6hGSb2fHq9oUN5YJ00CoyP5txg'
  );
  return (
    <Elements stripe={stripePromise}>
      <div>
        <Route path="/*" component={Navbar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/productos" exact component={Products} />
          <Route path="/detail/:id" exact component={ProductDetail} />
          <Route path="/contacto" exact component={Contact} />
          <Route path="/ingreso" exact component={Login} />
          <Route path="/registro" exact component={SignUp} />
          <Route path="/carrito" exact component={Cart} />
          <Route path="/crear-producto" exact component={CreateProduct} />
          <Route path="/*" component={PageNotFound} />
        </Switch>
      </div>
    </Elements>
  );
}

export default App;
