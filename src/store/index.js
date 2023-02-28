import { createStore } from 'vuex'
import Const from '../constant'

export default createStore({
  state: {
    userDetail: {
      id: 27,
      mode: Const.MODE_VIEW
    },
    count: 322
  },
  getters: {
    getCount(state){
      return state.count
    },
    getUserDeta(state){
      return state.userDetail
    }
  },
  mutations: {
    increment(state){
      state.count++
    },
    setUserDetail(state, item){
      console.log("item",item)
      state.userDetail = item
    }
  },
  actions: {
  },
  modules: {
  }
})
