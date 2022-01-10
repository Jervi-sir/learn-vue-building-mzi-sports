import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDAaKhVjk2tvug2TKa8dBJaYZmap_j_UQQ",
  authDomain: "mzi-sports-891c8.firebaseapp.com",
  databaseURL: "https://mzi-sports-891c8-default-rtdb.firebaseio.com",
  projectId: "mzi-sports-891c8",
  storageBucket: "mzi-sports-891c8.appspot.com",
  messagingSenderId: "1059507849921",
  appId: "1:1059507849921:web:c2935e6404a75355aaa240"
};

const app = initializeApp(firebaseConfig);

Vue.use(app);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
