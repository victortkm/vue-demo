import { createStore } from 'vuex'
import Const from '../constant'

export default createStore({
  state: {
    userDetail: {
      dtlsId: 32,
      mode: Const.MODE_VIEW
    },
    groupDetail: {
      dtlsId: 7,
      mode: Const.MODE_VIEW
    },
    functionDetail: {
      dtlsId: 20,
      mode: Const.MODE_VIEW
    },
    functionCategoryDetail: {
      dtlsId: 20,
      mode: Const.MODE_VIEW
    },
    count: 322,
    pendDetail: {
      changeMode: Const.MODE_APPROVE_REJECT,
      docType: Const.WFL_TYPE_USR,
      docId: 1,
      jobId: 1
    },
    loginDetail: {
      userName: '',
      functionDtlsId: '',
      firstName: ''
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
    getFunctionDetail(state){
      return state.functionDetail
    },
    getFunctionCategoryDetail(state){
      return state.functionCategoryDetail
    },
    getPendDetailData(state){
      return state.pendDetail
    },
    getLoginDetailData(state){
      return state.loginDetail
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
    setFunctionCategoryDetail(state, item){
      console.log("setFunctionCategoryDetail item",item)
      state.functionCategoryDetail = item
    },
    setGroupDetail(state, item){
      console.log("item",item)
      state.groupDetail = item
    },
    setFunctionDetail(state, item){
      console.log("setFunctionDetail item",item)
      state.functionDetail = item
    },
    setPendDetailData(state, item){
      console.log("item",item)
      state.pendDetail = item
    },
    setLoginDetailData(state, item){
      console.log("item",item)
      state.loginDetail = item
    }
  },
  actions: {
  },
  modules: {
  }
})
