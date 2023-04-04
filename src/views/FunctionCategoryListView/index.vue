<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">Function Category Listing</h1>
      <v-btn
        :class="createPermission ? 'btn-create' : 'btn-disabled'"
        :disabled="createPermission ? false : true"
        @click="onCreate()"
      >
        Create New
      </v-btn>
    </div>

    <!-- filter section -->
    <div class="filter-div">
      <h3 class="filter-title">Filter</h3>
      <div class="filter-row">
        <div class="w-45">
          <v-text-field
            label="Function Category Name"
            density="compact"
            variant="outlined"
            clearable
            v-model="search.funcCatName"
            />
        </div>
        <div class="w-45">
        </div>
      </div>

      <div class="filter-search-row">
        <div class="btn-container">
          <v-btn class="btn-normal" @click="clear()">Clear</v-btn>
        </div>
        <div class="btn-container">
          <v-btn class="btn-normal" @click="getList()">Search</v-btn>
        </div>
      </div>

    </div>

    <!-- Listing table -->
    <v-table>
      <thead>
        <tr>
          <th class="text-left w-10">
            <div class="table-label-div">
              Function Category ID
              <div>
                <v-icon @click="sortBy({name: 'demo_function_category_id', type: 'ASC'})" :icon="iconSort({name: 'demo_function_category_id', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'demo_function_category_id', type: 'DESC'})"  :icon="iconSort({name: 'demo_function_category_id', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-15">
            <div class="table-label-div">
              Function Category Name
              <div>
                <v-icon @click="sortBy({name: 'function_category_name', type: 'ASC'})" :icon="iconSort({name: 'function_category_name', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'function_category_name', type: 'DESC'})" :icon="iconSort({name: 'function_category_name', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Status
              <div>
                <v-icon @click="sortBy({name: 'active_flag', type: 'ASC'})" :icon="iconSort({name: 'active_flag', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'active_flag', type: 'DESC'})" :icon="iconSort({name: 'active_flag', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Updated Time
              <div>
                <v-icon @click="sortBy({name: 'updated_time', type: 'ASC'})" :icon="iconSort({name: 'updated_time', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'updated_time', type: 'DESC'})" :icon="iconSort({name: 'updated_time', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="w-15">
            <div class="table-label-div">
              Actions
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.funcCatName"
        >
          <td>{{ item.funcCatId }}</td>
          <td>{{ item.categoryName }}</td>
          <td>{{ getStatus(item.status) }}</td>
          <td>{{ item.updatedTime }}</td>
          <td class="table-action-row">
            <button @click="viewDetails(item)" :disabled="!viewPermission">
              <v-icon :color="viewPermission ? 'black': 'grey'" icon="mdi-magnify" size="large"/>
            </button>
            <button @click="editDetails(item)" :disabled="!editPermission">
              <v-icon :color="editPermission ? 'black': 'grey'" icon="mdi-pencil" size="large"/>
            </button>
            <button @click="deleteDialog(item)" :disabled="!deletePermission">
              <v-icon :color="deletePermission ? 'black': 'grey'" icon="mdi-delete" size="large"/>
            </button>
          </td>
        </tr>
      </tbody>
    </v-table>

  <!-- pagination -->
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="totalPages"
        rounded="circle"
        :total-visible="6"
        @click="onClickPagination"
      />
    </div>
    
    <!-- delete dialog -->
    <v-dialog
      v-model="dialog.status"
      width="auto"
    >
      <v-card>
        <div class="main-dialog">
          <v-card-title>
            Delete Function Category
          </v-card-title>
          <v-card-text>
            Are you sure you want to delete {{ dialog.data.funcCatName }}?
          </v-card-text>
          <v-card-actions class="dialog-actions-view">
            <v-btn class="btn-normal" @click="closeDialog()">Cancel</v-btn>
            <v-btn class="btn-delete" @click="onDelete()">Delete</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    
    <!-- delete response -->
    <v-dialog
      v-model="resDialog.status"
      width="auto"
    >
      <v-card>
        <div class="main-dialog">
          <v-card-title>
            {{ resDialog.value }}
          </v-card-title>
          <v-card-actions class="dialog-actions-view">
            <v-btn class="btn-normal" @click="closeResDialog()">Ok</v-btn>
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
  name: 'FunctionCategoryListView',
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      items: [],
      groupList: [],
      page: 1,
      totalPages: 1,
      pageSize: 5,
      createPermission: true,
      viewPermission: true,
      editPermission: true,
      deletePermission: true,
      dialog: {
        status: false,
        data: null
      },
      resDialog: {
        status: false,
        value: ''
      },
      search: {
        funcCatName: ''
      },
      currentSort: '',
      isFirstAPIParam: true
    }
  },
  mounted(){
    this.getList()
    let loginData = this.cookies.get('loginData')
    let permission = Util.authPermission(23,21,22,24, loginData.functionIds)
    this.setPermission(permission)
  },
  methods: {
    setPermission(permission){
      this.$data.createPermission = permission.create
      this.$data.viewPermission = permission.view
      this.$data.editPermission = permission.edit
      this.$data.deletePermission = permission.del
    },
    getStatus(val){
      return Util.getStatus(val)
    },
    onClickPagination(){
      console.log('onClickPagination', this.$data.page)
      this.getList()
    },
    viewDetails(item){
      console.log(item)
      this.$store.commit('setFunctionCategoryDetail',
        {
          dtlsId: item.funcCatDtlsId,
          mode: Const.MODE_VIEW
        }
      )
      this.$router.push({ name: 'functionCategoryDetails' })

    },
    editDetails(item){
      this.$store.commit('setFunctionCategoryDetail',
        {
          dtlsId: item.funcCatDtlsId,
          mode: Const.MODE_EDIT
        }
      )
      this.$router.push({ name: 'functionCategoryDetails' })
    },
    deleteDialog(item){
      this.$data.dialog.status = true
      this.$data.dialog.data = item
    },
    onDelete() {
      this.axios.delete("function/deleteFunctionCategory",
      { 
        data: {
        'funcCatId': this.$data.dialog.data.funcCatId,
        'userId': 1,
        },
        headers: {
          "content-type": "application/json",
          "Accept": "application/json"
        },
      }).then((response) => {
        console.log(response.data.data)
        if(response.data.msg == Const.API_RESPONSE_SUCCESS){
          this.$data.resDialog.value = 'Succesfully Deleted! Pending Approval'
        } else {
          this.$data.resDialog.value = 'Error in Deleting Function Category'
        }
        this.getList()
        this.closeDialog()
        this.$data.resDialog.status = true
      })
    },
    closeDialog(){
      this.$data.dialog.status = false
    },
    closeResDialog(){
      this.$data.resDialog.status = false
    },
    sortBy(item){

      console.log('sortBy',item, this.$data.currentSort)
      // if clicked twice then reset

      if(JSON.stringify(item) === JSON.stringify(this.$data.currentSort)){
        this.$data.currentSort = ''
      } else {
        this.$data.currentSort = item
      }

      //  API call here
      this.getList()
    },
    clear(){
      this.$data.search = {
        funcCatName: ''
      }
    },
    onCreate(){
      this.$store.commit('setFunctionCategoryDetail',
        {
          dtlsId: 1,
          mode: Const.MODE_CREATE
        }
      )
      this.$router.push({ name: 'functionCategoryDetails' })
    },
    iconSort(obj){
      // console.log('iconsort',obj, this.$data.currentSort)
      if(this.$data.currentSort != null){
        if((this.$data.currentSort.name == obj.name) && (this.$data.currentSort.type == obj.type)){

          if(obj.type == 'ASC'){
            return 'mdi-menu-up-outline'
          } else {
            return 'mdi-menu-down-outline'
          }
        }
      }

      if(obj.type == 'ASC'){
        return 'mdi-menu-up'
      } else {
        return 'mdi-menu-down'
      }

    },

    // API
    getListAPI(url){
      this.axios.get(url).then((response) => {
        console.log(response.data.data)
        this.$data.items = response.data.data.list
        this.setPagination(response.data.data.totalCount, response.data.data.list.pageNumber)
      })
    },
    getList() {
      const {
        funcCatName,
      } = this.$data.search

      const {
        currentSort,
        page,
        pageSize
      } = this.$data

      let url = "function/getFunctionCategoryList"
      const originalUrl = "function/getFunctionCategoryList"


      if(funcCatName != '' && funcCatName != null){
        url = Util.genAPIParamQuery(url, originalUrl, "categoryName", funcCatName)
      }
      if(currentSort != '' || currentSort == null){
        url = Util.genAPIParamQuery(url, originalUrl, "sortKey", currentSort.name + ":" + currentSort.type)
      }

      url = Util.genAPIParamQuery(url, originalUrl, "pageNumber", page)
      
      url = Util.genAPIParamQuery(url, originalUrl, "pageSize", pageSize)

      console.log(url)
      this.getListAPI(url, currentSort, page)
    },
    setPagination(totalCount){
      this.$data.totalPages = Math.ceil(totalCount/this.$data.pageSize)
    }
    
  }
}
</script>

<style>
</style>