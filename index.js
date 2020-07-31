import { promises as fs } from 'fs';
let dataStates = [];
let dataCities = [];
// let fileName = null;
let initialState = [];
let idsState = [];
let citiesByStates = [];
// start();
// async function start() {
readjson();
// }

async function readjson() {
  try {
    const jsonStates = JSON.parse(await fs.readFile('Estados.json'));
    dataStates = jsonStates.map((states) => {
      return {
        id: states.ID,
        name: states.Nome,
        initial: states.Sigla,
      };
    });
  } catch (error) {}

  console.log(dataStates);

  try {
    const jsonCities = JSON.parse(await fs.readFile('Cidades.json'));
    dataCities = jsonCities.map((city) => {
      return {
        id: city.ID,
        name: city.Nome,
        state: city.Estado,
      };
    });
  } catch (error) {}

  console.log(dataCities);

  // dofilterCitiesByStates();
  writeJsonStates();
}

function writeJsonStates() {
  // dofilterCitiesByStates();
  dataStates.forEach((State) => {
    console.log(State.initial, State.id);
    citiesByStates = dataCities.filter((cityStates) => {
      return cityStates.state === State.id;
    });
    console.log(citiesByStates);
    fs.writeFile(`${State.initial}.json`, JSON.stringify(citiesByStates));
  });
}
function dofilterCitiesByStates() {
  dataStates.forEach((idState) => {
    idsState = idState.id;
    console.log(idState.id, idState.initial);

    citiesByStates = dataCities.filter((cityStates) => {
      return cityStates.state === idsState;
    });
    console.log(citiesByStates);
  });
}
