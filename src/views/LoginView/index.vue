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

export default {
  name: 'UserListView',
  components: {
  },
  data() {
    return {
      userName: '',
      password: '',
    }
  },
  mounted(){
    this.login()
  },
  methods: {
    login(){
      this.axios.post("user/login", {
        userName: this.$data.userName,
        password: this.$data.password,
      }).then((response)=> {
        console.log(response.data)
        if(response.data.result == true){
          this.$store.commit('setLoginDetailData', response.data.data)
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