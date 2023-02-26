import { createStore } from 'vuex'

export default createStore({
  state: {
    userDetail: {
      id: 27,
      mode: 'View'
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
