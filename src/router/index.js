import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      public: true
    },
  },
  {
    path: '/services',
    name: 'Services',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "services" */ '../views/Services.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta:{
      public: true
    },
  },
  {
    path: '/privado',
    name: 'Privado',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "privado" */ '../views/Privado.vue'),
    meta:{
      auth: true
    },
    children:[
      {
        path: 'categoria',
        name: 'Categoria',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "categoria" */ '../views/Categoria.vue'),
        meta:{
          is_admin: true,
          is_vendor: true,
          auth: true
        },
      },
      {
        path: 'usuario',
        name: 'Usuario',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "usuario" */ '../views/Usuario.vue'),
        meta:{
          is_admin:true,
          auth: true
        },
      },
      {
        path: 'articulo',
        name: 'Articulo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "articulo" */ '../views/Articulo.vue'),
        meta:{
          auth: true
        },
      }
    ]
  },
]


const router = new VueRouter({
  routes
})

import VueJwtDecode from 'vue-jwt-decode'
import swal from "sweetalert"; 

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)) {
      if (localStorage.getItem('token') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
        let user= VueJwtDecode.decode(localStorage.getItem('token'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.rol == "Administrador"){
                  next()
              }
              else{
                if (to.matched.some(record => record.meta.is_vendor))
                if(user.rol == "Cajero"){
                  next()
                } else{
                  swal("Acceso denegado", "Lo siento, no tienes permisos para entrar a la pagina", "warning")
                  next({ name: 'Privado'})
                }
                else{
                  next({ name: 'Privado'})
                  swal("Acceso denegado", "Lo siento, no tienes permisos para entrar a la pagina", "warning")
                }
              }
          } else
            {
                next()
            }
      }
  } else if(to.matched.some(record => record.meta.public)) {
      if(localStorage.getItem('token') == null){
          next()
      }
      else{
          next({ name: 'Privado'})
      }
  }else {
      next()
  }
})

export default router
