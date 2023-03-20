<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">{{ mode }} Function Category Details</h1>
    </div>

    <div class="details-div">
      <div class="details-row">
        <div class="w-45">
          <v-text-field
            label="Function Category ID"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.funcCatId"
            readonly
            />
        </div>
        <div class="w-45">
          <v-text-field
            label="Function Category Name"
            density="compact"
            variant="outlined"
            v-model="this.$data.details.categoryName"
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
    </div>

    <div>
      <div class="details-bot-div" v-if="this.$data.mode == MOD_VIEW">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
      </div>
      <div class="details-bot-div" v-else-if="this.$data.mode == MODE_CREATE">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-create" @click="onCreateFunctionCategory()">Create</v-btn>
      </div>
      <div class="details-bot-div" v-else-if="this.$data.mode == MODE_APPROVE_REJECT">
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-delete" @click="onRejectFunctionCategory()">Reject</v-btn>
        <v-btn class="btn-approve" @click="onApproveFunctionCategory()">Approve</v-btn>
      </div>
      <div class="details-bot-div" v-else>
        <v-btn class="btn-normal" @click="onBack()">Back</v-btn>
        <v-btn class="btn-edit" @click="onEditFunctionCategory()">Edit</v-btn>
      </div>
    </div>

    
    <v-dialog
      v-model="dialog.status"
      width="auto"
    >
      <v-card>
        <div class="main-dialog">
          <v-card-title>
            {{ mode }} Function Category
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
  name: 'FunctionCategoryView',
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
        funcCatId: null,
        categoryName: '',
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
      let url = "function/getFunctionCategoryDetails?funcCatDtlsId="+ this.$store.getters.getFunctionCategoryDetail.dtlsId
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
    onCreateFunctionCategory() {
      this.axios.post("function/addFunctionCategory", {
        categoryName: this.$data.details.categoryName,
        userId: 1 
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
          this.$data.dialog.value = 'Error in creating Function Category'
        }
      })
    },
    onEditFunctionCategory() {
      this.axios.put("function/updateFunctionCategory", {
        funcCatId: this.$data.details.funcCatId,
        categoryName: this.$data.details.categoryName,
        userId: 1
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
          this.$data.dialog.value = 'Error in editing Function Category'
        }
      })
    },
    onRejectFunctionCategory(){
      this.axios.put("function/catChangeStatus", {
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
          this.$data.dialog.value = 'Error in rejecting Function Category'
        }
      })
    },
    onApproveFunctionCategory(){
      this.axios.put("function/catChangeStatus", {
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
          this.$data.dialog.value = 'Error in approving Function Category'
        }
      })
    },
    closeDialog() {
        this.$data.dialog.status = false
        this.onBack()
    },
    setData(){
      const functionCategoryData = this.$store.getters.getFunctionCategoryDetail
      this.$data.mode = functionCategoryData.mode
    }
  },
  async mounted(){
    this.setData()
    this.onEditableCheck()

    if(this.$data.mode != Const.MODE_CREATE){
      this.getDetails()
    }
  }
}
</script>

<style>
</style>