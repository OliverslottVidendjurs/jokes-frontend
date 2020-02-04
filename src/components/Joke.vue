<template>
  <div>
      <div v-if="joke">
        <h1>{{joke.overskrift}}</h1>
        <p>{{joke.jokeTekst}}</p>
      </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
    name: "Joke",
    data () {
        return {
            joke: null
        }
    },
    created () {
        this.fetchData();
    },
    methods: {
        fetchData() {
            Axios.get(`http://localhost:3000/jokes/${this.$route.params.id}`)
            .then(response => response.data)
            .then(data => this.joke = data);
        }
    },
    watch: {
        "$route.params.id": function () {
            this.fetchData();
        }
    }
}
</script>

<style>

</style>