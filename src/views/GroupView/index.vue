<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">{{ mode }} Group Details</h1>
    </div>
    
    <div class="details-div">
      <div class="details-row">
        <div class="w-45">
          <v-text-field
            label="Group ID"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.groupId"
            readonly
            />
        </div>
        <div class="w-45">
          <v-text-field
            label="Group Name"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.groupName"
            :readonly="!isEditable"
            />
        </div>
      </div>
      <div class="details-row">
        <div class="w-45">
          <v-text-field
            label="Status"
            density="compact"
            variant="outlined"
            v-model="getStatus"
            readonly
            v-if="mode != MODE_CREATE"
            />
        </div>
        <div class="w-45">
        </div>
      </div>
      
      <v-container>
        <h3 style="text-align: start;">Functions</h3>
        <v-row
          align="start"
          no-gutters
        >
          <view
            class="pa-2 func-cat-container w-20"
            v-for="funcCat in functionList"
            :key="funcCat.funcCatId"
          >
            <v-card
              class="func-cat-card flex-grow-1"
              :title="funcCat.categoryName"
              variant="outlined">
              <v-checkbox
                v-for="func in funcCat.funcList"
                :key="func.functionDtlsId"
                class="func-cat-checkbox"
                density="compact"
                color="blue"
                v-model="details.functionIds"
                :label="func.functionName"
                :value="func.functionId"
                :readonly="!isEditable"
                />
              <!-- <v-checkbox class="func-cat-checkbox" label="xxxxxxxxxxxxxxxxxxxxxxxxx"></v-checkbox> -->
            </v-card>
          </view>
        </v-row>
      </v-container>

      <!-- <div class="func-cat-main">
        <v-card
          v-for="func in functionList"
          :key="func.categoryName"
          class="w-25 func-cat-container"
          :title="func.categoryName"
          variant="outlined">
          <v-checkbox label="Checkbox"></v-checkbox>
        </v-card>
      </div> -->

    </div>


    <div>
      <div class="details-bot-div" v-if="this.$data.mode == MOD_VIEW">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
      </div>
      <div class="details-bot-div" v-else-if="this.$data.mode == MODE_CREATE">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-create" @click="onCreateGroup()">Create</v-btn>
      </div>
      <div class="details-bot-div" v-else-if="this.$data.mode == MODE_APPROVE_REJECT">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-delete" @click="onRejectGroup()">Reject</v-btn>
        <v-btn class="btn-approve" @click="onApproveGroup()">Approve</v-btn>
      </div>
      <div class="details-bot-div" v-else>
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-edit" @click="onEditGroup()">Edit</v-btn>
      </div>
    </div>

    <v-dialog
      v-model="dialog.status"
      width="auto"
    >
      <v-card>
        <div class="main-dialog">
          <v-card-title>
            {{ mode }} Group
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
import { useCookies } from "vue3-cookies";

export default {
  name: 'GroupListView',
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
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
          this.getNewPermission()
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
    },
    getNewPermission(){
      let loginData = this.cookies.get('loginData')
      this.axios.post("user/login", {
        userName: loginData.userName,
        password: loginData.password,
      }).then((response)=> {
        console.log(response)
        if(response.data.result == true){
          // let temp = response.data.data
          // FOR DEMO ONLY!!!
          // temp.password = this.$store.getters.getLoginDetailData.password
          // this.$store.commit('setLoginDetailData', temp)
          
          let object = response.data.data
          // FOR DEMO ONLY!!!
          object.password = loginData.password
          this.cookies.set("loginData", object);
          console.log('cookies')
          console.log(object)
        }
      })
    }
  },
  async mounted(){
    this.setData()
    this.getFunctionList()
    this.onEditableCheck()

    if(this.$data.mode != Const.MODE_CREATE){
      this.getDetails()
    }
  }
}
</script>

<style>
</style>