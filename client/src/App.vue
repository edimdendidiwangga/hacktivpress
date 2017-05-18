<template>
  <div id="app">
		<navbar></navbar>
    	<router-view></router-view>
		<navfooter></navfooter>
  </div>
</template>

<script>
export default {
  name: 'app',
	data() {
		return {
			msg : ''
		}
	}
}
</script>

<style>

</style>
