import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewProduct from '@/components/NewProduct'
import EditProduct from '@/components/EditProduct'
import ViewProduct from '@/components/ViewProduct'
import AddProduct from '@/components/AddProduct'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Barcode from '@/components/Barcode'
import firebase from 'firebase'

Vue.use(Router)

let router= new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,meta:{
        requiresAuth:true
      }
    },
    {
      path:'/login',
      name:'login',
      component:Login,meta:{
        requiresGuest:true
      }
    },
    {
      path:'/register',
      name:'register',
      component:Register,meta:{
        requiresGuest:true
      }
    },
    {
      path: '/new',
      name: 'new-product',
      component: NewProduct,meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit/:product_id',
      name: 'edit-product',
      component: EditProduct,meta:{
        requiresAuth:true
      }
    },
    {
      path: '/view/:product_id',
      name: 'view-product',
      component: ViewProduct,meta:{
        requiresAuth:true
      }
    },
    {
      path: '/barcode-product/:product_id',
      name: 'barcode-product',
      component: Barcode,meta:{
        requiresAuth:true
      
      }
    },
    {
      path: '/add',
      name: 'add-product',
      component: AddProduct,meta:{
        requiresAuth:true
      }
    }
  ]
})

//navguards


router.beforeEach((to,from,next)=>{
  //Check for required Auth guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    //check if not logged  in 
    if(!firebase.auth().currentUser){
      //go to login
      next({
        path:'/login',
        query:{
          redirect: to.fullPath
        }
      })
    }else{
      //proceed to next route
      next()
    }

  }else if(to.matched.some(record => record.meta.requiresGuest)){
       //check if not logged  in 
       if(firebase.auth().currentUser){
        //go to login
        next({
          path:'/',
          query:{
            redirect: to.fullPath
          }
        })
      }else{
        //proceed to next route
        next()
      }
  }else{
       //proceed to next route
       next()
  }
})

export default router