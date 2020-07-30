import { promises as fs } from 'fs';
let dataStates = [];
let dataCities = [];
let fileName = '';
let initialStates = [];
readjson();
writeJsonStastes();

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
  return dataStates.initial;

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
}

function writeJsonStastes() {
  try {
    initialStates = dataStates.forEach((initialState) => {
      console.log(initialState);
    });
  } catch (error) {}

  // fileName = `${dataStates.initial}.json`;
  // await fs.writeFile(fileName);
}
