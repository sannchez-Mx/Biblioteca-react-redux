import React, { useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";

//Redux & reduxFirebase
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";

const EditarLibro = ({ firestore, history, libro }) => {
  //refs
  const tituloInput = useRef(""),
    editorialInput = useRef(""),
    ISBNInput = useRef(""),
    existenciaInput = useRef("");

  if (isEmpty(libro)) return <Spinner />;

  // Actualiza el Libro en firestore
  const actualizarLibro = e => {
    e.preventDefault();

    // construir el nuevo objeto
    let libroActualizado = {
      titulo: tituloInput.current.value,
      editorial: editorialInput.current.value,
      ISBN: ISBNInput.current.value,
      existencia: existenciaInput.current.value
    };

    // actualizar en firestore
    firestore
      .update({ collection: "libros", doc: libro.id }, libroActualizado)
      .then(() =>
        Swal.fire({
          position: "center",
          type: "success",
          title: "Libro Actualizado",
          showConfirmButton: false,
          timer: 1400
        })
      )
      .then(() => history.push("/"));
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
          <i className="fas fa-book" /> {""}
          Editar Libro
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={actualizarLibro}>
              <div className="form-group">
                <label>Titulo:</label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  placeholder="Titulo o Nombre de Libro"
                  required
                  defaultValue={libro.titulo}
                  ref={tituloInput}
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
                  defaultValue={libro.editorial}
                  ref={editorialInput}
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
                  defaultValue={libro.ISBN}
                  ref={ISBNInput}
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
                  defaultValue={libro.existencia}
                  ref={existenciaInput}
                />
              </div>

              <input
                type="submit"
                value="Editar Libro"
                className="btn btn-success"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

EditarLibro.propTypes = {
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
)(EditarLibro);
