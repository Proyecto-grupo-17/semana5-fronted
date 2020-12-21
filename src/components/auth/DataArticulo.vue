<template>
  <v-data-table
    :headers="headers"
    :items="articulos"
    sort-by="nombre"
    class="elevation-1"
    :loading="cargando"
    loading-text="Cargando... Por favor espere"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Articulo</v-toolbar-title>
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
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Articulo
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
                    <v-select
                      v-model="categoria"
                      label="Categoria"
                      :items="categorias"
                      item-text="nombre"
                      item-value="id"
                      return-object
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.codigo"
                      label="Codigo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.descripcion"
                      label="Descripcion"
                      counter = "254"
                      no-resize
                      auto-grow
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
            <v-card-title class="headline">Esta seguro de actualizar este articulo?</v-card-title>
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
    name:'DataArticulo',
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
        { text: 'Codigo', value: 'codigo' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Estado', value: 'estado' },
        { text: 'Categoria', value: 'categoria.nombre' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      articulos: [],
      categorias: [],
      categoria: '',
      editedIndex: -1,
      editedItem: {
        codigo: '',
        nombre: '',
        descripcion: '',
        categoria: {
          id: 0,
          nombre:""
        },
        estado: 0,
        
      },
      defaultItem: {
        codigo: '',
        nombre: '',
        descripcion: '',
        categoria: {
          id: 0,
          nombre:""
        },
        estado: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Articulo ' : 'Editar Articulo'
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
      this.listarCategorias();
    },

    methods: {
 
        listar(){
            let me=this;          
            axios.get('articulo/list').then(function (response){
                me.articulos=response.data;
                this.cargando = false;
                }).catch(function(error){
                    console.log(error);
                    return error;
                });
            },
        listarCategorias(){
            let me=this;          
            axios.get('categoria/list').then(function (response){
                me.categorias=response.data;
                }).catch(function(error){
                    console.log(error);
                    return error;
                });
            },
      editItem (item) {
        this.editedIndex = item.id;
        this.categoria = item? item.categoria : '';//preguntar si el articulo tiene o no categoria asignada en la tabla
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
            axios.put("articulo/deactivate", {
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
            axios.put("articulo/activate", {
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
          this.editedItem = Object.assign({}, this.defaultItem);
          this.categoria = '';
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
            axios.put("articulo/update", {
            "id": this.editedItem.id, 
            "nombre": this.editedItem.nombre, 
            "codigo": this.editedItem.codigo,
            "descripcion": this.editedItem.descripcion,
            "categoria": this.categoria.id,

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
            axios.post("articulo/add", {
            "nombre": this.editedItem.nombre, 
            "codigo": this.editedItem.codigo,
            "descripcion": this.editedItem.descripcion,
            "categoria": this.categoria.id,
            "estado": 1,
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