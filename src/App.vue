<template>
  <b-container fluid class="app vh-100">
    <b-row>
      <b-col align-self="center">
        <span class="title">
          Generador de usuarios
        </span>
      </b-col>
      <b-col class="d-flex justify-content-end my-4">
        <b-button @click="generateUser(1)" variant="primary">
          Añadir usuario
        </b-button>
      </b-col>
    </b-row>
    <DataTable 
      :items="usersStore.users" 
      :headers="headers" 
      @updateValue="updateValue"
    />
  </b-container>
</template>

<script setup lang="ts">
import { ref,  onMounted } from 'vue';
import DataTable from '@/components/DataTable.vue'
import { useUsersStore } from '@/store/users'
import { generateUsers  } from '@/utils'
import { User, UpdateUserValue } from '@/entities/user.ts'
import { BRow, BButton, BCol, BContainer } from 'bootstrap-vue'


const usersStore = useUsersStore()

function updateValue(updateInfo: UpdateUserValue) {
  usersStore.updateValue(updateInfo)
}

const headers = ref([
  { 
    label: '',
    key: 'selected',
  },
  {
    label: 'Nombre',
    key: 'name',
    sortable: true,
    editable: true,
  },
  {
    label: 'Fecha',
    key: 'date',
    sortable: true,
    editable: false,
  },
  {
    label: 'Estado',
    key: 'status',
    sortable: true,
    editable: false,
  },
]);

function generateUser (quantity: number) {
  generateUsers(quantity).forEach((user: User) => {
    usersStore.create(user)
  })
}

onMounted(() => {
  generateUser(5)
});
</script>

<style lang="scss">
@import "@/styles/text.scss";
@import "@/styles/variables.scss";

.app {
  background: $background
}

</style>