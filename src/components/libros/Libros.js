import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";

//Redux & reduxFirebase
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";

const Libros = ({ firestore, libros }) => {
  if (isEmpty(libros)) return <Spinner />;

  // Eliminar Suscriptores
  const eliminarLibro = id => {
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
        firestore.delete({ collection: "libros", doc: id }).then(() => {
          Swal.fire("Borrado!", "Tu Libro ha sido borrado.", "success");
        });
      }
    });
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/libros/nuevo" className="btn btn-success">
          <i className="fas fa-plus" /> {""}
          Nuevo Libro
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-book" /> {""}
          Libros
        </h2>
      </div>

      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Titulo</th>
            <th>ISBN</th>
            <th>Editorial</th>
            <th>Existencia</th>
            <th>Disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td>{libro.ISBN}</td>
              <td>{libro.editorial}</td>
              <td>{libro.existencia}</td>
              <td>{libro.existencia - libro.prestados.length}</td>
              <td>
                <Link
                  to={`/libros/mostrar/${libro.id}`}
                  className="btn btn-success btn-block"
                >
                  <i className="fas fa-angle-double-right" /> {""}
                  Más Información
                </Link>

                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={() => eliminarLibro(libro.id)}
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

Libros.propTypes = {
  firestore: PropTypes.object.isRequired,
  libros: PropTypes.array
};

// Higher Order Component
export default compose(
  firestoreConnect([{ collection: "libros" }]), // <- Notación de objeto
  connect((state, props) => ({
    libros: state.firestore.ordered.libros
  }))
)(Libros);
