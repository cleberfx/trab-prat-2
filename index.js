import { promises as fs } from 'fs';
let dataStates = [];
let dataCities = [];
// let fileName = null;
let initialState = [];
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
    jsonCities = JSON.parse(await fs.readFile('Cidades.json'));
    dataCities = jsonCities.map((city) => {
      return {
        id: city.ID,
        name: city.Nome,
        state: city.Estado,
      };
    });
  } catch (error) {}

  console.log(dataCities);
  writeJsonStates();
}

async function writeJsonStates() {
  dataStates.forEach((initState) => {
    initialState = initState.initial;
    console.log(initialState);
    fs.writeFile(`${initialState}.json`);
  });
}

