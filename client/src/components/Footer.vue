<template>
	<div class="ui teal three item inverted menu vertical footer segment form-page">
  	<div class="ui container">
        HacktivPress 2017. All Rights Reserved
    </div>
	</div>
</template>

<script>
export default {
  name: 'navfooter',
  data () {
    return {

    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-height: 320px) {
  .ui.footer.form-page { /* Increased specificity for SO snippet priority */
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
