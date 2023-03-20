<template>
    <User v-if=" pendDetailData.docType == WFL_TYPE_USR"/>
    <Group v-if=" pendDetailData.docType == WFL_TYPE_GRP"/>
    <Function v-if=" pendDetailData.docType == WFL_TYPE_FNC"/>
    <FunctionCategory v-if=" pendDetailData.docType == WFL_TYPE_FCC"/>
</template>

<script>
import User from '../UserView/index.vue'
import Group from '../GroupView/index.vue'
import Function from '../FunctionView/index.vue'
import FunctionCategory from '../FunctionCategoryView/index.vue'
import Const from '../../constant'

export default {
  name: 'UserView',
  components: {
    User,
    Group,
    Function,
    FunctionCategory
  },
  data() {
    return{
      pendDetailData: {},
      WFL_TYPE_GRP: Const.WFL_TYPE_GRP,
      WFL_TYPE_FNC: Const.WFL_TYPE_FNC,
      WFL_TYPE_USR: Const.WFL_TYPE_USR,
      WFL_TYPE_FCC: Const.WFL_TYPE_FCC,
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
    console.log(JSON.stringify(this.$data.pendDetailData))
  }
}
</script>

<style>
</style>