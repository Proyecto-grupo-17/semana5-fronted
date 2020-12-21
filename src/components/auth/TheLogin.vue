<template>
  <v-container fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="pt-0 text">
          <v-toolbar-title class="white--text"
            ><h4>Bienvenido</h4></v-toolbar-title
          >
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form ref="form">
                <v-text-field
                  label="Ingrese el email"
                  v-model="email"
                  required
                ></v-text-field>
                <v-text-field
                  label="Ingrese su contraseña"
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  required
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn @click="ingresar()" :class="'text white--text'"
                    >Entrar</v-btn
                  >
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
import axios from 'axios';
import swal from "sweetalert";
export default {
    data(){
        return{

            email:'',
            password:'',
            errorM:null,
            show1: false,
            password: 'Password',
          rules: {
             required: value => !!value || 'Required.',
              min: v => v.length >= 8 || 'Min 8 characters',
              emailMatch: () => (`The email and password you entered don't match`),
          },
        }
    },

    methods:{
        ingresar(){
          // console.log(decode(tokenReturn))
            axios.post('usuario/login',{email: this.email, password: this.password})
            // console.log(this.email)
            //console.log(this.tokenReturn)
            .then(response =>{
                // console.log(response.data);
                return response.data;
            })
            .then(data =>{
                console.log(data);
                swal("Acceso permitido", "Puede ingresar a la sección privada", "success")
                this.$store.dispatch("guardarToken",data.tokenReturn);       
                this.$router.push({name: 'Privado'});
            })
            .catch(error =>{
                //console.log(eror);
                this.errorM=null;
                console.log(error.response.status);
                if (error.response.status==401){
                    console.log('hola');
                    swal("Acceso denegado", "Vuelva a intentarlo, credenciales incorrectas", "warning")
                    this.errorM='credenciales son incorrectas.';
                } 
                else if (error.response.status==404){
                    this.errorM='el usuario no existe';
                }
                else{
                    this.errorM='Ocurrió un error con el servidor.';
                }
            });
        }
    }
    
}
</script>