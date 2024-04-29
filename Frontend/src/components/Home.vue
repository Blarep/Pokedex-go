<template>
  <v-container>
    <v-tabs
      v-model="defaultTab"
      grow>
      <v-tab
        v-for="tab in tabs"
        :key="tab"
        :value="tab">
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
  </v-container>
</template>

<script>
  import PokimonCard from './PokimonCard.vue';
  import jsonData from '../mocks/pokedex.json';
  import { useGenStore } from '@/store/genStore'
  export default {
    components: {
      PokimonCard,
    },
    data() {
      return {
        genStore : useGenStore(),
        defaultTab: 'Normal',
        tabs: [
          'Normal', 'Shiny', 'Oscuro', 'Purificado', 'Con suerte'
        ],
        primera: [], segunda: [], tercera: [], cuarta: [], quinta: [], sexta: [],
        septima: [], octava: [], novena: [], megas: [],
        gen: 1,
      }
    },
    computed: {
      pokemonList() {
        this.primera = jsonData.filter((item) => item.id <= 151);
        this.segunda = jsonData.filter((item) => item.id >= 152 && item.id <= 251);
        this.tercera = jsonData.filter((item) => item.id >= 252 && item.id <= 386);
        this.cuarta = jsonData.filter((item) => item.id >= 387 && item.id <= 493);
        this.quinta = jsonData.filter((item) => item.id >= 494 && item.id <= 649);
        this.sexta = jsonData.filter((item) => item.id >= 650 && item.id <= 721);
        this.septima = jsonData.filter((item) => item.id >= 722 && item.id <= 809);
        this.octava = jsonData.filter((item) => item.id >= 810 && item.id <= 905);
        this.novena = jsonData.filter((item) => item.id >= 906 && item.id <= 1025);
        this.megas = jsonData.filter((item) => item.name.includes("-mega") || item.name.includes("-primal"));
        switch (this.genStore.getGen()) {
          case 1:
            return this.primera;
          case 2:
            return this.segunda;
          case 3:
            return this.tercera;
          case 4:
            return this.cuarta;
          case 5:
            return this.quinta;
          case 6:
            return this.sexta;
          case 7:
            return this.septima;
          case 8:
            return this.octava;
          case 9:
            return this.novena;
          case 10:
            return this.megas;
          default:
            return this.primera;
        }
      }
    }
  }
</script>

<style>
.pokemonList{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.test {
  background-color: aqua;
}
</style>