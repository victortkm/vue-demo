<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">{{ mode }} User Details</h1>
    </div>

    <div class="details-div">
      <div class="details-row">
        <div class="w-45">
          <v-text-field
            label="User ID"
            density="compact"
            variant="outlined"
            :readonly="isEdit"
            />
        </div>
        <div class="w-45">
          <v-text-field
            label="User Name"
            density="compact"
            variant="outlined"
            :readonly="isEdit"
            />
        </div>
      </div>
      <div class="details-row">
        <div class="w-45">
          <v-text-field
            label="First Name"
            density="compact"
            variant="outlined"
            :readonly="isEdit"
            />
        </div>
        <div class="w-45">
          <v-text-field
            label="Last Name"
            density="compact"
            variant="outlined"
            :readonly="isEdit"
            />
        </div>
      </div>
      <div class="details-row">
        <div class="w-45">
          <v-select
            :items="items"
            label="Group Name"
            density="compact"
            variant="outlined"
            :readonly="isEdit"
          />
        </div>
        <div class="w-45">
        </div>
      </div>
    </div>


    <div class="details-bot-div">
      <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
      <v-btn class="btn-edit" v-bind:class="isEdit ? 'display-none' : ''">Edit</v-btn>
    </div>

    
    <!-- <h3>{{ this.$store.getters.getCount }}</h3>
    <button @click="x">
      <v-icon icon="mdi-magnify" size="large"/>
    </button> -->




  </div>
</template>

<script>

export default {
  name: 'UserView',
  components: {
  },
  data() {
    return{
      mode: 'View' ,
      isEdit: true,
      groupList: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
    }
  },
  methods:{
    x(){
      console.log('hi')
      this.$store.commit('increment')
    },
    onBack(){
      this.$router.go(-1)
    }
  },
  props: {
    title: {
      type: String
    },
    img: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  mounted(){
    console.log(this.$store.getters)
  },
  created(){
  }
}
</script>

<style>
</style>