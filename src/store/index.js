import { createStore } from 'vuex'
import Const from '../constant'

export default createStore({
  state: {
    userDetail: {
      id: 31,
      mode: Const.MODE_VIEW
    },
    groupDetail: {
      id: 7,
      mode: Const.MODE_VIEW
    },
    count: 322,
    pendDetail: {
      changeMode: Const.MODE_APPROVE_REJECT,
      docType: Const.WFL_TYPE_USR,
      docId: 1,
      jobId: 1
    }
  },
  getters: {
    getCount(state){
      return state.count
    },
    getUserDetail(state){
      return state.userDetail
    },
    getGroupDetail(state){
      return state.groupDetail
    },
    getPendDetailData(state){
      return state.pendDetail
    }
  },
  mutations: {
    increment(state){
      state.count++
    },
    setUserDetail(state, item){
      console.log("setUserDetail item",item)
      state.userDetail = item
    },
    setGroupDetail(state, item){
      console.log("item",item)
      state.groupDetail = item
    },
    setPendDetailData(state, item){
      console.log("item",item)
      state.pendDetail = item
    }
  },
  actions: {
  },
  modules: {
  }
})
