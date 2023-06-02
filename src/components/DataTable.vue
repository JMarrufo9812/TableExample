<template>
  <b-table
    :items="paginatedItems"
    :fields="headers"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :sort-directions="sortDirections"
    :per-page="perPage"
    :current-page="currentPage"
    @filtered="resetPagination"
  >
    <template #table-caption>This is a table caption.</template>
    <template #cell()="data">
      <!-- <pre>{{ data }}</pre> -->
      <p 
        v-if="!data.item[`edit${data.field.key}`]" 
        @click="toggleEditable(data)"
      >
        {{ data.item[data.field.key] }}
      </p>
      <b-form-input 
        v-else 
        type="text" 
        v-model="data.item[data.field.key]" 
        @keyup.enter="saveValue(data)" 
      />
    </template>
  </b-table>
  <b-pagination
    v-model="currentPage"
    :total-rows="filteredItems.length"
    :per-page="perPage"
    align="center"
    size="sm"
  ></b-pagination>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits } from 'vue';
import { BTable, BPagination, BFormInput } from 'bootstrap-vue';
import { Header } from '@/entities/header'

const props = defineProps<{
  items: any[];
  headers: Header[];
}>();

const emits = defineEmits(['updateValue']);

const items = ref(props.items);
let headers = ref(props.headers.map(item => Object.assign({}, item, { editable: false })));

// sorteable functions

const sortBy = ref('');
const sortDesc = ref(false);
const sortDirections = ['asc', 'desc'];

const filteredItems = computed(() => {
  const sortedItems = [...items.value];
  if (sortBy.value) {
    sortedItems.sort((a, b) => {
      const fieldA = a[sortBy.value];
      const fieldB = b[sortBy.value];
      if (fieldA < fieldB) return sortDesc.value ? 1 : -1;
      if (fieldA > fieldB) return sortDesc.value ? -1 : 1;
      return 0;
    });
  }
  return sortedItems;
});

// paginated functions

const perPage = ref(10);
const currentPage = ref(1);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredItems.value.slice(start, end);
});

const resetPagination = () => {
  currentPage.value = 1;
};

watch([currentPage, perPage], resetPagination);

// editable functions
const toggleEditable = (data: any) => {
  const editableKey = `edit${data.field.key}`;
  data.item[editableKey] = !data.item[editableKey];
};
// // // Obtiene el tipo de input según el tipo de campo
// const getInputType = (field: Header): string => {
//   // if (field.type === 'number') {
//   //   return 'number';
//   // }
//   return 'text';
// };

const saveValue = (data: any) => {
  toggleEditable(data)
  const { field: { key }, value } = data
  console.log(data)
  emits('updateValue', { key, value });
};

</script>

