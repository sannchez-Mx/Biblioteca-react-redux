import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";

//Redux & reduxFirebase
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";

const EditarSuscriptor = ({ suscriptor, firestore, history }) => {
  const [infoSuscriptor, guardarInfoSuscriptor] = useState({
    nombre: "",
    apellido: "",
    carrera: "",
    codigo: ""
  });

  useEffect(() => {
    if (isLoaded(suscriptor)) {
      const { nombre, apellido, carrera, codigo } = suscriptor;
      guardarInfoSuscriptor({
        nombre,
        apellido,
        carrera,
        codigo
      });
    }
  }, [suscriptor]);

  if (isEmpty(suscriptor)) return <Spinner />;

  const suscriptorActualizado = e => {
    guardarInfoSuscriptor({
      ...infoSuscriptor,
      [e.target.name]: e.target.value
    });
  };

  // Edita el Suscriptor en la base de datos
  const editarSuscriptor = e => {
    e.preventDefault();

    // almacenar en la base de datos con firestore
    firestore
    .update({ collection: "suscriptores", doc: suscriptor.id}, infoSuscriptor)
      .then(() =>
        Swal.fire({
          position: "center",
          type: "success",
          title: "Suscriptor Actualizado",
          showConfirmButton: false,
          timer: 1400
        })
      )
      .then(() => history.push("/suscriptores"));
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
          <i className="fas fa-user" /> {""}
          Editar Suscriptor
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={editarSuscriptor}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre del Suscriptor"
                  required
                  onChange={suscriptorActualizado}
                  defaultValue={suscriptor.nombre}
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
                  onChange={suscriptorActualizado}
                  defaultValue={suscriptor.apellido}
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
                  onChange={suscriptorActualizado}
                  defaultValue={suscriptor.carrera}
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
                  onChange={suscriptorActualizado}
                  defaultValue={suscriptor.codigo}
                />
              </div>

              <input
                type="submit"
                value="Editar Suscriptor"
                className="btn btn-success"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

EditarSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired,
  suscriptor: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "suscriptores",
      storeAs: "suscriptor",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(EditarSuscriptor);
