<template>
  <!-- <v-toolbar title=" cassccas">
      <v-btn icon>
        <v-icon icon="mdi-minus" size="small"></v-icon>
      </v-btn>
    </v-toolbar> -->

  <main class="background"></main>
  <nav class="temp-nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/userListing">User Listing</router-link> |
    <router-link to="/userDetails">User Details</router-link> |
    <router-link to="/groupListing">Group Listing</router-link> |
    <router-link to="/groupDetails">Group Details</router-link> |
    <router-link to="/settings">Settings</router-link>
    <!-- <v-btn @click="increment">Hi
      <v-icon icon="mdi-minus" size="small"></v-icon>
    </v-btn> -->
  </nav>
  <router-view/>
</template>

<script>
import './style/style.css'
export default {
  
  methods: {
    increment() {
      console.log('hi')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  /* background-color: red; */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body {
  margin: 0px
}

html {
  background-color: lightgray;
  background: rgb(52,0,130);
  background: linear-gradient(135deg, rgba(52,0,130,1) 0%, rgba(58,54,189,1) 50%, rgba(0,171,187,1) 100%);
  background-size: 100vw 100vh;
}

.temp-nav {
  background-color: white;
}
</style>
