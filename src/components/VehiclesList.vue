<template>
	<div >  		
  		<div class="panel-title">
  			<h4>Veículos:</h4> 
  		</div>
  			
  		<div class="panel-body">           
            <div v-for="(vehicle, index) in vehiclesInfo" :key="`vehicle_${index}`" >
                   {{ vehicle.name }}			
          	</div>   			
  		</div>
  	   
	</div>
</template>

<script>
  export default {
    name: 'vehiclesList',
    props: [
      'vehiclesInfo',
		],
}
  
</script>