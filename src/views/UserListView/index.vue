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
            v-model="search.username"
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
          <v-btn class="btn-normal">Search</v-btn>
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
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-15">
            <div class="table-label-div">
              Username
              <div>
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              First Name
              <div>
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Last Name
              <div>
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-15">
            <div class="table-label-div">
              Group Name
              <div>
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Created Time
              <div>
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Updated Time
              <div>
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
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
          :key="item.username"
        >
          <td>{{ item.userId }}</td>
          <td>{{ item.username }}</td>
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
        :length="40"
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
            Are you sure you want to delete {{ dialog.data }}
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
      items: [
        {
          name : 'name1',
          description: 'hi'
        },
        {
          name: '123',
          description: 'hii'
        }

      ],
      page: 1,
      viewPermission: true,
      editPermission: true,
      deletePermission: true,
      dialog: {
        status: false,
        data: null
      },
      search: {
        username: '',
        firstName: '',
        lastName: '',
        groupName: ''
      }
    }
  },
  methods: {
    onClickPagination(){
      console.log('test', this.$data.page)
    },
    viewDetails(item){
      console.log(item)
      this.$store.commit('setUserDetail',
        {
          id: 10,
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
          id: 10,
          mode: 'Edit'
        }
      )
      this.$router.push({ name: 'userDetails' })
    },
    deleteDialog(item){
      console.log('del',item)
      this.$data.dialog.status = true
    },
    closeDialog(){
      this.$data.dialog.status = false
    },
    sortBy(){
      console.log("hi")
    },
    clear(){
      this.$data.search = {
        username: '',
        firstName: '',
        lastName: '',
        group: {}
      }
    },
    onCreate(){
      this.$store.commit('setUserDetail',
        {
          id: 10,
          mode: 'Create'
        }
      )
      this.$router.push({ name: 'userDetails' })
    },
    onDelete() {

    }
  }
}
</script>

<style>
</style>