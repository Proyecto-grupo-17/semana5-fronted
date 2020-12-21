<template>
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
     </v-app-bar>

    <div class="container mt-15">
      <the-login/>
    </div>
  </v-app>
</template>

<script>
// import TheLogin from '@/components/auth/TheLogin.vue';
import TheLogin from '@/components/auth/TheLogin.vue'

export default {
    name: 'Login',
    components: {
        TheLogin,
  },
  methods:{
    async GoHome() {
      this.$router.push('/');
    },
  }
};
</script>