<template>
	<div class="col">
  		<div class="panel panel-success">
  			<div class="panel-heading">
  				<div class="panel-title">
  					<h4>Filmes:</h4> 
  				</div>
  			</div>
  			<div class="panel-body">  				     
                <div v-for="(film, index) in filmsInfo" :key="`film_${index}`" >
                    {{ film.title }}			
                </div>    
          	</div>  			
  		</div>
  	</div>
</template>
<script>

  export default {
    name: 'filmAppeared',
    props: [
      'filmsInfo',
		],
}
  
</script>