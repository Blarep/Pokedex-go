<template>
  <v-card
    class="pokemonCard"
    :style="{border: this.getBorder}">
    <v-img
      :src="this.imgUrl + this.id + '.png'"/>
    <v-card-text class="name">#{{ Number(this.id) }} - {{ this.getName }}</v-card-text>
  </v-card>
</template>
  
<script>
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
    exceptions: ['ho-oh', 'chi-yu', 'chien-pao', 'hakamo-o', 'jangmo-o', 'kommo-o', 'porygon-z', 'ting-lu', 'wo-chien'],
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
  }),
  computed: {
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