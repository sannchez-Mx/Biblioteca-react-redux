import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";
import FichaSuscriptor from "../suscriptores/FichaSuscriptor";

//Redux & reduxFirebase
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
// REDUX Actions
import { buscarUsuario } from "../../actions/buscarUsuarioActions";

const PrestamoLibro = (props) => {
  const [busquedaS, guardarBusqueda] = useState({
    busqueda: ""
  });

  // mostrar el spinner
  if (isEmpty(props.libro) && isEmpty(props.usuario))
    return <Spinner />;

  // Buscar alumno por Código
  const buscarAlumno = e => {
    e.preventDefault();

    // hacer la consulta
    const coleccion = props.firestore.collection("suscriptores");
    const consulta = coleccion.where("codigo", "==", busquedaS.busqueda).get();

    // leer los resultados
    consulta.then(resultado => {
      if (resultado.empty) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "No se encontraron resultados!",
        });
        // no hay resultados
        // almacenar en redux un objeto vacio
        props.buscarUsuario({});

        // actualizar el state en base a si hay resultados
        guardarBusqueda({
          ...busquedaS
        });
      } else {
        // si hay resultados
        // colocar el resultado en el state de Redux
        const datos = resultado.docs[0];
        props.buscarUsuario(datos.data());

        // actualizar el state en base a si hay resultados
        guardarBusqueda({
          ...busquedaS,
        });
      }
    });
  };

  // almacena los datos del alumno para solicitar el libro
  const solicitarPrestamo = () => {
    // fecha de alta
    props.usuario.fecha_solicitud = new Date().toLocaleDateString();

    // No se pueden mutar los props, tomar una copia y crear un arreglo nuevo
    let prestados = [...props.libro.prestados, props.usuario];

    // Copiar el objeto y agregar los prestados
    const libro = { ...props.libro };

    // eliminar los prestados anteriores
    delete libro.prestados;

    // asignar los prestados
    libro.prestados = prestados;

    // almacenar en la BD
    props.firestore
      .update({ collection: "libros", doc: libro.id }, libro)
      .then(() =>
        Swal.fire({
          position: "center",
          type: "success",
          title: "Libro Prestado",
          showConfirmButton: false,
          timer: 1400
        })
      ).then(() => props.history.push("/"));
  };

  // Almacenar el codigo en el state
  const leerDato = e => {
    guardarBusqueda({
      ...busquedaS,
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
            <i className="fas fa-book" /> {""}
            Solicitar Prestamo : {props.libro.titulo}
          </h2>
          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <form onSubmit={buscarAlumno} className="mb-4">
                <legend className="color-primary text-center">
                  Busca el Suscriptor por Código
                </legend>

                <div className="form-group">
                  <input
                    type="text"
                    name="busqueda"
                    className="form-control"
                    onChange={leerDato}
                  />
                </div>
                <input
                  value="Buscar Alumno"
                  type="submit"
                  className="btn btn-success btn-block"
                />
              </form>

              {/* Muestra la ficha del alumno y el botón para solicitar el prestamo */}
              {props.usuario.nombre ? (
                <Fragment>
                  <FichaSuscriptor alumno={props.usuario} />
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={solicitarPrestamo}
                  >
                    Solicitar Prestamo
                  </button>
                </Fragment>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
};

PrestamoLibro.propTypes = {
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
  connect(
    ({ firestore: { ordered }, usuario }, props) => ({
      libro: ordered.libro && ordered.libro[0],
      usuario: usuario
    }),
    { buscarUsuario }
  )
)(PrestamoLibro);
