import { promises as fs } from 'fs';
let dataStates = [];
let dataCities = [];
// let fileName = null;
let initialState = [];
let idsState = [];
let citiesByStates = [];
let jsonCitiesbyStates = [];
let citiesStates = [];
let addObj = [];
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

  // console.log(dataStates);
  // prettier-ignore
  try {
    const jsonCities = JSON.parse(await fs.readFile('Cidades.json'));
    dataCities = jsonCities.map(city => {
      const { ID, Nome, Estado } = city;
      return {
        id: ID,
        name: Nome,
        state: Estado,
      };
      

    });
    
    
  } catch (error) {}
  // console.log(dataCities.length);
  // dofilterCitiesByStates();
  // writeJsonStates();
  readJsonsCities2();
  // statesMoreCities();
}

function writeJsonStates() {
  // dofilterCitiesByStates();
  dataStates.forEach((State) => {
    console.log(State.initial, State.id);
    citiesByStates = dataCities.filter((cityStates) => {
      cityStates.initial = State.initial;

      return cityStates.state === State.id;
    });
    console.log(citiesByStates);
    fs.writeFile(`${State.initial}.json`, JSON.stringify(citiesByStates));
  });
}
// function dofilterCitiesByStates() {
//   dataStates.forEach((idState) => {
//     idsState = idState.id;
//     console.log(idState.id, idState.initial);

//     citiesByStates = dataCities.filter((cityStates) => {
//       return cityStates.state === idsState;
//     });
//     console.log(citiesByStates);
//   });
// }
async function readJsonsCities() {
  try {
    for (let StateL of dataStates) {
      // dataStates.forEach((StateL) => {
      const jsonCitiesbyStates = JSON.parse(
        await fs.readFile(`${StateL.initial}.json`)
      );
      citiesStates = jsonCitiesbyStates.map((c) => {
        return {
          id: c.id,
          name: c.name,
          state: c.state,
          initial: c.initial,
        };
      });
      StateL.quantCities = citiesStates.length;
      fs.appendFile(
        `${StateL.initial}.json`,
        JSON.stringify(StateL.quantCities)
      );
      // let r = `${citiesStates} - ${citiesStates.length}`;
      // console.log(r);
      // });
      console.log(citiesStates);
    }
  } catch (error) {}

  // console.log(citiesByStates);
  // statesMoreCities();
}

async function readJsonsCities2() {
  try {
    for (let StateL of dataStates) {
      // dataStates.forEach((StateL) => {
      const jsonCitiesbyStates = JSON.parse(
        await fs.readFile(`${StateL.initial}.json`)
      );
      citiesStates = jsonCitiesbyStates.map((c) => {
        return {
          id: c.id,
          name: c.name,
          state: c.state,
          initial: c.initial,
          // length: c.length,
        };
      });
      addObj.push({ init: StateL.initial, quant: citiesStates.length });
      // console.log(citiesStates);
    }
  } catch (error) {}
  console.log(addObj);
  addObj.sort((a, b) => a.quant - b.quant);
  let resultslice = Object.keys(addObj)
    .slice(0, 5)
    .map((key) => ({ [key]: addObj[key] }));
  console.log(resultslice);
  addObj.sort((a, b) => b.quant - a.quant).slice(0, 5);

  resultslice = Object(addObj).slice(0, 5);

  console.log(resultslice);
}
