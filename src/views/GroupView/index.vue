<template>
  <div class="mainbody">
    <h1>Group Details</h1>
  </div>
</template>

<script>
import Util from '../../util'
import Const from '../../constant'

export default {
  name: 'GroupListView',
  components: {
  },
  data() {
    return {
      // values from const file
      MOD_VIEW: Const.MODE_VIEW,
      MODE_CREATE: Const.MODE_CREATE,
      MODE_EDIT: Const.MODE_EDIT,
      MODE_APPROVE_REJECT: Const.MODE_APPROVE_REJECT,

      mode: Const.MODE_VIEW,
      isEditable: false,
      details: {
        groupId: null,
        groupName: '',
        functionIds: [],
        status: ''
      },
      functionList: [],
      dialog: {
        status: false,
        value: null
      },
    }
  },
  computed: {
    getStatus(){
      return Util.getStatus(this.$data.details.status)
    },
  },
  methods:{
    onBack(){
      this.$router.go(-1)
    },
    onEditableCheck(){
      this.$data.isEditable = Util.onEditableCheck(this.$data.mode)
    },
    getFunctionList(){
      this.axios.get("function/getFuncCatWithFuncList").then((response) => {
        console.log(response.data.data)
        this.$data.functionList = response.data.data
      })
    },
    getDetails() {
      let url = "group/getGroupDetails?groupDtlsId="+ this.$store.getters.getGroupDetail.dtlsId
      // if Approve/Reject then query by pending dtls id
      if(this.$data.mode == Const.MODE_APPROVE_REJECT){
        url += "&isPend=true"
      }
      console.log(url)
      this.axios.get(url).then((response) => {
        console.log(response.data.data)
        this.$data.details = response.data.data
      })
    },
    onCreateGroup() {
      this.axios.post("group/addGroup", {
        groupName: this.$data.details.groupName,
        functionIds: this.$data.details.functionIds,
      }).then((response) => {
        console.log(response.data.data)
        this.$data.details = response.data.data
        return response.data
      }).then((data) => {
        console.log(data)
        this.$data.dialog.status = true

        if(data.msg == Const.API_RESPONSE_SUCCESS){
          this.$data.dialog.value = 'Succesfully created!'
        } else {
          this.$data.dialog.value = 'Error in creating group'
        }
      })
    },
    onEditGroup() {
      this.axios.put("group/updateGroup", {
        groupId: this.$data.details.groupId,
        groupName: this.$data.details.groupName,
        functionIds: this.$data.details.functionIds,
      }).then((response) => {
        console.log(response.data.data)
        this.$data.details = response.data.data
        return response.data
      }).then((data) => {
        console.log(data)
        this.$data.dialog.status = true

        if(data.msg == Const.API_RESPONSE_SUCCESS){
          this.$data.dialog.value = 'Succesfully edited!'
        } else {
          this.$data.dialog.value = 'Error in editing group'
        }
      })
    },
    onRejectGroup(){
      this.axios.put("group/changeStatus", {
        groupId: 1,
        jobId: this.$store.getters.getPendDetailData.jobId,
        actionCode: Const.CHANGE_STATUS_REJECT
      }).then((response) => {
        console.log(response.data.data)
        return response.data
      }).then((data) => {
        console.log(data)
        this.$data.dialog.status = true

        if(data.msg == Const.API_RESPONSE_SUCCESS){
          this.$data.dialog.value = 'Succesfully Rejected!'
        } else {
          this.$data.dialog.value = 'Error in rejecting group'
        }
      })
    },
    onApproveGroup(){
      this.axios.put("group/changeStatus", {
        groupId: 1,
        jobId: this.$store.getters.getPendDetailData.jobId,
        actionCode: Const.CHANGE_STATUS_APPROVE
      }).then((response) => {
        console.log(response.data.data)
        return response.data
      }).then((data) => {
        console.log(data)
        this.$data.dialog.status = true

        if(data.msg == Const.API_RESPONSE_SUCCESS){
          this.$data.dialog.value = 'Succesfully Approved!'
        } else {
          this.$data.dialog.value = 'Error in approving group'
        }
      })
    },
    closeDialog() {
        this.$data.dialog.status = false
        this.onBack()
    },
    setData(){
      const groupData = this.$store.getters.getGroupDetail
      this.$data.mode = groupData.mode
    }
  },
  async mounted(){
    this.setData()
    this.getFunctionList()
    this.onEditableCheck()

    if(this.$data.mode != Const.MODE_CREATE){
      // this.getDetails()
    }
  }
}
</script>

<style>
</style>