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
  export default {
    data() {
      return {
        reader: '',
        jsonUpladed: '',
        dataStore: useDataStore(),
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
