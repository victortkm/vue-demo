<template>
  <div class="login-container">

      <h1 style="padding-bottom: 20px">Login</h1>

      <v-text-field
        label="User Name"
        density="comfortable"
        variant="outlined"
        clearable
        v-model="userName"
        />
      <v-text-field
        label="Password"
        density="comfortable"
        variant="outlined"
        clearable
        type='password'
        v-model="password"
        />
        <v-btn
          class="btn-login" 
          variant="outlined"
          size="x-large"
         @click="login()">
          Login
          <v-icon style="padding-left: 30px;" icon="mdi-login"/>
        </v-btn>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  name: 'UserListView',
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
  },
  data() {
    return {
      userName: '',
      password: '',
    }
  },
  mounted(){
  },
  methods: {
    login(){
      this.axios.post("user/login", {
        userName: this.$data.userName,
        password: this.$data.password,
      }).then((response)=> {
        console.log(response.data)
        if(response.data.result == true){
          let object = response.data.data
          // FOR DEMO ONLY!!!
          object.password = this.$data.password
          this.cookies.set("loginData", object);
          this.$router.push({ name: 'home' })
        }
      })
    }
  }
}
</script>

<style>
.login-container {
  background-color: white;
  margin: 10%;
  border-radius: 8px;
  padding: 50px;
}

.btn-login {
  width: 100%;
  background-color: rgb(178, 191, 247) !important;
  color: black !important;
  font-weight: bold !important;
}

</style>