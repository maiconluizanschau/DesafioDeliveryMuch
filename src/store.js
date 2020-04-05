import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex);

const state = {
  films: [],
  characters: [],
  starships: [],
  planets: [],
  vehicles: [],
  species: [],
};
const getters = {

  getFilmByID: state => id => state.films.find(film => film.id === id),

  getAllCharactersIDs: state => state.characters.map(ch => ch.id),

  getAllShipsIDs: state => state.starships.map(ship => ship.id),

  getAllPlanetsIDs: state => state.planets.map(planet => planet.id),

  getAllVehiclesIDs:state => state.vehicles.map(vehicle => vehicle.id),

  getAllSpeciesIDs: state => state.species.map(sp => sp.id),

  getSpeciesByID: state => id => state.species.find(sp => sp.id === id),

  getCharacterByID: state => id => state.characters.find(ch => ch.id === id),

};

const mutations = {
  setFilms: (state, payload) => (state.films = payload),
  setCharacters: (state, payload) => (state.characters = [...state.characters, ...payload]),
  setShips: (state, payload) => (state.starships = [...state.starships, ...payload]),
  setPlanets: (state, payload) => (state.planets = [...state.planets, ...payload]),
  setVehicles: (state, payload) => (state.vehicles = [...state.vehicles, ...payload]),
  setSpecies: (state, payload) => (state.species = [...state.species, ...payload]),  
};

const actions = {
  async getFilms ({state, commit}) {
    const {data} = await axios.get("https://swapi.co/api/films/");
    data.results.map(film => {
      let parse_url = film.url.split('/');
      film.id = parse_url[parse_url.length - 2];        
    });
    console.log(data.results);
    commit('setFilms', data.results) 
  },

  async getCharacters ({state, commit}, charactersID) {   
    let chDetails = [];
    for (let ch of charactersID) {
      const {data} = await axios.get("https://swapi.co/api/people/" + ch + "/")
      chDetails.push(data) 
      chDetails.map(character => {
        let parse_url = character.url.split('/');
        character.id = parse_url[parse_url.length - 2];
      })         
    }
    commit('setCharacters', chDetails)    
  },

  async getShips ({state, commit}, shipsID) {   
    let shipDetails = [];
    for (let ship of shipsID) {
      const {data} = await axios.get("https://swapi.co/api/starships/" + ship + "/")
      shipDetails.push(data) 
      shipDetails.map(sh => {
        let parse_url = sh.url.split('/');
        sh.id = parse_url[parse_url.length - 2];
      })         
    }
    commit('setShips', shipDetails)    
  },

  async getPlanets ({state, commit}, planetsID) {   
    let planetDetails = [];    
    console.log("Planets ID " + planetsID);
    for (let planet of planetsID) {
      const {data} = await axios.get("https://swapi.co/api/planets/" + planet + "/")
      planetDetails.push(data) 
      planetDetails.map(pl => {
        let parse_url = pl.url.split('/');
        pl.id = parse_url[parse_url.length - 2];
      })         
    }
    commit('setPlanets', planetDetails)    
  },

  async getVehicles ({state, commit}, vehiclesID) {   
    let vehicleDetails = [];    
    for (let vehicle of vehiclesID) {
      const {data} = await axios.get("https://swapi.co/api/vehicles/" + vehicle + "/")
      vehicleDetails.push(data) 
      vehicleDetails.map(vh => {
        let parse_url = vh.url.split('/');
        vh.id = parse_url[parse_url.length - 2];
      })         
    }
    commit('setVehicles',vehicleDetails)    
  },

  async getSpecies ({state, commit}, speciesID) {   
    let speciesDetails = [];    
    for (let sp of speciesID) {
      const {data} = await axios.get("https://swapi.co/api/species/" + sp + "/")
      speciesDetails.push(data) 
      speciesDetails.map(spec => {
        let parse_url = spec.url.split('/');
        spec.id = parse_url[parse_url.length - 2];
      })         
    }
    commit('setSpecies', speciesDetails)    
  },
  
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,  
})
