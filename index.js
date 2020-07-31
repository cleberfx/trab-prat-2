import { promises as fs } from 'fs';
let dataStates = [];
let dataCities = [];
// let fileName = null;
let initialState = [];
let idsState = [];
let citiesByStates = [];
// let jsonCitiesbyStates = [];
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

  // console.log(dataCities);

  // dofilterCitiesByStates();
  writeJsonStates();
  // readJsonsCities();
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
    // dataStates.forEach((StateL) => {
    for (let StateL of dataStates) {
      // console.log(StateL.initial);
      // StateL.initS = StateL.initial;
      const jsonCitiesbyStates = JSON.parse(
        await fs.readFile(`${StateL.initial}.json`)
      );
      citiesByStates = jsonCitiesbyStates;
      citiesByStates.forEach((city) => {
        city.stateInit = StateL.initial;
        // console.log(city.stateInit, citiesByStates.length);
      });
      // console.log(citiesByStates.stateInit);
      // let j = citiesByStates;
      // j.sort((a, b) => {
      //   return a.length.localeCompare(b.length);
      // });
      // console.log(j);
    }
    return citiesByStates;
    // console.log(citiesByStates);
    // });
  } catch (error) {}
  statesMoreCities();
}

function statesMoreCities() {
  console.log(citiesByStates);

  // citiesByStates.forEach((statesort) => {
  //   console.log(statesort.length);
  //   citiesByStates.sort((a, b) => {
  //     return b - a;
  //   });
  // });
}
