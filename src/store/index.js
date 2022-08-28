import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken, delToken } from '@/utils/myToken'
import { userInfoAPI } from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    myToken: getToken() || {},
    userInfo: {}
  },
  mutations: {
    updateToken(state, value) {

      state.myToken = value
      setToken(value)
    },

    updateUserInfo(state, payload) {
      state.userInfo = payload
    },

    logout(state) {
      delToken()
      state.myToken = {}
      state.userInfo = {}
    }
  },
  actions: {
    async setUserInfo(context) {

      if (!context.state.userInfo.id) {

        const res = await userInfoAPI()

        context.commit('updateUserInfo', res.data.data)
      }
      // context.commit('updateUserInfo', payload)
    }
  },

})

export default store