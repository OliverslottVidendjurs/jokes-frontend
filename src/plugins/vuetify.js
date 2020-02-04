import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

let dark = false;
if(localStorage.getItem("dark")){
    dark = JSON.parse(localStorage.getItem("dark"));
} else {
    localStorage.setItem("dark", "false");
}

export default new Vuetify({
    theme: {
        dark
    }
});
