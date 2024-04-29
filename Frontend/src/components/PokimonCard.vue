<template>
  <v-card
    @click="this.pressPokemon"
    class="pokemonCard"
    :style="{
      border: this.getBorder,
      width: this.isMega ? '220px' : '180px',
      height: this.isMega ? '250px' : '210px'}">
    <v-img
      :alt="this.name"
      :src="this.imgUrl + this.id + '.png'"/>
    <v-card-text class="name">{{ isMega ? this.getName : '#' + this.id + ' - ' + this.getName }}</v-card-text>
  </v-card>
</template>
  
<script>
import { useDataStore } from '@/store/dataStore';
export default {
  props: {
    id: String,
    name: String,
    captured: Boolean,
    shiny: Boolean,
    dark: Boolean,
    purified: Boolean,
    lucky: Boolean,
    tab: String,
  },
  data: () => ({
    jsonToChange: {},
    dataStore: useDataStore(),
    exceptions: ['ho-oh', 'chi-yu', 'chien-pao', 'hakamo-o', 'jangmo-o', 'kommo-o', 'porygon-z', 'ting-lu', 'wo-chien'],
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
  }),
  computed: {
    isMega() {
      return this.name.includes('-mega') || this.name.includes('-primal');
    },
    getBorder() {
      if (this.tab == 'Normal' && this.captured) {
        return '2px solid blue'; 
      } else if (this.tab == 'Shiny' && this.shiny) {
        return '2px solid gold'; 
      } else if (this.tab == 'Oscuro' && this.dark) {
        return '2px solid purple'; 
      } else if (this.tab == 'Purificado' && this.purified) {
        return '2px solid white'; 
      } else if (this.tab == 'Con suerte' && this.lucky) {
        return '2px solid green'; 
      } else {
        return '';
      }
    },
    getName() {
      return this.exceptions.indexOf(this.name) != -1
      || (Number(this.id) < 10000 && Number(this.id) > 980)
      || this.name.includes('-mega')
      || this.name.includes('-primal')
      ? this.name.replace('-', ' ')
      : this.name.split('-')[0]
    },
  },
  methods: {
    correctTab(attrChecked) {
      if (attrChecked == 'captured' && this.tab == 'Normal') {
        return true;
      } else if (attrChecked == 'shiny' && this.tab == 'Shiny') {
        return true;
      } else if (attrChecked == 'dark' && this.tab == 'Oscuro') {
        return true;
      } else if (attrChecked == 'purified' && this.tab == 'Purificado') {
        return true;
      } else if (attrChecked == 'lucky' && this.tab == 'Con suerte') {
        return true;
      } else {
        return false;
      }
    },
    pressPokemon() {
      this.jsonToChange = {
        id: this.id,
        name: this.name,
        captured: this.correctTab('captured') ? !this.captured : this.captured,
        shiny: this.correctTab('shiny') ? !this.shiny : this.shiny,
        dark: this.correctTab('dark') ? !this.dark : this.dark,
        purified: this.correctTab('purified') ? !this.purified : this.purified,
        lucky: this.correctTab('lucky') ? !this.lucky : this.lucky,
      };
      this.dataStore.replacePokemonData(this.jsonToChange);
    },
  },
}
</script>
  
<style>

.pokemonCard{
  width: 180px;
  height: 210px;
  margin: 6px;
  text-align: center;
}

.name {
  margin-top: -1rem;
  text-transform: capitalize !important;
}

</style>