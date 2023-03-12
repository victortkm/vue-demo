<template>
  <div class="mainbody">

    <div class="page-title-div">
      <h1 class="page-title">Pending Approval Listing</h1>
    </div>

    <!-- filter section -->
    <div class="filter-div">
      <h3 class="filter-title">Filter</h3>
      <div class="filter-row">
        <div class="w-45">
          <v-select
            :items="search.docTypeList"
            item-title="docType"
            item-value="val"
            label="Category"
            density="compact"
            variant="outlined"
            clearable
            v-model="search.docType"
            />
        </div>
        <div class="w-45">
          <v-select
            :items="search.changeModeList"
            item-title="changeMode"
            item-value="val"
            label="Change Mode"
            density="compact"
            variant="outlined"
            clearable
            v-model="search.changeMode"
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
              Job ID
              <div>
                <v-icon @click="sortBy({name: 'job_id', type: 'ASC'})" :icon="iconSort({name: 'job_id', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'job_id', type: 'DESC'})"  :icon="iconSort({name: 'job_id', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-15">
            <div class="table-label-div">
              Pending Approval ID
              <div>
                <v-icon @click="sortBy({name: 'doc_id', type: 'ASC'})" :icon="iconSort({name: 'doc_id', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'doc_id', type: 'DESC'})" :icon="iconSort({name: 'doc_id', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-15">
            <div class="table-label-div">
              Category
              <div>
                <v-icon @click="sortBy({name: 'code', type: 'ASC'})" :icon="iconSort({name: 'code', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'code', type: 'DESC'})" :icon="iconSort({name: 'code', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-15">
            <div class="table-label-div">
              Key Value
              <div>
                <v-icon @click="sortBy({name: 'key_value', type: 'ASC'})" :icon="iconSort({name: 'key_value', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'key_value', type: 'DESC'})" :icon="iconSort({name: 'key_value', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Change Mode
              <div>
                <v-icon @click="sortBy({name: 'change_mode', type: 'ASC'})" :icon="iconSort({name: 'change_mode', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'change_mode', type: 'DESC'})" :icon="iconSort({name: 'change_mode', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-15">
            <div class="table-label-div">
              Created By
              <div>
                <v-icon @click="sortBy({name: 'updated_by', type: 'ASC'})" :icon="iconSort({name: 'updated_by', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'updated_by', type: 'DESC'})" :icon="iconSort({name: 'updated_by', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="text-left w-10">
            <div class="table-label-div">
              Created Time
              <div>
                <v-icon @click="sortBy({name: 'updated_time', type: 'ASC'})" :icon="iconSort({name: 'updated_time', type: 'ASC'})" size="large"/>
                <v-icon @click="sortBy({name: 'updated_time', type: 'DESC'})" :icon="iconSort({name: 'updated_time', type: 'DESC'})" size="large"/>
              </div>
            </div>
          </th>
          <th class="w-10">
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
          <td>{{ item.jobId }}</td>
          <td>{{ item.docId }}</td>
          <td>{{ getWflType(item.docType) }}</td>
          <td>{{ item.keyValue }}</td>
          <td>{{ getChangeMode(item.changeMode) }}</td>
          <td>{{ item.createdBy }}</td>
          <td>{{ item.updatedTime }}</td>
          <td class="table-action-row">
            <button @click="editDetails(item)" :disabled="!editPermission">
              <v-icon icon="mdi-pencil" size="large"/>
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
      page: 1,
      totalPages: 1,
      pageSize: 5,
      viewPermission: true,
      editPermission: true,
      search: {
        docType: '',
        changeMode: '',
        changeModeList: [
          {
            changeMode: Const.MODE_NEW,
            val: Const.WFL_MODE_NEW
          },
          {
            changeMode: Const.MODE_EDIT,
            val: Const.WFL_MODE_EDIT
          },
          {
            changeMode: Const.MODE_DELETE,
            val: Const.WFL_MODE_DELETE
          }
        ],
        docTypeList: [
          {
            docType: Const.WFL_TYPE_STRING_GRP,
            val: Const.WFL_TYPE_GRP
          },
          {
            docType: Const.WFL_TYPE_STRING_FNC,
            val: Const.WFL_TYPE_FNC
          },
          {
            docType: Const.WFL_TYPE_STRING_GPFC,
            val: Const.WFL_TYPE_GPFC
          },
          {
            docType: Const.WFL_TYPE_STRING_USR,
            val: Const.WFL_TYPE_USR
          },
          {
            docType: Const.WFL_TYPE_STRING_FCC,
            val: Const.WFL_TYPE_FCC
          },
        ]
      },
      currentSort: '',
      isFirstAPIParam: true
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    getChangeMode(val){
      return Util.getChangeMode(val)
    },
    getWflType(val){
      return Util.getWflType(val)
    },
    onClickPagination(){
      console.log('onClickPagination', this.$data.page)
      this.getList()
    },
    // viewDetails(item){
    //   console.log(item)
    //   this.$store.commit('setUserDetail',
    //     {
    //       id: item.userId,
    //       mode: Const.MODE_VIEW
    //     }
    //   )
    //   this.$router.push({ name: 'userDetails' })
    //   // this.$router.push({ name: 'userDetails', params: {foo: 3121}, state: { title123: 'Some Message321' } })

    // },
    editDetails(item){
      switch(item.docType){
        case Const.WFL_TYPE_GRP:        
          this.$store.commit('setGroupDetail', 
            {
              dtlsId: item.docId,
              mode: Const.MODE_APPROVE_REJECT
            }
          )
          break

        case Const.WFL_TYPE_FNC:
          break

        case Const.WFL_TYPE_USR:
          this.$store.commit('setUserDetail', 
            {
              dtlsId: item.docId,
              mode: Const.MODE_APPROVE_REJECT
            }
          )
          break

        case Const.WFL_TYPE_FCC:
          break
        default:

      }
      this.$store.commit('setPendDetailData',
        {
          changeMode: Const.MODE_APPROVE_REJECT,
          docType: item.docType,
          docId: item.docId,
          jobId: item.jobId
        }
      )
      this.$router.push({ name: 'pendApprDetails' })
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
      this.$data.search.docType = '',
      this.$data.search.changeMode = ''
    },
    iconSort(obj){
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
        docType,
        changeMode
      } = this.$data.search

      const {
        currentSort,
        page,
        pageSize
      } = this.$data

      let url = "workflow/getApprovalListing"
      const originalUrl = "workflow/getApprovalListing"


      if(docType != '' && docType != null){
        url = Util.genAPIParamQuery(url, originalUrl, "docType", docType)
      }

      if(changeMode != '' && changeMode != null){
        url = Util.genAPIParamQuery(url, originalUrl, "changeMode", changeMode)
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