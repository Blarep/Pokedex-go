import { defineStore } from 'pinia';

export const useTabStore = defineStore('tab', {
  state: () => ({
    tab: 'Normal',
  }),
  actions: {
    setTab(selectedTab) {
      this.tab = selectedTab;
    },
    getTab() {
      return this.tab;
    },
  }
});