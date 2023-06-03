<template>
  <b-table
    :items="items"
    :fields="headers"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :per-page="perPage"
    :current-page="currentPage"
    selectable
    @row-selected="itemSelected"
    hover
    outlined
    bordered
    table-variant="light"
    >
  <template #cell(selected)="{ rowSelected, selectRow, unselectRow }">
    <b-form-checkbox 
      :checked="rowSelected" 
      @change="rowSelected ? unselectRow() : selectRow()" 
      size="lg"
      class="text-center"
    />
  </template>
  <template #cell(status)="data">
    <b-button 
      @click="(() => { data.value = !data.item.status, saveValue(data)})" 
      size="sm" 
      :variant="data.item.status ? 'success' : ''"
    >
      {{ data.item.status ? 'Activo' : 'Inactivo' }}
    </b-button>
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
      @keyup.enter.stop="saveValue(data)" 
    />
  </template>
  <template #table-caption>
    <pre v-if="itemsSelected && itemsSelected.length">{{ itemsSelected }}</pre>
  </template>
  </b-table>
  <b-pagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    align="center"
    size="xl"
    ></b-pagination>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';
import { BTable, BPagination, BFormInput, BFormCheckbox, BButton } from 'bootstrap-vue';
import { Header } from '@/entities/header'

const props = defineProps<{
  items: any[];
  headers: Header[];
}>();

const emits = defineEmits(['updateValue', 'itemSelected']);

const items = ref(props.items);
const headers = ref(props.headers);

// sorteable functions

const sortBy = ref('desc');
const sortDesc = ref(false);

// paginated functions

const perPage = ref(10);
const currentPage = ref(1);

const rows = computed(() => {
  return items.value.length
})

// editable functions

const toggleEditable = (data: any) => {
  if (data.field.editable) {
    const editableKey = `edit${data.field.key}`;
    data.item[editableKey] = !data.item[editableKey];
  }
};

const saveValue = (data: any) => {
  console.log(data)
  const { field: { key }, value, item } = data
  emits('updateValue', { key, value, id: item.id });
  toggleEditable(data)
};

// selecteable functions

const itemsSelected = ref<any[]>([])

const itemSelected = (item: any) => {
  itemsSelected.value = Array.from(item);
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

th {
  text-align: center !important;
  background: $primary;
  color: #fff !important;
}
</style>