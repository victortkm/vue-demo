<template>

  <main class="background"></main>

  <!-- <nav class="temp-nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/pendApprListing">Pending Approval Listing</router-link> |
    <router-link to="/pendApprDetails">Pending Approval Details</router-link> |
    <router-link to="/userListing">User Listing</router-link> |
    <router-link to="/userDetails">User Details</router-link> |
    <router-link to="/groupListing">Group Listing</router-link> |
    <router-link to="/groupDetails">Group Details</router-link> |
    <router-link to="/settings">Settings</router-link>
  </nav> -->

    <!-- <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        rail-width="100"
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

  <v-layout>
    <v-app-bar
      color="indigo-lighten-5"
      prominent
      v-if="renderNavBar()"
    >
      <v-app-bar-nav-icon   :variant="drawer ? text : arrow" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title  >Demo App</v-toolbar-title>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="left"
      temporary
      class="navbar"
    >
      <button
        v-for="item in NavRoutes"
        :key="item.link"
        @click="go(item)"
        class="nav-menu"
        :class=getIsSelectedRoute(item)
        >
        <v-icon :icon='item.icon'/>
        <v-list
          class='nav-menu-title'
          >
          {{ item.title }}
        </v-list>

      </button>

      <button
        class="nav-menu-logout"
        @click="onLogout"
      >
        <v-icon icon="mdi-logout"/>
        <v-list class='nav-menu-title'>
          Logout
        </v-list>
      </button>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-layout>

 
</template>

<script>
import './style/style.css'
import { NavRoutes } from './router/index'
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Account', icon: 'mdi-account-box' },
      { title: 'Settings', icon: 'mdi-cog' },
    ],
    drawer: false,
    routerItems: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', link:"/", name: '' },
      { title: 'Pending Approval Listing', icon: 'mdi-view-dashboard', link:"/pendApprListing" },
      { title: 'User Listing', icon: 'mdi-view-dashboard', link:"/userListing" },
      { title: 'Group Listing', icon: 'mdi-view-dashboard', link:"/groupListing" },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', link:"/" },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', link:"/" },
    ],
    NavRoutes: NavRoutes,
    optionVisible: false
  }),
  
  methods: {
    go(item) {
      console.log(item)
      this.$router.push({ name: item.name })
    },
    getIsSelectedRoute(item){
      if(item.path == this.$route.path){
        return 'selected-nav-menu'
      }
      return 'nav-menu'
    },
    onOptionNav() {
      this.$data.optionVisible = !this.$data.optionVisible
    },
    onClick() {
      if(this.$data.optionVisible == true){
      this.$data.optionVisible = false
      }
    },
    onLogout(){
      this.cookies.set('loginData',{
          userName: '',
          functionIds: [],
          firstName: ''
        });
      this.$router.push({ name: 'login' })
    },
    renderNavBar(){
      if(this.$route.meta && this.$route.meta.disableNavBar){
        return false
      }
      return true

    }
  },
  mounted(){
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
