import { defineStore } from 'pinia';
import { saveAs } from 'file-saver';

export const useDataStore = defineStore('data', {
  state: () => ({
    data: [],
  }),
  actions: {
    setListData(newData) {
      this.data = newData;
    },
    getListData() {
      return this.data;
    },
    replacePokemonData(pokemonData){
      this.data[pokemonData.id - 1] = pokemonData;
    },
    downloadData(){
      let blob = new Blob([JSON.stringify(this.data)], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "Pokédex.json");
    },
  }
});