<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">Approve/Reject Pending Tasks</h1>
    </div>

    <User v-if=" pendDetailData.docType == 'USR'"/>
    <Group v-if=" pendDetailData.docType == 'GRP'"/>
  </div>
</template>

<script>
import User from '../UserView/index.vue'
import Group from '../GroupView/index.vue'

export default {
  name: 'UserView',
  components: {
    User,
    Group
  },
  data() {
    return{
      pendDetailData: {}
    }
  },
  computed: {
  },
  methods:{
    onBack(){
      this.$router.go(-1)
    }
  },
  created(){
    this.$data.pendDetailData =this.$store.getters.getPendDetailData;
    console.log('===== this.$data.pendDetailData')
    console.log(
    JSON.stringify(this.$data.pendDetailData))
  }
}
</script>

<style>
</style>