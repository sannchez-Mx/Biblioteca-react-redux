import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";

//Redux & reduxFirebase
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";

const Suscriptores = ({ suscriptores, firestore }) => {
  if (isEmpty(suscriptores))
    return (
      <div className="container text-center">
        <Spinner />
      </div>
    );

  // Eliminar Suscriptores
  const eliminarSuscriptor = id => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "No podrás revertir esto!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, borrarlo!"
    }).then(result => {
      if (result.value) {
        // eliminar
        firestore
          .delete({
            collection: "suscriptores",
            doc: id
          })
          .then(() => {
            Swal.fire("Borrado!", "Tu suscriptor ha sido borrado.", "success");
          });
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to="/suscriptores/nuevo" className="btn btn-primary">
          <i className="fas fa-plus" /> {""}
          Nuevo Suscriptor
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-users" /> Suscriptores
        </h2>
      </div>
      <table className="table table-triped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map(suscriptor => (
            <tr key={suscriptor.id}>
              <td>
                {suscriptor.nombre} {suscriptor.apellido}
              </td>
              <td>{suscriptor.carrera}</td>
              <td>
                <Link
                  to={`/suscriptores/mostrar/${suscriptor.id}`}
                  className="btn btn-success btn-block"
                >
                  <i className="fas fa-angle-double-right" /> {""}
                  Más Información
                </Link>

                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={() => eliminarSuscriptor(suscriptor.id)}
                >
                  <i className="fas fa-trash-alt" /> {""}
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Suscriptores.propTypes = {
  firestore: PropTypes.object.isRequired,
  suscriptores: PropTypes.array
};

// Higher Order Component
export default compose(
  firestoreConnect([{ collection: "suscriptores" }]), // <- Notación de objeto
  connect((state, props) => ({
    suscriptores: state.firestore.ordered.suscriptores
  }))
)(Suscriptores);
