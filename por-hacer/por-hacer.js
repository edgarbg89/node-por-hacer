const fs = require("fs");

let listadoPorHacer = [];

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile("./db/data.json", data, err => {
    if (err) throw new Error("Error al guardar el archivo");
  });
};

const cargarDB = () => {
  try {
    listadoPorHacer = require("../db/data.json");
  } catch (error) {
    listadoPorHacer = [];
  }
};

const crear = descripcion => {
  cargarDB();
  let porHacer = {
    descripcion,
    completado: false
  };

  listadoPorHacer.push(porHacer);
  guardarDB();
  return porHacer;
};

const getListado = () => {
  cargarDB();
  return listadoPorHacer;
};

const actualizarTarea = (descripcion, completado = true) => {
  cargarDB();
  let index = listadoPorHacer.findIndex(tarea => {
    return tarea.descripcion === descripcion;
  });

  if (index >= 0) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  } else {
    return false;
  }
};

const borrarTarea = descripcion => {
  cargarDB();

  let nuevoListado = listadoPorHacer.filter(tarea => {
    return tarea.descripcion !== descripcion;
  });

  if (nuevoListado.length != listadoPorHacer.length) {
    listadoPorHacer = nuevoListado;
    guardarDB();
    return true;
  } else {
    return false;
  }
};

module.exports = { crear, getListado, actualizarTarea, borrarTarea };
