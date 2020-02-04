<template>
  <v-autocomplete
    v-model="selected"
    label="Søg"
    disable-lookup
    :hide-details="true"
    :items="items"
    no-filter
    :search-input.sync="search"
    persistent-hint
    :loading="loading"
  ></v-autocomplete>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      search: null,
      items: [],
      selected: null,
      loading: false
    };
  },
  methods: {
    searchMethod(val) {
      this.loading = true;
      Axios.get("http://localhost:3000/jokes/sog/" + val)
        .then(response => response.data)
        .then(data => {
          this.loading = false;
          this.items = data.message.map(joke => {
            return {
              text: joke.overskrift,
              value: joke._id
            };
          });
        });
    }
  },
  watch: {
    search(val) {
      if (val) {
        this.searchMethod(val);
      } else {
        this.items = [];
      }
    },
    selected() {
      window.console.log(this.selected);
      this.$router.push({
        path: `/joke/${this.selected}`
      });
    }
  }
};
</script>

<style>
</style>