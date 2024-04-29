<template>
  <v-footer height="40" app>
    <v-btn
      @click="this.changeGen(item.id)"
      v-for="item in this.items"
      :key="item.title"
      :icon="item.icon"
      :title="item.title"
      density="compact"/>
  </v-footer>
</template>

<script>
import { useGenStore } from '@/store/genStore'
  export default {
    data() {
      return {
        genStore: useGenStore(),
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
      changeGen(selectedGen){
        this.genStore.setGen(selectedGen);
      }
    },
  }

</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
