<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">{{ mode }} Function Details</h1>
    </div>

    <div class="details-div">
      <div class="details-row">
        <div class="w-45">
          <v-text-field
            label="Function ID"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.functionId"
            readonly
            />
        </div>
        <div class="w-45">
          <v-text-field
            label="Function Name"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.functionName"
            :readonly="!isEditable"
            />
        </div>
      </div>
      <div class="details-row">
        <div class="w-45">
          <v-select
            :items="this.$data.funcCatList"
            item-title="categoryName"
            item-value="funcCatId"
            label="Function Category Name"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.funcCatId"
            :readonly="!isEditable"
            :class="{'select-is-not-editable': !isEditable}"
          />
        </div>
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
      </div>
    </div>

    <div>
      <div class="details-bot-div" v-if="this.$data.mode == MOD_VIEW">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
      </div>
      <div class="details-bot-div" v-else-if="this.$data.mode == MODE_CREATE">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-create" @click="onCreateFunction()">Create</v-btn>
      </div>
      <div class="details-bot-div" v-else-if="this.$data.mode == MODE_APPROVE_REJECT">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-delete" @click="onRejectFunction()">Reject</v-btn>
        <v-btn class="btn-approve" @click="onApproveFunction()">Approve</v-btn>
      </div>
      <div class="details-bot-div" v-else>
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-edit" @click="onEditFunction()">Edit</v-btn>
      </div>
    </div>

    
    <v-dialog
      v-model="dialog.status"
      width="auto"
    >
      <v-card>
        <div class="main-dialog">
          <v-card-title>
            {{ mode }} Function
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
  name: 'FunctionView',
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
        functionId: null,
        functionName: '',
        funcCatId: null,
        status: ''
      },
      funcCatList: [],
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
      let url = "function/getFunctionDetails?functionDtlsId="+ this.$store.getters.getFunctionDetail.dtlsId
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
    getFunctionCategoryList(){
      this.axios.get("function/getFunctionCategoryList").then((response) => {
        const list = response.data.data.list.filter(obj => obj.status == 'y')
        this.$data.funcCatList = list
        console.log(list)
      })
    },
    onCreateFunction() {
      this.axios.post("function/addFunction", {
        functionName: this.$data.details.functionName,
        funcCatId: this.$data.details.funcCatId
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
          this.$data.dialog.value = 'Error in creating function'
        }
      })
    },
    onEditFunction() {
      this.axios.put("function/updateFunction", {
        functionId: this.$data.details.functionId,
        functionName: this.$data.details.functionName,
        funcCatId: this.$data.details.funcCatId
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
          this.$data.dialog.value = 'Error in editing function'
        }
      })
    },
    onRejectFunction(){
      this.axios.put("function/changeStatus", {
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
          this.$data.dialog.value = 'Error in rejecting function'
        }
      })
    },
    onApproveFunction(){
      this.axios.put("function/changeStatus", {
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
          this.$data.dialog.value = 'Error in approving function'
        }
      })
    },
    closeDialog() {
        this.$data.dialog.status = false
        this.onBack()
    },
    setData(){
      const data = this.$store.getters.getFunctionDetail
      this.$data.mode = data.mode
    }
  },
  async mounted(){
    this.setData()
    this.getFunctionCategoryList()
    this.onEditableCheck()

    if(this.$data.mode != Const.MODE_CREATE){
      this.getDetails()
    }
  }
}
</script>

<style>
</style>