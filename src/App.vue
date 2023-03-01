<template>
  <!-- <v-toolbar title=" cassccas">
      <v-btn icon>
        <v-icon icon="mdi-minus" size="small"></v-icon>
      </v-btn>
    </v-toolbar> -->

  <main class="background"></main>
  <nav class="temp-nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/pendApprListing">Pending Approval Listing</router-link> |
    <router-link to="/pendApprDetails">Pending Approval Details</router-link> |
    <router-link to="/userListing">User Listing</router-link> |
    <router-link to="/userDetails">User Details</router-link> |
    <router-link to="/groupListing">Group Listing</router-link> |
    <router-link to="/groupDetails">Group Details</router-link> |
    <router-link to="/settings">Settings</router-link>
    <!-- <v-btn @click="increment">Hi
      <v-icon icon="mdi-minus" size="small"></v-icon>
    </v-btn> -->
  </nav>

    <!-- <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

    </v-layout>
  </v-card> -->
 
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
