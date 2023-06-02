<template>
  <div class="app">
    <DataTable :items="users" :headers="headers" @updateValue="updateValue"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/DataTable.vue'
import { useUsersStore } from '@/store/users'

const usersStore = useUsersStore()

const users = usersStore.users

function updateValue(newValue: any) {
  console.log(newValue)
}

const headers = ref([
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
</script>

<style lang="scss">
// @import "@/styles/variables.scss";

// .app {
//   // background-color: $primary-color;
//   // color: $secondary-color;
// }
</style>