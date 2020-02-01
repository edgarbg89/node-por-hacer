const argv = require("./config/yargs.js").argv;
const porHacer = require("./por-hacer/por-hacer.js");
const color = require("colors");

let comando = argv._[0];
switch (comando) {
  case "crear":
    let tarea = porHacer.crear(argv.descripcion);
    console.log(tarea);
    break;
  case "listar":
    let listado = porHacer.getListado();
    for (let tarea of listado) {
      console.log("==========Por Hacer============".green);
      console.log(tarea.descripcion);
      console.log(`Completado: ${tarea.completado}`);
      console.log("===============================".green);
    }
    break;
  case "actualizar":
    let actualizado = porHacer.actualizarTarea(
      argv.descripcion,
      argv.completado
    );
    console.log(actualizado);
    break;
  case "borrar":
    let borrado = porHacer.borrarTarea(argv.descripcion);
    console.log(borrado);
    break;
  default:
    console.log("Comando no reconocido");
}
