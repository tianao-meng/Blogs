import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from "firebase/app";
import "firebase/auth";

Vue.config.productionTip = false

// ????/
let app;
firebase.auth().onAuthStateChanged(() => {
  // console.log(firebase.auth().getAuthState());
  if (!app){
    console.log("in main");
    
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    
  }
})


