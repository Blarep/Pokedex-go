<template>
  <div class="container">
    <v-tabs
      v-model="defaultTab"
      grow>
      <v-tab
        v-for="tab in tabs"
        :key="tab"
        :value="tab"
        @click="saveTab(tab)">
        {{ tab }}
      </v-tab>
    </v-tabs>
    <v-window v-model="defaultTab">
      <v-window-item
        class="pokemonList"
        v-for="tab in tabs"
        :key="tab"
        :value="tab">
        <div v-for="pokemon in pokemonList">
          <PokimonCard
            :id="pokemon.id.toString()"
            :name="pokemon.name"
            :captured="pokemon.captured"
            :shiny="pokemon.shiny"
            :dark="pokemon.dark"
            :purified="pokemon.purified"
            :lucky="pokemon.lucky"
            :tab="tab"/>
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
  import PokimonCard from './PokimonCard.vue';
  import jsonData from '../mocks/pokedex.json';
  import { useGenStore } from '@/store/genStore';
  import { useDataStore } from '@/store/dataStore';
  import { useTabStore } from '@/store/tabStore';
  import { useFilterStore } from '@/store/filterStore';

  export default {
    setup() {
      const filterStore = useFilterStore();
      return {
        filterStore,
      };
    },
    components: {
      PokimonCard,
    },
    data() {
      return {
        genStore: useGenStore(),
        dataStore: useDataStore(),
        tabStore: useTabStore(),
        defaultTab: 'Normal',
        defaultFilter: 'All',
        tabs: [
          'Normal', 'Shiny', 'Oscuro', 'Purificado', 'Con suerte'
        ],
        fullList: [],
        primera: [], segunda: [], tercera: [], cuarta: [], quinta: [], sexta: [],
        septima: [], octava: [], novena: [], megas: [],
        gen: 1,
      }
    },
    computed: {
      pokemonList() {
        this.filterGens();
        const genMap = {
          1: this.primera,
          2: this.segunda,
          3: this.tercera,
          4: this.cuarta,
          5: this.quinta,
          6: this.sexta,
          7: this.septima,
          8: this.octava,
          9: this.novena,
          10: this.megas,
        };
        let filteredList = genMap[this.genStore.getGen()];
    
        // Aplicar filtro
        const currentFilter = this.filterStore.getFilter();
        if (currentFilter === 'Obtained') {
          filteredList = filteredList.filter(pokemon => pokemon.captured);
        } else if (currentFilter === 'Missing') {
          filteredList = filteredList.filter(pokemon => !pokemon.captured);
        }
        
        return filteredList;
      },
    },
    mounted() {
      console.log("El maty se la come, suscribanse con Twitch prime a AlexElCapo");
      if (this.dataStore.getListData().length === 0) {
        this.dataStore.setListData(jsonData);
      }
      this.fullList = this.dataStore.getListData();
      this.filterStore.setFilter('All');
    },
    methods: {
      filterGens() {
        this.primera = this.fullList.filter((item) => item.id <= 151);
        this.segunda = this.fullList.filter((item) => item.id >= 152 && item.id <= 251);
        this.tercera = this.fullList.filter((item) => item.id >= 252 && item.id <= 386);
        this.cuarta = this.fullList.filter((item) => item.id >= 387 && item.id <= 493);
        this.quinta = this.fullList.filter((item) => item.id >= 494 && item.id <= 649);
        this.sexta = this.fullList.filter((item) => item.id >= 650 && item.id <= 721);
        this.septima = this.fullList.filter((item) => item.id >= 722 && item.id <= 809);
        this.octava = this.fullList.filter((item) => item.id >= 810 && item.id <= 905);
        this.novena = this.fullList.filter((item) => item.id >= 906 && item.id <= 1025);
        this.megas = this.fullList.filter((item) => item.name.includes("-mega") || item.name.includes("-primal"));
      },
      saveTab(selectedTab) {
        this.tabStore.setTab(selectedTab);
      }
    },
  }
</script>

<style>
.container {
  padding-top: 20px
}
.pokemonList {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
}

.test {
  background-color: aqua;
}
</style>