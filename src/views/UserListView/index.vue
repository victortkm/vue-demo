<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">User Listing</h1>
      <v-btn class="btn-create">Create New</v-btn>
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
            />
        </div>
        <div class="w-45">
          <v-text-field
            label="First Name"
            density="compact"
            variant="outlined"
            clearable
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
            />
        </div>
        <div class="w-45">
        </div>
      </div>

      <div class="filter-search-row">
        <div class="btn-container">
          <v-btn class="btn-normal">Clear</v-btn>
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
          <th class="text-left w-30">
            <div class="table-label-div">
              Name
              <div>
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-50">
            <div class="table-label-div">
              Description
              <div>
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
              </div>
            </div>
          </th>
          <th class="w-20">
            <div class="table-label-div">
              Actions
              <div>
                <v-icon @click="sortBy()" icon="mdi-menu-up" size="large"/>
                <v-icon @click="sortBy()" icon="mdi-menu-down" size="large"/>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td class="table-action-row">
            <button @click="viewDetails(item)" :disabled="!viewPermission">
              <v-icon icon="mdi-magnify" size="large"/>
            </button>
            <button @click="editDetails(item)" :disabled="!editPermission">
              <v-icon icon="mdi-pencil" size="large"/>
            </button>
            <button @click="deleteDetails(item)" :disabled="!deletePermission">
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
      deletePermission: true
    }
  },
  methods: {
    onClickPagination(){
      console.log('test', this.$data.page)
    },
    viewDetails(item){
      console.log(item)
      // this.$router.push({
      //   name: 'userDetails',
      //   params: "blahblah"
      // })
      // this.$router.push({
      //   name: 'userDetails', 
      //   params: {
      //     wakawaka:"blahblah"
      //   }
      // })
      this.$router.push({ name: 'userDetails', params: {foo: 3121}, state: { title123: 'Some Message321' } })

    },
    editDetails(item){
      console.log(item)
      this.$router.push({ name: 'userDetails', params: {foo: 3121}, state: { title123: 'Some Message321' } })
    },
    deleteDetails(item){
      console.log(item, this.$router)
    },
    sortBy(){
      console.log("hi")
    }
  }
}
</script>

<style>
</style>