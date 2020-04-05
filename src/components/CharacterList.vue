<template>
	<div class="col">
  		<div class="panel panel-success">
  			<div class="panel-heading">
  				<div class="panel-title">
  					<h4>Personagens</h4>
  				</div>
  			</div>
  			<div class="panel-body">
  				<div v-for="(characterDetail, index) in details"  :key="index">
          			<router-link :to="{ name:'character', params:{id:characterDetail.id} }">{{ characterDetail.name }}</router-link>				
  				</div>
  			</div>
  		</div>
  	</div>
</template>

<script>
  export default {
    name: 'characterList',
    props: [
      'details',
		],
}
  
</script>