<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">Approve/Reject Pending Tasks</h1>
    </div>

    <!-- <HelloWorld/> -->
    <!-- <UserView/> -->

  </div>
</template>

<script>
// import HelloWorld from '../../components/HelloWorld.vue'
// import UserView from '../UserView/index.vue'

export default {
  name: 'UserView',
  components: {
    // HelloWorld
    // UserView
  },
  data() {
    return{
    }
  },
  computed: {
  },
  methods:{
    onBack(){
      this.$router.go(-1)
    }
  },
  mounted(){
  }
}
</script>

<style>
</style>