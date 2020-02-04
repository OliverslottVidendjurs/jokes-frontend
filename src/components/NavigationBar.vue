<template>
  <div>
    <v-toolbar>
      <v-toolbar-items style="width: 100%">
        <v-btn to="/">Jokes</v-btn>
        <v-btn to="/jokeadmin">Jokes Admin</v-btn>
      </v-toolbar-items>
      <SearchBar style="max-width: 250px; width: 100%;" />
      <v-switch @change="toggle" v-model="switch1" label="Dark theme" hide-details class="ml-8"></v-switch>
    </v-toolbar>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
  data() {
    return {
      switch1: this.$vuetify.theme.dark
    };
  },
  components: {
    SearchBar
  },
  methods: {
    toggle() {
      this.$vuetify.theme.dark = this.switch1;
      localStorage.setItem("dark", this.switch1);
    }
  }
};
</script>

<style>
</style>