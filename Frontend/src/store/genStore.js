import { defineStore } from 'pinia';

export const useGenStore = defineStore('gen', {
  state: () => ({
    gen: 1,
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