<template>
  <div class="home">
    <div class="home__title">
      <h1>Todo List </h1>
    </div>

    <div class="todo__box">
      <div class="todo__box-create">
        <a-row type="flex" justify="center">
          <a-col :span="12">
            <a-input 
              @keyup.enter="addTodo()"
              placeholder="Создать запись..." 
              class="todo__box-input" 
              size="large" 
              block
              v-model="todoText" 
            />
          </a-col>
          <a-col :span="4" class="d-flex">
            <a-button 
              class="todo__box-button" 
              size="large"
              @click.prevent="addTodo()"
            >
              <a-icon type="plus" />
            </a-button>
          </a-col>
        </a-row>
      </div>

      <todo-message v-if="!this.TODOS.length"/>

      <div class="todo__box-list" v-else>
      
        <draggable :list="todos" @start="drag=true" @end="drag=false" @change="changedTodos()">
          <todo-item 
            v-for="todo in this.TODOS" 
            :key="todo.id"
            :todo="todo"
          />
        </draggable>

      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex"
import TodoItem from "../components/TodoItem.vue"
import TodoMessage from "../components/TodoMessage.vue"
import draggable from 'vuedraggable'

export default {
  name: 'Home',
  components: {
    TodoItem, 
    TodoMessage, 
    draggable
  },
  data: () => ({
    todoText: "",
    todos: []
  }),
  created() {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem("todos", JSON.stringify([]))
    }
  },
  mounted() {
    this.GET_TODOS()
    this.todos = this.TODOS
  },
  methods: {
    ...mapActions([ 'ADD_TODO', "GET_TODOS" ]),

    addTodo() {
      const todoText = this.todoText
      const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        isDone: false,
        title: todoText,
      }
      
      if (newTodo && todoText) {
        this.ADD_TODO(newTodo)
        this.GET_TODOS()
        this.todoText = ""
      }
    },

    changedTodos() {
      this.$store.commit('SET_TODOS_POSITION', this.todos)
    }

  },
  computed: {
    ...mapGetters(['TODOS']),
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__title {
    h1 {
      color: white;
      font-size: 36px;
    }
  }
}

.todo__box {
  max-width: 700px;
  width: 100%;
  min-height: 500px;
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(40px);
  border-radius: 20px;
  position: relative;
  z-index: 1;

  &-create {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    border-bottom: 2px solid #57c2a2;
  }

  &-input {
    background: rgba(255, 255, 255, .3);
    border-color: transparent;
    color: #fff;
    font-size: 18px;
  }

  &-button {
    background-color: #57c2a2;
    color: #fff;
    border-color: #57c2a2;
    transition: .3s;
    min-width: 48px;

    &:hover {
      border-color: #5edbb6;
      background: #5edbb6;
      color: #fff;
    }
  }

  &-list {
    margin: 0 auto;
    width: 80%;
    padding: 20px 0;
  }
}

.d-flex {
  display: flex;
  justify-content: end;
}
</style>
