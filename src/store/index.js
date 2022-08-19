import Vue from 'vue'
import Vuex from 'vuex'
import {setToken, getToken} from '@/utils/myToken' 

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      myToken: getToken() || {}
    },
    mutations: {
      updateToken (state, value) {
        
        state.myToken = value
        setToken(value)
      }
    }
  })

  export default store