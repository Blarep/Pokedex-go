import { defineStore } from 'pinia';
import { saveAs } from 'file-saver';

// Plugin para guardar el estado en localStorage
export const persistStatePlugin = (context) => {
  const storedState = localStorage.getItem(context.store.$id);
  if (storedState) {
    context.store.$patch(JSON.parse(storedState));
  }

  context.store.$subscribe((mutation, state) => {
    localStorage.setItem(context.store.$id, JSON.stringify(state));
  });
}

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
      if (pokemonData.id < 10000) {
        this.data[pokemonData.id - 1] = pokemonData;
      } else {
        this.data[pokemonData.id - 8976] = pokemonData;
      }
    },
    downloadData(){
      let blob = new Blob([JSON.stringify(this.data)], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "Pokédex.json");
    },
    plugins: [persistStatePlugin]
  }
});