require("dotenv").config();
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt;

  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //mostrar mensaje
        const busqueda = await leerInput("Ciudad");

        //buscar los lugares
        const lugares = await busquedas.buscarCiudades(busqueda);

        //seleccionar los lugares
        const id = await listarLugares(lugares);
        const lugarSel = lugares.find((lugar) => lugar.id === id);

        //clima
        if (lugarSel) {
          busquedas.agregarHistorial(lugarSel.nombre);
          const clima = await busquedas.climaPorLugar(
            lugarSel.lat,
            lugarSel.lng
          );
          //mostrar resultados

          console.log("\ninformación de la ciudad\n");
          console.log("Ciudad:", lugarSel.nombre);
          console.log("Lat:", lugarSel.lat);
          console.log("Lng:", lugarSel.lng);
          console.log("Temperatura:", clima.temp, "ºC");
          console.log("Nubes:", clima.desc);
          console.log("Minima:", clima.min, "ºC");
          console.log("Maxima:", clima.max, "ºC");
        }

        break;

      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const index = `${i + 1}.`.green;
          console.log(`${index} ${lugar}`);
        });
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
