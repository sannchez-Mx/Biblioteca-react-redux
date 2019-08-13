import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

//Redux
import { firestoreConnect } from "react-redux-firebase";

const NuevosSuscriptores = ({ firestore, history }) => {
  const [suscriptor, guardarSuscriptor] = useState({
    nombre: "",
    apellido: "",
    carrera: "",
    codigo: ""
  });

  const agregarSuscriptor = e => {
    e.preventDefault();

    //Guardarlo en la base de datos
    firestore.add({ collection: "suscriptores" }, suscriptor)
    .then(() =>
      Swal.fire({
        position: "center",
        type: "success",
        title: "Suscriptor Agregado",
        showConfirmButton: false,
        timer: 1400
      })
      .then(()=>  history.push('/suscriptores'))
    );
  };

  // extrae los valores del input y los coloca en el state
  const leerDato = e => {
    guardarSuscriptor({
      ...suscriptor,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to={"/suscriptores"} className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left" /> {""}
          Volver al Listado
        </Link>
      </div>
      <div className="col-12">
        <h2>
          <i className="fas fa-user-plus" /> {""}
          Nuevo Suscriptor
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={agregarSuscriptor}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre del Suscriptor"
                  required
                  onChange={leerDato}
                  value={suscriptor.nombre}
                />
              </div>

              <div className="form-group">
                <label>Apellido:</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  placeholder="Apellido del Suscriptor"
                  required
                  onChange={leerDato}
                  value={suscriptor.apellido}
                />
              </div>

              <div className="form-group">
                <label>Carrera:</label>
                <input
                  type="text"
                  className="form-control"
                  name="carrera"
                  placeholder="Carrera del Suscriptor"
                  required
                  onChange={leerDato}
                  value={suscriptor.carrera}
                />
              </div>

              <div className="form-group">
                <label>Codigo:</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigo"
                  placeholder="Codigo del Suscriptor"
                  required
                  onChange={leerDato}
                  value={suscriptor.codigo}
                />
              </div>

              <input
                type="submit"
                value="Agregar Suscriptor"
                className="btn btn-success"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

NuevosSuscriptores.propTypes = {
  firestore: PropTypes.object.isRequired
};

// Higher Order Component
export default firestoreConnect()(NuevosSuscriptores);
