<template>
	<div class="list__item" :class="{'checked': todo.isDone}">
		<div class="list__item-title">
			<a-checkbox v-model="todo.isDone" @change="todoComplete(todo)">
			</a-checkbox>
			{{todo.title}}
		</div>

		<div class="list__item-action">
			<div class="list__item-edit">
				<a-button type="primary" @click="showModal" :disabled="todo.isDone">
					<a-icon type="edit" />
				</a-button>
			</div>

			<a-modal v-model="visible" title="Редактировать запись" on-ok="handleOk">
				<template slot="footer">
					<a-button key="back" @click="handleCancel">
						Назад
					</a-button>
					<a-button key="submit" type="primary" @click="updateTodo(todo)">
						Сохранить
					</a-button>
				</template>
				<a-input 
					placeholder="Новое название..." 
					size="large" 
					block
					v-model="newTitle" 
				/>
			</a-modal>

			<div class="list__item-delete">
				<a-button type="danger" @click="deleteTodo(todo)">
					<a-icon type="delete" />
				</a-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: "TodoItem",
	props: ['todo'],
	data: () => ({
		visible: false,
		newTitle: "",
	}),
	mounted() {

		this.newTitle = this.todo.title
	},
	methods: {
		...mapActions(['COMPLETE_TODO', 'DELETE_TODO', 'UPDATE_TODO']),
		todoComplete(todo) {
			this.COMPLETE_TODO(todo)
		},
		deleteTodo(todo) {
			this.DELETE_TODO(todo)
		},
		updateTodo(todo) {
			if(this.newTitle && this.newTitle != this.todo.title)	{
				todo.title = this.newTitle
				this.UPDATE_TODO(todo)
				this.visible = false
			}	
		},
		showModal() {
      this.visible = true
    },
    handleCancel(e) {
      this.visible = false
			this.newTitle = this.todo.title
    },
	}
}
</script>

<style lang="scss" scoped>
.list__item {
  display: flex; 
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, .3);
  backdrop-filter: blur(1px);
  position: relative;
  z-index: 1;

  &-action {
    display: flex;
  }

  &-title {
    font-size: 20px;
    font-weight: 400;
    color: white;
  }

  &-edit {
    margin-right: 10px;
  }
}

.list__item.checked {
  background: rgba(255, 255, 255, .1);
}

.list__item.checked .list__item-title {
  color: rgba(0, 0, 0, .6);
  text-decoration: line-through;
}

.ant-checkbox-wrapper {
  font-size: 20px;
  margin-right: 10px;
}
</style>>
