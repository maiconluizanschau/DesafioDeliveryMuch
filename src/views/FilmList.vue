<template>
	<div>
	 <header>
     <header class="header">
        <div class="logo">
            <img src="@/assets/logo.png" alt="Logo">
        </div>
        <div class="centered-text">
            <div class="heading">
                <div class="logo">
                  <img src="@/assets/logo.png" alt="Logo">  
                </div>
                <p>Diretório</p>
            </div>
            <p class="description">
              Desafio proposta para a vaga de desenvolvedor Fron-End na Empresa Delivery Much onde você irá encontrar seus personagens, filmes, espécies, naves espaciais e planetas favoritos.
            </p>
         
        </div>
     </header>
		<main class="homepage">
			<section class="starships">
				<h2 class="title">Filmes da Série Start Warks</h2>
         <p class="description">
              Abaixo você encontrará os filmes da série start wars
            </p>
				<hr class="title-hr">
                <div class="cards">
                    <div class="card" v-for="film in films" :key="film.episode_id">
                        <div class="image">
                            <img src="@/assets/character-3.jpg" alt="starship">
                        </div>
                        		<router-link :to="{ name:'film', params:{id:film.id} }">Filme:{{ film.title }}
                        <div class="info">
                            <h3 class="name">
                               <i class="fas fa-arrow-right">
                                 Para acessar mais informações sobre esse filme clique no título do mesmo
                                 </i>
                                 </h3>
                        </div>
                        		</router-link>
                    </div>

                </div>
			</section>    
		</main>
	 </header>
</div>
</template>

<script>
import './home.scss';
import './header.scss';
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['films'])
  },
  
  
  async created() {
    if (this.films.length !== 0) return;
    this.$store.dispatch('getFilms')
  }  
}
</script>
