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
    selectable
    @row-selected="itemSelected"
    hover
  >
  <template #cell(selected)="{ rowSelected, selectRow, unselectRow }">
    <b-form-checkbox 
      :checked="rowSelected" 
      @change="rowSelected ? unselectRow() : selectRow()" 
      size="lg"
      class="text-center"
    />
  </template>
  <template #cell()="data">
    <p 
      v-if="!data.item[`edit${data.field.key}`]" 
      @click="toggleEditable(data)"
      class="text-center"
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
  <template #table-caption>
    <pre v-if="itemsSelected && itemsSelected.length">{{ itemsSelected }}</pre>
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
import { BTable, BPagination, BFormInput, BFormCheckbox } from 'bootstrap-vue';
import { Header } from '@/entities/header'

const props = defineProps<{
  items: any[];
  headers: Header[];
}>();

const emits = defineEmits(['updateValue', 'itemSelected']);

const items = ref(props.items);
const headers = ref(props.headers);

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
  if (data.field.editable) {
    const editableKey = `edit${data.field.key}`;
    data.item[editableKey] = !data.item[editableKey];
  }
};

const saveValue = (data: any) => {
  toggleEditable(data)
  const { field: { key }, value, item } = data
  emits('updateValue', { key, value, id: item.id });
};

// selecteable functions

const itemsSelected = ref<any[]>([])

const itemSelected = (item: any) => {
  console.log(Array.from(item))
  itemsSelected.value = Array.from(item);
}
</script>

<style>
th {
  text-align: center !important;
}

</style>