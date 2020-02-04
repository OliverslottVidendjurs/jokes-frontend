<template>
  <v-app>
    <NavigationBar/>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
export default {
  name: "App",

  components: {NavigationBar},

  data: () => ({
    //
  })
};
</script>
