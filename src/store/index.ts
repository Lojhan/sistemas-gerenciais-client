import { User } from '@/classes/user';
import requests from '@/plugins/requests';
import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router/index"
import { axiosInstance, axiosVending } from '@/plugins/axios';
import { TOKEN } from '@/plugins/constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logging: false as string | boolean,
    authenticated: false,
    user: {} as User,
    cart: [] as any[]

  },
  getters: {
    username: (state) => state.user.username,
    token: (state) => state.user.token,
    role: (state) => state.user.type,
    authenticated: (state) => state.authenticated,
    logging: (state) => state.logging,
    cart: (state) => state.cart,
  },
  mutations: {    
    async authenticate(state, { user, password }) {
    state.logging = true;
    try {
      const { data } = await requests.signIn(user, password);
      state.user = {
        username: user,
        token: data.accessToken,
        type: data.type,
      };
      state.authenticated = true;
      state.logging = false;
      localStorage.setItem('token', state.user.token);
      localStorage.setItem('username', state.user.username);
      localStorage.setItem('type', state.user.type);
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + TOKEN
      axiosVending.defaults.headers['Authorization'] = 'Bearer ' + TOKEN
    } catch (error) {
      state.logging = 'error';
    }
  },   
  addToCart(state, payload) {
    state.cart.push(payload)
  },
  removeFromCart(state, payload) {
    state.cart.splice(state.cart.indexOf(payload), 1)
  },
  clearCart(state) {
    state.cart = []
  },
  },
  actions: {
    authenticate: ({ commit }, payload ) => commit("authenticate", payload),
    addToCart: ({ commit }, payload ) => commit("addToCart", payload),
    removeFromCart: ({ commit }, payload ) => commit("removeFromCart", payload),
    clearCart: ({ commit } ) => commit("clearCart"),
  },
  modules: {
  }
})
