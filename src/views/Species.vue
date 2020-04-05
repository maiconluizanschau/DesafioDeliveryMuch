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
                <p>Especies</p>
            </div>
            <p class="description">
            Confira as informações completas sobre a especie selecionada abaixo
            </p>
         
        </div>
     </header>
     

        <div class = 'specDesc'>
            <h3><b>{{species.name}}</b></h3>
            <b>Classificação:</b> {{species.classification}}<br/>
            <b>Designação:</b> {{species.designation}}<br/>
            <b>Altura média:</b> {{species.average_height}}<br/>
            <b>Cor da pele:</b> {{species.skin_colors}}<br/>
            <b>Cor de cabelo:</b> {{species.hair_colors}}<br/>
            <b>Cor dos olhos:</b> {{species.eye_colors}}<br/>
            <b>Vida Média:</b> {{species.average_lifespan}}<br/>
            <b>Língua:</b> {{species.language}}<br/>
        </div>
        <router-link class = "back" to="/">Voltar</router-link>
    </div>    
</template>

<script>
import './header.scss';
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState(['species']),
        ...mapGetters([
            'getSpeciesByID'
        ]),

        species() {
            return this.getSpeciesByID(this.$route.params.id)
        }
    },   
}
</script>

<style lang="scss">
h3 {
    color: blue
}
.specDesc {
    margin-bottom: 15px;
}
.back {  
    padding: 10px 15px;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    color:white;
    background-color: green;
    font-size: 20px;  
  
    &:hover {
        color:green;
        background-color: white;
        font-size: 20px;
    }
}
</style>

