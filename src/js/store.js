
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      fontsize: localStorage.fontsize || 14
    }
  },
  getters: {
    fontsize: (state) => {
      return state.fontsize
    }
  },
  mutations: {
    fontsize (state, size) {
      state.fontsize = size
    }
  }
})
export default store;
