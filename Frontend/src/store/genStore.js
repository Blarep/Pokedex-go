import { defineStore } from 'pinia';

export const useGenStore = defineStore('gen', {
  state: () => ({
    gen: [],
  }),
  actions: {
    setGen(selectedGen) {
      this.gen = selectedGen;
    },
    getGen() {
      return this.gen;
    },
  }
});