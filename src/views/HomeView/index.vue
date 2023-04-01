<template>
    
    <div class="dashboard-div">
      <h2>Hello {{ firstName }}!</h2>
      <h1 class="page-title">Demo Dashboard</h1>
    </div>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  name: 'HomeView',
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data(){
    return{
      firstName: ''
    }
  },
  created(){
    let loginData = this.cookies.get('loginData')
    this.$data.firstName = loginData.firstName
  }
}
</script>

<style>
</style>