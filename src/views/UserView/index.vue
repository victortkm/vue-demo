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
            :items="this.$data.groupList"
            item-title="groupName"
            item-value="groupId"
            label="Group Name"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.groupId"
            :readonly="!isEditable"
            :class="{'select-is-not-editable': !isEditable}"
          />
        </div>
        <div class="w-45">
          <v-text-field
            label="Password"
            density="compact"
            variant="outlined"
            type='password'
            v-model="this.$data.details.password"
            :readonly="!isEditable"
            v-if="mode == MODE_CREATE"
            />
          <v-text-field
            label="Status"
            density="compact"
            variant="outlined"
            v-model="getStatus"
            readonly
            v-if="mode != MODE_CREATE"
            />
        </div>
      </div>
    </div>

    <div>
      <div class="details-bot-div" v-if="this.$data.mode == MOD_VIEW">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
      </div>
      <div class="details-bot-div" v-else-if="this.$data.mode == MODE_CREATE">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-create" @click="onCreateUser()">Create</v-btn>
      </div>
      <div class="details-bot-div" v-else-if="this.$data.mode == MODE_APPROVE_REJECT">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-delete" @click="onRejectUser()">Reject</v-btn>
        <v-btn class="btn-approve" @click="onApproveUser()">Approve</v-btn>
      </div>
      <div class="details-bot-div" v-else>
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-edit" @click="onEditUser()">Edit</v-btn>
      </div>
    </div>

    
    <v-dialog
      v-model="dialog.status"
      width="auto"
    >
      <v-card>
        <div class="main-dialog">
          <v-card-title>
            {{ mode }} User
          </v-card-title>
          <v-card-text>
            {{ dialog.value }}
          </v-card-text>
          <v-card-actions class="dialog-actions-view">
            <v-btn class="btn-normal" @click="closeDialog()">Ok</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>




  </div>
</template>

<script>
import Util from '../../util'
import Const from '../../constant'

export default {
  name: 'UserView',
  components: {
  },
  data() {
    return{
      // values from const file
      MOD_VIEW: Const.MODE_VIEW,
      MODE_CREATE: Const.MODE_CREATE,
      MODE_EDIT: Const.MODE_EDIT,
      MODE_APPROVE_REJECT: Const.MODE_APPROVE_REJECT,

      mode: Const.MODE_VIEW,
      isEditable: false,
      details: {
        userId: null,
        userName: '',
        firstName: '',
        lastName: '',
        groupId: null,
        groupName: '',
        password: '',
        status: ''
      },
      groupList: [],
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
    getDetails() {
      let url = "user/getUserDetails?userDtlsId="+ this.$store.getters.getUserDetail.dtlsId
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
    getGroupList(){
      this.axios.get("group/getGroupList").then((response) => {
        const list = response.data.data.list.filter(obj => obj.status == 'y')
        this.$data.groupList = list
      })
    },
    onCreateUser() {
      this.axios.post("user/addUser", {
        userName: this.$data.details.userName,
        firstName: this.$data.details.firstName,
        lastName: this.$data.details.lastName,
        groupId: this.$data.details.groupId,
        password: this.$data.details.password
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
          this.$data.dialog.value = 'Error in creating user'
        }
      })
    },
    onEditUser() {
      this.axios.put("user/updateUser", {
        userId: this.$data.details.userId,
        userName: this.$data.details.userName,
        firstName: this.$data.details.firstName,
        lastName: this.$data.details.lastName,
        groupId: this.$data.details.groupId
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
          this.$data.dialog.value = 'Error in editing user'
        }
      })
    },
    onRejectUser(){
      this.axios.put("user/changeStatus", {
        userId: 1,
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
          this.$data.dialog.value = 'Error in rejecting user'
        }
      })
    },
    onApproveUser(){
      this.axios.put("user/changeStatus", {
        userId: 1,
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
          this.$data.dialog.value = 'Error in approving user'
        }
      })
    },
    closeDialog() {
        this.$data.dialog.status = false
        this.onBack()
    },
    setData(){
      const userData = this.$store.getters.getUserDetail
      this.$data.mode = userData.mode
    }
  },
  async mounted(){
    this.setData()
    this.getGroupList()
    this.onEditableCheck()

    if(this.$data.mode != Const.MODE_CREATE){
      this.getDetails()
    }
  }
}
</script>

<style>
</style>