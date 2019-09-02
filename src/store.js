import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeather: {},
    city: "",
    lat: 0,
    lon: 0,
    errorMessage: ""
  },
  mutations: {
    updateError(state, payload) {
      state.errorMessage = payload;
    },
    updateCity(state, payload) {
      state.city = payload;
    },
    updateWeather(state, payload) {
      state.currentWeather = payload;
    }
  },
  actions: {
    updateError: ({
      commit
    }, payload) => {
      commit('updateError', payload);
    },
    updateCity: ({
      commit
    }, payload) => {
      commit('updateCity', payload);
    },
    updateWeather: ({
      commit
    }, payload) => {
      commit('updateWeather', payload);
    },
  },
  getters: {
    getErrorMessage: state => {
      return state.errorMessage;
    },
    getCurrentWeather: state => {
      return state.currentWeather;
    },
    getCurrentCity: state => {
      return state.city
    }
  }
})