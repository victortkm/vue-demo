<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">User Listing</h1>
      <v-btn class="btn-create" @click="onCreate()">Create New</v-btn>
    </div>

    <!-- filter section -->
    <div class="filter-div">
      <h3 class="filter-title">Filter</h3>
      <div class="filter-row">
        <div class="w-45">
          <v-text-field
            label="User Name"
            density="compact"
            variant="outlined"
            clearable
            v-model="search.userName"
            />
        </div>
        <div class="w-45">
          <v-text-field
            label="First Name"
            density="compact"
            variant="outlined"
            clearable
            v-model="search.firstName"
            />
        </div>
      </div>
      <div class="filter-row">
        <div class="w-45">
          <v-text-field
            label="Last Name"
            density="compact"
            variant="outlined"
            clearable
            v-model="search.lastName"
            />
        </div>
        <div class="w-45">
          <v-select
            :items="groupList"
            item-title="groupName"
            item-value="groupId"
            label="Group Name"
            density="compact"
            variant="outlined"
            v-model="search.groupId"
          />
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
              User ID
              <div>
                <v-icon @click="sortBy({name: 'demo_user_id', type: 'ASC'})" :icon="iconSort({name: 'demo_user_id', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'demo_user_id', type: 'DESC'})"  :icon="iconSort({name: 'demo_user_id', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-15">
            <div class="table-label-div">
              Username
              <div>
                <v-icon @click="sortBy({name: 'user_name', type: 'ASC'})" :icon="iconSort({name: 'user_name', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'user_name', type: 'DESC'})" :icon="iconSort({name: 'user_name', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              First Name
              <div>
                <v-icon @click="sortBy({name: 'first_name', type: 'ASC'})" :icon="iconSort({name: 'first_name', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'first_name', type: 'DESC'})" :icon="iconSort({name: 'first_name', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Last Name
              <div>
                <v-icon @click="sortBy({name: 'last_name', type: 'ASC'})" :icon="iconSort({name: 'last_name', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'last_name', type: 'DESC'})" :icon="iconSort({name: 'last_name', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-15">
            <div class="table-label-div">
              Group Name
              <div>
                <v-icon @click="sortBy({name: 'group_name', type: 'ASC'})" :icon="iconSort({name: 'group_name', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'group_name', type: 'DESC'})" :icon="iconSort({name: 'group_name', type: 'DESC'})" size="large"/>
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
          :key="item.userName"
        >
          <td>{{ item.userId }}</td>
          <td>{{ item.userName }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.groupName }}</td>
          <td>{{ getStatus(item.status) }}</td>
          <td>{{ item.updatedTime }}</td>
          <td class="table-action-row">
            <button @click="viewDetails(item)" :disabled="!viewPermission">
              <v-icon icon="mdi-magnify" size="large"/>
            </button>
            <button @click="editDetails(item)" :disabled="!editPermission">
              <v-icon icon="mdi-pencil" size="large"/>
            </button>
            <button @click="deleteDialog(item)" :disabled="!deletePermission">
              <v-icon icon="mdi-delete" size="large"/>
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
            Delete User
          </v-card-title>
          <v-card-text>
            Are you sure you want to delete {{ dialog.data.userName }}?
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

export default {
  name: 'UserListView',
  components: {
  },
  data() {
    return {
      items: [],
      groupList: [],
      page: 1,
      totalPages: 1,
      pageSize: 5,
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
        userName: '',
        firstName: '',
        lastName: '',
        groupId: ''
      },
      currentSort: '',
      isFirstAPIParam: true
    }
  },
  mounted(){
    this.getList()
    this.getGroupList()
  },
  methods: {
    getStatus(val){
      return Util.getStatus(val)
    },
    onClickPagination(){
      console.log('onClickPagination', this.$data.page)
      this.getList()
    },
    viewDetails(item){
      console.log(item)
      this.$store.commit('setUserDetail',
        {
          id: item.userDtlsId,
          mode: Const.MODE_VIEW
        }
      )
      this.$router.push({ name: 'userDetails' })
      // this.$router.push({ name: 'userDetails', params: {foo: 3121}, state: { title123: 'Some Message321' } })

    },
    editDetails(item){
      this.$store.commit('setUserDetail',
        {
          id: item.userDtlsId,
          mode: Const.MODE_EDIT
        }
      )
      this.$router.push({ name: 'userDetails' })
    },
    deleteDialog(item){
      this.$data.dialog.status = true
      this.$data.dialog.data = item
    },
    onDelete() {
      this.axios.delete("user/deleteUser",
      { 
        data: {
        'userId': this.$data.dialog.data.userId,
        'userIdFrom': 1,
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
          this.$data.resDialog.value = 'Error in Deleting user'
        }
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
        userName: '',
        firstName: '',
        lastName: '',
        groupId: {}
      }
    },
    onCreate(){
      this.$store.commit('setUserDetail',
        {
          id: 1,
          mode: Const.MODE_CREATE
        }
      )
      this.$router.push({ name: 'userDetails' })
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
    getGroupList(){
      this.axios.get("group/getGroupList").then((response) => {
        console.log(response.data.data.list)
        const list = response.data.data.list.filter(obj => obj.status == 'y')
        this.$data.groupList = list
      })
    },
    getList() {
      const {
        userName,
        firstName,
        lastName,
        groupId
      } = this.$data.search

      const {
        currentSort,
        page,
        pageSize
      } = this.$data

      let url = "user/getUserList"
      const originalUrl = "user/getUserList"


      if(userName != '' && userName != null){
        url = Util.genAPIParamQuery(url, originalUrl, "userName", userName)
      }
      if(firstName != '' && firstName != null){
        url = Util.genAPIParamQuery(url, originalUrl, "firstName", firstName)
      }
      if(lastName != '' && lastName != null){
        url = Util.genAPIParamQuery(url, originalUrl, "lastName", lastName)
      }
      if(groupId != null){
        url = Util.genAPIParamQuery(url, originalUrl, "groupId", groupId)
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