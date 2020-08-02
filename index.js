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
let addObj2 = [];
let addObjWithLength = [];
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
      

    }).sort((a, b) => 
       a.name.localeCompare(b.name)).sort((a, b) => a.name.length - b.name.length);
    
    
  } catch (error) {}
  console.log(dataCities);
  // dofilterCitiesByStates();
  // writeJsonStates();
  readJsonsCities();
  // statesMoreCities();
  // biggerNameSizeByState();
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
  let newCitiesStates = [];
  let rs = [];
  let cityname = null;
  let stateInitial = null;
  try {
    for (let StateL of dataStates) {
      // dataStates.forEach((StateL) => {
      const jsonCitiesbyStates = JSON.parse(
        await fs.readFile(`${StateL.initial}.json`)
      );
      citiesStates = jsonCitiesbyStates
        .map((c) => {
          const { id, name, state, initial } = c;
          cityname = name;
          stateInitial = initial;
          // console.log(cityname);
          return {
            name: name,

            initial: initial,
          };
        })
        .sort((a, b) => a.name.length - b.name.length)
        .slice(0, 1);

      // const p = name;
      // console.log(p);
      // let resultsl = Object(citiesStates).slice(0, 1);
      // newCitiesStates = [...citiesStates];

      // rs = [].concat{(...citiesStates)};
      // const { name, initial } = rs;
      StateL.nameC = cityname;
      StateL.inSt = stateInitial;
      // addObj2.push({ name: StateL.nameC, initial: StateL.inSt });
      // rs.sort((a, b) => a.name.length - b.name.length);
      console.log(citiesStates);
      // rs.forEach((Statex) => {
      // });
      // console.log(citiesStates);
      // addObjWithLength.push({
      //   Cities: name,
      // });
      // console.log(addObjWithLength);
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
async function biggerNameSizeByState() {
  addObjWithLength.push({
    // nameCity: c.name,
    initState: StateL.initial,
    // nameCityLength: c.name.length,
  });
  console.log(addObjWithLength);
}
