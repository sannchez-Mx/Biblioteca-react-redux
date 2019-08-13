import React, { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

//Redux
import { firestoreConnect } from "react-redux-firebase";

const NuevoLibro = ({ firestore, history }) => {
  const [libro, guardarLibro] = useState({
    titulo: "",
    ISBN: "",
    editorial: "",
    existencia: ""
  });

  // guardar el libro en la base de datos
  const agregarLibro = e => {
    e.preventDefault();

    // agregar un arreglo de interesados.
    libro.prestados = [];

    // añadirlo a la base de datos y redireccionar
    firestore.add({ collection: "libros" }, libro).then(() =>
      Swal.fire({
        position: "center",
        type: "success",
        title: "Libro Agregado",
        showConfirmButton: false,
        timer: 1400
      }).then(() => history.push("/"))
    );
  };

  // extrae los valores del input y los coloca en el state
  const leerDato = e => {
    guardarLibro({
      ...libro,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left" /> {""}
          Volver al Listado
        </Link>
      </div>
      <div className="col-12">
        <h2>
          <i className="fas fa-book" /> {""}
          Nuevo Libro
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={agregarLibro}>
              <div className="form-group">
                <label>Titulo:</label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  placeholder="Titulo o Nombre de Libro"
                  required
                  value={libro.titulo}
                  onChange={leerDato}
                />
              </div>

              <div className="form-group">
                <label>Editorial:</label>
                <input
                  type="text"
                  className="form-control"
                  name="editorial"
                  placeholder="Editorial de Libro"
                  required
                  value={libro.editorial}
                  onChange={leerDato}
                />
              </div>

              <div className="form-group">
                <label>ISBN:</label>
                <input
                  type="text"
                  className="form-control"
                  name="ISBN"
                  placeholder="ISBN de Libro"
                  required
                  value={libro.ISBN}
                  onChange={leerDato}
                />
              </div>

              <div className="form-group">
                <label>Existencia:</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  name="existencia"
                  placeholder="Cantidad en Existencia"
                  required
                  value={libro.existencia}
                  onChange={leerDato}
                />
              </div>

              <input
                type="submit"
                value="Agregar Libro"
                className="btn btn-success"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

NuevoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoLibro);
