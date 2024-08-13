import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter', {
  state: () => ({
    filter: 'All',
  }),
  actions: {
    setFilter(selectedFilter) {
      this.filter = selectedFilter;
    },
    getFilter() {
      return this.filter;
    },
  }
});