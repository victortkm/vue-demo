<template>
    
    <div class="dashboard-div">
      <h2>Hello {{ firstName }}!</h2>
      <h1 class="page-title">Demo Dashboard</h1>
    </div>
</template>

<script>

export default {
  name: 'HomeView',
  data(){
    return{
      firstName: ''
    }
  },
  created(){
    let loginDetail = this.$store.getters.getLoginDetailData
    console.log(loginDetail)
    this.$data.firstName = loginDetail.firstName
  }
}
</script>

<style>
</style>