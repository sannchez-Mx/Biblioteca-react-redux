import React from "react";
import { Route, Switch } from "react-router-dom";

//Componentes
import Suscriptores from "./components/suscriptores/Suscriptores";
import MostrarSuscriptor from "./components/suscriptores/MostrarSuscriptores";
import EditarProducto from "./components/suscriptores/EditarSuscriptor";
import NuevosSuscriptores from "./components/suscriptores/NuevosSuscriptores";
import Libros from './components/libros/Libros';
import MostrarLibro from './components/libros/MostrarLibro';
import NuevoLibro from './components/libros/NuevoLibro';
import EditarLibro from './components/libros/EditarLibros';
import PrestamoLibro from './components/libros/PrestamoLibro';
import NotFound from './components/NotFound/NotFound';
import Login from './components/auth/Login';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';


export default () => (
  <Switch>
    <Route exact path="/" component={UserIsAuthenticated(Libros)} />
    <Route
      exact
      path="/libros/mostrar/:id"
      component={UserIsAuthenticated(MostrarLibro)}
    />
    <Route
      exact
      path="/libros/nuevo"
      component={UserIsAuthenticated(NuevoLibro)}
    />
    <Route
      exact
      path="/libros/editar/:id"
      component={UserIsAuthenticated(EditarLibro)}
    />
    <Route
      exact
      path="/libros/prestamo/:id"
      component={UserIsAuthenticated(PrestamoLibro)}
    />

    <Route
      exact
      path="/suscriptores"
      component={UserIsAuthenticated(Suscriptores)}
    />
    <Route
      exact
      path="/suscriptores/nuevo"
      component={UserIsAuthenticated(NuevosSuscriptores)}
    />
    <Route
      exact
      path="/suscriptores/mostrar/:id"
      component={UserIsAuthenticated(MostrarSuscriptor)}
    />
    <Route
      exact
      path="/suscriptores/editar/:id"
      component={UserIsAuthenticated(EditarProducto)}
    />
    <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
    <Route exact path="*" component={UserIsNotAuthenticated(NotFound)} />
  </Switch>
);
