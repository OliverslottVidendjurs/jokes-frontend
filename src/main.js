import Vue from 'vue'
import VueRouter from "vue-router";
import Jokes from "./components/Jokes"
import Joke from "./components/Joke"
import App from "./App";
import vuetify from './plugins/vuetify';
import JokeAdmin from "./components/JokeAdmin";

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  {path: "/", component: Jokes},
  {path: "/joke/:id", component: Joke},
  {path: "/jokeadmin", component: JokeAdmin}
];

const router = new VueRouter({
  routes,
  mode: "history"
})

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
