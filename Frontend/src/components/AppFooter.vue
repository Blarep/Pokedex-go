<template>
  <v-footer
    class="filesButtons"
    height="40"
    app>
    <v-btn-group
      class="btnGroup">
      <v-btn
      @click="this.changeGen(item.id)"
      v-for="item in this.items"
      :key="item.title"
      :icon="item.icon"
      :title="item.title"
      density="compact"/>
    </v-btn-group>
    <v-btn @click="toggleAllPokemon()" title="Marcar/Desmarcar Todos" density="compact">
    Marcar/Desmarcar Todos
    </v-btn>
    <v-btn-group
      class="btnGroup">
      <v-btn
        key="Cargar datos"
        title="Cargar datos"
        density="compact">
        <input 
          type="file"
          id="json"
          ref="uploadedJson"
          @change="this.uploadData"
          accept="application/json">
      </v-btn>
      <v-btn
        @click="this.downloadData"
        key="Descargar datos"
        icon="mdi-content-save"
        title="Descargar datos"
        density="compact"/>
    </v-btn-group>
  </v-footer>
</template>

<script>
import { useGenStore } from '@/store/genStore';
import { useDataStore } from '@/store/dataStore';
import { useTabStore } from '@/store/tabStore'; 
  export default {
    data() {
      return {
        reader: '',
        jsonUpladed: '',
        dataStore: useDataStore(),
        genStore: useGenStore(),
        tabStore: useTabStore(),
        items: [
          {
            id: 1,
            title: 'Primera Generación',
            icon: 'mdi-numeric-1',
          },
          {
            id: 2,
            title: 'Segunda Generación',
            icon: 'mdi-numeric-2',
          },
          {
            id: 3,
            title: 'Tercera Generación',
            icon: 'mdi-numeric-3',
          },
          {
            id: 4,
            title: 'Cuarta Generación',
            icon: 'mdi-numeric-4',
          },
          {
            id: 5,
            title: 'Quinta Generación',
            icon: 'mdi-numeric-5',
          },
          {
            id: 6,
            title: 'Sexta Generación',
            icon: 'mdi-numeric-6',
          },
          {
            id: 7,
            title: 'Séptima Generación',
            icon: 'mdi-numeric-7',
          },
          {
            id: 8,
            title: 'Octava Generación',
            icon: 'mdi-numeric-8',
          },
          {
            id: 9,
            title: 'Novena Generación',
            icon: 'mdi-numeric-9',
          },
          {
            id: 10,
            title: 'Megas',
            icon: 'mdi-alpha-m-box-outline',
          },
        ],
      }
    },
    methods:{
      changeGen(selectedGen) {
        this.genStore.setGen(selectedGen);
      },
      uploadData(event) {
        const file = event.target.files[0];
        if (file.type !== 'application/json' || !file) {
          alert('Por favor selecciona un archivo JSON.');
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const jsonContent = JSON.parse(reader.result);
          jsonContent.forEach((pokemon) => {
            this.dataStore.replacePokemonData(pokemon);
          });
        };
        reader.readAsText(file);
      },
      downloadData() {
        this.dataStore.downloadData();
      },
      toggleAllPokemon() {
        // Obtén la lista de Pokémon de la generación actual
        const pokemonList = this.dataStore.getListData();
        const primera = pokemonList.filter((item) => item.id <= 151);
        const segunda = pokemonList.filter((item) => item.id >= 152 && item.id <= 251);
        const tercera = pokemonList.filter((item) => item.id >= 252 && item.id <= 386);
        const cuarta = pokemonList.filter((item) => item.id >= 387 && item.id <= 493);
        const quinta = pokemonList.filter((item) => item.id >= 494 && item.id <= 649);
        const sexta = pokemonList.filter((item) => item.id >= 650 && item.id <= 721);
        const septima = pokemonList.filter((item) => item.id >= 722 && item.id <= 809);
        const octava = pokemonList.filter((item) => item.id >= 810 && item.id <= 905);
        const novena = pokemonList.filter((item) => item.id >= 906 && item.id <= 1025);
        const megas = pokemonList.filter((item) => item.name.includes("-mega") || item.name.includes("-primal"));
        const currentGen = this.genStore.getGen();
        const currentTab = this.tabStore.getTab();
        const tabMap = {
          'Normal' : 'captured',
          'Shiny' : 'shiny',
          'Oscuro': 'dark',
          'Purificado': 'purified',
          'Con suerte': 'lucky',
        }; 
        const genMap = {
          1: primera,
          2: segunda,
          3: tercera,
          4: cuarta,
          5: quinta,
          6: sexta,
          7: septima,
          8: octava,
          9: novena,
          10: megas,
        };
        // Verifica si hay al menos un Pokémon sin capturar
        const atLeastOneNotCaptured = genMap[currentGen].some(pokemon => !pokemon[tabMap[currentTab]]);
        
        // Si al menos uno no está capturado, marca todos; de lo contrario, desmarca todos
        genMap[currentGen].forEach(pokemon => {
          pokemon[tabMap[currentTab]] = atLeastOneNotCaptured;
        });
        //this.dataStore.setListData(genMap[currentGen]);
      },
    },
  }

</script>

<style>
.filesButtons {
  display: flex;
  justify-content: space-between;
}
.btnGroup {
  height: 40px !important;
}
</style>
