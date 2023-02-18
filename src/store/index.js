import { createStore } from 'vuex'

export default createStore({
  state: {
    userdetail: {
      id: 0,
      mode: 'view'
    },
    count: 322
  },
  getters: {
    getCount(state){
      return state.count
    }
  },
  mutations: {
    increment(state){
      state.count++
    },
    setUserDetail(state, item){
      state.userDetail = item
    }
  },
  actions: {
  },
  modules: {
  }
})
