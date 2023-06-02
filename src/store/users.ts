import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User, UpdateUserValue } from '@/entities/user'

export const useUsersStore = defineStore('usersStore', () => {
  // state
  const users = ref<User[]>([])

  function create(user: User) {
    users.value.push(user)
  }

  function updateValue(updateInfo: UpdateUserValue) {
    users.value = users.value.map((user) => {
      if(user.id === updateInfo.id) {
        (user as any)[updateInfo.key] = updateInfo.value
      }
      return user
    })
  }

  return {
      users,
      create,
      updateValue
  }
})