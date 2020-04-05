<template>
  <div>
    
	
     <header class="header">
        <div class="logo">
            <img src="@/assets/logo.png" alt="Logo">
        </div>
          <div class="centered-text">
            <div class="heading">
                <div class="logo">
                  <img src="@/assets/logo.png" alt="Logo">  
                </div>
                <p>Filmes</p>
            </div>
            <p class="description">
            Confira as informações completas sobre esse filme abaixo
            </p>
         
        </div>
     </header>
     
        <h3><b>{{film.title}}</b></h3>
        <p v-if="film.director">
        <b>Diretor:</b> {{film.director}}<br/>
        <b>Lançamento:</b> {{film.release_date}}<br/>
        </p>     
        <div class = "crawl">
          {{film.opening_crawl}}
        </div>   
        <div class="characters">
	  	      <character-list :details="characterDetails"></character-list>
	      </div>

        <div class="wrapper">
          <div class="row">
            <div class = "col" >     
              <ships-list :shipsInfo="shipsInfo"></ships-list>  
            </div>            
                  
            <div class = "col">
              <planets-list :planetsInfo="planetsInfo"></planets-list>          
            </div>

            <div class = "col" v-if ='film.vehicles && film.vehicles.length > 0' >
              <vehicles-list :vehiclesInfo="vehiclesInfo"></vehicles-list>         
            </div>
          </div>
        </div>
        
        <div class="row">
	  	      <species-list :speciesInfo="speciesDetails"></species-list>
	      </div>
        <p/>
        <router-link class = "back" to="/">Voltar</router-link>
	
  </div>
  
</template>

<script>
import './header.scss';
import axios from 'axios';
import { mapState, mapGetters} from 'vuex';
import CharacterList from '@/components/CharacterList';
import SpeciesList from '@/components/SpeciesList';
import ShipsList from '@/components/StarshipsList';
import VehiclesList from '@/components/VehiclesList';
import PlanetsList from '@/components/PlanetsList';
export default { 
  components: {    
      CharacterList, 
      SpeciesList, 
      ShipsList,
      VehiclesList,
      PlanetsList
  },

  computed: {
    ...mapState(['films', 'characters', 'starships', 'planets', 'vehicles', 'species']),
    ...mapGetters([
      'getFilmByID',
      'getAllCharactersIDs',
      'getAllShipsIDs',
      'getAllPlanetsIDs',
      'getAllVehiclesIDs',
      'getAllSpeciesIDs',
    ]),

    film() {
      return this.getFilmByID(this.$route.params.id)
    },

    characterDetails() {
      return this.characters.filter(
        ch => this.film.characters.includes(ch.url)
      )
    },

    shipsInfo() {
      return this.starships.filter(
        ship => this.film.starships.includes(ship.url)
      )
    },

    planetsInfo() {
      return this.planets.filter(
        planet => this.film.planets.includes(planet.url)
      )
    },

    vehiclesInfo() {
      return this.vehicles.filter(
        vehicle => this.film.vehicles.includes(vehicle.url)
      )
    },

    speciesDetails() {
      return this.species.filter(
        sp => this.film.species.includes(sp.url)
      )
    },


    currentFilmCharactersIDs() {
      return this.film.characters.map(
        url => {
          let parse_url = url.split('/');
          let ch_id = parse_url[parse_url.length - 2]; 
          return ch_id              
        }
      )
    },

    nonInCharactersIDs() {
        return this.currentFilmCharactersIDs.filter(
        id => !this.getAllCharactersIDs.includes(id)
      )
    },

    currentFilmShipsIDs() {
      return this.film.starships.map(
        url => {
          let parse_url = url.split('/');
          let ship_id = parse_url[parse_url.length - 2]; 
          return ship_id              
        }
      )
    },

    nonInShipsIDs() {
      return this.currentFilmShipsIDs.filter(
        id => !this.getAllShipsIDs.includes(id)
      )
    },

    currentFilmPlanetsIDs() {
      return this.film.planets.map(
        url => {
          let parse_url = url.split('/');
          let planet_id = parse_url[parse_url.length - 2]; 
          return planet_id              
        }
      )
    },

    nonInPlanetsIDs() {
      return this.currentFilmPlanetsIDs.filter(
        id => !this.getAllPlanetsIDs.includes(id)
      )
    },
    currentFilmVehiclesIDs() {
      return this.film.vehicles.map(
        url => {
          let parse_url = url.split('/');
          let vehicle_id = parse_url[parse_url.length - 2]; 
          return vehicle_id              
        }
      )
    },
    
    nonInVehiclesIDs() {
      return this.currentFilmVehiclesIDs.filter(
        id => !this.getAllVehiclesIDs.includes(id)
      )
    },

    currentFilmSpeciesIDs() {
      return this.film.species.map(
        url => {
          let parse_url = url.split('/');
          let species_id = parse_url[parse_url.length - 2]; 
          return species_id              
        }
      )
    },

    nonInSpeciesIDs() {      
      return this.currentFilmSpeciesIDs.filter(
        id => !this.getAllSpeciesIDs.includes(id)
      )
    },

  },
  
  async created() {
    if(this.nonInCharactersIDs.length > 0) {    
      this.$store.dispatch('getCharacters', this.nonInCharactersIDs)
    }
    if(this.nonInShipsIDs.length > 0) {  
      this.$store.dispatch('getShips', this.nonInShipsIDs)
    }
    if(this.nonInPlanetsIDs.length > 0) {
      console.log('Non ' + this.nonInPlanetsIDs); 
      this.$store.dispatch('getPlanets', this.nonInPlanetsIDs)
    }
    if(this.nonInVehiclesIDs.length > 0) {
      this.$store.dispatch('getVehicles', this.nonInVehiclesIDs)
    }
    if(this.nonInSpeciesIDs.length > 0) {
    this.$store.dispatch('getSpecies', this.nonInSpeciesIDs)
    }
  }  
}
</script>

<style lang="scss">
h3 {
  color: blue;
}

.wrapper {
  max-width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0px 15px ;
  text-align: center;  
}

.wrapper .col {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.crawl {
  margin: 10px;
  text-align: justify;
}

.back {  
  padding: 10px 15px;
  border: 1px solid whitesmoke;
  border-radius: 5px;
  color:white;
  background-color: blue;
  font-size: 20px;  
  
  &:hover {
    color:green;
    background-color: white;
    font-size: 20px;
  }
}
</style>
