import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

const Navbar = ({ firebase, auth }) => {
  const [usuarioA, setUsuarioA] = useState(false);

  useEffect(() => {
    if (auth.uid) {
      return setUsuarioA(true);
    } else {
      return setUsuarioA(false);
    }
  }, [auth.uid]);

  // cerrar la sesión
  const cerrarSesion = () => {
    firebase.auth().signOut()
    .then(async () => {
      await Swal.fire({
        position: "center",
        type: "success",
        title: "Sesión finalizada",
        showConfirmButton: false,
        timer: 2000
      });
    })
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
      <nav className="navbar navbar-light">
        <span className="navbar-brand mb-0 h1">
          Administrador de Biblioteca
        </span>
      </nav>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01">
        {usuarioA ? (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/suscriptores"} className="nav-link">
                Suscriptores
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Libros
              </Link>
            </li>
          </ul>
        ) : null}

        {usuarioA ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="navbar-brand nav-link" href="#!">
                <img
                  src={auth.photoURL}
                  className="d-inline-block align-center"
                  style={{ width: "7%", height: "auto", marginRight: "12px" }}
                  alt={auth.displayName}
                />
                {auth.email}
              </a>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className="btn btn-danger"
                onClick={cerrarSesion}
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
