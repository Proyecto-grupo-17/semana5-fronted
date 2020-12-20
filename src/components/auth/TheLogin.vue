<template>
  
  <v-container fluid fill-height class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
              <v-toolbar class="pt-0 text">
                <v-toolbar-title class="white--text"><h4>Bienvenido</h4></v-toolbar-title>
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                      <v-form v-model="valid" ref="form">
                        <v-text-field
                          label="Ingrese el email"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                        <v-text-field
                          label="Ingrese su contraseña"
                          v-model="password"
                          min="8"
                          :type="e1 ? 'password' : 'text'"
                          :rules="passwordRules"
                          required
                        ></v-text-field>
                        <v-layout justify-space-between>
                            <v-btn @click="submit" :class=" { 'text white--text' : valid, disabled: !valid }">Entrar</v-btn>
                            <a href="" class="text--text">Olvido su contraseña</a>
                        </v-layout>
                      </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>
</template>

<script>
import swal from 'sweetalert';
import jwt from "jsonwebtoken";
import axios from 'axios';
export default {
  name:'TheLogin',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
  loginUser() {
    axios.post('http://localhost:3000/api/usuario/login')
    .then(response =>{
      return response.data;
    })
    .then(data =>{
      this.$router.push('/privado');
      swal("Login correcto", 'Los datos son correctos, bienvenido!', "success");
      console.log(data);
    })
    .catch(error =>{
      swal("Oops!","Algo salio mal", "error");
      console.log(error);
      return error;
    })
     
    },
  },
};
</script>