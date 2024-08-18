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
    downloadDataTXT() {
      const pokemonList = this.getListData();
      
      const regions = {
        primera: pokemonList.filter((item) => item.id <= 151),
        segunda: pokemonList.filter((item) => item.id >= 152 && item.id <= 251),
        tercera: pokemonList.filter((item) => item.id >= 252 && item.id <= 386),
        cuarta: pokemonList.filter((item) => item.id >= 387 && item.id <= 493),
        quinta: pokemonList.filter((item) => item.id >= 494 && item.id <= 649),
        sexta: pokemonList.filter((item) => item.id >= 650 && item.id <= 721),
        septima: pokemonList.filter((item) => item.id >= 722 && item.id <= 809),
        octava: pokemonList.filter((item) => item.id >= 810 && item.id <= 905),
        novena: pokemonList.filter((item) => item.id >= 906 && item.id <= 1025),
        megas: pokemonList.filter((item) => item.name.includes("-mega") || item.name.includes("-primal"))
      };

      const categories = ['captured', 'shiny', 'dark', 'purified', 'lucky'];
      
      let txtContent = '';
      
      categories.forEach((category) => {
        txtContent += `\n\n${category.charAt(0).toUpperCase() + category.slice(1)}:\n`;
        for (const [region, pokemons] of Object.entries(regions)) {
          const filteredPokemons = pokemons.filter(pokemon => pokemon[category]);
          const notFilteredPokemons = pokemons.filter(pokemon => !pokemon[category]);
          txtContent += `\n${region.charAt(0).toUpperCase() + region.slice(1)} - ${category.charAt(0).toUpperCase() + category.slice(1)}:\n`;
          txtContent += filteredPokemons.map(pokemon => pokemon.name).join(', ') || 'None';
          txtContent += `\n${region.charAt(0).toUpperCase() + region.slice(1)} - Not ${category.charAt(0).toUpperCase() + category.slice(1)}:\n`;
          txtContent += notFilteredPokemons.map(pokemon => pokemon.name).join(', ') || 'None';
        }
      });

      let blob = new Blob([txtContent], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "Pokédex.txt");
    },
    plugins: [persistStatePlugin]
  }
});