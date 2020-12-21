<template>
  <div class="home">
    <v-app>
    <v-app-bar
      app
      color="primary"
    > 
      <div class="d-flex align-center">
        <v-img
          alt="DHAMS Logo"
          class="shrink mr-2"
          contain
          src="../assets/Logo2.png"
          transition="scale-transition"
          width="150"
          @click.prevent="GoHome"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click.prevent="MirarToken"
        target="_blank"
        text
      >
        <span class="mr-2 text--text">Ingresar</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <!-- <v-btn
        v-else
        @click.prevent="GoPrivate"
        target="_blank"
        text
      >
        <span class="mr-2 text--text">Ingresar</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
      <template v-slot:extension>
          <v-tabs align-with-title>
           |<v-tab class="text--text" >QUIÉNES SOMOS</v-tab> 
            <v-tab class="text--text">SERVICIOS </v-tab>
            <v-tab class="text--text">CASOS DE ÉXITO</v-tab>
            <v-tab class="text--text">DESARROLLADORES</v-tab>
          </v-tabs>
        </template>
     </v-app-bar>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <v-main>
      <div>
      <quienes-somos />
      <servicios></servicios>
      <casos-exito></casos-exito>
     <desarrolladores></desarrolladores>
     </div>
    </v-main>  
    <!-- footer -->
     <v-footer color="primary">
        <v-row>
          <v-col>
            <v-card color="primary">
              <div class= "text-center">
                <v-btn rounded color="success" blue href="https://github.com/Proyecto-grupo-17/semana5-fronted" target="_blank">
                  <v-icon>Repositorio GITHUB</v-icon>
                </v-btn>
              </div>
            </v-card>
            <v-card
              class="flex"
              flat
              tile
              color="primary"
              >
              <v-card-title class="teal" >
                <strong class="subheading">Manténgase conectado con nuestras redes sociales!</strong>
                <v-spacer></v-spacer>
                <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4"
                  dark
                  icon
                  >
                  <v-icon size="24px">
                    {{ icon }}
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="py-2 white--text text-center">
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-footer>
      <!-- fin footer -->

    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
import QuienesSomos from '@/components/QuienesSomos.vue'
import Servicios from '../components/Servicios.vue'
import CasosExito from '../components/CasosExito.vue'
import Desarrolladores from '../components/Desarrolladores.vue'

export default {
  name: 'Home',
  components: {
    QuienesSomos,
    Servicios,
    CasosExito,
    Desarrolladores,
  },
  data: () => ({
    a : true,
    items: [
        {
          src: require('@/assets/CARRUSEL1.png'),
        },
        {
          src: require('@/assets/CARRUSEL2.png'),
        },
        {
          src: require('@/assets/CARRUSEL3.png'),
        },
    ],
    icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
  }),
  methods:{
    async GoLogin() {
      this.$router.push('../login');
    },
    async GoHome() {
      this.$router.push('/');
    },
    async GoPrivate() {
      this.$router.push('/private');
    },
    async MirarToken(){
      try {
        this.$store.dispatch('autoLogin')
      } catch (error) {
        this.GoLogin()
      }
      
    },
    async GoServices(){
      this.$router.push('../services')
    }
  }
}
</script>
