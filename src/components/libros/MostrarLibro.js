import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";

//Redux & reduxFirebase
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";

const MostrarLibro = ({ firestore, libro, history }) => {
  if (isEmpty(libro)) return <Spinner />;

  const devolverLibro = id => {
    // copia del libro
    const libroActualizado = { ...libro };

    // eliminar la persona que esta realizando la devolución de prestados
    const prestados = libroActualizado.prestados.filter(
      elemento => elemento.codigo !== id
    );
    libroActualizado.prestados = prestados;

    // actualizar en firebase
    firestore
      .update({ collection: "libros", doc: libroActualizado.id },libroActualizado)
      .then(() =>
        Swal.fire({
          position: "center",
          type: "success",
          title: "Libro Devuelto",
          showConfirmButton: false,
          timer: 1400
        })
      ).then(() => history.push("/"));
  };

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <Link to="/" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left" /> {""}
          Volver Al Listado
        </Link>
      </div>
      <div className="col-md-6 mb-4">
        <Link
          to={`/libros/editar/${libro.id}`}
          className="btn btn-primary float-right"
        >
          <i className="fas fa-pencil-alt" /> {""}
          Editar Libro
        </Link>
      </div>

      <hr className="mx-5 w-100" />

      <div className="col-12">
        <h2 className="mb-4">{libro.titulo}</h2>

        <p>
          <span className="font-weight-bold">ISBN:</span> {""}
          {libro.ISBN}
        </p>

        <p>
          <span className="font-weight-bold">Editorial:</span> {""}
          {libro.editorial}
        </p>

        <p>
          <span className="font-weight-bold">Existencia:</span> {""}
          {libro.existencia}
        </p>

        <p>
          <span className="font-weight-bold">Disponibles:</span> {""}
          {libro.existencia - libro.prestados.length}
        </p>

        {/* Boton para solicitar un prestamo de libro */}
        {libro.existencia - libro.prestados.length > 0 ? (
          <Link
            to={`/libros/prestamo/${libro.id}`}
            className="btn btn-success my-3"
          >
            Solicitar Prestamo
          </Link>
        ) : null}

        {/* Muestra las personas que tienen los libros */}

        <h3 className="my-2">Personas que tienen el Libro Prestado</h3>

        {libro.prestados.map(prestado => (
          <div key={prestado.codigo} className="card my-2">
            <h4 className="card-header">
              {prestado.nombre} {prestado.apellido}
            </h4>

            <div className="card-body">
              <p>
                <span className="font-weight-bold">Código:</span> {""}
                {prestado.codigo}
              </p>

              <p>
                <span className="font-weight-bold">Carrera:</span> {""}
                {prestado.carrera}
              </p>

              <p>
                <span className="font-weight-bold">Fecha Solicitud:</span> {""}
                {prestado.fecha_solicitud}
              </p>
            </div>

            <div className="card-footer">
              <button
                type="button"
                className="btn btn-success font-weight-bold"
                onClick={() => devolverLibro(prestado.codigo)}
              >
                {" "}
                Realizar Devolución{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MostrarLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(MostrarLibro);
