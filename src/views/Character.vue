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
                <p>Personagens</p>
            </div>
            <p class="description">
            Confira as informações completas sobre o personagem abaixo
            </p>
         
        </div>
     </header>
      <div class = 'desc'>
        <h3><b>{{character.name}}</b></h3>        
        <b>Altura:</b> {{character.height}}<br/>
        <b>Massa:</b> {{character.mass}}<br/>
        <b>Data de nascimento:</b> {{character.birth_year}}<br/>
        <b>Cor de Cabelo:</b> {{character.hair_color}}<br/>
        <b>Cor de pele:</b> {{character.skin_color}}<br/>
        <b>Cor de Cabelo:</b> {{character.eye_color}}<br/>
        <b>Planeta Natal:</b> {{homeInfo}}<br/>
      </div>

      <div  v-if ='character.species && character.species.length > 0' class = "col" >            
        <h4>Esp:</h4>      
          <div v-for="(species, index) in speciesInfo" :key="`species_${index}`" >
            {{ species.name }}			
          </div>        
         
        <div class = "filmApp">  
          <films-list :filmsInfo="filmsInfo"></films-list>            
        </div> 

        <div v-if ='character.vehicles && character.vehicles.length > 0' class = "vehicle">            
          <vehicles-list :vehiclesInfo="vehiclesInfo"></vehicles-list>         
        </div>

        <div v-if ='character.starships && character.starships.length > 0' class = "ship">            
          <ships-list :shipsInfo="shipsInfo"></ships-list>       
        </div>   
      </div>  
      <router-link class = "back" to="/">Voltar</router-link>
  </div>
</template>


<script>
import './header.scss';
import axios from 'axios';
import { mapState, mapGetters} from 'vuex';
import FilmsList from '@/components/FilmAppeared';
import VehiclesList from '@/components/VehiclesList';
import ShipsList from '@/components/StarshipsList'
export default {
  components: {
    FilmsList,
    VehiclesList,
    ShipsList,     
  },

  computed: {
    ...mapState(['characters', 'planets', 'species', 'films', 'vehicles', 'starships']),
    ...mapGetters([
      'getCharacterByID',
      'getAllPlanetsIDs',
      'getAllSpeciesIDs',
      'getAllVehiclesIDs',
      'getAllShipsIDs'
    ]),

    character(){
      return this.getCharacterByID(this.$route.params.id)
    },

    homeInfo() {  
      let pl = this.planets.filter(
        planet => this.character.homeworld.includes(planet.url)
      )
      if (pl.length > 0) {
        return pl[0].name
      }       
    },

    speciesInfo() {
      return this.species.filter(
        sp => this.character.species.includes(sp.url)
      )
    },

    filmsInfo(){
      return this.films.filter(
        film => this.character.films.includes(film.url)
      )
    },

    vehiclesInfo() {
      return this.vehicles.filter(
        vehicle => this.character.vehicles.includes(vehicle.url)
      )
    },

    shipsInfo() {
      return this.starships.filter(
        ship => this.character.starships.includes(ship.url)
      )
    },

    currentCharacterPlanetsIDs() {
      let parse_url = this.character.homeworld.split('/');
      let planet_id = parse_url[parse_url.length - 2]; 
      return planet_id;    
    },

    nonInPlanetsIDs() {
      return this.getAllPlanetsIDs.includes(this.currentCharacterPlanetsIDs) ? [] : [this.currentCharacterPlanetsIDs];
    },

    currentCharacterSpeciesIDs() {
      return this.character.species.map(
        url => {
          let parse_url = url.split('/');
          let species_id = parse_url[parse_url.length - 2]; 
          return species_id              
        }
      )
    },

    nonInSpeciesIDs() {      
      return this.currentCharacterSpeciesIDs.filter(
        id => !this.getAllSpeciesIDs.includes(id)
      )
    },

    currentCharacterVehiclesIDs() {
      return this.character.vehicles.map(
        url => {
          let parse_url = url.split('/');
          let vehicle_id = parse_url[parse_url.length - 2]; 
          return vehicle_id              
        }
      )
    },
    
    nonInVehiclesIDs() {
      return this.currentCharacterVehiclesIDs.filter(
        id => !this.getAllVehiclesIDs.includes(id)
      )
    },

    currentCharacterShipsIDs() {
      return this.character.starships.map(
        url => {
          let parse_url = url.split('/');
          let ship_id = parse_url[parse_url.length - 2]; 
          return ship_id              
        }
      )
    },

    nonInShipsIDs() {
      return this.currentCharacterShipsIDs.filter(
        id => !this.getAllShipsIDs.includes(id)
      )
    },

  },
  
  async created() {

    if(this.nonInPlanetsIDs.length > 0) {
      this.$store.dispatch('getPlanets', this.nonInPlanetsIDs)
    }

    if(this.nonInSpeciesIDs.length > 0) {
      this.$store.dispatch('getSpecies', this.nonInSpeciesIDs)
    }

    if(this.nonInVehiclesIDs.length > 0) {
      this.$store.dispatch('getVehicles', this.nonInVehiclesIDs)
    }

    if(this.nonInShipsIDs.length > 0) {  
      this.$store.dispatch('getShips', this.nonInShipsIDs)
    }    
  }
}   
</script>

<style lang="scss">
h3 {
  color: blue
}
.filmApp, .ship, .vehicle{
  margin-top:15px;
  margin-bottom: 10px;
}
.desc {
  margin-bottom: 10px;
}

.back {  
  padding: 10px 15px;
  border: 1px solid whitesmoke;
  border-radius: 5px;
  color:white;
  background-color: green;
  font-size: 20px; 
  margin-top: 15px; 
  
  &:hover {
    color:green;
    background-color: white;
    font-size: 20px;
  }
}
</style>
