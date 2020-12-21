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
           | <v-tab class="text--text" >QUIÉNES SOMOS</v-tab> 
            <v-tab class="text--text">SERVICIOS</v-tab>
            <v-tab class="text--text">CASOS DE ÉXITO</v-tab>
            <v-tab class="text--text">CONTACTO</v-tab>
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

      <QuienesSomos />
      <servicios></servicios>
    </v-app>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import QuienesSomos from '@/components/QuienesSomos.vue'
import Servicios from '../components/Servicios.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    QuienesSomos,
    Servicios,
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
      
    }
  }
}
</script>
