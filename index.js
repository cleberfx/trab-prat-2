import { promises as fs } from 'fs';
let dataStates = [];
let dataCities = [];

let initialState = [];
let idsState = [];
let citiesByStates = [];
let jsonCitiesbyStates = [];
let citiesStates = [];
let addObj = [];
let addObj2 = [];
let addObjWithLength = [];

readjson();

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

  try {
    const jsonCities = JSON.parse(await fs.readFile('Cidades.json'));
    dataCities = jsonCities.map((city) => {
      const { ID, Nome, Estado } = city;
      return {
        id: ID,
        name: Nome,
        state: Estado,
      };
    });
  } catch (error) {}

  // writeJsonStates();
  // numberCitiesByState();
  // moreCitiesByState();
  // lessCitiesByState();
  // bigCityNameByState();
  // smallCityNameByState();
  bigCityName();
  // smallCityName();
}

function writeJsonStates() {
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

async function numberCitiesByState() {
  try {
    for (let StateL of dataStates) {
      // dataStates.forEach((StateL) => {
      const jsonCitiesbyStates = JSON.parse(
        await fs.readFile(`${StateL.initial}.json`)
      );
      citiesStates = jsonCitiesbyStates.map((c) => {
        const { initial } = c;

        return {
          initial: initial,
        };
      });

      console.log(StateL.initial, citiesStates.length);
    }
  } catch (error) {}

  // console.log(citiesByStates);
}

async function lessCitiesByState() {
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
      addObj.push({ init: StateL.initial, quant: citiesStates.length });
      // console.log(citiesStates);
    }
  } catch (error) {}

  addObj.sort((a, b) => a.quant - b.quant).slice(0, 5);

  let resultslice = Object(addObj).slice(0, 5);

  console.log(resultslice);
}

async function moreCitiesByState() {
  try {
    for (let StateL of dataStates) {
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
      addObj.push({ init: StateL.initial, quant: citiesStates.length });
    }
  } catch (error) {}

  addObj.sort((a, b) => b.quant - a.quant).slice(0, 5);

  let resultslice = Object(addObj).slice(0, 5);

  console.log(resultslice);
}
async function smallCityNameByState() {
  try {
    for (let StateL of dataStates) {
      const jsonCitiesbyStates = JSON.parse(
        await fs.readFile(`${StateL.initial}.json`)
      );
      citiesStates = jsonCitiesbyStates
        .map((c) => {
          const { name, initial } = c;

          return {
            name: name,

            initial: initial,
          };
        })
        .sort((a, b) => a.name.length - b.name.length)
        .slice(0, 1);

      console.log(citiesStates);
    }
  } catch (error) {}
}

async function smallCityName() {
  try {
    const jsonCities = JSON.parse(await fs.readFile('Cidades.json'));
    let smallCityNameData = jsonCities
      .map((city) => {
        const { ID, Nome, Estado } = city;
        return {
          id: ID,
          name: Nome,
          state: Estado,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, 3);

    console.log(smallCityNameData);
  } catch (error) {}
}
async function bigCityName() {
  try {
    const jsonCities = JSON.parse(await fs.readFile('Cidades.json'));
    let bigCityNameData = jsonCities
      .map((city) => {
        const { ID, Nome, Estado } = city;
        return {
          id: ID,
          name: Nome,
          state: Estado,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => b.name.length - a.name.length)
      .slice(0, 3);

    console.log(bigCityNameData);
  } catch (error) {}
}
async function bigCityNameByState() {
  try {
    for (let StateL of dataStates) {
      const jsonCitiesbyStates = JSON.parse(
        await fs.readFile(`${StateL.initial}.json`)
      );
      citiesStates = jsonCitiesbyStates
        .map((c) => {
          const { name, initial } = c;

          return {
            name: name,

            initial: initial,
          };
        })
        .sort((a, b) => b.name.length - a.name.length)
        .slice(0, 1);

      console.log(citiesStates);
    }
  } catch (error) {}
}
