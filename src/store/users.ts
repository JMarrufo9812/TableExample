import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User } from '@/entities/user'

export const useUsersStore = defineStore('usersStore', () => {
  // state
  const users = ref<User[]>([
    { id: Math.floor(Math.random() * Math.random()), name:"Pepa", status: true, date: new Date(Math.random()) },
    { id: Math.floor(Math.random()), name:"Paco", status: true, date: new Date(Math.random()) },
    { id: Math.floor(Math.random()), name:"Maria", status: true, date: new Date(Math.random()) },
    { id: Math.floor(Math.random()), name:"Susana", status: true, date: new Date(Math.random()) },
    { id: Math.floor(Math.random()), name:"Pau", status: false, date: new Date(Math.random()) },
    { id: Math.floor(Math.random()), name:"Jose", status: false, date: new Date(Math.random()) },
    { id: Math.floor(Math.random()), name:"Pepe", status: false, date: new Date(Math.random()) }
  ])

  return {
      users
  }
})