import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FloppaMain from './components/recetas/FloppaMain';
import CrearReceta from './components/form/crearReceta';
import RecetaPage from './components/recetaPage/RecetaPage';
import Navbar from './components/navbar/Navbar';
import User from './components/user/User';
import Scroll from './Scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
     <div className="app">
        <BrowserRouter>
           <Scroll />
           <Navbar/>
           <Switch>
              <Route path="/user" component={ User }></Route>
              <Route path="/create" component={ CrearReceta }></Route>
              <Route path="/receta/:id" component={ RecetaPage }></Route>
              <Route path="/update/:id" component={ CrearReceta }></Route>
              <Route path="/" component={ FloppaMain }></Route>
           </Switch>
           <ToastContainer />
        </BrowserRouter>
     </div>

  </React.StrictMode>,
  document.getElementById('root')
);
