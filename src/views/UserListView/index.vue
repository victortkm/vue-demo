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
            :items="search.groupList"
            label="Group Name"
            density="compact"
            variant="outlined"
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
                <v-icon @click="sortBy({name: 'user_Name', type: 'ASC'})" :icon="iconSort({name: 'user_Name', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'user_Name', type: 'DESC'})" :icon="iconSort({name: 'user_Name', type: 'DESC'})" size="large"/>
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
                <v-icon @click="sortBy({name: 'groupName', type: 'ASC'})" :icon="iconSort({name: 'groupName', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'groupName', type: 'DESC'})" :icon="iconSort({name: 'groupName', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Created Time
              <div>
                <v-icon @click="sortBy({name: 'createTime', type: 'ASC'})" :icon="iconSort({name: 'createTime', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'createTime', type: 'DESC'})" :icon="iconSort({name: 'createTime', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Updated Time
              <div>
                <v-icon @click="sortBy({name: 'updateTime', type: 'ASC'})" :icon="iconSort({name: 'updateTime', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'updateTime', type: 'DESC'})" :icon="iconSort({name: 'updateTime', type: 'DESC'})" size="large"/>
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
          <td>{{ item.createTime }}</td>
          <td>{{ item.updateTime }}</td>
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

  </div>
</template>

<script> 

export default {
  name: 'UserListView',
  components: {
  },
  data() {
    return {
      items: [],
      page: 1,
      totalPages: 1,
      pageSize: 1,
      viewPermission: true,
      editPermission: true,
      deletePermission: true,
      dialog: {
        status: false,
        data: null
      },
      search: {
        userName: '',
        firstName: '',
        lastName: '',
        groupName: ''
      },
      currentSort: '',
      isFirstAPIParam: true
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    onClickPagination(){
      console.log('onClickPagination', this.$data.page)
      this.getList()
    },
    viewDetails(item){
      console.log(item)
      console.log(item.userId)
      this.$store.commit('setUserDetail',
        {
          id: item.userId,
          mode: 'View'
        }
      )
      this.$router.push({ name: 'userDetails' })
      // this.$router.push({ name: 'userDetails', params: {foo: 3121}, state: { title123: 'Some Message321' } })

    },
    editDetails(item){
      console.log(item)
      this.$store.commit('setUserDetail',
        {
          id: item.userId,
          mode: 'Edit'
        }
      )
      this.$router.push({ name: 'userDetails' })
    },
    deleteDialog(item){
      console.log('del',item)
      this.$data.dialog.status = true
      this.$data.dialog.data = item
    },
    closeDialog(){
      this.$data.dialog.status = false
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
        group: {}
      }
    },
    onCreate(){
      this.$store.commit('setUserDetail',
        {
          id: 1,
          mode: 'Create'
        }
      )
      this.$router.push({ name: 'userDetails' })
    },
    onDelete() {

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
        userName,
        firstName,
        lastName,
        groupId
      } = this.$data.search

      const {
        currentSort,
        page
      } = this.$data

      let url = "user/getUserList"
      const originalUrl = "user/getUserList"


      if(userName != '' && userName != null){
        url = this.checkFirstAPIParam(url, originalUrl, "userName", userName)
      }
      if(firstName != '' && firstName != null){
        url = this.checkFirstAPIParam(url, originalUrl, "firstName", firstName)
      }
      if(lastName != '' && lastName != null){
        url = this.checkFirstAPIParam(url, originalUrl, "lastName", lastName)
      }
      if(groupId != null){
        url = this.checkFirstAPIParam(url, originalUrl, "groupId", groupId)
      }
      if(currentSort != '' || currentSort == null){
        url = this.checkFirstAPIParam(url, originalUrl, "sortKey", currentSort.name + ":" + currentSort.type)
      }

      // temp
      // if(page != 1){
      //   if(isFirst){
      //     url += "?"
      //     isFirst = false
      //   } else { 
      //     url += "&"
      //   }
      //   url += "pageNumber=" + page
      // }
      
      // if(isFirst){
      //   url += "?"
      //   isFirst = false
      // } else { 
      //   url += "&"
      // }
      // url += "pageSize=" + this.$data.pageSize
      // temp

      console.log(url)
      this.getListAPI(url, currentSort, page)
    },
    checkFirstAPIParam(url, originalUrl, param, val){
      
      if(url == originalUrl){
        this.$data.isFirstAPIParam = false
        return url += "?" + param + "=" + val
      } else {
        return url += "&" + param + "=" + val
      }
    },
    setPagination(totalCount){
      this.$data.totalPages = Math.ceil(totalCount/this.$data.pageSize)
    }
    
  }
}
</script>

<style>
</style>