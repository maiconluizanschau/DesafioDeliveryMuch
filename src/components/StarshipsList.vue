<template>
	<div>  			
  		<div class="panel-title">
  			<h4>StarShips:</h4> 
  		</div>
  			
  		<div class="panel-body">  	
            <div v-for="(ship, index) in shipsInfo" :key="`ship_${index}`" >
                   {{ ship.name }}		  
          	</div>                  
        </div>  	
  		
  	</div>
</template>

<script>
  export default {
    name: 'starshipsList',
    props: [
      'shipsInfo',
		],
}
  
</script>