import React from "react";

const NotFound = () => {
  return (
    <div className="d-flex flex-column pt-5">
      <div className="align-self-center">
        <h1 className="">Ruta incorrecta</h1>
        <div className="text-center">
          <div class="spinner-grow text-primary" role="status" />
          <div class="spinner-grow text-secondary" role="status" />
          <div class="spinner-grow text-success" role="status" />
          <div class="spinner-grow text-danger" role="status" />
          <div class="spinner-grow text-warning" role="status" />
          <div class="spinner-grow text-info" role="status" />
          <div class="spinner-grow text-light" role="status" />
          <div class="spinner-grow text-dark" role="status" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
