import { createStore } from 'vuex'
import Const from '../constant'

export default createStore({
  state: {
    userDetail: {
      id: 27,
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
    getUserDeta(state){
      return state.userDetail
    },
    getPendDetailDeta(state){
      return state.pendDetail
    }
  },
  mutations: {
    increment(state){
      state.count++
    },
    setUserDetail(state, item){
      console.log("item",item)
      state.userDetail = item
    },
    setPendDetailDeta(state, item){
      console.log("item",item)
      state.pendDetail = item
    }
  },
  actions: {
  },
  modules: {
  }
})
