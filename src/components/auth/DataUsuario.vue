<template>
  <v-data-table
    :headers="headers"
    :items="usuarios"
    sort-by="id"
    class="elevation-1"
    :loading="cargando"
    loading-text="Cargando... Por favor espere"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Usuario</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn   
              class="mb-2 text white--text"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Usuario
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.rol"
                      label="Rol"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.estado"
                      label="Estado"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Esta seguro de actualizar este usuario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
      <template v-if="item.estado">
      mdi-toggle-switch
      </template>
      
      <template v-else>
      mdi-toggle-switch-off-outline 
      </template>

      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'
  export default {
    name:'DataUsuario',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      cargando: true,
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          value: 'nombre',
        },
        { text: 'Rol', value: 'rol' },
        { text: 'Password', value: 'pasword' },
        { text: 'Email', value: 'email' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      usuarios: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        rol: null,
        password: '',
        email: '',
        estado: 0,
      },
      defaultItem: {
        nombre: '',
        rol: null,
        password: '',
        email: '',
        estado: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.listar();
    },

    methods: {

        listar(){
            let me=this;          
            axios.get('usuario/list')
            .then(function (response){
              me.usuarios=response.data;
              me.cargando = false;
                }).catch(function(error){
                    console.log(error);
                });
            },

      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        if (this.editedItem.estado === 1) {
            axios.put("usuario/deactivate", {
            "id": this.editedItem.id

            })
                .then(response =>{
                    //console.log(response);
                    this.listar();
                }).catch(error =>{
                    console.log(error);
                    return error;
                })
          //Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          //this.desserts.push(this.editedItem)
            axios.put("usuario/activate", {
            "id": this.editedItem.id

            })
                .then(response =>{
                    //console.log(response);
                    this.listar();
                }).catch(error =>{
                    console.log(error);
                    return error;
                })
        }
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
            axios.put("usuario/update", {
            "id": this.editedItem.id, 
            "nombre": this.editedItem.nombre, 
            "rol": this.editedItem.rol,
            "email": this.editedItem.email,
            "password": this.editedItem.password
            })
                .then(response =>{
                    //console.log(response);
                    this.listar();
                }).catch(error =>{
                    console.log(error);
                    return error;
                })
          //Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          //this.desserts.push(this.editedItem)
            axios.post("usuario/add", {
            "nombre": this.editedItem.nombre, 
            "rol": this.editedItem.rol,
            "email": this.editedItem.email,
            "password": this.editedItem.password,
            "estado": this.editedItem.estado,
            })
                .then(response =>{
                    //console.log(response);
                    this.listar();
                }).catch(error =>{
                    console.log(error);
                    return error;
                })
        }
        this.close()
      },
    },
  }
</script>