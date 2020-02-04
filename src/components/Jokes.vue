<template>
  <div>
    <v-card max-width="400" tile class="mx-auto">
      <v-list-item v-for="joke in jokes" v-bind:key="joke._id">
        <router-link class="link" :to="`/joke/${joke._id}`">
          <v-card-text class="text-center">{{joke.overskrift}}</v-card-text>
        </router-link>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "Jokes",
  data() {
    return {
      jokes: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      Axios.get("http://localhost:3000/jokes")
        .then(response => response.data)
        .then(data => this.jokes = data);
    }
  }
};
</script>
<style lang="scss" scoped>
.link {
  text-decoration: none;
}
</style>