<template>
  <div class="app">
    <DataTable 
      :items="usersStore.users" 
      :headers="headers" 
      @updateValue="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
import { ref,  onMounted } from 'vue';
import DataTable from '@/components/DataTable.vue'
import { useUsersStore } from '@/store/users'
import { generateUsers  } from '@/utils'
import { User, UpdateUserValue } from '@/entities/user.ts'


const usersStore = useUsersStore()

function updateValue(updateInfo: UpdateUserValue) {
  usersStore.updateValue(updateInfo)
}

const headers = ref([
  { 
    label: '',
    key: 'selected',
    class: 'align-center',
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

onMounted(() => {
  generateUsers(10).forEach((user: User) => {
    usersStore.create(user)
  })
});
</script>

<style lang="scss">
// @import "@/styles/variables.scss";

// .app {
//   // background-color: $primary-color;
//   // color: $secondary-color;
// }
</style>