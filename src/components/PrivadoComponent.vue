<template>
    <v-app id="inspire">
        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Privado</v-toolbar-title>
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
  </v-navigation-drawer>
        <v-main class="grey lighten-2">
            <v-container>
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name:'PrivateComponent',
        data(){
        return{
            
        drawer: null,
        selectitem:1,
        items: [
        { text: 'Home', icon: 'mdi-home', ruta: 'Home' },
        { text: 'Categoria', icon: 'mdi-file',  ruta: 'Categoria'  },
        { text: 'Articulo', icon: 'mdi-card-outline',  ruta: 'Articulo'  },
        { text: 'Usuario', icon: 'mdi-account',  ruta: 'Usuario'  },
      ],

        }
 
        }
}
</script>