<template>
	<div class="col">
  		<div class="panel panel-success">
  			<div class="panel-heading">
  				<div class="panel-title">
  					<h4>Espécies</h4>
  				</div>
  			</div>
  			<div class="panel-body">
  				<div v-for="(species, index) in speciesInfo" :key="`species_${index}`"   >
                    <router-link :to="{ name:'species', params:{id:species.id} }">{{ species.name }}</router-link>				
                   			
          		</div>
  			</div>
  		</div>
  	</div>
</template>

<script>
  export default {
    name: 'speciesList',
    props: [
      'speciesInfo',
		],
}
  
</script>

<style lang="scss">
.col {
  margin-top: 20px;
  margin-bottom: 2px;
}

</style>