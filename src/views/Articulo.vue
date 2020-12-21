<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="Salir()" :class="'text white--text'"
        >Salir</v-btn>
    </v-app-bar>

    <v-navigation-drawer 
    v-model="drawer"
    fixed
    temporary
    >
     <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list dense>

      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="{name: item.ruta}"
          exact
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

  </v-card>
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
          <data-articulo></data-articulo>
      </v-container>
    </v-main>
  </v-app>


</template>

<script>
import DataArticulo from '../components/auth/DataArticulo.vue'
export default {
    components:{
        DataArticulo

    },
     data: () => ({
         drawer: null,
      selectedItem: 1,
      items: [
        { text: 'Home', icon: 'mdi-home', ruta: 'Home' },
        { text: 'Categoria', icon: 'mdi-file',  ruta: 'Categoria'  },
        { text: 'Articulo', icon: 'mdi-mdi-card-outline',  ruta: 'Articulo'  },
        { text: 'Usuario', icon: 'mdi-account',  ruta: 'Usuario'  },
      ],
    }),
    methods: {
          async GoHome() {
          this.$router.push('/');
          },
          async Salir(){
            this.$store.dispatch('salir')
          }
        }
}
</script>