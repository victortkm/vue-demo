<template>
  <div class="mainbody">
    <h1>User Details</h1>
    <h3>{{ this.$route.fullPath }}</h3>
  </div>
</template>

<script>

export default {
  name: 'UserView',
  components: {
  },
  data() {
    return{
      hello: 'hi'
    }
  },props: {
    title: {
      type: String,
      default: 'sadffgweruibhifwehu'
    },
    img: {
      type: String,
    },
    rating: {
      type: Number,
    },
  }, mounted(){
    console.log(this.$route)
    console.log(this.$route.params)
  }
}
</script>

<style>
</style>