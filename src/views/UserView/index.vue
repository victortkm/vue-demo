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
            v-model="this.$data.details.userId"
            readonly
            />
        </div>
        <div class="w-45">
          <v-text-field
            label="User Name"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.userName"
            :readonly="!isEditable"
            />
        </div>
      </div>
      <div class="details-row">
        <div class="w-45">
          <v-text-field
            label="First Name"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.firstName"
            :readonly="!isEditable"
            />
        </div>
        <div class="w-45">
          <v-text-field
            label="Last Name"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.lastName"
            :readonly="!isEditable"
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
            v-model="this.$data.details.groupName"
            :readonly="!isEditable"
            :class="{'select-is-not-editable': !isEditable}"
          />
        </div>
        <div class="w-45">
        </div>
      </div>
    </div>


    <div class="details-bot-div" v-if="this.$data.mode == 'View'">
      <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
    </div>
    <div class="details-bot-div" v-else-if="this.$data.mode == 'Create'">
      <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
      <v-btn class="btn-create">Create</v-btn>
    </div>
    <div class="details-bot-div" v-else>
      <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
      <v-btn class="btn-edit">Edit</v-btn>
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
      isEditable: false,
      details: {
        userId: 0,
        userName: '',
        firstName: '',
        lastName: '',
        groupId: 0,
        groupName: ''
      },
      groupList: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
    }
  },
  methods:{
    onBack(){
      this.$router.go(-1)
    },
    onEditableCheck(){
      if(this.$data.mode != 'View'){
        this.$data.isEditable = true
      }
    },
    onCreateMounted(){
    },
    getDetails() {
      this.axios.get("user/getUserDetails?userId=" + this.$store.getters.getUserDeta.id).then((response) => {
        console.log(response.data.data)
        this.$data.details = response.data.data
      })
    }
  },
  mounted(){
    const userData = this.$store.getters.getUserDeta
    this.$data.mode = userData.mode
    // console.log(this.$data.mode)
    // console.log(userData)

    this.onEditableCheck()

    if(this.$data.mode != 'Create'){
      this.getDetails()
    }
  }
}
</script>

<style>
</style>