import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
  },
  mutations: {
    SET_TODOS_POSITION(state, payload) {
      state.todos = payload
      localStorage.setItem("todos", JSON.stringify(state.todos))
    },
    SET_TODOS(state, payload) {
      state.todos.unshift(payload)
      localStorage.setItem("todos", JSON.stringify(state.todos))
    },
    SET_TODOS_LOCAL(state) {
      state.todos = JSON.parse(localStorage.getItem("todos"))
    },
    SET_COMPLETE_TODOS(state, payload) {
      const index = state.todos.indexOf(payload)
      state.todos.splice(index, 1)
      state.todos.push(payload)
      localStorage.setItem("todos", JSON.stringify(state.todos))
    },
    SET_DELETE_TODOS(state, payload) {
      const index = state.todos.indexOf(payload)
      state.todos.splice(index, 1)
      localStorage.setItem("todos", JSON.stringify(state.todos))
    },
    SET_UPDATED_TODO(state, payload) {
      const index = state.todos.indexOf(payload)
      state.todos.splice(index, 1, payload)
      localStorage.setItem("todos", JSON.stringify(state.todos))
    }
  },
  actions: {
    ADD_TODO({commit}, payload) {
      commit('SET_TODOS', payload)
    },
    COMPLETE_TODO({commit}, payload) {
      commit('SET_COMPLETE_TODOS', payload)
    },
    DELETE_TODO({commit}, payload) {
      commit('SET_DELETE_TODOS', payload)
    },
    GET_TODOS({ commit }) {
      commit("SET_TODOS_LOCAL")
    },
    UPDATE_TODO({commit}, payload) {
      commit('SET_UPDATED_TODO', payload)
    }
  },
  getters: {
    TODOS(state) {
      if (state.todos) {
        return state.todos
      }
      return []
    }
  },
  modules: {}
})
