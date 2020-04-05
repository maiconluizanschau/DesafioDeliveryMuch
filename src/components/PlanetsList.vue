<template>
	<div>
  		<div class="panel-heading">
  			<div class="panel-title">
  				<h4>Planetas:</h4>   
  			</div>
  		</div>
  		<div class="panel-body">
  			<div v-for="(planets, index) in planetsInfo" :key="`planets_${index}`">
                {{ planets.name }}			
          	</div>
  		</div>
  		
  	</div>
</template>

<script>
  export default {
    name: 'planetsList',
    props: [
      'planetsInfo',
		],
}
  
</script>