import React, { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

//Redux
import { firebaseConnect } from "react-redux-firebase";

const Login = ({ firebase }) => {
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: ""
  });

  //Iniciar sesión en Google
  const gmailLogin = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        Swal.fire({
          position: "center",
          type: "success",
          title: `Sesión iniciada como ${res.user.displayName}`,
          showConfirmButton: false,
          timer: 1600
        });
      });
  };

  // iniciar sesión en firebase
  const iniciarSesion = e => {
    e.preventDefault();

    // extraer el state
    const { email, password } = usuario;

    // autenticar el usuario
    firebase
      .login({ email, password })
      .then(resultado => console.log("Iniciaste sesión"))
      .catch(error => console.log("Hubo un error"));
  };

  const leerDatos = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="text-center py-4">
              <i className="fas fa-lock" /> {""}
              Iniciar Sesión
            </h2>

            <form onSubmit={iniciarSesion}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  value={usuario.email}
                  onChange={leerDatos}
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  value={usuario.password}
                  onChange={leerDatos}
                />
              </div>

              <input
                type="submit"
                className="btn btn-success btn-block"
                value="Inicar Sesión"
              />

              <h5 className="text-center mt-3">Or</h5>

              <input
                type="button"
                className="btn btn-light btn-block"
                value="Sign in with Google"
                onClick={gmailLogin}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
