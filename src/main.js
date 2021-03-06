// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueBarcode from '@chenfengyuan/vue-barcode'
import VueHtmlToPaper from 'vue-html-to-paper'
import App from './App'
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit'
Vue.component(VueBarcode.name, VueBarcode)

Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(user=>{
  if(!app){
    app=new Vue({
      el: '#app',
      router,
      components: { App,
      },
 
      template: '<App/>'
    })
    
  }
})


// const options = {
//   name: '_blank',
//   specs: [
//     'fullscreen=yes',
//     'titlebar=yes',
//     'scrollbars=yes'
//   ],
//   styles: [
//     'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
//     'https://unpkg.com/kidlat-css/css/kidlat.css'
//   ]
// }
 
Vue.use(VueHtmlToPaper)